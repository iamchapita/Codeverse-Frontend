import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Folder } from 'src/models/Folder.model';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from 'src/app/services/auth.service';
import { CreateNewActionModalComponent } from '../../components/create-new-action-modal/create-new-action-modal.component';
import {
	faFolderPlus,
	faFolderTree,
	faStar,
	faShareNodes,
	faCode,
	faFileCode,
	faArrowUp,
	faBarsStaggered,
	faCheck,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';

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
	faCheck = faCheck;
	faXmark = faXmark;

	isExplorer: boolean = true;
	onlyFolders: boolean = false;
	onlyProjects: boolean = false;
	onlySnippets: boolean = false;
	onlySharedProject: boolean = false;
	isUpDisabled: boolean;
	isLoading: boolean = false;
	triggerDeleteAction: boolean = false;

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

	changeLoadingValue(): void {
		this.isLoading = !this.isLoading;
	}

	changeTriggerDeleteActionValue(): void {
		this.triggerDeleteAction = !this.triggerDeleteAction;
	}

	openModal(origin: string) {
		const modalRef = this.modalService.open(CreateNewActionModalComponent, {
			size: 'lg',
			centered: true,
		});

		modalRef.result.then(
			(result) => {
				if (result !== 'Cerrar') {
					this.action(result, origin);
				}
			},
			(reason) => {
				// Manejar el cierre del modal (si es necesario)
			}
		);
	}

	async getRootFolder() {
		this.changeLoadingValue();
		const id = JSON.parse(localStorage.getItem('user')!).id;

		this.fetchService
			.makeRequest(`folders/user/${id}`, 'GET', null)
			.then((response) => {
				this.rootFolder = { ...response };

				// Cargando folders al objeto rootFolder
				this.rootFolder.folders?.map((folderId, index) => {
					this.fetchService
						.makeRequest(`folders/${folderId}`, 'GET', null)
						.then((response) => {
							this.rootFolder.folders?.splice(index, 1, response);
						})
						.catch((error) => {
							console.log(error);
						});
				});

				// Cargando projects al objeto rootFolder
				this.rootFolder.projects?.map((projectId, index) => {
					this.fetchService
						.makeRequest(`projects/${projectId}`, 'GET', null)
						.then((response) => {
							this.rootFolder.projects?.splice(
								index,
								1,
								response
							);
						})
						.catch((error) => {
							console.log(error);
						});
				});
			})
			.catch((error) => {
				console.log(error);
			});
		this.changeLoadingValue();
	}

	action(value: string, origin: string) {
		if (origin === 'folder') {
			this.addFolder(value);
		}

		if (origin === 'project') {
			this.addProject(value);
		}
	}

	async addFolder(name: string) {
		const id = JSON.parse(localStorage.getItem('user')!).id;

		this.fetchService
			.makeRequest('folders', 'POST', {
				name: name,
				user: id,
				parentFolder: `${this.rootFolder._id}`,
			})
			.then(async (childFolder) => {
				await this.getRootFolder();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async addProject(name: string) {
		const id = JSON.parse(localStorage.getItem('user')!).id;
		const types = ['HTML', 'CSS', 'JS'];

		this.fetchService
			.makeRequest('projects', 'POST', {
				name: name,
				parentFolder: `${this.rootFolder._id}`,
				user: id,
			})
			.then((project) => {
				types.map((type) => {
					this.fetchService
						.makeRequest('files', 'POST', {
							type: type,
							content: '',
						})
						.then((file) => {
							this.fetchService
								.makeRequest(
									`projects/${project._id}/add-file/${file._id}`,
									'PUT',
									null
								)
								.then(async (response) => {
									await this.getRootFolder();
								})
								.catch((error) => {
									console.log(error);
								});
						})
						.catch((error) => {
							console.log(error);
						});
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async deleteProject(id: string) {
		this.fetchService
			.makeRequest(
				`projects/${id}`,
				'DELETE',
				null
			)
			.then(async (response) => {
				this.changeTriggerDeleteActionValue();
				await this.getRootFolder();
			})
			.catch((error) => {
				console.log(error);
			});
	}
}
