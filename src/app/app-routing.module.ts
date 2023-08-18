import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () =>
			import('./auth/auth.module').then((m) => m.AuthModule),
	},
	{
		path: 'app',
		loadChildren: () =>
			import('./codeverse/codeverse.module').then(
				(m) => m.CodeverseModule
			),
		canActivate: [AuthGuard],
	},
	{
		path: '',
		loadChildren: () =>
			import('./public/public.module').then((m) => m.PublicModule),
		// canActivate: [AuthGuard],
	},
	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
