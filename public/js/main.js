var init = function() {
	var sectionToAdd = $('<div>').addClass('section');
	mdList.forEach(function(item) {
		sectionToAdd.append($('<a href="/'+item.filename+'">').html(item.title + '<br>'));
	});
	$('.menubar').prepend(sectionToAdd);
};

init();