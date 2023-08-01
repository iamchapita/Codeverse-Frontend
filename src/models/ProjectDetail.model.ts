import { ProjectFolder } from './ProjectFolder.model';

export interface ProjectDetails {
	id: number;
	name: string;
	projectFolders: Array<ProjectFolder>;
	description: string;
	createdAt: string;
	modifiedAt: string;
}
