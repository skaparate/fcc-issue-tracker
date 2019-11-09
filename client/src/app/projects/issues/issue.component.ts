import { Component, Input, OnInit } from '@angular/core';
import { Issue } from './issue.model';
import { IssuesService } from './issues.service';

@Component({
  selector: 'issue',
  templateUrl: './issue.component.html'
})
export class IssueComponent implements OnInit {
  @Input() projectSlug: string;
  @Input() issueId: string;

  private issue: Issue;

  constructor(private service: IssuesService) {}

  ngOnInit(): void {
    console.debug(`issueComponent.init: ${this.projectSlug}, ${this.issueId}`);
    this.service
      .byId(this.projectSlug, this.issueId)
      .subscribe(response => (this.issue = response));
  }
}
