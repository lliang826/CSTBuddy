var lastUserMessage = "", //keeps track of the most recent input string from the user
            botMessage = "", //var keeps track of what the chatbot is going to say
            botName = 'CST Buddy', //name of the chatbot
            resourceType = "";
            
        
        //var botLink = document.createElement('a');

        var yesButton = document.createElement("button");
        var noButton = document.createElement("button");
        yesButton.textContent = 'Yes!';
        yesButton.className = 'btn btn-primary';
        noButton.textContent = 'Not really';
        noButton.className = 'btn btn-primary';

        const chatBox = document.getElementById("chatborder");

        //edit this function to change what the chatbot says
        function chatbotResponse() {

            lastUserMessage = lastUserMessage.toLowerCase();

            botMessage =
                "Sorry, I don't understand that input. Type &quot;list&quot; for a list of commands."; //the default message

            //List of commands
            if (lastUserMessage.includes("list")) {
                botMessage =
                    "Here is a list of things you can ask me regarding the student services at BCIT for the CST program: " +
                    "&quotcoop&quot, &quotfinancial aid&quot, &quotclubs&quot, &quotrecreation&quot, &quotinternational&quot, " +
                    "&quothealth&quot, or &quothousing&quot. You can also ask me for &quotRecent Pages&quot or for &quotTop " +
                    "Visited Pages&quot."
            }

            //Introductory hello message
            if (lastUserMessage.includes("hello") || lastUserMessage.includes("hi")) {
                botMessage = "Welcome to CST Buddy! How may I help you today? " +
                    "To get started, type &quot;Recent Pages&quot; or &quot;Top Visited Pages&quot;. " +
                    "You can also ask me things like &quot;coop&quot;, &quot;financial aid&quot;, &quot;clubs&quot;, or anything" +
                    " else related to CST at BCIT!";
            }

            //Coop
            if (lastUserMessage.includes("coop") || lastUserMessage.includes("co-op") || lastUserMessage.includes("co op")) {

                resourceType = "coop";
                
                /* 
                *This code will allow change how URLs are output
                *
                var botLinkMessage = document.createTextNode("Click here to find out more about CST coop.");
                if (botLink.hasChildNodes()) {
                    botLink.removeChild(botLink.childNodes[0]);
                }
                botLink.appendChild(botLinkMessage);
                //var str1 = "<a href='' target='_blank' id='s1'>Click here to find out more about CST coop.</a>";
                db.collection("resources").doc(resourceType).get().then(function (c) {
                    botLink.href = c.data().url;
                });
                var str2 = "<br><br>Did you find this information/link useful?";

                botMessage = str2; 
                *
                */
                var str1 = "<a href='' target='_blank' id='s1'>Click here to find out more about CST coop.</a>";
                db.collection("resources").doc(resourceType).get().then(function (c) {
                    document.getElementById("s1").href = c.data().url;
                    console.log(c.data().url);
                    console.log(str1);
                });
                var str2 = "<br><br>Did you find this information/link useful?";

                /*db.collection('resources').doc(resourceType).update({
                visitCount: firebase.firestore.FieldValue.increment(1)
                })*/
                visitCounter();
                botMessage = str1 + str2;
            }

            //Financial Aid
            if (lastUserMessage.includes("financial aid")) {

                resourceType = "financial_aid";

                var str3 =
                    "<a href='' target='_blank' id='s2'>Click here to find out more about financial aid for CST students.</a>";
                db.collection("resources").doc(resourceType).get().then(function (c) {
                    document.getElementById("s2").href = c.data().url;
                    console.log(str3);
                });
                var str4 = "<br><br>Did you find this information/link useful?";

                visitCounter();

                botMessage = str3 + str4;
            }

            //Clubs
            if (lastUserMessage.includes("clubs")) {

                resourceType = "clubs";

                var str5 = "<a href='' target='_blank' id='s3'>Click here to find out more about clubs at BCIT.</a>";
                db.collection("resources").doc(resourceType).get().then(function (c) {
                    document.getElementById("s3").href = c.data().url;
                    console.log(str5);
                });
                var str6 = "<br><br>Did you find this information/link useful?";

                visitCounter();

                botMessage = str5 + str6;
            }

            //Recreation
            if (lastUserMessage.includes("recreation")) {

                resourceType = "recreation";

                var str7 =
                    "<a href='' target='_blank' id='s4'>Click here to find out more about the recreation services at BCIT.</a>";
                db.collection("resources").doc(resourceType).get().then(function (c) {
                    document.getElementById("s4").href = c.data().url;
                    console.log(str7);
                });
                var str8 = "<br><br>Did you find this information/link useful?";

                visitCounter();

                botMessage = str7 + str8;
            }

            //International
            if (lastUserMessage.includes("international")) {

                resourceType = "international";

                var str9 =
                    "<a href='' target='_blank' id='s5'>If you are an international student, click here to find out more about study and work permits, insurance, and more.</a>";
                db.collection("resources").doc(resourceType).get().then(function (c) {
                    document.getElementById("s5").href = c.data().url;
                    console.log(str9);
                });
                var str10 = "<br><br>Did you find this information/link useful?";

                visitCounter();

                botMessage = str9 + str10;
            }

            //Health
            if (lastUserMessage.includes("health")) {

                resourceType = "health";

                var str11 =
                    "<a href='' target='_blank' id='s6'>Click here to find out more about Health and Wellness.</a>";
                db.collection("resources").doc(resourceType).get().then(function (c) {
                    document.getElementById("s6").href = c.data().url;
                    console.log(str11);
                });
                var str12 = "<br><br>Did you find this information/link useful?";

                visitCounter();

                botMessage = str11 + str12;
            }

            //Housing
            if (lastUserMessage.includes("housing")) {

                resourceType = "housing";

                var str13 =
                    "<a href='' target='_blank' id='s7'>Click here to find out more about student housing at BCIT.</a>";
                db.collection("resources").doc(resourceType).get().then(function (c) {
                    document.getElementById("s7").href = c.data().url;
                    console.log(str13);
                });
                var str14 = "<br><br>Did you find this information/link useful?";

                visitCounter();

                botMessage = str13 + str14;
            }

        }

        //this runs each time enter is pressed.
        //It controls the overall input and output
        function newEntry() {
            let userMessage = document.createElement("p");
            let newBotMessage = document.createElement("p");
            userMessage.className = "chatlog";
            botMessage.className = "chatlog";
            var linkUsed = false;
            var chatMessage = document.getElementById("chatbox").value.toLowerCase();
            //if the message from the user isn't empty then run 
            if (chatMessage != "" && chatMessage != "most liked" && chatMessage != "top searches" && chatMessage != "my campus") {
                //pulls the value from the chatbox ands sets it to lastUserMessage
                lastUserMessage = document.getElementById("chatbox").value;
                //sets the chat box to be clear
                document.getElementById("chatbox").value = "";
                //adds the lastUserMessage to a new variable which appends to the chatbox for the user to see
                userMessage.innerText = lastUserMessage;
                //sets the variable botMessage in response to lastUserMessage
                chatbotResponse();
                //adds the botMessage to a new variable which can be appended in response to the users (includes html elements).
                newBotMessage.innerHTML = botMessage;
                chatBox.append(userMessage);
                //chatBox.append(botLink); <-- Enable this to change how links are handled (along with other commented out code).
                chatBox.append(newBotMessage);
                //checks if botMessage used a link by looking for an href
                linkUsed = linkCheck();
                if (linkUsed == true) {
                    chatBox.append(yesButton, noButton);
                }
                //keeps the chat bot view at the bottom
                chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
            } else if (chatMessage == "most liked") {
                lastUserMessage = document.getElementById("chatbox").value;
                document.getElementById("chatbox").value = "";
                userMessage.innerText = lastUserMessage;
                chatBox.append(userMessage);

                var intro = document.createElement('p');
                var introMessage = document.createTextNode("Students have found these pages the most useful: ");
                intro.appendChild(introMessage);
                chatBox.append(intro);
                
                db.collection("resources").where("likeCount", ">", 0).orderBy("likeCount", "desc").limit(3)
                .get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {

                        //Creates the anchor element and gives it the text below.
                        var botLink = document.createElement('a');
                        var botLinkMessage = document.createTextNode(doc.id);
                        botLink.appendChild(botLinkMessage);
                        botLink.href = doc.data().url;
                        chatBox.append(botLink);

                        //Creates an empty <p> element which provides spacing
                        var emptyP = document.createElement('p');
                        var emptyPNode = document.createTextNode("");
                        emptyP.appendChild(emptyPNode);
                        chatBox.append(emptyP);

                        chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
            } else if (chatMessage == "top searches") {
                lastUserMessage = document.getElementById("chatbox").value;
                document.getElementById("chatbox").value = "";
                userMessage.innerText = lastUserMessage;
                chatBox.append(userMessage);

                var intro = document.createElement('p');
                var introMessage = document.createTextNode("These are the most searched for pages: ");
                intro.appendChild(introMessage);
                chatBox.append(intro);
                
                db.collection("resources").where("visitCount", ">", 0).orderBy("visitCount", "desc").limit(3)
                .get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {

                        //Creates the anchor element and gives it the text below.
                        var botLink = document.createElement('a');
                        var botLinkMessage = document.createTextNode(doc.id);
                        botLink.appendChild(botLinkMessage);
                        botLink.href = doc.data().url;
                        chatBox.append(botLink);

                        //Creates an empty <p> element which provides spacing
                        var emptyP = document.createElement('p');
                        var emptyPNode = document.createTextNode("");
                        emptyP.appendChild(emptyPNode);
                        chatBox.append(emptyP);

                        chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
            } else if (chatMessage == "my campus") {
                lastUserMessage = document.getElementById("chatbox").value;
                document.getElementById("chatbox").value = "";
                userMessage.innerText = lastUserMessage;
                chatBox.append(userMessage);
                
                firebase.auth().onAuthStateChanged(function (user){
                    db.collection("users").doc(user.uid).onSnapshot(function(snap) {
                        var currentCampus = snap.data().campus;
                        if (currentCampus == "Burnaby") {
                            var intro = document.createElement('p');
                            var introMessage = document.createTextNode("Students attending the Burnaby campus found these links most useful: ");
                            intro.appendChild(introMessage);
                            chatBox.append(intro);
                            db.collection("resources").where("burnabyLikes", ">", 0).orderBy("burnabyLikes", "desc").limit(3)
                            .get().then(function(querySnapshot) {
                                querySnapshot.forEach(function(doc) {

                                    //Creates the anchor element and gives it the text below.
                                    var botLink = document.createElement('a');
                                    var botLinkMessage = document.createTextNode(doc.id);
                                    botLink.appendChild(botLinkMessage);
                                    botLink.href = doc.data().url;
                                    chatBox.append(botLink);

                                    //Creates an empty <p> element which provides spacing
                                    var emptyP = document.createElement('p');
                                    var emptyPNode = document.createTextNode("");
                                    emptyP.appendChild(emptyPNode);
                                    chatBox.append(emptyP);

                                    chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
                                });
                            })
                            .catch(function(error) {
                                console.log("Error getting documents: ", error);
                            });
                        } else if (currentCampus == "Downtown") {
                            var intro = document.createElement('p');
                            var introMessage = document.createTextNode("Students attending the Downtown campus found these links most useful: ");
                            intro.appendChild(introMessage);
                            chatBox.append(intro);
                            db.collection("resources").where("downtownLikes", ">", 0).orderBy("downtownLikes", "desc").limit(3)
                            .get().then(function(querySnapshot) {
                                querySnapshot.forEach(function(doc) {

                                    //Creates the anchor element and gives it the text below.
                                    var botLink = document.createElement('a');
                                    var botLinkMessage = document.createTextNode(doc.id);
                                    botLink.appendChild(botLinkMessage);
                                    botLink.href = doc.data().url;
                                    chatBox.append(botLink);

                                    //Creates an empty <p> element which provides spacing
                                    var emptyP = document.createElement('p');
                                    var emptyPNode = document.createTextNode("");
                                    emptyP.appendChild(emptyPNode);
                                    chatBox.append(emptyP);

                                    chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
                                });
                            })
                            .catch(function(error) {
                                console.log("Error getting documents: ", error);
                            });
                        } else {
                            console.log("No campus found");
                        }
                    })
                })
            } 
        }

        function visitCounter() {
            db.collection('resources').doc(resourceType).update({
                visitCount: firebase.firestore.FieldValue.increment(1)
            })
        };

        yesButton.onclick = function () {
            positiveFeedback();
            campusLike();
            yesButton.remove();
            noButton.remove();

            var thankYou = "Thank you for giving us some feedback! We're glad this link was helpful :)<br>";
            var thankYouHTML = document.createElement('p');
            thankYouHTML.innerHTML = thankYou;
            chatBox.append(thankYouHTML);
        };


        noButton.onclick = function () {
            negativeFeedback();
            campusUnlike();
            yesButton.remove();
            noButton.remove();

            var noThanks = "Thank you for giving us some feedback! We're sorry this link wasn't helpful, we will look into this to try to improve it for future use." 
                + "<br>Is there a different topic we could help you with?<br>";
            var noThanksHTML = document.createElement('p');
            noThanksHTML.innerHTML = noThanks;
            chatBox.append(noThanksHTML);
        };

        function positiveFeedback() {
            db.collection('resources').doc(resourceType).update({
                likeCount: firebase.firestore.FieldValue.increment(1)
            })
        };

        function negativeFeedback() {
            db.collection('resources').doc(resourceType).update({
                likeCount: firebase.firestore.FieldValue.increment(-1)
            })
        }

        function campusLike() {
            var userCampus = "";
            firebase.auth().onAuthStateChanged(function (user){
                db.collection("users").doc(user.uid).onSnapshot(function(snap) {
                    userCampus = snap.data().campus;
                    if (userCampus == "Burnaby") {
                        db.collection('resources').doc(resourceType).update({
                            burnabyLikes: firebase.firestore.FieldValue.increment(1)
                        })
                    } else if (userCampus == "Downtown") {
                        db.collection('resources').doc(resourceType).update({
                            downtownLikes: firebase.firestore.FieldValue.increment(1)
                        })
                    } else {
                        console.log("No campus found");
                    }
                })
            })
        };    

        function campusUnlike() {
            var userCampus = "";
            firebase.auth().onAuthStateChanged(function (user){
                db.collection("users").doc(user.uid).onSnapshot(function(snap) {
                    userCampus = snap.data().campus;
                    if (userCampus == "Burnaby") {
                        db.collection('resources').doc(resourceType).update({
                            burnabyLikes: firebase.firestore.FieldValue.increment(-1)
                        })
                    } else if (userCampus == "Downtown") {
                        db.collection('resources').doc(resourceType).update({
                            downtownLikes: firebase.firestore.FieldValue.increment(-1)
                        })
                    } else {
                        console.log("No campus found");
                    }
                })
            });
        };    

        function linkCheck() {
            if (botMessage.includes("href")) {
                return true;
            } else {
                return false;
            }
        }

        //runs the keypress() function when a key is pressed
        document.onkeypress = keyPress;
        //if the key pressed is 'enter' runs the function newEntry()
        function keyPress(yes) {
            var x = yes || window.event;
            var key = (x.keyCode || x.which);
            if (key == 13 || key == 3) {
                //runs this function when enter is pressed
                newEntry();
            }
            if (key == 38) {
                console.log('hi')
                //document.getElementById("chatbox").value = lastUserMessage;
            }
        }

        //clears the placeholder text ion the chatbox
        //this function is set to run when the users brings focus to the chatbox, by clicking on it
        function placeHolder() {
            document.getElementById("chatbox").placeholder = "";
        }

        function readUserName() {
            firebase.auth().onAuthStateChanged(function (user) {
                db.collection("users").doc(user.uid).onSnapshot(function(snap) {
                    document.getElementById("profileName").innerText = snap.data().name;
                })
            })
        };

        readUserName();