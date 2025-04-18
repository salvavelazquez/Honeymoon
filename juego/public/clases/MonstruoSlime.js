class MonstruoSlime extends Enemigo {
    constructor(frames, posX, posY) {
        super(frames[0], posX, posY);
        this.frames = frames;
        this.frameIndex = 0;
        this.frameRate = 10;
        this.frameCounter = 0;
        this.velocidadX = random(4, 9);
        this.ancho = 80;
        this.alto = 100;
        this.destruido = false;
    }

    mover() {
        this.x += this.velocidadX;

        if (this.x <= 0 || this.x >= width - this.ancho) {
            this.velocidadX *= -1;
        }

        this.frameCounter++;
        if (this.frameCounter >= this.frameRate) {
            this.frameCounter = 0;
            this.frameIndex = (this.frameIndex + 1) % this.frames.length;
            this.imagen = this.frames[this.frameIndex];
        }
    }

    mostrar() {
        if (this.velocidadX < 0) {
            push();
            translate(this.x + this.ancho, this.y);
            scale(-1, 1);
            image(this.imagen, 0, 0, this.ancho, this.alto);
            pop();
        } else {
            image(this.imagen, this.x, this.y, this.ancho, this.alto);
        }
    }

    desaparecer() {
        this.destruido = true;
    }
}

