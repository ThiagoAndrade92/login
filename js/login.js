const form = document.querySelector('.form');

const email = document.querySelector('#email');
const senha = document.querySelector('#senha');

const erros = document.querySelectorAll('.erro');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

 const validarCampos = () => {
   let valido = true;

   erros.forEach(span => span.textContent = '');

   //Email
   if (email.value.trim() === '') {
      erros[0].textContent = 'O email obrigatório!';
      valido = false;
   } else if (!emailRegex.test(email.value)) {
      erros[0].textContent = 'Digite um email válido!';
      valido = false;
   }

   //Senha
   if(senha.value.trim() === '') {
      erros[1].textContent = 'A senha é obrigatória!';
      valido = false;
   } else if (senha.value.length < 6) {
      erros[1].textContent = 'A senha deve ter no mínimo 6 caracteres!'
      valido = false;
   }

   return valido;
 };

form.addEventListener('submit', (e) => {
   e.preventDefault();

   if (validarCampos()) {

   const usuarioExiste = usuarios.find((u) => u.email === email.value && u.senha === senha.value)

   if (usuarioExiste) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioExiste));
      window.location.href = '/pages/home.html';
   } else {
      alert('Email ou senha incorretos!')
   }
} 
})