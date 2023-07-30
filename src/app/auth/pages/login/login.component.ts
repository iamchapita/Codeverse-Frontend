import { Component } from '@angular/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	faFacebook = faFacebook;
}
