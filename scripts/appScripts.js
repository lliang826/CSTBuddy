            var campusHeaderButton = $('button:contains("Campus")');
            var campusBurnabyButton = $('button:contains("Burnaby")');
            var campusDowntownButton = $('button:contains("Downtown")');
            var levelHeaderButton = $('button:contains("Level")');
            var level1Button = $('button:contains("1")');
            var level2Button = $('button:contains("2")');
            var level3Button = $('button:contains("3")');
            var level4Button = $('button:contains("4")');

            campusBurnabyButton.click(function() {

                if (campusDowntownButton.hasClass('active')) {
                    campusDowntownButton.removeClass('active');
                    campusBurnabyButton.addClass('active');
                }
                else {
                    campusBurnabyButton.addClass('active');
                }

            });

            ///////////////////////////////////////////////
            //This should update user profile but doesnt
            ///////////////////////////////////////////////
            /*firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    console.log("user logged in");
                    if (campusBurnabyButton.hasClass('active')) {
                        user.updateProfile({
                            campus: "Burnaby"
                        }).then(function() {
                            console.log("update success");
                          }).catch(function(error) {
                            console.log("update failed" + error);
                          });
                    } else {
                        user.updateProfile({
                            campus: "Downtown"
                        });
                    }
                }
            });*/
            
            /*
            var user = firebase.auth().currentUser;

            function printUserEmail(){
                db.collection("users").doc(user).onSnapshot(function(snap){
                    console.log(snap.data());
                    console.log(snap.data().email);
                    document.getElementById("currentUserEmail").innerText = snap.data().email;
                })
            }

            printUserEmail();
            */

            ///////////////////////////////////////
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