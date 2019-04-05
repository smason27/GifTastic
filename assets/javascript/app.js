
// IDS = GIF, GIFINPUT, GENERATEBUTTON

// api = https://api.giphy.comGET/v1/gifs/search
// apikey = &api_key=xXacPubhr3fC6JSlSV5faFaG1J7i6vf2
// apiQuery = &q=

$(document).ready(function () {
    var categories = ["racoons", "dogs", "golf", "snowboarding", "bears", "the office", "basketball", "video games", "giraffes"]
    var gifAnimate;
    function createButton() {
        for (i = 0; i < categories.length; i++) {
            var button = $("<button>");
            button.addClass("categoryButton").attr("data-name", categories[i]).html(categories[i]);
            $("#generatedButton").append(button)
        }
        
    }

    $("#addGif").on("click", function () {
        event.preventDefault();
        var newCategory = $("#gifInput").val();
        categories.push(newCategory);
        $("#generatedButton").empty();
        createButton();
        console.log(categories)
    })

    $(document).on("click", ".categoryButton", function () {
        $("#gifs").empty();
        var apiKey = "&limit=10&api_key=xXacPubhr3fC6JSlSV5faFaG1J7i6vf2"
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + 
        $(this).attr("data-name") + apiKey

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var newGif = $("#gifs")
            for(let key of response.data) {
                var rating = key.rating
                var gifImg = key.images.fixed_height_still.url
                var gifStill = key.images.fixed_height_still.url
                gifAnimate = key.images.fixed_height.url
                var gifDiv = $("<img>")
                gifDiv.attr("src", gifImg)
                gifDiv.attr("data-state", "still").attr("data-still", gifStill).attr("data-animate", gifAnimate)
                gifDiv.addClass("gifImage")
                console.log(gifImg)
                console.log(rating)
                newGif.append("<div class='rating'>" + rating + "</div>")
                newGif.append(gifDiv)    
                console.log(gifImg)
            }
            
        })
    })

    $("#gifs").on("click", ".gifImage", function() {
        var state = $(this).attr("data-state");

        if(state === "still") {
            $(this).attr("src", gifAnimate);
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", "data-still");
            $(this).attr("data-state", "still")
        }
    })

    createButton();
})
console.log("hello")
