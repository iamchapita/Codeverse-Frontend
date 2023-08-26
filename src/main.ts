/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HIGHLIGHT_OPTIONS, HighlightOptions } from 'ngx-highlightjs';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
	.bootstrapModule(AppModule, {
		providers: [
			{
				provide: HIGHLIGHT_OPTIONS,
				useValue: <HighlightOptions>{
					lineNumbers: true,
					coreLibraryLoader: () => import('highlight.js/lib/core'),
					lineNumbersLoader: () =>
						import('ngx-highlightjs/line-numbers'),
					languages: {
						js: () =>
							import('highlight.js/lib/languages/javascript'),
						css: () => import('highlight.js/lib/languages/css'),
						xml: () => import('highlight.js/lib/languages/xml'),
					},
				},
			},
		],
	})
	.catch((err) => console.error(err));
