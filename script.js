/* ============================================================
   DESCUBRA PIAÇAGUERA — script.js
   ------------------------------------------------------------
   Cada item tem o campo "verificado":
     true  = informação conferida em fonte pública (campo "fonte")
     false = informação sua, ainda a confirmar com a comunidade.
             Aparece no site com o aviso "em confirmação".
   Quando confirmar com o morador, troque para true e preencha
   "contato" (ex.: 'tel:+5541999999999' ou 'https://wa.me/55...').

   FOTOS: suba a foto para a pasta assets/fotos/ (pelo próprio
   GitHub: Add file > Upload files) e escreva SÓ O NOME dela no
   campo "imagem" do item. Exemplo:  imagem: 'restaurante-piacai.jpg'
   Se o campo ficar vazio '' (ou o nome estiver errado), o card
   mostra o ícone da categoria. Se quiser, preencha também "alt"
   com uma frase descrevendo a foto. Use só fotos suas ou com
   autorização de quem fotografou e de quem aparece nelas.
   ============================================================ */

// Contato oficial da Rede Caiçara de Turismo Comunitário (Ytalo)
const CONTATO_REDE_CAICARA = 'tel:+5541992022155';

// ---------------- Dados ----------------

const trilhaPontos = [
  {
    tipo: 'inicio',
    nome: 'Piaçaguera — Ponto de partida',
    km: '0 km',
    descricao: 'Vila de pescadores da Baía de Paranaguá, com a Igreja de Nossa Senhora da Imaculada Conceição, construída sobre um sambaqui.',
  },
  {
    tipo: 'parada',
    nome: 'Vila São Miguel',
    km: '7,8 km',
    descricao: 'Vila caiçara conhecida pela pesca do siri. Boa parada para ver o pôr do sol no trapiche da comunidade.',
  },
  {
    tipo: 'fim',
    nome: 'Ponta do Ubá — Chegada',
    km: '13,43 km',
    descricao: 'Comunidade pesqueira que encerra o percurso, também conhecida como Prainha Ponta do Ubá.',
  },
];

const artesanato = [
  { id: 'art1', categoria: 'Cestaria', nome: 'Oficina de cestaria com cipó', local: 'Vila São Miguel', descricao: 'Oficina de trançado com cipó oferecida na comunidade, com duração aproximada de 2 horas. Agendamento pela Rede Caiçara de Turismo Comunitário.', contato: CONTATO_REDE_CAICARA, imagem: '', verificado: true, fonte: 'Cartilha Portos do Paraná' },
  { id: 'art2', categoria: 'Cestaria', nome: 'Cestos da Dona Iracema', local: 'Localização em confirmação', descricao: 'Artesanato em cestaria.', imagem: '', verificado: false },
  { id: 'art3', categoria: 'Cerâmica', nome: 'Ateliê Barro do Mar', local: 'Piaçaguera', descricao: 'Ateliê de cerâmica.', imagem: '', verificado: false },
  { id: 'art4', categoria: 'Madeira', nome: 'Marcenaria Seu Adão', local: 'Localização em confirmação', descricao: 'Peças em madeira.', imagem: '', verificado: false },
  { id: 'art5', categoria: 'Bordado', nome: 'Bordados da Enseada', local: 'Enseada do Cambará', descricao: 'Peças bordadas.', imagem: '', verificado: false },
  { id: 'art6', categoria: 'Geral', nome: 'Artesanatos Marizete', local: 'Ponta do Ubá', descricao: 'Artesanato local.', imagem: '', verificado: false },
];

