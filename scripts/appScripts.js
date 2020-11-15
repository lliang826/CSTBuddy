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

                /*submit.click(function() {
                    const user = firebase.auth().currentUser;
                    const credential = firebase.auth.EmailAuthProvider.credential(
                        user.email,
                        user.currentPassword
                    );

                    user.reauthenticateWithCredential(credential);
                })*/
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

            
            submit.click(function() {
                var currentCampus = "";
                if (campusBurnabyButton.hasClass('active')) {
                    currentCampus = "Burnaby";
                } else if (campusDowntownButton.hasClass('active')) {
                    currentCampus = "Downtown";
                }
                var currentLevel = 0;
                if (level1Button.hasClass('active')) {
                    currentLevel = 1;
                } else if (level2Button.hasClass('active')) {
                    currentLevel = 2;
                } else if (level3Button.hasClass('active')) {
                    currentLevel = 3;
                } else if (level4Button.hasClass('active')) {
                    currentLevel = 4;
                }
                console.log(currentCampus);
                console.log(currentLevel);

                firebase.auth().onAuthStateChanged(function (user) {
                    db.collection("users").doc(user.uid).update({
                        campus : currentCampus,
                        level : currentLevel
                        })
                    })
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