export default class Pagination {
  items: Array<any>;
  totalItems: number;
  range: number;
  pageStart: number;
  itemsPerPage: number;
  private _state: string;
  private _totalPages = 0;
  private _currentPage = 0;

  constructor(
    items: Array<any>,
    totalItems: number,
    state: string,
    itemsPerPage = 10,
    range = 5,
    pageStart = 1
  ) {
    this.items = items;
    this.totalItems = totalItems;
    this.range = range;
    this.pageStart = pageStart;
    this.itemsPerPage = itemsPerPage;
    this._totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this._state = state;
  }

  get shouldDisplay() {
    if (this.items === undefined) {
      return false;
    }
    return this.items.length > 0 && this._totalPages > 0;
  }

  get totalPages() {
    return this._totalPages;
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(page) {
    this._currentPage = page;
  }

  get isFirst() {
    return this._currentPage === 0;
  }

  get isLast() {
    return this._currentPage === this._totalPages;
  }

  get state() {
    return this._state;
  }

  get next() {
    let n = this._currentPage + 1;
    if (n > this._totalPages) {
      n = this._totalPages;
    }
    return n;
  }

  get previous() {
    let p = this._currentPage - 1;
    if (p < 0) {
      p = 0;
    }
    return p;
  }
}
