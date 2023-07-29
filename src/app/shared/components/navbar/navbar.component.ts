import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [RouterModule, NgbCollapseModule],
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
	public isCollapsed: boolean = true;

	toggleCollapsed() {
		this.isCollapsed = !this.isCollapsed;
	}
}
