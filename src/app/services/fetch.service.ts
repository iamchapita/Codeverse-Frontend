import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Folder } from 'src/models/Folder.model';
import { Project } from 'src/models/Project.model';
import { Snippet } from 'src/models/Snippet.model';
import { File } from 'src/models/File.model';

@Injectable({
	providedIn: 'root',
})
export class FetchService {
	constructor(private router: Router) {}

	folder: Folder = {
		_id: '1',
		name: 'Raíz',
		description: '',
		folders: [
			{
				_id: '1.1',
				name: 'Carpeta 1',
				description: 'Prueba de Carpeta',
				parentFolder: '1',
				folders: [],
				projects: [],
				snippets: [],
				createdAt: '2023-07-20',
				modifiedAt: '2023-07-30',
			},
			{
				_id: '1.2',
				name: 'Carpeta 2',
				description: 'Prueba de Carpeta',
				parentFolder: '1',
				folders: [],
				projects: [],
				snippets: [],
				createdAt: '2023-08-01',
				modifiedAt: '2023-08-01',
			},
			{
				_id: '1.3',
				name: 'Carpeta 3',
				description: 'Prueba de Carpeta',
				parentFolder: '1',
				folders: [],
				projects: [],
				snippets: [],
				createdAt: '2023-08-16',
				modifiedAt: '2023-08-16',
			},
		],
		projects: [
			{
				_id: '1.1.1',
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
		snippets: [],
		createdAt: '2023-07-20',
		modifiedAt: '2023-07-30',
	};
}
