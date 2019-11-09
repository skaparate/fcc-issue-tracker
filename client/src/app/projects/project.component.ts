import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project.model';
import { IssuesService } from './issues/issues.service';
import { Issue } from './issues/issue.model';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  @Input() projectSlug: string;
  private project: Project;
  private issues: Issue[];

  constructor(
    private service: ProjectsService,
    private issueService: IssuesService
  ) {}

  ngOnInit() {
    this.service.bySlug(this.projectSlug).subscribe(response => {
      this.project = response;
      console.debug('Read project:', this.project);
      this.issueService.list(this.project.slug).subscribe(issueResponse => {
        this.issues = issueResponse;
      });
    });
  }
}
