const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyClRRtOXIr94j62LgfsGri9uvArPcs4nrA',
  authDomain: 'descubra-piacaguera.firebaseapp.com',
  projectId: 'descubra-piacaguera',
  appId: '1:895089599427:web:8c5bd881b1bcfe493b1376',
};

const TERMOS = `
<p><strong>1. Finalidade.</strong> O Mural dos momentos, do projeto Conecta Caiçara, reúne fotos de visitantes de Piaçaguera para divulgar a comunidade e o turismo de base comunitária.</p>
<p><strong>2. Conteúdo permitido.</strong> Publique apenas fotos suas, feitas durante a visita. Não são permitidos nudez, violência, discriminação, propaganda, conteúdo ilegal ou que exponha moradores sem autorização.</p>
<p><strong>3. Direito de imagem.</strong> Ao publicar, você declara ter autorização das pessoas que aparecem de forma identificável. Fotos de crianças só com autorização do responsável. Evite fotografar casas e moradores sem permissão.</p>
<p><strong>4. Licença de uso.</strong> Você continua dono da foto e autoriza, de forma gratuita e não exclusiva, sua exibição neste site e nos canais do projeto, com o crédito do nome informado, sem remuneração.</p>
<p><strong>5. Moderação.</strong> A equipe pode remover, sem aviso, qualquer foto que viole este termo. Você pode apagar suas próprias fotos quando quiser.</p>
<p><strong>6. Dados pessoais (LGPD).</strong> Coletamos seu e-mail (para o login), o nome que você digitar, a foto, a legenda e a data do aceite deste termo. A base legal é o seu consentimento. Não vendemos nem compartilhamos seus dados. Eles ficam armazenados em serviço de nuvem (Firebase, do Google), que pode operar fora do Brasil. O e-mail não aparece publicamente.</p>
<p><strong>7. Seus direitos.</strong> Você pode pedir acesso, correção, exclusão dos seus dados e das suas fotos, e revogar este consentimento a qualquer momento, pelo contato abaixo.</p>
<p><strong>8. Guarda.</strong> Mantemos seus dados enquanto sua conta existir ou até você pedir a exclusão.</p>
<p><strong>9. Menores de 18 anos.</strong> Menores só podem postar com autorização de um responsável.</p>
<p><strong>10. Responsabilidade.</strong> Você responde pelo conteúdo que publica. O projeto não se responsabiliza por fotos postadas em desacordo com este termo.</p>
<p><strong>11. Alterações.</strong> Este termo pode ser atualizado. Mudanças relevantes serão avisadas no site.</p>
<p><strong>12. Contato.</strong> [COLOQUE AQUI O E-MAIL DE CONTATO DO PROJETO]</p>`;

