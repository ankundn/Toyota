const ValidData = () => {


    // adding an event listener so that the alert message styles can be seen after an alert is read
    document.getElementById('the-form').addEventListener('submit', (e) => {
        e.preventDefault();
    });


/* Calculation of the values */

//declaring values and picking them by he different ids
let price = document.getElementById('ppp').value;
let quantity = document.getElementById('qty').value;
let oversize = document.getElementById('cont').value;
let state = document.getElementById('state').value;
let salestax = document.getElementById('sales');
let shipfee = document.getElementById('ship');
let total = document.getElementById('total').value;
let Shipped = document.getElementsByName('rad');
let cost = document.getElementById('cost').value;


//calculation of the cost
 cost = parseFloat(price) * parseFloat(quantity);


 //sales tax depending on the state chosen 
if (state.value == 'Kampala' && retail.checked == true) {
    salestax = (10 / 100) * cost;
    document.getElementById('sales').value = salestax;
}
else if (state.value == 'Entebbe' && retail.checked == true) {
    salestax = (5 / 100) * cost;
    document.getElementById('sales').value = salestax;
}
else if (state.value == 'Mbarara' && retail.checked == true) {
    salestax = (5 / 100) * cost;
    document.getElementById('sales').value = salestax;
}

else {
    salestax = 0;
    document.getElementById('sales').value = salestax;
}

 //checking oversize first
//  const oversize = document.getElementById('cont');
 if (oversize.checked) {
     for (let i = 0; i < Shipped.length; i++) {
         if (Shipped.item(i).checked) {

             if (Shipped.item(i).value == 'fed') {
                 shipfee = parseFloat(qty.value) * (9.25 + 5.00);
                 document.getElementById('ship').value = shipfee;
                 break;



             }
             else if (Shipped.item(i).value == 'us') {
                 shipfee = parseFloat(qty.value) * (8.50 + 5.00);
                 document.getElementById('ship').value = shipfee;
                 break;


             }
             else if (Shipped.item(i).value == 'feda') {
                 shipfee = parseFloat(qty.value) * (12.00 + 5.00);
                 document.getElementById('ship').value = shipfee;
                 break;


             }
             else {

                 shipfee = parseFloat(qty.value) * (7.00 + 5.00);
                 document.getElementById('ship').value = shipfee;
                 break;


             }



         }

     }


 }
 else {
     for (let i = 0; i < Shipped.length; i++) {
         if (Shipped.item(i).checked) {

             if (Shipped.item(i).value == 'fed') {
                 shipfee = parseFloat(qty.value) * 9.25;
                 document.getElementById('ship').value = shipfee;
                 break;


             }
             else if (Shipped.item(i).value == 'us') {
                 shipfee = parseFloat(qty.value) * 8.50;
                 document.getElementById('ship').value = shipfee;
                 break;


             }
             else if (Shipped.item(i).value == 'feda') {
                 shipfee = parseFloat(qty.value) * 12.00;
                 document.getElementById('ship').value = shipfee;
                 break;


             }
             else  {

                 shipfee = parseFloat(qty.value) * 7.00;
                 document.getElementById('ship').value = shipfee;
                 break;


             }



         }

     }

 }
 cost.innerHTML = cost.toFixed(2);
 salestax.innerHTML = salestax.toFixed(2);
 Shipped.innerHTML = shipfee.toFixed(2);
// total.innerHTML = total.toFixed(2);

 document.getElementById('total').value = total.value;
 total = cost + shipfee + salestax;
 total.innerHTML = total.toFixed(2);





    /* validation so that Customer ID isn't missing and doesnt contain any blank spaces */
    const custid = document.getElementById('customer');
    const space = new RegExp(" ");
    if (custid.value == '' || custid.value.match(space)) {
        alert('This field is required and should not have any blank spaces');
        custid.style.border = '2px red solid';
    }

    /* validation so that the name field isnt left empty */
    const name = document.getElementById('name');
    if (name.value == '') {
        alert('This field is required.Please input your name.');
        name.style.border = '2px red solid';
    }

    /* validation so that the part number field isnt empty */
    const partnum = document.getElementById('pn');
    if (partnum.value == '') {
        alert('This field is required. Please input your part number.');
        partnum.style.border = '2px red solid';
    }

    /*validation so that description field isnt empty*/
    const describe = document.getElementById('desc');
    if (describe.value == '') {
        alert('This field is required. Please put a description. ');
        describe.style.border = '2px red solid';
    }


    /* validation so that the price is a value greater than zero */
    const priced = document.getElementById('ppp');
    if (priced.value < 0) {
        alert('The price should be a value greater than zero');
        priced.style.border = '2px red solid';
    }



    /* vaidation so that the quantity is a value greater than zero*/
    const quant = document.getElementById('qty');
    if (quant.value < 0) {
        alert('The price should be a value greater than zero');
        quant.style.border = '2px red solid';
    }

    const UPS = document.getElementsByName("rad");
    if (UPS.checked == false) {

        alert('This field is required. Please select one')
    }
    
        return true;
    


}
const leave = () => {

    if (confirm("Are you sure you want to exit?")) {
        document.write("");
    }


}


const reload = function () {
    document.getElementById("customer").focus();
};