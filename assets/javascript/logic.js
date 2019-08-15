var trainName = $("#trainName").val().trim();
var trainDestination = $("#trainDestination").val().trim();
var trainTime = $("#trainTime").val().trim();
var trainFrequency = $("#trainFrequency").val().trim();

var firebaseConfig = {
    apiKey: "AIzaSyALLVPzn8Pf4qi_JS2SG_GesHIFa5ICJpo",
    authDomain: "train-timer-e69c9.firebaseapp.com",
    databaseURL: "https://train-timer-e69c9.firebaseio.com",
    projectId: "train-timer-e69c9",
    storageBucket: "",
    messagingSenderId: "823586805028",
    appId: "1:823586805028:web:3e6b5d5dabef1a81"
  };

  firebase.initializeApp(firebaseConfig);

  

// initialize Firebase (lots of code)

// submit function
//      prevent default
//      create HTML elements for train to display in table
//      logic to calculate the next arriving train and how many minutes away it is (military time to regular time)
//      send the inputs to the database
//      That's pretty much it...
