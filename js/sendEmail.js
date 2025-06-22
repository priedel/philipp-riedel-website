document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('form-status');
    
    // Real-time validation for required fields
    const requiredFields = ['name', 'email', 'message'];
    
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const errorDiv = document.getElementById(fieldName + '-error');
        
        field.addEventListener('blur', function() {
            validateField(field, errorDiv);
        });
        
        field.addEventListener('input', function() {
            if (errorDiv.textContent) {
                validateField(field, errorDiv);
            }
        });
    });
    
    function validateField(field, errorDiv) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            errorDiv.textContent = 'This field is required.';
            field.classList.add('error');
            return false;
        } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
            errorDiv.textContent = 'Please enter a valid email address.';
            field.classList.add('error');
            return false;
        } else if (field.hasAttribute('minlength') && field.value.length < field.getAttribute('minlength')) {
            errorDiv.textContent = `Minimum ${field.getAttribute('minlength')} characters required.`;
            field.classList.add('error');
            return false;
        } else {
            errorDiv.textContent = '';
            field.classList.remove('error');
            return true;
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Form submission handling
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all required fields
        let isValid = true;
        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const errorDiv = document.getElementById(fieldName + '-error');
            if (!validateField(field, errorDiv)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            statusDiv.innerHTML = '<div class="status status--error">Please correct the errors above.</div>';
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Submit form via AJAX
        const formData = new FormData(form);
        
        fetch('send_email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data.includes('successfully')) {
                statusDiv.innerHTML = '<div class="status status--success">' + data + '</div>';
                form.reset();
            } else {
                statusDiv.innerHTML = '<div class="status status--error">' + data + '</div>';
            }
        })
        .catch(error => {
            statusDiv.innerHTML = '<div class="status status--error">An error occurred. Please try again.</div>';
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
});

