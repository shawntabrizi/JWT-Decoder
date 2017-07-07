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
        message = "Use the text area above to input a JSON Web Token, " + "<a href='javascript:;' onclick='sample()'>or use this sample token.</a>"
    } else {
        //JSON Web Tokens consist of three parts separated by dots "."
        //Header, Payload, and Signature
        //Each of these parts are base-64-url encoded strings with the JSON data
        var tokens = jwt_token.split(".")
        if (tokens.length == 3) {
            message = "Valid Token"
            Header = decoder(tokens[0])
            Payload = decoder(tokens[1])
            if (tokens[2].length > 0) {
                Signature = "[Signed Token]"
            } else {
                Signature = "[Unsigned Token]"
            }
        } else {
            message = "JSON Web Tokens must have 3 sections, even without a signature."
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

function sample() {
    input_field.value = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik5HVEZ2ZEstZnl0aEV1THdqcHdBSk9NOW4tQSJ9.eyJhdWQiOiJodHRwczovL3NlcnZpY2UuY29udG9zby5jb20vIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvN2ZlODE0NDctZGE1Ny00Mzg1LWJlY2ItNmRlNTdmMjE0NzdlLyIsImlhdCI6MTM4ODQ0MDg2MywibmJmIjoxMzg4NDQwODYzLCJleHAiOjEzODg0NDQ3NjMsInZlciI6IjEuMCIsInRpZCI6IjdmZTgxNDQ3LWRhNTctNDM4NS1iZWNiLTZkZTU3ZjIxNDc3ZSIsIm9pZCI6IjY4Mzg5YWUyLTYyZmEtNGIxOC05MWZlLTUzZGQxMDlkNzRmNSIsInVwbiI6ImZyYW5rbUBjb250b3NvLmNvbSIsInVuaXF1ZV9uYW1lIjoiZnJhbmttQGNvbnRvc28uY29tIiwic3ViIjoiZGVOcUlqOUlPRTlQV0pXYkhzZnRYdDJFYWJQVmwwQ2o4UUFtZWZSTFY5OCIsImZhbWlseV9uYW1lIjoiTWlsbGVyIiwiZ2l2ZW5fbmFtZSI6IkZyYW5rIiwiYXBwaWQiOiIyZDRkMTFhMi1mODE0LTQ2YTctODkwYS0yNzRhNzJhNzMwOWUiLCJhcHBpZGFjciI6IjAiLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJhY3IiOiIxIn0.JZw8jC0gptZxVC-7l5sFkdnJgP3_tRjeQEPgUn28XctVe3QqmheLZw7QVZDPCyGycDWBaqy7FLpSekET_BftDkewRhyHk9FW_KeEz0ch2c3i08NGNDbr6XYGVayNuSesYk5Aw_p3ICRlUV1bqEwk-Jkzs9EEkQg4hbefqJS6yS1HoV_2EsEhpd_wCQpxK89WPs3hLYZETRJtG5kvCCEOvSHXmDE6eTHGTnEgsIk--UlPe275Dvou4gEAwLofhLDQbMSjnlV5VLsjimNBVcSRFShoxmQwBJR_b2011Y5IuD6St5zPnzruBbZYkGNurQK63TJPWmRd3mbJsGM0mf3CUQ'
    jwtdecode(input_field.value)
}

document.onload(jwtdecode(input_field.value))