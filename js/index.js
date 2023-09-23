const formulario = document.querySelector("#formulario");
const inputFormulario = document.querySelector("#input-formulario");
const botaoAdicionar = document.querySelector("#botao-adicionar");
const lista = document.querySelector("#lista-ul");
let tarefas = []; //array de todas as tarefas

//função de criar novas tarefas
function renderTaskOnHTML(tituloDaTarefa, done = false){
  const li = document.createElement("li"); //criando a tag Li

  const input = document.createElement("input"); //criando o checkbox
  input.setAttribute("type", "checkbox"); //definindo o tipo para checkbox
  input.addEventListener("change", (evento) => {
    //evento de selecionando tarefa feita
    const liToToggle = evento.target.parentElement; //pegando a li toda
    const spanToToggle = liToToggle.querySelector("span"); //pegando a tag span dentro da li
    const done = evento.target.checked; //caixa = true : false
    if (done) {
      //definindo o estilo para a span acionada se a caixa está marcada
      spanToToggle.style.textDecoration = "line-through"; //adicionando estilo na span
    } else {
      spanToToggle.style.textDecoration = "none"; //removendo estilo da span
    }
    tarefas = tarefas.map((t) => {
      //modificando o array
      if (t.titulo === spanToToggle.textContent) {
        //percorrendo o array
        return {//retornando o mesmo objeto com o done invertido (checkbox)
          //
          titulo: t.titulo,
          done: !t.done,
        };
      }
      return t;
    });
    localStorage.setItem('tarefas',JSON.stringify(tarefas))//salvando
  });
  input.checked = done //definindo o parametro done

  const span = document.createElement("span"); //criando o span
  span.textContent = tituloDaTarefa; //definindo que o conteudo vai ficar dentro do span
  if (done){
    span.style.textDecoration = "line-through";//se já tiver marcada quando carregar, irá riscar
  }

  const button = document.createElement("button"); //criando o botão remover
  button.textContent = "Remover"; //definindo texto remover para o botão (modificar)
  button.addEventListener("click", (evento) => {
    //evento de click do botão
    const liToRemove = evento.target.parentElement; //transformando em variavel o li inteiro
    const titleToRemove = liToRemove.querySelector("span").textContent; //pegando o nome da tarefa
    tarefas = tarefas.filter((t) => t.titulo !== titleToRemove); //varendo o array (titulo é o titulo do objeto) e verificando se algum titulo é igual ao que precisa ser removido

    lista.removeChild(liToRemove); //removendo o li inteiro, pegando o elemento pai do botão usando o evento e removendo ele
    localStorage.setItem('tarefas',JSON.stringify(tarefas))//salvando
  });

  //colocando todas as funcionalidades dentro do li
  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  lista.appendChild(li); //aqui estou pegando a tag Li com o conteudo e jogando dentro do HTML
}

window.onload = () =>{//carregando banco de dados
  const tarefasBancoDeDados = localStorage.getItem('tarefas') //buscando tarefas no banco de dados
  if (!tarefasBancoDeDados) return //se não tiver tarefas ele retorna
  tarefas = JSON.parse(tarefasBancoDeDados) //se tiver ele pega o JSON e coverte pra objetos
  tarefas.forEach(t => {
    renderTaskOnHTML(t.titulo,t.done)
  });
}

formulario.addEventListener("submit", (evento) => {
  //evento de submit
  evento.preventDefault(); //evita que a pagina recarregue por padrão
  const tituloDaTarefa = inputFormulario.value;
  if (tituloDaTarefa.length < 3) {
    alert("Sua tarefa precisa ter pelo menos 3 caracteres");
    return; //serve para sair da função
  }
  tarefas.push({//adiciona a nova tarefa ao array
    titulo: tituloDaTarefa,
    done: false,
  });localStorage.setItem('tarefas',JSON.stringify(tarefas))//salvando a lista no local storage em JSON
  renderTaskOnHTML(tituloDaTarefa)

  inputFormulario.value = ""; //resetando o formulario sempre que for adicionado algum item
});
