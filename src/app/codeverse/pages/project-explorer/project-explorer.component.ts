import { Component, OnInit } from '@angular/core';
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
import { FetchService } from 'src/app/services/fetch.service';

@Component({
	selector: 'app-project-explorer',
	templateUrl: './project-explorer.component.html',
	styleUrls: ['./project-explorer.component.css'],
})
export class ProjectExplorerComponent implements OnInit {
	faFolderPlus = faFolderPlus;
	faFolderTree = faFolderTree;
	faStar = faStar;
	faShareNodes = faShareNodes;
	faCode = faCode;
	faFileCode = faFileCode;
	faArrowUp = faArrowUp;

	isExplorer: boolean = true;
	onlyFolders: boolean = false;
	onlyProjects: boolean = false;
	onlySharedProject: boolean = false;
	isUpDisabled: boolean;

	rootFolder: Folder = {
		_id: '',
		name: '',
		description: '',
		folders: [],
		projects: [],
		createdAt: '',
		modifiedAt: '',
	};

	constructor(private fetchService: FetchService) {}

	ngOnInit(): void {
		this.isUpDisabled = !this.rootFolder.hasOwnProperty('parentFolder');
	}

	async getRootFolder() {
		const uid = JSON.parse(localStorage.getItem('user')!).uid;

		this.fetchService
			.makeRequest(`folders/user/${uid}`, 'GET', null)
			.then((response) => {
				return response.json();
			})
			.catch((error) => {
				console.log(error);
			});
	}
}
