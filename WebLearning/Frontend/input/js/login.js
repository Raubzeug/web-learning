import {sendData} from './sendData'
import {getCookie} from './getCookie'
import {checkMenuButton} from './checkMenuButton'

  $('.login-form').on('submit', function (event) {
    event.preventDefault();
    $('.message').html('');
    var result = {}
    $(this).serializeArray().forEach( (item) => result[item.name] = item.value);
  
    var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
    }
    sendData('/api/auth/login/', result, 'POST', headers)
    .then(response => {
    if (response.ok) {
        $('.message').css('color', 'green');
    }
    else {
        $('.message').css('color', 'red');
    }
    return response.json()})
    .then(data => {
        if ('token' in data) {
            var token = 'token=' + data['token']
            document.cookie = token
            var session = 'sessionid='+data['sessionid']
            // document.cookie = session
            // console.log(document.cookie)
            $('.message').html('You are sucessfully logged in!');
        }
        else {
            for (var key in data) {
                $('.message').append(key + ': ' + data[key] + '<br>')
                }
            }
        })
    .catch(err => console.error(err))
});