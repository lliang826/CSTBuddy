# COMP_1800_Team07

COMP 1800 Projects 1 at BCIT

The completed project is hosted on Firebase at: https://comp1800-349e8.web.app/  
Sign-in credentials  
Email: test3@gmail.com  
Password: test3@gmail.com

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)
* [References](#references)

## Team Members
* Bryce Daynard
* Gyephel Tenzin
* Lawrence Liang

## General Info
This browser based web application is designed to
help BCIT students navigate the student services resource pages so they can quickly find the help or information that they need.
	
## Technologies
Technologies used for this project:
* HTML
* CSS
* JavaScript
* JQuery
* Node.js
* Firebase & Firestore
* Bootstrap 
	
## Content
Content of the project folder:

Top level of project folder:  
├── .vscode folder
├── images
├── scripts
├── styles
├── .gitignore               
├── 404.html                 # Error page for when a page is not found.
├── homepage.html            # Page that loads after user logs in, also where the chatbot is located.
├── index.html               # Landing HTML file, this is what users see when you come to url.
├── learnmore.html           # Information about our app and it's use.
├── mainpage.html            # Login page for the app.
├── profile.html             # Users profile page.
└── README.md

Sub-folders and their files:

.vscode:  
└── settings.json            # contains liveServer information.

images:  
├── BCIT-logo.png            # from https://www.bcit.ca (see reference below)
├── Chatbot-icon.png         # index.html page chatbot picture
├── chatbot.svg              # chatbot icon used on homepage.html
├── chatbubble.svg           # chat message icon used on learnmore.html
├── education.jpg            # from https://www.bcit.ca (see reference below)
├── search.svg               # magnifying glass icon used on learnmore.html
└── thumbsup.svg             # thumbs up icon used on learnmore.html

scripts:  
├── chatbotScripts.js        # Javascript, JQuery, and firebase code for manipulation of the chatbot
├── firebase_api.js          # firebase api key to connect to our database
├── login.js                 # Javascript & firebase code for the mainpage.html which allows the user to login.
└── profileScript.js         # Javascript, JQuery, and firebase code for the profile page which allows users to personalize their profile.

styles:  
├── homepage.css             # CSS for the homepage.html.
├── index.css                # CSS for the index.html page.
├── learnmore.css            # CSS for the learnmore.html page.
├── mainpage.css             # CSS for the mainpage.html.
└── profilepage.css          # CSS for the profilepage.html.

Firebase hosting files: 
├── .firebaserc               
├── firebase.json             
├── firestore.indexes.json   
└── firestore.rules          

## References

# Images:

All but for 2 pictures used were obtained from attribution-free sources. 

The two exceptions are the BCIT-logo.png and education.jpg which were used
due to our projects adjacency to the British Columbia Institute of 
Technology since we are currently enrolled a program at the institute. 

These images were found on https://www.bcit.ca and are used with the 
understanding that our project is related to the school and it's students.

# Libraries:

Bootstrap -> Used various Bootsrap componenets
https://getbootstrap.com/

Firebase -> Used firebase to register and store data (technically in firestore).

# Open-source projects:

Initally started using the chatbot created by Landgreen as a template
https://codepen.io/lilgreenland/pen/pyVvqB 

However, we have significantly changed a vast majority of the code and functionality to suit our specific project.
