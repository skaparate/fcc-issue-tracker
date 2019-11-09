import { Component, Input, OnInit } from '@angular/core';
import { Issue } from './issue.model';
import { IssuesService } from './issues.service';
import { faSignature, faParagraph,faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'issue-editor',
  templateUrl: './issue-editor.component.html'
})
export class IssueEditorComponent implements OnInit {
  @Input() issueId: string;
  @Input() projectSlug: string;
  private isEditing = false;
  private isReady = false;
  private issue: Issue;

  private faSignature = faSignature;
  private faParagraph = faParagraph;
  private faUser = faUser;

  constructor(private service: IssuesService) {}

  ngOnInit() {
    console.debug('Issue.editor.projectSlug:', this.projectSlug);
    if (this.issueId) {
      this.isEditing = true;
      this.service.byId(this.projectSlug, this.issueId).subscribe(response => {
        this.isReady = true;
        this.issue = response;
      });
    } else {
      this.isReady = true;
      this.issue = new Issue('', '', '');
    }
  }
}
