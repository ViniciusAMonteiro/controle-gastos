let gastos = [];
let total = 0;

function adicionarGasto() {
  const descricaoInput = document.getElementById("descricao");
  const valorInput = document.getElementById("valor");

  const descricao = descricaoInput.value.trim();
  const valor = parseFloat(valorInput.value);

  if (!descricao || isNaN(valor)) {
    alert("Preencha corretamente os campos");
    return;
  }

  gastos.push({ descricao, valor });
  total += valor;

  atualizarTela();

  descricaoInput.value = "";
  valorInput.value = "";
}

function atualizarTela() {
  const lista = document.getElementById("lista-gastos");
  lista.innerHTML = "";

  gastos.forEach(gasto => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${gasto.descricao}</span>
      <span>R$ ${gasto.valor.toFixed(2)}</span>
    `;

    lista.appendChild(li);
  });

  document.getElementById("total").innerText = total.toFixed(2);
}
