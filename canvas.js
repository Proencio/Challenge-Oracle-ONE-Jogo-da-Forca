// Cria o quadro e a forca
function criarCanvas() {    
    // tabuleiro.lineWidth = 10;
    tabuleiro.LineCap = "round";
    tabuleiro.LineJoin = "round";
    tabuleiro.fillStyle = "#F3F5FC";
    tabuleiro.strokeStyle = "#0A3871";

    //Manipulação
    tabuleiro.fillRect(0,0,1200,700);
    tabuleiro.beginPath();
    tabuleiro.moveTo(644,560);
    tabuleiro.lineTo(350,560);

    // linha vertical maior
    tabuleiro.moveTo(400,560);
    tabuleiro.lineTo(400,200);

    // linha de cima horizontal
    tabuleiro.moveTo(575,200);
    tabuleiro.lineTo(397,200);

    tabuleiro.stroke();
    tabuleiro.closePath();
}

//cria o boneco
function criaBoneco(erros) {
    if (erros === 6)
        criaCabeca();

    if (erros === 5)
        criaLinha(575, 280, 575, 415); //tronco

    if (erros === 4) 
        criaLinha(575, 295, 610, 352); // Braço direito

    if (erros === 3)
        criaLinha(575, 295, 540, 352); // Braço esquerdo        

    if (erros === 2) 
        criaLinha(575, 415, 610, 477); //Perna direita

    if (erros === 1)
        criaLinha(575, 415, 540, 477); //Perna esquerda
    
    tabuleiro.stroke();
    tabuleiro.closePath();
}

function criaLinha(x, y, x_ini, y_fin) {
    tabuleiro.moveTo(x,y);
    tabuleiro.lineTo(x_ini,y_fin);
}

function criaCabeca() {
    tabuleiro.moveTo(575,197);
    tabuleiro.arc(575, 250, 31, -1.560, 2 * Math.PI);
}

// Cria linhas da palavra
function criarLinhas() {
    tabuleiro.lineWidth = 6;
    tabuleiro.LineCap = "round";
    tabuleiro.LineJoin = "round";
    tabuleiro.fillStyle = "#F3F5FC";
    tabuleiro.strokeStyle = "#0A3871";

    let largura = 600/palavraSecreta.length;
    for (let i = 0; i < palavraSecreta.length; i++) {
        tabuleiro.moveTo(500 + (largura*i), 640);
        tabuleiro.lineTo(550 + (largura*i), 640);
    }

    tabuleiro.stroke();
    tabuleiro.closePath();
}

// Printa na tela a letra correta
async function escreverLetraCorreta(index) {
    tabuleiro.lineWidth = 6;
    tabuleiro.LineCap = "round";
    tabuleiro.LineJoin = "round";
    tabuleiro.strokeStyle = "#0A3871";

    tabuleiro.font = "bold 52px Inter"
    tabuleiro.fillStyle = "#343536";
    let larg = 600/palavraSecreta.length;
    tabuleiro.fillText(palavraSecreta[index], 505+(larg*index), 636);
}

//Printa na tela a letra incorreta
function escreverLetraIncorreta(letra, erros, listaErros) {
    tabuleiro.lineWidth = 6;
    tabuleiro.LineCap = "round";
    tabuleiro.LineJoin = "round";
    tabuleiro.strokeStyle = "#0A3871";

    tabuleiro.font = "bold 29px Inter"
    tabuleiro.fillStyle = "#63605f";
    
    tabuleiro.fillText(letra, 350 + (30*listaErros.length), 150);
}

// Printa se o usuario venceu ou perdeu
function final(text) {
    tabuleiro.lineWidth = 6;
    tabuleiro.LineCap = "round";
    tabuleiro.LineJoin = "round";
    tabuleiro.strokeStyle = "#0A3871";

    tabuleiro.font = "bold 26px Inter"
    tabuleiro.fillStyle = "#94238e";
    tabuleiro.fillText("--- " + text + " ---", 500, 100);
}