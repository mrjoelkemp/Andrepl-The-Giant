### Andrepl: The JavaScript Repl (for Android)

I've had the urge to play with some JS on the subway (offline), so I implemented a 
really simple repl for Android phone. It's basically `eval()` wrapped in a webview
with a CodeMirror view and some other little details.

This repl is particularly helpful if you're reading a JS book and see a cool idiom
that you want to run.

**Google play link**: https://play.google.com/store/apps/details?id=com.mrjoelkemp.andrepl&hl=en

### TODO:

* Improve user experience – optimizing for writing code quickly
 * Still slow to interact with
 * Typing on a small keyboard sucks
* Stop capitalizing the first letter entered
 * Proper fix is at the app-level, not in JS
* Autocomplete
 * Update CodeMirror Editor avoiding the breaking "backspace bug": https://github.com/mathquill/mathquill/pull/78
* Save last run code (
 * either localStorage (if available in webview) or sqlite (overkill)
* App logo bullshit