const gastronomia = [
  { id: 'gas1', categoria: 'Café caiçara', nome: 'Café da manhã caiçara em Piaçaguera', local: 'Piaçaguera', descricao: 'Experiência tradicional oferecida aos visitantes que chegam à vila, inclusive em passeios de canoagem saindo de Paranaguá. Cardápios e valores na Rede Caiçara.', contato: CONTATO_REDE_CAICARA, imagem: '', verificado: true, fonte: 'Cartilha Portos do Paraná; Agência Estadual de Notícias' },
  { id: 'gas2', categoria: 'Frutos do mar', nome: 'Siri de São Miguel', local: 'Vila São Miguel', descricao: 'A carne de siri capturado pelos pescadores locais é a especialidade da vila. Os visitantes também podem participar do descasque do siri.', contato: CONTATO_REDE_CAICARA, imagem: '', verificado: true, fonte: 'Cartilha Portos do Paraná' },
  { id: 'gas3', categoria: 'Frutos do mar', nome: 'Restaurante Piaçai', local: 'Piaçaguera', descricao: 'Restaurante em Piaçaguera.', imagem: '', verificado: false },
  { id: 'gas4', categoria: 'Doces e salgados', nome: 'Janeh Bolos e Salgados', local: 'Piaçaguera', descricao: 'Bolos e salgados.', imagem: '', verificado: false },
  { id: 'gas5', categoria: 'Restaurante', nome: 'Restaurante do Seu Odair', local: 'Piaçaguera', descricao: 'Restaurante em Piaçaguera.', imagem: '', verificado: false },
  { id: 'gas6', categoria: 'Frutos do mar', nome: 'Quiosque da Enseada', local: 'Enseada do Cambará', descricao: 'Quiosque na Enseada do Cambará.', imagem: '', verificado: false },
];

const pontosTuristicos = [
  { id: 'pt1', categoria: 'História', nome: 'Igreja de Nossa Senhora da Imaculada Conceição', local: 'À esquerda do trapiche de Piaçaguera', descricao: 'Igreja católica construída sobre um sambaqui, um dos principais símbolos da vila. Os moradores contam a lenda de uma noiva que assombra a igreja.', imagem: 'igreja-sambaqui.jpg', alt: 'Igreja de Nossa Senhora da Imaculada Conceição, branca com porta azul, sobre um morrinho gramado em Piaçaguera', verificado: true, fonte: 'Cartilha Portos do Paraná; Band Paraná' },
  { id: 'pt2', categoria: 'Natureza', nome: 'Trilhas da vila de Piaçaguera', local: 'Piaçaguera', descricao: 'Caminhadas pelas trilhas da própria vila, indicadas na cartilha oficial das comunidades da Baía de Paranaguá.', imagem: 'trilha-vila-piacaguera.jpg', alt: 'Trilha de terra cercada de vegetação na vila de Piaçaguera', verificado: true, fonte: 'Cartilha Portos do Paraná' },
  { id: 'pt3', categoria: 'Natureza', nome: 'Morro do Careca', local: 'Vila São Miguel', descricao: 'Subida de dificuldade leve, com duração aproximada de 2 horas.', contato: CONTATO_REDE_CAICARA, imagem: '', verificado: true, fonte: 'Cartilha Portos do Paraná' },
  { id: 'pt4', categoria: 'Natureza', nome: 'Pôr do sol no trapiche de São Miguel', local: 'Vila São Miguel', descricao: 'O trapiche da comunidade é indicado para acompanhar o pôr do sol.', imagem: 'por-do-sol.jpg', alt: 'Pôr do sol sobre a baía, com barcos de pesca ancorados', verificado: true, fonte: 'Cartilha Portos do Paraná' },
  { id: 'pt5', categoria: 'Cultura', nome: 'Festas do Divino e do Senhor Bom Jesus', local: 'Vila São Miguel', descricao: 'Festas tradicionais da comunidade, realizadas entre julho e agosto. Confirme as datas antes de ir.', contato: CONTATO_REDE_CAICARA, imagem: '', verificado: true, fonte: 'Cartilha Portos do Paraná' },
  { id: 'pt6', categoria: 'Cultura', nome: 'Trilha Caiçara', local: 'Ponta do Ubá, São Miguel e Piaçaguera', descricao: 'Caminhada guiada de cerca de 12 km, que parte da Ponta do Ubá, passa pela Vila São Miguel e termina em Piaçaguera. Promovida pela Barcopar, em edições com data divulgada no calendário turístico.', imagem: 'trilha-tres-comunidades.jpg', alt: 'Vista aérea da orla e da mata no caminho entre as comunidades, com barcos na margem', verificado: true, fonte: 'Governo do Paraná; Bem Paraná' },
  { id: 'pt7', categoria: 'Cultura', nome: 'Festa Caiçara de Piaçaguera', local: 'Piaçaguera', descricao: 'Evento cultural da comunidade. Datas em confirmação.', imagem: '', verificado: false },
];

