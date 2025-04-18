class Jugadora {
    constructor() {
        this.juegoTerminado = false;
        this.miraDerecha = miraDerecha;
        this.miraIzquierda = miraIzquierda;
        this.caminaDerecha = caminaDerecha;
        this.caminaIzquierda = caminaIzquierda;
        this.secuenciaDePoder = secuenciaDePoder;
        this.alzar = alzar;

        this.imagenActual = this.miraIzquierda;
        this.posicionX = width - 200;
        this.posicionY = height - 180;
        this.ancho = 104;
        this.alto = 118;
        this.sobrePlataforma = false;

        this.velocidadSalto = -15;
        this.gravedad = 0.7;
        this.saltando = false;
        this.velocidad = 7;
        this.enMovimiento = false;
        this.apuntaDerecha = false;
        this.arriba = false;

        this.poderActivado = false;
        this.poderFrame = 0;
        this.poderFrameDelay = 5;
        this.poderFrameCount = 0;

        this.contadorBolas = 0;
        this.vidas = 4;
        this.colisionandoConDona = false;

        this.estaHerido = false;
        this.tiempoHerido = 0;
        this.duracionHerido = 30;

        this.bolasDeFuego = [];
    }

    saltar() {
        if (!this.saltando) {
            salto.play();
            this.saltando = true;
            this.velocidadSalto = -15;
        }
    }

    mover() {
        if (this.enMovimiento) {
            if (this.apuntaDerecha && this.posicionX + this.imagenActual.width < width) {
                this.posicionX += this.velocidad;
                this.imagenActual = this.caminaDerecha;
            } else if (!this.apuntaDerecha && this.posicionX > 0) {
                this.posicionX -= this.velocidad;
                this.imagenActual = this.caminaIzquierda;
            }
        } else {
            this.imagenActual = this.apuntaDerecha ? this.miraDerecha : this.miraIzquierda;
        }

        if (parteDos) {
            if (this.arriba) {
                this.posicionY -= this.velocidad;
            } else {
                this.posicionY += this.velocidad;
            }

            if (this.posicionY < 130) {
                this.posicionY = 130;
            } else if (this.posicionY > height - 200) {
                this.posicionY = height - 200;
            }
        }

        if (this.saltando) {
            this.posicionY += this.velocidadSalto;
            this.velocidadSalto += this.gravedad;

            if (this.posicionY >= height - 180) {
                this.posicionY = height - 180;
                this.saltando = false;
                this.velocidadSalto = 0;
            }
        }
    }

    activarPoder() {
        this.poderActivado = true;
        this.poderFrame = 0;
    }

    manejarPoder() {
        if (this.poderActivado) {
            this.imagenActual = this.secuenciaDePoder[this.poderFrame];
            this.poderFrameCount++;

            if (this.poderFrameCount > this.poderFrameDelay) {
                this.poderFrame++;
                this.poderFrameCount = 0;
            }

            if (!this.apuntaDerecha && parteDos && this.poderFrameCount === 4) this.dispararBolaDeFuego();

            if (this.poderFrame >= this.secuenciaDePoder.length) {
                this.poderActivado = false;
                this.poderFrame = 0;
            }
        }
    }

    manejarBolasDeFuego() {
        for (let i = this.bolasDeFuego.length - 1; i >= 0; i--) {
            let bola = this.bolasDeFuego[i];
            bola.mostrar();
            bola.mover();

            if (bola.colisionaCon(vampirut)) {
                vampirut.reducirVida(1);
                this.bolasDeFuego.splice(i, 1);
            }

            if (bola.estaFueraDePantalla()) {
                this.bolasDeFuego.splice(i, 1);
            }
        }
    }

    dispararBolaDeFuego() {
        let posicionBolaX = this.posicionX;
        let posicionBolaY = this.posicionY + this.alto / 2;
        this.bolasDeFuego.push(new BolaDeFuego(posicionBolaX, posicionBolaY, imagenBolaDeFuego));
    }

    activarMovimiento(apuntaDerecha) {
        this.enMovimiento = true;
        this.apuntaDerecha = apuntaDerecha;
    }

    detenerMovimiento() {
        this.enMovimiento = false;
    }

    verificarColisiones(bolasPapel) {
        for (let i = bolasPapel.length - 1; i >= 0; i--) {
            let bola = bolasPapel[i];
            if (dist(this.posicionX, this.posicionY + 100, bola.x + bola.ancho / 2, bola.y + bola.alto / 2) < (bola.ancho / 2 + 35)) {
                bolasPapel.splice(i, 1);
                this.contadorBolas++;
            }
        }
    }

    verificarColisionEnemigo(enemigo) {
        if (enemigo instanceof Zombie) {
            return dist(this.posicionX, this.posicionY + 20, plataformaX + enemigo.x + enemigo.ancho / 2, enemigo.y + enemigo.alto / 2) < (enemigo.ancho / 2 + 25);
        }
        return dist(this.posicionX, this.posicionY + 20, enemigo.x + enemigo.ancho / 2, enemigo.y + enemigo.alto / 2) < (enemigo.ancho / 2 + 25);
    }

    manejarColisionEnemigo(enemigo) {
        if (this.estaHerido) return;

        if (this.poderActivado && enemigo instanceof MonstruoSlime) {
            if (this.verificarColisionEnemigo(enemigo)) {
                enemigo.desaparecer();
                return;
            }
        }

        if (this.verificarColisionEnemigo(enemigo)) {
            if (!this.colisionandoConDona) {
                this.vidas--;
                this.estaHerido = true;
                this.colisionandoConDona = true;

                if (this.vidas <= 0 || enemigo instanceof Zombie) {
                    this.juegoTerminado = true;
                }
            }
        } else {
            this.colisionandoConDona = false;
        }
    }

    isJuegoTerminado() {
        return this.juegoTerminado;
    }

    reiniciar() {
        this.vidas = 10;
        this.contadorBolas = 0;
        this.posicionX = width - 200;
        this.posicionY = height - 180;
        this.juegoTerminado = false;
        this.imagenActual = dialogoCarameloMostrado ? this.alzar : this.miraIzquierda;
    }

    mostrar() {
        if (this.estaHerido) {
            tint(250, 0, 0);
        } else {
            noTint();
        }

        if (this.poderActivado) {
            if (this.apuntaDerecha) {
                push();
                translate(this.posicionX + this.imagenActual.width, this.posicionY);
                scale(-1, 1);
                image(this.imagenActual, 0, 0);
                pop();
            } else {
                image(this.imagenActual, this.posicionX, this.posicionY);
            }
        } else {
            image(this.imagenActual, this.posicionX, this.posicionY);
        }

        this.manejarBolasDeFuego();
        noTint();

        if (this.estaHerido) {
            this.tiempoHerido++;
            if (this.tiempoHerido > this.duracionHerido) {
                this.estaHerido = false;
                this.tiempoHerido = 0;
            }
        }
    }
}

