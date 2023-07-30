import { Component } from '@angular/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
	faFacebook = faFacebook;
}
