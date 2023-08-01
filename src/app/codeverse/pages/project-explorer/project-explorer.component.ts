import { Component } from '@angular/core';
import {
	faFolderPlus,
	faFolderTree,
	faStar,
	faShareNodes,
} from '@fortawesome/free-solid-svg-icons';

import { ProjectExplorerRow } from 'src/models/ProjectExplorerRow.model';

@Component({
	selector: 'app-project-explorer',
	templateUrl: './project-explorer.component.html',
	styleUrls: ['./project-explorer.component.css'],
})
export class ProjectExplorerComponent {
	faFolderPlus = faFolderPlus;
	faFolderTree = faFolderTree;
	faStar = faStar;
	faShareNodes = faShareNodes;

	data: Array<ProjectExplorerRow> = [
		{
			id: 1,
			name: 'Proyecto 1',
			description: 'No provided',
			type: 'Proyecto',
			createdAt: '2023-07-20',
			modifiedAt: '2023-07-30',
		},
		{
			id: 2,
			name: 'Proyecto 3',
			description: 'No provided',
			type: 'Proyecto',
			createdAt: '2023-07-20',
			modifiedAt: '2023-07-30',
		},
		{
			id: 3,
			name: 'Proyecto 3',
			description: 'No provided',
			type: 'Proyecto',
			createdAt: '2023-07-20',
			modifiedAt: '2023-07-30',
		},
		{
			id: 4,
			name: 'Carpeta',
			description: 'No provided',
			type: 'Carpeta',
			createdAt: '2023-07-20',
			modifiedAt: '2023-07-30',
		},
	];
}
