let formTarefas = document.forms["formtarefa"];
let lista = document.getElementsByClassName(".tarefa");
let inputTarefa = formTarefas["nova-Tarefa"];
let botaoAdd = formTarefas["add"];
let error = document.getElementById("erro");
const urlTodoGet = "https://ctd-fe2-todo-v2.herokuapp.com/v1";
botaoAdd.disabled = true;

window.onload = () => { // inicia sessão colocando nome de usuario no topo e listando as tarefas
  infoUsuario();
  infoTarefas();
};

function finalizarSessao() {
  sessionStorage.clear("token");
  sessionStorage.clear("dadosUsuario");
  sessionStorage.clear("dadosTarefas");
  window.location.href = "index.html";
}

inputTarefa.onkeyup = (evento) => {
let min = 5;
  if (inputTarefa.value.length >= min) {
    error.innerText = "";
    inputTarefa.style.border = "";
    botaoAdd.disabled = false;
}

else {
    error.innerText = "Digite no mínimo 5 caracteres";
    error.style.color = "red";
    inputTarefa.style.borderBottom = " 1px solid red";
    botaoAdd.disabled = true;
}
}

function infoUsuario() {
  fetch(`${urlTodoGet}/users/getMe`, {
    method: "GET",
    headers: {
      Authorization: `${sessionStorage.getItem("token")}`, // pega o token do login armazenado no sessionStorage
    },
  })
    .then(function (response) { //converte a resposta de json para string
      return response.json();
    })
    .then(function (data) { //manipula os dados recebidos do fetch
      sessionStorage.setItem("dadosUsuario", JSON.stringify(data));
      const usuario = JSON.parse(sessionStorage.getItem("dadosUsuario")); //pega os dados do usuario
      document.getElementById("nome-usuario").textContent = `${usuario.firstName} ${usuario.lastName}`; // Coloca nome e sobrenome do usuario recebido no top da pagina
    })
    .catch(function (erro) {
      console.log(erro);
    });
}

function infoTarefas() {

  fetch(`${urlTodoGet}/tasks`, {
    method: "GET",
    headers: {
      Authorization: `${sessionStorage.getItem("token")}`, //envia o token criado no login
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      sessionStorage.setItem("dadosTarefas", JSON.stringify(data));
      const tarefas = JSON.parse(sessionStorage.getItem("dadosTarefas"));

      const listaTarefasPendentes = data.map((tarefa) =>
        criaListaTarefasPendentes(tarefa)
      );
      const ListaTarefasTerminadas = data.map((tarefa) =>
        criaListaTarefasTerminadas(tarefa));

        let div = document.getElementsByTagName("div");
        
        if(div.classNameDone = "done"){
          document.getElementById("tarefas-terminadas").innerHTML =
          ListaTarefasTerminadas.join("");
      }
      else if(div.classNameDone = "not-done"){
        document.getElementById("lista-tarefas").innerHTML =
        listaTarefasPendentes.join("");
      }
    }
        )
    .catch(function (erro) {
      console.log(erro);
    });
}


function remover() {
  //   let Id = JSON.parse(sessionStorage.dadosTarefas);
  //   elementoID.forEach(task => {
  //     task.children.length.children.length.onclick = event => {
  //         
  //     };
  // })
  let taref = document.getElementsByClassName(".tarefas-pendentes")
  taskID = JSON.parse(sessionStorage.dadosTarefas)[0].id
  fetch(urlTodoGet + '/tasks/' + taskID, {
              method: 'DELETE',
              headers: {
                Authorization: `${sessionStorage.getItem("token")}`,
              },
          }).then(response => {
              infoTarefas();
          });

  }
  
function criaListaTarefasPendentes(tarefa) {
  let newTaks;
            const date = new Date(tarefa.createdAt),
            month_num = Number(date.getUTCMonth()) + 1,
            month_decimal = month_num <= 9 ? '0' + month_num : month_num,
            formatDate = `${date.getUTCDate()}/${month_decimal}/${date.getUTCFullYear()}`,
            classNameDone = (tarefa.completed === false) ? 'not-done' : 'done'
            svg = `<img src="https://img.icons8.com/material/24/000000/filled-trash.png"/>`;
     return      `
    <li class="tarefa" id="fora">
    <div class="${classNameDone}" id="${tarefa.id}" onclick = "change(this.id)"></div>
    <div class="descricao">
        <p class="nome">${tarefa.description}</p>
        <p class="timestamp"><i class="far fa-calendar-alt"></i> ${formatDate}</p>
        <button id="mybutton" onclick="remover(this.id)">${svg}</button> 
    </div>
</li>
` //usando o this.id como parametro da função voce remove apenas a tarefa clicada
}

function criaListaTarefasTerminadas(tarefa) {
  let newTaks;
            const date = new Date(tarefa.createdAt),
            month_num = Number(date.getUTCMonth()) + 1,
            month_decimal = month_num <= 9 ? '0' + month_num : month_num,
            formatDate = `${date.getUTCDate()}/${month_decimal}/${date.getUTCFullYear()}`,
            classNameDone = (tarefa.completed === false) ? 'not-done' : 'done'
            svg = `<img src="https://img.icons8.com/material/24/000000/filled-trash.png"/>`;
     return      `
    <li class="tarefa" id="fora">
    <div class="${classNameDone}" id="${tarefa.id}"></div>
    <div class="descricao">
        <p class="nome">${tarefa.description}</p>
        <p class="timestamp"><i class="far fa-calendar-alt"></i> ${formatDate}</p>
        <button id="mybuttonnotDone" onclick="remover(this.id)">${svg}</button>
    </div>
</li>
`;
  }

function criarTarefa(event) {
  event.preventDefault();
  let nomeTarefa = document.getElementById("nova-Tarefa").value;
  inputTarefa.value = inputTarefa.value.trim();
  fetch(`${urlTodoGet}/tasks`, {
    method: "POST",
    headers: {
      Authorization: `${sessionStorage.getItem("token")}`, // pega o token gerado e envia para API
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ //converte o body que necessita ser enviado para API
      description: nomeTarefa,
      completed: true,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      infoTarefas(); //exibe a tarefa recem criada
      formTarefas.reset();
        })
    .catch(function (erro) {
      console.log(erro);
    });
}

function change() {
let form = document.forms["formtarefa"];
let divs = form.querySelector('.not-done');
 if(divs.classList.contains('not-done')){
  divs.classList.remove('not-done');
  divs.classList.add('done');
  sessionStorage.setItem("estado", divs.classList);}
 }
 