import React, { useState } from 'react';
const backendBaseUrl = 'http://localhost:3000';

function Rajorpay({ order }) {

    return (
        <>
            <script
                src="https://checkout.razorpay.com/v1/checkout.js"
                data-key="rzp_test_PWmHaZGO64IgQc"
                data-amount={order.amount}
                data-currency="INR"
                data-order_id={order.id}
                data-buttontext="Pay with Razorpay"
                data-name="HealthCare"
            ></script>
        </>
    );
}

export default Rajorpay;
