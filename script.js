// ===== CONFIGURAÇÕES (edite aqui) =====
var NUMERO = '5541992541299';   // WhatsApp com 55 + DDD + número
var INSTAGRAM = '#';            // coloque o link do seu Instagram

// ===== PRODUTOS (edite nomes, preços e emojis) =====
// Para usar foto real, troque o emoji por: '<img src="foto.jpg" alt="nome" style="width:100%;height:100%;object-fit:cover;border-radius:10px">'
var produtos = [
  { nome: 'Chaveiro hama pequeno', preco: 'R$ 6,00',  img: '👻' },
  { nome: 'Chaveiro hama médio',   preco: 'R$ 10,00', img: '🦉' },
  { nome: 'Chaveiro hama grande',  preco: 'R$ 15,00', img: '🛡️' },
  { nome: 'Combo 4 fantasminhas',  preco: 'R$ 10,00', img: '🎮' },
  { nome: 'Laço de crochê (P R$ 6 | M R$ 8 | G R$ 10)', preco: 'a partir de R$ 6', img: '🎀' },
  { nome: 'Faixa de cabelo (3 por R$ 20)', preco: 'R$ 8,00', img: '🧵' },
  { nome: 'Crochê bag', preco: 'R$ 10,00', img: '👜' },
  { nome: 'Chaveiro personalizado', preco: '+ R$ 3,00', img: '✨' }
];

var categorias = [
  { nome: 'Chaveiros', cor: '#FFE27A' },
  { nome: 'Laços', cor: '#fff' },
  { nome: 'Faixas de cabelo', cor: '#8EC5E8' },
  { nome: 'Crochê bags', cor: '#FFF3B0' },
  { nome: 'Personalizados', cor: '#D6ECFA' },
  { nome: 'Combos', cor: '#FFE27A' }
];

// ===== FUNÇÕES =====
function zap(texto) {
  return 'https://wa.me/' + NUMERO + '?text=' + encodeURIComponent(texto);
}

function flor(cor) {
  var c = '';
  for (var i = 0; i < 8; i++) {
    var a = i * 45 * Math.PI / 180;
    c += '<circle cx="' + (50 + 30 * Math.cos(a)).toFixed(1) + '" cy="' + (50 + 30 * Math.sin(a)).toFixed(1) + '" r="19"/>';
  }
  return '<svg viewBox="0 0 100 100" aria-hidden="true" fill="' + cor + '">' + c + '<circle cx="50" cy="50" r="30"/></svg>';
}

// Produtos
document.getElementById('produtos').innerHTML = produtos.map(function (p) {
  return '<div class="card"><div class="ph">' + p.img + '</div><h3>' + p.nome + '</h3><div class="price">' + p.preco +
    '</div><a class="btn" target="_blank" rel="noopener" href="' + zap('Oi! Quero pedir: ' + p.nome) + '">Pedir pelo WhatsApp</a></div>';
}).join('');

// Categorias em formato de flor
document.getElementById('flowers').innerHTML = categorias.map(function (c) {
  return '<a class="flower" href="#loja">' + flor(c.cor) + '<span>' + c.nome + '</span></a>';
}).join('');

// Flores decorativas do banner
document.querySelectorAll('[data-flower]').forEach(function (el) {
  el.innerHTML = flor(el.getAttribute('data-flower'));
});

// Faixa de texto que corre
var itens = 'chaveiros ✿ laços ✿ faixas de cabelo ✿ crochê bags ✿ personalizados ✿ combos ✿ ';
document.getElementById('strip').textContent = itens.repeat(6);

// Links do WhatsApp e Instagram
['waMain', 'waFoot', 'waFloat', 'waSobre'].forEach(function (id) {
  var e = document.getElementById(id);
  e.href = zap('Oi! Vim pelo site da Driari e quero fazer um pedido.');
  e.target = '_blank';
  e.rel = 'noopener';
});
document.getElementById('insta').href = INSTAGRAM;

// Menu do celular
var nav = document.getElementById('nav');
document.getElementById('menuBtn').addEventListener('click', function () {
  nav.classList.toggle('open');
});
nav.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') nav.classList.remove('open');
});
