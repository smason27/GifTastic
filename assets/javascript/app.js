
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
        console.log(categories)
    })

    $(document).on("click", ".categoryButton", function () {
        $("gifs").empty();
        var apiKey = "&limit=10&api_key=xXacPubhr3fC6JSlSV5faFaG1J7i6vf2"
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + 
        $(this).attr("data-name") + apiKey

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for(let key of response.data) {
                // console.log(key.images.fixed_height)
                var responseDiv = $("<div class='newGifs'>")
                var rating = key.rating
                var gifImg = key.images.fixed_height.url
                var newGifImage = $("<img>").attr("src", gifImg);
                console.log(gifImg)
                console.log(rating)
                
                $("responseDiv").append(rating);
                $("responseDiv").append(newGifImage);
                $("#gifs").append(responseDiv);
            }
            
        })
    })

    createButton();
})
console.log("hello")
