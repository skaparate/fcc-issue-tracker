import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { Project } from '../project.model';
import { Pagination } from '../../pagination/pagination.model';
import {
  faProjectDiagram,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.sass'],
})
export class ProjectListComponent implements OnInit {
  page: number;
  pageSize: number;
  pageRange: number;
  projects: Project[];
  faProjectDiagram = faProjectDiagram;
  faPlusCircle = faPlusCircle;
  pagination: Pagination;

  constructor(
    private service: ProjectsService,
    private routerSvc: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routerSvc.queryParams.subscribe(params => {
      this.page = params.page;
      this.pageSize = params.pageSize;
      this.pageRange = params.pageRange;
      console.debug('Current page:', this.page);
      console.debug('Page size:', this.pageSize);
      console.debug('Page range:', this.pageRange);
      this.service
        .list({
          page: this.page,
          pageSize: this.pageSize,
        })
        .subscribe(response => {
          console.debug(
            'project.list.response:',
            response,
            typeof response.data
          );
          this.projects = response.data;
          this.pagination = new Pagination(
            response.total,
            '/projects',
            this.page,
            this.pageSize,
            this.pageRange
          );
        });
    });
  }

  /**
   * Called when a project is removed from the database,
   * which in turns needs to be removed from the list.
   *
   * @param id The id of the project removed.
   */
  onDeleteProject(id: string) {
    console.info(`The project '${id}' was deleted`);
    this.projects = this.projects.filter(i => i._id !== id);
  }
}
