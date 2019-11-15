import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { IssuesService } from '../issues.service';
import { Issue } from '../issue.model';

@Component({
  selector: 'issue-list',
  template: `
    <div class="content">
      <p><back-button></back-button></p>
      <div class="issue-list project-{{ projectSlug }}">
        <div>
          <a class="button is-info" [routerLink]="newIssueUrl">
            <fa-icon [icon]="faPlusCircle"></fa-icon> New Issue
          </a>
        </div>
        <ul *ngIf="issues" class="columns is-multiline">
          <li *ngFor="let issue of issues" class="column is-12">
            <issue-list-item
              [issue]="issue"
              [projectSlug]="projectSlug"
              (deleteIssue)="handleDeleteIssue($event)"
            ></issue-list-item>
          </li>
        </ul>
        <div *ngIf="issues && issues.length === 0" class="has-text-info">
          No issues!
        </div>
      </div>
    </div>
  `,
})
export class IssueListComponent implements OnInit {
  @Input() projectSlug: string;
  issues: Issue[];
  faPlusCircle = faPlusCircle;

  constructor(private route: ActivatedRoute, private service: IssuesService) {
    this.projectSlug = route.snapshot.params.slug;
  }

  ngOnInit() {
    this.service
      .list(this.projectSlug)
      .subscribe(response => (this.issues = response));
  }

  handleDeleteIssue(id: string) {
    this.issues = this.issues.filter(i => i._id !== id);
  }

  get newIssueUrl() {
    return [`/projects/${this.projectSlug}/new/issue`];
  }
}
