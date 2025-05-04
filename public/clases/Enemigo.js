class Enemigo {
    constructor(img, posX, posY) {
        this.imagen = img;
        this.x = posX;
        this.y = posY;
        this.ancho = 60;
        this.alto = 80;
    }

    mover() { } // Método abstracto

    mostrar() {
        image(this.imagen, this.x, this.y, this.ancho, this.alto);
    }
}

