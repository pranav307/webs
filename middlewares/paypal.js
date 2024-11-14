import paypal from "paypal-rest-sdk";


paypal.configure({
    mode:"sandbox",
    client_id:'Afgr3rbLsrZGJBVQp3s2RBOhBPOpocFsm6uwVmjEx5SnT0wcDCdJXIjXhvdJAm-iE_ASA9q3MwlLaebL',
    client_secret:'EB8a4U5n3MEQwAZJhCQpdLKq5LPvzD8ZBmmBCAa2LKWUbFTZaTOAMS1PTwvYMGfykN01Ac-4ax0MT8xH',
});

export default paypal;