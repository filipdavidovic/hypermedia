// list.js
var options = {
    valueNames: ['name', 'description', 'faculty']
};

var facultiesList = new List('faculties-list', options);

var loadListJs = function () {
    var options = {
        valueNames: ['name', 'description', 'faculty']
    };

    var facultiesList = new List('faculties-list', options);
};

var MyLibrary = {};

MyLibrary.hash = "#bachelorRow";

$('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
    var target = $(e.target).attr("href"); // activated tab
    var tabPane = $(target);
    var hash = MyLibrary.hash;
    $(hash).removeClass('list'); // remove the list class from the  previous .tab-pane > .row
    var rowDiv = $(tabPane).find('.row').addClass('list'); // find the activated tab-pane row and add the list class to it
    MyLibrary.hash = '#' + rowDiv.attr('id'); // hash the current row id
    loadListJs();
});

// pills url fix
var url = document.location.toString();
if(url.match('#')) {
    $('.nav-pills a[href="#' + url.split('#')[1] + '"]').tab('show');
}

// if validation error, scroll to bottom - because of posting answer
if(url.match('\\?')) {
    if(url.split('?')[1] === 'err=val') {
        var $target = $('html,body');
        $target.animate({scrollTop: $target.height()}, 1000);
    }
}

// other
$(document).ready(function () {
    $(window).scrollTop(0);
});
