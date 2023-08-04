import { Component, OnInit } from '@angular/core';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { EditorComponent } from '../../components/editor/editor.component';
import { IframeComponent } from '../../components/iframe/iframe.component';
import { Project } from 'src/models/Project.model';

@Component({
	selector: 'app-project-workspace',
	templateUrl: './project-workspace.component.html',
	styleUrls: ['./project-workspace.component.css'],
})
export class ProjectWorkspaceComponent implements OnInit {
	faChevronUp = faChevronUp;

	projectDetail: Project = {
		id: 1,
		name: 'Prueba',
		description: 'Descripción',
		createdAt: '2023/08/02',
		modifiedAt: '2023/08/02',
		files: [
			{
				id: 1,
				type: 'HTML',
				content: 'Esto es HTML',
				createdAt: '2023-07-20',
				modifiedAt: '2023-07-30',
			},
			{
				id: 2,
				type: 'CSS',
				content: 'Esto es CSS',
				createdAt: '2023-07-20',
				modifiedAt: '2023-07-30',
			},
			{
				id: 3,
				type: 'JS',
				content: 'Esto es JS',
				createdAt: '2023-07-20',
				modifiedAt: '2023-07-30',
			},
		],
	};

	projectTitle: string = '';
	htmlCode: string = '';
	cssCode: string = '';
	jsCode: string = '';

	// Controla los navlink
	workspace: boolean = true;

	// Controla las ventanas plegadas/desplegadas
	htmlHidden: boolean = false;
	cssHidden: boolean = false;
	jsHidden: boolean = false;

	// Controla si las ventanas están plegadas y desplegadas
	areEditorsHidden: boolean = false;

	ngOnInit(): void {
		this.setCodeValues();
	}

	setCodeValues(): void {
		this.projectTitle = this.projectDetail.name;

		this.projectDetail.files?.map((file) => {
			if (file.type === 'HTML') {
				this.htmlCode = file.content;
			}
			if (file.type === 'CSS') {
				this.cssCode = file.content;
			}
			if (file.type === 'JS') {
				this.jsCode = file.content;
			}
		});
	}

	htmlCodeChange(value: string) {
		this.htmlCode = value;
	}

	cssCodeChange(value: string) {
		this.cssCode = value;
	}

	jsCodeChange(value: string) {
		this.jsCode = value;
	}

	foldEditor(type: string): void {
		if (
			type == 'HTML' &&
			(this.cssHidden === false || this.jsHidden === false)
		) {
			this.htmlHidden = !this.htmlHidden;
		}
		if (
			type == 'CSS' &&
			(this.htmlHidden === false || this.jsHidden === false)
		) {
			this.cssHidden = !this.cssHidden;
		}
		if (
			type == 'JS' &&
			(this.htmlHidden === false || this.cssHidden === false)
		) {
			this.jsHidden = !this.jsHidden;
		}

		this.areEditorsHidden =
			this.htmlHidden === true ||
			this.jsHidden === true ||
			this.cssHidden === true
				? true
				: false;
	}
}
