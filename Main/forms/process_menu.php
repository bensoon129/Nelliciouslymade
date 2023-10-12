<!DOCTYPE html>
<html>
<head>
    <title>Order Summary</title>
</head>
<body>
    <h1>Order Summary</h1>
    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['items']) && is_array($_POST['items'])) {
            $selectedItems = $_POST['items'];
            
            // Define menu item prices
            $menuPrices = [
                'Magnam Tiste' => 5.95,
                'Aut Luia' => 14.95,
                'Est Eligendi' => 8.95,
            ];
            
            $total = 0;

            echo '<p>Your order contains the following items:</p>';
            echo '<ul>';
            foreach ($selectedItems as $item => $quantity) {
                if (array_key_exists($item, $menuPrices) && $quantity > 0) {
                    $subtotal = $menuPrices[$item] * $quantity;
                    echo '<li>' . $item . ' x ' . $quantity . ' - $' . $subtotal . '</li>';
                    $total += $subtotal;
                }
            }
            echo '</ul>';
            
            echo '<p>Total Order Amount: $' . number_format($total, 2) . '</p>';
        } else {
            echo 'Please select at least one item from the menu.';
        }
    }
    ?>
</body>
</html>
