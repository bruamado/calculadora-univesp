let avaliativas = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
}

let prova = {
  regular: null,
  exame: null,
}

let media = {
  avaliativas: null,
  regular: null,
  exame: null,
}

let simulacao = {
  regular: null, // Nota mínima necessária na prova regular para atingir média final
  exame: null, // Nota mínima necessária na prova de exame para atingir média final
}

let pesos = {
  mediaFinal: 5, // Valor de média final
  avaliativas: 0.4, // Peso das avaliativas
  prova: 0.6, // Peso da prova presencial
  semana1: 0.08, // Peso de cada semana das avaliativas
  semana2: 0.12,
  semana3: 0.17,
  semana4: 0.17,
  semana5: 0.17,
  semana6: 0.17,
  semana7: 0.12,
}

function calcularAvaliativasSemanais() {
  media.avaliativas =
    avaliativas[1] * pesos.semana1 +
    avaliativas[2] * pesos.semana2 +
    avaliativas[3] * pesos.semana3 +
    avaliativas[4] * pesos.semana4 +
    avaliativas[5] * pesos.semana5 +
    avaliativas[6] * pesos.semana6 +
    avaliativas[7] * pesos.semana7
  return media.avaliativas
}

function calcularMediaFinalRegular() {
  media.regular =
    prova.regular * pesos.prova + media.avaliativas * pesos.avaliativas
  return media.regular
}

function calcularMediaFinalExame() {
  media.exame = (media.regular + prova.exame) / 2
  return media.exame
}

function simularRegular() {
  //  Fórmula para calcular a nota mínima (prova) necessária para atingir a média final
  simulacao.regular =
    (pesos.mediaFinal - media.avaliativas * pesos.avaliativas) / pesos.prova
  if (simulacao.regular >= 4.5 && simulacao.regular < pesos.mediaFinal) {
    simulacao.regular = simulacao.regular.toFixed(2)
  } else {
    simulacao.regular = simulacao.regular.toFixed(1)
  }
  return simulacao.regular
}

function simularExame() {
  //  Fórmula para calcular a nota mínima (prova) necessária para atingir a média final no exame
  simulacao.exame = 2 * pesos.mediaFinal - media.regular
  if (simulacao.exame >= 4.5 && simulacao.exame < pesos.mediaFinal) {
    simulacao.exame = simulacao.exame.toFixed(2)
  } else {
    simulacao.exame = simulacao.exame.toFixed(1)
  }
  return simulacao.exame
}

function clearInput(element) {
  element.value = ""
}

function clearAllInputs() {
  let inputs = document.querySelectorAll(".input")
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = ""
    inputs[i].setAttribute("style", "outline-color:revert;border:revert;")
  }
}

function hideError(element) {
  element.setAttribute("style", "outline-color:revert;border:revert;")
  let errorElementId = "#" + element.id + "-error"
  let errorElement = document.querySelector(errorElementId)
  errorElement.setAttribute("style", "display:none;")
  if (element.id == "media-regular-exame") {
    const errorTip = document.querySelector("#media-regular-exame-error-tip")
    errorTip.setAttribute("style", "display:none;")
  }

  if (element.id == "simula-media-exame") {
    const errorTip = document.querySelector("#media-exame-error-tip-simulador")
    errorTip.setAttribute("style", "display:none;")
  }
}

function hideAllErrors() {
  let errorElements = document.querySelectorAll(".input-error")
  for (let i = 0; i < errorElements.length; i++) {
    errorElements[i].setAttribute(
      "style",
      "outline-color:red;border: 2px solid red;"
    )
  }
}

function showError(element) {
  element.value = ""
  element.setAttribute("style", "outline-color:red;border: 2px solid red;")
  element.focus()
  let errorElementId = "#" + element.id + "-error"
  let errorElement = document.querySelector(errorElementId)
  errorElement.setAttribute("style", "display:block;")
}

function validaNumero(element) {
  inputValue = element.value
  if (
    inputValue === "" ||
    inputValue.includes("e") ||
    inputValue.includes("+") ||
    inputValue.includes("-")
  ) {
    showError(element)
    return false
  }
  return true
}

