[![License](https://img.shields.io/badge/License-Flask-blue.svg)](https://flask.palletsprojects.com/en/1.1.x/) [![License](https://img.shields.io/badge/License-Angular%202-blue.svg)](https://angular.io/) [![License](https://img.shields.io/badge/License-Flask%20Restful%20API-blue.svg)](https://flask-restful.readthedocs.io/en/latest/) [![License](https://img.shields.io/badge/License-SQLite-blue.svg)](https://www.sqlite.org/index.html) [![License](https://img.shields.io/badge/License-Python3-blue.svg)](https://www.python.org/) [![Contributor](https://img.shields.io/badge/Contributor-4-brightgreen)](https://github.com/comp3300-comp9900-term-3-2019/capstone-project-nomoreprojectpls/graphs/contributors)

# COMP3900 Cocorico Accommodation Management System
- `diary/` directory contains:
    - each team member's diary.
- `backend/` directory contains:
    - all backend code using Flask framework;
    - database files using SQLite;
    - You can go to [backend/README.md](./backend/README.md) to see its internal directory tree structure.
- `frontend/` directory contains:
    - all frontend code using Angular8 framework;
    - [frontend/src/app](./frontend/src/app) contains all Angular components. You can find each component description in our final report.

## Team members:

|     Name     |   Zid    |   Role   |
| :----------: | :------: | :-------: |
| Ziming Zheng | z5052592 |   Scrum Master  |
| Chenming Fan | z5125807 | Developer |
| Shunyang Li  | z5139935 | Developer |
|   Li Ding    | z5138091 | Developer |

## Set up instructions:
You have to build backend dev server and frontend dev serve separately in two different terimals in your computer.
- Step 0: Open a terminal in your computer.
- Step 1(Building frontend dev server): Follow the instructions in [frontend/README.md](./frontend/README.md) to set up Angular frontend dev server.
- Step 2: Open another terimal in your computer.
- Step 3(Building backend dev server): Follow the instructions in [backend/README.md](./backend/README.md) to set up Flask backend dev server.
- Step 4: You are ready to go! Open a tab in your browser and type `http://localhost:4200` to start exploring our website. (You may have opened this tab when you set up the Angular dev server)

## Acknowledgement
- We use this [HTML template](http://www.bootstrapmb.com/item/420/preview) for our project graphical user interface.
- We use [Dialogflow](https://dialogflow.com) to develop our booking chatbot.
- We use [Mapbox](https://www.mapbox.com) to develop our iterinaray planner component on the frontend.
- We use [booking.com API provided by RapidAPI](https://rapidapi.com/apidojo/api/booking) to develop our room recommendations on the side of chatbot.
- You can read more regarding API reference in our final report. 