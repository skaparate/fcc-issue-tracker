import { Component, Input } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Project } from './project.model';

@Component({
  selector: 'project-list-item',
  templateUrl: './project-list-item.component.html'
})
export class ProjectListItemComponent {
  @Input() project: Project;
  private faEdit = faEdit;

  get asString() {
    return JSON.stringify(this.project);
  }
}
