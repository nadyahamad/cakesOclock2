console.log('it works') /*check to see js is inserted correctly*/

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

  function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-cart')
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
//calculation added min and plus btns
var item = {
  data: {
      id: null,
      price: null,
      quantity: 0,
  },
  init: function() {
    var storedCart = JSON.parse( localStorage.getItem('CART') );
    if (storedCart === null) {
      // cart is empty
      document.getElementById('loading_indicator').style.display = 'none';
      document.getElementById('empty_indicator').style = '';
      return;
    }
  
    var cartIds = Object.keys(storedCart);
    var cartItemsRequest = new XMLHttpRequest();
    cartItemsRequest.open('POST', 'http://localhost:4300/cart', true);
    cartItemsRequest.setRequestHeader('Content-Type', 'application/json');
    cartItemsRequest.onload = function() {
      var items = JSON.parse(cartItemsRequest.responseText);
      var storedCartItem, serverItem; //server and locale storage
      for (var i = 0, len = items.length; i < len; i++) {
        serverItem = items[i];
        storedCartItem = storedCart[ serverItem.ps_id ];

        cart.data[ serverItem.ps_id ] = {
          id: serverItem.ps_id,
          price: serverItem.price = storedCartItem.price, 
          quantity: serverItem.quantity = storedCartItem.quantity 
        };

        cart.rootTableEl.append(cart.renderItem(items[i]));
      }
      document.getElementById('loading_indicator').style.display = 'none';

      if (items.length === 0) {
        cart.empty();
      }
      else {
        cart.refresh();
        cart.showSections();
        document.getElementById('empty_cart_btn').onclick = cart.empty;
      }
    };
    cartItemsRequest.send(JSON.stringify(cartIds));
  },



  renderItem: function(item) {
    item.src = 'src="/img/products/' + item.prd_img + '"';
    var itemView = cart.itemTemplateEl.cloneNode();
    itemView.id = 'ps-' + item.ps_id;
    itemView.style = '';
    itemView.innerHTML = cart.itemTemplate.replace(/%([^%]+)%/g, function(_, itemProperty) {
      return item[itemProperty];
    });
    itemView.getElementsByClassName('minus-btn')[0].onclick = function() {
      var cartItem = cart.data[ item.ps_id ];
      cartItem.quantity = Math.max(cartItem.quantity - 1, 1);
      cart.refresh();
    }
    itemView.getElementsByClassName('plus-btn')[0].onclick = function() {
      var cartItem = cart.data[ item.ps_id ];
      cartItem.quantity = Math.min(cartItem.quantity + 1, 10000);
      cart.refresh();
    }
    itemView.getElementsByClassName('btn-secondary')[0].onclick = function() { // remove item
      if (Object.keys(cart.data).length === 1) {
        cart.empty();
      }
      else {
        delete cart.data[ item.ps_id ];
        cart.refresh();
        itemView.remove();
      }
      return false;
    }

    return itemView;
  },
  refresh: function() {
    var total = 0;
    for (var id in cart.data) if (cart.data.hasOwnProperty(id)) {
      total += cart.data[id].price * cart.data[id].quantity;
      document.getElementById('ps-' + id).getElementsByClassName('item-quantity')[0].textContent = cart.data[id].quantity;
    }
    document.getElementById('cart_total').textContent = total;
    localStorage.setItem('CART', JSON.stringify(cart.data));
  },
  showSections: function() {
    var sections = document.getElementsByTagName('section');
    for (var i = 0, len = sections.length; i < len; i++) {
      sections[i].style = '';
    }
  },
};
  //calling function init from cart
cart.init();

  /*
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
*/