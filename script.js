let gastos = [];
let mesSelecionado = "";

// QUANDO A PÁGINA ABRIR
window.onload = () => {
  const hoje = new Date();
  const mesAtual = hoje.toISOString().slice(0, 7);
  document.getElementById("mes").value = mesAtual;
  mesSelecionado = mesAtual;
};

// ADICIONAR GASTO
function adicionarGasto() {
  const descricao = document.getElementById("descricao").value.trim();
  const valor = parseFloat(document.getElementById("valor").value);

  if (!descricao || isNaN(valor)) {
    alert("Preencha corretamente");
    return;
  }

  const data = new Date();
  const mesAno = data.toISOString().slice(0, 7);

  gastos.push({
    descricao,
    valor,
    mesAno
  });

  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";

  filtrarPorMes();
}

// FILTRAR POR MÊS
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
        <span>${gasto.descricao}</span>
        <span>R$ ${gasto.valor.toFixed(2)}</span>
      `;
      lista.appendChild(li);
    });

  document.getElementById("total").innerText = total.toFixed(2);
}