const hospedagens = [
  { id: 'hosp1', categoria: 'Pousada', nome: 'Pousada da Dona Deolinda', local: 'À direita do trapiche de Piaçaguera', descricao: 'Pousada em Piaçaguera.', imagem: '', verificado: false },
  { id: 'hosp2', categoria: 'Camping', nome: 'Camping Familiar da Ponta do Ubá', local: 'Ponta do Ubá', descricao: 'Área de camping na Ponta do Ubá.', imagem: '', verificado: false },
];

// ---------------- Estado dos filtros/busca por seção ----------------

const estado = {
  artesanato: { busca: '', categoria: 'todas' },
  gastronomia: { busca: '', categoria: 'todas' },
  pontos: { busca: '', categoria: 'todas' },
  hospedagens: { busca: '', categoria: 'todas' },
};

// ---------------- Utilidades ----------------

function escapeHtml(texto) {
  const div = document.createElement('div');
  div.textContent = texto ?? '';
  return div.innerHTML;
}

const ICONES = {
  'Cestaria': '\u{1F9FA}', 'Cerâmica': '\u{1F3FA}', 'Madeira': '\u{1FAB5}', 'Bordado': '\u{1F9F5}', 'Geral': '\u{1F3A8}',
  'Café caiçara': '\u{2615}', 'Frutos do mar': '\u{1F980}', 'Doces e salgados': '\u{1F370}', 'Restaurante': '\u{1F37D}\u{FE0F}',
  'Natureza': '\u{1F33F}', 'Cultura': '\u{1F3B6}', 'História': '\u{26EA}',
  'Pousada': '\u{1F6CF}\u{FE0F}', 'Camping': '\u{26FA}',
};

// ---------------- Modo edição (prévia de fotos) ----------------
// Abra o site com ?editar no final do endereço (ex.: index.html?editar).
// Cada card ganha o botão "Trocar foto": escolha uma foto do celular/computador
// e ela aparece na hora. ATENÇÃO: a foto fica salva só neste navegador, como
// prévia. Para valer para todos os visitantes, a foto precisa estar no
// repositório (assets/fotos/) ou em um link, com o campo "imagem" preenchido.
const MODO_EDICAO = (() => {
  const params = new URLSearchParams(location.search);
  try {
    if (params.has('sair')) localStorage.removeItem('modoEdicao');
    if (params.has('editar')) localStorage.setItem('modoEdicao', '1');
    return localStorage.getItem('modoEdicao') === '1';
  } catch (e) {
    return params.has('editar');
  }
})();

function fotoPrevia(id) {
  if (!MODO_EDICAO) return null;
  try { return localStorage.getItem('foto:' + id); } catch (e) { return null; }
}

const PASTA_FOTOS = 'assets/fotos/';

function caminhoDaFoto(nome) {
  const n = String(nome || '').trim();
  if (!n) return '';
  if (/^(https?:|data:|\/|assets\/)/i.test(n)) return n; // link ou caminho completo
  return PASTA_FOTOS + n;                                   // só o nome do arquivo
}

