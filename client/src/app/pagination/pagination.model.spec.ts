import { Pagination } from './pagination.model';

describe('PaginationModel', () => {
  it('Page list should contain the expected elements', () => {
    let pagination = new Pagination(7, '', 1, 1, 1);
    expect([1, 2, 'hellip', 7]).toEqual(pagination.pageList);

    pagination = new Pagination(2, '', 1, 1, 2);
    expect([1, 2]).toEqual(pagination.pageList);

    pagination = new Pagination(7, '', 7, 1, 1);
    expect([1, 'hellip', 6, 7]).toEqual(pagination.pageList);
  });
});
