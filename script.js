const CONTATO_REDE_CAICARA = 'tel:+5541992022155';

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
  { id: 'art1', categoria: 'Cestaria', nome: 'Oficina de cestaria com cipó', local: 'Vila São Miguel', descricao: 'Oficina de trançado com cipó oferecida na comunidade, com duração aproximada de 2 horas. Agendamento pela Rede Caiçara de Turismo Comunitário.', contato: CONTATO_REDE_CAICARA, verificado: true, fonte: 'Cartilha Portos do Paraná' },
  { id: 'art2', categoria: 'Cestaria', nome: 'Cestos da Dona Iracema', local: 'Localização em confirmação', descricao: 'Artesanato em cestaria.', verificado: false },
  { id: 'art3', categoria: 'Cerâmica', nome: 'Ateliê Barro do Mar', local: 'Piaçaguera', descricao: 'Ateliê de cerâmica.', verificado: false },
  { id: 'art4', categoria: 'Madeira', nome: 'Marcenaria Seu Adão', local: 'Localização em confirmação', descricao: 'Peças em madeira.', verificado: false },
  { id: 'art5', categoria: 'Bordado', nome: 'Bordados da Enseada', local: 'Enseada do Cambará', descricao: 'Peças bordadas.', verificado: false },
  { id: 'art6', categoria: 'Geral', nome: 'Artesanatos Marizete', local: 'Ponta do Ubá', descricao: 'Artesanato local.', verificado: true },
];

const gastronomia = [
  { id: 'gas1', categoria: 'Café caiçara', nome: 'Café da manhã caiçara em Piaçaguera', local: 'Piaçaguera', descricao: 'Experiência tradicional oferecida aos visitantes que chegam à vila, inclusive em passeios de canoagem saindo de Paranaguá. Cardápios e valores na Rede Caiçara.', contato: CONTATO_REDE_CAICARA, verificado: true, fonte: 'Cartilha Portos do Paraná; Agência Estadual de Notícias' },
  { id: 'gas2', categoria: 'Frutos do mar', nome: 'Siri de São Miguel', local: 'Vila São Miguel', descricao: 'A carne de siri capturado pelos pescadores locais é a especialidade da vila. Os visitantes também podem participar do descasque do siri.', contato: CONTATO_REDE_CAICARA, verificado: true, fonte: 'Cartilha Portos do Paraná' },
  { id: 'gas3', categoria: 'Frutos do mar', nome: 'Restaurante Piaçai', local: 'Piaçaguera', descricao: 'Restaurante em Piaçaguera.', verificado: true },
  { id: 'gas4', categoria: 'Doces e salgados', nome: 'Janeh Bolos e Salgados', local: 'Piaçaguera', descricao: 'Bolos e salgados.', verificado: true },
  { id: 'gas5', categoria: 'Restaurante', nome: 'Restaurante do Seu Odair', local: 'Piaçaguera', descricao: 'Restaurante em Piaçaguera.', verificado: true },
  { id: 'gas6', categoria: 'Frutos do mar', nome: 'Quiosque da Enseada', local: 'Enseada do Cambará', descricao: 'Quiosque na Enseada do Cambará.', verificado: false },
];

