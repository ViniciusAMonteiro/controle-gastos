const form = document.getElementById("form-gasto");
const lista = document.getElementById("lista-gastos");
const totalSpan = document.getElementById("total");
const resumoMensal = document.getElementById("resumo-mensal");
const graficoCanvas = document.getElementById("graficoMensal");

let grafico;
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

// salvar no navegador
function salvar() {
  localStorage.setItem("gastos", JSON.stringify(gastos));
}

// atualizar tela inteira
function atualizarTela() {
  lista.innerHTML = "";
  let total = 0;

  // ordenar por data (mais recente primeiro)
  gastos.sort((a, b) => new Date(b.data) - new Date(a.data));

  gastos.forEach((gasto, index) => {
    total += gasto.valor;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>📅 ${gasto.data} | ${gasto.descricao} - R$ ${gasto.valor.toFixed(2)}</span>
      <button onclick="remover(${index})">❌</button>
    `;
    lista.appendChild(li);
  });

  totalSpan.textContent = total.toFixed(2);
  atualizarResumoMensal();
  atualizarGraficoMensal();
}

// remover gasto
function remover(index) {
  gastos.splice(index, 1);
  salvar();
  atualizarTela();
}

// resumo por mês
function atualizarResumoMensal() {
  resumoMensal.innerHTML = "";
  const resumo = {};

  gastos.forEach(gasto => {
    const mes = gasto.data.slice(0, 7); // YYYY-MM
    resumo[mes] = (resumo[mes] || 0) + gasto.valor;
  });

  for (const mes in resumo) {
    const li = document.createElement("li");
    li.textContent = `📊 ${mes} - R$ ${resumo[mes].toFixed(2)}`;
    resumoMensal.appendChild(li);
  }
}

// gráfico mensal
function atualizarGraficoMensal() {
  const resumo = {};

  gastos.forEach(gasto => {
    const mes = gasto.data.slice(0, 7);
    resumo[mes] = (resumo[mes] || 0) + gasto.valor;
  });

  const meses = Object.keys(resumo);
  const valores = Object.values(resumo);

  if (grafico) {
    grafico.destroy();
  }

  grafico = new Chart(graficoCanvas, {
    type: "bar",
    data: {
      labels: meses,
      datasets: [{
        label: "Gastos por mês (R$)",
        data: valores
      }]
    }
  });
}

// adicionar gasto
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const descricao = document.getElementById("descricao").value;
  const valor = Number(document.getElementById("valor").value);
  const data = document.getElementById("data").value;

  gastos.push({ descricao, valor, data });

  salvar();
  atualizarTela();
  form.reset();
});

// iniciar app
atualizarTela();
