/* Limita a quantidade de caracteres no input de numbers */
const html = document.documentElement

function clearInput(element) {
    element.value = ""
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

function decimalValidation(element) {  
    hideError(element)
    if (element.value.trim() !== ""){
        var regex = /^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[0-9]\d*)$/gm
        if (!(regex.test(element.value))) {
            showError(element)
        }
    
        if (element.value[0] == "," || element.value[0] == "."){
            element.value = "0" + element.value
        }
    
        let inputFloat = parseFloat(element.value).toFixed(2)
        if (element.name == "media-final-exame") { // Calculo de média final de exame
            if (inputFloat < 0 || inputFloat >= 5) {
                showError(element)
            }
        }else{
            if (inputFloat < 0 || inputFloat > 10) {
                showError(element)
            }
        }
        element.value = parseFloat(element.value).toFixed(2)
    }
}


function exibeJanela(janela) {
    switch (janela) {
        case "inicio":
            document.querySelector("ion-icon").setAttribute("style", "display:none;")
            document.querySelector("#media-regular").setAttribute("style", "display:none;")
            document.querySelector("#media-exame").setAttribute("style", "display:none;")
            let medias = document.querySelectorAll(".input")
            for (let i = 0; i < medias.length; i++) {
                medias[i].value = ""
            }
            document.querySelector("#resultado").setAttribute("style", "display:none;")
            exibeJanela('semanais-esconde')
            document.querySelector("#inicio").setAttribute("style", "display:initial;")
            break
        case "exame":
            document.querySelector("ion-icon").setAttribute("style", "display:block;")
            document.querySelector("#inicio").setAttribute("style", "display:none;")
            document.querySelector("#media-exame").setAttribute("style", "display:block;")
            break
        case "regular":
            document.querySelector("ion-icon").setAttribute("style", "display:block;")
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
    let notasIndividuais = document.querySelector("#exibir-notas-individuais").getAttribute("style", "display")
    let notaAvaliativas
    if (notasIndividuais == 'display:block;') {
        /* Calcular a nota de cada semana
        antes de calcular a média final */
        let semana1 = parseFloat(document.querySelector("#avaliativa-semana1").value)
        let semana2 = parseFloat(document.querySelector("#avaliativa-semana2").value)
        let semana3 = parseFloat(document.querySelector("#avaliativa-semana3").value)
        let semana4 = parseFloat(document.querySelector("#avaliativa-semana4").value)
        let semana5 = parseFloat(document.querySelector("#avaliativa-semana5").value)
        let semana6 = parseFloat(document.querySelector("#avaliativa-semana6").value)
        let semana7 = parseFloat(document.querySelector("#avaliativa-semana7").value)
        notaAvaliativas = (semana1*0.08) + (semana2*0.12) + (semana3*0.17) + (semana4*0.17) + (semana5*0.17) + (semana6*0.17) + (semana7*0.12)
    }else{
        notaAvaliativas = parseFloat(document.querySelector("#media-avaliativas-semanais").value)
    }
    let notaProva = parseFloat(document.querySelector("#nota-prova-regular").value)
    let mediaFinal = (notaProva * 0.6) + (notaAvaliativas * 0.4)
    resultado("regular", mediaFinal)
}

function calculaExame() {
    let mediaFinalExame = parseFloat(document.querySelector("#media-final-exame").value)
    let provaExame = parseFloat(document.querySelector("#nota-prova-exame").value)
    let mediaFinal = (mediaFinalExame + provaExame) / 2
    resultado("exame", mediaFinal)
}

function resultado(tipo, nota) {
    exibeJanela("resultado")
    let consequencia = (tipo == "regular") ? "exame" : "DP"
    const resultadoTexto = document.querySelector("#resultado-txt")
    const resultadoNota = document.querySelector("#resultado-nota")
    const resultadoDesc = document.querySelector("#resultado-desc")

    resultadoNota.textContent = "Média final: " + parseFloat(nota.toFixed(1))
    if (nota >= 5) {
        resultadoTexto.textContent = "Parabéns!!!"
        resultadoNota.setAttribute("style", "color:green;")
        resultadoDesc.textContent = "Você foi aprovado(a)!"
    }else{
        resultadoTexto.textContent = "Que pena ..."
        resultadoNota.setAttribute("style", "color:red;")
        resultadoDesc.textContent = "Você ficou de "+ consequencia +"."
    }

}