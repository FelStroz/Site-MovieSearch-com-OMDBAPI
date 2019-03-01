//Script já pronto no index
//Desenvolvido com muito esforço
//             por
/////*****Felipe Strozberg*****\\\\\\

//Função criada para captar a informação gerada pelo clique do mouse no li e
//capta as informações do json fornecido pela API como o ID dos filmes e trata eles, transformando em
//variáveis para serem mostradas.
function gerarHtml(movie) {
        var a= $.ajax({
            url: "http://www.omdbapi.com/?apikey=de97b68d&",
            async: true,
            type: "get",
            data: { i: movie }, //i pois só importa o dado do filme escolhido pelo clique do mouse
            dataType: "json"
        });
        //Tratamento das informações para serem armazenadas em variáveis
        //Tratamento das opções inválidas obtidas
        a.done(function(result){
                var title = result['Title'];
                if(title == 'N/A' || title == null) {
                    title = "Infelizmente n&#227;o temos essa informaç&#231;#227;o :(";
                }
                var website = result['Website'];
                if(website == 'N/A' || website == null) {
                    website = "Infelizmente n&#227;o temos essa informa&#231;&#227;o :(";
                }
                var year = result['Year'];
                if(year == 'N/A' || year == null) {
                    year = "Infelizmente n&#227;o temos essa informa&#231;&#227;o :(";
                }
                var runtime = result['Runtime'];
                if(runtime == 'N/A' || runtime == null) {
                    runtime = "Infelizmente n&#227;o temos essa informa&#231;&#227;o :(";
                }
                var genre = result['Genre'];
                if(genre == 'N/A' || genre == null) {
                    genre = "Infelizmente n&#227;o temos essa informa&#231;&#227;o :(";
                }
                var poster = result['Poster'];
                if(poster == 'N/A' || poster == null) {
                    poster = "Infelizmente n&#227;o temos essa informa&#231;&#227;o :(";
                }
                //innerhtml
                //Limpa a visão do html para receber novas informações
                $('#detalFilme').html("");

                //Exibe as informações tratadas por tópicos
                $('#detalFilme').append("<h3> Title: " + title +" </h3><h3> Year: " + year +" </h3><h3> Runtime: "+ runtime +"</h3><h3> Genre: "+ genre + "</h3><h3> Site: "+ website + "</h3><img src='" + poster + "'></img>");
        });
    //alert(movie); teste
}
//Começa a ligação de informações do usuário com o banco de dados do API
$(document).ready(function(){

    //Envia o filme para ser requisitado no servidor
    $('#proqFilme').submit(function(e){
        e.preventDefault();

        //Entrada de dados do usuário
        var userInput = $('#procurarTermo').val();

        //Limpa tanto os resultados, quanto os detalhes para uma nova pesquisa que será realizada
        $('#results').html("");
        $('#detalFilme').html("");

        //Faz a requisição para o servidor
        var request = $.ajax({
            url: "http://www.omdbapi.com/?apikey=de97b68d&",
            async: true,
            type: "get",
            data: { s: userInput }, //Usa-se o S para retornar todas as opções relacionadas ao filme digitado
            dataType: "json"
        });

        //Assim que a requisição retorna e recebe a informação, nesse caso o ID do filme, ele mostra na tela
        //Todos os resultados relacionados ao filme digitado.
        //Espera o clique do mouse para voltar a função de tratar as informações.
        request.done(function(results){
            $.each(results["Search"], function(index, movie){
               $('#results').append("<li onclick = \"gerarHtml(\'"+movie['imdbID']+"\')\">"+ movie["Title"]+"</li>");
            });
        });
     });
});