var lastUserMessage = "", //keeps track of the most recent input string from the user
    botMessage = "", //var keeps track of what the chatbot is going to say
    botName = 'CST Buddy', //name of the chatbot
    resourceType = "",
    userMessage = "",
    criteriaType = "",
    idNum = 0,
    numberString = "";

var letterArray = ["a", "b", "c", "d", "e"];

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
            "&quothealth&quot, or &quothousing&quot. You can also ask me for &quotMost Liked&quot, &quotTop " +
            "Searches&quot, or &quot;My Campus&quot;.";
    }

    //Introductory hello message
    if (lastUserMessage.includes("hello") || lastUserMessage.includes("hi")) {
        botMessage = "Welcome to CST Buddy! How may I help you today? " +
            "To get started, type &quot;Most Liked&quot;, &quot;Top Searches&quot;, or &quot;My Campus&quot;. " +
            "You can also ask me things like &quot;coop&quot;, &quot;financial aid&quot;, &quot;clubs&quot;, or anything" +
            " else related to CST at BCIT!";
    }

    //Coop
    if (lastUserMessage.includes("coop") || lastUserMessage.includes("co-op") || lastUserMessage.includes("co op")) {

        resourceType = "coop";

        var str1 = "Co-Op is a great way to gain practical work experience. Typically in CST your work semester is 8 months long, " + 
            "but it can also be 4 months. Please contact an advisor or your program head for more information. Placements usually " +
            "commence in either January or May<br><br>"

        botMessage = str1;
    }

    //Financial Aid
    if (lastUserMessage.includes("financial aid")) {

        resourceType = "financial_aid";

        var str1 = "Financial aid can support students by providing scholarships, fee deferrals, and student loans. For student loans " +
            "and grants, you will need to apply through StudentAidBC, which is government-funded and repayable with no interest. Please " +
            "check your eligibility and other requirements before applying.<br><br>"

        botMessage = str1;
    }

    //Clubs
    if (lastUserMessage.includes("clubs")) {

        resourceType = "clubs";

        var str1 = "BCIT has tons of different clubs for students to join! No matter what you're interested in, there is a club for you!<br><br>"

        botMessage = str1;
    }

    //Recreation
    if (lastUserMessage.includes("recreation")) {

        resourceType = "recreation";

        var str1 = "All current full-time and part-time BCIT students have complimentary access to the weight Room, gymnasium, change rooms, " +
            "shower facilities, outdoor tracks and courts, and much more. Members of the general public also have access to these facilities, " +
            "but must pay for a membership. BCIT alumni are also required to pay for membership, but at a discounted price.<br><br>"

        botMessage = str1;
    }

    //International
    if (lastUserMessage.includes("international")) {

        resourceType = "international";

        var str1 = "If you are an international student, you may need to apply for a study (or work) permit, as well as medical " +
            " insurance. Check out the link below to find out more about how you can best prepare for studying at BCIT.<br><br>"

        botMessage = str1;
    }

    //Health
    if (lastUserMessage.includes("health")) {

        resourceType = "health";

        var str1 = "Maintaining your health can be a difficult thing, especially while studying remotely. If you are looking " +
            "for confidential one-on-one counseling to find support, BCIT's counselors are here for you. Please note that " +
            "appointments are currently being conducted by phone or by video during this pandemic.<br><br>"

        botMessage = str1;
    }

    //Housing
    if (lastUserMessage.includes("housing")) {

        resourceType = "housing";

        var str1 = "Looking for on campus housing? Click the link below to get started!<br><br>"

        botMessage = str1;
    }

}

function newEntry() {
    let userMessage = document.createElement("p");
    let newBotMessage = document.createElement("p");
    idExpansion();
    newBotMessage.id = numberString; //Create an array that adds on a single letter each time it's run.
    userMessage.className = "chatlog";
    botMessage.className = "chatlog";
    var chatMessage = document.getElementById("chatbox").value.toLowerCase();

    if (chatMessage != "" && chatMessage != "most liked" && chatMessage != "top searches" && chatMessage != "my campus") {

        lastUserMessage = document.getElementById("chatbox").value;
        document.getElementById("chatbox").value = "";
        userMessage.innerText = lastUserMessage;

        chatbotResponse();

        newBotMessage.innerHTML = botMessage;
        chatBox.append(userMessage);
        chatBox.append(newBotMessage);

        queryLink(resourceType);

        chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;

    } else if (chatMessage == "most liked") {

        mostLiked();

    } else if (chatMessage == "top searches") {

        topSearches();

    } else if (chatMessage == "my campus") {

        campusPreference();

    }
};

