<?php
require 'vendor/autoload.php'; // Include Stripe PHP library

\Stripe\Stripe::setApiKey('YOUR_STRIPE_SECRET_KEY'); // Replace with your own secret key

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['stripeToken'];

    try {
        // Create a charge
        $charge = \Stripe\Charge::create([
            'amount' => 1000, // Amount in cents (adjust as needed)
            'currency' => 'usd', // Adjust currency as needed
            'description' => 'Example Charge',
            'source' => $token,
        ]);

        // Payment was successful
        echo 'Payment successful. Charge ID: ' . $charge->id;
    } catch (\Stripe\Exception\CardException $e) {
        // Card error
        echo 'Card payment failed: ' . $e->getMessage();
    } catch (\Stripe\Exception\InvalidRequestException $e) {
        // Invalid request
        echo 'Invalid payment request: ' . $e->getMessage();
    } catch (\Stripe\Exception\AuthenticationException $e) {
        // Authentication error
        echo 'Authentication error: ' . $e->getMessage();
    } catch (\Stripe\Exception\ApiConnectionException $e) {
        // API connection error
        echo 'API connection error: ' . $e->getMessage();
    } catch (\Stripe\Exception\Base $e) {
        // General Stripe error
        echo 'Stripe error: ' . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Payment Gateway Example</title>
    <script src="https://js.stripe.com/v3/"></script>
</head>
<body>
    <form action="" method="post">
        <script
            src="https://js.stripe.com/v3/"
            data-key="YOUR_STRIPE_PUBLISHABLE_KEY" <!-- Replace with your own publishable key -->
            data-amount="1000" <!-- Amount in cents (adjust as needed) -->
            data-name="Example Company"
            data-description="Example Purchase"
            data-currency="usd" <!-- Adjust currency as needed -->
            data-locale="auto"
            data-label="Pay with Card"
            data-zip-code="true"
        ></script>
    </form>
</body>
</html>
