$('#flight-switch-text').on('click', function () {
    if($(this).find('input').prop('checked')) {
        $(this).find('.labelcontent').html($(this).find('input').data('unchecked-text'));
    }
    else {
        $(this).find('.labelcontent').html($(this).find('input').data('checked-text'));
    }
})