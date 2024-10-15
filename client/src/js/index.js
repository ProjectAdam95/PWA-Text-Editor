// Import Workbox for service worker registration and other functionalities
import { Workbox } from 'workbox-window';
import Editor from './editor';  // Import the Editor class
import './database';  // Import the database configuration
import '../css/style.css';  // Import the CSS for styling

// Select the main HTML element with the id of 'main'
const main = document.querySelector('#main');
main.innerHTML = '';  // Clear the inner HTML of the 'main' element

// Function to display a loading spinner while waiting for the editor to initialize
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');  // Add a class for styling
  spinner.innerHTML = `
  <div class="loading-container">
    <div class="loading-spinner"></div>
  </div>
  `;
  // Append the spinner element to the 'main' element
  main.appendChild(spinner);
};

// Create a new instance of the Editor class
const editor = new Editor();

// Check if the editor is undefined (i.e., it didn't initialize properly)
if (typeof editor === 'undefined') {
  loadSpinner();  // Display the loading spinner if the editor is not initialized
}

// Check if service workers are supported by the browser
if ('serviceWorker' in navigator) {
  // Register the service worker using Workbox
  const workboxSW = new Workbox('/service-worker.js');  // Service worker file path
  workboxSW.register();  // Register the service worker
} else {
  // Log an error if service workers are not supported
  console.error('Service workers are not supported in this browser.');
}
