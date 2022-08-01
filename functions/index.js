const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
  
});

exports.generateThumbnail = functions.storage.bucket("foo.appspot.com").object().onFinalize(async (object) => {
    // content does not matter for this bug     
    functions.logger.info("Hello logs!", {structuredData: true});
    console.log("test")
    return false;
});
