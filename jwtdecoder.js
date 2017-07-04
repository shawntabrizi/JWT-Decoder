//This function takes a base 64 url encoded string, and converts it to a JSON object... using a few steps.
function decoder(base64url) {
    try {
        //Convert base 64 url to base 64
        var base64 = base64url.replace('-', '+').replace('_', '/')
        //atob() is a built in JS function that decodes a base-64 encoded string
        var utf8 = atob(base64)
        //Then parse that into JSON
        var json = JSON.parse(utf8)
        //Then make that JSON look pretty
        var json_string = JSON.stringify(json, null, 4)
    } catch (err) {
        json_string = "Bad Section.\nError: " + err.message
    }
    return json_string
}

function jwtdecode(jwt_token) {
    var message, Header, Payload, Signature

    Header = "{\n}"
    Payload = "{\n}"
    Signature = "{\n}"

    if (jwt_token.length < 1) {
        message = "Use the text area above to input a JWT Token."
    } else {
        //JSON Web Tokens consist of three parts separated by dots "."
        //Header, Payload, and Signature
        //Each of these parts are base-64-url encoded strings with the JSON data
        var tokens = jwt_token.split(".")
        if (tokens.length > 3) {
            message = "Token has too many sections!"
        } else if (tokens.length == 3) {
            message = "Signed Token"
            Header = decoder(tokens[0])
            Payload = decoder(tokens[1])
            Signature = "[Signature]"
        } else if (tokens.length == 2) {
            message = "Unsigned Token"
            Header = decoder(tokens[0])
            Payload = decoder(tokens[1])
            Signature = "[None]"
        } else {
            message = "Bad Token. Make sure your token has at least 2 sections."
        }
    }
    div_header.innerHTML = Header
    div_payload.innerHTML = Payload
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

document.onload(jwtdecode(input_field.value))