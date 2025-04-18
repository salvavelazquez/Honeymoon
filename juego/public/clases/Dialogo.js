class Dialogo {
    constructor(dialogos, hada) {
        this.dialogos = dialogos;
        this.hada = hada;
        this.estadoDialogo = 0;
        this.tamanoTextoBase = 25; // Tamaño base para desktop
        this.tamanoTextoActual = this.tamanoTextoBase;
    }


    calcularTamanoTexto() {
        // Ajusta según el ancho de pantalla (ejemplo para móviles)
        if (windowWidth < 1268) { // Si es menor a tablet
            this.tamanoTextoActual = this.tamanoTextoBase * 0.7; // Reduce 30%
        } else {
            this.tamanoTextoActual = this.tamanoTextoBase;
        }

        // Ajuste adicional para pantallas muy pequeñas
        if (windowWidth < 400) {
            this.tamanoTextoActual = this.tamanoTextoBase * 0.5;
        }
    }

    mostrar() {
        this.calcularTamanoTexto(); 
        fill(255, 255, 255, 200);
        rect(width / 4, height / 2 - 50, width / 2, 150, 20);

        fill(0);
        textSize(this.tamanoTextoActual);
        textLeading(this.tamanoTextoActual * 1.2);
        text(this.dialogos[this.estadoDialogo], width /4+20, height / 2 - 2, width - 140, 140);

        image(this.hada, width - 400, height / 2 + 50, 130, 130);
        if (dialogoCarameloMostrado) image(carameloImagen, width - 230, height - 280);
    }

    dialogoVampirut() {
        this.calcularTamanoTexto(); 
        fill(255, 255, 255, 200);
        rect(width / 4+50, height / 2 - 50, width / 2, 150, 20);

        fill(0);
        textSize(this.tamanoTextoActual);
        textLeading(this.tamanoTextoActual * 1.2);
        text(this.dialogos[this.estadoDialogo], width /4+20, height / 2 - 2, width - 140, 140);
    }

    avanzarDialogo() {
        this.estadoDialogo++;
    }

    dialogoTerminado() {
        if (this.estadoDialogo >= this.dialogos.length) {
            this.estadoDialogo = 0;
            return true;
        }
        return false;
    }
}

