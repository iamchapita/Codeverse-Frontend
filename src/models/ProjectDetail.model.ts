import { ProjectFolder } from './ProjectFolder.model';

export interface ProjectDetails {
	id: number;
	name: string;
	createdAt: string;
	projectFolders: Array<ProjectFolder>;
	description: string;
	createdAt: string;
	modifiedAt: string;
}
