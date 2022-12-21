export const createFlutterConfig = (amount, customer)=>{

    return{
        public_key : process.env.FLUTTER_PUBLIC_KEY,
        tx_ref: Date.now(),
        amount: 300,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        customer: {
           email: "seli@gmail.com",
           phone_number: "09065100882",
           name: "bukola victoria"
        },
        customizations: {
            title: "cornelius devs",
            description: "Payment for Items in the cart",
            logo:""
        }
    }
} 

