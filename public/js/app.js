function setupFirebase() {

    //createPageHeader();
    createPageFooter();

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
        storageBucket: "website-3d233.appspot.com/",
    };
    firebase.initializeApp(config);

    // //Get Elements from database
    // const preObject = document.getElementById("object");

    // //Create database references
    // const dbRefObject = firebase.database().ref().child("object");

    // //Sync object changes
    // dbRefObject.on('value', snap => console.log(snap.val()));

    //Get all elements we wish to use
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const forgottenPass = document.getElementById('forgottenPass');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnSignOut = document.getElementById('btnSignOut');
    const deleteUserBtn = document.getElementById('deleteUserBtn');

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
} 





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
    googleLoginBtn.addEventListener('click', signInWithGoogle);

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

        if(!email || !pass) {
            return console.log('Email and Password required');
        }

        //Register User
        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .catch(function(error) {
                if (error.code === 'auth/email-already-in-use') {
                    var credential = firebase.auth.EmailAuthProvider.credential(email, pass);

                    signInWithGoogle().then(function() {
                        firebase.auth().currentUser.link(credential).then(function(user) {
                            console.log("Account linking success", user);
                        }, function(error) {
                            console.log("Account linking error", error);
                        });
                    });
                }
            });
    });
    document.getElementById('authPopUpDialog').style.display='block'
}



function signInWithGoogle() {
    console.log('Inside Google');
     var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    return firebase.auth().signInWithPopup(provider).catch(function(error) {
        console.log('Google sign in error', error);
    });
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



function deleteUserFirebase() {
    setupFirebase();
    console.log(rootRef.currentUser())

    //Add event listener for deleteUser button
    // deleteUserBtn.addEventListener('click', e => {
    //     var user = firebase.auth().currentUser;
    //     user.delete().then(function() {
    //         console.log("USER DELETED WORKED");
    //     }, function(error) {
    //         console.log("USER DELTED ERROR")
    //     });
    // });
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


function createPageHeader() {
    var cssMenuDiv = document.createElement("DIV");
    cssMenuDiv.id = "cssmenu";
    var headerList = document.createElement("ul");
    cssMenuDiv.appendChild(headerList);
    var dmuLogoListElement = document.createElement("li");
    dmuLogoListElement.id = "dmuLogoLi";
    headerList.appendChild(dmuLogoListElement);
    var dmuLogoImg = document.createElement("img");
    dmuLogoImg.src = "images/dmuLogo.png";
    dmuLogoImg.id = "dmuLogoTopBar";
    dmuLogoListElement.appendChild(dmuLogoImg);

    var mainHeaderOptionsLi = document.createElement("li");
    mainHeaderOptionsLi.id = "mainHeaderOptions";
    var homeAElement = document.createElement("a");
    homeAElement.innerText = "Home";
    homeAElement.href = "#";
    var loginAElement = document.createElement("a");
    loginAElement.innerText = "Login";
    loginAElement.href = "javascript:void(0);";
    loginAElement.id = "loginBtnInNavMenu";
    //loginAElement.onclick = "attachLoginDialogEventHandlers();";
    var aboutAElement = document.createElement("a");
    aboutAElement.innerText = "About";
    aboutAElement.href = "html/about.html";
    //aboutAElement.onclick(openAboutPage());
    mainHeaderOptionsLi.appendChild(homeAElement);
    mainHeaderOptionsLi.appendChild(loginAElement);
    mainHeaderOptionsLi.appendChild(aboutAElement);
    headerList.appendChild(mainHeaderOptionsLi);


    var mainDropdownUser = document.createElement("li");
    mainDropdownUser.className = "dropdown";
    var usernameAElement = document.createElement("a");
    usernameAElement.href = "javascript:void(0)";
    usernameAElement.className = "dropBtn";
    usernameAElement.id = "userNameLoggedInText";
    usernameAElement.onclick = "myFunction();addLogoutEventListener();";
    usernameAElement.innerText = "Username";
    var userPictureImg = document.createElement("img");
    userPictureImg.id = "userProfilePic";
    userPictureImg.src = "images/questionMark.png";
    userPictureImg.alt = "User Profile Picture";
    var userDropdownDiv = document.createElement("DIV");
    userDropdownDiv.className = "dropdown-content";
    userDropdownDiv.id = "myDropdown";
    var settingsAElement = document.createElement("a");
    settingsAElement.href = "html/settings.html";
    settingsAElement.innerText = "Settings";
    var logoutAElement = document.createElement("a");
    logoutAElement.href = "#";
    logoutAElement.id = "btnSignOut";
    logoutAElement.innerText = "Logout";
    
    headerList.appendChild(mainDropdownUser);
    mainDropdownUser.appendChild(usernameAElement);
    mainDropdownUser.appendChild(userPictureImg);
    mainDropdownUser.appendChild(userDropdownDiv);
    userDropdownDiv.appendChild(settingsAElement);
    userDropdownDiv.appendChild(logoutAElement);

    document.getElementById("mainPageHeader").appendChild(cssMenuDiv)
}