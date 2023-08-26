import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectExplorerComponent } from './pages/project-explorer/project-explorer.component';
import { ProjectWorkspaceComponent } from './pages/project-workspace/project-workspace.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'projectExplorer',
				component: ProjectExplorerComponent,
			},
			{
				path: 'projectWorkspace/:id',
				component: ProjectWorkspaceComponent,
			},
			{
				path: '**',
				redirectTo: 'projectExplorer',
			},
		],
	},
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CodeverseRoutingModule {}
