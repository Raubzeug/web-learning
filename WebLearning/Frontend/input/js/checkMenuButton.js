export let checkMenuButton = $('.navigation__button a').each(function() {

    if ($(this).attr('href') == window.location.pathname) {
        $(this).addClass('button--active')
    }
})
