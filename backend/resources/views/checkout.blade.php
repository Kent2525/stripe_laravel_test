<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Accept a card payment</title>
    <meta name="description" content="A demo of a card payment on Stripe" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link href="{{ asset('css/stripe.css') }}" rel="stylesheet" type="text/css">
    <script src="https://js.stripe.com/v3/"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=fetch"></script>
    <script src="{{ asset('js/stripe.js', true) }}"></script>
    <script>
      var price = 200;
      var reserveId = 1;
      var stripe = Stripe("{{ env('STRIPE_KEY') }}");
    </script>
  </head>

  <body>
    <!-- Display a payment form -->
    <form id="payment-form" class="mt-5 border rounded shadow-sm" style="width:300px;">
      <div id="card-element" class="p-5">
          <!--Stripe.js injects the Card Element-->
      </div>
      <button id="submit" class="block w-full py-3 m-0 bg-green-300 text-gray-500 hover:bg-green-400 hover:text-white">
          <div class="spinner hidden" id="spinner"></div>
          <span id="button-text">支払う</span>
      </button>
  </form>
  <p id="card-error" role="alert"></p>
  <p class="result-message hidden">
      支払いが完了しました。
  </p>
  </body>
</html>
