# Sistema de Login e Cadastro

## Descrição
Sistema frontend de autenticação utilizando **HTML, CSS e JavaScript**, com armazenamento de usuários no **LocalStorage**.  
Permite cadastro, login e logout, exibindo uma saudação personalizada na página Home. Inclui validação de campos e recurso de mostrar/ocultar senha.

## Funcionalidades
- Cadastro de usuário com validação:
  - Nome obrigatório (mínimo 3 caracteres)
  - Email válido
  - Senha com mínimo 6 caracteres
  - Confirmação de senha
- Login de usuário:
  - Validação de email e senha
  - Redirecionamento para página Home
  - Mensagem de erro caso email ou senha estejam incorretos
- Home:
  - Exibe saudação personalizada com o nome do usuário
  - Botão de logout, que remove o usuário logado
- Mostrar/Ocultar senha nos formulários
- Armazenamento local usando **LocalStorage**

## Tecnologias Utilizadas
- HTML5
- CSS3
- JavaScript (Vanilla JS)
- LocalStorage

## Estrutura de Pastas
📁 projeto-login
├─ index.html # Página de Login
├─ /pages
│ ├─ cadastrar.html # Página de Cadastro
│ └─ home.html # Página Home
├─ /estilos
│ ├─ login.css
│ ├─ cadastrar.css
│ └─ home.css
└─ /js
├─ login.js
├─ cadastrar.js
└─ home.js
## Como usar
1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/projeto-login.git
2.Abra o index.html no navegador.

3.Cadastre um novo usuário ou faça login com um existente.

4.Navegue entre as páginas e teste o logout.

Observações
Sistema totalmente frontend, sem backend.

Todos os dados ficam armazenados no navegador via LocalStorage.
