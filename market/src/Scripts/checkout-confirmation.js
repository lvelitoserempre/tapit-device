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


if(localStorage.getItem('points_code')){
	localStorage.removeItem('points_code');
}

var tagManager = function(){
	if(window.location.origin === "https://market.tapit.com.co"){
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			'userId' : localStorage.getItem('user_id')
		})
	}
}
tagManager();

var getCookie = function(key) {
	var cookieValue = document.cookie.match(key + '=[^ ;]*');
	if (cookieValue) {
	  return cookieValue[0].replace(key + '=', '');
	}
}

var createCookie = function (name, value) {
	var now = new Date();
	var time = now.getTime();
	time += 3600 * 1000 * 24 * 365;
	now.setTime(time);

	var expires = "; expires=" + now.toUTCString();
	var domain = window.location.hostname;

	document.cookie = name + "=" + value + expires + ";domain=." + domain + ";path=/";
}

var getUserPoints = function(callback){
	if( localStorage.getItem('app_v1') ){
		//app old version
		var user_id = localStorage.getItem('user_id');
		$.ajax({
			url: POINTS_SERVICE_OLD + user_id,
			type: 'POST',
			crossDomain: true,
			timeout: 15000,
			tryCount : 0,
			retryLimit : 3,
			success: function(data){
				//console.log('Points: ', data);
				if(callback) callback(data);
			}
		});

	}else{
		var user_token = localStorage.getItem('user_token');

		$.ajax({
			url: POINTS_SERVICE,
			timeout: 15000,
			tryCount : 0,
			retryLimit : 3,
			headers: {
				"Authorization" : "Bearer " + user_token
			},
			crossDomain: true,
			success: function(data){
				//console.log('Points: ', data);
				if(callback) callback(data);
			},
			error: function(error){
				if(error.responseText.indexOf('expired')){
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
		}
	});
}

$(document).ready(function(){
	if( localStorage.getItem('desktop') ){
		$('header, footer').removeClass('hidden');

		var user_cookie;
		var user_desk = getCookie('loggedUser');
		var user_app = getCookie('user_app_data');

		if(user_app !== '' && user_app !== undefined && user_app !== null){
			user_cookie = JSON.parse(decodeURIComponent(user_app));
		}else{
			user_cookie = JSON.parse(decodeURIComponent(user_desk));
		}

		if(user_cookie) $('.header .user-name').text(user_cookie.firstName);

		getUserPoints(function(data){
			var totalPoints = localStorage.getItem('app_v1') ? data.userPoints.totalPoints : data.data.totalPoints;
			$('header .user-total-points').text(totalPoints);
		});
    }

    $('#steps-indicator span').addClass('inactive');
    $('#steps-indicator span:nth-child(7)').removeClass('inactive').addClass('active');

	var url = $('#go-home-page').attr('href');
	$('#go-home-page').attr('href', url + window.location.origin);

	$('.body-checkout-confirmation').addClass('page-active');
});




