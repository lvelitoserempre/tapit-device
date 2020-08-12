var funcCategory = function(){

	var general = function(){
		$('#quick-view-overlay, .close-quick-view').click(function(){
			$('body').removeClass('overflow');
			$('#quick-view-overlay, #quick-view-container').fadeOut(300, function(){
				$('#quick-view-container iframe').attr('src', '');
			});
			miniCart.updateCart();
		});

		$('#filter-dropdown').click(function(){
			$('body').addClass('overflow');
			$('#modals-overlay, #filter-wrapper.modal').addClass('active').fadeIn(300);
		});

		var total_filters = 0;

		$('#filter-wrapper fieldset label').click(function(event){
			$('#filter-wrapper fieldset label').addClass('disabled');
			//console.log(event.target)
			total_filters = 0;
			setTimeout(function(){
				$('#filter-wrapper fieldset label').each(function(index, item){
					if( $(this).hasClass('sr_selected') ) total_filters = ++total_filters;
				});
				$('#filter-qty').text(total_filters / 2);
			}, 0);
		});

		$('#clear-filters').click(function(){
			$('.search-multiple-navigator fieldset label').each(function(index, item){
				if( $(item).hasClass('sr_selected') ){
					$(item).click();
					total_filters = 0;
					$('#filter-qty').text(total_filters);
				}
			});
		});

		$('#modals-overlay, .close-modal').click(function(){
			$('body').removeClass('overflow');
			$('.modal, #modals-overlay').fadeOut(300);
		});
	}

	var filters = function(){
		$(".menu-departamento input[type='checkbox']").vtexSmartResearch({
			loadContent: ".product-grid[id^=ResultItems]",
			shelfClass:".product-grid",
			elemLoading: '<div class="text-center"><div id="scroll-loading"><div></div><div></div><div></div><div></div></div></div>',
			emptySearchMsg: 'Esta combinaci\u00F3n de filtros no ha devuelto ning\u00FAn resultado',
			filterErrorMsg: "Ocurrio un error al filtrar",
			pageLimit: 1,
			ajaxCallback: function () {
				console.warn('ajaxCallback');
				$('.helperComplement').remove();
				funcMain.getSkuData();
				setTimeout(function(){ $('#filter-wrapper fieldset label').removeClass('disabled'); }, 3000);
			},
			shelfCallback: function () {
				console.warn('shelfCallback');
				$('.helperComplement').remove();
				funcMain.getSkuData();
				setTimeout(function(){ $('#filter-wrapper fieldset label').removeClass('disabled'); }, 3000);
			},
			filterScrollTop: function (shelfOffset) {
				//return (shelfOffset.top-20);
			},
			pagerCallback: function(){
				console.warn('pagerCallback');
				$('.helperComplement').remove();
				funcMain.getSkuData();
			}
		});
	}

	var init = function(){
		general();
		filters();
	}

	return {
		init: init
	}

}();
//funcCategory


$(document).ready(function(){
	funcMain.getSkuData();
	funcCategory.init();
});

$(window).load(function(){
	$('.search-multiple-navigator label').removeAttr('title');

	funcMain.getSkuData();

	setTimeout(function(){
		funcMain.getSkuData();
	}, 3000);

	$('.pager.bottom').click(function(){
		setTimeout(function(){
			$('.helperComplement').remove(); funcMain.getSkuData();
		}, 2000);
		setTimeout(function(){
			$('.helperComplement').remove(); funcMain.getSkuData();
		}, 3000);
		setTimeout(function(){
			$('.helperComplement').remove(); funcMain.getSkuData();
		}, 4000);
		setTimeout(function(){
			$('.helperComplement').remove(); funcMain.getSkuData();
		}, 5000);
		//scroll top on pager click
		$('html, body').delay(500).animate({ scrollTop: 0 }, 300);
	});
});
