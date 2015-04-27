(function () {

	app.exports.xboxLogin = function () {

        if (typeof Windows !== 'undefined') {

            // Sign in the user into Xbox Live
            var user = Microsoft.Xbox.Services.System.User.signInAsync(null).then(
            function(e)
            {
                // Get the user's gamertag
                var gamerTag = e.gamertag;
                var context = Microsoft.Xbox.Services.XboxLiveContext(e);
                context.profileService.getUserProfileAsync(e.xboxUserId).then(
                function(e)
                {
                    // Get the gamerpic
                    var gamerPicURI = e.gameDisplayPictureResizeUri;
                    // Set the UI
                    FlightArcade.setXboxUI(gamertag, gamerPicURI);

                });
            });
        }
	}
}