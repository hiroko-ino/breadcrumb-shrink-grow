export type FileType = string

export type BreadcrumbItemType = {
  id: string
  text: string
  parentId?: string
  items: FileType[]
}

export type BreadcrumbType = {
  [key: string]: BreadcrumbItemType
}