import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CodeverseRoutingModule } from './codeverse-routing.module';
import { ProjectExplorerComponent } from './pages/project-explorer/project-explorer.component';
import { ProjectWorkspaceComponent } from './pages/project-workspace/project-workspace.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { EditorComponent } from './components/editor/editor.component';
import { IframeComponent } from './components/iframe/iframe.component';

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
		FontAwesomeModule,
	],
})
export class CodeverseModule {}
