export const PAGE_SIZE = 10

export interface Page<T> {
  items: Array<T>
  total: number
  page: number
  pageSize: number
}
