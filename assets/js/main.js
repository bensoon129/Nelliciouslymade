/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});
})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("food-order-form");
    const quantityFields = document.querySelectorAll("[name='quantity']");
    const specialRequestFields = document.querySelectorAll("[name='special-request']");
    const selectedQuantityLabels = document.querySelectorAll(".selected-quantity");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Iterate through the quantity fields and update the selected quantity labels
        quantityFields.forEach((quantityField, index) => {
            const selectedQuantityLabel = selectedQuantityLabels[index];
            const selectedQuantity = quantityField.value;
            selectedQuantityLabel.textContent = `Quantity: ${selectedQuantity}`;
        });

        // Collect the form data and do something with it (e.g., send it to a server)
        const formData = new FormData(form);
        console.log("Form data:", formData);
    });
});

// JavaScript for Calculating Total Amount
document.addEventListener('DOMContentLoaded', function () {
    const foodItems = document.querySelectorAll('.food-item');
    const totalAmountValue = document.getElementById('total-amount-value');

    // Calculate the total amount when quantity is changed
    function calculateTotalAmount() {
        let total = 0;

        foodItems.forEach((item, index) => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const quantitySelect = item.querySelector('.quantity');
            const price = parseFloat(checkbox.dataset.price);
            const quantity = parseInt(quantitySelect.value);

            if (checkbox.checked) {
                total += price * quantity;
            }
        });

        totalAmountValue.textContent = '$' + total.toFixed(2); // Display total with two decimal places
    }

    // Add event listeners to checkboxes and quantity selects
    foodItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const quantitySelect = item.querySelector('.quantity');

        checkbox.addEventListener('change', calculateTotalAmount);
        quantitySelect.addEventListener('change', calculateTotalAmount);
    });

    // Initial calculation
    calculateTotalAmount();
});
