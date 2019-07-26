import {checkPass} from './check_pass';
import {sendData} from './sendData';
import {checkMenuButton} from './checkMenuButton'

$('.reg-form').on('submit', function (event) {
  event.preventDefault();
  $('.message').html('');
  var result = {}
  $(this).serializeArray().forEach( (item) => result[item.name] = item.value);
  var headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}
  sendData('/api/auth/registration/', result, 'POST', headers)
  .then(response => {
      if (response.ok) {
          $('.message').css('color', 'green');
          $('.message').html('You were successfully registered!<br>');
      }
      else {
          $('.message').css('color', 'red');
      }
      return response.json()})
  .then(data => {
    console.log(data)
    for (var key in data) {
      $('.message').append(key + ': ' + data[key] + '<br>')
        }        
      })
  .catch(err => console.error(err))
});
