import {
  Component,
  Input,
  ElementRef,
  ComponentRef,
  Output,
  EventEmitter
} from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Project } from './project.model';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'project-list-item',
  templateUrl: './project-list-item.component.html'
})
export class ProjectListItemComponent {
  @Input() project: Project;
  /**
   * Event emitted when a project is successfully removed.
   */
  @Output() deleteProject: EventEmitter<string>;
  private faEdit = faEdit;
  private faTrash = faTrash;

  constructor(private service: ProjectsService) {
    this.deleteProject = new EventEmitter();
  }

  get asString() {
    return JSON.stringify(this.project);
  }

  removeProject($event: MouseEvent, id: string) {
    $event.preventDefault();
    this.service.remove(id).subscribe(response => {
      alert(response);
      if (response === 'Project removed' && this.deleteProject) {
        this.deleteProject.emit(id);
      }
    });
  }
}