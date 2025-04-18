// Variables globales
let sonidoUno, sonidoDos, win, salto;
let honeymoon;
let enemigo, zombie, vampirut;
let dialogoHada, dialogoJefe;
let nube;

// Variables de imágenes
let imagenNube, bolaAmarilla, bolaRosa, bolaGris, bolaVerde;
let hadaguia, castillo, reina, corona;
let fondoNivel1, fondoNivel2, fondoNivel3, fondoNivel4, fondo, fondoRedimensionado;
let donaImagen, zombieaux;
let plataformaChocolate;
let carameloImagen;
let imagenBolaDeFuego;
let secuenciaDePoder = [];
let slimeFrames = [];
let zombieFrames = [];
let vampiro;

// Variables del juego
let fondoX = 0;
let fondoVelocidad = 8;
let plataformas = [];
let enemigos = [];
let dialogoInicial = [
    "    ¡Hola Honeymoon! Tienes una nueva misión!!",
    "         Encuentra la corona de la princesa de\n              Caramelos para su coronación.",
    "Los Egs no quieren que sea reina así que robaron \nla corona del reino...",
    "El bosque está todo contaminado, recoje lo que \npuedas para poder avanzar! .",
    "A las Rolluts saltarinas no les afecta tu poder...\n                                            ¡ten mucho cuidado! ¡Suerte!",
];

let dialogoNivel1 = [
    "¡Bien hecho! Curaste el mundo de caramelos!!",
    "Tengo noticias que la corona lo tiene el lider de los Egs,",
    "Una extraña figura envuelta en una capa oscura...",
    "Escapa del zombie gigante! no dejes que te aplaste!",
    "Continua con tu viaje, fuerzas!!"
];

let dialogoCarameloMostrado = false;
let dialogoCaramelo = [
    "          ¡Has encontrado el caramelo Sagrado!",
    "           Tendrás nuevos movimientos!! "
];

let dialogoJefeFinal = [
    "          ¡bla bla bla soy Vampirut y robé la corona de caramelos",
    "           Podrás detenerme? no lo creo bla bla bla... "
];

let juegoIniciado = false;
let nivel1Completado = false;
let parteDos = false;
let slimeAgregado = false;
let zombieAgregado = false;
let plataformaX = 0;
let indicePlataformaActual = -1;

let animacionFondoActiva = false;
let tiempoInicioAnimacion;
let fondoActual = 1;

let inicioDialogoVampiro = false;
let finalDialogoVampiro = false;
let activaSonidoDos = false;



// Variables para controles
let joyX, joyY, joyBaseX, joyBaseY;
let joyRadio = 50;
let joyActivo = false;
let botonSalto, botonDisparo;

