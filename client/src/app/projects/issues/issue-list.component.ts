import { Component, Input, OnInit } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { IssuesService } from './issues.service';
import { Issue } from './issue.model';

@Component({
  selector: 'issue-list',
  templateUrl: './issue-list.component.html'
})
export class IssueListComponent implements OnInit {
  @Input() projectSlug: string;
  private issues: Issue[];
  private faPlusCircle = faPlusCircle;

  constructor(private service: IssuesService) {}

  ngOnInit() {
    this.service
      .list(this.projectSlug)
      .subscribe(response => (this.issues = response));
  }
}
