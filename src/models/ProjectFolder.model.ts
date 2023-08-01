import { File } from './File.model';

export type ProjectFolder = {
	id: number;
	name: string;
	files: Array<File>;
	createdAt: string;
	modifiedAt: string;
};
