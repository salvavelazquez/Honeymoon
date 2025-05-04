class BolaDeFuego {
    constructor(x, y, imagen) {
        this.x = x;
        this.y = y;
        this.velocidad = -10;
        this.imagen = imagen;
    }

    mostrar() {
        image(this.imagen, this.x, this.y);
    }

    mover() {
        this.x += this.velocidad;
    }

    estaFueraDePantalla() {
        return this.x < -this.imagen.width;
    }

    colisionaCon(enemigo) {
        let distanciaX = abs(this.x - enemigo.x);
        let distanciaY = abs(this.y - enemigo.y - 100);
        return distanciaX < enemigo.ancho / 2 && distanciaY < enemigo.alto / 2;
    }
}
