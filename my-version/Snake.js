class Snake {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        document.addEventListener('keydown', this.keyPressed);
    }

    createCanvas() {
        this.canvas.setAttribute('id', 'snakeCanvas');
        this.canvas.setAttribute('width', 400);
        this.canvas.setAttribute('height', 400);
        document.body.appendChild(this.canvas);
    }

    keyPressed() {
        switch(event.keyCode) {
            case 37: // left

                break;
            case 38: // up

                break;
            case 39: // right

                break;
            case 40: // down

                break;
        }
    }

    start() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const snake = new Snake();
    snake.start();
});
