function main() {
  console.log("En main()....")

  //-- Variables booleanas para activar o desactivar filtros
  var filtro_colores = true;
  var filtro_grises = false;
  var filtro_doble = false;

  //-- Acceso al objeto con la imagen
  var img = document.getElementById('imagesrc')

  //--Acceso a los botones
  var boton_colores = document.getElementById('boton_colores');
  var boton_grises = document.getElementById('boton_grises');
  var boton_doble = document.getElementById('doble');

  var rojo = document.getElementById('rojo');
  var verde = document.getElementById('verde');
  var azul = document.getElementById('azul');

  //-- Acceso al objeto con el canvas
  var canvas = document.getElementById('display');

  //-- Acceso al deslizador
  deslizadorred = document.getElementById('deslizadorred')
  deslizadorgreen = document.getElementById('deslizadorgreen')
  deslizadorblue = document.getElementById('deslizadorblue')

  //-- Valor del deslizador
  range_value_red = document.getElementById('range_value_red')
  range_value_green = document.getElementById('range_value_green')
  range_value_blue = document.getElementById('range_value_blue')

  range_value_red.innerHTML = deslizadorred.value;
  range_value_green.innerHTML = deslizadorgreen.value;
  range_value_blue.innerHTML = deslizadorblue.value;
  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Obtener el contexto del canvas para
  //-- trabajar con el
  var ctx = canvas.getContext("2d");

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  function ocultarbotones() {
    deslizadorred.style.display = 'none';
    range_value_red.innerHTML = '';
    rojo.innerHTML = '';
    deslizadorgreen.style.display = 'none';
    range_value_green.innerHTML = '';
    verde.innerHTML = '';
    deslizadorblue.style.display = 'none';
    range_value_blue.innerHTML = '';
    azul.innerHTML = '';
  }

  function mostrarbotones () {
    deslizadorred.style.display = '';
    range_value_red.innerHTML = deslizadorred.value;
    rojo.innerHTML = "Establece el umbral de rojo:";
    deslizadorgreen.style.display = '';
    range_value_green.innerHTML = deslizadorgreen.value;
    verde.innerHTML = "Establece el umbral de verde:";
    deslizadorblue.style.display = '';
    range_value_blue.innerHTML = deslizadorblue.value;
    azul.innerHTML = "Establece el umbral de azul:";
  }

  boton_colores.onclick = () => {
    if (filtro_colores){
      boton_colores.innerHTML = "Filtro de colores: OFF";
      filtro_colores= false;
      ctx.drawImage(img, 0,0);
      ocultarbotones();
    } else {
      boton_colores.innerHTML = "Filtro de colores: ON";
      filtro_colores= true;
      filtro_grises= false;
      boton_grises.innerHTML = "Filtro blanco y negro: OFF";
      mostrarbotones();
    }
  }
  boton_grises.onclick = () => {
    if (filtro_grises){
      ctx.drawImage(img, 0,0);
      filtro_grises = false;
      boton_grises.innerHTML = "Filtro blanco y negro: OFF";
    } else {
      filtro_grises = true;
      boton_grises.innerHTML = "Filtro blanco y negro: ON";
      boton_colores.innerHTML = "Filtro de colores: OFF";
      filtro_colores= false;
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imgData.data
      for (var i = 0; i < data.length; i+=4) {
        brillo = (3 * data[i] + 4 * data[i+1] + data[i+2])/8
        data[i] = brillo;
        data[i+1] = brillo;
        data[i+2] = brillo;
      }
      ctx.putImageData(imgData, 0, 0);
      ocultarbotones();
    }
  }

  boton_doble.onclick = () => {
    filtro_doble = true;
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height/2);
    var data = imgData.data
    for (var i = 0; i < data.length; i+=4) {
      brillo = (3 * data[i] + 4 * data[i+1] + data[i+2])/8
      data[i] = brillo;
      data[i+1] = brillo;
      data[i+2] = brillo;
    }
    ctx.putImageData(imgData, 0, 0);
  }

  //-- Funcion de retrollamada del deslizador
  deslizadorred.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
  //  ctx.drawImage(img, 0,0);

    if (filtro_doble) {
      range_value_red.innerHTML = deslizadorred.value
      //range_value_red.innerHTML = deslizadorred.value

      ctx.drawImage(img, 0, canvas.height/2, canvas.width, canvas.height);
      //-- Obtener la imagen del canvas en pixeles
      var imgData = ctx.getImageData(0, (canvas.height/2), canvas.width, canvas.height);

      //-- Obtener el array con todos los píxeles
      var data = imgData.data

      //-- Obtener el umbral de rojo del desliador
      umbral = deslizadorred.value

      //-- Filtrar la imagen según el nuevo umbral
      for (var i = 0; i < data.length; i+=4) {
        if (data[i] > umbral) {
          data[i] = umbral;
        }
        if (data[i+1] > deslizadorgreen.value) {
          data[i+1] = deslizadorgreen.value;
        }
        if (data[i+2] > deslizadorblue.value) {
          data[i+2] = deslizadorblue.value;
        }
      }
      ctx.putImageData(imgData, 0, canvas.height/2);
    } else {

      //-- Obtener la imagen del canvas en pixeles
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      //-- Obtener el array con todos los píxeles
      var data = imgData.data

      //-- Obtener el umbral de rojo del desliador
      umbral = deslizadorred.value

      //-- Filtrar la imagen según el nuevo umbral
      for (var i = 0; i < data.length; i+=4) {
        if (data[i] > umbral) {
          data[i] = umbral;
        }
        if (data[i+1] > deslizadorgreen.value) {
          data[i+1] = deslizadorgreen.value;
        }
        if (data[i+2] > deslizadorblue.value) {
          data[i+2] = deslizadorblue.value;
        }
      }

      //img=imgData;
      //-- Poner la imagen modificada en el canvas
      ctx.putImageData(imgData, 0, 0);
    }
  }

  deslizadorgreen.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    range_value_green.innerHTML = deslizadorgreen.value

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    var data = imgData.data

    //-- Obtener el umbral de rojo del desliador
    umbral = deslizadorgreen.value

    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 0; i < data.length; i+=4) {
      if (data[i+1] > umbral){
        data[i+1] = umbral;
      }
      if (data[i] > deslizadorred.value) {
        data[i] = deslizadorred.value;
      }
      if (data[i+2] > deslizadorblue.value) {
        data[i+2] = deslizadorblue.value;
      }
    }
    //img=imgData;
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

  deslizadorblue.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    range_value_blue.innerHTML = deslizadorblue.value

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    var data = imgData.data

    //-- Obtener el umbral de rojo del desliador
    umbral = deslizadorblue.value

    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 0; i < data.length; i+=4) {
      if (data[i+2] > umbral){
        data[i+2] = umbral;
      }
      if (data[i] > deslizadorred.value){
        data[i] = deslizadorred.value;
      }
      if (data[i+1] > deslizadorgreen.value) {
        data[i+1] = deslizadorgreen.value;
      }

    }
    //img=imgData;
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

}
