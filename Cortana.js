/*global Windows:true, FlightArcade: true */

// Handle Cortana activation adding the event listener before DOM Content Loaded
// parse out the command type and call the respective game APIs

(function() {

  if (typeof Windows !== 'undefined') {

    Windows.UI.WebUI.WebUIApplication.addEventListener("activated", function (args) {

      var activation = Windows.ApplicationModel.Activation;
      
      if (args.kind === activation.ActivationKind.voiceCommand) {

        var speechRecognitionResult = args.result;
        var textSpoken = speechRecognitionResult.text;

        // Determine the command type {level, waypoint} defined in vcd
        if (speechRecognitionResult.rulePath[0] === "level") {

          // Determine level {tin, bronze, gold}
          if (textSpoken.search("tin") >= 0) {
            toastNotification("Achievement unlocked 100G - Using Cortana");
            FlightArcade.startBronzeLevel();
          }
          else if (textSpoken.search("bronze") >= 0) {
            toastNotification("Achievement unlocked 100G - Using Cortana");
            FlightArcade.startTinLevel();
          }
          else if (textSpoken.search("gold") >= 0) {
            toastNotification("Achievement unlocked 100G - Using Cortana");
            FlightArcade.startGoldLevel();
          }
          else {
            // No level specified by user
          }

        }
        else if (speechRecognitionResult.rulePath[0] === "waypoint") {

          // Call waypoints api
          
          FlightArcade.goToNamedPosition('alphaBravo');

        }
      }
    });
  }

})();