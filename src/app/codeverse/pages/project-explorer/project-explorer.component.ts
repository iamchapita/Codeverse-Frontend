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
import { FetchService } from 'src/app/services/fetch.service';

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

	constructor(private fetchService: FetchService) {}

	rootFolder: Folder = this.fetchService.rootFolder;
}
