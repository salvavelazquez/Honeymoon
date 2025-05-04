class Nube {
    constructor(imagen) {
        this.imagenNube = imagen;
        this.posX = random(0, width - 200);
        this.posY = 0;
        this.velocidad = 3;
        this.moviendoDerecha = random(1) > 0.5;
        this.bolasPapel = [];
    }

    mover() {
        if (this.moviendoDerecha) {
            this.posX += this.velocidad;
            if (this.posX + this.imagenNube.width > width) {
                this.moviendoDerecha = false;
            }
        } else {
            this.posX -= this.velocidad;
            if (this.posX < 0) {
                this.moviendoDerecha = true;
            }
        }
    }

    mostrar() {
        image(this.imagenNube, this.posX, this.posY);
    }

    lanzarCirculo() {
        if (frameCount % 60 === 0) {
            let imagenBola = this.escogerImagenAleatoria();
            this.bolasPapel.push(new BolaPapel(this.posX + this.imagenNube.width / 2, this.posY + this.imagenNube.height, imagenBola));
        }
    }

    escogerImagenAleatoria() {
        let randomIndex = floor(random(4));
        if (randomIndex === 0) return bolaAmarilla;
        else if (randomIndex === 1) return bolaRosa;
        else if (randomIndex === 2) return bolaGris;
        else return bolaVerde;
    }

    actualizarCirculos() {
        for (let bola of this.bolasPapel) {
            bola.caer();
            bola.mostrar();
        }
    }

    eliminarTodoPapel() {
        this.bolasPapel = [];
    }
}
