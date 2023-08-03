import { Component } from '@angular/core';
import {
	faFolderPlus,
	faFolderTree,
	faStar,
	faShareNodes,
	faCode,
	faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { EditorComponent } from '../../components/editor/editor.component';
import { Project } from 'src/models/Project.model';

@Component({
	selector: 'app-project-workspace',
	templateUrl: './project-workspace.component.html',
	styleUrls: ['./project-workspace.component.css'],
})
export class ProjectWorkspaceComponent {
	faFolderPlus = faFolderPlus;
	faFolderTree = faFolderTree;
	faStar = faStar;
	faShareNodes = faShareNodes;
	faCode = faCode;
	faChevronUp = faChevronUp;

	// Controla los navlink
	workspace: boolean = true;

	// Controla las ventanas plegadas/desplegadas
	htmlHidden: boolean = false;
	cssHidden: boolean = false;
	jsHidden: boolean = false;

	foldEditor(type: string): void {
		if (
			type == 'HTML' &&
			(this.cssHidden === false || this.jsHidden === false)
		) {
			this.htmlHidden = !this.htmlHidden;
		}
		if (
			type == 'CSS' && (this.htmlHidden === false || this.jsHidden === false)
		) {
			this.cssHidden = !this.cssHidden;
		}
		if (
			type == 'JS' && (this.htmlHidden === false || this.cssHidden === false)
		) {
			this.jsHidden = !this.jsHidden;
		}
	}

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
				content: '',
				createdAt: '2023-07-20',
				modifiedAt: '2023-07-30',
			},
			{
				id: 2,
				type: 'CSS',
				content: '',
				createdAt: '2023-07-20',
				modifiedAt: '2023-07-30',
			},
			{
				id: 3,
				type: 'JS',
				content: '',
				createdAt: '2023-07-20',
				modifiedAt: '2023-07-30',
			},
		],
	};
}
