import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [RouterModule, NgbCollapseModule, CommonModule],
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
	public isCollapsed: boolean = true;
	@Input() isWorkspace: boolean = false;
	@Input() isLanding: boolean = false;
	@Input() isExplorer: boolean = false;
	@Input() isLoggin: boolean = false;
	@Input() folderId: string | null = null;

	constructor(public authService: AuthService) {}

	toggleCollapsed() {
		this.isCollapsed = !this.isCollapsed;
	}

	singOut() {
		this.toggleCollapsed();
		this.authService.signOut();
	}
}
