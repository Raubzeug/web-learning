export let checkPass = $(document).ready(function() {
  $('#confirm_password').change(function() {
      let pas = $('#password').val();
      let pas_conf = $('#confirm_password').val();
      if (pas != pas_conf) {
          $('#confirm_password').css('border', 'red 1px solid');
          $('.message').css('color', 'red');
          $('.message').text('passwords not matching');
          $('.reg-form__submit').attr('disabled', 'true');
      }
      else {
        $('.message').html('');
        $('#confirm_password').css('border', '');
        $('.reg-form__submit').removeAttr('disabled');
      }
  });
});