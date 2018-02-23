$('#sidebar-btn').on('click', function () {
	$('.ui.sidebar').sidebar('toggle');
});

$('.ui.accordion').accordion({ exclusive: true });

$('.ui.buttons .button').on('click', function() {
	$(this).addClass('positive')
  .siblings()
  .removeClass('positive');
	$('.treemenu').toggleClass('boxed');
});

var converter = new showdown.Converter();

function convertToHtml(obj, otherObj) {
  var rendered = document.getElementById(otherObj);
  if (rendered) {
    rendered.innerHTML = converter.makeHtml(obj.value);
  }
}