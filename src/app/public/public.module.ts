import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './pages/landing/landing.component';

@NgModule({
	declarations: [LandingComponent],
	imports: [CommonModule, PublicRoutingModule, SharedModule],
})
export class PublicModule {}
