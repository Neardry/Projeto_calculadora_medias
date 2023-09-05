const form = document.getElementById('form-atividade');
let linhas = '';  //precisa estar no global para nunca ser resetada a cada vez que o botão for pressionando
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji Celebrando"';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado"';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt('Digite a nota mínima: '));

form.addEventListener('submit', function(e){
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if(atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade ${inputNomeAtividade.value} já foi adicionada.`);
    } else {
            atividades.push(inputNomeAtividade.value);
            notas.push(parseFloat(inputNotaAtividade.value)); //Adiciona ao array criado lá encima para guardar os valores e depois conseguir fazer a média
        
            let linha = '<tr>';
            linha += `<td>${inputNomeAtividade.value}</td>`;
            linha += `<td>${inputNotaAtividade.value}</td>`;
            linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`
            linha += `</tr>`;
        
            linhas += linha;
            inputNomeAtividade.value = '';
            inputNotaAtividade.value = '';
    }


}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;   //innerHTML substitui o elemento do HTML
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();
    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];   //Para pegar cada uma das notas no array e fazer a soma por conta do += 
    }

    return somaDasNotas / notas.length;   //O return fará a média das somas
}