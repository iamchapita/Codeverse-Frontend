import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CodeverseRoutingModule } from './codeverse-routing.module';
import { ProjectExplorerComponent } from './pages/project-explorer/project-explorer.component';
import { ProjectWorkspaceComponent } from './pages/project-workspace/project-workspace.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { EditorComponent } from './components/editor/editor.component';
import { IframeComponent } from './components/iframe/iframe.component';
import { CreateNewActionModalComponent } from './components/create-new-action-modal/create-new-action-modal.component';
import { FormsModule } from '@angular/forms';
import {
	HIGHLIGHT_OPTIONS,
	HighlightModule,
	HighlightOptions,
} from 'ngx-highlightjs';

@NgModule({
	declarations: [
		ProjectExplorerComponent,
		ProjectWorkspaceComponent,
		EditorComponent,
		IframeComponent,
	],
	imports: [
		CommonModule,
		CodeverseRoutingModule,
		NavbarComponent,
		CreateNewActionModalComponent,
		FormsModule,
		FontAwesomeModule,
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
})
export class CodeverseModule {}
