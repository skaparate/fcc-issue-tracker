import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './project.model';
import {
  faProjectDiagram,
  faPlusCircle,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {
  private projects: Project[];
  private faProjectDiagram = faProjectDiagram;
  private faPlusCircle = faPlusCircle;
  private faEdit = faEdit;

  constructor(private service: ProjectsService) {
    console.debug('Projects component');
  }

  ngOnInit(): void {
    console.debug('Service:', this.service);
    this.service.list().subscribe(response => (this.projects = response));
  }
}
