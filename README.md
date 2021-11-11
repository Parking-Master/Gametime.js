# Gametime.js
A client-side multiplayer game library to make multiplayer games in less than 100 lines of code, using [PubNub's](https://pubnub.com) API.

## Welcome to Gametime.js!
Here, we will show you how to make a multiplayer JavaScript game in less the 100 lines of code using Gametime.js.<br>
But first, you'll need to [sign up for PubNub](https://dashboard.pubnub.com/signup) to use Gametime.js.

### Quickstart
###### Regular version
```
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Parking-Master/Gametime.js@latest/Gametime.js"></script>
```
###### Minified version
```
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Parking-Master/Gametime.js@latest/Gametime.min.js"></script>
```
##### <sup>Place the "script" tag in the "head" element.</sup>

\- [Download the regular file here]()<br>
\- [Download the minified file here]()

### Documentation
#### 1. Initialize Gametime.js
Before anything, you need to setup Gametime.js with PubNub.

> 1. [Sign up](https://dashboard.pubnub.com/signup) for PubNub
> 2. Go to "Apps" > Click "CREATE NEW APP"
> 3. Name your app
> 4. Get your **Publish / Subscribe** keys (Take note of them)

Take note of your Publish / Subscribe keys, because you need them for Gametime.js.

Next, you need to define your API keys in Gametime.js, using `set()`:
```javascript
gametime.set("key", "PUBLISH_KEY", "SUBSCRIBE_KEY");
```
Replace "PUBLISH_KEY" and "SUBSCRIBE_KEY" with your Publish / Subscribe keys.

Now you just need to define your [Game Channel]():
```javascript
gametime.set("channel", "channel-name");
```
###### The channel name will be the channel for players to send messages between the page.

Now you can make your game!

#### 2. How Gametime.js functions work
_All Gametime.js functions always start with "gametime"._<br>
Custom functions runned should **always** be [Pure and Defined JavaScript functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions).
#### 3. Using Gametime.js functions
Create a new event listener with `make()`:
```javascript
gametime.make("yourEvent");
```
This will make your event noticable through Gametime.js.

Define your new event by attaching it with `on()`:
```javascript
function yourFunction() {
    // Function that will run like a multiplayer game
}

gametime.on("yourEvent", yourFunction);
```
Now, you will be ready to run it.

To run it, use `run()`:
```javascript
gametime.run("yourEvent");
```

Open the browser in two-different windows / Devices, and try running the function.<br>
The function will run globally, so if you made _say a Car Game_, the car would drive on both pages.<br>
Causing it to be like a Real-Time Multiplayer game (_with pure JavaScript!_).

You can pass paramaters through the function too, using an `Array`:
```javascript
gametime.run("yourEvent", [param1, param2]);
```

#### 3. The example game
Here is a pre-built basic car game, showing how easy it is to make a multiplayer game, in less than 100 lines of _JavaScript_ code.

First, we'll initialize Gametime.js, make the events, and run the events on click of a button:
###### JavaScript
```javascript
// Set the keys and channel
gametime.set("key", "pub-x-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "sub-x-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
gametime.set("channel", "example123");

// Create the events
gametime.make("drive");
gametime.make("reverse");

let x, y;
var animate;
var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var carWidth = 65;
var carHeight = 105;
 
x = canvas.width / 2 - carWidth;
y = canvas.height / 2 - carHeight;

function driveCar() {
   context.clearRect(0, 0, canvas.width, canvas.height);
   context.beginPath();
   context.fillStyle = "#e9e9e9";
   context.fillRect(x, y, carWidth, carHeight);
   context.fill();
   
   animate = requestAnimationFrame(driveCar);
   x += 4;
}
function driveCar() {
   context.clearRect(0, 0, canvas.width, canvas.height);
   context.beginPath();
   context.fillStyle = "#e9e9e9";
   context.fillRect(x, y, carWidth, carHeight);
   context.fill();
   
   animate = requestAnimationFrame(driveCar);
   x += -3.5;
}
function stopCar(type) {
   if (type == "drive") {
     cancelAnimationFrame(driveCar);
   } else if (type == "reverse") {
     cancelAnimationFrame(reverseCar);
   }
}

gametime.on("drive", driveCar);
gametime.on("reverse", reverseCar);
gametime.on("stop", stopCar);
```
###### HTML
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Multiplayer game</title>
    <script src="https://cdn.jsdelivr.net/gh/Parking-Master/Gametime.js@latest/Gametime.js"></script>
  </head>
  <body>
    <button onmousedown="drive()" ontouchstart="drive()" onmouseup="stop('drive')" ontouchend="stop('drive')"stop>Drive</button>
    <button onmousedown="reverse()" ontouchstart="reverse()" onmouseup="stop('reverse')" ontouchend="stop('reverse')">Reverse</button>
    
    <canvas style="border: 1px solid lightgrey;" width="600" height="400"></canvas>
    <script>
      function drive() {
        gametime.run("drive");
      }
      function reverse() {
        gametime.run("reverse");
      }
      function stop(type) {
        gametime.run("stop", [type]);
      }
    </script>
  </body>
</html>
```

Open it in your browser, and try playing the multiplayer game!

### Next step: Customize it
> What will You build with Gametime.js?<br>
> Whatever it is, whether it is a:<br>
> Car game, Airplane game, Hockey game,<br>
> Etc. You can build it with Gametime.js!

Good luck!

### Other functions and APIs
#### Getting user UUID
