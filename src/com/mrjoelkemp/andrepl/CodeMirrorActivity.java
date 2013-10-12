package com.mrjoelkemp.andrepl;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.Toast;

public class CodeMirrorActivity extends Activity {

	String mText = "default";
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		final WebView web = (WebView) findViewById(R.id.web);
		web.getSettings().setJavaScriptEnabled(true);
		web.loadUrl("file:///android_asset/codemirror2/webkit/home.html");
		web.addJavascriptInterface(new JavascriptInterface(this), "AndroidCode");

		final Button button = (Button) findViewById(R.id.button);
		button.setOnClickListener(new View.OnClickListener() {
			public void onClick(View arg0) {

				new Runnable() {
					public void run() {

						web.loadUrl("javascript:getEditorText()");		
					}
				}.run();
				button.setText(mText);
			}
		});
	}

	public class JavascriptInterface {

		private Context mCtx;

		JavascriptInterface(Context ctx) {

			mCtx = ctx;
		}

		public void toastIt(String text) {

			Toast.makeText(mCtx, text, Toast.LENGTH_LONG).show();
		}
		
		public void setText(String text) {
			
			mText = text;
		}
	}
}