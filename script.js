// =========================
// URL DO APPS SCRIPT
// =========================

const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbwKfOAWrSYBm9AdFqGb4XxNOiqnHOGFUcgWSIN3X99Akic97PilyktEXzkn3kpRdnqL/exec";

// =========================
// VENDEDORES
// =========================

const vendedores = [
    { nome: "João Silva", supervisor: "Carlos Oliveira" },
    { nome: "José Santos", supervisor: "Carlos Oliveira" },
    { nome: "Pedro Alves", supervisor: "Fernanda Lima" },
    { nome: "Lucas Pereira", supervisor: "Fernanda Lima" },
    { nome: "Maria Souza", supervisor: "Ricardo Gomes" },
    { nome: "Ana Costa", supervisor: "Ricardo Gomes" },
    { nome: "Bruno Martins", supervisor: "Patrícia Rocha" },
    { nome: "Carla Mendes", supervisor: "Patrícia Rocha" },
    { nome: "Eduardo Lima", supervisor: "Marcelo Alves" },
    { nome: "Fernanda Rocha", supervisor: "Marcelo Alves" }
];

// =========================
// ELEMENTOS
// =========================

const pesquisa = document.getElementById("pesquisa");
const lista = document.getElementById("listaVendedores");
const supervisor = document.getElementById("supervisor");

const datasContainer = document.getElementById("datasPrevisao");

const camposKg = document.querySelectorAll(".kg");

const total = document.getElementById("totalKg");

let vendedorSelecionado = "";

let dataSelecionada = "";

// =========================
// DATAS DA PREVISÃO
// =========================

function carregarDatas() {

    datasContainer.innerHTML = "";

    const diasSemana = [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado"
    ];

    for (let i = 1; i <= 3; i++) {

        const data = new Date();

        data.setDate(data.getDate() + i);

        const dia = String(data.getDate()).padStart(2, "0");

        const mes = String(data.getMonth() + 1).padStart(2, "0");

        const ano = data.getFullYear();

        const valor = `${ano}-${mes}-${dia}`;

        const card = document.createElement("div");

        card.className = "data-card";

        card.innerHTML = `

            <div class="dia">

                ${i === 1 ? "Amanhã" : diasSemana[data.getDay()]}

            </div>

            <div class="data">

                ${dia}/${mes}

            </div>

        `;

        card.onclick = () => {

            document
                .querySelectorAll(".data-card")
                .forEach(c => c.classList.remove("selecionado"));

            card.classList.add("selecionado");

            dataSelecionada = valor;

        };

        datasContainer.appendChild(card);

    }

    if (datasContainer.firstChild) {
        datasContainer.firstChild.click();
    }

}

carregarDatas();

// =========================
// PESQUISA DE VENDEDOR
// =========================

pesquisa.addEventListener("input", () => {

    const texto = pesquisa.value.toLowerCase();

    lista.innerHTML = "";

    if (texto === "") {

        lista.style.display = "none";

        return;

    }

    vendedores
        .filter(v => v.nome.toLowerCase().includes(texto))
        .forEach(v => {

            const item = document.createElement("div");

            item.className = "item";

            item.textContent = v.nome;

            item.onclick = () => {

                vendedorSelecionado = v.nome;

                pesquisa.value = v.nome;

                supervisor.textContent = v.supervisor;

                lista.style.display = "none";

            };

            lista.appendChild(item);

        });

    lista.style.display = lista.children.length ? "block" : "none";

});

// =========================
// TOTAL
// =========================

camposKg.forEach(campo => {

    campo.addEventListener("input", calcularTotal);

});

function calcularTotal() {

    let soma = 0;

    camposKg.forEach(c => {

        soma += Number(c.value) || 0;

    });

    total.textContent = soma + " KG";

}

calcularTotal();

// =========================
// ENVIAR DADOS
// =========================

document
    .getElementById("enviar")
    .addEventListener("click", enviarDados);

async function enviarDados() {

    if (vendedorSelecionado === "") {

        alert("Selecione um vendedor.");

        return;

    }

    if (dataSelecionada === "") {

        alert("Selecione a data da previsão.");

        return;

    }

    const dados = {

        dataPrevisao: dataSelecionada,

        vendedor: vendedorSelecionado,

        supervisor: supervisor.textContent,

        bebidaLactea: Number(camposKg[0].value) || 0,

        bisnagasFood: Number(camposKg[1].value) || 0,

        copinhos: Number(camposKg[2].value) || 0,

        cremosos: Number(camposKg[3].value) || 0,

        iogurtes: Number(camposKg[4].value) || 0,

        leitePasteurizado: Number(camposKg[5].value) || 0,

        queijos: Number(camposKg[6].value) || 0,

        requeijoes: Number(camposKg[7].value) || 0,

        total: Number(total.textContent.replace(" KG", ""))

    };

    const botao = document.getElementById("enviar");

    botao.disabled = true;

    botao.innerText = "ENVIANDO...";

    try {

        const resposta = await fetch(URL_SCRIPT, {

            method: "POST",

            headers: {

                "Content-Type": "text/plain;charset=utf-8"

            },

            body: JSON.stringify(dados)

        });

        const resultado = await resposta.json();

        if (!resultado.sucesso) {

            throw new Error(resultado.erro);

        }

        alert("✅ Previsão enviada com sucesso!");

        pesquisa.value = "";

        supervisor.textContent = "-";

        vendedorSelecionado = "";

        camposKg.forEach(campo => campo.value = "");

        calcularTotal();

        carregarDatas();

    } catch (erro) {

        console.error(erro);

        alert("Erro ao enviar a previsão.\n\n" + erro.message);

    }

    botao.disabled = false;

    botao.innerText = "ENVIAR PREVISÃO";

}
