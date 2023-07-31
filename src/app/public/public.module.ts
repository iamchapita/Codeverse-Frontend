import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { LandingComponent } from './pages/landing/landing.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

@NgModule({
	declarations: [LandingComponent],
	imports: [
		CommonModule,
		PublicRoutingModule,
		FontAwesomeModule,
		NavbarComponent,
	],
})
export class PublicModule {}
