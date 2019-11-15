import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  faProjectDiagram,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';

import { ProjectsService } from '../projects.service';
import { Project } from '../project.model';
import { Pagination } from '../../pagination/pagination.model';
import { ProjectList } from './project-list.model';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const response$ = this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        this.page = +params.get('page') || null;
        this.pageSize = +params.get('pageSize') || null;
        this.pageRange = +params.get('pageRange') || null;
        return this.service.list({
          page: this.page,
          pageSize: this.pageSize,
        });
      })
    );
    response$.subscribe((data: ProjectList) => {
      this.projects = data.data;
      this.pagination = new Pagination(
        data.total,
        '/projects',
        this.page,
        this.pageSize,
        this.pageRange
      );
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
