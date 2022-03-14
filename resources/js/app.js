import axios from 'axios';
import Noty from 'Noty';
import { initAdmin } from './admin';
import moment from 'moment';

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


// Change order status
let statuses = document.querySelectorAll('.status_line')
// console.log(statuses)
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput. value: null
order = JSON.parse(order)
let time = document.createElement('small')

// console.log(order);

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed');
        status.classList.remove('current');
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
        let dataProp = status.dataset.status
        if (stepCompleted) {
            status.classList.add('step-completed')
        }
        if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updataAT).format('hh:mm A, DD:MM:YYYY')
            status.appendChild(time)
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')
            }
        }

    })

}

updateStatus(order);

// Socket
let socket = io()
initAdmin(socket);

// Join
if(order) {
    socket.emit('join', `order_${order._id}`)
}

// Admin 
let adminAreaPath = window.location.pathname
console.log(adminAreaPath)
if (adminAreaPath.includes('admin')) {
    socket.emit('join','adminRoom')
}

socket.on('orderUpdated', (data) => {
    const updatedOrder = {...order}
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    // console.log(data)
    updateStatus(updatedOrder);
    new Noty({
        type: 'success',
        timeout: 1000,
        text: "Order updated",
        progressBar: false,
        // layout: 'topLeft'
      }).show();

})

