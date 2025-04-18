class Zombie extends Enemigo {
    constructor(frames, startX, startY) {
        super(frames[0], startX, startY);
        this.frames = frames;
        this.currentFrame = 0;
        this.frameDelay = 10;
        this.frameCount = 0;
        this.speed = 9;
        this.ancho = 439;
        this.alto = 417;
        this.caramelo = null;
        this.carameloActivado = false;
    }

    mover() {
        this.x -= this.speed;

        if (this.x < -4500 && !this.carameloActivado) {
            this.carameloActivado = true;
            this.caramelo = new PoderCaramelo(-2800, 20, carameloImagen);
        }

        if (this.caramelo) {
            this.actualizarCaramelo();
        }

        this.frameCount++;
        if (this.frameCount >= this.frameDelay) {
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
            this.imagen = this.frames[this.currentFrame];
            this.frameCount = 0;
        }
    }

    mostrar() {
        image(this.imagen, this.x + plataformaX, this.y);
    }

    actualizarCaramelo() {
        this.caramelo.mostrar();
        this.caramelo.mover();
        this.caramelo.colisionaCon();
    }

    reiniciar() {
        this.x = width;
        this.currentFrame = 0;
        this.carameloActivado = false;
        parteDos = false;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // Redimensionar fondos si es necesario
    fondoNivel1.resize(width, height);
    fondoNivel2.resize(width, height);
    fondoNivel3.resize(width, height);
    fondoNivel4.resize(width, height);
}