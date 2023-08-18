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
export class NavbarComponent implements OnInit {
	public isCollapsed: boolean = true;
	public userName: string = '';

	constructor(public authService: AuthService) {}

	ngOnInit(): void {
		this.userName = JSON.parse(localStorage.getItem('user')!).displayName;
	}

	toggleCollapsed() {
		this.isCollapsed = !this.isCollapsed;
	}

	@Input() isWorkspace: boolean = false;
	@Input() isLanding: boolean = false;
	@Input() isExplorer: boolean = false;
}
