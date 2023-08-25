import { Component, OnInit } from '@angular/core';
import {
	faFolderPlus,
	faFolderTree,
	faStar,
	faShareNodes,
	faCode,
	faFileCode,
	faArrowUp,
	faBarsStaggered,
} from '@fortawesome/free-solid-svg-icons';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Folder } from 'src/models/Folder.model';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from 'src/app/services/auth.service';
import { CreateNewActionModalComponent } from '../../components/create-new-action-modal/create-new-action-modal.component';

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
	faBarsStaggered = faBarsStaggered;

	isExplorer: boolean = true;
	onlyFolders: boolean = false;
	onlyProjects: boolean = false;
	onlySnippets: boolean = false;
	onlySharedProject: boolean = false;
	isUpDisabled: boolean;
	isLoading: boolean = false;

	rootFolder: Folder = {
		_id: '',
		name: '',
		description: '',
		user: '',
		folders: [],
		projects: [],
		snippets: [],
		createdAt: '',
		modifiedAt: '',
	};

	constructor(
		private fetchService: FetchService,
		private authService: AuthService,
		private modalService: NgbModal
	) {}

	ngOnInit(): void {
		this.isUpDisabled = !this.rootFolder.hasOwnProperty('parentFolder');
		this.getRootFolder();
	}

	openModal() {
		const modalRef = this.modalService.open(CreateNewActionModalComponent);

		modalRef.result.then(
			(result) => {
				if (result !== 'Cerrar') {
					console.log(
						'Valor del input:',
						modalRef.componentInstance.inputValue
					);
				}
			},
			(reason) => {
				// Manejar el cierre del modal (si es necesario)
			}
		);
	}

	changeLoadingValue(): void {
		this.isLoading = !this.isLoading;
	}

	async getRootFolder() {
		this.changeLoadingValue();
		const id = JSON.parse(localStorage.getItem('user')!).id;

		this.fetchService
			.makeRequest(`folders/user/${id}`, 'GET', null)
			.then((response) => {
				this.rootFolder = { ...response };
				console.log(response);
				this.changeLoadingValue();
			})
			.catch((error) => {
				console.log(error);
			});
	}
}
