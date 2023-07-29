import { Component } from '@angular/core';
// import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
	public isCollapsed: boolean = false;

	toggleCollapsed() {
		this.isCollapsed = !this.isCollapsed;
	}
}
