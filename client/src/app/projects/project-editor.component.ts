import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project.model';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'project-editor',
  templateUrl: './project-editor.component.html'
})
export class ProjectEditorComponent implements OnInit {
  @Input() projectId: string;
  private project: Project;
  private isEditing = false;
  private isReady = false;

  constructor(private service: ProjectsService) {}

  ngOnInit() {
    if (this.projectId) {
      this.service.byId(this.projectId).subscribe(response => {
        this.project = response;
        this.isReady = true;
        this.isEditing = true;
      });
    } else {
      this.project = new Project('', '');
      this.isReady = true;
    }
  }
}
