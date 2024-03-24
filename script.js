function carregarTarefas() {
    var tarefas = localStorage.getItem('tarefas');
    if (tarefas) {
        tarefas = JSON.parse(tarefas);
        tarefas.forEach(function (tarefa) {
            adicionarTarefaArmazenada(tarefa);
        });
    }
}

function inicializar() {
    document.getElementById('botaoAdicionar').addEventListener('click', function () {
        var novaTarefaInput = document.getElementById('novaTarefa').value.trim();
        if (novaTarefaInput !== '') {
            adicionarTarefaNaLista(novaTarefaInput);
            document.getElementById('novaTarefa').value = '';
        } else {
            alert('Por favor, adicione uma tarefa válida.');
        }
    });
    document.getElementById('novaTarefa').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            var novaTarefaInput = document.getElementById('novaTarefa').value.trim();
            if (novaTarefaInput !== '') {
                adicionarTarefaNaLista(novaTarefaInput);
                document.getElementById('novaTarefa').value = '';
            } else {
                alert('Por favor, adicione uma tarefa válida.');
            }
        }
    });
}

window.onload = inicializar;

function criarBotao(texto, onClickHandler) {
    var botao = document.createElement('button');
    botao.innerText = texto;
    botao.addEventListener('click', onClickHandler);
    return botao;
}

function adicionarTarefaNaLista(tarefaTexto) {
    var lista = document.getElementById('listaTarefas');
    var item = document.createElement('li');
    item.innerHTML = '<span>' + tarefaTexto + '</span>';

    var botaoConcluir = criarBotao('Concluir', function () {
        item.classList.toggle('tarefa-concluida');
        salvarTarefas();
    });

    var botaoEditar = criarBotao('Editar', function () {
        editarTarefa(item);
    });

    var botaoRemover = criarBotao('Remover', function () {
        removerTarefaDaLista(item);
    });

    item.appendChild(botaoConcluir);
    item.appendChild(botaoEditar);
    item.appendChild(botaoRemover);
    lista.appendChild(item);
}

function removerTarefaDaLista(item) {
    var lista = document.getElementById('listaTarefas');
    lista.removeChild(item);
    salvarTarefas();
}

function salvarTarefas() {
    // Lógica para salvar as tarefas (pode ser armazenamento local, banco de dados, etc.)
}

function editarTarefa(item) {
    var spanTarefa = item.querySelector('span');
    var textoAtual = spanTarefa.innerText;
    var novoTexto = prompt('Editar tarefa:', textoAtual);
    
    if (novoTexto !== null && novoTexto.trim() !== '') {
        spanTarefa.innerText = novoTexto.trim();
        salvarTarefas();
    }
}

function adicionarTarefaArmazenada(tarefa) {
    var lista = document.getElementById('listaTarefas');
    var item = document.createElement('li');

    // Criamos um elemento span para o texto da tarefa
    var textoTarefaSpan = document.createElement('span');
    textoTarefaSpan.innerText = tarefa.texto;

    // Adicionamos a classe 'tarefa-concluida' se a tarefa estiver concluída
    if (tarefa.concluida) {
        textoTarefaSpan.classList.add('tarefa-concluida');
    }

    // Adicionamos o texto da tarefa ao item
    item.appendChild(textoTarefaSpan);

    // Criamos os botões de função
    var botaoConcluir = criarBotao('Concluir', function () {
        textoTarefaSpan.classList.toggle('tarefa-concluida');
        salvarTarefas();
    });

    var botaoEditar = criarBotao('Editar', function () {
        editarTarefa(item);
    });

    var botaoRemover = criarBotao('Remover', function () {
        lista.removeChild(item);
        salvarTarefas();
    });

    // Adicionamos os botões ao item
    item.appendChild(botaoConcluir);
    item.appendChild(botaoEditar);
    item.appendChild(botaoRemover);

    // Adicionamos o item à lista
    lista.appendChild(item);
}
