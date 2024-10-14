# PWA Text Editor

A progressive web application (PWA) that allows users to create, edit, and store notes or code snippets, with or without an internet connection. The application provides data persistence using IndexedDB and can be installed as a standalone app on your desktop.

## Introduction

PWA Text Editor by Adam Todorovic

## :ledger: Index

- [About](#beginner-about)
  - [File Structure](#file_folder-file-structure)
  - [Build](#hammer-build)
  - [Deployment](#rocket-deployment)
- [Community](#cherry_blossom-community)
  - [Contribution](#fire-contribution)
- [Resources](#page_facing_up-resources)
- [Gallery](#camera-gallery)
- [Credit/Acknowledgment](#star2-creditacknowledgment)
- [License](#lock-license)

## :beginner: About

This PWA Text Editor application is built to run in the browser and can be installed as a desktop application. It works both online and offline, utilizing IndexedDB for data storage and providing users with the ability to take and store notes. It follows a client-server folder structure, is bundled with Webpack, and uses service workers to cache static assets for offline usage.

### :file_folder: File Structure

```plaintext
PWA-TEXT-EDITOR/
├── client/
│   ├── dist/
│   ├── src/
│   ├── .gitignore
│   ├── package.json
│   └── webpack.config.js
├── server/
│   ├── routes/
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── .env
├── README.md

```

### :hammer: Build

- **IndexedDB**: This application uses IndexedDB to store data offline, ensuring persistence of notes even without an internet connection.
- **Webpack**: JavaScript files are bundled using Webpack. The application also generates an HTML file, service worker, and manifest file through Webpack plugins.
- **Service Worker**: A service worker is registered and created using Workbox, which caches static assets and enables the application to run offline.
- **Babel**: The app uses Babel to ensure that modern JavaScript features like `async/await` work across different browsers.
- **Workbox**: Workbox plugins are used to handle caching strategies for static assets, improving offline functionality and performance.
- **PWA**: The app can be installed as a standalone Progressive Web App (PWA), allowing users to access it directly from their desktop or mobile home screen.

### :rocket: Deployment

The application is deployed on Render. The deployment process includes building the app using Webpack, ensuring that service workers and IndexedDB are functioning correctly for offline use.

- Deployed at: [ENTER WEBSITE HERE] (https://pwa-text-editor-p569.onrender.com)
- **Render Setup**: The application includes proper build scripts for deployment on Render, and uses `npm` for both server and client-side setup.
- **No Errors**: The deployed application loads without errors, ensuring a smooth user experience.

### :fire: Contribution

Contributions are encouraged! You can contribute to this project by:

1. **Reporting Bugs**: If you encounter bugs, report them [here](https://github.com/ProjectAdam95/PWA-Text-Editor/issues). I'll take care of them as soon as possible.
2. **Request Features**: Got a feature idea? You can request it [here](https://github.com/ProjectAdam95/PWA-Text-Editor/issues). All suggestions are welcome.
3. **Pull Requests**: If you’d like to contribute to the project, feel free to create a pull request. Pick any open issue and submit your code.

### :page_facing_up: Resources

#### Tools and Libraries

- **VS Code**: A versatile code editor used for building and debugging the project.
- **Git Bash**: A command-line interface used for version control and project management.
- **Node.js**: JavaScript runtime used for server-side development.
- **Express.js**: Web framework for Node.js used to build the backend.
- **Webpack**: Module bundler used for compiling JavaScript, HTML, and CSS files.
- **Babel**: Transpiler that converts modern JavaScript code into compatible versions for all browsers.
- **Workbox**: Library for managing caching, service workers, and offline functionality in PWAs.
- **IndexedDB**: Database used to store the user’s notes offline.
  
### :camera: Gallery

Below are screenshots of the deployed application once installed,
Photos are showing the console via the installed application in offline mode: please click below!

https://imgur.com/a/kbwsIln



### :star2: Credit/Acknowledgment

This project was developed by Adam Todorovic.

### :lock: License

This project is licensed under the MIT License.