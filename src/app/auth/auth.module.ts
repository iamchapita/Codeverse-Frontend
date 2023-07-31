import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		NavbarComponent,
		FontAwesomeModule,
	],
})
export class AuthModule {}
