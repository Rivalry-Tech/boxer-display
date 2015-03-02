//Gets the boxers' callout count, eventually

$(document).ready(function(){
  setInterval(function(){
    $("#leaderboard-list").empty();
    loadLeaderboard();
    console.log("leaderboard")
  }, 20000)
  var $fightSelect = $('#fight'), $fighter1Id = "hWJ5Aw9V8g", $fighter2Id = "CGxD5yOqbz", $fighter3Id = "nL9Ln5esPy", $fighter1votes = $("#fighter1votes"), 
  $fighter2votes = $("#fighter2votes"), $fighter3votes = $("#fighter3votes");
  /*$fightSelect.on('change', function() {
    var splitArray = this.value.split(",");
    $fighter1Id = splitArray[0].substring(2, 12);
    $fighter2Id = splitArray[1].substring(1, 11);
    loadAjaxFromRivalry($fighter1Id, $fighter2Id);
    setInterval(function() {
      updateCalloutCounts($fighter1votes, $fighter1Id);
      updateCalloutCounts($fighter2votes, $fighter2Id);
    }, 5000)
  });*/
  setInterval(function() {
    updateCalloutCounts($fighter1votes, $fighter1Id);
    updateCalloutCounts($fighter2votes, $fighter2Id);
    updateCalloutCounts($fighter3votes, $fighter3Id);
  }, 5000)
});

function loadLeaderboard() {
  $.ajax({
    // the URL for the request
    url: "http://rivalry-api.herokuapp.com/teams/Charity",

    // the data to send (will be converted to a query string)
    data: {},

    // whether this is a POST or GET request
    type: "GET",

    // the type of data we expect back
    dataType : "json",

    // code to run if the request succeeds;
    // the response is passed to the function
    success: function( json ) {
      var ul = $("#leaderboard-list");
      $.each(json, function(i){
        li = $("<li />").text(this["name"].substring(1, this["name"].length)).appendTo(ul);
        span = $("<span />").text(this["calloutCount"]).appendTo(li);
      });
    },

    // code to run if the request fails; the raw request and
    // status codes are passed to the function
    error: function( xhr, status, errorThrown ) {
        // alert( "Sorry, there was a problem!" );
        // console.log( "Error: " + errorThrown );
        // console.log( "Status: " + status );
        // console.dir( xhr );
    },

    // code to run regardless of success or failure
    complete: function( xhr, status ) {
      console.log( "The request is complete!" );
      // return games;
    }
  })
}

function loadAjaxFromRivalry(fighter1Id, fighter2Id, fighter3Id) {
  $.ajax({
    // the URL for the request
    url: "http://rivalry-api.herokuapp.com/teams/Charity",

    // the data to send (will be converted to a query string)
    data: {},

    // whether this is a POST or GET request
    type: "GET",

    // the type of data we expect back
    dataType : "json",

    // code to run if the request succeeds;
    // the response is passed to the function
    success: function( json ) {

      var fighter1, fighter2;

      json.forEach(function(fighter){
        if (fighter.objectId === fighter1Id){
          fighter1 = fighter;
        } else if (fighter.objectId === fighter2Id) {
          fighter2 = fighter;
        } else {
          return;
        }
      });
      $("#fighter1name").text(fighter1["name"].substring(1, fighter1["name"].length));
      $("#fighter1charity").text(fighter1["callout"])
      $("#fighter1img").attr("src", fighter1.audioFile)
      $("#fighter1votes").text(fighter1["calloutCount"]);
      $("#fighter2name").text(fighter2["name"].substring(1, fighter2["name"].length));;
      $("#fighter2charity").text(fighter2["callout"]);
      $("#fighter2img").attr("src", fighter2.audioFile)
      $("#fighter2votes").text(fighter2["calloutCount"]);
    },

    // code to run if the request fails; the raw request and
    // status codes are passed to the function
    error: function( xhr, status, errorThrown ) {
        // alert( "Sorry, there was a problem!" );
        // console.log( "Error: " + errorThrown );
        // console.log( "Status: " + status );
        // console.dir( xhr );
    },

    // code to run regardless of success or failure
    complete: function( xhr, status ) {
      console.log( "The request is complete!" );
      // return games;
    }
  });}

function updateCalloutCounts($element, $teamId) {
    $.ajax({
      // the URL for the request
      url: "http://rivalry-api.herokuapp.com/teams/" + $teamId + "/get_callouts",

      // the data to send (will be converted to a query string)
      data: {},

      // whether this is a POST or GET request
      type: "GET",

      // the type of data we expect back
      dataType : "json",

      // code to run if the request succeeds;
      // the response is passed to the function
      success: function( json ) {
        console.log(json.name)
        $element.text(json.calloutCount);
      },

      // code to run if the request fails; the raw request and
      // status codes are passed to the function
      error: function( xhr, status, errorThrown ) {
          // alert( "Sorry, there was a problem!" );
          // console.log( "Error: " + errorThrown );
          // console.log( "Status: " + status );
          // console.dir( xhr );
      },

      // code to run regardless of success or failure
      complete: function( xhr, status ) {
        // return games;
      }
    });
}