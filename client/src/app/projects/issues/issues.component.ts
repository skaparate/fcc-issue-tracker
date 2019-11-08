import { Component, Input, OnInit } from '@angular/core';
import { IssuesService } from '../issues/issues.service';
import { Issue } from './issue.model';

@Component({
  selector: 'issues',
  templateUrl: './issues.component.html'
})
export class IssuesComponent implements OnInit {
  @Input() projectSlug: string;
  private issues: Issue[];

  constructor(private service: IssuesService) {}

  ngOnInit() {
    this.service
      .list(this.projectSlug)
      .subscribe(response => (this.issues = response));
  }
}
