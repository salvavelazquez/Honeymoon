class Plataforma {
    constructor(imagen, x, y, ancho, alto) {
        this.imagen = imagen;
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
    }

    mostrar(fondoX) {
        image(this.imagen, this.x + fondoX, this.y, this.ancho, this.alto);
    }

    colisionaCon(jugadorX, jugadorY, jugadorWidth, jugadorHeight, platX) {
        return jugadorX + jugadorWidth - 50 > this.x + platX &&
            jugadorX + 50 < this.x + platX + this.ancho &&
            jugadorY + jugadorHeight > this.y &&
            jugadorY < this.y + this.alto - 40;
    }

    fueraLimites(jugadorX, jugadorWidth, platX) {
        return jugadorX + jugadorWidth - 50 > this.x + platX &&
            jugadorX + 50 < this.x + platX + this.ancho;
    }
}

