class Snake {
    constructor() {
        this.trail          = [];
        this.lastPressed    = '';
        this.xSnake         = 0; // X Startpositie Snake
        this.ySnake         = 0; // Y Startpositie Snake
        this.xSnakeNew      = 0; // Nieuwe X positie Snake
        this.ySnakeNew      = 0; // Nieuwe Y positie Snake
        this.defaultTail    = 5; // Standaard lengte
        this.currentTail    = 5; // Actuele lengte
        this.blockCount     = 16; // Aantal blokken in Canvas
        this.blockSize      = 30; // Grootte per blok in pixels
        this.started        = false; // Spel nog niet gestart
        this.frameRate      = 1000 / 10; // Aantal frames per seconde
        this.ratio          = this.blockCount * this.blockSize;

        document.addEventListener("DOMContentLoaded", () => {
            this.createCanvas();
            this.canvas.addEventListener('click', this.start.bind(this));
            document.addEventListener('keydown', this.keyPressed.bind(this));
        });
    }

    start() {
        if (!this.started) {
            this.started = true;
            setInterval(this.game.bind(this), this.frameRate);
            this.newApple();
        }
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('id', 'snakeCanvas');
        this.canvas.setAttribute('width', this.ratio);
        this.canvas.setAttribute('height', this.ratio);
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    keyPressed() {
        const arrows = {
            ArrowUp:    {x: 0, y: -1, opposite: 'ArrowDown'},
            ArrowDown:  {x: 0, y: 1, opposite: 'ArrowUp'},
            ArrowLeft:  {x: -1, y: 0, opposite: 'ArrowRight'},
            ArrowRight: {x: 1, y: 0, opposite: 'ArrowLeft'}
        };

        if (arrows[event.key] && this.lastPressed !== arrows[event.key].opposite) {
            this.xSnakeNew = arrows[event.key].x;
            this.ySnakeNew = arrows[event.key].y;
            this.lastPressed = event.key;
        }
    }

    // Deze functie is om simpel een blok te selecteren en rekening te houden met padding
    drawBlock(x, y, padding = 1) {
        this.ctx.fillRect(
            x * this.blockSize + padding,
            y * this.blockSize + padding,
            this.blockSize - (padding * 2),
            this.blockSize - (padding * 2)
        );
    }

    newApple() {
        this.xApple = Math.floor(Math.random() * this.blockCount);
        this.yApple = Math.floor(Math.random() * this.blockCount);
    }

    game() {
        this.xSnake += this.xSnakeNew;
        this.ySnake += this.ySnakeNew;

        // Als de kant wordt geraakt door de slang
        this.xSnake = (this.xSnake < 0) ? this.blockCount -1    : this.xSnake;
        this.xSnake = (this.xSnake > this.blockCount - 1) ? 0   : this.xSnake;
        this.ySnake = (this.ySnake < 0) ? this.blockCount -1    : this.ySnake;
        this.ySnake = (this.ySnake > this.blockCount - 1) ? 0   : this.ySnake;

        // Rendering Canvas
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Rendering Snake
        this.ctx.fillStyle = 'aquamarine';
        for (let i = 0; i < this.trail.length; i++) {
            this.drawBlock(this.trail[i].x, this.trail[i].y);
            if (this.trail[i].x === this.xSnake && this.trail[i].y === this.ySnake) {
                this.currentTail = this.defaultTail;
            }
        }

        this.trail.push({x: this.xSnake, y: this.ySnake});
        while (this.trail.length > this.currentTail) {
            this.trail.shift();
        }

        this.ctx.fillStyle = 'red';
        this.drawBlock(this.xApple, this.yApple, 4);
        if (this.xApple === this.xSnake && this.yApple === this.ySnake) {
            this.currentTail++;
            this.newApple();
        }
    }
}

new Snake();