function decimalValidation(element) {
  hideError(element)
  if (element.value.trim() !== "") {
    if (element.value[0] == "," || element.value[0] == ".") {
      element.value = "0" + element.value
    }

    var regex = /^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[0-9]\d*)$/gm
    if (!regex.test(element.value)) {
      showError(element)
      return false
    }

    // Só chega aqui número >= 0
    let inputFloat = parseFloat(element.value).toFixed(2)
    if (
      element.name == "media-regular-exame" ||
      element.name == "simula-media-exame"
    ) {
      // Cálculo de média final de exame
      if (inputFloat >= 5) {
        showError(element)
        const errorTip =
          element.name == "media-regular-exame"
            ? document.querySelector("#media-regular-exame-error-tip")
            : document.querySelector("#media-exame-error-tip-simulador")
        errorTip.setAttribute("style", "display:inline;")
        return false
      }
    } else {
      if (inputFloat > 10) {
        showError(element)
        return false
      }
    }
    element.value = parseFloat(element.value).toFixed(2)
    return true
  }
}

function exibeJanela(janela) {
  switch (janela) {
    case "inicio":
      document.querySelector("#back").setAttribute("style", "display:none;")
      document
        .querySelector("#media-regular")
        .setAttribute("style", "display:none;")
      document
        .querySelector("#media-exame")
        .setAttribute("style", "display:none;")
      document
        .querySelector("#resultado")
        .setAttribute("style", "display:none;")
      document
        .querySelector("#simula-regular")
        .setAttribute("style", "display:none;")
      document
        .querySelector("#simula-exame")
        .setAttribute("style", "display:none;")
      document
        .querySelector("#simula-regular-resultado-div")
        .setAttribute("style", "display:none;")
      document
        .querySelector("#simula-exame-resultado-div")
        .setAttribute("style", "display:none;")
      exibeJanela("semanais-esconde")
      exibeJanela("semanais-esconde-simulador")
      document
        .querySelector("#inicio")
        .setAttribute("style", "display:initial;")
      hideAllErrors()
      clearAllInputs()
      break
    case "exame":
      document.querySelector("#back").setAttribute("style", "display:inline;")
      document.querySelector("#inicio").setAttribute("style", "display:none;")
      document
        .querySelector("#media-exame")
        .setAttribute("style", "display:block;")
      break
    case "regular":
      document.querySelector("#back").setAttribute("style", "display:inline;")
      document.querySelector("#inicio").setAttribute("style", "display:none;")
      document
        .querySelector("#media-regular")
        .setAttribute("style", "display:block;")
      break
    case "semanais-exibe":
      document
        .querySelector("#media-avaliativas-semanais")
        .setAttribute("style", "display:none;")
      document
        .querySelector("#media-avaliativas-semanais-error")
        .setAttribute("style", "display:none;")
      document
        .querySelector("#inserir-individualmente")
        .setAttribute("style", "display:none;")
      document
        .querySelector("#exibir-notas-individuais")
        .setAttribute("style", "display:block;")
      document.querySelector("#avaliativas-texto").innerHTML =
        "Insira individualmente a nota de cada <b>avaliativa semanal</b>"
      break
    case "semanais-esconde":
      document
        .querySelector("#media-avaliativas-semanais")
        .setAttribute("style", "display:inline;")
      document
        .querySelector("#inserir-individualmente")
        .setAttribute("style", "display:block;")
      document
        .querySelector("#exibir-notas-individuais")
        .setAttribute("style", "display:none;")
      document.querySelector("#avaliativas-texto").innerHTML =
        "Insira sua média final das <strong>avaliativas semanais</strong>"
      break
    case "resultado":
      document.querySelector("#inicio").setAttribute("style", "display:none;")
      document
        .querySelector("#media-regular")
        .setAttribute("style", "display:none;")
      document
        .querySelector("#media-exame")
        .setAttribute("style", "display:none;")
      document
        .querySelector("#resultado")
        .setAttribute("style", "display:block;")
      break
    case "simula-regular":
      document.querySelector("#back").setAttribute("style", "display:inline;")
      document.querySelector("#inicio").setAttribute("style", "display:none;")
      document
        .querySelector("#simula-regular")
        .setAttribute("style", "display:block;")
      break
    case "semanais-exibe-simulador":
      document
        .querySelector("#media-avaliativas-semanais-simulador")
        .setAttribute("style", "display:none;")
      document
        .querySelector("#media-avaliativas-semanais-simulador-error")
        .setAttribute("style", "display:none;")
      document
        .querySelector("#inserir-individualmente-simulador")
        .setAttribute("style", "display:none;")
      document
        .querySelector("#simula-regular-resultado-div")
        .setAttribute("style", "display:none;")
      document
        .querySelector("#exibir-notas-individuais-simulador")
        .setAttribute("style", "display:block;")
      document.querySelector("#avaliativas-texto-simulador").innerHTML =
        "Insira individualmente a nota de cada <b>avaliativa semanal</b>"
      break
    case "semanais-esconde-simulador":
      document
        .querySelector("#media-avaliativas-semanais-simulador")
        .setAttribute("style", "display:inline;")
      document
        .querySelector("#inserir-individualmente-simulador")
        .setAttribute("style", "display:block;")
      document
        .querySelector("#exibir-notas-individuais-simulador")
        .setAttribute("style", "display:none;")
      document
        .querySelector("#simula-regular-resultado-div")
        .setAttribute("style", "display:none;")
      document.querySelector("#avaliativas-texto-simulador").innerHTML =
        "Insira sua média final das <strong>avaliativas semanais</strong>"
      break
    case "simula-exame":
      document.querySelector("#back").setAttribute("style", "display:inline;")
      document.querySelector("#inicio").setAttribute("style", "display:none;")
      document
        .querySelector("#simula-exame")
        .setAttribute("style", "display:block;")
  }
}

