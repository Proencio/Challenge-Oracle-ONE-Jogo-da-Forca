const inputTexto = document.querySelector(".input-texto");
const mensagem = document.querySelector(".mensagem");
let palavras = ['JAVA', 'PYTHON', 'ANGULAR', 'VUE', 'BUG', 'SERVIDOR', 'VIRUS', 'REDE', 'GAMBIARRA', 'LINUX', 'DEBUGER', 'REACT'];
let palavraSecreta = "";
let palavraCorreta = [];
let todasLetrasDigitadas = [];
let letras = [];
let listaErros = [];
let erros = 7;
let jogoEncerrado = false;
let tabuleiro = document.getElementById("forca").getContext('2d');
document.getElementById('div-aparecer').style.display = "none"


// ------------------------------------FUNÇÕES INICIO-------------------------------------------\\

// Adicionar palavra
function btnAdicionar() {
    window.location.href = "add_frase/add_frase.html";
}

//Salva palavra na lista
function btnSave() {
    const regex = /[@!#$%^&*()/\\]/;
    const regexNumber = /[0-9]/;

    var aux = inputTexto.value.trim();
    console.log(aux.length);

    if (inputTexto.value && aux.length > 0) {
        if (regex.test(inputTexto.value) || regexNumber.test(inputTexto.value)) {
            alert("Ops! Digite apenas letras.");
        } else {
            if (inputTexto.value.length > 8) {
                alert("Ops! A palavra deve ter no maximo 8 caracteres.");
            } else {
                palavras.push(inputTexto.value.toLowerCase());
                inputTexto.value = "";
                alert("Salvo com sucesso!");
            }
        }
    } else {
        alert("Ops! Informe uma palavra.");
    }
}

// Cancela jogo
function btnCancelar() {
    inputTexto.value = "";
    window.location.href = "../index.html";
}


// Inicial o jogo
function iniciarJogo() {
    document.getElementById('div-desaparecer').style.display = "none"
    document.getElementById("div-aparecer").style.display = 'block';
    obterPalavraSecreta();
    criarCanvas();
    criarLinhas();
    letras = undefined;
    letras = [];
}

//Desiste do jogo
function desistir() {
    palavraSecreta = "";
    window.location.href = "index.html";
}

function resetJogo() {
    erros = 7;
    listaErros = undefined;
    listaErros = [];
    palavraCorreta = undefined;
    palavraCorreta = [];
    jogoEncerrado = false;
    todasLetrasDigitadas = undefined;
    todasLetrasDigitadas = [];
    iniciarJogo();
}
//--------------------------------------------------------------------------------------------\\

//------------------------------------ FUNÇÃO JOGO --------------------------------------------\\

function obterPalavraSecreta() {
    let palavra = palavras[Math.floor(Math.random() * palavras.length)];
    palavraSecreta = palavra;
    console.log(palavraSecreta);
}

// Capta o que o usuario digita
document.onkeydown = (e) => {
    let letra = e.key.toUpperCase()
    let index = 0;
    console.log("LETRA --> " + letra)
    // verifica se a letra ja foi digitada, se não foi adiciona a lista de letras digitadas e prosegue com o algoritimo
    if (!todasLetrasDigitadas.includes(letra) && !jogoEncerrado) {
        todasLetrasDigitadas.push(letra);

        if (verificarLetra(letra) && palavraSecreta.includes(letra.toUpperCase())) {
            for (let i = 0; i < palavraSecreta.length; i++) {
                if (palavraSecreta[i] === letra) {
                    palavraCorreta.push(letra);  
                    escreverLetraCorreta(i);       
                }
            }

            //precisa implementar async para esperar terminar de printar na tela
            if (palavraSecreta.length === palavraCorreta.length) {
                setTimeout(()=>{
                    popupVencedor();
                ;} , 100
                );
            }
        } else {
            escreverLetraIncorreta(letra, erros, listaErros);
            adicionarLetraIncorreta();        
        }
    }
}

// verifica se o caracter é numero ou especial, se for ignora
function verificarLetra(key) {
    let estado = false;
    const regex = /[@!#$%^&*()/\\]/;
    const regexNumber = /[0-9]/;
    var aux = key.trim();

    if (!regex.test(key) && !regexNumber.test(key)) {
        console.log("include?   ");
        console.log(todasLetrasDigitadas.includes(key));
        
        if(key >= 65 && letras.indexOf(key) || key <= 90 && letras.indexOf(key)) {
            letras.push(key)
            console.log(key)
            console.log(letras)
            return estado;
        } else {
            estado = true;
            letras.push(key)
            console.log("else")
            console.log(key)
            console.log(letras)
            return estado;
        }
    }
}

//adiciona letra incorreta
function adicionarLetraIncorreta(letra) {
    erros -= 1;    
    listaErros.push(letra);

    if (erros === 0) {
        popupDerrota();
    } else {
        criaBoneco(erros);
    }
}

//---------------------------------------------------------------------------------------\\



//---------------------------------------- RESULTADO ------------------------------------\\

function popupDerrota(){
    jogoEncerrado = true;
    final("Game Over")
    // alert('🔥 😔Ops! Você pode fazer melhor 🔥');
    // resetJogo()
}

function popupVencedor(){
    jogoEncerrado = true;
    final("Você Venceu !!!")
    // alert('🍾 Parabéns!!! Você conseguiu 😀');
    // resetJogo()
}
//----------------------------------------------------------------------------------------\\