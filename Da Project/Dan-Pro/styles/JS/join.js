// Join Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const passwordToggles = document.querySelectorAll('.password-toggle');

    // Password visibility toggle
    passwordToggles.forEach((toggle, index) => {
        toggle.addEventListener('click', function() {
            const input = passwordInputs[index];
            const type = input.getAttribute('type');
            input.setAttribute('type', type === 'password' ? 'text' : 'password');
            this.classList.toggle('bx-hide');
            this.classList.toggle('bx-show');
        });
    });

    // Form validation
    function validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return password.length >= minLength && 
               hasUpperCase && 
               hasLowerCase && 
               hasNumbers && 
               hasSpecialChar;
    }

    // Real-time password validation feedback
    passwordInputs[0].addEventListener('input', function() {
        const password = this.value;
        const validationFeedback = document.createElement('div');
        validationFeedback.classList.add('validation-feedback');
        
        const requirements = [
            { test: password.length >= 8, text: 'At least 8 characters' },
            { test: /[A-Z]/.test(password), text: 'One uppercase letter' },
            { test: /[a-z]/.test(password), text: 'One lowercase letter' },
            { test: /\d/.test(password), text: 'One number' },
            { test: /[!@#$%^&*(),.?":{}|<>]/.test(password), text: 'One special character' }
        ];

        // Update validation feedback
        const existingFeedback = this.parentElement.querySelector('.validation-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        validationFeedback.innerHTML = requirements
            .map(req => `<div class="${req.test ? 'valid' : 'invalid'}">${req.text}</div>`)
            .join('');

        this.parentElement.appendChild(validationFeedback);
    });

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate passwords match
        if (data.password !== data['confirm-password']) {
            showError('Passwords do not match');
            return;
        }

        // Validate password strength
        if (!validatePassword(data.password)) {
            showError('Password does not meet requirements');
            return;
        }

        try {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Creating Account...';

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success handling
            showSuccess('Account created successfully!');
            
            // Redirect to dashboard after success
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 2000);

        } catch (error) {
            showError('An error occurred. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

    // Social sign-up handlers
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            handleSocialSignup(provider);
        });
    });

    // Helper functions
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        errorDiv.textContent = message;
        
        // Remove any existing error messages
        const existingError = form.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        form.insertBefore(errorDiv, form.firstChild);
        setTimeout(() => errorDiv.remove(), 5000);
    }

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.classList.add('success-message');
        successDiv.textContent = message;
        
        form.insertBefore(successDiv, form.firstChild);
    }

    async function handleSocialSignup(provider) {
        try {
            // Simulate social auth
            await new Promise(resolve => setTimeout(resolve, 1000));
            showSuccess(`Successfully authenticated with ${provider}`);
            
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 1500);
        } catch (error) {
            showError(`${provider} authentication failed`);
        }
    }
});