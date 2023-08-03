import { Component } from '@angular/core';
import {
	faFolderPlus,
	faFolderTree,
	faStar,
	faShareNodes,
} from '@fortawesome/free-solid-svg-icons';

import { Folder } from 'src/models/Folder.model';

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

	isExplorer: boolean = true;

	data: Array<Folder> = [
		{
			id: 1,
			name: 'Raíz',
			description: '',
			folders: [
				{
					id: 1,
					name: 'Carpeta 1 en 1',
					description: 'Prueba de Carpeta',
					createdAt: '2023-07-20',
					modifiedAt: '2023-07-30',
					folders: [],
					projects: [],
				},
			],
			projects: [
				{
					id: 1,
					name: 'Proyecto 1',
					description: 'Proyecto 1 en  Web',
					createdAt: '2023-07-20',
					modifiedAt: '2023-07-30',
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
				},
			],
			createdAt: '2023-07-20',
			modifiedAt: '2023-07-30',
		},
	];
}
