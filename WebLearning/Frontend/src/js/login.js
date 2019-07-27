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
    fetch('/api/auth/login/', {
      method: 'POST',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify(result),
  })
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
            // sessionStorage.setItem('APItoken', data['token'])
            // console.log(sessionStorage)
        //    let token = 'token=' + data['token']
        //    document.cookie = token
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