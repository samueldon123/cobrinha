// Tamanho do bloco (cada quadrado da grade)
var blockSize = 25;
var rows = 20;
var cols = 20;

// Tabuleiro e contexto de desenho
var board;
var context;

// Posição inicial da cabeça da cobra
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// Velocidade da cobra
var velocityX = 0;
var velocityY = 0;

// Corpo da cobra (lista de posições)
var snakeBody = [];

// Posição da comida
var foodX;
var foodY;

// Variável para verificar se o jogo acabou
var gameOver = false;

// Inicializa o jogo quando a página carregar
window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // Obtém o contexto de desenho

    placeFood(); // Posiciona a comida aleatoriamente
    document.addEventListener("keyup", changeDirection); // Captura a tecla pressionada

    setInterval(update, 1000/10); // Chama update() a cada 100ms (10 FPS)
}

// Função principal de atualização do jogo
function update() {
    if (gameOver) {
        return; // Se o jogo acabou, não continua
    }

    // Limpa a tela e desenha o fundo preto
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // Desenha a comida (quadrado vermelho)
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Se a cobra comer a comida
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]); // Aumenta o corpo da cobra
        placeFood(); // Gera nova comida
    }

    // Move o corpo da cobra para seguir a cabeça
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Move a cabeça da cobra
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // Desenha a cobra (quadrado verde)
    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Verifica se a cobra bateu nas bordas (Game Over)
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    // Verifica se a cobra colidiu com ela mesma
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

// Função para mudar a direção da cobra
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Função para gerar uma nova posição aleatória para a comida
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
