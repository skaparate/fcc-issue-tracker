import { Component, OnInit, Input } from '@angular/core';
import { StateService } from '@uirouter/angular';
import { ProjectsService } from './projects.service';
import { Project } from './project.model';
import Pagination from '../pagination/pagination.model';
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
  private page: number;
  private pageSize: number;
  private projects: Project[];
  private faProjectDiagram = faProjectDiagram;
  private faPlusCircle = faPlusCircle;
  private pagination: Pagination;

  constructor(
    private service: ProjectsService,
    private stateSvc: StateService
  ) {
    this.page = this.stateSvc.params.page;
    this.pageSize = this.stateSvc.params.pageSize;
  }

  ngOnInit(): void {
    console.debug('Projects.pagination:', this.page, this.pageSize);
    this.service
      .list({
        page: this.page,
        pageSize: this.pageSize,
      })
      .subscribe(response => {
        console.debug('project.list.response:', response, typeof response.data);
        this.projects = response.data;
        this.pagination = new Pagination(
          response.total,
          'projects',
          this.page,
          this.pageSize,
          1
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
