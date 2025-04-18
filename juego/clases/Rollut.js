class Rollut extends Enemigo {
    constructor(img, posX, posY) {
        super(img, posX, posY);
        this.velocidadX = random(2, 8);
        this.velocidadY = random(2, 8);
        this.disparo = random(5, 10);
    }

    mover() {
        this.x += this.velocidadX;
        this.y += this.velocidadY;

        if (this.x <= 0 || this.x >= width - this.ancho) {
            this.velocidadX *= -1;
        }
        if (this.y <= 0 || this.y >= height - 50 - this.alto) {
            this.velocidadY *= -1;
        }
    }

    moverDisparo() {
        this.x += this.disparo;
    }
}

