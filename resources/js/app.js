import axios from 'axios';
import Noty from 'Noty';
import { initAdmin } from './admin';

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');


function updateCart(pizza) {
    axios.post('/update-cart',pizza).then(res => {
        // console.log(res);
        cartCounter.innerText = res.data.totalQty

        new Noty({
            type: 'success',
            timeout: 1000,
            text: "Item added to cart",
            progressBar: false,
            // layout: 'topLeft'
          }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: "Something went wrong",
            progressBar: false,
          }).show();

    })

}

addToCart.forEach((btn) => {
    btn.addEventListener('click',(e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        // console.log(pizza)
        updateCart(pizza)
    })
})

// Remove alert message after 3 seconds
const alertMsg = document.getElementById('success-alert')
if (alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    },3000)
    
}

initAdmin();

