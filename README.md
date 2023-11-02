# ExplorerFavorites

--> Criação do html com o formato que deve ficar a aplicação.

--> Criação do style.css e personalização da aplicacão.

--> Criação dos arquivos Javascript para inicializar a interatividade da aplicação.

    --> Favorites.js

    # Criando a classe Favorites

        --> Criando um constructor() e recebendo root como argumento ("#app")

        -->selecionando a Div #app para realizar as modificações na pagina.

    # Criando a classe FavoritesView extends Favorites

        --> Criando um constructor(root) recebendo o id #app da instancia criada no Main.js

        --> invocando o super(root) e passando id #app  como argumento para o constructor da classe Favorites

        --> criando a função update()

            --> invocando a função RemoveAllTr()

        --> criando a função removeAllTr()

            --> Armazenar os dados do tbody do html em uma variavel chamada tbody

            --> através do tbody, selecione os "tr" do html e realize um forEach(tr) recebendo os tr como argumento e removendo da página com a função remove().




    --> Main.js

        --> realizar a importação da classe FavoriteView
        --> criar uma instancia de FavoritesView passando o id #app como argumento.
