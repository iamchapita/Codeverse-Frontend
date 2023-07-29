import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
	declarations: [],
	imports: [NavbarComponent,CommonModule, SharedRoutingModule],
	exports: [NavbarComponent],
})
export class SharedModule {}
