import { IEmunRunStatus } from '@/services/interfaces/projects.d'

const mapRunStatus = (status: IEmunRunStatus) => {
  switch (status) {
    case IEmunRunStatus.unknown:
      return '未运行'
    case -IEmunRunStatus.fail:
      return '运行失败'
    case IEmunRunStatus.success:
      return '运行成功'
  }
}

export { mapRunStatus }
