var campusHeaderButton = $('button:contains("Campus")');
var campusBurnabyButton = $('button:contains("Burnaby")');
var campusDowntownButton = $('button:contains("Downtown")');
var levelHeaderButton = $('button:contains("Level")');
var level1Button = $('button:contains("1")');
var level2Button = $('button:contains("2")');
var level3Button = $('button:contains("3")');
var level4Button = $('button:contains("4")');
var changeEmailButton = $('button:contains("Change Email")');
var changePasswordButton = $('button:contains("Change Password")');
var submit = $('button:contains("Submit")');
var currentCampus = "";
var currentLevel = 0;

/**
 * Changes the display of the buttons on the screen and brings
 * up a email change form.
 * 
 */
changeEmailButton.click(function () {
    var menuHolder = $('.buttonContainer');

    if ($('#passwordContainer').css('display') == 'grid') {
        $('#passwordContainer').css('display', 'none');
    }

    menuHolder.addClass('buttonContainerSmall');
    menuHolder.removeClass('buttonContainer');
    $('#emailContainer').css("display", "grid");
    submit.remove();
    $('#emailContainer').after(submit);
    submit.css('margin-top', '5%');
    submit.css('margin-left', '70%');

})

/**
 * Changes the display of the buttons on the screen and brings
 * up a password change form.
 * 
 */
changePasswordButton.click(function () {
    var menuHolder = $('.buttonContainer');

    if ($('#emailContainer').css('display') == 'grid') {
        $('#emailContainer').css('display', 'none');
    }

    menuHolder.addClass('buttonContainerSmall');
    menuHolder.removeClass('buttonContainer');
    $('#passwordContainer').css("display", "grid");
    submit.remove();
    $('#passwordContainer').after(submit);
    submit.css('margin-top', '5%');
    submit.css('margin-left', '70%');
})

/**
 * Checks to see if one of the campus dropdown
 * menus buttons is selected, if so it removes
 * the 'active' class which highlights a selected button
 * and assigns it to the newly clicked choice (Burnaby).
 * 
 */
campusBurnabyButton.click(function () {

    if (campusDowntownButton.hasClass('active')) {
        campusDowntownButton.removeClass('active');
        campusBurnabyButton.addClass('active');
    } else {
        campusBurnabyButton.addClass('active');
    }
    $(campusHeaderButton).html("Campus : Burnaby");
});

/**
 * Checks to see if one of the campus dropdown
 * menus buttons is selected, if so it removes
 * the 'active' class which highlights a selected button
 * and assigns it to the newly clicked choice (Downtown).
 * 
 */
campusDowntownButton.click(function () {

    if (campusBurnabyButton.hasClass('active')) {
        campusBurnabyButton.removeClass('active');
        campusDowntownButton.addClass('active');
    } else {
        campusDowntownButton.addClass('active');
    }

    $(campusHeaderButton).html("Campus : Downtown");

});

/**
 * Checks to see if one of the level dropdown
 * menus buttons is selected, if so it removes
 * the 'active' class which highlights a selected button
 * and assigns it to the newly clicked choice (level 1).
 * 
 */
level1Button.click(function () {
    if (level2Button.hasClass('active') ||
        level3Button.hasClass('active') ||
        level4Button.hasClass('active')) {
        level2Button.removeClass('active');
        level3Button.removeClass('active');
        level4Button.removeClass('active');
        level1Button.addClass('active');
    } else {
        level1Button.addClass('active');
    }

    $(levelHeaderButton).html("Level : 1");
});

/**
 * Checks to see if one of the level dropdown
 * menus buttons is selected, if so it removes
 * the 'active' class which highlights a selected button
 * and assigns it to the newly clicked choice (level 2).
 * 
 */
level2Button.click(function () {
    if (level1Button.hasClass('active') ||
        level3Button.hasClass('active') ||
        level4Button.hasClass('active')) {
        level1Button.removeClass('active');
        level3Button.removeClass('active');
        level4Button.removeClass('active');
        level2Button.addClass('active');
    } else {
        level2Button.addClass('active');
    }

    $(levelHeaderButton).html("Level : 2");
});

/**
 * Checks to see if one of the level dropdown
 * menus buttons is selected, if so it removes
 * the 'active' class which highlights a selected button
 * and assigns it to the newly clicked choice (level 3).
 * 
 */
level3Button.click(function () {
    if (level1Button.hasClass('active') ||
        level2Button.hasClass('active') ||
        level4Button.hasClass('active')) {
        level1Button.removeClass('active');
        level2Button.removeClass('active');
        level4Button.removeClass('active');
        level3Button.addClass('active');
    } else {
        level3Button.addClass('active');
    }

    $(levelHeaderButton).html("Level : 3");
});

/**
 * Checks to see if one of the level dropdown
 * menus buttons is selected, if so it removes
 * the 'active' class which highlights a selected button
 * and assigns it to the newly clicked choice (level 4).
 * 
 */
level4Button.click(function () {
    if (level1Button.hasClass('active') ||
        level2Button.hasClass('active') ||
        level3Button.hasClass('active')) {
        level1Button.removeClass('active');
        level2Button.removeClass('active');
        level3Button.removeClass('active');
        level4Button.addClass('active');
    } else {
        level4Button.addClass('active');
    }

    $(levelHeaderButton).html("Level : 4");
});

/**
 * When the submit button is clicked the program
 * assigns the value of currentCampus and currentLevel
 * to the current 'active' button from their selection.
 * It then writes the chosen campus and level to the
 * users profile.
 * 
 */
submit.click(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).onSnapshot(function (snap) {
            if (snap.data().campus == "") {
                currentCampus = "Selection Needed";
            } else {
                currentCampus = snap.data().campus;
            }
            if (snap.data().level == 0) {
                currentLevel = 0;
            } else {
                currentLevel = snap.data().level;
            }
        })
    })

    if (campusBurnabyButton.hasClass('active')) {
        currentCampus = "Burnaby";
    } else if (campusDowntownButton.hasClass('active')) {
        currentCampus = "Downtown";
    }

    if (level1Button.hasClass('active')) {
        currentLevel = 1;
    } else if (level2Button.hasClass('active')) {
        currentLevel = 2;
    } else if (level3Button.hasClass('active')) {
        currentLevel = 3;
    } else if (level4Button.hasClass('active')) {
        currentLevel = 4;
    }

    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).update({
            campus: currentCampus,
            level: currentLevel
        })
    })
});

/**
 * updateCampusAndLevel reads the users current campus and level
 * selections in from the users profile and sets the text on the
 * Campus and Level dropdown menus to display their choices. 
 * 
 * This essentially ensures that if the user navigates away from the 
 * profile page and returns then they will see what they had
 * selected previously.
 * 
 */
function updateCampusAndLevel() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).onSnapshot(function (snap) {
            currentLevel = snap.data().level;
            currentCampus = snap.data().campus;
            $(campusHeaderButton).html("Campus : " + snap.data().campus);
            $(levelHeaderButton).html("Level : " + snap.data().level);
        })
    })
};

updateCampusAndLevel();

/**
 * Reads the users name from firestore and writes it to the navbar 
 * to indicate that they've signed in.
 * 
 */
function readUserName() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).onSnapshot(function (snap) {
            document.getElementById("profileName").innerText = snap.data().name;
        })
    })
};

readUserName();