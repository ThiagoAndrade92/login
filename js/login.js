//Variaveis
const form = document.querySelector('.form');
const toggle = document.querySelector('.toggle');

//Resgatar usuarios
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

//emailRegex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const campos = [
   { id: "email", validador: validarEmail },
   { id: "senha", validador: validarSenha },
];

const campoVazio = (value) => {
   return value.trim() === '';
};

// função para validar email
function validarEmail(value) {
   const validador = {
      valido: true,
      erroMsg: null,
   }

   if (campoVazio(value)) {
      validador.valido = false;
      validador.erroMsg = "O email é obrigatório!";
      return validador
   }

   if (!emailRegex.test(value)) {
      validador.valido = false;
      validador.erroMsg = "Digite um email válido!";
   }
   return validador;
};


//função para validar senha
function validarSenha(value) {
   const validador = {
      valido: true,
      erroMsg: null,
   };

   if (campoVazio(value)) {
      validador.valido = false;
      validador.erroMsg = 'A senha é obrigatória!';
      return validador;
   }

   const min = 6
   if (value.length < 6) {
      validador.valido = false;
      validador.erroMsg = `A senha deve ter no mínimo ${min} caracteres!`;
      return validador;
   }

   return validador;
}

//função para validar formulário
const validarFormulario = () => {
   let formularioValido = true;
   const dados = {};

   campos.forEach(({ id, validador }) => {

      const input = document.getElementById(id);
      if (!input) {
         formularioValido = false;
         return;
      };

      const valor = input.value.trim();
      dados[id] = valor;

      const label = input.closest('.labels');
      if (!label) return;

      const spanErro = label.querySelector('.erro');
      if (!spanErro) return;

      const campoValidador = validador(valor);

      spanErro.textContent = '';

      if (!campoValidador.valido) {
         spanErro.textContent = `${campoValidador.erroMsg}`;
         formularioValido = false;
      };

   });

   return formularioValido ? dados : null;
};

//enviar o formulário
form.addEventListener("submit", (e) => {
   e.preventDefault();

   const dados = validarFormulario();
   if (!dados) return;

   const usuarioExiste = usuarios.find((u) => u.email === dados.email && u.senha === dados.senha);

    if (usuarioExiste) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioExiste));
            window.location.href = './pages/home.html';
         } else {
            alert('Email ou senha incorretos!')
         }
});

//Toggle

if (toggle) {

   toggle.addEventListener('click', () => {
      const senhaInput = document.getElementById('senha');

      if(!senhaInput) return;

      senhaInput.type = senhaInput.type === 'password' ? 'text' : 'password';
   
      toggle.textContent = senhaInput.type === 'password' ? 'Mostrar' : 'Ocultar';
   });
};