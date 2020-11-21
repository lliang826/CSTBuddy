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

            changeEmailButton.click(function() {
                var menuHolder = $('.buttonContainer');

                if ( $('#passwordContainer').css('display') == 'grid') {
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

            changePasswordButton.click(function() {
                var menuHolder = $('.buttonContainer');

                if ( $('#emailContainer').css('display') == 'grid') {
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

            campusBurnabyButton.click(function() {

                if (campusDowntownButton.hasClass('active')) {
                    campusDowntownButton.removeClass('active');
                    campusBurnabyButton.addClass('active');
                }
                else {
                    campusBurnabyButton.addClass('active');
                }
                $(campusHeaderButton).html("Campus : Burnaby");
            });
            
            campusDowntownButton.click(function() {

                if (campusBurnabyButton.hasClass('active')) {
                    campusBurnabyButton.removeClass('active');
                    campusDowntownButton.addClass('active');
                }
                else {
                    campusDowntownButton.addClass('active');
                }
                
                $(campusHeaderButton).html("Campus : Downtown");

            });

            level1Button.click(function() {
                if (level2Button.hasClass('active') || 
                    level3Button.hasClass('active') || 
                    level4Button.hasClass('active')) {
                        level2Button.removeClass('active');
                        level3Button.removeClass('active');
                        level4Button.removeClass('active');
                        level1Button.addClass('active');
                }
                else {
                    level1Button.addClass('active');
                }

                $(levelHeaderButton).html("Level : 1");
            });

            level2Button.click(function() {
                if (level1Button.hasClass('active') || 
                    level3Button.hasClass('active') || 
                    level4Button.hasClass('active')) {
                        level1Button.removeClass('active');
                        level3Button.removeClass('active');
                        level4Button.removeClass('active');
                        level2Button.addClass('active');
                }
                else {
                    level2Button.addClass('active');
                }

                $(levelHeaderButton).html("Level : 2");
            });

            level3Button.click(function() {
                if (level1Button.hasClass('active') || 
                    level2Button.hasClass('active') || 
                    level4Button.hasClass('active')) {
                        level1Button.removeClass('active');
                        level2Button.removeClass('active');
                        level4Button.removeClass('active');
                        level3Button.addClass('active');
                }
                else {
                    level3Button.addClass('active');
                }

                $(levelHeaderButton).html("Level : 3");
            });

            level4Button.click(function() {
                if (level1Button.hasClass('active') || 
                    level2Button.hasClass('active') || 
                    level3Button.hasClass('active')) {
                        level1Button.removeClass('active');
                        level2Button.removeClass('active');
                        level3Button.removeClass('active');
                        level4Button.addClass('active');
                }
                else {
                    level4Button.addClass('active');
                }

                $(levelHeaderButton).html("Level : 4");
            });

            submit.click(function() {
                firebase.auth().onAuthStateChanged(function (user) {
                    db.collection("users").doc(user.uid).onSnapshot(function(snap) {
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
                        campus : currentCampus,
                        level : currentLevel
                        })
                    })
                });

            function updateCampusAndLevel() {
                firebase.auth().onAuthStateChanged(function (user){
                    db.collection("users").doc(user.uid).onSnapshot(function(snap){
                        console.log(snap.data());
                        console.log(snap.data().campus);
                        console.log(snap.data().level);
                        currentLevel = snap.data().level;
                        currentCampus = snap.data().campus;
                        $(campusHeaderButton).html("Campus : " + snap.data().campus);
                        $(levelHeaderButton).html("Level : " + snap.data().level);
                    })
                })
            };

            updateCampusAndLevel();

            function readUserName() {
                firebase.auth().onAuthStateChanged(function (user) {
                    db.collection("users").doc(user.uid).onSnapshot(function(snap) {
                        document.getElementById("profileName").innerText = snap.data().name;
                    })
                })
            };

            readUserName();