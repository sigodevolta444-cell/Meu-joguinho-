/**
 * SISTEMA DE ADIVINHAÇÃO ESTILO AKINATOR
 * Script completo para lógica de jogo
 */

// --- BANCO DE DADOS DE PERSONAGENS (44 personagens) ---
const personagens = [
    { nome: "Neymar Jr", tags: { real: true, humano: true, homem: true, atleta: true, futebol: true, brasileiro: true } },
    { nome: "Lionel Messi", tags: { real: true, humano: true, homem: true, atleta: true, futebol: true, europeu: true } },
    { nome: "Cristiano Ronaldo", tags: { real: true, humano: true, homem: true, atleta: true, futebol: true, europeu: true, portugues: true } },
    { nome: "Anitta", tags: { real: true, humano: true, mulher: true, musica: true, brasileiro: true, cantora: true } },
    { nome: "Beyoncé", tags: { real: true, humano: true, mulher: true, musica: true, americano: true, cantora: true } },
    { nome: "Silvio Santos", tags: { real: true, humano: true, homem: true, apresentador: true, brasileiro: true, idoso: true } },
    { nome: "Casimiro", tags: { real: true, humano: true, homem: true, influenciador: true, brasileiro: true, streamer: true } },
    { nome: "Whindersson Nunes", tags: { real: true, humano: true, homem: true, influenciador: true, brasileiro: true, comediante: true } },
    { nome: "LeBron James", tags: { real: true, humano: true, homem: true, atleta: true, basquete: true, americano: true } },
    { nome: "Taylor Swift", tags: { real: true, humano: true, mulher: true, musica: true, americano: true } },
    { nome: "Elon Musk", tags: { real: true, humano: true, homem: true, tecnologia: true, rico: true } },
    { nome: "Goku", tags: { real: false, humano: false, anime: true, luta: true, voa: true, cabelo_espetado: true } },
    { nome: "Naruto Uzumaki", tags: { real: false, humano: true, anime: true, ninja: true, loiro: true, protagonista: true } },
    { nome: "Monkey D. Luffy", tags: { real: false, humano: true, anime: true, pirata: true, chapeu: true } },
    { nome: "Pikachu", tags: { real: false, humano: false, animal_fantastico: true, amarelo: true, eletrico: true, game: true } },
    { nome: "Spider-Man", tags: { real: false, humano: true, heroi: true, mascara: true, marvel: true } },
    { nome: "Batman", tags: { real: false, humano: true, heroi: true, rico: true, dc: true, morcego: true } },
    { nome: "Superman", tags: { real: false, humano: false, heroi: true, voa: true, dc: true, capa: true } },
    { nome: "Coringa", tags: { real: false, humano: true, vilao: true, maquiagem: true, dc: true } },
    { nome: "Thanos", tags: { real: false, humano: false, vilao: true, roxo: true, marvel: true } },
    { nome: "Harry Potter", tags: { real: false, humano: true, magia: true, oculos: true, cicatriz: true } },
    { nome: "Darth Vader", tags: { real: false, humano: true, vilao: true, espacial: true, mascara: true, sabre: true } },
    { nome: "Mario", tags: { real: false, humano: true, game: true, nintendo: true, bigode: true } },
    { nome: "Sonic", tags: { real: false, humano: false, game: true, azul: true, veloz: true } },
    { nome: "Link", tags: { real: false, humano: true, game: true, nintendo: true, espada: true, loiro: true } },
    { nome: "Kratos", tags: { real: false, humano: true, game: true, careca: true, barba: true, forte: true } },
    { nome: "Mickey Mouse", tags: { real: false, humano: false, animal_fantastico: true, disney: true, orelhas: true } },
    { nome: "Shrek", tags: { real: false, humano: false, animal_fantastico: true, verde: true, ogro: true } },
    { nome: "Homer Simpson", tags: { real: false, humano: true, desenho: true, amarelo: true, pai: true } },
    { nome: "Scooby-Doo", tags: { real: false, humano: false, animal: true, cachorro: true, marrom: true } },
    { nome: "Leão", tags: { real: true, humano: false, animal: true, selvagem: true, juba: true } },
    { nome: "Cachorro", tags: { real: true, humano: false, animal: true, domestico: true, late: true } },
    { nome: "Smartphone", tags: { real: true, humano: false, objeto: true, tecnologia: true, tela: true } },
    { nome: "Carro", tags: { real: true, humano: false, objeto: true, transporte: true, rodas: true } },
    { nome: "Geladeira", tags: { real: true, humano: false, objeto: true, cozinha: true, gelado: true } },
    { nome: "Violão", tags: { real: true, humano: false, objeto: true, musica: true, cordas: true } },
    { nome: "Caneta", tags: { real: true, humano: false, objeto: true, escrita: true } },
    { nome: "Elsa (Frozen)", tags: { real: false, humano: true, disney: true, gelo: true, princesa: true } },
    { nome: "Ash Ketchum", tags: { real: false, humano: true, anime: true, treinador: true } },
    { nome: "Robert Downey Jr", tags: { real: true, humano: true, homem: true, ator: true, americano: true } },
    { nome: "Fernanda Montenegro", tags: { real: true, humano: true, mulher: true, ator: true, brasileiro: true, idoso: true } },
    { nome: "Lady Gaga", tags: { real: true, humano: true, mulher: true, musica: true, cantora: true, pop: true } },
    { nome: "Gato", tags: { real: true, humano: false, animal: true, domestico: true, mia: true } },
    { nome: "Aranha", tags: { real: true, humano: false, animal: true, inseto: true, teia: true } }
];

