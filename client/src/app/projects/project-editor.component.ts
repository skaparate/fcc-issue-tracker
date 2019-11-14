import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StateService, TransitionOptions } from '@uirouter/angular';
import { Project } from './project.model';
import { ProjectsService } from './projects.service';
import {
  faSignature,
  faAnchor,
  faUser,
  faCheck,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Utils } from '../utils';

@Component({
  selector: 'project-editor',
  templateUrl: './project-editor.component.html',
})
export class ProjectEditorComponent implements OnInit {
  @Input() projectId: string;
  project: Project;
  isEditing = false;
  isReady = false;
  projectForm: FormGroup;
  responseClasses = '';
  response = {
    title: '',
    message: '',
  };
  uiOptions: TransitionOptions;

  faSignature = faSignature;
  faAnchor = faAnchor;
  faUser = faUser;

  constructor(
    private fb: FormBuilder,
    private stateService: StateService,
    private service: ProjectsService,
    private utils: Utils
  ) {
    this.uiOptions = {
      reload: false,
    };
  }

  buildForm() {
    this.projectForm = this.fb.group({
      name: [this.project.name, [Validators.required, Validators.minLength(3)]],
      owner: [
        this.project.owner,
        [Validators.required, Validators.minLength(3)],
      ],
      url: [this.project.url],
    });
  }

  ngOnInit() {
    if (this.projectId) {
      console.debug('We will edit the project ' + this.projectId);
      this.service.byId(this.projectId).subscribe(response => {
        this.project = response;
        this.isReady = true;
        this.isEditing = true;
        this.buildForm();
      });
    } else {
      console.debug('We are creating a new project :)');
      this.project = new Project('', '');
      this.isReady = true;
      this.buildForm();
    }
  }

  get name() {
    return this.projectForm.get('name');
  }

  get owner() {
    return this.projectForm.get('owner');
  }

  get url() {
    return this.projectForm.get('url');
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

  get diagnostic() {
    return JSON.stringify({
      name: this.name.value,
      owner: this.owner.value,
      url: this.url.value,
    });
  }

  onSubmit() {
    this.responseClasses = '';
    this.response = {
      title: '',
      message: '',
    };
    if (this.projectForm.valid) {
      let shouldUpdate = false;

      for (let prop in this.project) {
        console.debug('Checking project property:', prop);
        const projectFormProp = this.projectForm.get(prop);
        if (!projectFormProp) {
          continue;
        }

        if (this.project[prop] !== projectFormProp.value) {
          shouldUpdate = true;
          break;
        }
      }

      if (shouldUpdate) {
        console.info('Saving data');
        let proj = new Project(this.name.value, this.owner.value);
        proj.url = this.url.value;

        if (this.isEditing) {
          proj._id = this.project._id;
          this.service.update(proj).subscribe(response => {
            if (response !== 'Project updated') {
              this.responseClasses = 'is-danger';
              this.response = {
                title: 'Operation Failed',
                message: response,
              };
            } else {
              this.responseClasses = 'is-success';
              this.response = {
                title: 'Operation Success',
                message: response,
              };
              this.uiOptions.reload = true;
            }
          });
        } else {
          this.service.create(proj).subscribe(response => {
            if (!response._id) {
              this.response = {
                title: 'Operation Failed',
                message: 'Failed to save the project',
              };
              this.responseClasses = 'is-danger';
            } else {
              this.uiOptions.reload = true;
              this.stateService.go('projects', null, this.uiOptions);
            }
          });
        }
      } else {
        console.debug('Data did not change; skipping');
      }
    }
  }

  randomData() {
    this.name.setValue(this.randName);
    this.owner.setValue(this.randOwner);
  }

  get randName() {
    return this.utils.randomString(12);
  }

  get randOwner() {
    return this.utils.randomString(12);
  }
}
