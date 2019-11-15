import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  faEdit,
  faLock,
  faLockOpen,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { Issue } from '../issue.model';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'issue-list-item',
  templateUrl: './issue-list-item.component.html',
})
export class IssueListItemComponent implements OnInit {
  @Input() issue: Issue;
  @Input() projectSlug: string;
  @Output() deleteIssue: EventEmitter<string>;
  faEdit = faEdit;
  faLock = faLock;
  faLockOpen = faLockOpen;
  faTrash = faTrash;
  faEye = faEye;

  showMessage = false;
  message = '';
  messageClass = 'is-success';

  constructor(private service: IssuesService) {
    this.deleteIssue = new EventEmitter();
  }

  ngOnInit() {
    console.debug('IssueListItem.onInit: ', this.projectSlug);
  }

  changeIssueState(event: any) {
    let clone = Object.assign({}, this.issue);
    clone.open = !clone.open;
    this.service.update(this.projectSlug, clone).subscribe(response => {
      this.message = response;
      this.showMessage = true;
      if (this.message !== 'successfully updated') {
        this.messageClass = 'is-danger';
      }
      this.issue = clone;
    });
    event.preventDefault();
  }

  dismissMessage() {
    this.showMessage = false;
    this.messageClass = 'is-success';
    this.message = '';
  }

  get status() {
    return this.issue.open ? 'Open' : 'Closed';
  }

  get statusText() {
    return this.issue.open ? 'Close' : 'Open';
  }

  get statusIcon() {
    return this.issue.open ? this.faLock : this.faLockOpen;
  }

  get excerpt() {
    const text = this.issue.issue_text;
    let result = '';

    if (text.length > 180) {
      result = text.substring(0, 180);
      if (result.endsWith('.')) {
        result += '..';
      } else {
        result += '...';
      }
    } else {
      result = text;
    }
    return result;
  }

  handleIssueRemoval(id: string) {
    this.service.remove(this.projectSlug, id).subscribe(result => {
      if (result !== `deleted ${id}`) {
        alert(result);
      } else {
        alert('Issue removed');
        this.deleteIssue.emit(id);
      }
    });
  }

  get editUrl() {
    return [`/projects/${this.projectSlug}/edit/issue`, this.issue._id];
  }

  get url() {
    return [`/projects/${this.projectSlug}/issue`, this.issue._id];
  }
}
