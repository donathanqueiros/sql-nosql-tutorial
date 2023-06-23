# sql-nosql-tutorial

link [medium](https://medium.com/@donathanbt/guia-completo-de-convers%C3%A3o-de-banco-de-dados-sql-para-nosql-passo-a-passo-utilizando-node-js-edc164ec3faf)

Certifique-se de ter o Node.js e o Docker instalados em seu sistema.

Abra o terminal ou prompt de comando.

Navegue até o diretório raiz do seu projeto.

Execute o comando docker-compose up para iniciar os contêineres Docker necessários para o seu projeto.

Aguarde até que todos os contêineres estejam em execução e prontos para uso.

No terminal ou prompt de comando, execute o comando **npm install** ou **yarn** para instalar as dependências do projeto.

Aguarde até que todas as dependências sejam instaladas com sucesso.

para migrar os dados execute o comando **npm start** ou **yarn start**

Por fim, execute o comando node server para acessar os dados.

Aguarde até que o projeto seja iniciado corretamente e esteja pronto para ser utilizado.

Agora você deve ter seu projeto em execução, com as dependências instaladas e pronto para ser usado. Certifique-se de ajustar os comandos npm install, yarn install, npm start ou yarn start conforme a necessidade específica do seu projeto.

rotas sql sql/:recurso
ex:http://localhost:8000/sql/artists

    recursos:
    albums,
    artists,
    customers,
    employees,
    genres,
    invoice_items,
    invoices,
    media_types,
    playlist_track,
    playlists,
    sqlite_stat1,
    tracks,

rotas nosql mongo/:recurso
ex:http://localhost:8000/mongo/artists

    recursos:
    artists,
    playlists,
    customers,
    employees
