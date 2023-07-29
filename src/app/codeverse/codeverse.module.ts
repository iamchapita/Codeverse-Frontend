import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CodeverseRoutingModule } from './codeverse-routing.module';
import { CreatorComponent } from './pages/creator/creator.component';
import { FilesComponent } from './pages/files/files.component';

@NgModule({
	declarations: [HomeComponent, CreatorComponent, FilesComponent],
	imports: [CommonModule, CodeverseRoutingModule],
})
export class CodeverseModule {}
