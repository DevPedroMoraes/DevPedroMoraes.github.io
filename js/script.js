const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-task')

let minhaListaDeItens = []

input.addEventListener('input', function() {
    if (input.value.trim() !== '') {
        // O campo de entrada contém um valor, habilite o botão
        button.disabled = false;
        

    } else {
        // O campo de entrada está vazio, desabilite o botão
        button.disabled = true;
        
    }
});



function adicionarNovaTarefa(){ 
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false

    })
    
    input.value = ''
    location.reload();
    mostrarTarefas()
}

function mostrarTarefas(){
    let novaLi = ''

    minhaListaDeItens.forEach(  (item, index) => {
       
        novaLi =  novaLi +`
        
            <li class="task ${item.concluida && "done"}">
                <img  src="/img/checked.png" alt="" onclick="concluirTarefa(${index})">
                <p>${item.tarefa}</p>
                <img src="/img/trash.png" alt="deletar" onclick="deletarItem(${index})">
            </li>  
        
        
        
        `

    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))

}

function recarregarTarefas(){
    
    const tarefasDoLocalStorage = localStorage.getItem('lista',(minhaListaDeItens))
    
    if(tarefasDoLocalStorage) {

   
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }
    
    mostrarTarefas()


}
function concluirTarefa(index) {
    minhaListaDeItens[index].concluida = !minhaListaDeItens[index].concluida
    mostrarTarefas()

}

function deletarItem(index){
    minhaListaDeItens.splice(index, 1)
    mostrarTarefas()

}

recarregarTarefas()

button.addEventListener('click', adicionarNovaTarefa)

