import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeverseRoutingModule } from './codeverse-routing.module';
import { ProjectExplorerComponent } from './pages/project-explorer/project-explorer.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectWorkspaceComponent } from './pages/project-workspace/project-workspace.component';

@NgModule({
	declarations: [ProjectExplorerComponent, ProjectWorkspaceComponent],
	imports: [
		CommonModule,
		CodeverseRoutingModule,
		SharedModule,
		FontAwesomeModule,
	],
})
export class CodeverseModule {}
