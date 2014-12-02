var init = function() {
    // highlight page
    var currPath = window.location.pathname.substr(1, window.location.pathname.length);
    var sectionToAdd = $('<div>').addClass('section');
    mdList.forEach(function(item) {
        if (item.filename === currPath) {
            sectionToAdd.append($('<a class="selected mainMenuItem" href="/' + item.filename + '">').html(item.title + '<br>'));
        } else {
            sectionToAdd.append($('<a class="notSelected mainMenuItem" href="/' + item.filename + '">').html(item.title + '<br>'));
        }
    });
    $('.menubar').prepend(sectionToAdd);
    // reposition text
    $(window).on('flatdoc:ready', function() {
        // console.log('flatdoc ready');
        var allImgs = $('.content-img');
        $.each(allImgs, function(i, v) {
            $(v).parent().addClass('img-js');
        });
    });
};

init();