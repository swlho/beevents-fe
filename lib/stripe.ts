import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51QAtGcQ8rOVglOIGT1bbRnBDynnCahoAykQV6ZFuapan0Nf21bFASXPDPfJQryCsOcWavmyd85I8ZKhUOtXIHZsl00yCHrWyZe');

export async function createStripeProduct(event_id, title, date_time, cost){
    await stripe.products.create({
    name: title,
    description: `Event:${title} - Date:${date_time}`,
    metadata:{
        event_id: event_id
    }
    }).then(product => {
        stripe.prices.create({
            unit_amount: cost,
            currency: 'gbp',
            product: product.id,
        }).then(price => {
            console.log('Success! Here is your starter subscription product id: ' + product.id);
            console.log('Success! Here is your starter subscription price id: ' + price.id);
            if(cost>0){
                createStripePaymentLink(price.id, event_id, title, date_time, cost)
            }
        });
    });
}

async function createStripePaymentLink(productPriceId, event_id, title, date_time, cost){
    await stripe.paymentLinks.create({
        line_items: [
            {
                price: productPriceId,
                quantity: 1,
            }
        ],
        metadata: {
            event_id: event_id,
            event_title: title,
            date_time: date_time,
            cost: cost,
        },
        //TO-DO: modify after app is hosted
        // after_completion: {
        //         type: "redirect",
        //         redirect: {
        //             url: "https://" 
        // //         }
        // }
    }).then(paymentlink => {
        console.log('Successfully created payment link:' + paymentlink.url)
        return {url: paymentlink.url, priceId: productPriceId}
    }).then(({url, priceId})=>{
        patchEventPaymentUrl(event_id, url, priceId)
    })
}

async function patchEventPaymentUrl(event_id, paymentUrl, priceId){
    const response = await fetch(`https://beevents-be.onrender.com/events/url/${event_id}/${btoa(paymentUrl)}/${priceId}`, {method: 'PATCH'});
    const data = response.json()
    return data
}