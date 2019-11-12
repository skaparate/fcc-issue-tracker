import { Component, OnInit, Input } from '@angular/core';
import Pagination from './pagination.model';

@Component({
  selector: 'nmv-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {
  @Input() pagination: Pagination;

  constructor() {
    console.debug('Pagination built');
  }

  ngOnInit() {
    console.debug('Pagination init');
    console.debug('Pagination:');
    console.debug(JSON.stringify(this.pagination));
  }
}
