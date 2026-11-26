/* Mural dos momentos: fotos de visitantes + login. Veja LEIA-ME-MURAL.md */
const SUPABASE_URL = 'https://sqlxvhimnhlthiukgumm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_vpGSe2-_rFzvEfuy3nUYBg_F8U6cSQl'; // chave pública (publishable)

const TERMOS = `
<p><strong>1. Finalidade.</strong> O Mural dos momentos, do projeto Conecta Caiçara, reúne fotos de visitantes de Piaçaguera para divulgar a comunidade e o turismo de base comunitária.</p>
<p><strong>2. Conteúdo permitido.</strong> Publique apenas fotos suas, feitas durante a visita. Não são permitidos nudez, violência, discriminação, propaganda, conteúdo ilegal ou que exponha moradores sem autorização.</p>
<p><strong>3. Direito de imagem.</strong> Ao publicar, você declara ter autorização das pessoas que aparecem de forma identificável. Fotos de crianças só com autorização do responsável. Evite fotografar casas e moradores sem permissão.</p>
<p><strong>4. Licença de uso.</strong> Você continua dono da foto e autoriza, de forma gratuita e não exclusiva, sua exibição neste site e nos canais do projeto, com o crédito do nome informado, sem remuneração.</p>
<p><strong>5. Moderação.</strong> A equipe pode remover, sem aviso, qualquer foto que viole este termo. Você pode apagar suas próprias fotos quando quiser.</p>
<p><strong>6. Dados pessoais (LGPD).</strong> Coletamos seu e-mail (para o login), o nome que você digitar, a foto, a legenda e a data do aceite deste termo. A base legal é o seu consentimento. Não vendemos nem compartilhamos seus dados. Eles ficam armazenados em serviço de nuvem (Supabase), que pode operar fora do Brasil. O e-mail não aparece publicamente.</p>
<p><strong>7. Seus direitos.</strong> Você pode pedir acesso, correção, exclusão dos seus dados e das suas fotos, e revogar este consentimento a qualquer momento, pelo contato abaixo.</p>
<p><strong>8. Guarda.</strong> Mantemos seus dados enquanto sua conta existir ou até você pedir a exclusão.</p>
<p><strong>9. Menores de 18 anos.</strong> Menores só podem postar com autorização de um responsável.</p>
<p><strong>10. Responsabilidade.</strong> Você responde pelo conteúdo que publica. O projeto não se responsabiliza por fotos postadas em desacordo com este termo.</p>
<p><strong>11. Alterações.</strong> Este termo pode ser atualizado. Mudanças relevantes serão avisadas no site.</p>
<p><strong>12. Contato.</strong> [COLOQUE AQUI O E-MAIL DE CONTATO DO PROJETO]</p>`;

