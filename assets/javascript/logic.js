// Firebase config info
const firebaseConfig = {
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

// Global Variables
const database = firebase.database();

// $(document).ready(function() {
// });

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
    // console.log(trainFrequencyInt);

    // "Temporary" object for holding data
    var trainObj = {
        name: trainName,
        destination: trainDestination,
        firstTrain: trainStart,
        frequency: trainFrequency
    };

     // Upload to the database
    database.ref().push(trainObj);

    // Alert the user that the train was added
    alert("Train successfully added");

    // Clear text boxes
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#trainTime").val("");
    $("#trainFrequency").val("");
});

    

    // Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot) {

    // Store the results into a variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().firstTrain;
    var trainFrequency = childSnapshot.val().frequency;

    // Train start pushed back 1 year to make sure is is before current time
    var trainStartConverted = moment(trainStart, "HH:mm").subtract(1, "years");
    // console.log(trainStartConverted);

    // The current time
    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A"));

    // The difference between the times
    var diffTime = currentTime.diff(moment(trainStartConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    // console.log(tRemainder);

    // Minutes until next train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    // console.log("MINUTES UNTILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));
    
    // Create a new variable
    var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(moment(nextTrain).format("hh:mm A")),
    $("<td>").text(tMinutesTillTrain)
    );

    // Append the variable to the table body
    $("#train-table > tbody").append(newRow);
});
