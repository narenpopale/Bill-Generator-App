
// ---------------------Displaying Bill------------------------

var company_name = document.querySelector('#name-company');
var customer_name = document.querySelector('#name');
var customer_phone = document.querySelector('#ph');
var customer_address = document.querySelector('#address');
var date = document.querySelector('.date');


setInterval(() => {
    var companyInfo = JSON.parse(localStorage.getItem('company-info'));
    var customerInfo = JSON.parse(localStorage.getItem('customer-info'));

    if (companyInfo == null) company_name.textContent = "Company";
    else company_name.textContent = companyInfo.name;

    if (customerInfo == null) {
        customer_name.textContent = "";
        customer_phone.textContent = "";
        customer_address.textContent = "";
    }
    else {
        customer_name.textContent = customerInfo.name;
        customer_phone.textContent = customerInfo.phone;
        customer_address.textContent = customerInfo.address;
    }

    var currDate = new Date();
    date.innerHTML = `<p>${currDate.getDate()}/${currDate.getMonth() + 1}/${currDate.getFullYear()}</p>`;
}, 1000)



var container = document.querySelector('#display')
var total = document.querySelector('#total')


setInterval(() => {
    var items = JSON.parse(localStorage.getItem('items'));

    if (items != null) {
        var total_price = 0;
        var displayItem = "";
        items.forEach((item) => {
            total_price += item.price;
            displayItem = displayItem.concat(`<div class="item">
                                                <p class="item-name" id="name">${item.name}</p>
                                                <p id="quant">${item.quantity}</p>
                                                <p id="price">${item.unit_price}</p>
                                                <p id="price">${item.price}</p>
                                            </div>`);
        })
        container.innerHTML = `${displayItem}`;
        total.textContent = `${total_price.toFixed(0)}`;
    }
    else {
        container.innerHTML = "";
        total.textContent = "0";
    }

}, 1000)


var btn = document.querySelector('button');

btn.addEventListener('click', () => {
    window.print();
})