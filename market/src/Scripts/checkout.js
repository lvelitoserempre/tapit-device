var POINTS_SERVICE = window.location.origin === "https://market.tapit.com.co" ?
	"https://api.tapit.com.co/v2/user/points/" :
	"https://api-dev.tapit.com.co/v2/user/points/";

var CODE_SERVICE = window.location.origin === "https://market.tapit.com.co" ?
	"https://api.tapit.com.co/v2/vtex/giftcard/" :
	"https://api-dev.tapit.com.co/v2/vtex/giftcard/";

var POINTS_SERVICE_OLD = window.location.origin === "https://market.tapit.com.co" ?
	"https://us-central1-rei-imagining-loyalty.cloudfunctions.net/api-getUserPoints?uid=" :
	"https://us-central1-re-imagining-loyalty-dev.cloudfunctions.net/api-getUserPoints?uid=";

var CODE_SERVICE_OLD = window.location.origin === "https://market.tapit.com.co" ?
	"https://us-central1-rei-imagining-loyalty.cloudfunctions.net/api-vtexCreateGiftCard?uid=" :
	"https://us-central1-re-imagining-loyalty-dev.cloudfunctions.net/api-vtexCreateGiftCard?uid=";


var is_check_points = false;

var funcCheckout = function () {

	var createCookie = function (name, value) {
		var now = new Date();
		var time = now.getTime();
		time += 3600 * 1000 * 24 * 365;
		now.setTime(time);

		var expires = "; expires=" + now.toUTCString();
		var domain = window.location.hostname;

		document.cookie = name + "=" + value + expires + ";domain=." + domain + ";path=/";
	}

	var readCookie = function (name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0)
				return unescape(c.substring(nameEQ.length, c.length));
		}
		return "";
	}

	var getCookie = function(key) {
		var cookieValue = document.cookie.match(key + '=[^ ;]*');
		if (cookieValue) {
		  return cookieValue[0].replace(key + '=', '');
		}
	}

	var simulateEvent = function (id, new_value) {
		var input = document.getElementById(id);

		var lastValue = input.value;
		input.value = new_value;
		var event = new Event('input', { bubbles: true });
		event.simulated = true;
		var tracker = input._valueTracker;
		if (tracker) {
			tracker.setValue(lastValue);
		}
		input.dispatchEvent(event);

		if ('createEvent' in document) {
			var evt = document.createEvent('HTMLEvents');
			evt.initEvent('change', false, true);
			input.dispatchEvent(evt);
		}
		else {
			input.fireEvent('onchange');
		}
	}

	var simulateClick = function (id) {
		var elem = document.getElementById(id);

		var evt = new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window
		});
		var canceled = !elem.dispatchEvent(evt);
	};

	var simulateChange = function (id, index) {
		input = $('#' + id)[0];
		input.selectedIndex = index;
		event = new Event('change', { bubbles: true });
		input.dispatchEvent(event);
	}

	var setEmail = function () {
		var user_email = localStorage.getItem('user_email');
		console.log(user_email)

		if (user_email) {
			simulateEvent('client-pre-email', user_email);//pre fill user email
			//Trigger click
			//simulateClick('btn-client-pre-email');
		}
	}

	var hashchange = function () {
		if (window.location.hash == "#/cart") {
			redeem();
		}
		if (window.location.hash == "#/email") {

		}
		if (window.location.hash == "#/profile") {
		}

		if (window.location.hash == "#/shipping") {
		}

		if (window.location.hash == "#/payment") {
			var points_code = localStorage.getItem('points_code');

			var click_count = 0;

			if (localStorage.getItem('points_code')) {
				MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
				var observer = new MutationObserver(function (mutations, observer) {

					if ($('.payment-discounts-alert').length && !$('.payment-discounts-alert').attr('id')) {
						$('.payment-discounts-alert').attr('id', 'open-discount-login');
						simulateClick('open-discount-login');
					}

					if ($('table.payment-discoints-table td.action a:nth-child(2)').length && click_count === 0) {
						$('table.payment-discoints-table td.action a:nth-child(2)').attr('id', 'apply-full-discount-button');
						simulateClick('apply-full-discount-button');
						click_count = 1;
						//console.log('xxxxxxxxxxx')
					}

					if ($('#show-gift-card-group').length) {
						simulateClick('show-gift-card-group');
						simulateEvent('payment-discounts-code', points_code);//pre fill user email
					}

					if ($('#btn-add-gift-card').length && !$('.payment-discounts-list td.code').length) {
						setTimeout(function () {
							simulateClick('btn-add-gift-card');
						}, 1000);
					}

				}); // end observer
				observer.observe(document, {
					subtree: true,
					attributes: true
				});
			}
		}
	}

	var redeem = function () {
		$('#cart-to-orderform').click(function (event) {
			event.preventDefault()
		});

		getUserPoints(function(data){
			if( !$('#redeem-discount').length ){
				$('.checkout-container > .cart-template .totalizers.summary-totalizers').before('\
					<div id="redeem-discount" class="flex flex-row">\
						<label class="custom-checlbox">\
							Redimir <span class="font-bold"><span class="total-points"></span> puntos</span> para obtener descuento.\
							<input id="use-points" type="checkbox" />\
							<span class="checkmark"></span>\
						</label>\
					</div>\
				');

				$('.checkout-container > .cart-template .totalizers.summary-totalizers').after('\
					<div class="custom-cart-links">\
					    <p>\
							<span class="btn-place-order-wrapper">\
								<a href="#/orderform" target="_self" id="custom-cart-to-orderform" class="btn btn-large btn-success pull-left-margin btn-place-order">IR A PAGAR</a>\
							</span>\
						</p>\
					    <p class="mt-4">\
							<span class="link-choose-more-products-wrapper">\
								<a  id="cart-choose-more-products" class="more link-choose-more-products" href="/">SEGUIR COMPRANDO</a>\
							</span>\
						</p>\
					</div>\
				');

				//Checkbox redeem points
				$('#use-points').change(function () {
					$('#custom-cart-to-orderform').addClass('disabled');
					redeem();
				});
			}

			var totalPoints = localStorage.getItem('app_v1') ? data.userPoints.totalPoints : data.data.totalPoints;
			//var totalPoints = data.userPoints.totalPoints;

			if (totalPoints === 0) {
				$('#redeem-discount').css('display', 'none');
			} else {
				$('#redeem-discount').css('display', 'block');
			}

			$('header .user-total-points').text(totalPoints);

			totalizers(localStorage.getItem('app_v1') ? data.userPoints : data.data);
			//totalizers(data.userPoints);
		});
	}

	var totalizers = function (userPoints) {
		vtexjs.checkout.getOrderForm().done(function (orderForm) {
			var order_form_total = Number(orderForm.value.toString().slice(0, -2));

			if (userPoints.exchangedAmount > order_form_total) {
				var total_points = Math.round(order_form_total / (1000 / 60));
				$('.total-points').text(total_points);
			} else {
				$('.total-points').text(userPoints.totalPoints);
			}

			var checked = $('#use-points').prop('checked');

			is_check_points = checked;

			if (checked) {
				if (userPoints.exchangedAmount > order_form_total) {
					var total_points = Math.round(order_form_total / (1000 / 60));
					var total_discount = Math.round(total_points * (1000 / 60));

					$('.totalizers.summary-totalizers').css('opacity', '1').html('\
						<p class="underline-dots text-neutral-700 mb-2"><span>Subtotal</span> <span id="product-price-purchase">$' + order_form_total.toLocaleString('es-CO') + '</span></p> \
						<p class="underline-dots text-neutral-700 mb-2"><span>Envio</span> <span>$0</span></p> \
						<p class="underline-dots text-neutral-700 mb-2"><span>Pago con puntos</span> <span id="total-discount">$'+ total_discount.toLocaleString('es-CO') + '</span></p> \
						<p class="underline-dots text-neutral-800 mb-2 font-bold"><span>Total</span> <span id="total-purchase">$0</span></p> \
					');
				} else {
					var total_payment = order_form_total - userPoints.exchangedAmount;
					var total_discount = Math.round(userPoints.totalPoints * (1000 / 60));

					$('.totalizers.summary-totalizers').css('opacity', '1').html('\
						<p class="underline-dots text-neutral-700 mb-2"><span>Subtotal</span> <span id="product-price-purchase">$' + order_form_total.toLocaleString('es-CO') + '</span></p> \
						<p class="underline-dots text-neutral-700 mb-2"><span>Envio</span> <span>$0</span></p> \
						<p class="underline-dots text-neutral-700 mb-2"><span>Pago con puntos</span> <span id="total-discount">$'+ total_discount.toLocaleString('es-CO') + '</span></p> \
						<p class="underline-dots text-neutral-800 mb-2 font-bold"><span>Total</span> <span id="total-purchase">$' + total_payment.toLocaleString('es-CO') + '</span></p> \
					');
				}
			} else {
				if (localStorage.getItem('points_code')) {
					localStorage.removeItem('points_code');
				}
				$('.totalizers.summary-totalizers').css('opacity', '1').html('\
					<p class="underline-dots text-neutral-700 mb-2"><span>Subtotal</span> <span id="product-price-purchase">$' + order_form_total.toLocaleString('es-CO') + '</span></p> \
					<p class="underline-dots text-neutral-700 mb-2"><span>Envio</span> <span>$0</span></p> \
					<p class="underline-dots text-neutral-700 mb-2"><span>Pago con puntos</span> <span id="total-discount">$0</span></p> \
					<p class="underline-dots text-neutral-800 mb-2 font-bold"><span>Total</span> <span id="total-purchase">$' + order_form_total.toLocaleString('es-CO') + '</span></p> \
				');
			}

			$('#custom-cart-to-orderform').removeClass('disabled');
		});
	}

	var getUserPoints = function (callback) {
		if (localStorage.getItem('app_v1')) {
			//app old version
			var user_id = localStorage.getItem('user_id');
			$.ajax({
				url: POINTS_SERVICE_OLD + user_id,
				type: 'POST',
				crossDomain: true,
				timeout: 15000,
				success: function (data) {
					//console.log('Points: ', data);
					if (callback) callback(data);
				}
			});

		} else {
			$.ajax({
				url: POINTS_SERVICE,
				timeout: 15000,
				headers: {
					"Authorization": "Bearer " + localStorage.getItem('user_token')
				},
				crossDomain: true,
				success: function (data) {
					//console.log('Points: ', data);
					if (callback) callback(data);
				},
				error: function (error) {
					if (error.responseText.indexOf('expired')) {
						var user_cookie = getCookie('loggedUser');
						user_cookie = JSON.parse(decodeURIComponent(user_cookie));
						refreshToken(user_cookie, callback);
					}
				}
			});
		}

	}

	var refreshToken = function (user_info, callback) {
		$.ajax({
			url: 'https://securetoken.googleapis.com/v1/token?key=AIzaSyBbMDkDVAUJ8MWcKMVtU7Onrzv5JVlfSbA&' + 'grant_type=refresh_token&code=' + user_info.idToken + '&refresh_token=' + user_info.refreshToken,
			type: 'POST',
			crossDomain: true,
			data: 'grant_type=refresh_token&code=' + user_info.idToken + '&refresh_token=' + user_info.refreshToken,
			success: function (data) {
				//console.log('data: ', data);

				var newCookie = user_info;
				newCookie.idToken = data.id_token;
				newCookie.refreshToken = data.refresh_token;

				localStorage.setItem('user_token', data.id_token);

				createCookie('loggedUser', encodeURIComponent(JSON.stringify(newCookie)));

				getUserPoints(callback);

				$('#custom-cart-to-orderform').removeClass('disabled');
			}
		});
	}

	var generateCode = function (callback) {
		if (localStorage.getItem('app_v1')) {
			//old app version
			var user_id = localStorage.getItem('user_id');
			$.ajax({
				url: CODE_SERVICE_OLD + user_id,
				type: 'POST',
				crossDomain: true,
				timeout: 15000,
				tryCount: 0,
				retryLimit: 3,
				success: function (data) {
					console.log('Code: ', data);
					localStorage.setItem('points_code', data.giftCard.redemptionCode);
					if (callback) callback();
				},
				error: function () {
					$('#custom-cart-to-orderform').removeClass('disabled');
				}
			});

		} else {
			var user_token = localStorage.getItem('user_token');

			$.ajax({
				url: CODE_SERVICE,
				crossDomain: true,
				timeout: 15000,
				tryCount: 0,
				retryLimit: 3,
				headers: {
					"Authorization": "Bearer " + user_token
				},
				success: function (data) {
					console.log('Code: ', data);
					localStorage.setItem('points_code', data.data.redemptionCode);
					if (callback) callback();
				},
				error: function (error) {
					console.log(error)
					$('#custom-cart-to-orderform').removeClass('disabled');
					if (error.data.indexOf('expired')) {
						var user_cookie = getCookie('loggedUser');
						user_cookie = JSON.parse(decodeURIComponent(user_cookie));
						refreshToken(user_cookie);
					}
				}
			});
		}

	}

	var general = function () {
		//styles
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'https://unicons.iconscout.com/release/v2.1.8/css/unicons.css';
		document.head.appendChild(link);


		if (localStorage.getItem('desktop')) {
			$('header, footer').removeClass('hidden');
			$('body').addClass('desktop');
		}else{
			$('body').addClass('apps');
		}

		$(document).on('click', '.item-quantity-change, .item-link-remove', function (event) {
			setTimeout(function () {
				funcCheckout.redeem();
			}, 1000);
		});

		//Generate gift card
		$(document).on('click', '#custom-cart-to-orderform', function (event) {
			event.preventDefault();
			$(this).addClass('disabled');

			if (is_check_points) {
				funcCheckout.generateCode(function () {
					window.location.href = '#/orderform';
				});
			} else {
				$(this).removeClass('disabled');
				window.location.href = '#/orderform';
			}
		});

		var user_cookie;
		var user_desk = getCookie('loggedUser');
		var user_app = getCookie('user_app_data');

		if (user_app !== '' && user_app !== undefined && user_app !== null) {
			user_cookie = JSON.parse(decodeURIComponent(user_app));
		} else {
			user_cookie = JSON.parse(decodeURIComponent(user_desk));
		}

		if (user_cookie)
			$('.header .user-name').text(user_cookie.firstName);
		$('.header #userName').text(user_cookie.firstName + ' ' + user_cookie.lastName);
		$('.header #userEmail').text(user_cookie.email);
	}

	var tagManager = function () {
		if (window.location.origin === "https://market.tapit.com.co") {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
				'userId': localStorage.getItem('user_id')
			})
		}
	}
	var setMenu = function () {
		$('#checkbox-menu').click(function (event) {
			if (event.target.checked) {
				document.body.classList.add('overflow-hidden');
			} else {
				document.body.classList.remove('overflow-hidden');
			}
		});
		$('#menuToggle .background').click(function(){
			$('#checkbox-menu').click();
			$('body').removeClass('overflow-hidden');
		});
	}

	var stepsState = function(){
		var hash = window.location.hash;
		var anchors = '#steps-indicator span';

		$(anchors).addClass('inactive').removeClass('active');

		if( hash == '#/cart' ) $(anchors + ':nth-child(1)').removeClass('inactive').addClass('active');
		if( hash == '#/email' || hash == '#/profile' ) $(anchors + ':nth-child(3)').removeClass('inactive').addClass('active');
		if(hash == '#/shipping' || hash == '#/payment' ) $(anchors + ':nth-child(5)').removeClass('inactive').addClass('active');
	}

	return {
		general: general,
		hashchange: hashchange,
		setEmail: setEmail,
		redeem: redeem,
		totalizers: totalizers,
		tagManager: tagManager,
		generateCode: generateCode,
		setMenu: setMenu,
		stepsState: stepsState
	};

}();

var checkIOs = function () {
	var toMatch = [
		/iPhone/i,
		/iPod/i
	];
	return toMatch.some(function (toMatchItem) {
		return navigator.userAgent.match(toMatchItem);
	});
}


$(document).ready(function () {
	funcCheckout.general();
	funcCheckout.setEmail();
	funcCheckout.tagManager();
	funcCheckout.setMenu();
	funcCheckout.stepsState();

	if (checkIOs()) {
		$('#btn-download').attr('href', 'https://apps.apple.com/us/app/tapit/id1481852424?ls=1');
	}
});

$(window).on('hashchange', function () {
	funcCheckout.hashchange();
	funcCheckout.stepsState();
});

$(window).load(function () {
	funcCheckout.redeem();
	funcCheckout.hashchange();
});
