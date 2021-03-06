/**
  * @license
  * Copyright (c) 2021 Parking-Master / (Gametime.js)
  * Licensed under the MIT License (https://mit-license.org)
  * More license and copyright information at https://github.com/Parking-Master/Gametime.js/blob/main/LICENSE
*/
function setCookie(e, n, t) {
    var i = "";
    if (t) {
        var o = new Date;
        o.setTime(o.getTime() + 24 * t * 60 * 60 * 1e3), i = "; expires=" + o.toUTCString()
    }
    document.cookie = e + "=" + (n || "") + i + "; path=/"
}

function getCookie(e) {
    for (var n = e + "=", t = document.cookie.split(";"), i = 0; i < t.length; i++) {
        for (var o = t[i];
            " " == o.charAt(0);) o = o.substring(1, o.length);
        if (0 == o.indexOf(n)) return o.substring(n.length, o.length)
    }
    return null
}
var pubnub;
window.addEventListener("beforeunload", (() => {
    setCookie("pubnub-time-token", `${(new Date).getTime()}0000`, 10)
})), window.gametime = {}, gametime.onconnect = null, gametime.ondisconnect = null, window.gametime.events = [], window.gametime.events.functions = [], gametime.connected = !1, gametime.set = function(e, n, t) {
    return function(e, n, t) {
        if ("key" == e) {
            let e = n,
                u = t;
            var i = document.createElement("script");
            i.src = "https://cdn.pubnub.com/sdk/javascript/pubnub.4.21.7.min.js", document.body.appendChild(i);
            var o = setInterval((function() {
                if ("undefined" != typeof PubNub) {
                    clearInterval(o);
                    const n = PubNub.generateUUID();
                    pubnub = new PubNub({
                        publishKey: e,
                        subscribeKey: u,
                        uuid: n
                    }), gametime.user = {}, gametime.user.id = n;
                    pubnub.addListener({
                        message: function(e) {
                            new Function("(" + decodeURIComponent(e.message) + ")();")()
                        },
                        presence: function(e) {
                            console.log(e.uuid)
                        }
                    }), setTimeout((function() {
                        console.info("%cGametime.js connecting...", "font-family: Arial, helvetica, sans-serif;");
                        const e = encodeURIComponent('function(){console.info("%cGametime.js successfully connected!","font-family: Arial, helvetica, sans-serif;");}');
                        pubnub.publish({
                            channel: gametime.channel,
                            message: e
                        }, (function(e, n) {
                            if (e.error) {
                              throw new Error("Connection failed (Gametime.js), make sure the Publish/Subscribe keys are correct");
                              gametime.connected = !0
                            } else {
                              if (typeof gametime.onconnect == "function") {
                                gametime.onconnect();
                              }
                            }
                        }))
                    }), 3e3)
                }
            }), 250)
        } else "channel" == e ? (void 0 === pubnub ? setTimeout((function() {
            pubnub.subscribe({
                channels: [n],
                timetoken: getCookie("pubnub-time-token"),
                message: function(e) {
                    if ("unsubscribe" == e.type) return pubnub.unsubscribe({
                        channel: e.channel
                    })
                },
                withPresence: !0
            })
        }), 900) : pubnub.subscribe({
            channels: n,
            withPresence: !0
        }), window.gametime.channel = n) : "join-max-length" == e ? gametime.join.maxLength = "string" == typeof n ? parseFloat(n, 0) : n : "join-min-length" == e && (gametime.join.minLength = "string" == typeof n ? parseFloat(n, 0) : n)
    }(e, n, t)
}, gametime.make = function(e) {
    return n = e, void window.gametime.events.push(n);
    var n
}, gametime.on = function(e, n) {
    return function(e, n) {
        if (!(window.gametime.events.indexOf(e) > -1)) throw new ReferenceError('Event "' + e.toString() + '" not found');
        var t = document.createElement("script"),
            i = (n = n.toString()).split("{")[0],
            o = n.toString().split("{")[0].split("(").pop().split(")").shift(),
            u = n.substring(n.indexOf('{') + 1);
        o = o || "undefined";
        n = i + "{pubnub.publish({channel:'" + gametime.channel + "',message:'" + (encodeURIComponent(i) + "{var " + o + ' = "ncmmmasptr__ + ' + o + ' + ncmmmasptr__";' + encodeURIComponent(u)).replace(/\'/g, "\\'").replace(/ncmmmasptr__/g, "'") + "'});}", t.textContent = "gametime.events.functions." + e + " = " + n + ";", document.body.appendChild(t)
    }(e, n)
}, gametime.recursion = 0, gametime.run = function(e, n) {
    return function(e, n) {
        n && void 0 !== n || (n = [""]);
        for (var t = [], i = 0; i < n.length; i++) t.push('"' + n[i] + '"'), new Function("gametime.events.functions." + e + "(" + t + ")")()
    }(e, n)
}, window.gametime.join = {}, gametime.join.maxLength = 2, gametime.join.minLength = 2, gametime.disconnect = function() {
    gametime.connected = !1, pubnub.publish({
        channel: "control",
        message: {
            command: "unsubscribe",
            channel: gametime.channel
        }
    }), pubnub = void 0, typeof gametime.disconnect == "function" && gametime.disconnect()
}
