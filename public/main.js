console.log("works");

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDq8S1vY1Lki2HQS0G_kObCcwfBelR3fG8",
    authDomain: "contact-form-9317a-dbac0.firebaseapp.com",
    databaseURL: "https://contact-form-9317a-dbac0.firebaseio.com",
    projectId: "contact-form-9317a",
    storageBucket: "contact-form-9317a.appspot.com",
    messagingSenderId: "487353650461",
    appId: "1:487353650461:web:2cf7cca8e7bb679e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var messagesRef = firebase.database().ref("messages");

 document.getElementById("contactForm").addEventListener("submit", submitForm);

 function submitForm(e) {
  e.preventDefault();
    console.log('Clicked button');

    var name  = $('#name').val();
    var email  = $('#email').val();
    var message = $('#message').val();

    saveMessage(name, email, message);

    document.getElementById("contactForm").reset();
 }
    
  function saveMessage(name, email, message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      name: name,
      email: email,
      message: message
    });
  }

function dataCallback(captcha)
{
  document.querySelector("#submit").classList.add("open");
  document.querySelector("#submit").removeAttribute("disabled")

  fetch('https://us-central1-contact-form-9317a.cloudfunctions.net/checkRecaptcha  ', {
    method : "POST",
    headers : {
      "Accept" : 'application/json, text, text/plain, "/"',
      "Content-type" : ""
    },
    body:JSON.stringify({captcha: captcha})
  }).then((res) => res.json()) .then((data) => {
    if (data.sucess)
    {
    recapture = true;
    }
  })
}