(function () {
  const $ = (id) => document.getElementById(id);
  const sb = SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
  let usuario = null, admin = false, fotos = [], querPostar = false;

  // links de rede social ainda sem endereço não abrem nada
  document.querySelectorAll('.rodape-redes a[href="#"]').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));

  function renderBarra() {
    $('mural-barra').innerHTML = `
      <button type="button" class="botao botao-primario" id="mural-postar">📸 Compartilhar um momento</button>
      <span class="mural-conta">${usuario
        ? `${admin ? '🛡️ Administrador · ' : ''}${escapeHtml(usuario.email)} <button type="button" class="link-botao" id="mural-sair">Sair</button>`
        : '<button type="button" class="link-botao" id="mural-entrar">Entrar</button>'}</span>`;
    $('mural-postar').onclick = quererPostar;
    if ($('mural-entrar')) $('mural-entrar').onclick = () => abrirLogin();
    if ($('mural-sair')) $('mural-sair').onclick = () => sb.auth.signOut();
  }

  function quererPostar() {
    if (!sb) { alert('O mural ainda está sendo configurado. Volte em breve!'); return; }
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
    const dados = () => ({ email: $('lg-email').value.trim(), password: $('lg-senha').value });
    $('lg-fechar').onclick = () => { querPostar = false; $('dlg-mural').close(); };
    $('f-login').onsubmit = async (e) => {
      e.preventDefault();
      const { error } = await sb.auth.signInWithPassword(dados());
      if (error) erro('Não foi possível entrar. Confira o e-mail e a senha.');
    };
    $('lg-criar').onclick = async () => {
      if (!$('f-login').reportValidity()) return;
      const { data, error } = await sb.auth.signUp({ ...dados(), options: { emailRedirectTo: location.origin + location.pathname } });
      if (error) erro('Não foi possível criar a conta: ' + error.message);
      else if (!data.session) erro('Conta criada! Enviamos um e-mail de confirmação. Confirme e depois clique em Entrar.');
    };
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
      $('p-enviar').disabled = true;
      $('p-erro').textContent = 'Enviando…';
      try {
        const blob = await (await fetch(await redimensionar(arq, 1200))).blob();
        const caminho = `${usuario.id}/${Date.now()}.jpg`;
        let r = await sb.storage.from('mural').upload(caminho, blob, { contentType: 'image/jpeg' });
        if (r.error) throw r.error;
        r = await sb.from('fotos_mural').insert({
          caminho, legenda: $('p-legenda').value.trim() || null,
          autor: $('p-nome').value.trim() || 'Visitante', aceitou_termos_em: new Date().toISOString(),
        });
        if (r.error) { await sb.storage.from('mural').remove([caminho]); throw r.error; }
        $('dlg-mural').close();
        carregar();
      } catch (err) {
        $('p-erro').textContent = 'Não foi possível publicar a foto. Tente novamente.';
        $('p-enviar').disabled = false;
      }
    };
  }

  function renderFeed() {
    const feed = $('mural-feed');
    if (!sb) { feed.innerHTML = '<div class="sem-resultados"><strong>Mural em configuração</strong>Em breve você poderá compartilhar seus momentos aqui.</div>'; return; }
    if (!fotos.length) { feed.innerHTML = '<div class="sem-resultados"><strong>Ainda não há fotos</strong>Seja o primeiro a compartilhar um momento da ilha!</div>'; return; }
    feed.innerHTML = fotos.map((f, i) => {
      const url = sb.storage.from('mural').getPublicUrl(f.caminho).data.publicUrl;
      const pode = usuario && (admin || f.user_id === usuario.id);
      return `<figure class="polaroid" style="--giro:${i % 2 ? 1.2 : -1.2}deg">
        <img src="${escapeHtml(url)}" alt="${escapeHtml(f.legenda || 'Foto compartilhada por um visitante')}" loading="lazy">
        <figcaption><span>${escapeHtml(f.legenda || '')}</span><small>— ${escapeHtml(f.autor || 'Visitante')}</small>
        ${pode ? `<button type="button" class="link-botao" data-id="${f.id}" data-caminho="${escapeHtml(f.caminho)}">🗑 Apagar</button>` : ''}</figcaption></figure>`;
    }).join('');
  }

  async function carregar() {
    if (sb) {
      const { data } = await sb.from('fotos_mural').select('*').order('criado_em', { ascending: false }).limit(60);
      fotos = data || [];
    }
    renderFeed();
  }

  $('mural-feed').addEventListener('click', async (e) => {
    const b = e.target.closest('button[data-id]');
    if (!b || !confirm('Apagar esta foto? Isso não pode ser desfeito.')) return;
    await sb.storage.from('mural').remove([b.dataset.caminho]);
    await sb.from('fotos_mural').delete().eq('id', b.dataset.id);
    carregar();
  });

  async function definirUsuario(user) {
    usuario = user || null;
    admin = false;
    if (usuario) {
      const { data } = await sb.from('admins').select('user_id').eq('user_id', usuario.id).maybeSingle();
      admin = !!data;
    }
    renderBarra();
    renderFeed();
  }

  renderBarra();
  carregar();
  if (sb) {
    sb.auth.getSession().then(({ data }) => definirUsuario(data.session && data.session.user));
    sb.auth.onAuthStateChange((_evento, sessao) => {
      definirUsuario(sessao && sessao.user).then(() => {
        const d = $('dlg-mural');
        if (usuario && d.open && $('f-login')) {
          d.close();
          if (querPostar) { querPostar = false; abrirPost(); }
        }
      });
    });
  }
})();
