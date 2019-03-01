/*$(document).ready(function() {

    function wrapHtml(movie) {
        var movieHtml = '<div>' +
            '<h3>' + movie.Title + ' (' + movie.Year +') </h3>' +
            '<img src="' + movie.Poster + '">' +
            '</div>';
        return movieHtml;
    }

    var searchVal = "";
    $("#movieSearch").keyup(function() {
        console.log( $("#movieSearch").val() );
        var searchVal = $(this).val();
        console.log(searchVal);

        $.ajax({
            url: 'http://www.omdbapi.com/?i=tt3896198&apikey=de97b68d' + searchVal,
            type: 'GET',
            dataType: 'json'
        })
            .done(function (data) {
                console.log(data);
                if (data.Response == "True"){
                    $("#movies").html('');  // or use  $("#movies").empty();
                    // console.log(data.Search);
                    var search = data.Search;
                    // view the response..
                    // console.log(search);
                    //----------------
                    //for loop to display items within response. in this case Title.
                    // for(var items in search){
                    //   console.log(search[items].Title)
                    // }
                    //---------
                    search.forEach(function(movie){
                        // console log to view data..   (leaving this in to show the process)
                        // console.log("Title : " + movie.Title)
                        // console.log("Poster : " + movie.Poster)
                        // console.log("Year : " + movie.Year)
                        // console.log(" : " + movie.Year)

                        // $('#movies').append(moviehtml);  // moved into a function at top.
                        $('#movies').append(wrapHtml(movie));
                    });
                } else{
                    $("#movies").html('No results found. Keep typing!');  // or use  $("#movies").empty();
                }
            })
            .error(function (){
                console.log("Error!");
            });

    });

});*/

function wrapHtml(movie) {
        var a= $.ajax({
            url: "http://www.omdbapi.com/?apikey=de97b68d&",
            async: true,
            type: "get",
            data: { i: movie },
            dataType: "json"
        });
        a.done(function(result){
                var title = result['Title'];
                if(title == 'N/A' || title == null) {
                    title = "Infelizmente n&#227;o temos essa informaç&#231;#227;o :(";
                }
                var website = result['Website'];
                if(website == 'N/A' || website == null) {
                    website = "Infelizmente n&#227;o temos essa informa&#231;&#227;o :(";
                }
                //innerhtml
                $('#movieDetails').html("");
                $('#movieDetails').append("<h3> Title: " + title +"</h3><h3>"+ result['Year']+"</h3><h3>"+ result['Runtime']+"</h3><h3>"+ result['Genre']+"</h3><h3>"+ website + "</h3><img src='" + result["Poster"] + "'></img>");
        });
    //alert(movie);
}
$(document).ready(function(){

    $('#movieSearch').submit(function(e){
        e.preventDefault();
        var userInput = $('#searchTerm').val();
        $('#results').html("");
        $('#movieDetails').html("");
        var request = $.ajax({
            url: "http://www.omdbapi.com/?apikey=de97b68d&",
            async: true,
            type: "get",
            data: { s: userInput },
            dataType: "json"
        });

        request.done(function(results){
            $.each(results["Search"], function(index, movie){
               // $('#results').append("<li data-imdbid = " + movie['imdbID'] + ">" + movie["Title"] + "</li>");
                    //innerhtml
               $('#results').append("<li onclick = \"wrapHtml(\'"+movie['imdbID']+"\')\">"+ movie["Title"]+"</li>");
            });
        });
//desnecessauro
        var details = $('#results').delegate('li', 'click', function(f){
            f.preventDefault();
            var inner = $(f.target).data("imdbID");
           // console.log(data);
            console.log(details);
           // $('#results').append(wrapHtml(movie));


            var poster = $.ajax({
                url: "http://img.omdbapi.com/?apikey=de97b68d",
                async: true,
                type: "get",
                data: { i: inner },
                dataType: "json"
            });

            poster.done(function(data){
                $('#movieDetails').html("");
                if (data["Poster"] == "N/A"){
                    $('#movieDetails').append("<p>No picture available</p>");
                }
                else {
                    $('#movieDetails').append("<img src='" + data["Poster"] + "'</img>");
                }
            });
        });
    });


});