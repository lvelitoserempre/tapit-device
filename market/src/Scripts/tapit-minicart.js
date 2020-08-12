var miniCart = function(){

	var general = function(){
		$('#show-cart-btn').click(function(){
			if (localStorage.getItem('desktop') ){
				$(this).toggleClass('active');
				$('#mini-cart').stop(true).slideToggle(400);
			}else{
				window.location.href = '/checkout';
			}
		});

		$('.close-mini-cart').click(function(){
			$('#show-cart-btn').click();
		});

		$('#go-to-pay').click(function(){
			window.location.href = '/checkout';
		});
	}

	var cartQty = function(orderForm){
		var counter = 0;
		$.each(orderForm.items, function(index, value){
			counter += value.quantity;
		});
		$('#show-cart-btn .cart-qty').text(counter);
	};

	var updateCart = function(){
		vtexjs.checkout.getOrderForm().then(function(orderForm) {
			console.log('orderForm', orderForm);

			cartQty(orderForm);

			if(orderForm.items.length > 0){
				$('#mini-cart').removeClass('empty-cart');
				$('#text-no-products').hide(0);
				$('#go-to-pay, #mini-cart-list, #text-products, #mini-cart-total-wrapper').show(0);

				$('#mini-cart-list').empty();

				var htmlItem = '';
				var totalPrice = 0;

				$.each(orderForm.items, function(index, item){
					var item_price = item.sellingPrice.toString().slice(0, -2);

					htmlItem = '<li class="item-product flex">';
					htmlItem += 	'<div class="item-img w-1/3">';
					htmlItem +=			'<img alt="'+ item.name +'" src="'+ item.imageUrl.replace('-55-55/', '-100-100/') +'" />';
					htmlItem +=		'</div>';
					htmlItem +=		'<div class="item-info w-2/3">';
					htmlItem +=			'<div class="item-name text-sm">';
					htmlItem +=				item.name;
					htmlItem +=			'</div>';
					htmlItem +=			'<div class="item-price py-2 text-sm font-bold">';
					htmlItem += 			'$ ' + item_price.toLocaleString('es-CO');
					htmlItem +=			'</div>';
					htmlItem +=			'<div class="item-qty">';
					htmlItem +=				'<i class="uil uil-minus inline-block mr-4 text-base minus-qty" data-index="'+ index +'" data-qty="'+ item.quantity +'"></i>';
					htmlItem +=				'<span class="inline-block">' + item.quantity + '</span>';
					htmlItem +=				'<i class="uil uil-plus inline-block ml-4 text-base plus-qty" data-index="'+ index +'" data-qty="'+ item.quantity +'"></i>';
					htmlItem +=			'</div>';
					htmlItem +=		    '<div class="remove-item" data-index="'+ index +'">';
					htmlItem +=			    '<i class="uil uil-trash-alt text-lg"></i>';
					htmlItem +=		    '</div>';
					htmlItem +=		'</div>';
					htmlItem +=	'</li>';

					totalPrice += (item_price * item.quantity);

					$('#mini-cart-list').append(htmlItem);
				});

				$('.mini-cart-total').text('$ ' + totalPrice.toLocaleString('es-CO'));

				$('.item-product .remove-item').click(function(){
					removeProduct($(this).data('index'));
				});

			}else{
				$('#mini-cart').addClass('empty-cart');
				$('.mini-cart-total').text('$ 0');
				$('#go-to-pay, #mini-cart-list, #text-products, #mini-cart-total-wrapper').hide(0);
				$('#text-no-products').show(0);
			}
		});
	};

	var qtyActions = function(){
		//minus-qty  plus-qty
		$(document).on('click', '#mini-cart .minus-qty', function(event) {
			var item = event.target;
			$(item).addClass('disabled');
			var index = $(item).attr('data-index');
			var qty = $(item).attr('data-qty');
			updateItemQty(index, --qty);
		});

		$(document).on('click', '#mini-cart .plus-qty', function(event) {
			var item = event.target;
			$(item).addClass('disabled');
			var index = $(item).attr('data-index');
			var qty = $(item).attr('data-qty');
			updateItemQty(index, ++qty);
		});
	}

	var updateItemQty = function(index, qty){
		vtexjs.checkout.getOrderForm().then(function() {
			var updateItem = {
				index: index,
				quantity: qty
			};
			return vtexjs.checkout.updateItems([updateItem], null, false);
		}).done(function() {
			updateCart();
		});
	}

	var removeProduct = function(index){
		var itemIndex = index;
		vtexjs.checkout.getOrderForm().then(function(){
			var itemsToRemove = [{
				index: itemIndex,
				quantity: 0,
			}];
		    return vtexjs.checkout.removeItems(itemsToRemove);
		}).done(function(){
			console.log('producto eliminado');
		    updateCart();
		});
	};

	var init = function(){
		general();
		updateCart();
		qtyActions();
    };

	return{
		init : init,
		cartQty : cartQty,
		updateCart : updateCart
	}
}();

$(document).ready(function(){
	miniCart.init();
});
