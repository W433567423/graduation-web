export enum IEmunRunStatus {
	fail = -1,
	unknown = 0,
	success = 1
}
interface IProjectListItem {
	id: number;
	projectName: string;
	lastStatus: IEmunRunStatus;
	createTime: string;
	updateTime: string;
	disable: boolean;
}

interface IProjectList {
	list: IProjectListItem[];
	total: number;
}
interface IRunProjectResultError {
	message: string;
	name: string;
}
interface IRunProjectResult {
	codeStatus: boolean;
	codeResult: IRunProjectResultError | string[];
	codeRunDate: string;
}
interface IGetProjectCode {
	projectName: string;
	code: string;
}

export type { IGetProjectCode, IProjectList, IProjectListItem, IRunProjectResult, IRunProjectResultError };
