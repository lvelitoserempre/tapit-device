window.zESettings = {
  webWidget: {
    contactForm: {
      attachments: true
    },
    color: { 
      theme: '#FF5005',
      launcher: '#FF5005',
      launcherText: '#FFFFFF'
    }
  }
};
var getCookie = function (key) {
  var cookieValue = document.cookie.match(key + '=[^ ;]*');
  if (cookieValue) {
    return cookieValue[0].replace(key + '=', '');
  }
}
var user_cookie;
var user_desk = getCookie('loggedUser');
var user_email, user_fullName;

if (user_desk !== '' && user_desk !== undefined && user_desk !== null) {
  user_cookie = JSON.parse(decodeURIComponent(user_desk));
  user_email = user_cookie.email;
  user_fullName = user_cookie.firstName + ' ' + user_cookie.lastName;
}

zE('webWidget', 'prefill', {
  name: {
    value: user_fullName,
    readOnly: true 
  },
  email: {
    value: user_email,
    readOnly: true 
  }
});