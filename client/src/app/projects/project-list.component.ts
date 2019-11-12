import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './project.model';
import Pagination from '../pagination/pagination.model';
import {
  faProjectDiagram,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.sass']
})
export class ProjectListComponent implements OnInit {
  private projects: Project[];
  private faProjectDiagram = faProjectDiagram;
  private faPlusCircle = faPlusCircle;
  private pagination: Pagination;

  constructor(private service: ProjectsService) {}

  ngOnInit(): void {
    console.debug('Service:', this.service);
    this.service.list().subscribe(response => {
      this.projects = response;
      this.pagination = new Pagination(this.projects, 150, 'projects', 1);
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
