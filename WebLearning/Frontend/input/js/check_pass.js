// import $ from 'jquery';

let check_pass = $(document).ready(function() {
  $('#confirm_password').change(function() {
      let pas = $('#password').val();
      let pas_conf = $('#confirm_password').val();
      if (pas != pas_conf) {
          $('#confirm_password').css('border', 'red 1px solid');
          $('.reg-form__message').css('color', 'red');
          $('.reg-form__message').text('passwords not matching');
          $('.reg-form__submit').attr('disabled', 'true');
      }
      else {
        $('.reg-form__message').html('');
        $('#confirm_password').css('border', '');
        $('.reg-form__submit').removeAttr('disabled');
      }
  });
});

export const registration = check_pass;

// var check_pass = () => {
//     let message = document.querySelector('.reg-form__message')
//     let button = document.querySelector('.reg-form__submit')

//     if (document.getElementById('password').value ==
//       document.getElementById('confirm_password').value) {
//       button.disabled = false;
//     } else {
//       message.style.color = 'red';
//       message.innerHTML = 'passwords are not matching';
//     }
//   }