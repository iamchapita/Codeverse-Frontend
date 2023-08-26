import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { firebaseConfig } from '../environments/firebaseConfig';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
	HIGHLIGHT_OPTIONS,
	HighlightModule,
	HighlightOptions,
} from 'ngx-highlightjs';

@NgModule({
	declarations: [AppComponent],
	imports: [
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireAuthModule,
		BrowserModule,
		AppRoutingModule,
		FontAwesomeModule,
		NgbModule,
		HighlightModule,
	],
	providers: [
		{
			provide: HIGHLIGHT_OPTIONS,
			useValue: <HighlightOptions>{
				lineNumbers: true,
				coreLibraryLoader: () => import('highlight.js/lib/core'),
				lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
				languages: {
					js: () => import('highlight.js/lib/languages/javascript'),
					css: () => import('highlight.js/lib/languages/css'),
					xml: () => import('highlight.js/lib/languages/xml'),
				},
			},
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
