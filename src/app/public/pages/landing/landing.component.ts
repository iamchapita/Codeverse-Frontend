import { Component } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
	faICursor,
	faUser,
	faUserPlus,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
	faChevronRight = faChevronRight;
	faICursor = faICursor;
	faUser = faUser;
	faUsers = faUsers;
	faUserPlus = faUserPlus;

	isLanding: boolean = true;
}
