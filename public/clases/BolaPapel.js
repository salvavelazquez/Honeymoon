class BolaPapel {
    constructor(x, y, imagen) {
        this.x = x;
        this.y = y;
        this.velocidadY = 3;
        this.imagen = imagen;
        this.ancho = 50;
        this.alto = 50;
    }

    caer() {
        if (this.y + this.alto < height - 50) {
            this.y += this.velocidadY;
        }
    }

    mostrar() {
        image(this.imagen, this.x, this.y, this.ancho, this.alto);
    }
}

