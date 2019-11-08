import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project.model';
import { IssuesService } from './issues/issues.service';
import { Issue } from './issues/issue.model';

@Component({
  selector: 'project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  @Input() projectObservable: Observable<Project>;
  private project: Project;
  private issues: Issue[];

  constructor(private issueService: IssuesService) {}

  ngOnInit() {
    this.projectObservable.subscribe(response => {
      this.project = response;
      this.issueService.list(this.project.slug).subscribe(issueResponse => {
        this.issues = issueResponse;
      });
    });
  }
}
