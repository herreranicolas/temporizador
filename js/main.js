let hora = 0;
minutos = 0;
segundos = 0;
form = document.getElementById("formTemporizador");
btnComenzarTemporizador = document.getElementById("btnComenzarTemporizador");
btnPausarTemporizador = document.getElementById("btnPausarTemporizador");
btnPausarTemporizador.addEventListener("click", pausarTemporizador);
btnResetearTemporizador = document.getElementById("btnResetearTemporizador");
btnResetearTemporizador.addEventListener("click", resetearTemporizador);

let tiempoRestante;
let intervaloId;
let estaPausado = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  comenzarTemporizador();
});

function comenzarTemporizador() {
  let inputTemporizador = document.getElementById("inputTemporizador").value;
  inputTemporizador++;
  inputTemporizador = parseInt(inputTemporizador);
  let unidadTiempoTemporizador = document.getElementById(
    "unidadTiempoTemporizador"
  ).value;
  switch (unidadTiempoTemporizador) {
    case "segundos":
      tiempoRestante = inputTemporizador;
      break;
    case "minutos":
      tiempoRestante = inputTemporizador * 60;
      break;
    case "horas":
      tiempoRestante = inputTemporizador * 3600;
      break;
    default:
      tiempoRestante = inputTemporizador;
  }

  clearInterval(intervaloId);
  intervaloId = setInterval(() => {
    if (!estaPausado) {
      tiempoRestante--;
      if (tiempoRestante === 0) {
        clearInterval(intervaloId);
      }
      mostrarTiempo(tiempoRestante);
    }
  }, 1000);
  btnPausarTemporizador.removeAttribute("disabled");
  form.reset();
}

function pausarTemporizador() {
  estaPausado = !estaPausado;
  let inputTemporizador = document.getElementById("inputTemporizador");
  let unidadTiempoTemporizador = document.getElementById(
    "unidadTiempoTemporizador"
  );
  if (estaPausado) {
    inputTemporizador.classList.add("d-none");
    unidadTiempoTemporizador.classList.add("d-none");
    btnComenzarTemporizador.classList.add("d-none");
    btnPausarTemporizador.innerHTML = `<i class="bi bi-play-circle fs-1"></i>`;
  } else {
    inputTemporizador.classList.remove("d-none");
    unidadTiempoTemporizador.classList.remove("d-none");
    btnComenzarTemporizador.classList.remove("d-none");
    btnPausarTemporizador.innerHTML = `<i class="bi bi-pause-circle fs-1"></i>`;
  }
}

function resetearTemporizador() {
  tiempoRestante = 0;
  clearInterval(intervaloId);
  mostrarTiempo(tiempoRestante);
  estaPausado = false;
    if (tiempoRestante <= 0) {
      btnPausarTemporizador.setAttribute("disabled", "true");
    }
}

function verificarTiempo(tiempo) {
  if (tiempo !== "00" && tiempo < 10) {
    tiempo = "0" + tiempo;
  }
  return tiempo;
}

function mostrarTiempo(tiempo) {
  const horas = Math.floor(tiempo / 3600);
  const minutos = Math.floor((tiempo - horas * 3600) / 60);
  const segundos = tiempo % 60;
  document.getElementById("temporizador").textContent = `${verificarTiempo(
    horas
  )}:${verificarTiempo(minutos)}:${verificarTiempo(segundos)}`;
    if (tiempo > 0) {
      btnPausarTemporizador.removeAttribute("disabled");
    } else {
      btnPausarTemporizador.setAttribute("disabled", "true");
    }
}
