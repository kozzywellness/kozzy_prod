// JavaScript for Login Form
const form = document.querySelector('.form-box form');
const usernameInput = document.querySelector('input[type="text"]');
const passwordInput = document.querySelector('input[type="password"]');
const loginButton = document.querySelector('.btn');
const welcomeText = document.querySelector('.info-text h2');

// Greet based on the time of the day
const currentTime = new Date().getHours();
if (currentTime < 12) {
    welcomeText.textContent = "Good Morning! Welcome back To Kozzy!";
} else if (currentTime < 18) {
    welcomeText.textContent = "Good Afternoon! Welcome back To Kozzy!";
} else {
    welcomeText.textContent = "Good Evening! Welcome back to Kozzy!";
}

// Form validation
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (usernameInput.value.trim() === "" || passwordInput.value.trim() === "") {
        alert("Please fill in all fields!");
    } else {
        alert(`Welcome, ${usernameInput.value}!`);
        form.reset();
    }
});

// Hover effect for the login button
loginButton.addEventListener('mouseover', () => {
    loginButton.style.backgroundColor = '#fff';
    loginButton.style.color = '#081b29';
});

loginButton.addEventListener('mouseout', () => {
    loginButton.style.backgroundColor = '#0ef';
    loginButton.style.color = '#081b29';
});
