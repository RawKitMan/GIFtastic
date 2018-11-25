$(document).ready(function () {

    var topics = ["Pokemon", "Final Fantasy", "God of War", "Sonic"];
    var apiKey = "6D1ZnqOc1cg8qfH7oshiKIEiiuJmpIUc";

    function createButtons(arr) {
        $("#buttons").empty();
        for (var i = 0; i < arr.length; i++) {
            var newBtn = $("<button>");
            newBtn.addClass("button gif-button");
            newBtn.attr("data-value", arr[i]);
            newBtn.text(arr[i]);
            $("#buttons").append(newBtn);
        }
    }

    function getQueryURL(value) {

        var searchTerm = "";

        for (var i = 0; i < value.length; i++) {

            if (value.charAt(i) === " ") {
                searchTerm += "+";
            }
            else {
                searchTerm += value.charAt(i);
            }
        }

        return searchTerm;
    };

    $("#add-button").on("click", function () {
        event.preventDefault();

        var gifAdd = $("#gif-input").val().trim();

        topics.push(gifAdd);

        $("#gif-input").val("");

        createButtons(topics);
    });

    $(document).on("click", ".gif-button", function () {

        var search = $(this).attr("data-value");


        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + getQueryURL(search) +  "&limit=10&api_key=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var gifHolder = $("<div>");
            gifHolder.addClass("gifs");
            for (var k = 0; k < response.data.length; k++) {

                var figure = $("<figure>");
                figure.addClass("float-left");
                var ratingCaption = $("<figcaption>");
                ratingCaption.addClass("ml-2");
                ratingCaption.text("Rating: " + response.data[k].rating.toUpperCase());
                var gifImg = $("<img >");
                gifImg.addClass("random-gif");
                gifImg.attr("src", response.data[k].images.fixed_height_still.url);
                gifImg.attr("alt", response.data[k].title);
                gifImg.attr("data-still", response.data[k].images.fixed_height_still.url);
                gifImg.attr("data-animated", response.data[k].images.fixed_height.url);
                gifImg.attr("status", "still");
                figure.append(ratingCaption);
                figure.append(gifImg);
                gifHolder.append(figure);
            }

            $("#gif-display").prepend(gifHolder);
        });

    });

    $(document).on("click", ".random-gif", function(){
        if($(this).attr("status") === "still"){
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("status", "animated");
        }
        else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("status", "still");
        }
    });


    createButtons(topics);
});