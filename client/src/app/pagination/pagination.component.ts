import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from './pagination.model';

@Component({
  selector: 'nmv-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass'],
})
export class PaginationComponent implements OnInit {
  @Input() pagination: Pagination;

  constructor() {
    console.debug('Pagination built');
  }

  ngOnInit() {}
}
