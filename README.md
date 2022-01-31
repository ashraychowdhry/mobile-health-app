# Mobile Stock Tracker Application - Get personalized news notifications, general information about any US company, and build your watchlist

Made with React Native and Firebase

The application I decided to build was a tool for personal investors to gain insight into the general stock market, as well as their favorite company stocks. Specifically, the application allows users to visually understand whether the market is open or not, search up background information on any publicly traded company via their ticker symbol, create their watchlist of companies they would like to stay informed about, and view relevant news headlines regarding their watchlist. Overall, this project was created with the purpose of creating an application that a beginner investor could use to gain insight into their favorite companies, as well as have a platform to learn about new ticker symbols. I developed this application due to my own personal interest in finance, personal investing, and equity analysis. When I started trading on my own, I often struggled to find clear and convenient access to general information that was not too technical to understand, but also allowed me to learn about potential investment opportunities. In addition, this application also has full database/backend functionality, with user account registration and secure login features, as well as broader personal account information storage and viewing (through a Profile section). User watchlists are also saved in the database for future logout/login information retrieval. Account information is verified upon input, and data is overall supplied by a third party financial API provider. Additional features include homepage background color change when the market is open compared to closed, as well as aesthetic notifications compatible cross-platform that notify market status. There is advanced page navigation through a bottom-tab system, as well as standard navigation through search functionality and login systems (to prevent access to login pages after login).
 
Application Demo Video: https://youtu.be/dCbYHdNwcOM

To run the application, simply clone the repository locally, and run npm install (requires node package manager). This will install the libraries in node_modules locally, and then run npm start upon completion. This will provide you a QR code in the terminal, which you can scan on the Expo Go application on your iPhone, or instead follow the terminal directions to open an emulator in browser. The technologies used in this application were React Native (Frontend), and Firebase (backend/database). The full feature list includes:

•	User registration

•	User additional profile information creation, storage, and retrieval

•	User secured login with input validation

•	Background color change with stock market status

•	Stock company ticker search and general information retrieval, via a third-party API

•	Toast notifications that are local to the platform run on, as well as cross-platform compatible

•	Personalized company news retrieval from third party API (as seen in demo video based on user watchlist)

•	Profile information displaying from database

•	Logout functionality

•	Watchlist database storage and adding to list feature

•	User watchlist data is collected in order to track how users use the application for stocks

•	Bottom-tab navigation, advanced navigation for login systems, back functionality via stacks.

•	Alerting feature upon login to make clear whether the financial market (US) is open or closed
