import { Component } from '@angular/core';
import {
	faFolderPlus,
	faFolderTree,
	faStar,
	faShareNodes,
	faCode,
	faFileCode,
	faArrowUp,
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
	faCode = faCode;
	faFileCode = faFileCode;
	faArrowUp = faArrowUp;

	isExplorer: boolean = true;

	data: Array<Folder> = [
		{
			_id: '1',
			name: 'Raíz',
			description: '',
			folders: [
				{
					_id: '1',
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
					_id: '1',
					name: 'Proyecto 1',
					description: 'Proyecto 1 en  Web',
					createdAt: '2023-07-20',
					modifiedAt: '2023-07-30',
					files: [
						{
							_id: '1',
							type: 'HTML',
							content: '',
							createdAt: '2023-07-20',
							modifiedAt: '2023-07-30',
						},
						{
							_id: '2',
							type: 'CSS',
							content: '',
							createdAt: '2023-07-20',
							modifiedAt: '2023-07-30',
						},
						{
							_id: '3',
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
