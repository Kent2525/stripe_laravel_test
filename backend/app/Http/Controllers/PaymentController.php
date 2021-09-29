<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use Error;

class PaymentController extends Controller
{
    public function payment()
{
    \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
    header('Content-Type: application/json');

    $params = json_decode(file_get_contents('php://input'), true);

    try {
        $paymentIntent = \Stripe\PaymentIntent::create([
            'amount' => 4000,
            'currency' => 'jpy',
        ]);
        $output = [
            'clientSecret' => $paymentIntent->client_secret,
        ];
        echo json_encode($output);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
}