function visualDoItem(item) {
  const icone = ICONES[item.categoria] || '📍';
  const previa = fotoPrevia(item.id);
  const fonte = previa || caminhoDaFoto(item.imagem);
  if (fonte) {
    const src = previa ? previa : escapeHtml(fonte);
    return `<img src="${src}" alt="${escapeHtml(item.alt || item.nome)}" loading="lazy" onerror="this.replaceWith(document.createTextNode('${icone}'))">`;
  }
  return icone;
}

function hrefSeguro(url) {
  return /^(https?:|tel:|mailto:)/i.test(url || '') ? url : '';
}

function categoriasUnicas(lista) {
  return ['todas', ...new Set(lista.map((item) => item.categoria))];
}

// ---------------- Renderização de grids com busca + filtro ----------------

function renderGrid(containerId, dados, chaveEstado, corClasse) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const { busca, categoria } = estado[chaveEstado];
  const termo = busca.trim().toLowerCase();

  const filtrados = dados.filter((item) => {
    const bateCategoria = categoria === 'todas' || item.categoria === categoria;
    const bateBusca = !termo || item.nome.toLowerCase().includes(termo) || item.descricao.toLowerCase().includes(termo);
    return bateCategoria && bateBusca;
  });

  if (filtrados.length === 0) {
    container.innerHTML = `
      <div class="sem-resultados">
        <strong>Nada encontrado por aqui</strong>
        Tente outro termo de busca ou escolha "todas" nos filtros de categoria.
      </div>`;
    return;
  }

  container.innerHTML = filtrados
    .map(
      (item) => `
    <div class="card-item revelar visivel" data-id="${item.id}" data-secao="${chaveEstado}" tabindex="0" role="button" aria-label="Ver detalhes de ${escapeHtml(item.nome)}">
      <div class="imagem-card ${corClasse}">${visualDoItem(item)}${MODO_EDICAO ? botoesEdicao(item) : ''}</div>
      <div class="conteudo-card">
        <div class="categoria-tag">${escapeHtml(item.categoria)}</div>
        <h4>${escapeHtml(item.nome)}</h4>
        <p class="local">📍 ${escapeHtml(item.local)}</p>
        <p class="desc-curta">${escapeHtml(item.descricao)}</p>
        ${item.verificado ? '' : '<span class="selo-confirmar">em confirmação</span>'}
      </div>
    </div>`
    )
    .join('');

  container.querySelectorAll('.card-item').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.botoes-edicao')) return;
      abrirModal(chaveEstado, card.dataset.id);
    });
    card.addEventListener('keydown', (e) => {
      if (e.target.closest('.botoes-edicao')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        abrirModal(chaveEstado, card.dataset.id);
      }
    });
  });
}

function renderFiltros(chipsId, dados, chaveEstado, aoMudar) {
  const container = document.getElementById(chipsId);
  if (!container) return;
  const categorias = categoriasUnicas(dados);

  container.innerHTML = categorias
    .map(
      (cat) =>
        `<button type="button" class="chip-filtro ${cat === estado[chaveEstado].categoria ? 'ativo' : ''}" data-categoria="${escapeHtml(cat)}">${cat === 'todas' ? 'Todas' : escapeHtml(cat)}</button>`
    )
    .join('');

  container.querySelectorAll('.chip-filtro').forEach((chip) => {
    chip.addEventListener('click', () => {
      estado[chaveEstado].categoria = chip.dataset.categoria;
      container.querySelectorAll('.chip-filtro').forEach((c) => c.classList.toggle('ativo', c === chip));
      aoMudar();
    });
  });
}

function botoesEdicao(item) {
  const temPrevia = !!fotoPrevia(item.id);
  return `<div class="botoes-edicao">
    <button type="button" class="btn-editar" data-acao="trocar" data-id="${item.id}">📷 Trocar foto</button>
    ${temPrevia ? `<button type="button" class="btn-editar" data-acao="restaurar" data-id="${item.id}">↺ Original</button>` : ''}
  </div>`;
}

