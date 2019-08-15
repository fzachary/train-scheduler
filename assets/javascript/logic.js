// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAXeVIp3emOK86_qA8UZGO5BqGvB3kRwRI",
    authDomain: "train-scheduler-b66b5.firebaseapp.com",
    databaseURL: "https://train-scheduler-b66b5.firebaseio.com",
    projectId: "train-scheduler-b66b5",
    storageBucket: "",
    messagingSenderId: "786759938917",
    appId: "1:786759938917:web:1f0edfafa749338e"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// VARIABLES
var database = firebase.database();

// FUNCTIONS & EVENTS
$(document).ready(function() {
    console.log("ready");
});

// Button for adding trains
$("#submit-button").on("click", function(event) {

    // Prevent default
    event.preventDefault();

    // Establish variables from grabbing user input
    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#trainDestination").val().trim();
    var trainStart = $("#trainTime").val().trim();
    var trainFrequency = $("#trainFrequency").val().trim();
    var trainFrequencyInt = parseInt($("#trainFrequency").val().trim());
    console.log(trainFrequencyInt);

    // "Temporary" object for holding data
    var trainObj = {
        name: trainName,
        destination: trainDestination,
        firstTrain: trainStart,
        frequency: trainFrequency
    };

     // Upload to the database
    database.ref().push(trainObj);

    // Log everything to the console
    console.log(trainObj.name);
    console.log(trainObj.destination);
    console.log(trainObj.firstTrain);
    console.log(trainObj.frequency);

    alert("Train successfully added");

    // Clear text boxes
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#trainTime").val("");
    $("#trainFrequency").val("");

    

    // Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

    // Store everything into a variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().firstTrain;
    var trainFrequency = childSnapshot.val().frequency;

    // Log info to the console
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFrequency);

    // Train start pushed back 1 year to make sure is is before current time
    var trainStartConverted = moment(trainStart, "HH:mm").subtract(1, "years");
    console.log(trainStartConverted);

    // The current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // The difference between the times
    var diffTime = moment().diff(moment(trainStartConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequencyInt;
    console.log(tRemainder);

    // Minutes until next train
    var tMinutesTillTrain = trainFrequencyInt - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    var markUp = "<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainStart + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>";

    // Create HTML elements for the table
    $("#train-table").append(markUp);
});

});
    



// submit function
//      prevent default
//      create HTML elements for train to display in table
//      logic to calculate the next arriving train and how many minutes away it is (military time to regular time)
//      send the inputs to the database
//      That's pretty much it...
