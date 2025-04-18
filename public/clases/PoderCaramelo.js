class PoderCaramelo {
    constructor(x, y, imagen) {
        this.x = x;
        this.y = y;
        this.imagen = imagen;
        this.ancho = 100;
        this.alto = 70;
    }

    mostrar() {
        image(this.imagen, this.x + plataformaX, this.y);
    }

    mover() {
        if (this.y + this.alto < height - 70) {
            this.y += 2;
        }
    }

    colisionaCon() {
        if (honeymoon.posicionX + honeymoon.ancho - 50 > this.x + plataformaX &&
            honeymoon.posicionX + 50 < this.x + plataformaX + honeymoon.ancho &&
            honeymoon.posicionY + honeymoon.alto > this.y &&
            honeymoon.posicionY < this.y + honeymoon.alto - 40) {
            parteDos = true;
        }
    }
}