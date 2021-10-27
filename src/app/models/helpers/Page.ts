export class Page<T> {
  success!: boolean;
  message!: string;
  data!: Data<T>;
}

export class Data<T> {
  content!: T[];
  empty!: boolean;
  first!: boolean;
  last!: boolean;
  number!: number;
  numberOfElements!: number;
  pageable;
  size!: number;
  sort!: Isort;
  totalElements!: number;
  totalPages!: number;
}

export interface Ipageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Isort;
}

export interface Isort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface Ipaginator {
  paginator: Ipageable;
  numberOfElements: number;
}
