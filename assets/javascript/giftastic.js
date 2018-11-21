$(document).ready(function() {
    
    var topics = ["Pokemon", "Final Fantasy", "God of War", "Sonic"];

    function createButtons(arr){
        $("#buttons").empty();
        for (var i = 0; i < arr.length; i++){
            var newBtn = $("<button>");
            newBtn.addClass("button gif-button");         
            newBtn.text(arr[i]);
            $("#buttons").append(newBtn);
        }
    }

    createButtons(topics);
});