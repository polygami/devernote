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

function convertToHtml(markdownClass, renderedClass) {
  var markdown = document.getElementById(markdownClass);
  var rendered = document.getElementById(renderedClass);
  if (rendered && markdown) {
    rendered.innerHTML = converter.makeHtml(markdown.value);
  }
}

function showMessageBox() {
  document.getElementById("message-box-container").style.display = "block";
}

function hideMessageBox() {
  document.getElementById("message-box-container").style.display = "none";
}