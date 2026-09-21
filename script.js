/* ============================================================
   DESCUBRA PIAÇAGUERA — script.js
   ------------------------------------------------------------
   Todos os dados abaixo são DEMONSTRATIVOS (marcados com
   "[EXEMPLO]"). Substitua pelos dados reais coletados na visita
   de campo e validados com os moradores antes de publicar.

   Estrutura pensada para, no futuro, trocar os arrays abaixo por
   chamadas a um banco de dados/painel administrativo sem precisar
   reescrever a lógica de renderização, busca e filtros.
   ============================================================ */

// ---------------- Dados demonstrativos ----------------

const trilhaPontos = [
  {
    tipo: 'inicio',
    nome: 'Piaçaguera — Ponto de partida',
    km: '0 km',
    descricao: 'Início da trilha, próximo ao mapa físico e ao ponto de encontro dos visitantes.',
  },
  {
    tipo: 'parada',
    nome: 'Mirante da Restinga',
    km: '1,8 km',
    descricao: 'Parada com vista para o mar, indicada para descanso e fotos.',
  },
  {
    tipo: 'parada',
    nome: 'Trecho da Mata Fechada',
    km: '3,4 km',
    descricao: 'Trecho sombreado entre a vegetação nativa, com sinalização de fauna local.',
  },
  {
    tipo: 'parada',
    nome: 'São Miguel',
    km: '7,8 km',
    descricao: 'Pequena enseada usada tradicionalmente por pescadores da comunidade.',
  },
  {
    tipo: 'fim',
    nome: 'Ponta de Uba — Chegada',
    km: '13,43 km',
    descricao: 'Ponto final da trilha, com acesso à praia e aos empreendimentos locais.',
  },
];

const artesanato = [
  { id: 'art1', categoria: 'Cestaria', nome: 'Cestos da Dona Iracema', local: 'Próximo ao Mirante da Restinga', descricao: 'Cestos e peneiras trançados em fibra natural, técnica passada entre gerações.', contato: '#' },
  { id: 'art2', categoria: 'Cerâmica', nome: 'Ateliê Barro do Mar', local: 'Centro de Piaçaguera', descricao: 'Peças de cerâmica inspiradas em elementos da natureza local.', contato: '#' },
  { id: 'art3', categoria: 'Madeira', nome: 'Marcenaria Seu Adão', local: 'Trecho da Mata Fechada', descricao: 'Utensílios e esculturas em madeira de reaproveitamento.', contato: '#' },
  { id: 'art4', categoria: 'Bordado', nome: 'Bordados da Enseada', local: 'Enseada do Cambará', descricao: 'Panos e roupas bordados com motivos da fauna e flora caiçara.', contato: '#' },
  { id: 'art5', categoria: 'Greal', nome: 'Artezanatos Marizete', local: 'Ponta de Uba', descricao: 'Bolsas e chapéus de palha trançada, produção familiar.', contato: '#' },
];

const gastronomia = [
  { id: 'gas1', categoria: 'Frutos do mar', nome: 'Restaurante Piaçai', local: 'Piaçaguera', descricao: 'Pratos à base de peixe e frutos do mar frescos, receita da família.', contato: '#' },
  { id: 'gas2', categoria: 'Doces', nome: 'Janeh Bolos e Salgados', local: 'Piaçaguera', descricao: 'Doces caseiros de banana-da-terra e frutas da estação.', contato: '#' },
  { id: 'gas3', categoria: 'Restaurante', nome: 'Restaurante do Seu Odair', local: 'Piaçaguera', descricao: 'Sucos e água de coco para reabastecer durante a trilha.', contato: '#' },
  { id: 'gas4', categoria: 'Frutos do mar', nome: 'Quiosque da Enseada', local: 'Enseada do Cambará', descricao: 'Petiscos de pescado local, servidos à beira-mar.', contato: '#' },
];

const pontosTuristicos = [
  { id: 'pt1', categoria: 'Natureza', nome: 'Mirante da Restinga', local: 'Trilha, km 1,8', descricao: 'Vista panorâmica da costa, ponto tradicional de observação de aves.' },
  { id: 'pt2', categoria: 'Cultura', nome: 'Festa Caiçara de Piaçaguera', local: 'Centro de Piaçaguera', descricao: 'Evento cultural que reúne shows de fandango e outros ritmos tradicionais.' },
  { id: 'pt3', categoria: 'Natureza', nome: 'Trilha da Mata Fechada', local: 'x', descricao: 'x' },
  { id: 'pt4', categoria: 'História', nome: 'Igreja de Nossa Senhora da Imaculada Conceição', local: 'á esquerda do trapiche de Piaçaguera', descricao: ' Uma igrejinha histórica construída sobre um sambaqui.' },
];

const hospedagens = [
  { id: 'hosp1', categoria: 'Pousada', nome: 'Pousada da Dona Deolinda', local: 'á direita do trapiche de Piaçaguera', descricao: 'Pousada familiar com vista para o mar e café da manhã caseiro.', contato: '#' },
  { id: 'hosp2', categoria: 'Camping', nome: 'Camping Familiar da Ponta do Ubá', local: 'Ponta de Uba', descricao: 'Área de camping simples, próxima à praia e aos quiosques locais.', contato: '#' },
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
      <div class="imagem-card ${corClasse}">${item.emoji}</div>
      <div class="conteudo-card">
        <div class="categoria-tag">${escapeHtml(item.categoria)}</div>
        <h4>${escapeHtml(item.nome)}</h4>
        <p class="local">📍 ${escapeHtml(item.local)}</p>
        <p class="desc-curta">${escapeHtml(item.descricao)}</p>
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

function abrirModal(secao, id) {
  const item = bancoDados[secao].find((i) => i.id === id);
  if (!item) return;

  const modal = document.getElementById('modal-detalhe');
  const corClasse = { artesanato: 'cor-artesanato', gastronomia: 'cor-gastronomia', pontos: 'cor-pontos', hospedagens: 'cor-hospedagem' }[secao];

  document.getElementById('modal-imagem').className = `modal-imagem ${corClasse}`;
  document.getElementById('modal-imagem').textContent = item.emoji;
  document.getElementById('modal-categoria').textContent = item.categoria;
  document.getElementById('modal-nome').textContent = item.nome;
  document.getElementById('modal-local').textContent = `📍 ${item.local}`;
  document.getElementById('modal-descricao').textContent = item.descricao;

  const acoes = document.getElementById('modal-acoes');
  acoes.innerHTML = item.contato
    ? `<a href="${item.contato}" class="botao botao-contato" target="_blank" rel="noopener">Entrar em contato</a>`
    : '';

  modal.classList.add('aberto');
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  document.getElementById('modal-detalhe').classList.remove('aberto');
  document.body.style.overflow = '';
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
