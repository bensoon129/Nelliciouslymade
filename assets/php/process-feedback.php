<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $feedback = $_POST["feedback"];

    $to = 'benbennenedictdict@gmail.com'; // Replace with your email address
    $subject = 'Feedback Submission';
    $message = "Name: $name\nEmail: $email\nFeedback:\n$feedback";

    // Additional headers for sending an HTML email
    $headers = "From: $email" . "\r\n" .
        "Reply-To: $email" . "\r\n" .
        "Content-Type: text/plain; charset=UTF-8" . "\r\n";

    if (mail($to, $subject, $message, $headers)) {
        // Email sent successfully
        echo "Thank you for your feedback!";
    } else {
        // Email sending failed
        echo "Oops! Something went wrong. Please try again later.";
    }
}
?>
