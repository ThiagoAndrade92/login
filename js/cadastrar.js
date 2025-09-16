const form = document.querySelector('.form');

const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const confirmarSenha = document.querySelector('#confirmar-senha');

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

console.log(usuarios)

const erro = document.querySelectorAll('.erro');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validarCampos = () => {
   let valido = true;

   erro.forEach(span => span.textContent = '');

   // Nome
   if (nome.value.trim() === '') {
      erro[0].textContent = 'O nome é obrigatório!';
      valido = false;
   } else if (nome.value.length < 3) {
      erro[0].textContent = 'O nome deve ter no mínimo 3 caracteres!'
      valido = false;
   };

   //Email
   if (email.value.trim() === '') {
      erro[1].textContent = 'O email é obrigatório!';
      valido = false;
   } else if (!emailRegex.test(email.value)) {
      erro[1].textContent = 'Digite um email válido!';
      valido = false;
   }

   //Senha
   if (senha.value.trim() === '') {
      erro[2].textContent = 'A senha é obrigatória!'
      valido = false;
   } else if (senha.value.length < 6) {
      erro[2].textContent = 'A senha deve ter no mínimo 6 caracteres!';
      valido = false;
   }

   //Confirmar senha
   if (confirmarSenha.value.trim() === '') {
      erro[3].textContent = 'Confirme a senha';
      valido = false;
   } else if (confirmarSenha.value !== senha.value) {
      erro[3].textContent = 'As senhas não coincidem!';
      valido = false;
   }

   return valido;

};

const cadastrarUsuario = () => {
   const novoUsuario = {
      id: Date.now(),
      nome: nome.value.trim(),
      email: email.value.trim(),
      senha: confirmarSenha.value
   }
   usuarios = [...usuarios, novoUsuario];
   localStorage.setItem('usuarios', JSON.stringify(usuarios));
};



form.addEventListener('submit', (e) => {
   e.preventDefault();

  if(validarCampos()) {
   cadastrarUsuario();

   form.reset();

   window.location.href = '../index.html';

  }
});