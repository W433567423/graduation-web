export enum IFileType {
	'text/html' = 'text/html',
	'image/gif' = 'image/gif',
	'image/jpeg' = 'image/jpeg',
	'image/png' = 'image/png',
	'application/x-gzip' = 'application/x-gzip',
	'application/x-tar' = 'application/x-tar',
	'video/mp4' = 'video/mp4',
	'' = ''
}

export interface IGetFileMenuRes {
	fileName: string;
	id: number;
	isFolder: boolean;
	parentFolder: number;
	updateTime: string;
	mimetype: IFileType;
}

export interface IPostNewFileReq {
	fileName: string;
	parentId: number;
	content?: string;
	mimetype?: IFileType;
}