function preload() {
    // Cargar sonidos
    sonidoUno = loadSound("public/assets/musica/1.mp3");
    sonidoDos = loadSound("public/assets/musica/2.mp3");
    salto = loadSound("public/assets/musica/jump.wav");
    win = loadSound("public/assets/musica/win.mp3");

    // Cargar imágenes
    hadaguia = loadImage("public/assets/imagenes/HadaGuia.png");
    fondoNivel1 = loadImage("public/assets/imagenes/FondoPalido.jpg");
    fondoNivel2 = loadImage("public/assets/imagenes/Fondo2tonos.jpg");
    fondoNivel3 = loadImage("public/assets/imagenes/FondoFuerte.jpg");
    fondoNivel4 = loadImage("public/assets/imagenes/FondoInverso.jpg");
    castillo = loadImage("public/assets/imagenes/castillo.png");
    reina = loadImage("public/assets/imagenes/reina1.png");
    corona = loadImage("public/assets/imagenes/corona.png");
    vampiro = loadImage("public/assets/imagenes/vampirodona.png");

    // Cargar imágenes de nubes y bolas de papel
    imagenNube = loadImage("public/assets/imagenes/nube.png");
    bolaAmarilla = loadImage("public/assets/imagenes/bolasdepapel/amarilla.png");
    bolaRosa = loadImage("public/assets/imagenes/bolasdepapel/rosa.png");
    bolaGris = loadImage("public/assets/imagenes/bolasdepapel/gris.png");
    bolaVerde = loadImage("public/assets/imagenes/bolasdepapel/verde.png");

    // Cargar imágenes de enemigos
    donaImagen = loadImage("public/assets/imagenes/rollut2.png");
    plataformaChocolate = loadImage("public/assets/imagenes/barra.PNG");
    carameloImagen = loadImage("public/assets/imagenes/caramelo.png");
    imagenBolaDeFuego = loadImage("public/assets/imagenes/fire.png");

    // Cargar frames de slime
    for (let i = 0; i < 4; i++) {
        slimeFrames[i] = loadImage(`public/assets/imagenes/slime/${i + 1}.png`);
    }

    // Cargar frames de zombie
    for (let i = 0; i < 3; i++) {
        zombieFrames[i] = loadImage(`public/assets/imagenes/zombie/${i + 1}.png`);
    }

    // Cargar imágenes del jugador
    miraDerecha = loadImage("public/assets/imagenes/jugadora/1.png");
    miraIzquierda = loadImage("public/assets/imagenes/jugadora/2.png");
    caminaDerecha = loadImage("public/assets/imagenes/jugadora/3.png");
    caminaIzquierda = loadImage("public/assets/imagenes/jugadora/4.png");
    alzar = loadImage("public/assets/imagenes/jugadora/alzar.png");

    // Cargar imágenes de poder
    for (let i = 0; i < 3; i++) {
        secuenciaDePoder[i] = loadImage(`public/assets/imagenes/jugadora/poder/${i + 1}.png`);
    }
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('display', 'block'); // Evita espacios blancos

    // Ajuste de tamaño de elementos según pantalla
    if (isMobile()) {
        // Configuraciones específicas para móviles
        fondoVelocidad = 4; //velocidad en móviles
        honeymoon.velocidad = 5;
        honeymoon.ancho *= 0.8;
        honeymoon.alto *= 0.8;

        // Posicionar joystick y botones
        joyBaseX = width * 0.15;
        joyBaseY = height * 0.7;
        joyX = joyBaseX;
        joyY = joyBaseY;

        // Crear botones
        botonSalto = {
            x: width * 0.85,
            y: height * 0.7,
            radio: 40
        };

        botonDisparo = {
            x: width * 0.75,
            y: height * 0.7,
            radio: 40
        };
        // Deshabilitar zoom con gestos
        document.addEventListener('gesturestart', function (e) {
            e.preventDefault();
        });

        // Evitar scroll táctil
        document.ontouchmove = function (e) {
            if (e.target.tagName.toLowerCase() != 'canvas') {
                e.preventDefault();
            }
        };
    }

    // Configurar sonidos
    sonidoUno.loop();
    sonidoUno.setVolume(0.2);

    // Redimensionar imágenes
    castillo.resize(757, 737);
    vampiro.resize(209, 252);
    carameloImagen.resize(100, 70);
    imagenBolaDeFuego.resize(45, 40);

    // Redimensionar fondos
    fondoNivel1.resize(width, height);
    fondoNivel2.resize(width, height);
    fondoNivel3.resize(width, height);
    fondoNivel4.resize(width, height);

    fondo = fondoNivel3;

    // Inicializar objetos del juego
    honeymoon = new Jugadora();
    dialogoHada = new Dialogo(dialogoInicial, hadaguia);
    dialogoJefe = new Dialogo(dialogoJefeFinal, vampiro);
    nube = new Nube(imagenNube);

    // Configurar plataformas
    plataformas = [];
    plataformas.push(new Plataforma(plataformaChocolate, -10, 300, 100, 42));
    plataformas.push(new Plataforma(plataformaChocolate, -2600, 400, 800, 42));
    plataformas.push(new Plataforma(plataformaChocolate, -3000, 300, 100, 52));
    plataformas.push(new Plataforma(plataformaChocolate, -3200, 200, 200, 52));
    plataformas.push(new Plataforma(plataformaChocolate, -3700, 150, 400, 52));

    // Configurar enemigos
    zombie = new Zombie(zombieFrames, width + 100, height - 490);
    vampirut = new Vampiro(vampiro, -600, height / 2 - vampiro.height / 2, 100);

    enemigos = [];
    for (let i = 0; i < 3; i++) {
        enemigos.push(new Rollut(donaImagen, random(100, width - 100), random(100, height - 150)));
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // Redimensionar fondos si es necesario
    fondoNivel1.resize(windowWidth, windowHeight);
    fondoNivel2.resize(windowWidth, windowHeight);
    // ... otros ajustes de redimensionamiento
    if (dialogoHada) dialogoHada.calcularTamanoTexto();
    if (dialogoJefe) dialogoJefe.calcularTamanoTexto();
}

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function draw() {
    background(255);

    // Dibujar fondo
    image(fondo, fondoX, 0);
    image(fondo, fondoX + fondo.width, 0);

    if (!juegoIniciado) {
        honeymoon.reiniciar();
        honeymoon.mostrar();
        dialogoHada.mostrar();
    } else {
        if (!honeymoon.isJuegoTerminado()) {
            if (!nivel1Completado) {
                if (!slimeAgregado) {
                    fondo = fondoNivel1;
                }

                nube.mover();
                nube.mostrar();
                nube.lanzarCirculo();
                nube.actualizarCirculos();
                honeymoon.verificarColisiones(nube.bolasPapel);

                // Eliminar enemigos destruidos
                enemigos = enemigos.filter(enemigo => !(enemigo instanceof MonstruoSlime && enemigo.destruido));

                // Mover y mostrar enemigos
                for (let enemigo of enemigos) {
                    enemigo.mover();
                    enemigo.mostrar();
                    honeymoon.manejarColisionEnemigo(enemigo);
                }

                // Mostrar contadores
                fill(255);
                textSize(30);
                text("Vidas: " + honeymoon.vidas, width - 150, 50);

                // Lógica de niveles
                if (honeymoon.contadorBolas > 11 && !slimeAgregado) {
                    fondo = fondoNivel2;
                    enemigos.push(new MonstruoSlime(slimeFrames, random(100, width - 100), height - 150));
                    enemigos.push(new MonstruoSlime(slimeFrames, random(100, width - 100), height - 150));
                    slimeAgregado = true;
                }

                if (honeymoon.contadorBolas > 21) {
                    fondo = fondoNivel3;
                    nivel1Completado = true;
                    dialogoHada = new Dialogo(dialogoNivel1, hadaguia);
                    juegoIniciado = false;
                }
            } else {
                // Nivel 2
                if (!parteDos) {
                    honeymoon.posicionX = width / 2;

                    if (honeymoon.enMovimiento) {
                        if (honeymoon.apuntaDerecha) {
                            plataformaX -= fondoVelocidad;
                            fondoX -= fondoVelocidad;
                        } else {
                            fondoX += fondoVelocidad;
                            plataformaX += fondoVelocidad;
                        }
                    }

                    // Bucle del fondo
                    if (fondoX <= -fondo.width) fondoX = 0;
                    if (fondoX >= 0) fondoX = -fondo.width;

                    // Mostrar plataformas
                    for (let i = 0; i < plataformas.length; i++) {
                        let plataforma = plataformas[i];
                        plataforma.mostrar(plataformaX);

                        if (plataforma.colisionaCon(honeymoon.posicionX, honeymoon.posicionY, honeymoon.ancho, honeymoon.alto, plataformaX)) {
                            honeymoon.posicionY = plataforma.y - honeymoon.alto - 2;
                            honeymoon.saltando = false;
                            honeymoon.sobrePlataforma = true;
                            indicePlataformaActual = i;
                        }

                        if (indicePlataformaActual === i && honeymoon.sobrePlataforma) {
                            if (!plataforma.fueraLimites(honeymoon.posicionX, honeymoon.ancho, plataformaX)) {
                                honeymoon.saltando = true;
                                honeymoon.sobrePlataforma = false;
                            }
                        }
                    }

                    // Mover zombie
                    zombie.mover();
                    zombie.mostrar();
                    honeymoon.manejarColisionEnemigo(zombie);
                } else {
                    if (!dialogoCarameloMostrado) {
                        dialogoHada = new Dialogo(dialogoCaramelo, hadaguia);
                        juegoIniciado = false;
                        dialogoCarameloMostrado = true;
                        fondoX = 0;
                        honeymoon.apuntaDerecha = false;
                    } else {
                        if (!activaSonidoDos) {
                            sonidoUno.stop();
                            sonidoDos.play();
                            sonidoDos.setVolume(0.4);
                            activaSonidoDos = true;
                        }

                        if (!animacionFondoActiva) {
                            animacionFondoActiva = true;
                            tiempoInicioAnimacion = millis();
                        }

                        let tiempoTranscurrido = millis() - tiempoInicioAnimacion;

                        if (tiempoTranscurrido < 5500) {
                            if (floor(tiempoTranscurrido / 1000) % 2 === 0) {
                                fondo = fondoNivel3;
                            } else {
                                fondo = fondoNivel4;
                            }
                            image(fondo, 0, 0, width, height);

                            vampirut.mover();
                            vampirut.mostrar();
                        } else {
                            fondo = fondoNivel4;
                            image(fondo, 0, 0, width, height);

                            vampirut.mover();
                            vampirut.mostrar();

                            if (!finalDialogoVampiro) {
                                inicioDialogoVampiro = true;
                                dialogoJefe.dialogoVampirut();
                            }

                            fill(color(255, 75, 222));
                            textSize(30);
                            text("Vidas: " + honeymoon.vidas, width - 150, 50);
                        }
                    }
                }
            }
        } else {
            textSize(90);
            textAlign(CENTER);
            text("Game Over \n", width / 2, height / 2);
            textSize(50);
            text("(Presiona R para reiniciar el nivel)", width / 2, height / 2 + 90);
            textAlign(LEFT);
            noLoop();
        }

        honeymoon.mover();
        honeymoon.manejarPoder();
        honeymoon.mostrar();

        if (vampirut && !vampirut.estaVivo()) {
            win.play();
            noTint();
            image(fondoNivel3, fondoX, 0);
            image(castillo, 0, height - 765);
            image(reina, 300, height / 2 - 40, 140, 140);
            image(honeymoon.alzar, width / 2 + 170, height - 190);
            image(corona, width / 2 + 130, height - 300, 90, 70);
            fill(255);
            textSize(80);
            text("GANASTE!", width / 2 - 150, height / 2);
            noLoop();
        }
    }
    if (isMobile()) {
        dibujarControlesMoviles();
    }
}

function reinicioDeNivel() {
    // Reiniciar variables fundamentales
    juegoIniciado = false;
    fondoX = 0;
    plataformaX = 0;
    indicePlataformaActual = -1;
    
    // Reiniciar al jugador completamente
    honeymoon = new Jugadora(); // Crear nueva instancia es más seguro que reiniciar()
    
    // Manejo de niveles
    if (!nivel1Completado) {
        fondo = fondoNivel1;
        
        // Reiniciar enemigos nivel 1
        enemigos = [];
        for (let i = 0; i < 3; i++) {
            enemigos.push(new Rollut(donaImagen, random(100, width - 100), random(100, height - 150)));
        }
        
        slimeAgregado = false;
        nube = new Nube(imagenNube); // Nueva instancia de nube
        
    } else {
        fondo = fondoNivel3;
        
        // Reiniciar enemigos nivel 2
        zombie = new Zombie(zombieFrames, width+100, height - 464);
        vampirut = new Vampiro(vampiro, -600, height / 2 - vampiro.height / 2, 100);
        
        parteDos = false;
        finalDialogoVampiro = false;
        inicioDialogoVampiro = false;
        animacionFondoActiva = false;
        dialogoCarameloMostrado = false;
        dialogoHada = new Dialogo(dialogoNivel1, hadaguia);
    }
    
    // Reiniciar sonidos
    sonidoUno.stop();
    sonidoDos.stop();
    sonidoUno.loop();
    sonidoUno.setVolume(0.2);
    
    // Asegurar que el juego no esté pausado
    loop();
    
    console.log("Juego reiniciado correctamente"); // Para depuración
}

function keyPressed() {
    if (!juegoIniciado || inicioDialogoVampiro) {
        if (key === ' ') {
            if (!inicioDialogoVampiro) {
                dialogoHada.avanzarDialogo();
                if (dialogoHada.dialogoTerminado()) {
                    juegoIniciado = true;
                }
            } else {
                dialogoJefe.avanzarDialogo();
                if (dialogoJefe.dialogoTerminado()) {
                    finalDialogoVampiro = true;
                    inicioDialogoVampiro = false;
                }
            }
        }
    } else {
        if (!parteDos || (parteDos && finalDialogoVampiro)) {
            if (keyCode === RIGHT_ARROW) {
                honeymoon.activarMovimiento(true);
            } else if (keyCode === LEFT_ARROW) {
                honeymoon.activarMovimiento(false);
            } else if (key === ' ') {
                honeymoon.activarPoder();
            } else if (keyCode === UP_ARROW) {
                if (!parteDos) {
                    honeymoon.saltar();
                } else {
                    honeymoon.arriba = true;
                }
            } else if (keyCode === DOWN_ARROW) {
                if (parteDos) {
                    honeymoon.arriba = false;
                }
            } else if (key === 'r' || key === 'R') {
                loop();
                honeymoon.reiniciar();
                reinicioDeNivel();
            }
        }
    }
}

function keyReleased() {
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
        honeymoon.detenerMovimiento();
    }
}

