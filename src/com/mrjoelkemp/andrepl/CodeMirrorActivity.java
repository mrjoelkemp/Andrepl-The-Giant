package com.mrjoelkemp.andrepl;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.Toast;

@SuppressLint("SetJavaScriptEnabled")
public class CodeMirrorActivity extends Activity {
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		final WebView web = (WebView) findViewById(R.id.web);
		web.getSettings().setJavaScriptEnabled(true);
		web.loadUrl("file:///android_asset/codemirror2/webkit/index.html");
		web.addJavascriptInterface(new JavascriptInterface(this), "AndroidCode");
	}

	public class JavascriptInterface {
		private Context mCtx;
		JavascriptInterface(Context ctx) {
			mCtx = ctx;
		}
	}
}