// A reference to Stripe.js initialized with your real test publishable API key.
var stripe = Stripe(env('STRIPE_KEY'));

// The items the customer wants to buy
var purchase = {
  items: [{ id: "xl-tshirt" }]
};

window.onload = function() {
  var purchase = {
      price: price
  };

  document.querySelector("button").disabled = true;
  fetch("http://127.0.0.1:8293/payment", {
    method: "POST",
    headers: {
      'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].content,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(purchase)

  }).then(function (result) {
    return result.json();

  }).then(function (data) {
    var elements = stripe.elements();

    var card = elements.create("card");
    // Stripe injects an iframe into the DOM
    card.mount("#card-element");

    card.on("change", function (event) {
      document.querySelector("button").disabled = event.empty;
      document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
    });
    var form = document.getElementById("payment-form");
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Complete payment when the submit button is clicked

      payWithCard(stripe, card, data.clientSecret);
    });
  });
}

// Calls stripe.confirmCardPayment
// If the card requires authentication Stripe shows a pop-up modal to
// prompt the user to enter authentication details without leaving your page.
var payWithCard = function(stripe, card, clientSecret) {
  loading(true);
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card
      }
    })
    .then(function(result) {
      if (result.error) {
        // Show error to your customer
        showError(result.error.message);
      } else {
        // The payment succeeded!
        orderComplete(result.paymentIntent.id);
      }
    });
};

/* ------- UI helpers ------- */

// Shows a success message when the payment is complete
var orderComplete = function(paymentIntentId) {
  loading(false);
  document
    .querySelector(".result-message a")
    .setAttribute(
      "href",
      "https://dashboard.stripe.com/test/payments/" + paymentIntentId
    );
  document.querySelector(".result-message").classList.remove("hidden");
  document.querySelector("button").disabled = true;
};

// Show the customer the error from Stripe if their card fails to charge
var showError = function(errorMsgText) {
  loading(false);
  var errorMsg = document.querySelector("#card-error");
  errorMsg.textContent = errorMsgText;
  setTimeout(function() {
    errorMsg.textContent = "";
  }, 4000);
};

// Show a spinner on payment submission
var loading = function(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("button").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("button").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
};
