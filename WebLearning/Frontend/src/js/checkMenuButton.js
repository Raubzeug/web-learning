//here I do not use arrow function because I need to use 'this' inside the function

export let checkMenuButton = $('.navigation__button a').each(function() {

    if ($(this).attr('href') == window.location.pathname) {
        $(this).addClass('button--active')
    }
})
