;(function ($, moment) {
  'use strict';

  if (! $) throw 'jquery not found';

  // COMMON
  var mixpanel= window.mixpanel || {},
      editor;

  // HELPERS
  var
      // Set the html of the output div
      setOutput = function (text) {
        var isError = !! arguments[1],
            $output = $('.output span');

        // Remove error classes if any
        $output.html(text).removeClass('error');

        if (isError) $output.addClass('error');

        // Turn off the spinner
        $('.spinner').fadeOut('fast');
        // Set the timestamp
        $('.timestamp').find('span').html(moment(new Date().getTime()).format('h:mm a'));
      },
      
	  	processCode = function () {
		    var code = editor.getValue();
		
		    if (! code.length) {
		      setOutput('Please supply some code...');
		      return;
		    }
		
		    $('.spinner').fadeIn('fast');
		
		    // Track it
		    mixpanel.track('Code Run', {'code': code});
		
		    try {
		      eval(code);
		    } catch (e) {
		      setOutput(e, true);
		      mixpanel.track('Error', {'error' : e});
		    }
		  };

  // Set up the editor
  editor = window.CodeMirror.fromTextArea(document.getElementById('code'), {
    lineNumbers: true,
    matchBrackets: true,
    mode: 'javascript',
    indentUnit: 2,
    tabSize: 2,
    autofocus: true,
    autoCloseBrackets: true
  });

  // Override console to show the output in our console
  window.console = {
    log: setOutput
  };

  $('.submit button').click(processCode);

})(window.$, window.moment);