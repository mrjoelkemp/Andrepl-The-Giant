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
        $('.timestamp').find('span').html(moment(new Date().getTime()).format('h:m a'));
      },

      // Handles the sending of the code to the eval server
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
      },

      // Android backspace emits the wrong keycode
      triggerBackspace = function () {
        editor.setValue(editor.getValue().slice(0, -1));
      };

  // Local storage helpers
  var
      saveCode = function () {
        if (window.localStorage) {
          var code = editor.getValue();
          localStorage.setItem('code', code);

          // Show the saved message
          $('.timestamp')
            .find('span')
              .html('Code Saved!');

          mixpanel.track('Code Saved');
        }
      },
      loadSavedCode = function () {
        // Preload where you last left off
        if (window.localStorage) {
          var result = localStorage.getItem('code'),
              code   = ! result ? 'console.log(\'Andrepl\');' : result;
          editor.setValue(code);
        }
      };

  // Set up the editor
  editor = window.CodeMirror($('#editor')[0], {
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

  loadSavedCode();

  $('.submit button').click(processCode);

  $(document).keydown(function (e) {
    // CMD + Enter or CTRL + Enter to run code
    if (e.which === 13 && (e.ctrlKey || e.metaKey)) {
      processCode();
      e.preventDefault();
    }
  });

  // Remember the code in the editor before navigating away
  $(window).unload(saveCode);

  $(document).keydown(function (e) {
    if (e.which === 229) {
      triggerBackspace();
      return false;
    }
  });

})(window.$, window.moment);