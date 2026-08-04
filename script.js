// =========================
// URL DO APPS SCRIPT
// =========================

const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbzJsuKDuoOt0xMlhju4NY7vpGpkEAFdvBXmSIJBigKZ5bYO3MStr7UuQ3C41x9CdBa_/exec";
                               
// =========================
// VENDEDORES
// =========================

const vendedores = [
    { nome: "BRENA ALEXSANDRA LIRA PAULINO", supervisor: "Carlos Bruno - SV" },
    { nome: "FRANCISCO WARLEY DE AMORIM FARIAS", supervisor: "Carlos Bruno - SV" },
    { nome: "GERENCIA DE VENDAS SABOR &VIDA", supervisor: "Carlos Bruno - SV" },

    { nome: "ALANE GUEDES DE SOUSA", supervisor: "Carlos Ferreira - SV" },
    { nome: "DEYVIANE NOBRE DA SILVA", supervisor: "Carlos Ferreira - SV" },
    { nome: "FRANCISCO ANISIO FREIRES", supervisor: "Carlos Ferreira - SV" },
    { nome: "FRANCISCO DE ASSIS DE OLIVEIRA LIMA", supervisor: "Carlos Ferreira - SV" },
    { nome: "FRANCISCO ERICON DE SOUSA ALVES", supervisor: "Carlos Ferreira - SV" },
    { nome: "ISAAC NASCIMENTO DA SILVA", supervisor: "Carlos Ferreira - SV" },
    { nome: "JONATHAN XAVIER OLIVEIRA", supervisor: "Carlos Ferreira - SV" },
    { nome: "JOSE EVANYELSON CORREIA DA SILVA", supervisor: "Carlos Ferreira - SV" },
    { nome: "KEZIA CAVALCANTE DE SOUSA", supervisor: "Carlos Ferreira - SV" },
    { nome: "NAHIM NOBREGA FERRAZ", supervisor: "Carlos Ferreira - SV" },
    { nome: "CARLOS FERREIRA", supervisor: "Carlos Ferreira - SV" },

    { nome: "DARLON HERBERT FERNANDES DIAS", supervisor: "Darlon Hebert - SV" },
    { nome: "JAIANE SILVA GUEDES", supervisor: "Darlon Hebert - SV" },
    { nome: "JOSE ROMARIO ALVES DA SILVA", supervisor: "Darlon Hebert - SV" },

    { nome: "ANTONIA IZABELLE DINIZ PAIVA", supervisor: "Fernando Fernandes - SV" },
    { nome: "EGBERTO PEREIRA PINTO", supervisor: "Fernando Fernandes - SV" },
    { nome: "FRANCIS DE AZEVEDO DOS SANTOS", supervisor: "Fernando Fernandes - SV" },
    { nome: "FRANCISCO EDUARDO BERNADINO DE LIMA", supervisor: "Fernando Fernandes - SV" },
    { nome: "FRANCISCO LEANDRO GOMES", supervisor: "Fernando Fernandes - SV" },
    { nome: "FRANCISCO MARIO SOUSA ALMEIDA", supervisor: "Fernando Fernandes - SV" },
    { nome: "JOSE FERNANDO FERNADES DA CUNHA", supervisor: "Fernando Fernandes - SV" },
    { nome: "JOSÉ TIAGO MATIAS FONSECA", supervisor: "Fernando Fernandes - SV" },
    { nome: "JOSÉ WLADSON BARBOSA LINHARES", supervisor: "Fernando Fernandes - SV" },
    { nome: "RENNER GONÇALVES DE ASSIS", supervisor: "Fernando Fernandes - SV" },
    { nome: "THIAGO WITHE RODRIGUES", supervisor: "Fernando Fernandes - SV" },
    { nome: "FERNANDO FERNANDES", supervisor: "Fernando Fernandes - SV" },

    { nome: "MIKAEL DA COSTA MIGUEL", supervisor: "Mikael Costa - SV" },

    { nome: "ALEXANDRE ANTONIO ALBUQUERQUE AGUIA", supervisor: "Reinaldo Lima - SV" },
    { nome: "ISABELLE DE SOUSA SILVA", supervisor: "Reinaldo Lima - SV" },
    { nome: "JONH KAYRO MARINHO DOS SANTOS", supervisor: "Reinaldo Lima - SV" },
    { nome: "MARIA MARCELA NUNES SILVESTRE", supervisor: "Reinaldo Lima - SV" },
    { nome: "REINALDO DE SOUSA LIMA", supervisor: "Reinaldo Lima - SV" },
    { nome: "DAVI ROCHA", supervisor: "Reinaldo Lima - SV" },
    { nome: "MARCOS PAULO", supervisor: "Reinaldo Lima - SV" },
    { nome: "FRANCISCO RONATH", supervisor: "Reinaldo Lima - SV" }
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
