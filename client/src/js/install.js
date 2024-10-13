const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

// Listen for the `beforeinstallprompt` event and store it
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  
  // Save the event so it can be triggered later
  deferredPrompt = event;
  
  // Remove the hidden class from the install button
  butInstall.style.display = 'block';
  
  console.log('beforeinstallprompt event fired');
});

// Implement a click event handler for the install button
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // Clear the deferredPrompt so it can only be used once
    deferredPrompt = null;
    
    // Hide the install button after installation
    butInstall.style.display = 'none';
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed', event);
});
