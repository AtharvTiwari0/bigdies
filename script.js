// FIREBASE CONFIGURATION - Replace with your Keys from Firebase Console
const firebaseConfig = {;
  apiKey: "AIzaSyD-Vlsm5O7wNRXOS-8u6-c5ZQW-6YrZIu0",
  authDomain: "bigdies.firebaseapp.com",
  databaseURL: "https://bigdies-default-rtdb.firebaseio.com",
  projectId: "bigdies",
  storageBucket: "bigdies.firebasestorage.app",
  messagingSenderId: "482424149297",
  appId: "1:482424149297:web:f93e6bc140a6b024c34c10",
};

// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Navigation Logic
window.navigateTo = function(pageId) {
    document.querySelectorAll('section').forEach(sec => {
        sec.style.display = 'none';
        sec.classList.remove('active');
    });
    const target = document.getElementById(pageId);
    target.style.display = 'flex';
    setTimeout(() => target.classList.add('active'), 50);
    window.scrollTo(0, 0);
};

// Handle "Other" in Dropdown
window.checkOther = function(select) {
    const otherInput = document.getElementById('otherInput');
    otherInput.style.display = (select.value === 'other') ? 'block' : 'none';
    if(select.value === 'other') otherInput.required = true;
};

// Form Submission to Firebase
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('userName').value,
            help_type: document.getElementById('helpType').value,
            other_detail: document.getElementById('otherInput').value || "None",
            mobile: document.getElementById('userMobile').value,
            email: document.getElementById('userEmail').value,
            message: document.getElementById('userMessage').value,
            timestamp: new Date().toLocaleString()
        };

        // Saving to 'contacts' node in Realtime Database
        push(ref(database, 'contacts'), formData)
            .then(() => {
                document.getElementById('success-msg').style.display = 'block';
                contactForm.reset();
                setTimeout(() => {
                    document.getElementById('success-msg').style.display = 'none';
                }, 5000);
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });
}
