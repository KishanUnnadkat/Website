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


function createPageFooter() {

    var tag = document.createElement("script");
    tag.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD5Iv_Pqs3b5SzdIBEHMkARaSXkvj1NW-Y&callback=initMap";
    document.getElementsByTagName("head")[0].appendChild(tag);

    //CREATE FOOTER LEFT
    var pageFooter = document.createElement("FOOTER");
    var footerLeftDiv = document.createElement("DIV");
    var companyLogoText = document.createElement("h3");

    var footerLinksPara = document.createElement("p");
    var footerCompanyName = document.createElement("p");
    var phoneNumberPElement = document.createElement("p");

    var footerLinkHome = document.createElement("a");
    var footerLinkBlog = document.createElement("a");
    var footerLinkPricing = document.createElement("a");
    var footerLinkAbout = document.createElement("a");
    var footerLinkFAQ = document.createElement("a");
    var footerLinkContact = document.createElement("a");

    pageFooter.className = "footer-distributed";
    footerLeftDiv.className = "footer-left";
    footerLinksPara.className = "footer-links";
    footerCompanyName.className = "footer-company-name";

    companyLogoText.innerText = "Company logo"
    footerLinkHome.innerText = "Home . ";
    footerLinkBlog.innerText = "Blog . ";
    footerLinkPricing.innerText = "Pricing . ";
    footerLinkAbout.innerText = "About . ";
    footerLinkFAQ.innerText = "FAQs . ";
    footerLinkContact.innerText = "Contact";
    footerCompanyName.innerText = "Company Name © 2016";

    pageFooter.appendChild(footerLeftDiv);
    footerLeftDiv.appendChild(companyLogoText);
    footerLinksPara.appendChild(footerLinkHome);
    footerLinksPara.appendChild(footerLinkBlog);
    footerLinksPara.appendChild(footerLinkPricing);
    footerLinksPara.appendChild(footerLinkAbout);
    footerLinksPara.appendChild(footerLinkFAQ);
    footerLinksPara.appendChild(footerLinkContact);
    footerLeftDiv.appendChild(footerLinksPara);
    footerLeftDiv.appendChild(footerCompanyName);


    //CREATE FOOTER CENTER
    var footerCenterDiv = document.createElement("DIV");
    var mapDiv = document.createElement("DIV");
    var mapContentsDiv = document.createElement("DIV");
    var contactPhone = document.createElement("DIV");
    var contactEmail = document.createElement("DIV");

    footerCenterDiv.className = "footer-center";
    pageFooter.appendChild(footerCenterDiv);
    mapDiv.id = "map";
    footerCenterDiv.appendChild(mapDiv);
    footerCenterDiv.appendChild(mapContentsDiv);

    var contactEmailIElement = document.createElement("i");
    var mapMarker = document.createElement("i");
    var contactPhoneIElement = document.createElement("i");
    mapMarker.className = "fa fa-map-marker";
    mapContentsDiv.appendChild(mapMarker);

    var addressPElement = document.createElement("p");
    var emailPElement = document.createElement("p");
    mapContentsDiv.appendChild(addressPElement);

    var brElement = document.createElement("br");
    var span1 = document.createElement("span");
    span1.innerText = "The Gateway"
    span1.appendChild(brElement);
    var span2 = document.createElement("span");
    span2.innerText = "Leicester"
    span2.appendChild(brElement);
    var span3 = document.createElement("span");
    span3.innerText = "LE1 9BH"
    span3.appendChild(brElement);
    addressPElement.appendChild(span1);
    addressPElement.appendChild(span2);
    addressPElement.appendChild(span3);
    
    footerCenterDiv.appendChild(contactPhone);
    contactPhoneIElement.className = "fa fa-phone";
    contactPhone.appendChild(contactPhoneIElement);
    phoneNumberPElement.innerText = "0116 255 1551";
    contactPhone.appendChild(phoneNumberPElement);

    footerCenterDiv.appendChild(contactEmail);
    contactEmailIElement. className = "fa fa-envelope";
    contactEmail.appendChild(contactEmailIElement);
    contactEmail.appendChild(emailPElement);
    
    var contactEmailAElement = document.createElement("a");
    contactEmailAElement.href = "mailto:support@company.com";
    contactEmailAElement.innerText = "support@company.com";
    emailPElement.appendChild(contactEmailAElement);


    //CREATE FOOTER RIGHT
    var footerRightDiv = document.createElement("DIV");
    footerRightDiv.className = "footer-right";
    pageFooter.appendChild(footerRightDiv);

    var aboutUsPElement = document.createElement("p");
    aboutUsPElement.className = "footer-company-about";
    footerRightDiv.appendChild(aboutUsPElement);

    var aboutUsSpanElement = document.createElement("span");
    aboutUsSpanElement.innerText = "About the company";
    aboutUsPElement.appendChild(aboutUsSpanElement);
    aboutUsPElement.innerText = "Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.";

    var footerSocialMediaLinks = document.createElement("DIV");
    footerSocialMediaLinks.className = "footer-icons";
    footerRightDiv.appendChild(footerSocialMediaLinks);


    var facebookPictureAElement = document.createElement("a");
    var twitterPictureAElement = document.createElement("a");
    var linkedInPictureAElement = document.createElement("a");
    var gitHubPictureAElement = document.createElement("a");
    facebookPictureAElement.href = "#";
    twitterPictureAElement.href = "#";
    linkedInPictureAElement.href = "#";
    gitHubPictureAElement.href = "#";

    var facebookPictureIElement = document.createElement("i");
    var twitterPictureIElement = document.createElement("i");
    var linkedInPictureIElement = document.createElement("i");
    var gitHubPictureIElement = document.createElement("i");
    facebookPictureIElement.className = "fa fa-facebook";
    twitterPictureIElement.className = "fa fa-twitter";
    linkedInPictureIElement.className = "fa fa-linkedin";
    gitHubPictureIElement.className = "fa fa-github";

    facebookPictureAElement.appendChild(facebookPictureIElement);
    twitterPictureAElement.appendChild(twitterPictureIElement);
    linkedInPictureAElement.appendChild(linkedInPictureIElement);
    gitHubPictureAElement.appendChild(gitHubPictureIElement);

    footerSocialMediaLinks.appendChild(facebookPictureAElement);
    footerSocialMediaLinks.appendChild(twitterPictureAElement);
    footerSocialMediaLinks.appendChild(linkedInPictureAElement);
    footerSocialMediaLinks.appendChild(gitHubPictureAElement);

    document.getElementById("wholePageID").appendChild(pageFooter);

        
}