function redimensionar(arquivo, max = 900) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onerror = reject;
    leitor.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const escala = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * escala);
        canvas.height = Math.round(img.height * escala);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.src = leitor.result;
    };
    leitor.readAsDataURL(arquivo);
  });
}

function atualizarModalAberto() {
  const modal = document.getElementById('modal-detalhe');
  if (!modalAtual || !modal.classList.contains('aberto')) return;
  const item = bancoDados[modalAtual.secao].find((i) => i.id === modalAtual.id);
  if (item) document.getElementById('modal-imagem').innerHTML = visualDoItem(item) + botoesEdicao(item);
}

function renderTodasAsGrids() {
  renderGrid('grid-artesanato', artesanato, 'artesanato', 'cor-artesanato');
  renderGrid('grid-gastronomia', gastronomia, 'gastronomia', 'cor-gastronomia');
  renderGrid('grid-pontos', pontosTuristicos, 'pontos', 'cor-pontos');
  renderGrid('grid-hospedagens', hospedagens, 'hospedagens', 'cor-hospedagem');
}

function configurarModoEdicao() {
  if (!MODO_EDICAO) return;

  const aviso = document.createElement('div');
  aviso.className = 'aviso-edicao';
  aviso.innerHTML = `<strong>Modo edição.</strong> As fotos que você trocar aparecem só neste navegador, como prévia.
    Para publicar para todos, coloque a foto em <code>assets/fotos/</code> (ou use um link) e preencha o campo <code>imagem</code> do item no <code>script.js</code>.
    <button type="button" id="limpar-previas">Limpar todas as prévias</button>
    <a href="?sair">Sair do modo edição</a>`;
  document.body.prepend(aviso);

  const entrada = document.createElement('input');
  entrada.type = 'file';
  entrada.accept = 'image/*';
  entrada.hidden = true;
  document.body.appendChild(entrada);

  let itemAtual = null;

  document.addEventListener('click', (e) => {
    const botao = e.target.closest('.btn-editar');
    if (!botao) return;
    e.preventDefault();
    e.stopPropagation();
    if (botao.dataset.acao === 'trocar') {
      itemAtual = botao.dataset.id;
      entrada.value = '';
      entrada.click();
    } else if (botao.dataset.acao === 'restaurar') {
      try { localStorage.removeItem('foto:' + botao.dataset.id); } catch (err) {}
      renderTodasAsGrids();
      atualizarModalAberto();
    }
  }, true);

  entrada.addEventListener('change', async () => {
    const arquivo = entrada.files[0];
    if (!arquivo || !itemAtual) return;
    try {
      const dataUrl = await redimensionar(arquivo);
      localStorage.setItem('foto:' + itemAtual, dataUrl);
      renderTodasAsGrids();
      atualizarModalAberto();
    } catch (err) {
      alert('Não foi possível usar essa foto (arquivo inválido ou memória do navegador cheia). Tente uma foto menor.');
    }
  });

  document.getElementById('limpar-previas').addEventListener('click', () => {
    try {
      Object.keys(localStorage).filter((k) => k.startsWith('foto:')).forEach((k) => localStorage.removeItem(k));
    } catch (err) {}
    renderTodasAsGrids();
    atualizarModalAberto();
  });
}

// ---------------- Modal de detalhes ----------------

const bancoDados = { artesanato, gastronomia, pontos: pontosTuristicos, hospedagens };

let ultimoFoco = null;
let modalAtual = null;

