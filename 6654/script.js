// Login Form Handler
function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember');
    
    console.log('Login attempt:', {
        email: email,
        password: password,
        remember: remember === 'on'
    });
    
    // Show success message
    alert('Login successful! Redirecting to home page...');
    
    // Redirect to home page
    window.location.href = 'index.html';
    
    return false;
}

// Register Form Handler
function handleRegister(event) {
    event.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const agreeToTerms = formData.get('agreeToTerms');
    
    let hasError = false;
    
    // Validate password length
    if (password.length < 8) {
        showError('passwordError', 'Password must be at least 8 characters long');
        hasError = true;
    }
    
    // Validate password match
    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        hasError = true;
    }
    
    // Validate terms agreement
    if (!agreeToTerms) {
        showError('termsError', 'You must agree to the terms and conditions');
        hasError = true;
    }
    
    // If there are errors, stop submission
    if (hasError) {
        return false;
    }
    
    // Get all form data
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: password,
        agreeToTerms: agreeToTerms === 'on',
        subscribeNewsletter: formData.get('subscribeNewsletter') === 'on'
    };
    
    console.log('Registration attempt:', data);
    
    // Show success message
    alert('Account created successfully! Redirecting to login page...');
    
    // Redirect to login page
    window.location.href = 'login.html';
    
    return false;
}

// Newsletter Form Handler
function handleNewsletter(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email') || formData.get(0); // Handle both named and unnamed inputs
    
    console.log('Newsletter subscription:', email);
    
    // Show success message
    alert('Thank you for subscribing to our newsletter!');
    
    // Clear the form
    event.target.reset();
    
    return false;
}

// Helper function to show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        // Add error class to associated input
        const input = errorElement.previousElementSibling;
        if (input && input.tagName === 'INPUT') {
            input.classList.add('error');
        }
    }
}

// Helper function to clear all errors
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.classList.remove('show');
    });
    
    const errorInputs = document.querySelectorAll('input.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
}

// Real-time password validation
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        
        // Clear error when user starts typing
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                const errorElement = document.getElementById('passwordError');
                if (errorElement) {
                    errorElement.textContent = '';
                    errorElement.classList.remove('show');
                    passwordInput.classList.remove('error');
                }
            });
        }
        
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', function() {
                const errorElement = document.getElementById('confirmPasswordError');
                if (errorElement) {
                    errorElement.textContent = '';
                    errorElement.classList.remove('show');
                    confirmPasswordInput.classList.remove('error');
                }
            });
        }
        
        // Clear terms error when checkbox is checked
        const agreeToTermsCheckbox = document.getElementById('agreeToTerms');
        if (agreeToTermsCheckbox) {
            agreeToTermsCheckbox.addEventListener('change', function() {
                const errorElement = document.getElementById('termsError');
                if (errorElement && agreeToTermsCheckbox.checked) {
                    errorElement.textContent = '';
                    errorElement.classList.remove('show');
                }
            });
        }
    }
    
    // Update basket count from localStorage
    updateBasketCount();
    
    // Make product cards clickable
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            window.location.href = 'product-detail.html';
        });
    });
});

// Update basket count
function updateBasketCount() {
    const basket = JSON.parse(localStorage.getItem('f17Basket')) || [];
    const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
    const basketBadge = document.querySelector('.cart-badge');
    if (basketBadge) {
        basketBadge.textContent = totalItems;
    }
}