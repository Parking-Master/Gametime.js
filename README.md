# Gametime.js
A client-side multiplayer game library to make multiplayer games in less than 100 lines of code, using [PubNub's](https://pubnub.com) API.

## Welcome to Gametime.js!
Here, we will show you how to make a multiplayer JavaScript game in less the 100 lines of code using Gametime.js.<br>
But first, you'll need to [sign up for PubNub](https://dashboard.pubnub.com/signup) to use Gametime.js.

### Quickstart
###### Regular version
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Parking-Master/Gametime.js@latest/Gametime.js"></script>
```
###### Minified version
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Parking-Master/Gametime.js@latest/Gametime.min.js"></script>
```
##### <sup>Place the "script" tag in the "head" element.</sup>

\- [Download the regular file here](https://parking-master.github.io/Gametime.js/downloads/download.html?download=js)<br>
\- [Download the minified file here](https://parking-master.github.io/Gametime.js/downloads/download.html?download=min)

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

Now you just need to define your [Game Channel](#game-channel):
```javascript
gametime.set("channel", "channel_name");
```
###### The channel name will be the channel for players to send messages between the page.

_Now you can make your game!_

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

#### 4. The example app
Here is a pre-built basic chat room, showing how easy it is to make a multiplayer game / chat application, in less than 50 lines of _JavaScript_ code.

First, we'll initialize Gametime.js, make the events, and run the events on click of a button:
###### HTML
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Gametime.js Multiplayer Chat</title>
    <style>
      body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
      #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; } #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
      #input:focus { outline: none; } #form button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }
      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages > li { padding: 0.5rem 1rem; }
      #messages > li:nth-child(odd) { background: #efefef; }
      #input:disabled, form button:disabled { opacity: 0.5; }
    </style>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Parking-Master/Gametime.js@latest/Gametime.js"></script>
  </head>
  <body>
    <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" autocomplete="off" /><button class="send">Send</button><button class="disconnect">Disconnect</button>
    </form>
    <script>
      gametime.set("key", "pub-x-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "sub-x-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
      gametime.set("channel", "example-channel123");

      gametime.make("message");

      function sendMessage(msg) {
        var item = document.createElement("li");
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
        var chatHistory = localStorage["history"];
        var noBug = chatHistory === "" ? "" : ",";
        localStorage.setItem("history", (chatHistory + noBug + encodeURIComponent(msg)).split(",").toString());
      }

      gametime.on("message", sendMessage);
      
      var messages = document.getElementById("messages");
      var form = document.getElementById("form");
      var input = document.getElementById("input");

      if (!localStorage["history"]) {
        localStorage.setItem("history", "");
      } else {
        for (var i = 0; i < localStorage["history"].split(",").length; i++) {
          var item = document.createElement("li");
          item.textContent = decodeURIComponent(localStorage["history"].split(",")[i]);
          messages.appendChild(item);
          window.scrollTo(0, document.body.scrollHeight);
        }
      }
      
      form.onsubmit = function(event) {
        event.preventDefault();
        if (input.value) {
          gametime.run("message", [input.value]);
          input.value = "";
        }
      };

      document.querySelector(".disconnect").onclick = function(event) {
        event.preventDefault();
        if (confirm("Are you sure?")) {
          this.textContent = "Reconnect";
          gametime.disconnect();
          localStorage.removeItem("history");
          messages.innerHTML = "";
          document.querySelector(".disconnect").disabled = "disabled", document.querySelector(".send").disabled = "disabled", input.disabled = "disabled";
        }
      };
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
<details>
<summary>Getting user UUID</summary>

```javascript
gametime.user.id
// "81d11559-560b-4d62-a9a7-f90d364e2bfd"
```
</details>

<details>
<summary>Getting current Channel</summary>

```javascript
gametime.channel
// "example123"
```
</details>

<hr>

## Help / Support
### Definitions
#### Game Channel
The "Channel" The specific player is on (page), that will recieve the messages.<br>
It can be set with `gametime.set`: `gametime.set("channel", "channel-name")`

#### PubNub
An API that lets you send websocket connections, between the server and client for making chat applications, etc.

### Support
Contact us at [parkingmaster@email.com](mailto:parkingmaster@email.com)

## License
**MIT** | Licensed under the [MIT License](https://mit-license.org)<br>
https://gihub.com/Parking-Master/Gametime.js/blob/main/LICENSE
