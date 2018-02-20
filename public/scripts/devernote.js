$('#sidebar-btn').on('click', function () {
	$('.ui.sidebar').sidebar('toggle');
  });
  
  $('.ui.accordion').accordion({ exclusive: false });
  $('.ui.buttons .button').on('click', function() {
	$(this).addClass('positive')
		   .siblings()
		   .removeClass('positive');
	$('.treemenu').toggleClass('boxed');
  });
  
  
  $('.ui.accordion')
	.accordion({
	  exclusive: true
	})
  ;

  

window.onload = function() {
    var converter = new showdown.Converter();
    var markdown = document.getElementById('markdown');
    var rendered = document.getElementById('rendered');   
    var convertMarkdownToHtml = function(){
        var markdownText = markdown.value;
        html = converter.makeHtml(markdownText);
        rendered.innerHTML = html;
        // document.querySelectorAll('pre code').forEach(function(element) {
        //   hljs.highlightBlock(element);
        // });
    };
    
    markdown.addEventListener('input', convertMarkdownToHtml);
    convertMarkdownToHtml();


};