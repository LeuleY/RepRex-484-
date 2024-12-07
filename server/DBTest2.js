import { alertClasses } from '@mui/material';
//import {Mongoose} from 'mongoose';
import {createRequire} from 'module';
var require = createRequire(import.meta.url);
var mongoose = require('mongoose'); //Requires mongoose and express at the minimum.
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
   extended: false
}));

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
    distance: Number,
    duration: Number,
    incline: Number,
    workoutType: String
}, {
    versionKey: false //Version key not needed for workouts, but is helpful for accounts because they have an array
});
//For all workouts, dateTime and workoutType should be given
//For weight based workouts, reps and weight would be given as well
//For cardio based workouts, duration, incline, and distance would be given as well (Incline possibly only for treadmill workouts)
//Duration would be in minutes and distance possibly in miles

//The following two lines create mongoose models for the two collections, used for all operations in the database
const account = mongoose.model('account', accountSchema, "users");
const workout = mongoose.model('workout', workoutSchema, "workouts");

//BELOW ARE THE FUNCTIONS THAT WOULD DEAL WITH DATA IN OUR PROGRAM. THESE WOULD BE CONTAINED IN THE API AND CALLED BY FRONT-FACING FILES.

async function createWorkoutWeights(reps, weight, workoutType){ //Creates a new weight workout and adds it to the database
    var testWorkout = await workout.create({
        dateTime: Date.now(),
        reps: reps,
        weight: weight,
        workoutType: workoutType
    });
    addWorkoutToUser(testWorkout._id); //Calls the function that adds the newly created workout to the user's account
}
async function createWorkoutCardio(distance, duration, incline, workoutType){ //Creates a new cardio workout and adds it to the database
    var testWorkout = await workout.create({
        dateTime: Date.now(),
        distance: distance,
        duration: duration,
        incline: incline,
        workoutType: workoutType
    });
    addWorkoutToUser(testWorkout._id); //Calls the function that adds the newly created workout to the user's account
}
async function addWorkoutToUser(workoutId){ //Adds the newly created workout to the user's account
    var acc = await account.findById('672e5fa378fd070b668eab10'); //(NOTE #1)
    acc.workouts.push(workoutId);
    await acc.save();
}
//NOTE:
//RIGHT NOW, THE USER ACCOUNT THAT THE WORKOUT IS ADDED TO IS HARD CODED (NOTE #1). IN LIVE LAUNCH, THE USER'S ACCOUNT ID WOULD IDEALLY BE STORED SOMEWHERE LOCALLY
//FOR THE MIDDLEWARE TO ACCESS ANY TIME WHEN DATA NEEDS TO BE RETRIEVED OR SENT TO THE DATABASE.
//ANOTHER POSSIBLE SOLUTION IS TO CREATE THIS "acc" VARIABLE ON LOGIN AND STORE THAT INSTEAD, BUT I PREFER TO STORE THE ID
app.post('/account/register', (req, res) =>{
    registerAccount(req.body.username, req.body.password, req.body.email);
    res.status(200).redirect("https://reprex-484.onrender.com/login");
});
app.post('/account/login', async (req, res) =>{
    if(await login(req.body.username, req.body.password))
        res.status(200).redirect("https://reprex-484.onrender.com/cards");
    else
        res.status(200).redirect("https://reprex-484.onrender.com/login");
});
async function registerAccount(user, pass, email){ //Registers new user's account. If no username is passed, value should be sent as "null"
    var isTaken = await account.find({username: user}); //Checks if the user's selected username is unique
    if(isTaken == ""){ //Only creates the account if no account with the given username is found
        account.create({ //Creates the new account with the given details and an empty workouts array
            username: user,
            password: pass,
            email: email,
            workouts: []
        })
        //User could possibly be logged in after? Or at least redirected to login page
    }
}
async function login(username, pass){ //Attempts to log in the user using the given credentials. Returns true if valid, false if invalid.
    var result = await account.find({username: username, password: pass});
    if(result.length >= 1)
        return true;
    else
        return false;
}
function loginSubmit(form, username, pass){ //This is the function actually called by the form.
    login(form, username, pass).then(res => res ? form.submit() : null);
    return false;
}
//Returning values from async functions is a pain in the ass, it's like they don't give a single shit about me using "await".
//I have to do it in this weird way where it uses this function to call the login function from the form... hopefully this works.
//https://stackoverflow.com/questions/55295888/async-function-must-return-a-boolean-value for reference.
//<form method="POST" onsubmit="return loginSubmit(this, username, pass);"> must go into the html form.
//NOTE: MAY NOT HAVE TO PASS IN USERNAME AND PASSWORD THROUGH THIS, INSTEAD MIGHT HAVE TO DIRECTLY GET IT FROM HTML IN BODY OF "loginSubmit" FUNCTION.
//Praying to God this works, I really don't want to try and find another solution.

async function deleteWorkout(workoutID){ //Deletes the given workout from the user's account
    var workoutToDelete = await workout.findById(workoutID) //Finds the specified workout and saves it's ID as an object
    var userAcc = await account.findById('672e5fa378fd070b668eab10');
    var spliced = userAcc.workouts;
    spliced.splice(userAcc.workouts.indexOf(workoutToDelete._id), 1); //Removes the specified workout ID from copy of the user's array
    var updatedArr = {
        workouts: spliced
    }
    account.findByIdAndUpdate('672e5fa378fd070b668eab10', updatedArr) //Replaces the user's workouts array with spliced version
    .then(() => {
        console.log("Successfully removed workout from user array");
    })
    .catch ((e) => {
        console.log("Could not remove workout from user array");
    });
    workout.findByIdAndDelete(workoutID) //Deletes the workout from the database
    .then(() => {
        console.log("Successfully deleted workout from database");
    })
    .catch((e) => {
        console.log("Error: Workout could not be removed from database");
    });
}
//NOTE: JUST LIKE WITH THE "addWorkoutToUser" FUNCTION, THE USER'S ID SHOULD NOT BE HARD CODED AND SHOULD BE OBTAINABLE LOCALLY AT WILL BY FUNCTIONS IN MIDDLEWARE

//TEST CASES: LIKE BEFORE, THESE WILL EFFECT OUR REAL DATABASE! BE CAREFUL AND COMMENT OUT EVERYTHING YOU DON'T WANT TO RUN. DOUBLE CHECK BEFORE RUNNING

//createWorkoutCardio(5, 50, 0, "running");
//Creates a "running" workout, with 5 miles of distance, 50 minute duration, and 0 incline

//createWorkoutWeights(10, 100, "Bench Press");
//Creates a "Bench Press" workout, with 10 reps and 100 lbs of weight

//registerAccount("rforne2", "testpassword123", "tester@gmail.com");
//Registers a new account with the username "rforne2", password "testpassword123", and email "tester@gmail.com"

//console.log(login("rforne", "newpassword"));
//Logs in using the account username "rforne" and password "newpassword"

//deleteWorkout('6737a22411d43ac63aae20f7');
//Deletes workout that has the given ObjectID. Additionally, deletes the entry from the user's workouts array
app.listen(8000);
