interface IMenuItem {
  id: number
  title: string
  link: string
  icon: string
}

interface IProgramItem {
  id: number
  name: string
  statusCode: number
  lastSuccessTime: string
  lastFileTime: string
  lastRunTime: string
}

export type { IProgramItem, IMenuItem }
