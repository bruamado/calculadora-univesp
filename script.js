function clearInput(element) {
    element.value = ""
}

function hideAllErrors() {
    let errorElements = document.querySelectorAll(".input-error")
    for (let i = 0; i < errorElements.length; i++) {
        errorElements[i].setAttribute("style", "outline-color:red;border: 2px solid red;")
    }
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
    let errorElementId = "#"+element.id+"-error"
    let errorElement = document.querySelector(errorElementId)
    errorElement.setAttribute("style", "display:none;")
}

function showError(element) {
    element.value = ""
    element.setAttribute("style", "outline-color:red;border: 2px solid red;")
    element.focus()
    let errorElementId = "#"+element.id+"-error"
    let errorElement = document.querySelector(errorElementId)
    errorElement.setAttribute("style", "display:block;")
}

function validaNumero(element) {
    inputValue = element.value
    if (inputValue === "" || inputValue.includes("e") || inputValue.includes("+") || inputValue.includes("-")) {
        showError(element)
        return false
    }
    return true
}

function decimalValidation(element) {  
    hideError(element)
    if (element.value.trim() !== ""){
        if (element.value[0] == "," || element.value[0] == "."){
            element.value = "0" + element.value
        }

        var regex = /^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[0-9]\d*)$/gm
        if (!(regex.test(element.value))) {
            showError(element)
            return
        }
        
        
        let inputFloat = parseFloat(element.value).toFixed(2)
        if (element.name == "media-final-exame") { // Calculo de média final de exame
            if (inputFloat < 0 || inputFloat >= 5) {
                showError(element)
                return
            }
        }else{
            if (inputFloat < 0 || inputFloat > 10) {
                showError(element)
                return
            }
        }
        element.value = parseFloat(element.value).toFixed(2)
    }
}


function exibeJanela(janela) {
    switch (janela) {
        case "inicio":
            document.querySelector("#back").setAttribute("style", "display:none;")
            document.querySelector("#media-regular").setAttribute("style", "display:none;")
            document.querySelector("#media-exame").setAttribute("style", "display:none;")
            document.querySelector("#resultado").setAttribute("style", "display:none;")
            exibeJanela('semanais-esconde')
            document.querySelector("#inicio").setAttribute("style", "display:initial;")
            hideAllErrors()
            clearAllInputs()
            break
        case "exame":
            document.querySelector("#back").setAttribute("style", "display:inline;")
            document.querySelector("#inicio").setAttribute("style", "display:none;")
            document.querySelector("#media-exame").setAttribute("style", "display:block;")
            break
        case "regular":
            document.querySelector("#back").setAttribute("style", "display:inline;")
            document.querySelector("#inicio").setAttribute("style", "display:none;")
            document.querySelector("#media-regular").setAttribute("style", "display:block;")
            break
        case "resultado":
            document.querySelector("#inicio").setAttribute("style", "display:none;")
            document.querySelector("#media-regular").setAttribute("style", "display:none;")
            document.querySelector("#media-exame").setAttribute("style", "display:none;")
            document.querySelector("#resultado").setAttribute("style", "display:block;")
            break
        case "semanais-exibe":
            document.querySelector("#media-avaliativas-semanais").setAttribute("style", "display:none;")
            document.querySelector("#media-avaliativas-semanais-error").setAttribute("style", "display:none;")
            document.querySelector("#inserir-individualmente").setAttribute("style", "display:none;")
            document.querySelector("#exibir-notas-individuais").setAttribute("style", "display:block;")
            document.querySelector("#avaliativas-texto").innerHTML = "Insira individualmente a nota de cada <b>avaliativa semanal</b>"

            break
        case "semanais-esconde":
            document.querySelector("#media-avaliativas-semanais").setAttribute("style", "display:inline;")
            document.querySelector("#inserir-individualmente").setAttribute("style", "display:block;")
            document.querySelector("#exibir-notas-individuais").setAttribute("style", "display:none;")
            document.querySelector("#avaliativas-texto").innerHTML = "Insira sua média final das <strong>avaliativas semanais</strong>"
    }
}