function calculaRegular() {
  let notasIndividuais = document
    .querySelector("#exibir-notas-individuais")
    .getAttribute("style", "display")
  const notaProvaEl = document.querySelector("#nota-prova-regular")
  prova.regular = parseFloat(notaProvaEl.value)

  if (validaNumero(notaProvaEl)) {
    if (notasIndividuais == "display:block;") {
      /* Calcular a nota de cada semana
            antes de calcular a média final */
      let semana1El = document.querySelector("#avaliativa-semana1")
      let semana2El = document.querySelector("#avaliativa-semana2")
      let semana3El = document.querySelector("#avaliativa-semana3")
      let semana4El = document.querySelector("#avaliativa-semana4")
      let semana5El = document.querySelector("#avaliativa-semana5")
      let semana6El = document.querySelector("#avaliativa-semana6")
      let semana7El = document.querySelector("#avaliativa-semana7")
      if (
        validaNumero(semana1El) &&
        validaNumero(semana2El) &&
        validaNumero(semana3El) &&
        validaNumero(semana4El) &&
        validaNumero(semana5El) &&
        validaNumero(semana6El) &&
        validaNumero(semana7El)
      ) {
        avaliativas[1] = parseFloat(semana1El.value)
        avaliativas[2] = parseFloat(semana2El.value)
        avaliativas[3] = parseFloat(semana3El.value)
        avaliativas[4] = parseFloat(semana4El.value)
        avaliativas[5] = parseFloat(semana5El.value)
        avaliativas[6] = parseFloat(semana6El.value)
        avaliativas[7] = parseFloat(semana7El.value)
        calcularAvaliativasSemanais()
        resultado("regular", calcularMediaFinalRegular())
      }
    } else {
      let mediaSemanaEl = document.querySelector("#media-avaliativas-semanais")
      if (validaNumero(mediaSemanaEl)) {
        media.avaliativas = parseFloat(mediaSemanaEl.value)
        resultado("regular", calcularMediaFinalRegular())
      }
    }
  }
}

function calculaExame() {
  let mediaRegularExameEl = document.querySelector("#media-regular-exame")
  media.regular = parseFloat(mediaRegularExameEl.value)

  let provaExameEl = document.querySelector("#nota-prova-exame")
  prova.exame = parseFloat(provaExameEl.value)

  if (validaNumero(mediaRegularExameEl) && validaNumero(provaExameEl)) {
    resultado("exame", calcularMediaFinalExame())
  }
}

