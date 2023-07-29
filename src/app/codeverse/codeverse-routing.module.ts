import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreatorComponent } from './pages/creator/creator.component';
import { FilesComponent } from './pages/files/files.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'create',
				component: CreatorComponent,
			},
			{
				path: 'files',
				component: FilesComponent,
			},
			{
				path: 'home',
				component: HomeComponent,
			},
			{
				path: '**',
				redirectTo: 'home',
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
