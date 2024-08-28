# Elitedev Backend

Este repositório contém o backend da aplicação de Lista de Filmes que permite aos usuários pesquisar e salvar filmes em uma lista de favoritos. A aplicação se integra com a API do The Movie Database (TMDb) para exibir detalhes dos filmes, incluindo a nota (rating).

## Proposta de Solução

Desenvolver uma aplicação de Lista de Filmes que permita ao usuário:

- Pesquisar filmes.
- Exibir detalhes dos filmes (como nota de avaliação).
- Salvar filmes em uma lista de favoritos.

## Requisitos Funcionais

### Back-End

- **Gerenciamento de chamadas para a API do TMDb**: Recupera informações de filmes, incluindo populares, próximos lançamentos, mais bem avaliados e atualmente em exibição.
- **Armazenamento da lista de favoritos**: Salva a lista de filmes favoritos dos usuários.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento.
- **Express**: Framework web para Node.js.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados do usuário e favoritos.

## Estrutura do Projeto
```
elitedev-backend/
│
├── controllers/
│   ├── movieController.js       # Controlador para manipulação de filmes
│   └── userController.js        # Controlador para manipulação de usuários
│
├── jwt/
│   └── Jwt.js                   # Implementação de autenticação JWT
│
├── models/
│   ├── Movie.js                 # Modelo para a coleção de filmes
│   └── User.js                  # Modelo para a coleção de usuários
│
├── routes/
│   ├── movieRoutes.js           # Rotas relacionadas a filmes
│   └── userRoutes.js            # Rotas relacionadas a usuários
│
└── app.js                       # Arquivo principal da aplicação
```

## Funcionalidades Principais

- **Autenticação e Autorização**: Utilização de JWT para autenticação de usuários.
- **Integração com API do TMDb**:
  - Recuperação de Filmes Populares: `/popular`
  - Recuperação de Próximos Lançamentos: `/upcoming`
  - Recuperação de Filmes Mais Bem Avaliados: `/top_rated`
  - Recuperação de Filmes Atualmente em Exibição: `/now_playing`
  - Busca de Filmes: `/search`
- **Gerenciamento de Favoritos**:
  - Listar Favoritos: `/favorites`
  - Adicionar aos Favoritos: `/favorites`
  - Remover dos Favoritos: `/favorites/:movieId`

## Instalação e Execução

1. **Clone o repositório**:

```bash
git clone https://github.com/amayararocha/elitedev-backend.git
cd elitedev-backend
```
2. **Instale as dependências**:
```
npm install
```
3. **Configure as variáveis de ambiente**:
- Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
```
PORT=<Porta que a aplicação vai rodar>
TMDB_URL=https://api.themoviedb.org/3
TMDB_TOKEN=<TOKEN de autentificação do TMDB gerado após a criação de conta>
MONGO_URI=<URL do banco de dados, ex: mongodb://localhost:27017/
JWT_SECRET=<Uma chave padrão utilizada para tokens JWT(ex: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjYzNGJhNWY2ZDNmNzVjYmZiZGExYzAyOWI1MjFkNiIsIm5iZiI6MTcyNDc2MTM1Ni40Njk0MjksInN1YiI6IjY2Y2I3MDFlOThhODM1M2JmOTQ4YjViZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3b7sav-DP_x_lrMYnQtPwyoI88sAHEZg2M9lJ4N5BX0
)>
```
4. **Inicie o servidor**:
```
node app.js
```
## Endpoints da API

### Rotas de Filmes

- **GET** `/popular`: Retorna os filmes populares.
- **GET** `/upcoming`: Retorna os próximos lançamentos.
- **GET** `/top_rated`: Retorna os filmes mais bem avaliados.
- **GET** `/now_playing`: Retorna os filmes atualmente em exibição.
- **GET** `/search?query=...`: Pesquisa filmes com base em uma consulta.
- **GET** `/favorites`: Retorna a lista de filmes favoritos do usuário.
- **POST** `/favorites`: Adiciona um filme à lista de favoritos do usuário.
- **DELETE** `/favorites/:movieId`: Remove um filme da lista de favoritos do usuário.

### Rotas de Usuários

- **POST** `/register`: Registra um novo usuário.
- **POST** `/login`: Realiza login de um usuário existente.
- **GET** `/token`: Renova o token de autenticação.

## Considerações Finais

O desenvolvimento desta aplicação de Lista de Filmes proporcionou uma oportunidade para integrar várias tecnologias e criar um sistema funcional que permite aos usuários pesquisar e salvar filmes favoritos. Embora o projeto tenha sido concluído com sucesso em um ambiente de desenvolvimento local, alguns desafios foram encontrados durante o processo de deploy.

### Desafios de Deploy

Apesar de ter configurado corretamente o ambiente para funcionar na Vercel, houve dificuldades técnicas ao tentar realizar o deploy. Em particular, a aplicação não se comportou como esperado na Vercel, possivelmente devido a limitações específicas da plataforma em lidar com certos requisitos do backend ou da integração com o MongoDB.

Além disso, ao tentar usar o Render para o deploy, a aplicação não conseguiu se conectar corretamente ao banco de dados. Esse problema pode ter sido causado por configurações de rede ou políticas de segurança da plataforma. Continuarei investigando esses problemas e explorando alternativas de deploy para garantir uma experiência de usuário mais consistente e acessível.

### Funcionalidade de Compartilhamento de Favoritos
A funcionalidade de compartilhamento da lista de favoritos ainda não foi implementada. A geração de links únicos para compartilhar listas por e-mail ou redes sociais está planejada para futuras melhorias. Devido ao prazo limitado para o teste técnico, o foco foi garantir o funcionamento completo das funcionalidades principais de pesquisa e gerenciamento de favoritos. A implementação do compartilhamento será considerada em etapas futuras para aprimorar a experiência do usuário.

### Agradecimentos

A construção desta aplicação foi uma grande oportunidade de aprendizado e aprimoramento de habilidades em desenvolvimento backend, e cada desafio encontrado ajudou a crescer como desenvolvedora.

Obrigado por conferir este projeto!
