
console.log('it works') /*check to see js is inserted correctly*/

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

  function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-remove-cart')
    console.log(removeCartItemButtons);
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    }


function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
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


