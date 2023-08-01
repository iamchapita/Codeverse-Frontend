import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [RouterModule, NgbCollapseModule, CommonModule],
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
	public isCollapsed: boolean = true;

	toggleCollapsed() {
		this.isCollapsed = !this.isCollapsed;
	}

	@Input() isWorkspace: boolean = false;
	@Input() isLanding: boolean = false;
	@Input() isExplorer: boolean = false;
}
