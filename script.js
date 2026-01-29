let gastos = [];
let mesSelecionado = "";

window.onload = () => {
  const hoje = new Date();
  const mesAtual = hoje.toISOString().slice(0, 7);
  document.getElementById("mes").value = mesAtual;
  mesSelecionado = mesAtual;
};

function adicionarGasto() {
  const descricao = document.getElementById("descricao").value.trim();
  const valorInput = document.getElementById("valor").value;
  const mes = document.getElementById("mes").value;

  if (!descricao || valorInput === "" || !mes) {
    alert("Preencha todos os campos");
    return;
  }

  const valor = parseFloat(valorInput);

  gastos.push({
    id: Date.now(),
    descricao,
    valor,
    mesAno: mes // ✅ USA O MÊS SELECIONADO
  });

  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";

  filtrarPorMes();
}

function filtrarPorMes() {
  mesSelecionado = document.getElementById("mes").value;
  const lista = document.getElementById("lista-gastos");
  lista.innerHTML = "";

  let total = 0;

  gastos
    .filter(gasto => gasto.mesAno === mesSelecionado)
    .forEach(gasto => {
      total += gasto.valor;

      const li = document.createElement("li");

      li.innerHTML = `
        <span>${gasto.descricao} — R$ ${gasto.valor.toFixed(2).replace('.', ',')}</span>
        <button class="excluir" onclick="excluirGasto(${gasto.id})">×</button>
      `;

      lista.appendChild(li);
    });

  document.getElementById("total").innerText =
    total.toFixed(2).replace('.', ',');
}

function excluirGasto(id) {
  gastos = gastos.filter(gasto => gasto.id !== id);
  filtrarPorMes();
}
