var item = {
    data: {
        id: null,
        price: null,
        quantity: 1,
    },
    //update price according to quantity selected
    updateViews: function() {
        document.getElementsByClassName('item-quantity')[0].textContent = item.data.quantity;
        document.getElementById('product_size_price').textContent = item.data.price;
        document.getElementById('product_size_total').textContent = item.data.price * item.data.quantity;
    }
};
//btn minus calculation 
var buttonDownEl = document.getElementsByClassName('minus-btn')[0];
buttonDownEl.onclick = function() {
    item.data.quantity = Math.max(item.data.quantity - 1, 1);
    item.updateViews();
}
//btn plus calculation
var buttonUpEl = document.getElementsByClassName('plus-btn')[0];
buttonUpEl.onclick = function() {
    item.data.quantity = Math.min(item.data.quantity + 1, 10000);
    item.updateViews();
}
//len  evt  
var sizeChangeElements = document.getElementsByName('cake-size');
for (var i = 0, len = sizeChangeElements.length; i < len; i++) {
    sizeChangeElements[i].onchange = function(evt) {
        item.data.id = evt.target.dataset.id;
        item.data.price = evt.target.value;
        item.updateViews();
    };
}
sizeChangeElements[0].click();

//cart CTA STORE SELECTION ON BROWSER ' localStorage'
document.getElementById('add_to_cart').onclick = function() {
    var cartStore = JSON.parse(localStorage.getItem('CART')) || {}; //json parse to exchange data to/from web server. data is always a string 
    cartStore[item.data.id] = item.data;
    localStorage.setItem('CART', JSON.stringify(cartStore)); // stringify method converts a js object or value to a json string 
}

/*
// Tab Navigation
function openProduct(evt, productName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(productName).style.display = "block";
    evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();
*/