function abrirModal(secao, id) {
  ultimoFoco = document.activeElement;
  const item = bancoDados[secao].find((i) => i.id === id);
  if (!item) return;

  const modal = document.getElementById('modal-detalhe');
  const corClasse = { artesanato: 'cor-artesanato', gastronomia: 'cor-gastronomia', pontos: 'cor-pontos', hospedagens: 'cor-hospedagem' }[secao];

  document.getElementById('modal-imagem').className = `modal-imagem ${corClasse}`;
  document.getElementById('modal-imagem').innerHTML = visualDoItem(item) + (MODO_EDICAO ? botoesEdicao(item) : '');
  modalAtual = { secao, id };
  document.getElementById('modal-categoria').textContent = item.categoria;
  document.getElementById('modal-nome').textContent = item.nome;
  document.getElementById('modal-local').textContent = `📍 ${item.local}`;
  document.getElementById('modal-descricao').textContent = item.descricao;

  const notaEl = document.getElementById('modal-nota');
  if (notaEl) {
    notaEl.textContent = item.verificado
      ? (item.fonte ? `Fonte: ${item.fonte}.` : '')
      : 'Informações em confirmação com a comunidade.';
  }

  const acoes = document.getElementById('modal-acoes');
  const href = hrefSeguro(item.contato);
  const externo = /^https?:/i.test(href);
  acoes.innerHTML = href
    ? `<a href="${escapeHtml(href)}" class="botao botao-contato"${externo ? ' target="_blank" rel="noopener"' : ''}>Entrar em contato</a>`
    : '';

  modal.classList.add('aberto');
  document.body.style.overflow = 'hidden';
  document.getElementById('fechar-modal').focus();
}

function fecharModal() {
  document.getElementById('modal-detalhe').classList.remove('aberto');
  document.body.style.overflow = '';
  if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
}

// ---------------- Trilha: renderização dos pontos ----------------

function renderTrilha() {
  const container = document.getElementById('lista-trilha');
  if (!container) return;

  container.innerHTML = trilhaPontos
    .map(
      (p, i) => `
    <div class="parada ${p.tipo}">
      <div class="marcador">${i + 1}</div>
      <div class="parada-card">
        <h4>${escapeHtml(p.nome)}</h4>
        <span class="km">${escapeHtml(p.km)} desde o início</span>
        <p class="desc">${escapeHtml(p.descricao)}</p>
      </div>
    </div>`
    )
    .join('');
}

// ---------------- Menu mobile ----------------

function configurarMenuMobile() {
  const btn = document.getElementById('btn-menu-mobile');
  const menu = document.getElementById('menu-principal');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => menu.classList.remove('aberto'));
  });
}

// ---------------- Botão voltar ao topo ----------------

