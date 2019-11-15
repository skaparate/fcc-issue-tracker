import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Issue } from './issue.model';
import { IssuesService } from './issues.service';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'issue',
  templateUrl: './issue.component.html',
})
export class IssueComponent implements OnInit {
  @Input() projectSlug: string;
  @Input() issueId: string;
  private baseUrl: string;

  issue: Issue;

  faEdit = faEdit;
  faPlus = faPlus;

  constructor(private route: ActivatedRoute, private service: IssuesService) {
    this.projectSlug = this.route.parent.snapshot.params.slug;
    this.issueId = this.route.snapshot.params.issueId;
    this.baseUrl = `/projects/${this.projectSlug}`;
  }

  ngOnInit(): void {
    console.debug(`issueComponent.init: ${this.projectSlug}, ${this.issueId}`);
    this.service
      .byId(this.projectSlug, this.issueId)
      .subscribe(response => (this.issue = response));
  }

  get newIssueUrl() {
    return [`${this.baseUrl}/new/issue`];
  }

  get editIssueUrl() {
    return [`${this.baseUrl}/edit/issue`, this.issueId];
  }

  get returnUrl() {
    return [`${this.baseUrl}`];
  }
}
