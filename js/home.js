const btnSair = document.querySelector('.btn button');

const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

if (!usuario) {
   window.location.href = '../index.html';
}

const saudacao = document.querySelector('.saudacao');


saudacao.textContent = `Bem vindo ${usuario.nome}!`;

btnSair.addEventListener('click', () => {
   localStorage.removeItem('usuarioLogado');

   window.location.href = '../index.html';
})