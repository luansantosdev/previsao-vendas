// =========================
// URL DO APPS SCRIPT
// =========================

const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbwCKVVSGW3RPbj9WJCc0vmV0xy3x1NGLiELsxByjqjd6j7iW5TVIQQZjsgc4mZipqdD/exec";

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

const pesquisa = document.getElementById("pesquisa");
const lista = document.getElementById("listaVendedores");
const supervisor = document.getElementById("supervisor");

let vendedorSelecionado = "";

// =========================
// PESQUISA
// =========================

pesquisa.addEventListener("input", () => {

    const texto = pesquisa.value.toLowerCase();

    lista.innerHTML = "";

    if(texto === ""){
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

const camposKg = document.querySelectorAll(".kg");
const total = document.getElementById("totalKg");

camposKg.forEach(campo => {
    campo.addEventListener("input", calcularTotal);
});

function calcularTotal(){

    let soma = 0;

    camposKg.forEach(c => {
        soma += Number(c.value) || 0;
    });

    total.textContent = soma + " KG";

}

// =========================
// ENVIAR
// =========================

document.getElementById("enviar").addEventListener("click", enviarDados);

async function enviarDados(){

    if(vendedorSelecionado === ""){

        alert("Selecione um vendedor.");

        return;

    }

    const dados = {

        vendedor: vendedorSelecionado,

        supervisor: supervisor.textContent,

        bebidaLactea: camposKg[0].value || 0,

        bisnagasFood: camposKg[1].value || 0,

        copinhos: camposKg[2].value || 0,

        cremosos: camposKg[3].value || 0,

        iogurtes: camposKg[4].value || 0,

        leitePasteurizado: camposKg[5].value || 0,

        queijos: camposKg[6].value || 0,

        requeijoes: camposKg[7].value || 0,

        total: total.textContent.replace(" KG","")

    };

    const botao = document.getElementById("enviar");

    botao.disabled = true;

    botao.innerText = "Enviando...";

    try{

        await fetch(URL_SCRIPT,{

            method:"POST",

            headers:{
                "Content-Type":"text/plain;charset=utf-8"
            },

            body:JSON.stringify(dados)

        });

        alert("✅ Previsão enviada com sucesso!");

        pesquisa.value = "";

        supervisor.textContent = "-";

        vendedorSelecionado = "";

        camposKg.forEach(c => c.value="");

        calcularTotal();

    }catch(e){

        alert("Erro ao enviar.\n\n"+e);

        console.error(e);

    }

    botao.disabled = false;

    botao.innerText = "ENVIAR PREVISÃO";

}