function resultado(tipo, nota) {
  exibeJanela("resultado")
  let consequencia = tipo == "regular" ? "exame" : "DP"
  const resultadoTexto = document.querySelector("#resultado-txt")
  const resultadoNota = document.querySelector("#resultado-nota")
  const resultadoDesc = document.querySelector("#resultado-desc")

  let mediaFinal
  if (nota >= 4.5 && nota < pesos.mediaFinal) {
    mediaFinal = nota.toFixed(2)
  } else {
    mediaFinal = nota.toFixed(1)
  }

  resultadoNota.textContent = "Média final: " + mediaFinal.replace(".", ",")

  if (mediaFinal >= pesos.mediaFinal) {
    resultadoTexto.textContent = "Parabéns!!!"
    resultadoNota.setAttribute("style", "color:green;text-shadow:initial;")
    resultadoDesc.textContent = "Você foi aprovado(a)!"
  } else if (mediaFinal >= pesos.mediaFinal - 0.05) {
    resultadoTexto.textContent = "Na trave!!!"
    resultadoNota.setAttribute(
      "style",
      "color:yellow;text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;"
    )
    resultadoDesc.textContent =
      "Você não atingiu a média, mas é possível que sua nota seja arredondada para 5! Para mais informações, consulte o Manual do Aluno ou seu orientador de Polo."
  } else {
    resultadoTexto.textContent = "Que pena ..."
    resultadoNota.setAttribute("style", "color:red;text-shadow:initial;")
    resultadoDesc.textContent = "Você ficou de " + consequencia + "."
    if (consequencia == "exame") {
      media.regular = nota
      const notaExame = simularExame()
      const spanBold = document.createElement("strong")
      spanBold.textContent = notaExame.replace(".", ",")
      resultadoDesc.append(
        document.createElement("br"),
        document.createElement("br"),
        `E precisará tirar `,
        spanBold,
        " na prova de exame para ser aprovado(a)."
      )
    }
  }
}

function simulacaoRegular(element) {
  if (decimalValidation(element) && validaNumero(element)) {
    let simulaRegularResultado = document.querySelector(
      "#simula-regular-resultado"
    )
    document
      .querySelector("#simula-regular-resultado-div")
      .setAttribute("style", "display:none;") // Esconde o campo de resultado
    if (element.id == "media-avaliativas-semanais-simulador") {
      //  Aqui o usuario inseriu a média final das avaliativas
      media.avaliativas = parseFloat(element.value)
      simularRegular()
      document
        .querySelector("#simula-regular-resultado-div")
        .setAttribute("style", "display:block;") // Exibe o campo de resultado
      simulaRegularResultado.textContent = simulacao.regular.replace(".", ",")
    } else {
      let semana1El = document.querySelector("#avaliativa-semana1-simulador")
      let semana2El = document.querySelector("#avaliativa-semana2-simulador")
      let semana3El = document.querySelector("#avaliativa-semana3-simulador")
      let semana4El = document.querySelector("#avaliativa-semana4-simulador")
      let semana5El = document.querySelector("#avaliativa-semana5-simulador")
      let semana6El = document.querySelector("#avaliativa-semana6-simulador")
      let semana7El = document.querySelector("#avaliativa-semana7-simulador")
      if (
        semana1El.value &&
        validaNumero(semana1El) &&
        semana2El.value &&
        validaNumero(semana2El) &&
        semana3El.value &&
        validaNumero(semana3El) &&
        semana4El.value &&
        validaNumero(semana4El) &&
        semana5El.value &&
        validaNumero(semana5El) &&
        semana6El.value &&
        validaNumero(semana6El) &&
        semana7El.value &&
        validaNumero(semana7El)
      ) {
        avaliativas[1] = parseFloat(semana1El.value)
        avaliativas[2] = parseFloat(semana2El.value)
        avaliativas[3] = parseFloat(semana3El.value)
        avaliativas[4] = parseFloat(semana4El.value)
        avaliativas[5] = parseFloat(semana5El.value)
        avaliativas[6] = parseFloat(semana6El.value)
        avaliativas[7] = parseFloat(semana7El.value)
        calcularAvaliativasSemanais()
        simularRegular()
        document
          .querySelector("#simula-regular-resultado-div")
          .setAttribute("style", "display:block;") // Exibe o campo de resultado
        simulaRegularResultado.textContent = simulacao.regular.replace(".", ",")
      }
    }
  }
}

function simulacaoExame(element) {
  if (decimalValidation(element) && validaNumero(element)) {
    let simulaExameResultado = document.querySelector("#simula-exame-resultado")
    media.regular = parseFloat(element.value)
    simularExame()
    document
      .querySelector("#simula-exame-resultado-div")
      .setAttribute("style", "display:block;") // Exibe o campo de resultado
    simulaExameResultado.textContent = simulacao.exame.replace(".", ",")
  }
}