// --- ESTRUTURA DE PERGUNTAS ---
const perguntas = [
    { texto: "Seu personagem existe na vida real?", chave: "real" },
    { texto: "É um ser humano?", chave: "humano", condicao: { real: true } },
    { texto: "É um objeto?", chave: "objeto", condicao: { humano: false, real: true } },
    { texto: "É um animal?", chave: "animal", condicao: { humano: false, real: true, objeto: false } },
    { texto: "É homem?", chave: "homem", condicao: { humano: true } },
    { texto: "É mulher?", chave: "mulher", condicao: { humano: true, homem: false } },
    { texto: "É brasileiro?", chave: "brasileiro", condicao: { real: true, humano: true } },
    { texto: "Trabalha com esportes?", chave: "atleta", condicao: { humano: true, real: true } },
    { texto: "Joga futebol?", chave: "futebol", condicao: { atleta: true } },
    { texto: "Trabalha com música?", chave: "musica", condicao: { real: true } },
    { texto: "É influenciador ou streamer?", chave: "influenciador", condicao: { real: true, humano: true } },
    { texto: "É um ator ou atriz?", chave: "ator", condicao: { real: true, humano: true } },
    { texto: "É de um anime?", chave: "anime", condicao: { real: false } },
    { texto: "É de um videogame?", chave: "game", condicao: { real: false } },
    { texto: "É um super-herói?", chave: "heroi", condicao: { real: false } },
    { texto: "É um vilão?", chave: "vilao", condicao: { real: false } },
    { texto: "É da Marvel?", chave: "marvel", condicao: { heroi: true } },
    { texto: "É da DC Comics?", chave: "dc", condicao: { heroi: true } },
    { texto: "Tem poderes mágicos?", chave: "magia", condicao: { real: false } },
    { texto: "É da Disney?", chave: "disney", condicao: { real: false } },
    { texto: "É amarelo?", chave: "amarelo", condicao: { real: false } },
    { texto: "É verde?", chave: "verde", condicao: { real: false } },
    { texto: "Usa máscara?", chave: "mascara", condicao: { real: false } },
    { texto: "Tem bigode?", chave: "bigode", condicao: { humano: true } },
    { texto: "É careca?", chave: "careca", condicao: { homem: true } },
    { texto: "É um animal doméstico?", chave: "domestico", condicao: { animal: true } },
    { texto: "É um item de tecnologia?", chave: "tecnologia", condicao: { objeto: true } },
    { texto: "Voa?", chave: "voa", condicao: { real: false } }
];

// --- ESTADO DO JOGO ---
let respostas = {};
let perguntasFeitas = [];
let jogoAtivo = true;

// --- FUNÇÕES OBRIGATÓRIAS ---

function converterResposta(valor) {
    if (valor === 2) return true;
    if (valor === -2) return false;
    return null; // Ignora 1, 0, -1
}

function podeMostrar(pergunta) {
    if (perguntasFeitas.includes(pergunta.chave)) return false;
    if (!pergunta.condicao) return true;

    for (let c in pergunta.condicao) {
        if (respostas[c] !== undefined && respostas[c] !== pergunta.condicao[c]) {
            return false;
        }
    }
    return true;
}

function filtrarPersonagens() {
    return personagens.filter(p => {
        for (let chave in respostas) {
            const valorDesejado = respostas[chave];
            // Se o personagem tem a tag definida e é diferente da resposta, elimina
            if (p.tags.hasOwnProperty(chave)) {
                if (p.tags[chave] !== valorDesejado) return false;
            } else {
                // Se a pessoa respondeu SIM, mas o personagem não tem a tag, elimina
                if (valorDesejado === true) return false;
            }
        }
        return true;
    });
}

function mostrarPergunta(perguntaObj) {
    const el = document.getElementById("pergunta");
    if (perguntaObj) {
        el.innerText = perguntaObj.texto;
        el.dataset.chave = perguntaObj.chave;
    }
}

function proximaPergunta() {
    const listaRestante = filtrarPersonagens();

    if (listaRestante.length <= 1) {
        finalizar(listaRestante[0]);
        return;
    }

    // Lógica inteligente: escolhe a pergunta que mais divide a lista atual
    let melhorP = null;
    let menorDiferenca = Infinity;

    for (let p of perguntas) {
        if (podeMostrar(p)) {
            let comTag = listaRestante.filter(perso => perso.tags[p.chave] === true).length;
            let semTag = listaRestante.length - comTag;
            let dif = Math.abs(comTag - semTag);

            if (dif < menorDiferenca) {
                menorDiferenca = dif;
                melhorP = p;
            }
        }
    }

    if (melhorP) {
        mostrarPergunta(melhorP);
    } else {
        finalizar(listaRestante[0]);
    }
}

function responder(valor) {
    if (!jogoAtivo) return;

    const valorBooleano = converterResposta(valor);
    const el = document.getElementById("pergunta");
    const chaveAtual = el.dataset.chave;

    if (valorBooleano !== null) {
        respostas[chaveAtual] = valorBooleano;
    }

    perguntasFeitas.push(chaveAtual);
    proximaPergunta();
}

function finalizar(vencedor) {
    jogoAtivo = false;
    const el = document.getElementById("pergunta");
    if (vencedor) {
        el.innerText = "Já sei! Você pensou em: " + vencedor.nome;
    } else {
        el.innerText = "Não sei quem é 😢";
    }
}

function resetar() {
    respostas = {};
    perguntasFeitas = [];
    jogoAtivo = true;
    proximaPergunta();
}

// Iniciar o jogo
window.onload = proximaPergunta;