function dibujarControlesMoviles() {
    // Joystick
    fill(255, 100);
    ellipse(joyBaseX, joyBaseY, joyRadio * 2);
    fill(255, 150);
    ellipse(joyX, joyY, joyRadio);

    // Botones
    fill(0, 255, 0, 150);
    ellipse(botonSalto.x, botonSalto.y, botonSalto.radio * 2);
    fill(255, 0, 0, 150);
    ellipse(botonDisparo.x, botonDisparo.y, botonDisparo.radio * 2);

    // Actualizar movimiento del personaje según joystick
    if (joyActivo) {
        let distancia = dist(joyX, joyY, joyBaseX, joyBaseY);
        if (distancia > 5) {
            let angulo = atan2(joyY - joyBaseY, joyX - joyBaseX);
            honeymoon.activarMovimiento(cos(angulo) > 0);
            honeymoon.apuntaDerecha = cos(angulo) > 0;
        }
    }
}

// Manejo de toques
function touchStarted() {
    if (isMobile()) {
        // Joystick
        if (dist(touchX, touchY, joyBaseX, joyBaseY) < joyRadio) {
            joyActivo = true;
            return false; // Previene comportamiento por defecto
        }

        // Botón de salto
        if (dist(touchX, touchY, botonSalto.x, botonSalto.y) < botonSalto.radio) {
            honeymoon.saltar();
            return false;
        }

        // Botón de disparo
        if (dist(touchX, touchY, botonDisparo.x, botonDisparo.y) < botonDisparo.radio) {
            honeymoon.activarPoder();
            return false;
        }
    }
    return true;
}

function touchMoved() {
    if (joyActivo) {
        let distancia = dist(touchX, touchY, joyBaseX, joyBaseY);
        if (distancia < joyRadio) {
            joyX = touchX;
            joyY = touchY;
        } else {
            let angulo = atan2(touchY - joyBaseY, touchX - joyBaseX);
            joyX = joyBaseX + cos(angulo) * joyRadio;
            joyY = joyBaseY + sin(angulo) * joyRadio;
        }
        return false; // Previene scroll
    }
    return true;
}

function touchEnded() {
    if (joyActivo) {
        joyX = joyBaseX;
        joyY = joyBaseY;
        joyActivo = false;
        honeymoon.detenerMovimiento();
    }
    return true;
}


