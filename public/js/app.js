(function () {
    // Get the modal
    var modal = document.getElementById('id01');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    //Initialize firebase
    const config = {
        apiKey: "AIzaSyB3QwWMKARjXE0Qmqwpfu5IU67dgk0Jyek",
        authDomain: "website-3d233.firebaseapp.com",
        databaseURL: "https://website-3d233.firebaseio.com/",
        storageBucket: "website-3d233.appspot.com",
    };
    firebase.initializeApp(config);

    //Get all elements we wish to use
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const forgottenPass = document.getElementById('forgottenPass');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnSignOut = document.getElementById('btnSignOut');

    //Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            document.getElementById('UserNameLoggedInText').innerText = firebaseUser.displayName;
            
            var image = document.getElementById("userProfilePic");
            image.src = firebaseUser.photoURL;

            document.getElementById('authPopUpDialog').style.display='none';
        } else {
            console.log("No user logged in");
        }
    });
}());




//USERNAME DROPDOWN MENU JAVASCRIPT FUNCTIONS
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function openAboutPage() {
    var tmpl = document.getElementById('comment-template');
    document.body.appendChild(tmpl.content.cloneNode(true));
}

function attachLoginDialogEventHandlers() {
    document.getElementById('txtEmail').value = "";
    document.getElementById('txtPassword').value = "";
    document.getElementById('rememberMe').checked = false;

    //Add event listener for email login button
    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        try 
        {
            const promise = auth.signInWithEmailAndPassword(email, pass);
        }
        catch (err)
        {
            console.log('Caught error');
        }
    });

    //Add event listener for facebook login button
    facebookLoginBtn.addEventListener('click', e => {
        console.log('Inside facebook');
        var provider = new firebase.auth.FacebookAuthProvider();

        provider.addScope('user_about_me');

        firebase.auth().signInWithPopup(provider).then(function (authData) {
            console.log(authData);
        }).catch(function (error) {
            console.log(error);
        });
        console.log('finished facebook');
    });

    //Add event listener for google login button
    googleLoginBtn.addEventListener('click', e => {
        console.log('Inside Google');
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    })

     //Add event listener for forgotten button
    forgottenPass.addEventListener('click', e => {
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function () {
            console.log('Send an email verification to - ' + user.email)
            console.log("User name is " + user.displayName)
        }, function (error) {
            console.log(error);
        });
    })

    //Add event listener for sign up button
    btnSignUp.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });
    
    document.getElementById('authPopUpDialog').style.display='block'
}

function addLogoutEventListener() {
    //Add event listener for sign out button
    btnSignOut.addEventListener('click', e => {
        firebase.auth().signOut().then(function() {
            localStorage.clear();
            location.reload(); //reload page
        }, function(error) {
            console.error('Sign Out Error', error);
        });
    });
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}