
// IDS = GIF, GIFINPUT, GENERATEBUTTON

// api = https://api.giphy.comGET/v1/gifs/search
// apikey = &api_key=xXacPubhr3fC6JSlSV5faFaG1J7i6vf2
// apiQuery = &q=

$(document).ready(function () {
    var categories = ["racoons", "dogs", "golf", "snowboarding", "bears", "the office", "basketball", "video games", "giraffes"]

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
    })

    $(document).on("click", ".categoryButton", function () {
        var rating = $("#searchRating").val();
        console.log(rating)
        var apiKey = "&api_key=xXacPubhr3fC6JSlSV5faFaG1J7i6vf2"
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + 
        $(this).attr("data-name") + "&limit=10&" + apiKey + "&rating=" + rating

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            $("#leftGifs").empty();
            $("#rightGifs").empty();
                for(var i = 0; i < response.data.length; i++){
                var leftGif = $("#leftGifs")
                var rightGif = $("#rightGifs")
                var gifRating = response.data[i].rating
                // IF STATEMENT TO CHECK RATING IS === RATING SEARCHED BY
                // if(gifRating !== rating) {
                // }
                console.log(gifRating)
                var gifImg = response.data[i].images.fixed_height_still.url
                var gifStill = response.data[i].images.fixed_height_still.url
                var gifAnimate = response.data[i].images.fixed_height.url
                var gifDiv = $("<img>")
                gifDiv.attr("src", gifImg)
                gifDiv.attr("data-state", "still").attr("data-still", gifStill).attr("data-animate", gifAnimate)
                gifDiv.addClass("gifImage")
                if(i % 2 === 0){
                    leftGif.append("<div class='rating'>" + gifRating + "</div>")
                    leftGif.append(gifDiv)  
                } else{
                    rightGif.append("<div class='rating'>" + gifRating + "</div>")
                    rightGif.append(gifDiv)  

                }
            }

            $(".gifImage").on("click", function() {
                var state = $(this).attr("data-state");
                var animateState = $(this).attr("data-animate")
                var stillState = $(this).attr("data-still")
        
                if(state === "still") {
                    $(this).attr("src", animateState);
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", stillState);
                    $(this).attr("data-state", "still")
                }
            })
            
        })
        
    })
    

   

    createButton();
})

