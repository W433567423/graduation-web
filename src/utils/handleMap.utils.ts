import dayjs from 'dayjs';

import type { IGetProjectMenu, IProjectListItem } from '@/services/interfaces/projects';
import { IEmunRunStatus } from '@/services/interfaces/projects.d';
import { type TreeNodeData } from '@arco-design/web-vue';

export const mapRunStatus = (status: IEmunRunStatus) => {
	switch (status) {
		case IEmunRunStatus.unknown:
			return '未运行';
		case IEmunRunStatus.fail:
			return '运行失败';
		case IEmunRunStatus.success:
			return '运行成功';
	}
};

export const mapListProjects = (list: IProjectListItem[]) => {
	return list.map((e) => {
		e.createTime = dayjs(e.createTime).format('YYYY-MM-DD HH:mm:ss');
		e.updateTime = dayjs(e.updateTime).format('YYYY-MM-DD HH:mm:ss');
		return e;
	});
};

export const FormateTree = (data: IGetProjectMenu[]): TreeNodeData[] => {
	return data.map((item: any) => {
		const temp: TreeNodeData = {};
		temp.key = item.id;
		temp.title = item.fileName;
		temp.isLeaf = !item.isFolder;
		temp.children = item.isFolder ? [{}] : undefined;

		return temp;
	});
};
