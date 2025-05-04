class Vampiro extends Enemigo {
    constructor(img, posX, posY, vidaInicial) {
        super(img, posX, posY);
        this.vida = vidaInicial;
        this.imagen = img;
        this.ancho = 209;
        this.alto = 252;
        this.velocidadY = 3;
        this.rangoXMax = 100;
        this.direccionX = 1;
        this.rolluts = [];
        this.tiempoDeDisparo = 0;
        this.estaHerido = false;
        this.tiempoHerido = 0;
        this.duracionHerido = 30;
    }

    mostrar() {
        if (this.estaHerido) {
            tint(250, 0, 0);
        } else {
            noTint();
        }

        image(this.imagen, this.x, this.y);

        if (this.estaHerido) {
            this.tiempoHerido++;
            if (this.tiempoHerido > this.duracionHerido) {
                this.estaHerido = false;
                this.tiempoHerido = 0;
            }
        }

        if (finalDialogoVampiro) {
            fill(color(247, 247, 7));
            textSize(30);
            text("Vampividas: " + this.vida, 20, 50);
        }
    }

    mover() {
        if (!finalDialogoVampiro && this.x < 50) {
            this.x += 2;
        }

        if (finalDialogoVampiro) {
            this.y += this.velocidadY;

            if (this.y <= 20 || this.y > height - 292) {
                this.velocidadY *= -1;
            }

            this.x += this.direccionX;

            if (this.x <= 0 || this.x >= this.rangoXMax) {
                this.direccionX *= -1;
            }

            if (millis() - this.tiempoDeDisparo > 400) {
                this.dispararRollut();
                this.tiempoDeDisparo = millis();
            }

            for (let i = this.rolluts.length - 1; i >= 0; i--) {
                let rollut = this.rolluts[i];
                rollut.moverDisparo();
                rollut.mostrar();
                honeymoon.manejarColisionEnemigo(rollut);

                if (rollut.x < 0 || rollut.x > width || rollut.y < 0 || rollut.y > height) {
                    this.rolluts.splice(i, 1);
                }
            }
        }
    }

    dispararRollut() {
        let nuevoRollut = new Rollut(donaImagen, this.x + this.ancho / 2, this.y + this.alto / 2);
        this.rolluts.push(nuevoRollut);
    }

    reducirVida(cantidad) {
        this.vida -= cantidad;
        this.estaHerido = true;
    }

    estaVivo() {
        return this.vida > 0;
    }
}

