var topics =["Umineko", "Sailor Moon", "Steven Universe", "Dragonball", "HunterxHunter", "The Last Airbender", "Attack on Titan", "One Punch Man"]
var apiKey = "15e9065e0a2343b986b681e2b49fd50f";
var protocol = "https://"
var domain = "api.giphy.com"
var path = "/v1/gifs/search"
var limit = 10;
var content = document.getElementById("content");

//initializes buttons once page is ready for them.
$(document).ready(function(){
 for (var i = 0; i < topics.length; i++) {
   renderButton(topics[i]);
  }
  $("#buttonarea").on("click", "button", function(){
    buildURL(this.id);
  });
  $("#newtopic").on("keypress", function(e){
    if(e.keyCode == 13){ 
      e.preventDefault();
      var newTopic = this.value;
      renderButton(newTopic);
    }
  });
});
//listens for button clicks. Needs to be called everytime a button is added





//constructs the API URL and initializes the render function
function buildURL(topic){
  console.log(topic)
  queryURL = protocol + domain + path + "?api_key=" + apiKey + "&q=" + topic + "&limit=" + limit;
  $("#content").empty();
  console.log(queryURL)
  renderContent();
}

//render sidebar buttons
function renderButton(topic){
  $('#buttonarea').append("<button class='btn btn-success' type='submit' id='" +
    topic + "'>" + topic + "</button>");
}

// $.ajax({
//   url: queryURL,
//   method: "GET"
// })
//render search content
function renderContent(){
  $.get(queryURL).done(function(response) { 
    queryCall(response)
  });


}


//builds the gif grid when the ajax function is called
function queryCall(gifData){
  $.each(gifData.data, function(i){
    if(gifData.data[i].images.fixed_height.url != undefined){
      $(content).append("<div class='clearfix col-md-10 col-lg-6'><p>Rating: " + 
      gifData.data[i].rating + "</p><img class='still' src='" + 
      gifData.data[i].images.fixed_height_still.url + "' id='" + i + "'></div>");
    }
  });
  imgSwap(gifData);
}

//must be called after queryCall or will not work
function imgSwap(gifData){
  $("img").on("click", function(){
    if($(this).hasClass("still") == true){
      $(this).attr("src", gifData.data[this.id].images.fixed_height.url);
      $(this).toggleClass("still");
    }
    else{
      $(this).attr("src", gifData.data[this.id].images.fixed_height_still.url);
      $(this).toggleClass("still");
    } 
  });   
}