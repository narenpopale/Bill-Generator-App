
// ----------------Company Info and Customer Info---------------

// Company
var companyName = document.querySelector('#Company');
var companyPhone = document.querySelector('#CompanyPhone');
var saveCompanyInfo = document.querySelector('#company-info');
var cName = document.querySelector('#name-company');
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
    var obj = JSON.parse(localStorage.getItem('company-info'));
    if (obj == null) cName.textContent = companyInfo.name;
    else cName.textContent = obj.name;
}, 1000);


saveCompanyInfo.addEventListener('click', () => {
    companyInfo.name = companyName.value;
    companyInfo.phone = companyPhone.value;
    companyInfo.name = companyInfo.name.toUpperCase();
    localStorage.setItem('company-info', JSON.stringify(companyInfo));
    window.alert("Company Details Updated!");
})


saveCustomerInfo.addEventListener('click', () => {
    customerInfo.name = customerName.value;
    customerInfo.phone = customerPhone.value;
    customerInfo.address = customerAddress.value;
    localStorage.setItem('customer-info', JSON.stringify(customerInfo));
    window.alert("Customer Details Updated!");
})



// Reset Button
var resetInfo = document.querySelector('#reset-info');

resetInfo.addEventListener('click', () => {
    var is = window.confirm("Do you want to Reset?");
    if(is) {
        companyName.value = "";
        companyPhone.value = "";
        customerName.value = "";
        customerPhone.value = "";
        customerAddress.value = "";
        companyInfo.name = "Company Name";
        localStorage.clear();
    }
})




// ----------------Left Container - Bill Logic---------------------

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



// Add, Clear Items ----->

var items = [];
var item = {
    name: '',
    unit_price: 0,
    discount: 0,
    quantity: 0,
    price: 0
}


add.addEventListener('click', () => {
    item.name = item_name.value;
    item.unit_price = unit_price.value;
    item.discount = discount_percent;
    item.quantity = quantity.value;
    let discount_price = (item.unit_price * item.quantity) * (item.discount / 100);
    item.price = (item.unit_price * item.quantity) - discount_price;
    items.push({ ...item });
    localStorage.setItem('items', JSON.stringify(items));
})


clear_all.addEventListener('click', () => {
    localStorage.removeItem('items');
})

// Add Item ----->



// Display total items and total price ---->

setInterval(() => {
    var itemslist = JSON.parse(localStorage.getItem('items'));

    if (itemslist != null) {
        items = itemslist;
    }
    else {
        items = [];
    }

    var no_of_items = items.length;
    var total_amount = 0;

    items.forEach((item) => {
        total_amount += item.price;
    });

    total_items.textContent = `${no_of_items}`;
    total_price.textContent = `${total_amount.toFixed(0)}`;
}, 1000)

// Display total items and total price ---->



// ----------------Right Container - Items Display Logic---------------------

var container = document.querySelector('#display')


setInterval(() => {
    var displayItem = "";

    items.forEach((item) => {
        displayItem = displayItem.concat(`<div class="item">
                                            <p id="name">${item.name}</p>
                                            <p id="quant">${item.quantity}</p>
                                            <p id="price">${item.price.toFixed(0)}</p>
                                        </div>`);
    })

    container.innerHTML = `${displayItem}`;
}, 1000)



// -----------------------------View Bill------------------------------------

var view = document.querySelector('#view');

view.addEventListener('click', ()=>{
    var obj1 = JSON.parse(localStorage.getItem('company-info'));
    var obj2 = JSON.parse(localStorage.getItem('customer-info'));

    if(obj1 == null || obj2 == null) {
        window.alert("Please Enter Company and Customer Details!");
    }
    else {
        window.open("/bill.html", "_blank");
    }
})