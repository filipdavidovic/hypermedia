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

// typeahead.js
var searches = [
    'Computer Science',
    'Psychology & Technology',
    'Software Science',
    'Web Science',
    'Data Science',
    'Computer Science and Engineering',
    'Data Science in Engineering',
    'Human-Technology Interaction',
    'Data Science and Entrepreneurship'
];
// TODO: implement the suggestion engine