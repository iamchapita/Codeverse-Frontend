import { Component, OnInit } from '@angular/core';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { EditorComponent } from '../../components/editor/editor.component';
import { IframeComponent } from '../../components/iframe/iframe.component';
import { Project } from 'src/models/Project.model';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from 'src/app/services/auth.service';

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

	projectTitle: string = '';
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

	constructor(
		private route: ActivatedRoute,
		private fetchService: FetchService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.setCodeValues();
		this.projectId = this.route.snapshot.paramMap.get('id');
		this.getProject(this.projectId!);
	}

	async getProject(projectId: string) {
		const userId = JSON.parse(localStorage.getItem('user')!).id;

		await this.fetchService
			.makeRequest(`projects/${projectId}`, 'GET', null)
			.then((response) => {
				this.projectDetail = { ...response };

				if (this.projectDetail.user !== userId) {
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
						})
						.catch((error) => {
							console.log(error);
						});
				});

				this.setCodeValues();

			})
			.catch((error) => {
				console.log('No tienes Acceso a este Proyecto');
				console.log(error);
			});
	}

	setCodeValues(): void {
		this.projectTitle = this.projectDetail.name;

		this.projectDetail.files?.map((file) => {
			if (file.type === 'HTML') {
				this.htmlCode = file.content;
			}
			if (file.type === 'CSS') {
				this.cssCode = file.content;
			}
			if (file.type === 'JS') {
				this.jsCode = file.content;
			}
		});

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
}
