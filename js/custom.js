//Gets the boxers' callout count, eventually

$(document).ready(function(){

  $.ajax({
    // the URL for the request
    url: "http://rivalry-api.herokuapp.com/teams/Fighter",

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

      var $fightSelect = $('#fight');
      $fightSelect.on('change', function() {
        var splitArray = this.value.split(","),
        fighter1Id = splitArray[0].substring(2, 12),
        fighter2Id = splitArray[1].substring(1, 11),
        fighter1, fighter2;

        json.forEach(function(fighter){
          if (fighter.objectId === fighter1Id){
            fighter1 = fighter;
          } else if (fighter.objectId === fighter2Id) {
            fighter2 = fighter;
          } else {
            return;
          }
        });

        console.log(fighter1.name);
        console.log(fighter2.name);
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
  });
});
