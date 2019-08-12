import {getCookie} from './getCookie'
import {checkMenuButton} from './checkMenuButton'

  $('.login-form').on('submit', function (event) {
    event.preventDefault();
    $('.message').html('');
    const result = {}
    $(this).serializeArray().forEach( (item) => result[item.name] = item.value);
  
    const headers = {
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
            $('.message').html('You are sucessfully logged in!');
            }
            else {
                Object.keys(data).forEach(key => $('.message').append(`${key}: ${data[key]}<br>`))
                }
        })
        .catch(err => console.error(err))
});