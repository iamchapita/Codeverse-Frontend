export type Type = 'Proyecto' | 'Carpeta';

export interface ProjectExplorerRow {
	id: number;
	name: string;
	description: string;
	type: Type;
	createdAt: string;
	modifiedAt: string;
}
