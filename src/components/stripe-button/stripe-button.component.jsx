import React from "react";
import StripeCheckOut from "react-stripe-checkout";

const StripeCheckOutButton =({price})=>{
    const priceForStripe= price * 100;
    const publishableKey= "pk_test_FcPMimt6xsw77ZRLg1CEyN0K00casaZhzX";
    const onToken = token=>{
        console.log(token);
        alert("Payment successful");
    };

    return(
        <StripeCheckOut 
            label="Pay Now"
            name="Crwn Clothing Ltd."
            billingAddress
            shippingAddress
            image="http://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />

    )
};

export default StripeCheckOutButton;