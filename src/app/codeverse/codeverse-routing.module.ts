import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectExplorerComponent } from './pages/project-explorer/project-explorer.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'projectExplorer',
				component: ProjectExplorerComponent,
			},
			{
				path: '**',
				redirectTo: 'projectExplorer',
				// pathMatch: 'full'
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
