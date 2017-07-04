//This function takes a base 64 url encoded string, and converts it to a JSON object... using a few steps.
function decoder(base64url) {
    //Convert base 64 url to base 64
    var base64 = base64url.replace('-', '+').replace('_', '/')
    //atob() is a built in JS function that decodes a base-64 encoded string
    var utf8 = atob(base64)
    //We then parse that into JSON so it looks pretty
    var json = JSON.parse(utf8)

    return json
}

function jwtdecode(jwt_token) {
    var message, Header, Payload, Signature

    //JSON Web Tokens consist of three parts separated by dots "."
    //Header, Payload, and Signature
    //Each of these parts are base-64-url encoded strings with the JSON data
    var tokens = jwt_token.split(".")
    if (tokens.length != 3) {
        message = "Bad Token!"
        Header = {}
        Payload = {}
        Signature = ""
        
    }
    else {
        message = "Good Token!"
        Header = decoder(tokens[0])
        Payload = decoder(tokens[1])
        Signature = tokens[2]
    }

    div_header.innerHTML = JSON.stringify(Header, null, 4)
    div_payload.innerHTML = JSON.stringify(Payload, null, 4)
    div_signature.innerHTML = Signature
    p_message.innerHTML = message
}

var div_header = document.getElementById('header')
var div_payload = document.getElementById('payload')
var div_signature = document.getElementById('signature')
var p_message = document.getElementById('message')
var input_field = document.getElementById('input')

input_field.addEventListener("input", function (e) {
    jwtdecode(input_field.value)
})