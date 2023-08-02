export type ProjectFolder = {
	id: number;
	name: string;
	files: {
		html: string;
		js: string;
		css: string;
	};
	createdAt: string;
	modifiedAt: string;
};
