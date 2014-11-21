var init = function() {
	// highlight page
	var currPath = window.location.pathname.substr(1, window.location.pathname.length);
	var sectionToAdd = $('<div>').addClass('section');
	mdList.forEach(function(item) {
		if(item.filename === currPath) {
			sectionToAdd.append($('<a class="selected" href="/'+item.filename+'">').html(item.title + '<br>'));
		} else {
			sectionToAdd.append($('<a href="/'+item.filename+'">').html(item.title + '<br>'));
		}
	});
	$('.menubar').prepend(sectionToAdd);
};

init();