import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './pages/landing/landing.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [LandingComponent],
	imports: [
		CommonModule,
		PublicRoutingModule,
		SharedModule,
		FontAwesomeModule,
	],
})
export class PublicModule {}
