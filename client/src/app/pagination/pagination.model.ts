/**
 * A pagination class represents the data required to display the page numbers.
 */
export class Pagination {
  totalItems: number;
  range: number;
  pageStart: number;
  pageSize: number;
  private _state: string;
  private _totalPages: number;
  private _currentPage: number;
  private _pageList = [];

  /**
   * Builds a pagination object.
   *
   * @param totalItems The total number of items for this page.
   * @param state The state to build the uiSref value.
   * @param currentPage The current page.
   * @param pageSize The items that fit a single page.
   * @param range Range of pages to display. Like 1 ... 5, 6, 7 ... 100.
   * The pages will start at (currentPage - range) and end at (currentPage + range).
   */
  constructor(
    totalItems: number,
    state: string,
    currentPage = 1,
    pageSize = 10,
    range = 5
  ) {
    this.totalItems = totalItems;
    this.range = +range || 5;
    this.pageSize = +pageSize || 10;
    this._totalPages = Math.ceil(this.totalItems / this.pageSize);
    this._state = state;
    this._currentPage = +currentPage || 1;
    console.debug('Total pages:', this._totalPages);
    console.debug('Page range:', this.range);

    if (this._totalPages > 1) {
      this.buildPageList();
    }
    console.debug('Page list:', this._pageList);
  }

  buildPageList() {
    this._pageList.push(1);
    const maxRange = this.range * 2 + 1;
    let startAt: number = 2,
      endAt: number = this._totalPages - 1;

    if (maxRange < this._totalPages) {
      startAt = this._currentPage - this.range;
      if (startAt <= 2) {
        startAt = 2;
      }

      endAt = this._currentPage + this.range;

      if (endAt >= this._totalPages) {
        endAt = this._totalPages - 1;
      }

      console.debug('Range start:', startAt);
      console.debug('Range end at:', endAt);
    }

    if (startAt > 2) {
      this._pageList.push('hellip');
    }

    for (let i = startAt; i <= endAt; i++) {
      this._pageList.push(i);
    }

    if (endAt < this._totalPages - 1) {
      this._pageList.push('hellip');
    }

    this._pageList.push(this._totalPages);
  }

  /**
   * Wheter or not the pagination should be displayed.
   */
  get shouldDisplay() {
    return this._totalPages > 1;
  }

  get totalPages() {
    return this._totalPages;
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(page) {
    this._currentPage = Number(page);
  }

  /**
   * Retrieves the page list.
   */
  get pageList() {
    return this._pageList;
  }

  /**
   * Checks if the current page is the first.
   */
  get isFirst() {
    return this._currentPage === 1;
  }

  /**
   * Checks if the current page is the last or not.
   */
  get isLast() {
    return this._currentPage === this._totalPages;
  }

  /**
   * Retrieves the state (see uiSref from ui-router).
   */
  get state() {
    return this._state;
  }

  /**
   * Retrieves the next page, where totalPages is the maximum.
   */
  get next() {
    let n = this._currentPage + 1;
    if (n > this._totalPages) {
      n = this._totalPages;
    }
    return n;
  }

  /**
   * Retrieves the previous page with 1 as the minimum.
   */
  get previous() {
    let p = this._currentPage - 1;
    if (p < 1) {
      p = 1;
    }
    return p;
  }
}
