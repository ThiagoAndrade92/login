const form = document.querySelector('.form');
const toggle = document.querySelectorAll('.toggle');

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//Obj campos
const campos = [
   { id: 'nome', validador: validarNome, },
   { id: 'email', validador: validarEmail, },
   { id: 'senha', validador: validarSenha, },
   { id: 'confirmar-senha', validador: validarConfirmarSenha, },
];

//função para pegar campos vazios
const campoVazio = (value) => {
   return !value || value.trim() === '';
};

//função para validar nome
function validarNome (value) {
   const validador = {
      validar: true,
      erroMsg: null,
   };

   if (campoVazio(value)) {
      validador.validar = false;
      validador.erroMsg = "Campo obrigatório!";
      return validador;
   };

   const min = 3;
   if (value.length < min) {
      validador.validar = false;
      validador.erroMsg = `O nome deve ter no mínimo ${min} caracteres!`;
      return validador;
   };

   return validador;
};

//função para validar email
function validarEmail (value) {
   const validador = {
      validar: true,
      erroMsg: null,
   };

   if (campoVazio(value)) {
      validador.validar = false;
      validador.erroMsg = "Campo obrigatório!"
      return validador;
   };

   if (!emailRegex.test(value)) {
      validador.validar = false;
      validador.erroMsg = "Digite um email válido!";
      return validador
   };

   const usuarioAtual = JSON.parse(localStorage.getItem('usuarios')) || [];
   const emailExiste = usuarioAtual.find(u => u.email.toLowerCase() === value.toLowerCase());
   if (emailExiste) {
      validador.validar = false;
      validador.erroMsg = "O email já existe!"
      return validador;
   };

   return validador;
};

//função para validar senha
function validarSenha (value) {
   const validador = {
      validar: true,
      erroMsg: null,
   };

   if (campoVazio(value)) {
      validador.validar = false;
      validador.erroMsg = "Campo obrigatório!";
      return validador
   };

   const min = 6;
   if (value.length < min) {
      validador.validar = false;
      validador.erroMsg = `A senha deve ter no mínimo ${min} caracteres!`;
      return validador;
   };

   return validador;
};

//função para verificar se confirmar senha é = senha
function validarConfirmarSenha (value, dados) {
   const validador = {
      validar: true,
      erroMsg: null,
   };

   if (campoVazio(value)) {
      validador.validar = false;
      validador.erroMsg = "Campo obrigatório!";
      return validador;
   };

   if (value !== dados.senha) {
      validador.validar = false;
      validador.erroMsg = "As senhas não coincidem!";
      return validador;
   }

   return validador;
}

const validarCampos = () => {
   let formValido = true;
   const dados = {};

   campos.forEach(({ id, validador }) => {
      const input = document.getElementById(id);
      if (!input) {
         formValido = false;
         return
      };
      const valor = input.value.trim();
      const chave = id === 'confirmar-senha' ? 'confirmarSenha' : id;
      dados[chave] = valor;

      const label = input.closest('.labels')
      if (!label) return;

      const spanErro = label.querySelector('.erro');
      if (!spanErro) return;

      const campoValidador = id === 'confirmar-senha' ? validador(valor, dados) : validador(valor);

      spanErro.textContent = '';

      if (!campoValidador.validar) {
         spanErro.textContent = `${campoValidador.erroMsg}`;
         formValido = false;
      }

   });

   return formValido ? dados : null;
};

form.addEventListener('submit', (e) => {
   e.preventDefault();

   const dados = validarCampos();

   if (!dados) return;

   const novoUsuario = {
      id: Date.now(),
      nome: dados.nome,
      email: dados.email,
      senha: dados.confirmarSenha,
   }
   usuarios = [...usuarios, novoUsuario];
   localStorage.setItem('usuarios', JSON.stringify(usuarios));

   form.reset();

   alert('Cadastro feito com sucesso!');

   window.location.href = '../index.html';
});

//Toggle

toggle.forEach((btn) => {
   
   btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (!input || input.tagName !== 'INPUT') return;

      input.type = input.type === 'password' ? 'text' : 'password';

      btn.textContent = input.type === 'password' ? 'Mostrar' : 'Ocultar';
   });
});
