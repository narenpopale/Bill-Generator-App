
var bill = document.querySelector("#bill");
var people = document.querySelector("#people");
var Damount = document.querySelector("#Discount-Amount");
var Tamount = document.querySelector("#Total-Amount");
var calculate = document.querySelector("#calc");
var reset = document.querySelector("#reset");
var span = document.querySelector('span');
var disc;


var person_amount = 0;
var no_of_people = 0;
var discount_percent = 0;


calculate.addEventListener('click', function () {
    person_amount = bill.value;
    no_of_people = people.value;

    if (discount_percent == 0) {
        discount_percent = disc.value;
    }

    let d = (person_amount / no_of_people) * (discount_percent / 100);
    let t = person_amount / no_of_people;
    Damount.textContent = `$${d.toFixed(2)}`;
    Tamount.textContent = `$${t.toFixed(2)}`;
})


// Discount Logic
var customDiscount = document.querySelector("#Custom");
var discount = document.querySelectorAll(".rect");
var isClicked = false;

customDiscount.addEventListener('click', function () {
    if (!isClicked) {
        removeRectClass(discount);
        customDiscount.innerHTML = '<input type="number" style="margin:0px" name="discount" id="discount" value="0">';
        isClicked = true;
        disc = document.querySelector("#discount");
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



reset.addEventListener('click', function () {
    bill.value = 0;
    people.value = 0;

    removeRectClass(discount);

    Damount.textContent = `$0.00`;
    Tamount.textContent = `$0.00`;
})



// Validation Logic
setInterval(function(){
    no_of_people = people.value;

    if(no_of_people == 0) {
        span.style.visibility = "visible";
        calculate.setAttribute('disabled', true);
        reset.setAttribute('disabled', true);
    }
    else {
        span.style.visibility = "hidden";
        calculate.removeAttribute('disabled', true);
        reset.removeAttribute('disabled', true);
    }
    
}, 1000);