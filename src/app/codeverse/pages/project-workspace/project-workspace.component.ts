import { Component } from '@angular/core';
import {
	faFolderPlus,
	faFolderTree,
	faStar,
	faShareNodes,
	faCode,
	faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { EditorComponent } from '../../components/editor/editor.component';
import { ProjectDetails } from 'src/models/ProjectDetail.model';

@Component({
	selector: 'app-project-workspace',
	templateUrl: './project-workspace.component.html',
	styleUrls: ['./project-workspace.component.css'],
})
export class ProjectWorkspaceComponent {
	faFolderPlus = faFolderPlus;
	faFolderTree = faFolderTree;
	faStar = faStar;
	faShareNodes = faShareNodes;
	faCode = faCode;
	faChevronUp = faChevronUp;

	workspace: boolean = true;
	// project: ProjectDetails = {}
}
