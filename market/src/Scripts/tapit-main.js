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

var mobileCheck = function () {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

var funcMain = function () {

  var totalPoints = 0;
  var totalDiscount = 0;

  var getParameterByName = function (name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1]);
  }

  var getCookie = function (key) {
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

  function delete_cookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();

    var domain = window.location.hostname;
    document.cookie = name + "=" + value + expires + ";domain=." + domain + ";path=/";
  }

  var general = function () {
    $('body').addClass('page-active');

    window.alert = function alert(message) {
      console.log(message);
    }//delete alerts

    $('link[href="//io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap.min.css"]').remove();
    $('link[href="//io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap-responsive.min.css"]').remove();

    $('.helperComplement').remove();

    if (checkIOs()) {
      console.log('ios');
      $('#btn-download').attr('href', 'https://apps.apple.com/us/app/tapit/id1481852424?ls=1');
    }

    $('.search-mobile').click(function () {
      $('#wrapper-submenu').addClass('disabled');
      $('.wrapper-searchbox').slideDown(300);
      $('.busca input.fulltext-search-box').focus();
    });
    $('.close-search').click(function () {
      $('#wrapper-submenu').removeClass('disabled');
      $('.wrapper-searchbox').slideUp(300);
      $('.busca input.fulltext-search-box').blur();
    });
  };

  var checkIOs = function () {
    var toMatch = [
      /iPhone/i,
      /iPod/i
    ];
    return toMatch.some(function (toMatchItem) {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  var userAuths = function () {
    if (localStorage.getItem('points_code')) {
      localStorage.removeItem('points_code');
    }
    if (localStorage.getItem('total_discount')) {
      localStorage.removeItem('total_discount');
    }

    var user_cookie;

    var user_desk = getCookie('loggedUser');
    var user_app = getCookie('user_app_data');
    var user_email, user_token;

    if (getParameterByName('user_id') !== '' && getParameterByName('user_id') !== undefined) {//If is old app
      localStorage.setItem('user_email', getParameterByName('user_email'));
      localStorage.setItem('user_id', getParameterByName('user_id'));
      localStorage.removeItem('desktop');
      localStorage.setItem('app_v1', true);
      //old apps
    } else {
      if (user_app !== '' && user_app !== undefined && user_app !== null) {
        user_cookie = JSON.parse(decodeURIComponent(user_app));
        user_email = user_cookie.email;
        user_token = user_cookie.idToken;
        if (user_cookie.fixHeader) $('body').addClass('fixHeader');

        if (localStorage.getItem('app_v1')) localStorage.removeItem('app_v1');
      } else {
        if (!localStorage.getItem('app_v1')) localStorage.setItem('desktop', true);
      }

      if (user_desk !== '' && user_desk !== undefined && user_desk !== null) {
        user_cookie = JSON.parse(decodeURIComponent(user_desk));
        user_email = user_cookie.email;
        user_token = user_cookie.idToken;

        $('.header .user-name').text(user_cookie.firstName);
        $('.header #userName').text(user_cookie.firstName + ' ' + user_cookie.lastName);
        $('.header #userEmail').text(user_cookie.email);
      }

      //is user is exist
      if (user_token) {
        localStorage.setItem('user_email', user_email);
        localStorage.setItem('user_token', user_token);
      } else {
        if (localStorage.getItem('desktop')) {
          var login_redirect = UrlBuilderService.buildUrl('react', '');

          if (window.location.origin !== "https://market-dev.tapit.com.co") window.location.href = login_redirect;
        }
      }
      if (window.location.origin !== "https://market-dev.tapit.com.co") {
        if (!localStorage.getItem('app_v1')) localStorage.setItem('user_id', user_cookie.id);
      }
    }

    if (localStorage.getItem('desktop')) {
      $('header, footer').removeClass('hidden');
      $('body').addClass('desktop');

      getUserPoints(function (data) {
        console.log(data);
        if (localStorage.getItem('app_v1')) {
          $('.header .user-total-points').text(data.userPoints.totalPoints);
        } else {
          $('.header .user-total-points').text(data.data.totalPoints);
        }
      });
    } else {
      $('body').addClass('apps');
    }
  }

  var getSkuData = function () {
    $('.product-box').not('.active').each(function (index, item) {
      $(item).addClass('active');

      var product_id = $(item).attr('data-pi');

      vtexjs.catalog.getProductWithVariations(product_id).done(function (product) {
        var productData = product.skus[0];
        skuData(item, productData);
        setDiscount(item, productData)
      });
    });

    function skuData(item, data) {
      var real_price = Number(data.bestPrice.toString().slice(0, -2));
      var total_points = Math.round(real_price / (1000 / 60));
      if( !$(item).find('.sold-out-tag').length ){
        $(item).find('.product-points').text(total_points);
      } else {
        $(item).find('.product-points').text(0);
      }
    }

    function setDiscount(item, product) {
      var element = $(item).find('#percentage');

      if (product.bestPrice !== product.listPrice && product.listPrice) {
        var discount = Math.ceil((product.listPrice - product.bestPrice) / product.listPrice * 100);
        element.html(discount + '%');
        $(item).find('#discount-tag').removeClass('hidden');
      }
    }
  }

  var tagManager = function () {
    if (window.location.origin === "https://market.tapit.com.co") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'userId': localStorage.getItem('user_id')
      })
    }
  }

  var toMoney = function(str, currency_sign, normal){
    currency_sign = currency_sign || '$';
    var current;
    if(normal !== undefined){
        current = str;
        current =  current.toLocaleString("es-CO");
    }else{
        current = Number(str.toString().replace(/[^0-9.]/g, ''));
        current =  (current/100).toLocaleString("es-CO");
    }
    return currency_sign + current;
}

  var getUserPoints = function (callback) {
    if (localStorage.getItem('app_v1')) {
      //app old version
      var user_id = localStorage.getItem('user_id');
      $.ajax({
        url: POINTS_SERVICE_OLD + user_id,
        type: 'POST',
        crossDomain: true,
        success: function (data) {
          //console.log('Points: ', data);
          if (callback) callback(data);
        }
      });
    } else {
      $.ajax({
        url: POINTS_SERVICE,
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
      }
    });
  }

  var setMenu = function () {
    $('#checkbox-menu').click(function (event) {
      if (event.target.checked) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    });
    $('#menuToggle .background').click(function () {
      $('#checkbox-menu').click();
      $('body').removeClass('overflow-hidden');
    });
  }

  var matchPathName = function () {
    var pathName = window.location.pathname;

    $('#main-menu li a').each(function (index, item) {
      var href = $(item).attr('href');

      if (href == pathName) $(item).addClass('active');
    });
  }

  var init = function () {
    userAuths();
    general();
    setMenu();
    matchPathName();

    $('a[data-href]').each(function (index, element) {
      var dataHref = element.getAttribute('data-href');
      var i = dataHref.indexOf('/');
      element.href = UrlBuilderService.buildUrl(dataHref.slice(0, i), dataHref.slice(i));
    });

    tagManager();
  };

  return {
    init: init,
    getSkuData: getSkuData,
    refreshToken: refreshToken,
    toMoney: toMoney
  }

}();
//funcMain


$(document).ready(function () {
  funcMain.init();
});
