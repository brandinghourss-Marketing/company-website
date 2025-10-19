<?php
// ----------------------------------------------------
// REQUIRED CONFIGURATION
// ----------------------------------------------------
// 1. The email address where you want to receive the form submissions (YOUR EMAIL)
$recipient_email = "contact@brandinghours.com"; 

// 2. The 'From' address. **Must be an existing email on your hosting domain** for best delivery.
$sender_email_domain = "webmaster@brandinghours.com"; 

// 3. The URL of the page the user will see after a successful submission 
$thank_you_url = "/thank-you.html"; 
// ----------------------------------------------------


if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    die("Method Not Allowed. Please submit the form.");
}

// 1. Sanitize and Validate Inputs
$name     = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email    = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$company  = filter_input(INPUT_POST, 'company', FILTER_SANITIZE_STRING);
$service  = filter_input(INPUT_POST, 'service', FILTER_SANITIZE_STRING);
$message  = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// Basic check for required fields (Name, Email, Message)
if (!$name || !$email || !$message) {
    http_response_code(400);
    die("Error: Name, Email, and Project Details are required fields.");
}

// 2. Construct the Email Content
$subject_line = "NEW WEBSITE INQUIRY: " . (empty($service) ? "General Contact" : ucwords(str_replace('-', ' ', $service)));

$email_body = "You have received a new project inquiry from your website contact form.\n\n";
$email_body .= "--------------------------------------------------\n";
$email_body .= "Client Details:\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
$email_body .= "Company: " . (empty($company) ? "N/A" : $company) . "\n";
$email_body .= "Service Interested In: " . (empty($service) ? "N/A" : ucwords(str_replace('-', ' ', $service))) . "\n";
$email_body .= "--------------------------------------------------\n";
$email_body .= "Project Details:\n" . $message . "\n";
$email_body .= "--------------------------------------------------\n";


// 3. Set Email Headers
// The Reply-To is crucial: it lets you hit "Reply" in your inbox and send the email back to the client's address.
$headers = "From: " . $sender_email_domain . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-type: text/plain; charset=utf-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// 4. Send the Email
if (mail($recipient_email, $subject_line, $email_body, $headers)) {
    // Success: Redirect the user to the thank you page
    header("Location: " . $thank_you_url);
    exit;
} else {
    // Failure: Display a simple error
    http_response_code(500);
    die("Sorry, there was an issue sending your message. Please try again.");
}
?>