function idExpansion() {

    numberString = "";

    for (var i = 0; i <= idNum; i++) {
        numberString += numberString + i;
    }
    idNum++;
}

function queryLink(resourceType) {

    db.collection("resources").doc(resourceType).get().then(function (c) {
        var botLink = document.createElement('a');
        var botLinkMessage = document.createTextNode("Click here to find out more.");
        botLink.appendChild(botLinkMessage);
        botLink.href = c.data().url;
        var appender = document.getElementById(numberString);
        appender.append(botLink);

    });

    var feedbackLine = document.createElement("p");
    var feedbackMessage = "Did you find this information/link useful?";
    feedbackLine.innerHTML = feedbackMessage;

    chatBox.append(feedbackLine);
    chatBox.append(yesButton, noButton);

    visitCounter(resourceType);
}

function mostLiked() {
    let userMessage = document.createElement("p");
    userMessage.className = "chatlog";
    lastUserMessage = document.getElementById("chatbox").value;
    document.getElementById("chatbox").value = "";
    userMessage.innerText = lastUserMessage;
    chatBox.append(userMessage);

    var intro = document.createElement('p');
    var introMessage = document.createTextNode("Students have found these pages the most useful: ");
    intro.appendChild(introMessage);
    chatBox.append(intro);

    criteriaType = "likeCount";
    documentLoop(criteriaType);
};

function topSearches() {
    let userMessage = document.createElement("p");
    userMessage.className = "chatlog";
    lastUserMessage = document.getElementById("chatbox").value;
    document.getElementById("chatbox").value = "";
    userMessage.innerText = lastUserMessage;
    chatBox.append(userMessage);

    var intro = document.createElement('p');
    var introMessage = document.createTextNode("These are the most searched for pages: ");
    intro.appendChild(introMessage);
    chatBox.append(intro);

    criteriaType = "visitCount";
    documentLoop(criteriaType);
};

function campusPreference() {
    let userMessage = document.createElement("p");
    userMessage.className = "chatlog";
    lastUserMessage = document.getElementById("chatbox").value;
    document.getElementById("chatbox").value = "";
    userMessage.innerText = lastUserMessage;
    chatBox.append(userMessage);

    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).onSnapshot(function (snap) {
            var currentCampus = snap.data().campus;
            if (currentCampus == "Burnaby") {
                var intro = document.createElement('p');
                var introMessage = document.createTextNode("Students attending the Burnaby campus found these links most useful: ");
                intro.appendChild(introMessage);
                chatBox.append(intro);

                criteriaType = "burnabyLikes";
                documentLoop(criteriaType);

            } else if (currentCampus == "Downtown") {
                var intro = document.createElement('p');
                var introMessage = document.createTextNode("Students attending the Downtown campus found these links most useful: ");
                intro.appendChild(introMessage);
                chatBox.append(intro);

                criteriaType = "downtownLikes";
                documentLoop(criteriaType);

            } else {
                console.log("No campus found");
            }
        });
    });
};

function documentLoop(criteriaType) {
    db.collection("resources").where(criteriaType, ">", 0).orderBy(criteriaType, "desc").limit(3)
        .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {

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
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
};

function visitCounter(resourceType) {
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
    chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
};


noButton.onclick = function () {
    negativeFeedback();
    campusUnlike();
    yesButton.remove();
    noButton.remove();

    var noThanks = "Thank you for giving us some feedback! We're sorry this link wasn't helpful, we will look into this to try to improve it for future use." +
        "<br>Is there a different topic we could help you with?<br>";
    var noThanksHTML = document.createElement('p');
    noThanksHTML.innerHTML = noThanks;
    chatBox.append(noThanksHTML);
    chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
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
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).onSnapshot(function (snap) {
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
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).onSnapshot(function (snap) {
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

document.onkeypress = keyPress;

function keyPress(yes) {
    var x = yes || window.event;
    var key = (x.keyCode || x.which);
    if (key == 13 || key == 3) {
        newEntry();
    }
}

function placeHolder() {
    document.getElementById("chatbox").placeholder = "";
}

function readUserName() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).onSnapshot(function (snap) {
            document.getElementById("profileName").innerText = snap.data().name;
        })
    })
};

readUserName();