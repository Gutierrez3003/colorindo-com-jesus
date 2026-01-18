// js/colorir.js – APENAS JavaScript (sem CSS!)

const canvas = document.getElementById("desenho");
const ctx = canvas.getContext("2d");
let pintando = false;
let corAtual = "#000000";
const tamanhoPincel = 22;

// Ajusta canvas ao tamanho da tela
function ajustarTamanho() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * 0.95;
  canvas.height = window.innerHeight - 350;
  carregarDesenho();
}
window.addEventListener("resize", ajustarTamanho);
ajustarTamanho();

// Selecionar cor
document.querySelectorAll(".cor").forEach(cor => {
  cor.addEventListener("click", () => {
    document.querySelectorAll(".cor").forEach(c => c.classList.remove("selecionada"));
    cor.classList.add("selecionada");
    corAtual = cor.dataset.cor;
  });
});

// Pintar
function iniciar(e) { pintando = true; desenhar(e); }
function parar() { pintando = false; ctx.beginPath(); }

function desenhar(e) {
  if (!pintando) return;
  e.preventDefault();
  
  const rect = canvas.getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = corAtual;
  ctx.beginPath();
  ctx.arc(x, y, tamanhoPincel, 0, Math.PI * 2);
  ctx.fill();
}

// Eventos mouse + toque
canvas.addEventListener("mousedown", iniciar);
canvas.addEventListener("mousemove", desenhar);
canvas.addEventListener("mouseup", parar);
canvas.addEventListener("mouseout", parar);

canvas.addEventListener("touchstart", iniciar);
canvas.addEventListener("touchmove", desenhar);
canvas.addEventListener("touchend", parar);

// Funções dos botões
function limpar() {
  if (confirm("Apagar tudo mesmo?")) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    carregarDesenho();
  }
}

function salvar() {
  const link = document.createElement("a");
  link.download = `arte-com-jesus-${new Date().toISOString().slice(0,10)}.png`;
  link.href = canvas.toDataURL();
  link.click();
  alert("Salvo na galeria! Mostra pra mamãe! ❤️");
}

function voltar() {
  window.location.href = "index.html";
}

// Carregar desenho de fundo
function carregarDesenho() {
  const img = new Image();
  img.src = "imagens/desenhos/menino-jesus.png"; // você pode trocar depois
  img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}
carregarDesenho();