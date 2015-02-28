//Gets the boxers' callout count, eventually

$(document).ready(function(){
  $.ajax({
    // the URL for the request
    url: "http://rivalry-api.herokuapp.com/games",

    // the data to send (will be converted to a query string)
    data: {},

    // whether this is a POST or GET request
    type: "GET",

    // the type of data we expect back
    dataType : "json",

    // code to run if the request succeeds;
    // the response is passed to the function
    success: function( json ) {
      console.log(json);
      var $select = $("#games");
      $.each(json, function(i, val){
        var optionText = json[i]["awayteam/_text"] + " at " + json[i]["hometeam/_text"];
        $select.append($('<option />', {value: (i), text: optionText}));
      });
      $select.on('change', function(){
        var game = json[this.value];
        console.log(game);
        if (game["homePrimaryColor"] === undefined){
          $("#home").css("background-color", "#111");
          $("#home").css("color", "white");
        } else {
          $("#home").css("background-color", game["homePrimaryColor"]);
          $("#home").css("color", game["homeSecondaryColor"]);
        };
        if (game["awayPrimaryColor"] === undefined){
          $("#away").css("color", "#111");
          $("#away").css("background-color", "white");
        } else {
          $("#away").css("background-color", game["awayPrimaryColor"]);
          $("#away").css("color", game["awaySecondaryColor"]);
        };
        $("#homename").html('<span id="homerank"></span>' + game["hometeam/_text"] + '<span id="homerecord"></span>');
        $("#awayname").html('<span id="awayrank"></span>' + game["awayteam/_text"] + '<span id="awayrecord"></span>');
        $("#homerank").text(game["homerank"]);
        $("#awayrank").text(game["awayrank"]);
        $("#homerecord").text(game["homerecord"]);
        $("#awayrecord").text(game["awayrecord"]);
        if (game["homescore"] === undefined){
          $("#homescore").text("0");
        } else {
          $("#homescore").text(game["homescore"]);
        }
        if (game["awayscore"] === undefined){
          $("#awayscore").text("0");
        } else {
          $("#awayscore").text(game["awayscore"]);
        }
        if (game["awayCalloutCount"] === undefined){
          $("#awayCalloutCount").text("0");
        } else {
          $("#awayCalloutCount").text("Callouts: " + game["awayCalloutCount"]);
        }
        if (game["homeCalloutCount"] === undefined){
          $("#homeCalloutCount").text("0");
        } else {
          $("#homeCalloutCount").text("Callouts: " + game["homeCalloutCount"]);
        }
        $("#status").html("Game time: " + game["status"]);
      });
    },

    // code to run if the request fails; the raw request and
    // status codes are passed to the function
    error: function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    },

    // code to run regardless of success or failure
    complete: function( xhr, status ) {
      console.log( "The request is complete!" );
      return games;
    }
  });
});
