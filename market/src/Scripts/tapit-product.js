var funcProduct = function () {

    var item = {};
    var product_qty = 1;

	var general = function(){
        //hide add to cart in out of stock products
        if(!skuJson.available) $('.add-to-cart-container').remove();

		//replace product image
		$('.product-detail .apresentacao, #image-comfirm-purchase')
			.html('<img src="' + skuJson.skus[0].image.replace('292-292', '500-500') + '" />');

		//add tags
		var tag_list = $('.value-field.Tags').text().split(',');

		if (tag_list.length > 0 && tag_list[0] !== '') {
			tag_list.forEach(function (tag) {
				$('#tag-list').append('<span class="uppercase rounded py-1 px-2 whitespace-no-wrap inline-block m-1 font-bold text-xs bg-secondary-500 text-neutral-100">' + tag + '</span>');
			});
		}

		//add product points
		var real_price = Number(skuJson.skus[0].bestPrice.toString().slice(0, -2));
        $('.points').text(Math.round(real_price / (1000 / 60)) + ' puntos');
        $('.product-detail-price .points').text('\u00F3' + ' ' + Math.round(real_price / (1000 / 60)) + ' puntos');

		$('.product-subtitle').text($('.value-field.Peso-y-cantidad').text());

		//add to cart
		$('.buy-button.buy-button-ref').click(function (event) {
			event.preventDefault();
			item = { id: skuJson.skus[0].sku, quantity: product_qty, seller: '1' };
			addToCart();
		});

		$('#price').text(skuJson.skus[0].bestPriceFormated.replace(',00', ''));

		$('#total-purchase').text(skuJson.skus[0].bestPriceFormated.replace(',00', ''));
		$('#product-price-purchase').text(skuJson.skus[0].bestPriceFormated.replace(',00', ''));
		$('#purchase-product-name').text(skuJson.name);

		//real_price
		var points_to_win = Math.round(real_price / 250);
		$('#points-to-win').text(points_to_win);

		//Budweiser collection
		if ($('.flag.qr-budweiser').length) $('.qr-text').removeClass('hidden');

		var brands = {
			bbc: 'bbc',
			poker: 'poker'
		}

		document.referrer.split('/').forEach(function (brand) {
			if ( brand === brands[brand] ) {
				$('body').addClass('iframe-page ' + brand + '-product-page');
			}
		});
    }

    var breadCrumb = function(){
        $('.bread-crumb ul li:nth-child(1) span').text('Tapit market');
        var categoryLink = $('.bread-crumb ul li:nth-child(3) a').attr('href').replace('/bavaria/', '/');
        $('.bread-crumb ul li:nth-child(3) a').attr('href', categoryLink);

        //send to home if is beer category
        if(categoryLink.toUpperCase().includes('CERVEZA')) $('.bread-crumb ul li:nth-child(3) a').attr('href', '/');

        $('.bread-crumb ul').append('<li><span>'+ skuJson.name +'</span></li>');
    }

	var qtyProducts = function () {
		$('.product-qty').text(product_qty);

		$('.item-qty .minus-qty').click(function () {
			if (product_qty > 1) product_qty = --product_qty;
			$('.product-qty').text(product_qty);
		});
		$('.item-qty .plus-qty').click(function () {
			product_qty = ++product_qty;
			$('.product-qty').text(product_qty);
		});
    }

    var addToCart = function () {
        vtexjs.checkout.getOrderForm()
        .done(function (orderForm) {//get order form
            vtexjs.checkout.addToCart([item], null, null)
            .done(function (orderForm) {
                product_qty = 1;

                if (localStorage.getItem('desktop')) {//if is desktop
                    miniCart.updateCart();
                    $('#mini-cart').slideDown(300);
                } else {
                    $('body').removeClass('page-active');
                    window.location.href = '/checkout';
                }
            });
        });
    }

    var resetPrice = function(skuData){
        var listPrice = $('#product-pricing .skuListPrice').text().replace(',00', '');
        $('.skuListPrice').text(listPrice);
        var bestPrice = $('#product-pricing .skuBestPrice').text().replace(',00', '');
        $('.skuBestPrice').text(bestPrice);
	};

	var init = function () {
        general();
        breadCrumb();
        qtyProducts();
        resetPrice();
	};

	return {
		init: init,
	}
}();
//funcProduct


$(document).ready(function () {
    funcProduct.init();
    funcMain.getSkuData();
});
