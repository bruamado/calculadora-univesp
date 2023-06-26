/* Limita a quantidade de caracteres no input de numbers */
const html = document.documentElement

function limitLength(element) {
    if (element.value.length > element.maxLength) element.value = element.value.slice(0, element.maxLength)
}

function exibeJanela(janela) {
    switch (janela) {
        case "inicio":
            document.querySelector("ion-icon").setAttribute("style", "display:none;")
            document.querySelector("#media-regular").setAttribute("style", "display:none;")
            let medias = document.querySelectorAll("#media-regular input")
            for (let i = 0; i < medias.length; i++) {
                medias[i].value = ""
            }
            document.querySelector("#resultado").setAttribute("style", "display:none;")
            exibeJanela('semanais-esconde')
            document.querySelector("#inicio").setAttribute("style", "display:initial;")
            break
        case "exame":
            alert("Em construção...")
            break
        case "regular":
            document.querySelector("ion-icon").setAttribute("style", "display:block;")
            document.querySelector("#inicio").setAttribute("style", "display:none;")
            document.querySelector("#media-regular").setAttribute("style", "display:block;")
            break
        case "resultado":
            document.querySelector("#inicio").setAttribute("style", "display:none;")
            document.querySelector("#media-regular").setAttribute("style", "display:none;")
            /* document.querySelector("#media-exame").setAttribute("style", "display:none;") */
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
        let semana1 = document.querySelector("#avaliativa-semana1").value
        let semana2 = document.querySelector("#avaliativa-semana2").value
        let semana3 = document.querySelector("#avaliativa-semana3").value
        let semana4 = document.querySelector("#avaliativa-semana4").value
        let semana5 = document.querySelector("#avaliativa-semana5").value
        let semana6 = document.querySelector("#avaliativa-semana6").value
        let semana7 = document.querySelector("#avaliativa-semana7").value
        notaAvaliativas = (semana1*0.08) + (semana2*0.12) + (semana3*0.17) + (semana4*0.17) + (semana5*0.17) + (semana6*0.17) + (semana7*0.12)
    }else{
        notaAvaliativas = document.querySelector("#media-avaliativas-semanais").value
    }
    let notaProva = document.querySelector("#nota-prova").value
    let mediaFinal = (notaProva * 0.6) + (notaAvaliativas * 0.4)
    resultado(mediaFinal)
}

function resultado(nota) {
    exibeJanela("resultado")
    const resultadoTexto = document.querySelector("#resultado-txt")
    const resultadoNota = document.querySelector("#resultado-nota")
    const resultadoDesc = document.querySelector("#resultado-desc")
    if (nota >= 5) {
        resultadoTexto.textContent = "Parabéns!!!"
        resultadoNota.textContent = "Média final: " + nota
        resultadoNota.setAttribute("style", "color:green;")
        resultadoDesc.textContent = "Você foi aprovado(a)!"
    }else{
        resultadoTexto.textContent = "Que pena ..."
        resultadoNota.textContent = "Média final: " + nota
        resultadoNota.setAttribute("style", "color:red;")
        resultadoDesc.textContent = "Você ficou de exame."
    }

}