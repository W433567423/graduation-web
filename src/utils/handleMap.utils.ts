import dayjs from 'dayjs';

import type { IProjectListItem } from '@/services/interfaces/projects';
import { IEmunRunStatus } from '@/services/interfaces/projects.d';

const mapRunStatus = (status: IEmunRunStatus) => {
	switch (status) {
		case IEmunRunStatus.unknown:
			return '未运行';
		case IEmunRunStatus.fail:
			return '运行失败';
		case IEmunRunStatus.success:
			return '运行成功';
	}
};

const mapListProjects = (list: IProjectListItem[]) => {
	return list.map((e) => {
		e.createTime = dayjs(e.createTime).format('YYYY-MM-DD hh:mm:ss');
		e.updateTime = dayjs(e.updateTime).format('YYYY-MM-DD hh:mm:ss');
		return e;
	});
};

export { mapListProjects, mapRunStatus };
