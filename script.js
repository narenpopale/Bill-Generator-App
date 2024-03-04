
// ----------------Company Info and Customer Info---------------

// Company
var companyName = document.querySelector('#Company');
var companyPhone = document.querySelector('#CompanyPhone');
var saveCompanyInfo = document.querySelector('#company-info');
var cName = document.querySelector('h1');
var companyInfo = {
    'name': 'Company Name',
    'phone': '123'
}


// Customer
var customerName = document.querySelector('#Name');
var customerPhone = document.querySelector('#Phone');
var customerAddress = document.querySelector('#Address');
var saveCustomerInfo = document.querySelector('#customer-info');
var customerInfo = {
    'name': 'xyz',
    'phone': '123',
    'address': 'abc'
}


// updating UI
setInterval(() => {
    cName.textContent = companyInfo.name;
}, 1000);


saveCompanyInfo.addEventListener('click', () => {
    companyInfo.name = companyName.value;
    companyInfo.phone = companyPhone.value;
    console.log(companyInfo);
    localStorage.setItem('company-info', JSON.stringify(companyInfo));
})


saveCustomerInfo.addEventListener('click', () => {
    customerInfo.name = customerName.value;
    customerInfo.phone = customerPhone.value;
    customerInfo.address = customerAddress.value;
    console.log(customerInfo);
    localStorage.setItem('customer-info', JSON.stringify(customerInfo));
})



// Reset Button
var resetInfo = document.querySelector('#reset-info');

resetInfo.addEventListener('click', () => {
    companyName.value = "";
    companyPhone.value = "";
    customerName.value = "";
    customerPhone.value = "";
    customerAddress.value = "";
    companyInfo.name = "Company Name";
    localStorage.clear();
})




// ----------------Left Bill Container Logic---------------------

var item_name = document.querySelector("#product");
var unit_price = document.querySelector('#bill');
var quantity = document.querySelector("#people");
var total_items = document.querySelector("#Discount-Amount");
var total_price = document.querySelector("#Total-Amount");
var add = document.querySelector("#calc");
var reset = document.querySelector("#reset");
var clear_all = document.querySelector("#clear");
var span = document.querySelectorAll('span');


var discount_percent = 0;



// Discount Logic ----->
var customDiscount = document.querySelector("#Custom");
var discount = document.querySelectorAll(".rect");
var customDiscountActive;
var isClicked = false;

customDiscount.addEventListener('click', function () {
    if (!isClicked) {
        removeRectClass(discount);
        customDiscount.innerHTML = '<input type="number" style="margin:0px" name="discount" id="discount" value="0">';
        customDiscountActive = document.querySelector('#discount');
        isClicked = true;
    }
    discount_percent = 0;
})


discount.forEach(function (e) {
    if (e.id != "Custom") {
        e.addEventListener('click', function () {
            var str = e.textContent;
            discount_percent = str.substring(0, str.length - 1);

            isClicked = false;
            removeRectClass(discount);
            e.classList.remove("rect");
            e.classList.add("rect-js");
        })
    }
})


function removeRectClass(discount) {
    discount.forEach(function (e) {
        if (e.id != "Custom") {
            e.classList.remove("rect-js");
            e.classList.add("rect");
        }
        else {
            customDiscount.textContent = 'Custom';
            e.style.color = "hsl(183, 100%, 15%)";
            e.style.backgroundColor = "hsl(189, 41%, 97%)";
        }
    })
}
// Discount Logic ----->



// Reset Logic
reset.addEventListener('click', function () {
    item_name.value = "";
    unit_price.value = 0;
    quantity.value = 0;

    removeRectClass(discount);

    total_items.textContent = `0`;
    total_price.textContent = `$0.00`;
})



// Validation Logic
setInterval(function () {

    // updating discount percent
    if (isClicked) discount_percent = customDiscountActive.value;

    let name, items;

    if (item_name.value == "") {
        span[0].style.visibility = "visible";
        name = false;
    }
    else {
        span[0].style.visibility = "hidden";
        name = true;
    }

    if (quantity.value == 0) {
        span[1].style.visibility = "visible";
        items = false;
    }
    else {
        span[1].style.visibility = "hidden";
        items = true;
    }

    if (name && items) {
        add.removeAttribute('disabled', true);
    }
    else {
        add.setAttribute('disabled', true);
    }

}, 1000);