import { Component } from '@angular/core';
import {
	faFolderPlus,
	faFolderTree,
	faStar,
	faShareNodes,
	faCode,
} from '@fortawesome/free-solid-svg-icons';
import { EditorComponent } from '../../components/editor/editor.component';

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
}
