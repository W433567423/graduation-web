export enum IEmunRunStatus {
	fail = -1,
	unknown = 0,
	success = 1
}
export interface IProjectListItemRes {
	id: number;
	projectName: string;
	lastStatus: IEmunRunStatus;
	createTime: string;
	updateTime: string;
	disable: boolean;
	projectType: string;
	rootWorkFoldId: string;
}

export interface IProjectListRes {
	list: IProjectListItemRes[];
	total: number;
}
export interface IRunProjectResultErrorRes {
	message: string;
	name: string;
}
export interface IRunProjectResultRes {
	codeStatus: boolean;
	codeResult: IRunProjectResultErrorRes | string[];
	codeRunDate: string;
}
export interface IGetProjectCodeRes {
	projectName: string;
	code: string;
}

export interface ICreateProjectReq {
	projectName: string;
	projectType: string;
	projectLanguage: string;
	projectCode: string;
}

export interface ISetProjectReq {
	projectName?: string;
	indexFile?: string;
	codeLanguage?: string;
	code?: string;
	disable?: boolean;
}
