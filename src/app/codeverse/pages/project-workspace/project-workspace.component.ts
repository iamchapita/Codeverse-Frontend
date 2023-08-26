import { Component, OnInit } from '@angular/core';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/models/Project.model';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from 'src/app/services/auth.service';
import { FileSaverService } from 'ngx-filesaver';

@Component({
	selector: 'app-project-workspace',
	templateUrl: './project-workspace.component.html',
	styleUrls: ['./project-workspace.component.css'],
})
export class ProjectWorkspaceComponent implements OnInit {
	faChevronUp = faChevronUp;
	projectId: string | null;

	projectDetail: Project = {
		_id: '',
		name: '',
		description: '',
		createdAt: '',
		modifiedAt: '',
		files: [],
		user: '',
		parentFolder: '',
	};

	htmlCode: string = '';
	cssCode: string = '';
	jsCode: string = '';
	iframeCode: string = '';

	// Controla los navlinkm
	workspace: boolean = true;

	// Controla las ventanas plegadas/desplegadas
	htmlHidden: boolean = false;
	cssHidden: boolean = false;
	jsHidden: boolean = false;

	// Controla si las ventanas están plegadas y desplegadas
	areEditorsHidden: boolean = false;

	// Controla el spinnet de carga
	isLoading: boolean = true;

	constructor(
		private route: ActivatedRoute,
		private fetchService: FetchService,
		private authService: AuthService,
		private fileService: FileSaverService
	) {}

	ngOnInit(): void {
		this.projectId = this.route.snapshot.paramMap.get('id');
		this.getProject(this.projectId!);
	}

	async getProject(projectId: string) {
		const userId = JSON.parse(localStorage.getItem('user')!).id;

		await this.fetchService
			.makeRequest(`projects/${projectId}`, 'GET', null)
			.then((response) => {
				this.projectDetail = { ...response };

				if (
					this.projectDetail.user !== userId &&
					this.projectDetail.colaborators?.indexOf(userId) === -1
				) {
					console.log('No tienes Acceso a este Proyecto');
				}

				this.projectDetail.files?.map((fileId, index) => {
					this.fetchService
						.makeRequest(`files/${fileId}`, 'GET', null)
						.then((response) => {
							this.projectDetail.files?.splice(
								index,
								1,
								response
							);
							this.setCodeValues(response.content, response.type);
						})
						.catch((error) => {
							console.log(error);
						});
				});

				this.changeLoadingValue();
			})
			.catch((error) => {
				console.log('No tienes Acceso a este Proyecto');
				console.log(error);
			});
	}

	changeLoadingValue(): void {
		this.isLoading = !this.isLoading;
	}

	setCodeValues(content: string, type: string): void {
		if (type === 'HTML') {
			this.htmlCode = content;
		}
		if (type === 'CSS') {
			this.cssCode = content;
		}
		if (type === 'JS') {
			this.jsCode = content;
		}

		this.iframeCode = `
		<html>
		<head>
			<style>
				${this.cssCode}
			</style>
		</head>
		<body>
			${this.htmlCode}
			<script>
				${this.jsCode}
			</script>
		</body>
		</html>
		`;
	}

	htmlCodeChange(value: string) {
		this.htmlCode = value;

		this.iframeCode = `
			<html>
			<head>
				<style>
					${this.cssCode}
				</style>
			</head>
			<body>
				${this.htmlCode}
				<script>
					${this.jsCode}
				</script>
			</body>
			</html>
		`;
	}

	cssCodeChange(value: string) {
		this.cssCode = value;

		this.iframeCode = `
			<html>
			<head>
				<style>
					${this.cssCode}
				</style>
			</head>
			<body>
				${this.htmlCode}
				<script>
					${this.jsCode}
				</script>
			</body>
			</html>
		`;
	}

	jsCodeChange(value: string) {
		this.jsCode = value;

		this.iframeCode = `
			<html>
			<head>
				<style>
					${this.cssCode}
				</style>
			</head>
			<body>
				${this.htmlCode}
				<script>
					${this.jsCode}
				</script>
			</body>
			</html>
		`;
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

	saveEditor(type: string) {
		let editorContent: string = '';

		if (type === 'HTML') {
			editorContent = this.htmlCode;
		}
		if (type === 'CSS') {
			editorContent = this.cssCode;
		}
		if (type === 'JS') {
			editorContent = this.jsCode;
		}

		const file = this.projectDetail.files?.filter(
			(file) => file.type === type
		);

		this.fetchService
			.makeRequest(`files/${file![0]._id}`, 'PUT', {
				content: editorContent,
			})
			.then((response) => {
				// console.log(response);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	downloadFile(type: string) {
		let content: string = '';

		if (type === 'HTML') {
			content = `
				<html>
				<head>
					<title>${type}</title>
				</head>
				<body>
					${this.htmlCode}
				</body>
				</html>
			`;
		}

		if (type === 'CSS') {
			content = this.cssCode;
		}

		if (type === 'JS') {
			content = this.jsCode;
		}

		const fileName = `${
			this.projectDetail.name
		}.${type.toLocaleLowerCase()}`;
		const fileType = this.fileService.genType(fileName);
		const txtBlob = new Blob([content], { type: fileType });
		this.fileService.save(txtBlob, fileName);
	}
}
