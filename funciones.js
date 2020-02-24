var canvas = document.getElementById("canvas").getContext("2d");
var direccion = "vertical";
var desplazamiento = 15;
var movimientoPelota, time, velocidadPelota=2, posX, score, gameOver;
var banX = false,
   banY = false,
   bandera = false;
start();

//MUSTRA EL MENSAJE DE BIENVENIDA AL USUARIO
canvas.font = "30px Arial";
canvas.fillText("Bienvenido", 220, 130);
canvas.font = "18px Arial";
canvas.fillText("Presiona ENTER para iniciar...", 20, 390);

//UP=38, DOWN=40, LEFT=37, RIGHT=39, SPACE=32, ENTER=13
document.addEventListener('keydown', function(e) {
   //SE ANALIZA LA TECLA PRESIONADA Y SE DECIDE EL EVENTO.
   if (e.which == 37 && bandera == true)
      //SE MUEVEN LAS RAQUETAS HACIA LA IZQUIERDA.
      mover("left");
   else if (e.which == 39 && bandera == true)
      //SE MUEVEN LAS RAQUETAS HACIA LA DERECHA.
      mover("right");
   else if (e.which == 13 && bandera == false && gameOver == false) {
      //INICIA EL JUEGO
      bandera = true;
      canvas.fillRect(posX, 0, 70, 5);
      canvas.fillRect(posX, 395, 70, 5);
      movimientoPelota = setInterval(moverpelota, time);
   } else if (e.which == 32 && gameOver == true) {
      //INICIA EL JUEGO NUEVAMENTE.
      bandera = true;
      start();
      canvas.fillRect(posX, 0, 70, 5);
      canvas.fillRect(posX, 395, 70, 5);
      movimientoPelota = setInterval(moverpelota, time);
   }
}, false);

function start() {
   //SE INICIALIZAN LAS VARIABLES NECESARIAS.
   posX = 255;
   time = 15;
   score = 0;
   gameOver = false;
   //SE DIBUJA EL ESCENARIO DEL JUEGO.
   canvas.fillStyle = "#000";
   canvas.fillRect(0, 0, 595, 5);
   canvas.fillRect(0, 395, 595, 400);
   canvas.fillStyle = "#f4511e";
   canvas.fillRect(0, 0, 15, 400);
   canvas.fillRect(580, 0, 15, 400);
   canvas.fillStyle = "#fff";
   //SE GENERAN ALEATORIAMENTE CENTRADAS LAS COORDENADAS DEL INICIO DE LA PELOTA
   pelotaX = Math.round(Math.random() * 555 + 20);
   pelotaY = Math.round(Math.random() * 100 + 150);
}

function mover(direccion) {
   //SE ELIMINAN LAS RAQUETAS DE LA POSICION OBSOLETA PARA DIBUJARLAS NUEVAMENTE.
   canvas.fillStyle = "#000";
   canvas.fillRect(posX, 0, 70, 5);
   canvas.fillRect(posX, 395, 70, 5);
   //SE DECIDE HACIA DONDE SE MOVERAN LAS RAQUETAS.
   switch (direccion) {
      case "left":
         if (posX > 15)
            posX -= desplazamiento;
         break;
      case "right":
         if (posX < 510)
            posX += desplazamiento;
         break;
   }
   //SE DIBUJAN LAS RAQUETAS SUPERIOR E INFERIOR.
   canvas.fillStyle = "#f2f2f2";
   canvas.fillRect(posX, 0, 70, 5);
   canvas.fillRect(posX, 395, 70, 5);
}

function moverpelota() {
   //SE LIMPIA LA PANTALLA Y SE DIBUJA LA PELOTA EN LA NUEVA POSICION.
   canvas.clearRect(15, 5, 565, 390);
   canvas.beginPath();
   canvas.arc(pelotaX, pelotaY, 5, 0, 2 * Math.PI);
   canvas.closePath();
   canvas.fill();
   /// MOVIMIENTO DE LA PELOTA EN EL EJE X
   if (pelotaX == 575 && banX == false)
      banX = true;
   if (pelotaX == 20 && banX == true)
      banX = false;
   if (pelotaX < 575 && banX == false)
      pelotaX++;
   if (pelotaX > 20 && banX == true)
      pelotaX--;
   //SE REDUCE EL TIEMPO DEL SETINTERVAL PARA HACER LA ANIMACION DE LA PELOTA MAS RAPIDA.
   if (time > 1) {
      clearInterval(movimientoPelota);
      timing(.005);
   } else if (time > .0003) {
      clearInterval(movimientoPelota);
      timing(.0003);
   } else {
      clearInterval(movimientoPelota);
      movimientoPelota = setInterval(moverpelota, 0.000000000001);
   }
   /// MOVIMIENTO DE LA PELOTA EN EL EJE Y
   if (pelotaY >= 390 && banY == false)
      if ((pelotaX - 3) <= posX + 70 && pelotaX + 3 >= posX) {
         banY = true;
         score++;
      }
   else {
      //LA PELOTA CHOCA EN EL BORDE INFERIOR Y SE DETIENE EL JUEGO.
      clearInterval(movimientoPelota);
      canvas.font = "30px Arial";
      canvas.fillText("Game Over", 220, 130);
      canvas.font = "18px Arial";
      canvas.fillText("Presiona SPACE para jugar de nuevo...", 20, 390);
      bandera = false;
      gameOver = true;
   }
   if (pelotaY <= 10 && banY == true)
      if ((pelotaX - 3) <= posX + 70 && pelotaX + 3 >= posX) {
         banY = false;
         score++;
      }
   else {
      //LA PELOTA CHOCA EN EL BORDE SUPERIOR Y SE DETIENE EL JUEGO.
      clearInterval(movimientoPelota);
      canvas.font = "30px Arial";
      canvas.fillText("Game Over", 220, 130);
      canvas.font = "18px Arial";
      canvas.fillText("Presiona SPACE para jugar de nuevo...", 20, 390);
      bandera = false;
      gameOver = true;
   }

   //DETECTA LOS BORDES SUPERIOR E INFERIOR PARA CAMBIAR DE DIRECCION.
   if (pelotaY < 390 && banY == false)
      pelotaY += velocidadPelota;
   if (pelotaY > 10 && banY == true)
      pelotaY -= velocidadPelota;
   //MUESTRA EN PANTALLA EL SCORE DEL JUGADOR EN UNA ETIQUETA.
   var scoreTexto = document.getElementById("score").innerHTML = 'Score: ' + score;
}
//FUNCION PARA REDUCIR EL TIEMPO DEL DESPLAZAMIENTO DE LA PELOTA.
function timing(reduccion) {
   time -= reduccion;
   movimientoPelota = setInterval(moverpelota, time);
}
