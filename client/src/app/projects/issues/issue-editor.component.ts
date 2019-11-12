import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService, TransitionOptions } from '@uirouter/angular';
import { Issue } from './issue.model';
import { IssuesService } from './issues.service';
import Utils from '../../utils';
import {
  faSignature,
  faParagraph,
  faUser,
  faExclamationTriangle,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

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
  private issueForm: FormGroup;
  private responseClasses = '';
  private response = {
    title: '',
    message: ''
  };
  private uiOptions: TransitionOptions;

  private faSignature = faSignature;
  private faParagraph = faParagraph;
  private faUser = faUser;
  private faExclamationTriangle = faExclamationTriangle;
  private faCheck = faCheck;

  constructor(
    private stateService: StateService,
    private service: IssuesService,
    private fb: FormBuilder,
    private utils: Utils
  ) {}

  buildForm() {
    this.issueForm = this.fb.group({
      issue_title: [
        this.issue.issue_title,
        [Validators.required, Validators.minLength(3)]
      ],
      issue_text: [
        this.issue.issue_text,
        [Validators.required, Validators.minLength(10)]
      ],
      created_by: [
        this.issue.created_by,
        [Validators.required, Validators.minLength(3)]
      ],
      assigned_to: [this.issue.assigned_to, [Validators.minLength(3)]],
      status_text: [this.issue.status_text, [Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    console.debug('Issue.editor.projectSlug:', this.projectSlug);
    if (this.issueId) {
      this.service.byId(this.projectSlug, this.issueId).subscribe(response => {
        this.isEditing = true;
        this.isReady = true;
        this.issue = response;
        this.buildForm();
      });
    } else {
      this.isReady = true;
      this.issue = new Issue('', '', '');
      this.buildForm();
    }
  }

  isNotValid(control: any) {
    return control.invalid && (control.dirty || control.touched);
  }

  getControlIcon(control: any) {
    if (control.invalid) {
      return faExclamationTriangle;
    }
    return faCheck;
  }

  get assigned_to() {
    return this.issueForm.get('assigned_to');
  }

  get created_by() {
    return this.issueForm.get('created_by');
  }

  get issue_title() {
    return this.issueForm.get('issue_title');
  }

  get issue_text() {
    return this.issueForm.get('issue_text');
  }

  get status_text() {
    return this.issueForm.get('status_text');
  }

  onSubmit() {
    this.responseClasses = '';
    this.response = {
      title: '',
      message: ''
    };
    if (this.issueForm.valid) {
      let shouldUpdate = false;

      for (let prop in this.issue) {
        console.debug('Checking issue property:', prop);
        const formProp = this.issueForm.get(prop);
        if (!formProp) {
          continue;
        }

        if (this.issue[prop] !== formProp.value) {
          shouldUpdate = true;
          break;
        }
      }

      if (shouldUpdate) {
        console.info('Saving data');
        const newIssue = new Issue(
          this.issue_title.value,
          this.issue_text.value,
          this.created_by.value
        );

        newIssue.assigned_to = this.assigned_to.value;
        newIssue.status_text = this.status_text.value;

        if (this.isEditing) {
          newIssue._id = this.issue._id;
          this.service
            .update(this.projectSlug, newIssue)
            .subscribe(response => {
              if (response !== 'successfully updated') {
                this.response = {
                  title: 'Update failed',
                  message: response
                };
                this.responseClasses = 'is-danger';
              } else {
                this.uiOptions = {
                  reload: true
                };
                this.stateService.go(
                  'projects.project',
                  {
                    slug: this.projectSlug
                  },
                  this.uiOptions
                );
              }
            });
        } else {
          this.service
            .create(this.projectSlug, newIssue)
            .subscribe(response => {
              if (!response._id) {
                this.response = {
                  title: 'Error',
                  message: 'Could not create the issue'
                };
                this.responseClasses = 'is-danger';
              } else {
                this.uiOptions = {
                  reload: true
                };
                this.stateService.go(
                  'projects.project',
                  {
                    slug: this.projectSlug
                  },
                  this.uiOptions
                );
              }
            });
        }
      } else {
        console.info('Data has not changed; skipping');
        this.stateService.go('projects.project', { slug: this.projectSlug });
      }
    } else {
      console.error('Data is not valid');
    }
  }

  randomData() {
    this.issue_title.setValue(this.utils.randomString(12));
    this.issue_text.setValue(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id malesuada nibh. Phasellus dignissim consequat dui quis eleifend. Quisque vestibulum ut lacus nec bibendum. Nam ut sapien diam. Quisque faucibus arcu enim, elementum congue ligula posuere et. Suspendisse potenti. Suspendisse sed sapien accumsan, ultrices ipsum at, tempor felis. Morbi at massa suscipit, dictum mi ac, mollis erat. Praesent euismod accumsan porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae'
    );
    this.created_by.setValue(this.utils.randomString(6));
  }
}
