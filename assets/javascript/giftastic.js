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


        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + getQueryURL(search) +  "&api_key=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var gifHolder = $("<div>");
            gifHolder.addClass("gifs");
            for (var k = 0; k < response.data.length; k++) {

                var gifImg = $("<img >");
                gifImg.addClass("random-gif");
                gifImg.attr("src", response.data[k].images.fixed_height_still.url);
                gifImg.attr("alt", response.data[k].title);
                gifImg.attr("data-still", response.data[k].images.fixed_height_still.url);
                gifImg.attr("data-animated", response.data[k].images.fixed_height.url);
                gifImg.attr("status", "still");
                gifHolder.append(gifImg);
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