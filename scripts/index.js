let formLogin = document.forms["formLogin"];
let email = formLogin["inputEmail"];
let senha = formLogin["inputPassword"];
let enviar = formLogin["botao"];
let err = document.getElementById("erro");
enviar.disabled = true;


window.onload = () => {
  if (sessionStorage.getItem("token") !== null) {
    window.location.href = "tarefas.html";
  }
};

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// validação de formato de email e eliminação de espaços desnecessarios

email.onkeyup = (evento) => {
  email.value = email.value.replace(/ /g, "");
  if (validateEmail(email.value)) {
    evento.target.style.background = "";
    evento.target.style.border = "1px solid green";
  } else {
    evento.target.style.background = "pink";
    evento.target.style.border = "1px solid red";
  }
};

email.onblur = (evento) => {
  email.value = email.value.replace(/ /g, "");
  if (validateEmail(email.value)) {
    evento.target.style.background = "";
    evento.target.style.border = "1px solid green";
  } else {
    evento.target.style.background = "pink";
    evento.target.style.border = "1px solid red";
  }
};

//valida campo de senha com quantidade de no minimo 5 caracteres

senha.onkeyup = (evento) => {
  senha.value = senha.value.replace(/ /g, "");
  let min = 5;
  if (senha.value.length < min) {
    enviar.disabled = true;
    evento.target.style.background = "pink";
    evento.target.style.border = "1px solid red";
  } else if (email.value === "" || senha.value === "") {
    enviar.disabled = true;
  } else {
    evento.target.style.background = "";
    evento.target.style.border = "1px solid green";
    enviar.disabled = false;
  }
};

//------------------------------------------------//-------------------------------------------------//
//--------------------------------------------Requisições-------------------------------------------//
//------------------------------------------------//-------------------------------------------------//
const urltodo = "https://ctd-fe2-todo-v2.herokuapp.com/v1/";
//Requisição para fazer login//
formLogin.onsubmit = (evento) => {
  evento.preventDefault();

  //Converte os dados recebidos no formulario para enviar para API (body que deve ser enviado para API)//
  const bodyLogin = JSON.stringify({
    email: email.value,
    password: senha.value,
  });

  console.log("body", bodyLogin);

  // Envia os dados do formulario para API
  fetch(`${urltodo}users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyLogin, // body convertido na linha 70
  })
    .then(async (response) => {
      if(response.status === 201){
      let body = await response.json()
      let token = body.jwt; // variável recebe o token "jwt" gerado ao fazer login
      //--------------------------------------------------//
      sessionStorage.setItem("token", token); // armazena o token do usuario, e abre a pagina de tarefas
      location.assign("./tarefas.html"); //
      //--------------------------------------------------//
      formLogin.reset();
      enviar.disabled = true;}
    })
    .catch((erro) => {
    console.log(erro);
    //if(erro === )
    err.innerText = erro;
    err.style.background = "red";
    });
};