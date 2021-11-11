/*
  * @license
  * 2021 Parking Master
  * Licensed under the MIT License (https://mit-license.org/)
  * More license and copyright information at https://github.com/Parking-Master/Gametime.js/LICENSE
*/
function setCookie(e, t, n) {
    var i = "";
    if (n) {
        var o = new Date;
        o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3), i = "; expires=" + o.toUTCString()
    }
    document.cookie = e + "=" + (t || "") + i + "; path=/"
}

function getCookie(e) {
    for (var t = e + "=", n = document.cookie.split(";"), i = 0; i < n.length; i++) {
        for (var o = n[i];
            " " == o.charAt(0);) o = o.substring(1, o.length);
        if (0 == o.indexOf(t)) return o.substring(t.length, o.length)
    }
    return null
}
window.addEventListener("beforeunload", (() => {
    setCookie("pubnub-time-token", `${(new Date).getTime()}0000`, 10)
}));
var pubnub;
window.gametime = {}, window.gametime.events = [], window.gametime.events.functions = [], gametime.set = function(e, n, t) {
    return function(e, n, t) {
        if ("key" == e) {
            let e = n,
                m = t;
            var i = document.createElement("script");
            i.src = "https://cdn.pubnub.com/sdk/javascript/pubnub.4.21.7.min.js", document.body.appendChild(i);
            var o = setInterval((function() {
                if ("undefined" != typeof PubNub) {
                    clearInterval(o);
                    const t = PubNub.generateUUID();
                    pubnub = new PubNub({
                        publishKey: e,
                        subscribeKey: m,
                        uuid: `${t}`
                    }), gametime.user = {}, gametime.user.id = t;
                    var n = !1;
                    pubnub.addListener({
                        message: function(e) {
                            if (0 == n) {
                                n = !0, setTimeout((() => {
                                    n = !1
                                }), 300);
                                var t = document.createElement("script"),
                                    i = "(" + decodeURIComponent(e.message) + ")();";
                                t.textContent = i, document.body.appendChild(t), t.onload = () => {
                                    t.remove()
                                }
                            }
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
                            if (e.error) throw new Error("Connection failed (Gametime.js), make sure the Publish/Subscribe keys are correct")
                        }))
                    }), 3e3)
                }
            }), 250)
        } else "channel" == e ? (void 0 === pubnub ? setTimeout((function() {
            pubnub.subscribe({
                channels: [n],
                timetoken: getCookie("pubnub-time-token"),
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
            o = n.split("{").pop();
        n = i + "{pubnub.publish({channel:'" + gametime.channel + "',message:'" + encodeURIComponent(n) + "'});" + o, t.textContent = "gametime.events.functions." + e + " = (" + n + ");", document.body.appendChild(t)
    }(e, n)
}, gametime.run = function(e, n) {
    return function(e, n) {
        n = n ? n : "";
        for (var t = document.createElement("script"), i = [], o = 0; o < n.length; o++) i.push('"' + n[o] + '"'), t.textContent = "gametime.events.functions." + e + "(" + i + ")";
        document.body.appendChild(t)
    }(e, n)
}, window.addEventListener("load", (function() {
    document.querySelector('input[name="gametime-users-connected"]') || (document.body.innerHTML += '<input type="hidden" name="gametime-users-connected" value="0" />'), gametime.make("connectedUserQuery"), gametime.on("connectedUserQuery", (function() {
        document.querySelector('input[name="gametime-users-connected"]').value = (parseFloat(document.querySelector('input[name="gametime-users-connected"]').value, 0) + 1).toString(), gametime.user.connectedUsers = document.querySelector('input[name="gametime-users-connected"]').value
    }))
})), window.gametime.join = {}, gametime.join.maxLength = 2, gametime.join.minLength = 2;