function configurarBotaoTopo() {
  const btn = document.getElementById('btn-topo');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visivel', window.scrollY > 500);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---------------- Revelação suave ao rolar (um único observer) ----------------

function configurarRevelacao() {
  const alvos = document.querySelectorAll('.revelar:not(.visivel)');
  if (!('IntersectionObserver' in window) || alvos.length === 0) {
    alvos.forEach((el) => el.classList.add('visivel'));
    return;
  }
  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  alvos.forEach((el) => observer.observe(el));
}

// ---------------- Páginas (uma seção por vez) ----------------
// A página inicial mostra só o topo e os quadrados. Ao clicar em um quadrado
// (ou no menu), o site mostra apenas aquela seção, com botão para voltar.
// Funciona pelo endereço: #gastronomia, #artesanato etc. (o botão "voltar"
// do navegador também funciona).

const PAGINAS = {
  trilha: 'Mapa da Trilha',
  artesanato: 'Artesanato Local',
  gastronomia: 'Gastronomia',
  pontos: 'Pontos Turísticos',
  hospedagens: 'Hospedagens',
};
const TITULO_BASE = 'Descubra Piaçaguera — Conecta Caiçara';

function configurarPaginas() {
  document.body.classList.add('paginas');

  Object.keys(PAGINAS).forEach((id) => {
    const secao = document.getElementById(id);
    const container = secao && secao.querySelector('.container');
    if (!container) return;
    secao.classList.add('secao-pagina');

    const topo = document.createElement('nav');
    topo.className = 'pagina-topo';
    topo.setAttribute('aria-label', 'Voltar');
    topo.innerHTML = '<a href="#lobby" class="voltar-inicio">← Voltar ao início</a>';
    container.prepend(topo);

    const outras = Object.entries(PAGINAS)
      .filter(([chave]) => chave !== id)
      .map(([chave, nome]) => `<a href="#${chave}" class="chip-filtro">${nome}</a>`)
      .join('');
    const base = document.createElement('div');
    base.className = 'pagina-outras';
    base.innerHTML = `<h3>Continue descobrindo</h3><div class="filtros-categorias">${outras}</div>`;
    container.append(base);
  });

  function atualizar(rolar) {
    const id = decodeURIComponent(location.hash.slice(1));
    const ativa = PAGINAS[id] ? id : null;

    document.body.classList.toggle('pagina-interna', !!ativa);
    Object.keys(PAGINAS).forEach((chave) => {
      const secao = document.getElementById(chave);
      if (secao) secao.classList.toggle('ativa', chave === ativa);
    });
    document.querySelectorAll('#menu-principal a').forEach((link) => {
      link.classList.toggle('ativo', link.getAttribute('href') === '#' + ativa);
    });
    document.title = ativa ? `${PAGINAS[ativa]} — Descubra Piaçaguera` : TITULO_BASE;

    if (ativa) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (id === 'lobby') {
      const lobby = document.getElementById('lobby');
      if (lobby) lobby.scrollIntoView();
    } else if (rolar) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  window.addEventListener('hashchange', () => atualizar(true));
  atualizar(false);
}

// ---------------- Inicialização ----------------

document.addEventListener('DOMContentLoaded', () => {
  // ano no rodapé
  const anoEl = document.getElementById('ano-atual');
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  renderTrilha();

  renderFiltros('filtros-artesanato', artesanato, 'artesanato', () => renderGrid('grid-artesanato', artesanato, 'artesanato', 'cor-artesanato'));
  renderFiltros('filtros-gastronomia', gastronomia, 'gastronomia', () => renderGrid('grid-gastronomia', gastronomia, 'gastronomia', 'cor-gastronomia'));
  renderFiltros('filtros-pontos', pontosTuristicos, 'pontos', () => renderGrid('grid-pontos', pontosTuristicos, 'pontos', 'cor-pontos'));
  renderFiltros('filtros-hospedagens', hospedagens, 'hospedagens', () => renderGrid('grid-hospedagens', hospedagens, 'hospedagens', 'cor-hospedagem'));

  renderGrid('grid-artesanato', artesanato, 'artesanato', 'cor-artesanato');
  renderGrid('grid-gastronomia', gastronomia, 'gastronomia', 'cor-gastronomia');
  renderGrid('grid-pontos', pontosTuristicos, 'pontos', 'cor-pontos');
  renderGrid('grid-hospedagens', hospedagens, 'hospedagens', 'cor-hospedagem');

  // busca por seção
  [
    ['busca-artesanato', 'artesanato', () => renderGrid('grid-artesanato', artesanato, 'artesanato', 'cor-artesanato')],
    ['busca-gastronomia', 'gastronomia', () => renderGrid('grid-gastronomia', gastronomia, 'gastronomia', 'cor-gastronomia')],
    ['busca-pontos', 'pontos', () => renderGrid('grid-pontos', pontosTuristicos, 'pontos', 'cor-pontos')],
    ['busca-hospedagens', 'hospedagens', () => renderGrid('grid-hospedagens', hospedagens, 'hospedagens', 'cor-hospedagem')],
  ].forEach(([inputId, chave, render]) => {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener('input', (e) => {
      estado[chave].busca = e.target.value;
      render();
    });
  });

  document.getElementById('fechar-modal').addEventListener('click', fecharModal);
  document.getElementById('modal-detalhe').addEventListener('click', (e) => {
    if (e.target.id === 'modal-detalhe') fecharModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
  });

  configurarPaginas();
  configurarModoEdicao();
  configurarMenuMobile();
  configurarBotaoTopo();
  configurarRevelacao();
});
