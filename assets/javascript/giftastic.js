
//Javascript will only load when the HTML is fully loaded
$(document).ready(function () {

    //This is an array to hold all of our GIF topics 
    var topics = ["Pokemon", "Final Fantasy", "God of War", "Sonic"];
    //My GIPHY API Key
    var apiKey = "6D1ZnqOc1cg8qfH7oshiKIEiiuJmpIUc";

    //We need something to create the GIF topic buttons on our page
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

    //Creates the query search term for the GIPHY API
    function getQuerySearch(value) {

        var searchTerm = "";

        //This constructs the string for the search term in the URL. We need '+' for the spaces between words
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

    //When we click on the button to add a GIF topic button (or press Enter), the button gets created
    $("#add-button").on("click", function () {
        event.preventDefault();

        //We get the word the user inputs and push it into the topics array
        var gifAdd = $("#gif-input").val().trim();
        topics.push(gifAdd);

        //Empty the text box after the user submits the input
        $("#gif-input").val("");

        createButtons(topics);
    });


    //When we click on a GIF topic button...
    $(document).on("click", ".gif-button", function () {

        //We create the query URL
        var search = $(this).attr("data-value");
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + getQuerySearch(search) +  "&limit=10&api_key=" + apiKey;

        //Search the GIPHY API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            
            //We want to create something to hold all of the gifs
            var gifHolder = $("<div>");
            gifHolder.addClass("gifs");

            //For each data element in the GIPHY JSON object, we want to add a caption for the GIF's rating
            //and the actual GIF itself. 
            for (var k = 0; k < response.data.length; k++) {

                var figure = $("<figure>");
                figure.addClass("float-left");
                var ratingCaption = $("<figcaption>");
                ratingCaption.addClass("ml-2");
                ratingCaption.text("Rating: " + response.data[k].rating.toUpperCase());
                var gifImg = $("<img >");
                gifImg.addClass("random-gif");

                //For each GIF, we want attributes to hold the still image and the animated image.
                gifImg.attr("src", response.data[k].images.fixed_height_still.url);
                gifImg.attr("alt", response.data[k].title);
                gifImg.attr("data-still", response.data[k].images.fixed_height_still.url);
                gifImg.attr("data-animated", response.data[k].images.fixed_height.url);

                //The default state for each GIF is the still image
                gifImg.attr("status", "still");

                //Put all of the gifs onto the page. 
                figure.append(ratingCaption);
                figure.append(gifImg);
                gifHolder.append(figure);
            }

            //The previously loaded GIFs will not be removed.
            $("#gif-display").prepend(gifHolder);
        });

    });

    //When a GIF is clicked, the GIF will animate and then back to still when the GIF is clicked again.
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

    //This creates the first four buttons from the initial topics array above.
    createButtons(topics);
});