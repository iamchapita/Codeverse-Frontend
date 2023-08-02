import { Project } from './Project.model';

export interface Folder {
	id: number;
	name: string;
	description: string;
	createdAt: string;
	modifiedAt: string;
	folders: Array<Folder>;
	projects: Array<Project>;
}