function calculaRegular() {
    let notaAvaliativas
    let notasIndividuais = document.querySelector("#exibir-notas-individuais").getAttribute("style", "display")
    const notaProvaEl = document.querySelector("#nota-prova-regular")
    let notaProva = parseFloat(notaProvaEl.value)

    if (validaNumero(notaProvaEl)){
        if (notasIndividuais == 'display:block;') {
            /* Calcular a nota de cada semana
            antes de calcular a média final */
            let semana1El = document.querySelector("#avaliativa-semana1")
            let semana1 = document.querySelector("#avaliativa-semana1").value
            let semana2El = document.querySelector("#avaliativa-semana2")
            let semana2 = document.querySelector("#avaliativa-semana2").value
            let semana3El = document.querySelector("#avaliativa-semana3")
            let semana3 = document.querySelector("#avaliativa-semana3").value
            let semana4El = document.querySelector("#avaliativa-semana4")
            let semana4 = document.querySelector("#avaliativa-semana4").value
            let semana5El = document.querySelector("#avaliativa-semana5")
            let semana5 = document.querySelector("#avaliativa-semana5").value
            let semana6El = document.querySelector("#avaliativa-semana6")
            let semana6 = document.querySelector("#avaliativa-semana6").value
            let semana7El = document.querySelector("#avaliativa-semana7")
            let semana7 = document.querySelector("#avaliativa-semana7").value
            if (validaNumero(semana1El) && validaNumero(semana2El) && validaNumero(semana3El) && validaNumero(semana4El) && validaNumero(semana5El) && validaNumero(semana6El) && validaNumero(semana7El)) {
                semana1 = parseFloat(semana1)
                semana2 = parseFloat(semana2)
                semana3 = parseFloat(semana3)
                semana4 = parseFloat(semana4)
                semana5 = parseFloat(semana5)
                semana6 = parseFloat(semana6)
                semana7 = parseFloat(semana7)
                notaAvaliativas = (semana1*0.08) + (semana2*0.12) + (semana3*0.17) + (semana4*0.17) + (semana5*0.17) + (semana6*0.17) + (semana7*0.12)
                let mediaFinal = (notaProva * 0.6) + (notaAvaliativas * 0.4)
                resultado("regular", mediaFinal)
            }
        }else{
            let mediaSemanaEl = document.querySelector("#media-avaliativas-semanais")
            let mediaSemana = mediaSemanaEl.value        
            if (validaNumero(mediaSemanaEl)) {
                notaAvaliativas = parseFloat(mediaSemana)
                let mediaFinal = (notaProva * 0.6) + (notaAvaliativas * 0.4)
                resultado("regular", mediaFinal)
            }
        }
    }
}

function calculaExame() {
    let mediaFinalExameEl = document.querySelector("#media-final-exame")
    let mediaFinalExame = parseFloat(mediaFinalExameEl.value)

    let provaExameEl = document.querySelector("#nota-prova-exame")
    let provaExame = parseFloat(provaExameEl.value)

    if (validaNumero(mediaFinalExameEl) && validaNumero(provaExameEl)) {
        let mediaFinal = (mediaFinalExame + provaExame) / 2
        resultado("exame", mediaFinal)
    }
}

function resultado(tipo, nota) {
    exibeJanela("resultado")
    let consequencia = (tipo == "regular") ? "exame" : "DP"
    const resultadoTexto = document.querySelector("#resultado-txt")
    const resultadoNota = document.querySelector("#resultado-nota")
    const resultadoDesc = document.querySelector("#resultado-desc")
    
    let mediaFinal
    if (nota >= 4.5 && nota < 5) {
        mediaFinal = nota.toFixed(2)
    } else {
        mediaFinal = nota.toFixed(1)
    }

    resultadoNota.textContent = "Média final: " + mediaFinal.replace(".", ",")

    if (nota >= 5.0) {
        resultadoTexto.textContent = "Parabéns!!!"
        resultadoNota.setAttribute("style", "color:green;text-shadow:initial;")
        resultadoDesc.textContent = "Você foi aprovado(a)!"
    }else if (nota >= 4.95) {
        resultadoTexto.textContent = "Na trave!!!"
        resultadoNota.setAttribute("style", "color:yellow;text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;")
        resultadoDesc.textContent = "Você não atingiu a média, mas é possível que sua nota seja arredondada para 5! Para mais informações, consulte o Manual do Aluno ou seu orientador de Polo."
    }else{
        resultadoTexto.textContent = "Que pena ..."
        resultadoNota.setAttribute("style", "color:red;text-shadow:initial;")
        resultadoDesc.textContent = "Você ficou de "+ consequencia +"."
    }

}