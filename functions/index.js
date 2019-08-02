const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.pass;

const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});


function sendmail(name, email, message){
    
    var mailoptions ={
        from: gmailEmail,
        to: gmailEmail,
        subject: 'New Form Submitted',
        html:`<h1> New Contact Request</h1>
                <h2>Name: </h2><p>${name}</p>
                <h2>Email: </h2><p>${email}</p>
                <h2>Message: </h2><p>${message}</p>`
    };

    transporter.sendMail(mailoptions, function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log('Email Sent:' +info.response);
        }
    });
};

exports.sendMail = functions.database.ref('/messages/{name}').onCreate((snapshot, context) =>{
    const val = snapshot.val();
    var name = val.name;
    var email = val.email;
    var message = val.message;
    sendmail(name, email, message);
    return null;
});





//reCaptcha
exports.checkRecaptcha = functions.https.onRequest((req, res) => {
    const response = req.query.response
    console.log("recaptcha response", response)
    rp({
        uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
        method: 'POST',
        formData: {
            secret: '6LflhLAUAAAAALQyBG54KpirL81GnyINeR6sikdy',
            response: response
        },
        json: true
    }).then(result => {
        console.log("recaptcha result", result)
        if (result.success) {
            res.send("You're good to go, human.")
        }
        else {
            res.send("Recaptcha verification failed. Are you a robot?")
        }
    }).catch(reason => {
        console.log("Recaptcha request failure", reason)
        res.send("Recaptcha request failed.")
    })
})