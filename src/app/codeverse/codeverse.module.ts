import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeverseRoutingModule } from './codeverse-routing.module';
import { ProjectExplorerComponent } from './pages/project-explorer/project-explorer.component';

@NgModule({
	// declarations: [HomeComponent, CreatorComponent, FilesComponent],
	imports: [CommonModule, CodeverseRoutingModule],
	declarations: [
   ProjectExplorerComponent
	],
})
export class CodeverseModule {}
