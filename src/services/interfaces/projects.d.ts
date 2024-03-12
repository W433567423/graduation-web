export enum IEmunRunStatus {
	fail = -1,
	unknown = 0,
	success = 1
}
export interface IProjectListItem {
	id: number;
	projectName: string;
	lastStatus: IEmunRunStatus;
	createTime: string;
	updateTime: string;
	disable: boolean;
	projectType: string;
	rootWorkId: string;
}

export interface IProjectList {
	list: IProjectListItem[];
	total: number;
}
export interface IRunProjectResultError {
	message: string;
	name: string;
}
export interface IRunProjectResult {
	codeStatus: boolean;
	codeResult: IRunProjectResultError | string[];
	codeRunDate: string;
}
export interface IGetProjectCode {
	projectName: string;
	code: string;
}

export interface ICreateProject {
	projectName: string;
	projectType: string;
	projectLanguage: string;
	projectCode: string;
}

export interface IGetProjectMenu {
	fileName: string;
	id: number;
	isFolder: boolean;
	parentFolder: number;
	updateTime: string;
}
