let formRegistro = document.forms["registro"];
let nomeRegistro = formRegistro["nomereg"];
let sobrenomeRegistro = formRegistro["sobrenomereg"];
let emailRegistro = formRegistro["emailreg"];
let senhaRegistro = formRegistro["senhareg"];
let confirmaSenha = formRegistro["confirmasenha"];
let registrar = formRegistro["criar"];
const urlTodoR = "https://ctd-fe2-todo-v2.herokuapp.com/v1/";

registrar.disabled = true;

function validateEmailR(emailRegistro) {
  var reR = /\S+@\S+\.\S+/;
  return reR.test(emailRegistro);
}

nomeRegistro.onkeyup = (evento) => {
  nomeRegistro.value = nomeRegistro.value.replace(/ /g, "");
  if (nomeRegistro.value !== "") {
    evento.target.style.background = "";
    evento.target.style.border = "1px solid green";
  } else {
    registrar.disabled = true;
    evento.target.style.background = "pink";
    evento.target.style.border = "1px solid red";
  }
};

nomeRegistro.onblur = (evento) => {
  if (nomeRegistro.value !== "") {
    evento.target.style.background = "";
    evento.target.style.border = "1px solid green";
    registrar.disabled = false;
  } else {
    registrar.disabled = true;
    evento.target.style.background = "pink";
    evento.target.style.border = "1px solid red";
  }
};

sobrenomeRegistro.onkeyup = (evento) => {
  sobrenomeRegistro.value = sobrenomeRegistro.value.replace(/ /g, "");
  if (sobrenomeRegistro.value !== "") {
    evento.target.style.background = "";
    evento.target.style.border = "1px solid green";
  } else {
    registrar.disabled = true;
    evento.target.style.background = "pink";
    evento.target.style.border = "1px solid red";
  }
};

sobrenomeRegistro.onblur = (evento) => {
  if (sobrenomeRegistro.value !== "") {
    evento.target.style.background = "";
    evento.target.style.border = "1px solid green";
    registrar.disabled = false;
  } else {
    registrar.disabled = true;
    evento.target.style.background = "pink";
    evento.target.style.border = "1px solid red";
  }
};

emailRegistro.onkeyup = (evento) => {
  emailRegistro.value = emailRegistro.value.replace(/ /g, "");
  if (validateEmailR(emailRegistro.value)) {
    evento.target.style.background = "";
    evento.target.style.border = "1px solid green";
  } else {
    registrar.disabled = true;
    evento.target.style.background = "pink";
    evento.target.style.border = "1px solid red";
  }
};

emailRegistro.onblur = (evento) => {
  if (validateEmailR(emailRegistro.value) && emailRegistro.value !== "") {
    evento.target.style.background = "";
    evento.target.style.border = "1px solid green";
    registrar.disabled = false;
  } else {
    registrar.disabled = true;
    evento.target.style.background = "pink";
    evento.target.style.border = "1px solid red";
  }
};

senhaRegistro.onkeyup = (evento) => {
  senhaRegistro.value = senhaRegistro.value.replace(/ /g, "");
  let min = 5;
  if (senhaRegistro.value.length < min) {
    evento.target.style.background = "pink";
    evento.target.style.border = "1px solid red";
    registrar.disabled = true;
  } else {
    evento.target.style.background = "";
    evento.target.style.border = "1px solid green";
  }
};

confirmaSenha.onkeyup = (evento) => {
  confirmaSenha.value = confirmaSenha.value.replace(/ /g, "");
  if (
    confirmaSenha.value === senhaRegistro.value &&
    confirmaSenha.value !== "" &&
    nomeRegistro.value !== "" &&
    sobrenomeRegistro.value !== "" &&
    emailRegistro.value !== ""
  ) {
    evento.target.style.background = "";
    evento.target.style.border = "1px solid green";
    registrar.disabled = false;
  } else {
    registrar.disabled = true;
    evento.target.style.background = "pink";
    evento.target.style.border = "1px solid red";
  }
};

confirmaSenha.onblur = (evento) => {
  if (
    confirmaSenha.value === senhaRegistro.value &&
    confirmaSenha.value !== "" &&
    nomeRegistro.value !== "" &&
    sobrenomeRegistro.value !== "" &&
    emailRegistro.value !== ""
  ) {
    evento.target.style.background = "";
    evento.target.style.border = "1px solid green";
    registrar.disabled = false;
  } else {
    registrar.disabled = true;
    evento.target.style.background = "pink";
    evento.target.style.border = "1px solid red";
  }
};

//------------------------------------------------//-------------------------------------------------//
//--------------------------------------------Requisições-------------------------------------------//
//------------------------------------------------//-------------------------------------------------//

//Requisição para Criar novo Usuário//
formRegistro.onsubmit = (evento) => {
  evento.preventDefault();

//Converte os dados recebidos no formulario para enviar para API//
const bodycriar = JSON.stringify({
  firstName: nomeRegistro.value,
  lastName: sobrenomeRegistro.value,
  email: emailRegistro.value,
  password: senhaRegistro.value,
});

console.log("body", bodycriar);

// Envia os dados do formulario para API
fetch(`${urlTodoR}users`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: bodycriar,
}
)
.then(async (response) => {
  console.log("Response", response);
  // if(response === 400){
  //   let err = document.getElementById("erro");
  //   err.innerText = "Usuário ja existe!";
  //   err.style.color = "red";
  // }
  if(response.status === 201){
 //------------------------------------------------//  
    let body = await response.json();
    let token = body.jwt;                          //---------armazena o token no sessionStorage para LOGIN---------//
    sessionStorage.setItem("token", token)
 //-----------------------------------------------//   
    let err = document.getElementById("erro");
    err.innerText = "Usuário criado com sucesso!";
    err.style.color = "green";
    registrar.style.border = "green";
    formRegistro.reset();
    registrar.disabled = true;
  }
  else{
    let err = document.getElementById("erro");
    err.innerText = "Ops, usuário ou dados ja cadastrados!";
    err.style.color = "red";
    registrar.disabled = true;
  }
})
}