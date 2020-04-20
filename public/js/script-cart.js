
console.log('it works') /*check to see js is inserted correctly*/

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-secondary");
  console.log(removeCartItemButtons);
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", function(event) {
      console.log("clicked")
      var buttonClicked = event.target
      buttonClicked.parentElement.parentElement.remove()
    });
  }
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart-price')[0]
      var quantityElement = cartRow.getElementsByClassName('item-quantity')[0]
      var price = parseFloat(priceElement.innerText.replace('€', ''))
      var quantity = quantityElement.value
      total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total')[0].innerText = '€' + total
}

$(document).ready(function(event) {   

var locationRequest = new XMLHttpRequest();

locationRequest.open('GET' ,'http://localhost:4300/location')
locationRequest.onload=function(){
    var locationData =JSON.parse(locationRequest.responseText);
    showResult(locationData);
    console.log(locationData);
}

locationRequest.send();
});

function showResult(locationRequest) {
  let loc = document.getElementById("location");
  
  for(let key in locationRequest) {
    let option = document.createElement("option");
    option.innerHTML = locationRequest[key];
    option.value = key;
    loc.append(option);
  }
}
//calculation added min and plus btns
var item = {
  data: {
      id: null,
      price: null,
      quantity: 0,
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
    item.data.quantity = Math.min(item.data.quantity + 1, 1000);
    item.updateViews();
}