(function () {
  const $ = (id) => document.getElementById(id);
  const POR_PAGINA = 12;          // fotos carregadas por vez (economiza a cota gratuita)
  const LIMITE_CHARS = 250000;    // tamanho máximo da foto em texto (~185 KB); as regras aceitam até 300000

  const configurado = !!(window.firebase && FIREBASE_CONFIG.projectId && !/^COLE/.test(FIREBASE_CONFIG.projectId));
  let auth = null, db = null;
  if (configurado) {
    firebase.initializeApp(FIREBASE_CONFIG);
    auth = firebase.auth();
    db = firebase.firestore();
  }
  let usuario = null, admin = false, fotos = [], ultimo = null, temMais = false, falhou = false, querPostar = false;

  // links de rede social ainda sem endereço não abrem nada
  document.querySelectorAll('.rodape-redes a[href="#"]').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));

  // área do botão "Ver mais fotos" (fica logo abaixo do mural)
  $('mural-feed').insertAdjacentHTML('afterend', '<div id="mural-mais-box" style="text-align:center;margin-top:24px"></div>');

  function msgErroAuth(err) {
    const m = {
      'auth/invalid-email': 'E-mail inválido.',
      'auth/email-already-in-use': 'Esse e-mail já tem conta. Clique em Entrar.',
      'auth/weak-password': 'Senha fraca. Use pelo menos 6 caracteres.',
      'auth/invalid-credential': 'E-mail ou senha incorretos.',
      'auth/wrong-password': 'E-mail ou senha incorretos.',
      'auth/user-not-found': 'E-mail ou senha incorretos.',
      'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos e tente de novo.',
      'auth/network-request-failed': 'Sem conexão. Verifique a internet e tente de novo.',
      'auth/operation-not-allowed': 'O login por e-mail e senha ainda não foi ativado no Firebase.',
      'auth/operation-not-supported-in-this-environment': 'Abra o site por um endereço http (Live Server ou o site publicado), não direto do arquivo.',
      'auth/unauthorized-domain': 'Este endereço do site ainda não foi autorizado no Firebase (Authentication > Configurações > Domínios autorizados).',
    };
    return m[err && err.code] || ('Não foi possível concluir. (' + ((err && err.code) || 'erro') + ')');
  }

  function renderBarra() {
    $('mural-barra').innerHTML = `
      <button type="button" class="botao botao-primario" id="mural-postar">📸 Compartilhar um momento</button>
      <span class="mural-conta">${usuario
        ? `${admin ? '🛡️ Administrador · ' : ''}${escapeHtml(usuario.email)} <button type="button" class="link-botao" id="mural-sair">Sair</button>`
        : '<button type="button" class="link-botao" id="mural-entrar">Entrar</button>'}</span>`;
    $('mural-postar').onclick = quererPostar;
    if ($('mural-entrar')) $('mural-entrar').onclick = () => (configurado ? abrirLogin() : avisoConfig());
    if ($('mural-sair')) $('mural-sair').onclick = () => auth.signOut();
  }

  function avisoConfig() { alert('O mural ainda está sendo configurado. Volte em breve!'); }

  function quererPostar() {
    if (!configurado) { avisoConfig(); return; }
    if (!usuario) { querPostar = true; abrirLogin('Para postar uma foto é necessário entrar com seu e-mail. Você pode continuar explorando o site sem login.'); return; }
    abrirPost();
  }

  function abrirDialogo(html) {
    const d = $('dlg-mural');
    d.innerHTML = html;
    if (!d.open) d.showModal();
    return d;
  }

  function abrirLogin(msg) {
    abrirDialogo(`<form id="f-login" class="dlg-corpo">
      <h3>Entrar para postar</h3>
      <p class="dlg-aviso">${escapeHtml(msg || 'Entre com seu e-mail para compartilhar fotos.')}</p>
      <label>E-mail<input type="email" id="lg-email" required autocomplete="email"></label>
      <label>Senha (mínimo 6 caracteres)<input type="password" id="lg-senha" required minlength="6" autocomplete="current-password"></label>
      <p class="dlg-erro" id="lg-erro" role="alert"></p>
      <div class="dlg-acoes">
        <button type="submit" class="botao botao-primario">Entrar</button>
        <button type="button" class="botao botao-secundario" id="lg-criar">Criar conta</button>
        <button type="button" class="link-botao" id="lg-fechar">Cancelar</button>
      </div></form>`);
    const erro = (t) => { $('lg-erro').textContent = t; };
    const dados = () => ({ email: $('lg-email').value.trim(), senha: $('lg-senha').value });
    $('lg-fechar').onclick = () => { querPostar = false; $('dlg-mural').close(); };
    $('f-login').onsubmit = async (e) => {
      e.preventDefault();
      erro('');
      const d = dados();
      try { await auth.signInWithEmailAndPassword(d.email, d.senha); }
      catch (err) { erro(msgErroAuth(err)); }
    };
    $('lg-criar').onclick = async () => {
      if (!$('f-login').reportValidity()) return;
      erro('');
      const d = dados();
      try { await auth.createUserWithEmailAndPassword(d.email, d.senha); }
      catch (err) { erro(msgErroAuth(err)); }
    };
  }

  // Reduz a foto e devolve um texto "data:image/jpeg;base64,..." para guardar no Firestore
  function comprimir(arq, maxLado, qualidade) {
    return new Promise((ok, falha) => {
      const url = URL.createObjectURL(arq);
      const img = new Image();
      img.onload = () => {
        const esc = Math.min(1, maxLado / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.max(1, Math.round(img.width * esc));
        c.height = Math.max(1, Math.round(img.height * esc));
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#fff';            // PNG com transparência não vira preto
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        ok(c.toDataURL('image/jpeg', qualidade));
      };
      img.onerror = () => { URL.revokeObjectURL(url); falha(new Error('imagem-invalida')); };
      img.src = url;
    });
  }

  async function prepararFoto(arq) {
    let lado = 800, q = 0.7;
    let url = await comprimir(arq, lado, q);
    while (url.length > LIMITE_CHARS && lado > 400) {
      lado = Math.round(lado * 0.8);
      q = Math.max(0.5, q - 0.05);
      url = await comprimir(arq, lado, q);
    }
    if (url.length > LIMITE_CHARS) throw new Error('foto-grande');
    return url;
  }

  function abrirPost() {
    abrirDialogo(`<form id="f-post" class="dlg-corpo">
      <h3>Compartilhar um momento</h3>
      <label>Foto<input type="file" id="p-foto" accept="image/jpeg,image/png,image/webp" required></label>
      <label>Legenda (opcional)<input type="text" id="p-legenda" maxlength="200" placeholder="Ex.: pôr do sol na trilha"></label>
      <label>Seu nome (opcional)<input type="text" id="p-nome" maxlength="40" placeholder="Visitante"></label>
      <details open class="termos"><summary>Termo de consentimento</summary><div class="termos-texto">${TERMOS}</div></details>
      <label class="check"><input type="checkbox" id="p-aceite" required> Li e concordo com o termo de consentimento acima.</label>
      <p class="dlg-erro" id="p-erro" role="alert"></p>
      <div class="dlg-acoes">
        <button type="submit" class="botao botao-primario" id="p-enviar">Publicar</button>
        <button type="button" class="link-botao" id="p-fechar">Cancelar</button>
      </div></form>`);
    $('p-fechar').onclick = () => $('dlg-mural').close();
    $('f-post').onsubmit = async (e) => {
      e.preventDefault();
      const arq = $('p-foto').files[0];
      if (!arq) return;
      if (!/^image\/(jpeg|png|webp)$/.test(arq.type)) { $('p-erro').textContent = 'Use uma foto JPG, PNG ou WebP.'; return; }
      $('p-enviar').disabled = true;
      $('p-erro').textContent = 'Enviando…';
      try {
        const imagem = await prepararFoto(arq);
        const agora = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection('fotos').add({
          userId: usuario.uid,
          imagem,
          legenda: $('p-legenda').value.trim(),
          autor: $('p-nome').value.trim() || 'Visitante',
          aceitouTermosEm: agora,
          criadoEm: agora,
        });
        $('dlg-mural').close();
        carregar(true);
      } catch (err) {
        $('p-erro').textContent = err && err.code === 'permission-denied'
          ? 'Sem permissão para publicar. Entre de novo e tente outra vez.'
          : 'Não foi possível publicar a foto. Tente novamente.';
        $('p-enviar').disabled = false;
      }
    };
  }

  function renderFeed() {
    const feed = $('mural-feed');
    const mais = $('mural-mais-box');
    mais.innerHTML = '';
    if (!configurado) { feed.innerHTML = '<div class="sem-resultados"><strong>Mural em configuração</strong>Em breve você poderá compartilhar seus momentos aqui.</div>'; return; }
    if (falhou && !fotos.length) { feed.innerHTML = '<div class="sem-resultados"><strong>Não foi possível carregar o mural agora</strong>Tente de novo em alguns instantes.</div>'; return; }
    if (!fotos.length) { feed.innerHTML = '<div class="sem-resultados"><strong>Ainda não há fotos</strong>Seja o primeiro a compartilhar um momento da ilha!</div>'; return; }
    feed.innerHTML = fotos.map((f, i) => {
      const src = /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(f.imagem || '') ? f.imagem : '';
      const pode = usuario && (admin || f.userId === usuario.uid);
      return `<figure class="polaroid" style="--giro:${i % 2 ? 1.2 : -1.2}deg">
        <img src="${src}" alt="${escapeHtml(f.legenda || 'Foto compartilhada por um visitante')}" loading="lazy">
        <figcaption><span>${escapeHtml(f.legenda || '')}</span><small>— ${escapeHtml(f.autor || 'Visitante')}</small>
        ${pode ? `<button type="button" class="link-botao" data-id="${escapeHtml(f.id)}">🗑 Apagar</button>` : ''}</figcaption></figure>`;
    }).join('');
    if (temMais) {
      mais.innerHTML = '<button type="button" class="botao botao-secundario" id="mural-mais">Ver mais fotos</button>';
      $('mural-mais').onclick = () => carregar(false);
    }
  }

  async function carregar(reiniciar) {
    if (!db) { renderFeed(); return; }
    if (reiniciar) { fotos = []; ultimo = null; temMais = false; }
    try {
      let q = db.collection('fotos').orderBy('criadoEm', 'desc').limit(POR_PAGINA);
      if (ultimo) q = q.startAfter(ultimo);
      const snap = await q.get();
      snap.docs.forEach((d) => fotos.push({ id: d.id, ...d.data() }));
      if (snap.docs.length) ultimo = snap.docs[snap.docs.length - 1];
      temMais = snap.docs.length === POR_PAGINA;
      falhou = false;
    } catch (err) {
      falhou = true;
    }
    renderFeed();
  }

  $('mural-feed').addEventListener('click', async (e) => {
    const b = e.target.closest('button[data-id]');
    if (!b || !confirm('Apagar esta foto? Isso não pode ser desfeito.')) return;
    try {
      await db.collection('fotos').doc(b.dataset.id).delete();
      fotos = fotos.filter((f) => f.id !== b.dataset.id);
      renderFeed();
    } catch (err) {
      alert('Não foi possível apagar a foto agora.');
    }
  });

  async function definirUsuario(user) {
    usuario = user || null;
    admin = false;
    if (usuario) {
      try {
        const doc = await db.collection('admins').doc(usuario.uid).get();
        admin = doc.exists;
      } catch (err) { admin = false; }
    }
    renderBarra();
    renderFeed();
    definirModoAdmin(admin);
  }


  // ---- Fotos dos cards (gastronomia, artesanato etc.), editáveis pelo administrador ----
  async function carregarImagensItens() {
    if (!db) return;
    try {
      const snap = await db.collection('imagensItens').get();
      const mapa = {};
      snap.docs.forEach((d) => {
        const img = d.data().imagem;
        if (/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(img || '')) mapa[d.id] = img;
      });
      aplicarImagensRemotas(mapa);
    } catch (err) { /* sem conexão: os cards ficam com as fotos originais */ }
  }
  window.salvarImagemItem = (id, imagem) =>
    db.collection('imagensItens').doc(id).set({
      imagem,
      atualizadoEm: firebase.firestore.FieldValue.serverTimestamp(),
    });
  window.removerImagemItem = (id) => db.collection('imagensItens').doc(id).delete();

  renderBarra();
  carregar(true);
  carregarImagensItens();
  if (auth) {
    auth.onAuthStateChanged((user) => {
      definirUsuario(user).then(() => {
        const d = $('dlg-mural');
        if (usuario && d.open && $('f-login')) {
          d.close();
          if (querPostar) { querPostar = false; abrirPost(); }
        }
      });
    });
  }
})();
