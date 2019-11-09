import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './project.model';
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

  constructor(private service: ProjectsService) {}

  ngOnInit(): void {
    console.debug('Service:', this.service);
    this.service.list().subscribe(response => (this.projects = response));
  }
}
