const user = document.querySelector('.user');

const btnSair = document.querySelector('.btn button');

const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

if (!usuario) {
   window.location.href = '../index.html';
}

user.textContent = `${usuario.nome}`;

btnSair.addEventListener('click', () => {
   localStorage.removeItem('usuarioLogado');

   window.location.href = '../index.html';
})