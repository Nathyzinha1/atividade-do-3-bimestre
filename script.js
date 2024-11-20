// Base da história interativa
const storySteps = {
    inicio: {
        title: "Bem-vindo à aventura!",
        text: "Você acorda em uma floresta desconhecida. Há dois caminhos à sua frente. O que você faz? \n\n 1. Ir pela trilha à esquerda \n 2. Seguir pela trilha à direita",
        options: [
            { text: "Ir pela trilha à esquerda", next: "trilha_esquerda" },
            { text: "Seguir pela trilha à direita", next: "trilha_direita" },
        ],
    },
    trilha_esquerda: {
        title: "A trilha à esquerda",
        text: "A trilha à esquerda leva você a um lago tranquilo. Você vê uma cabana ao longe. O que você faz? \n\n 1. Ir para a cabana \n 2. Voltar para o início",
        options: [
            { text: "Ir para a cabana", next: "cabana" },
            { text: "Voltar para o início", next: "inicio" },
        ],
    },
    trilha_direita: {
        title: "A trilha à direita",
        text: "Você segue a trilha à direita e encontra um urso adormecido bloqueando o caminho. O que você faz? \n\n 1. Tentar passar pelo urso \n 2. Voltar para o início",
        options: [
            { text: "Tentar passar pelo urso", next: "urso" },
            { text: "Voltar para o início", next: "inicio" },
        ],
    },
    cabana: {
        title: "A cabana misteriosa",
        text: "Na cabana, você encontra um mapa que pode ajudar na sua jornada. O que você faz? \n\n 1. Explorar mais a cabana \n 2. Voltar para o lago",
        options: [
            { text: "Explorar mais a cabana", next: "explorar" },
            { text: "Voltar para o lago", next: "trilha_esquerda" },
        ],
    },
    urso: {
        title: "O urso acordou!",
        text: "O urso acorda e você precisa correr. Você volta ao ponto inicial. O que você faz? \n\n 1. Voltar para o início",
        options: [
            { text: "Voltar para o início", next: "inicio" },
        ],
    },
    explorar: {
        title: "Explorando a cabana",
        text: "Você encontra um baú trancado com um tesouro! O que você faz? \n\n 1. Encerrar a aventura",
        options: [
            { text: "Encerrar a aventura", next: null },
        ],
    },
};

// Função para carregar o passo atual da história
function loadStep(stepKey) {
    const step = storySteps[stepKey];
    if (!step) return;

    // Atualiza o progresso no localStorage
    localStorage.setItem("currentStep", stepKey);

    // Renderiza o título e o texto
    const container = document.getElementById("story-container");
    container.innerHTML = `
        <h1>${step.title}</h1>
        <p>${step.text}</p>
        <div id="options"></div>
    `;

    // Adiciona os links de navegação
    const optionsDiv = document.getElementById("options");
    step.options.forEach(option => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = option.text;
        link.addEventListener("click", () => {
            if (option.next) {
                loadStep(option.next);
            } else {
                alert("Parabéns! Você terminou a aventura.");
            }
        });
        const paragraph = document.createElement("p");
        paragraph.appendChild(link);
        optionsDiv.appendChild(paragraph);
    });
}

// Redireciona para o último progresso salvo
window.addEventListener("load", () => {
    const lastStep = localStorage.getItem("currentStep") || "inicio";
    loadStep(lastStep);
});
