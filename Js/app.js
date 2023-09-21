let Titulo = document.title;

window.addEventListener('blur', () => {
  Titulo = document.title;
  document.title = "Te amo mi amor Hermosa";
})

//Agregando Audio de Fondo
let audio = new Audio("flores_amarillas.ogg");

let playSound = () => {
  if (audio.paused) {
    audio.play();
  }
};

document.getElementById("BVer").addEventListener("click",playSound);

window.addEventListener('focus', () => {
  document.title = Titulo;
})

document.getElementById("B12").addEventListener('click', function () {
  const ContenedorBotones = document.querySelector(".Con");
  ContenedorBotones.style.display = "none";
  document.querySelector(".Texto").style.display = "block";
  CrearVarias();
})

const canvas = document.getElementById('Flor');
const ctx = canvas.getContext('2d');

function DibujarPetalo(x, y, RadioX, scala, Rotacion, color, pasos) {
  const Numero = scala;

  const AnguloIncrement = (Math.PI / pasos) * 2;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Rotacion);
  ctx.scale(1, Numero);
  ctx.beginPath();
  for (let i = 0; i <= pasos; i++) {
    const AnguloActual = i * AnguloIncrement;
    const currentRadius = Math.sin(AnguloActual) * RadioX;
    const PuntoY = Math.sin(AnguloActual) * currentRadius;
    const PuntoX = Math.cos(AnguloActual) * currentRadius;
    if (i === 0) {
      ctx.moveTo(PuntoX, PuntoY);
    } else {
      ctx.lineTo(PuntoX, PuntoY);
    }
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

function DibujarFlor(x, y, NumeroPetalos, RadioXPetalo, RadioYPetalo, AltoTrazo) {
  // Tallo
  const PasosTallo = 50;
  const AltoTallo = AltoTrazo / PasosTallo;
  let NuevaY = y;

  const DibujarTallo = () => {
    if (NuevaY < y + AltoTrazo) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, NuevaY);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      NuevaY += AltoTallo;
      setTimeout(DibujarTallo, 100);
    } else {
      // Dibuja los petalos en el tallo
      const Pasos = 50;
      let CuantosPasos = 0;
      function DibujarPetalosTallo() {
        if (CuantosPasos <= Pasos) {
          const PetaloY = y + 250 - RadioYPetalo;
          const PetaloY2 = y + 200 - RadioYPetalo;
          DibujarPetalo(500, PetaloY, 15, 2, 300, 'green', CuantosPasos);
          DibujarPetalo(470, PetaloY2, 15, 2, 300, 'green', CuantosPasos);
          CuantosPasos++;
          setTimeout(DibujarPetalosTallo, 100);
        }
      }
      DibujarPetalosTallo();
    }
  };
  DibujarTallo();

  const AnguloIncrement = (Math.PI * 2) / NumeroPetalos;

  let contadorPetalos = 0;
  function dibujarSiguientePetalo() {
    if (contadorPetalos <= NumeroPetalos) {
      const Angulo = contadorPetalos * AnguloIncrement;
      DibujarPetalo(x, y, RadioXPetalo, 2, Angulo, 'yellow', 100);
      contadorPetalos++;
      setTimeout(dibujarSiguientePetalo, 1000);
    }
    // Dibuja el centro de la flor
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }
  dibujarSiguientePetalo();
}

function DibujarFlorSinTallo(x, y, NumeroPetalos, RadioXPetalo, RadioYPetalo, AltoTrazo) {
  // Dibuja el tallo
  const PasosTallo = 50;
  const AltoTallo = AltoTrazo / PasosTallo;
  let NuevaY = y;

  const DibujarTallo = () => {
    if (NuevaY < y + AltoTrazo) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, NuevaY);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      NuevaY += AltoTallo;
      setTimeout(DibujarTallo, 100);
    }
  };
  DibujarTallo();

  const AnguloIncrement = (Math.PI * 2) / NumeroPetalos;

  // Dibuja los pétalos
  let contadorPetalos = 0;
  function dibujarSiguientePetalo() {
    if (contadorPetalos <= NumeroPetalos) {
      const Angulo = contadorPetalos * AnguloIncrement;
      DibujarPetalo(x, y, RadioXPetalo, 2, Angulo, 'yellow', 100);
      contadorPetalos++;
      setTimeout(dibujarSiguientePetalo, 1000);
    }
    // Dibuja el centro de la flor
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }
  dibujarSiguientePetalo();
}

function CrearVarias() {
  const numFlores = 12;

  // Espaciamiento y tamaño de cada flor
  const espacioX = canvas.width / 4;
  const espacioY = canvas.height / 3;
  const TamañoFlor = 130;

  for (let i = 0; i <= numFlores; i++) {
    const fila = Math.floor(i / 4);
    const columna = i % 4;
    const x = espacioX * columna + espacioX / 2;
    const y = espacioY * fila + espacioY / 2;

    DibujarFlorSinTallo(x, y, 8, 30, 80, TamañoFlor);
  }
}


(function () {
  const canvas = document.getElementById('Flor');
  const context = canvas.getContext('2d');

  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {


    if (window.innerWidth > 768) {
      canvas.width = window.innerWidth / 2;
      canvas.height = window.innerHeight;

    }
    else {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight / 2 + 100;

    }


    /**
     * Your drawings need to be inside this function otherwise they will be reset when 
     * you resize the browser window and the canvas goes will be cleared.
     */
    drawStuff();
  }

  resizeCanvas();

  function drawStuff() {
    // do your drawing stuff here
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
})();
