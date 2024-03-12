export enum IFileType {
	'text/html',
	'text/plain',
	'application/rtf',
	'image/gif',
	'image/jpeg',
	'audio/basic',
	'audio/midi',
	'audio/x-midi',
	'audio/x-pn-realaudio',
	'video/mpeg',
	'video/x-msvideo',
	'application/x-gzip',
	'application/x-tar'
}

export interface IGetFileMenuRes {
	fileName: string;
	id: number;
	isFolder: boolean;
	parentFolder: number;
	updateTime: string;
}

export interface IPostNewFileReq {
	fileName: string;
	parentId: number;
	content?: string;
	mimetype?: IFileType;
}
