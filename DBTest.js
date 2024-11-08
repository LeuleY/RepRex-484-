var mongoose = require('mongoose'); //Requires mongoose and express at the minimum.
var express = require('express');
var app = express();

const atlasUri = "mongodb+srv://rforne2:WlXb99zcPPwVIiCx@Users.xvwlm.mongodb.net/RepRex_data?retryWrites=true&w=majority" //URL for accessing database

mongoose.connect(atlasUri) //Establishes connection to database using the above URL
.then(() => {
    console.log("Mongoose has successfully connected!");
})
.catch ((e) => {
    console.log("Could not connect to Mongoose: ", e);
});

const accountSchema = new mongoose.Schema({ //Schema used for creating new accounts
    username: String,
    password: String,
    email: String,
    workouts: {
        type: Array,
        default: []
    }
});
const workoutSchema = new mongoose.Schema({ //Schema used for creating new workouts
    dateTime: Date,
    reps: Number,
    weight: Number,
    workoutType: String
}, {
    versionKey: false //Version key not needed for workouts, but is helpful for accounts because they have an array
});

//The following two lines create mongoose models for the two collections, used for all operations in the database
const account = mongoose.model('account', accountSchema, "users");
const workout = mongoose.model('workout', workoutSchema, "workouts");

/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    READ THIS ENTIRE BLOCK BEFORE CONTINUING, I'M SERIOUS:
    THE ABOVE LINES ARE REQUIRED FOR CONNECTING TO MONGODB ATLAS AND CREATING THE TOOLS USED TO INTERFACE WITH IT.
    IN THEORY, ABOVE LINES WOULD GO INTO THE API/MIDDLE POINT SO THAT IT CAN DEAL WITH THE OPERATIONS/ALTER THE DATABASE
    THE BELOW LINES ARE FOR TESTING DIFFERENT OPERATIONS, SUCH AS CREATING, EDITING, DELETING, ETC. COMMENT/UNCOMMENT THEM AND RUN AT WILL.
    WARNING: IF YOU RUN ANY OF THE BELOW LINES, THEY WILL AFFECT OUR REAL DATABASE, SO BE CAREFUL.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

//NEW ENTRY TESTS: ----------------------------------------------------------------------------------------------------------------------------------------

var testUser = account.create({ //Creates a new user entry in the database
    username: "test2",
    password: "pass123",
    email: "test123@gmail.com",
    workouts: []
});

var testWorkout = workout.create({ //Creates a new workout entry in the database
    dateTime: Date.now(), //In theory, DateTime should always be initialized as the instant the entry is created
    reps: 12,
    weight: 4000,
    workoutType: "Squat"
})
//In the final database, creating a new workout should also add it's automatically created ID ("_id" attribute) to the logged in user's "workouts" array

//REMOVE DATA TESTS: ----------------------------------------------------------------------------------------------------------------------------------------

var removeId = ""; //The unique id (found in the _id field) of the entry to be deleted
account.findByIdAndDelete(removeId) //Removes a user account by the account's unique ID
.then(() => {
    console.log("Deleted account with user ID: ", removeId);
})
.catch ((e) => {
    console.log("Could not delete account with user ID: ", removeId, e);
});

var removeId = ""; //The unique id (found in the _id field) of the entry to be deleted
workout.findByIdAndDelete(removeId) //Removes a workout by the workout's unique ID
.then(() => {
    console.log("Successfully deleted workout with ID: ", removeId);
})
.catch ((e) => {
    console.log("Could not delete workout with ID number: ", removeId, e);
});
// //In the final database, deleting a workout must also delete it from the account holder's "workouts" array.

//EDIT DATA TESTS: ------------------------------------------------------------------------------------------------------------------------------------------

var editId = ""; //The unique id (found in the _id field) of the entry to be edited
var editContent = {
    password: "newpassword"
}
//In order to edit an entry in the database, create a new object with the fields you would like to edit
//For example, the above object will change the password in the entry. You can add as many different fields as needed

account.findByIdAndUpdate(editId, editContent) //Updates the content of the account based on the editContent field
.then(() => {
    console.log("Successfully edited account with ID: ", editId);
})
.catch ((e) => {
    console.log("Could not edit account with ID: ", editId);
});

var editId = ""; //The unique id (found in the _id field) of the entry to be edited
var editContent = {
    reps: 10,
    weight: 150
}
//For the workout edit, I will use an example of editing 2 fields at once for the entry. This will edit both the "reps" and "weight" fields of the workout

workout.findByIdAndUpdate(editId, editContent) //Updates the content of the account based on the editContent field
.then(() => {
    console.log("Successfully edited workout with ID: ", editId);
})
.catch ((e) => {
    console.log("Could not edit workout with ID: ", editId);
});

//READ DATA TESTS: ------------------------------------------------------------------------------------------------------------------------------------------

async function readTest(){ //Because of how it works, functions that retrieve data must be in asynchronous functions, so that "await" can be used.
    var queryId = "" //The unique id (found in the _id field) of the entry to be retrieved 
    var returnedAccount = await account.find({_id: queryId}); //Finds the account by ID and inserts it's data into an object
    //Entire entry is returned into the variable
    console.log(returnedAccount); 
    console.log(returnedAccount[0].password); //How to access specific attributes of the entry
    console.log(returnedAccount[0].workouts);
    //Since what it returns is an array, must use "[0]" to specify that you are accessing the value in the first index
}
readTest();