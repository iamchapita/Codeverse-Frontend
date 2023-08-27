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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { SnippetComponent } from './components/snippet/snippet.component';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { SnippetDetailModalComponent } from './components/snippet-detail-modal/snippet-detail-modal.component';

@NgModule({
	declarations: [
		ProjectExplorerComponent,
		ProjectWorkspaceComponent,
		EditorComponent,
		IframeComponent,
		EditProfileComponent,
	],
	imports: [
		CommonModule,
		CodeverseRoutingModule,
		NavbarComponent,
		CreateNewActionModalComponent,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		HighlightModule,
		SnippetComponent,
		SnippetDetailModalComponent,
	],
	providers: [
		{
			provide: HIGHLIGHT_OPTIONS,
			useValue: {
				fullLibraryLoader: () => import('highlight.js'),
			},
		},
	],
})
export class CodeverseModule {}
