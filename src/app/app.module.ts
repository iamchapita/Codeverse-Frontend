import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilesComponent } from './codeverse/pages/files/files.component';
import { CreatorComponent } from './codeverse/pages/creator/creator.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { NotfoundComponent } from './shared/pages/notfound/notfound.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [
		AppComponent,
		FilesComponent,
		CreatorComponent,
		LoginComponent,
		RegisterComponent,
		NotfoundComponent,
	],
	imports: [BrowserModule, AppRoutingModule, FontAwesomeModule, NgbModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
