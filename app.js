const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
    const firstName = req.body.Firstname;
    const secondName = req.body.Secondname;
    const email = req.body.Email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const URL = "https://us14.api.mailchimp.com/3.0/lists/e9459ff377";
    const options = {
        url: URL,
        method: "POST",
        headers: {
            Authorization: "auth a025653968139061bc1fb3b273af16c0-us14"
        },
        body: jsonData
    };
    request(options,(err, response, body) => {
        if(err){
            res.redirect("/failure.html");
        }else{
            if(response.statusCode === 200){
                res.redirect("/success.html");
            }else{
                res.redirect("/failure.html");
            }
        }
    });
});
app.listen(process.env.PORT||5000, function () {
    console.log("Server active @ port 5000");
});