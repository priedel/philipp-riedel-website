<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Check honeypot field for spam detection
    if (!empty($_POST['honeypot'])) {
        echo "Your message has been sent successfully!";
        exit;
    }
    
    // Rate limiting check
    session_start();
    $current_time = time();
    if (isset($_SESSION['last_submission']) && ($current_time - $_SESSION['last_submission']) < 30) {
        echo "Please wait before submitting another message.";
        exit;
    }
    
    // Validate required fields
    $required_fields = ['name', 'email', 'message'];
    $errors = [];
    
    foreach ($required_fields as $field) {
        if (empty($_POST[$field]) || trim($_POST[$field]) === '') {
            $errors[] = "The $field field is required.";
        }
    }
    
    if (!empty($errors)) {
        echo "Please fill in all required fields: " . implode(', ', $errors);
        exit;
    }
    
    // Sanitize and validate inputs
    $name = htmlspecialchars(strip_tags(trim($_POST['name'])));
    $email = htmlspecialchars(strip_tags(trim($_POST['email'])));
    $message = htmlspecialchars(strip_tags(trim($_POST['message'])));
    $subject = htmlspecialchars(strip_tags(trim($_POST['subject'] ?? 'Contact Form Submission')));
    $budget = htmlspecialchars(strip_tags(trim($_POST['budget'] ?? 'Not specified')));
    $company = htmlspecialchars(strip_tags(trim($_POST['company'] ?? 'Not specified')));
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Please enter a valid email address.";
        exit;
    }
    
    // Filter out spam
    if (strtolower($name) === 'robertnub') {
        echo "Your message has been sent successfully!";
        exit;
    }
    
    // EMAIL 1: Send to you (business owner)
    $to_business = "philipp@systems-strategy.com";
    $business_subject = "New Contact Form Submission: " . $subject;
    
    $business_body = "New contact form submission:\n\n";
    $business_body .= "Name: $name\n";
    $business_body .= "Email: $email\n";
    $business_body .= "Company: $company\n";
    $business_body .= "Budget Range: $budget\n";
    $business_body .= "Subject: $subject\n\n";
    $business_body .= "Message:\n$message\n\n";
    $business_body .= "---\n";
    $business_body .= "Submitted at: " . date('Y-m-d H:i:s') . "\n";
    $business_body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    $business_headers = "From: $name <$email>\r\n";
    $business_headers .= "Reply-To: $email\r\n";
    $business_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $business_headers .= "X-Mailer: PHP/" . phpversion();
    
    // EMAIL 2: Send confirmation to customer
    $to_customer = $email;
    $customer_subject = "Thank you for contacting Systems and Strategy - Confirmation";
    
    $customer_body = "Dear $name,\n\n";
    $customer_body .= "Thank you for contacting Systems and Strategy. We have received your message and will get back to you as soon as possible.\n\n";
    $customer_body .= "Here's a copy of your submission:\n\n";
    $customer_body .= "Name: $name\n";
    $customer_body .= "Email: $email\n";
    $customer_body .= "Company: $company\n";
    $customer_body .= "Budget Range: $budget\n";
    $customer_body .= "Subject: $subject\n\n";
    $customer_body .= "Your Message:\n$message\n\n";
    $customer_body .= "---\n";
    $customer_body .= "We typically respond within 48 hours during business days.\n\n";
    $customer_body .= "Best regards,\n";
    $customer_body .= "Philipp Riedel\n";
    $customer_body .= "Systems and Strategy\n";
    $customer_body .= "Email: philipp@systems-strategy.com\n";
    $customer_body .= "Website: https://systems-strategy.com";
    
    $customer_headers = "From: Systems and Strategy <philipp@systems-strategy.com>\r\n";
    $customer_headers .= "Reply-To: philipp@systems-strategy.com\r\n";
    $customer_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $customer_headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send both emails
    $business_sent = mail($to_business, $business_subject, $business_body, $business_headers);
    $customer_sent = mail($to_customer, $customer_subject, $customer_body, $customer_headers);
    
    if ($business_sent && $customer_sent) {
        $_SESSION['last_submission'] = $current_time;
        echo "Your message has been sent successfully! A confirmation email has been sent to your email address.";
    } elseif ($business_sent) {
        $_SESSION['last_submission'] = $current_time;
        echo "Your message has been sent successfully! However, we couldn't send a confirmation email to your address.";
    } else {
        echo "Sorry, there was an error sending your message. Please try again later.";
    }
    
} else {
    echo "Invalid request method.";
}
?>