const pontosTuristicos = [
  { id: 'pt1', categoria: 'História', nome: 'Igreja de Nossa Senhora da Imaculada Conceição', local: 'À esquerda do trapiche de Piaçaguera', descricao: 'Igreja católica construída sobre um sambaqui, um dos principais símbolos da vila. Os moradores contam a lenda de uma noiva que assombra a igreja.', verificado: true, fonte: 'Cartilha Portos do Paraná; Band Paraná' },
  { id: 'pt2', categoria: 'Natureza', nome: 'Trilhas da vila de Piaçaguera', local: 'Piaçaguera', descricao: 'Caminhadas pelas trilhas da própria vila, indicadas na cartilha oficial das comunidades da Baía de Paranaguá.', verificado: true, fonte: 'Cartilha Portos do Paraná' },
  { id: 'pt3', categoria: 'Natureza', nome: 'Morro do Careca', local: 'Vila São Miguel', descricao: 'Subida de dificuldade leve, com duração aproximada de 2 horas.', contato: CONTATO_REDE_CAICARA, verificado: true, fonte: 'Cartilha Portos do Paraná' },
  { id: 'pt4', categoria: 'Natureza', nome: 'Pôr do sol no trapiche de São Miguel', local: 'Vila São Miguel', descricao: 'O trapiche da comunidade é indicado para acompanhar o pôr do sol.', verificado: true, fonte: 'Cartilha Portos do Paraná' },
  { id: 'pt5', categoria: 'Cultura', nome: 'Festas do Divino e do Senhor Bom Jesus', local: 'Vila São Miguel', descricao: 'Festas tradicionais da comunidade, realizadas entre julho e agosto. Confirme as datas antes de ir.', contato: CONTATO_REDE_CAICARA, verificado: true, fonte: 'Cartilha Portos do Paraná' },
  { id: 'pt6', categoria: 'Cultura', nome: 'Trilha Caiçara', local: 'Ponta do Ubá, São Miguel e Piaçaguera', descricao: 'Caminhada guiada de cerca de 12 km, que parte da Ponta do Ubá, passa pela Vila São Miguel e termina em Piaçaguera. Promovida pela Barcopar, em edições com data divulgada no calendário turístico.', verificado: true, fonte: 'Governo do Paraná; Bem Paraná' },
  { id: 'pt7', categoria: 'Cultura', nome: 'Festa Caiçara de Piaçaguera', local: 'Piaçaguera', descricao: 'Evento cultural da comunidade. Datas em confirmação.', verificado: false },
];

const hospedagens = [
  { id: 'hosp1', categoria: 'Pousada', nome: 'Pousada da Dona Deolinda', local: 'À direita do trapiche de Piaçaguera', descricao: 'Pousada em Piaçaguera.', verificado: true },
  { id: 'hosp2', categoria: 'Camping', nome: 'Pousada Mamangaba de Ubá', local: 'Ponta do Ubá', descricao: 'Pousada em Ponta de Ubá.', verificado: true },
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
  'Cestaria': '🧺', 'Cerâmica': '🏺', 'Madeira': '🪵', 'Bordado': '🧵', 'Geral': '🎨',
  'Café caiçara': '☕', 'Frutos do mar': '🦀', 'Doces e salgados': '🍰', 'Restaurante': '🍽️',
  'Natureza': '🌿', 'Cultura': '🎶', 'História': '⛪',
  'Pousada': '🛏️', 'Camping': '⛺',
};

function visualDoItem(item) {
  if (item.imagem) {
    return `<img src="${escapeHtml(item.imagem)}" alt="${escapeHtml(item.alt || item.nome)}" loading="lazy">`;
  }
  return ICONES[item.categoria] || '📍';
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
      <div class="imagem-card ${corClasse}">${visualDoItem(item)}</div>
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
    card.addEventListener('click', () => abrirModal(chaveEstado, card.dataset.id));
    card.addEventListener('keydown', (e) => {
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

// ---------------- Modal de detalhes ----------------

const bancoDados = { artesanato, gastronomia, pontos: pontosTuristicos, hospedagens };

let ultimoFoco = null;

function abrirModal(secao, id) {
  ultimoFoco = document.activeElement;
  const item = bancoDados[secao].find((i) => i.id === id);
  if (!item) return;

  const modal = document.getElementById('modal-detalhe');
  const corClasse = { artesanato: 'cor-artesanato', gastronomia: 'cor-gastronomia', pontos: 'cor-pontos', hospedagens: 'cor-hospedagem' }[secao];

  document.getElementById('modal-imagem').className = `modal-imagem ${corClasse}`;
  document.getElementById('modal-imagem').innerHTML = visualDoItem(item);
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

  configurarMenuMobile();
  configurarBotaoTopo();
  configurarRevelacao();
});
