export class Issue {
  _id: string;
  issue_title: string;
  issue_text: string;
  created_by: string;
  projectId: string;
  created_on: Date;
  updated_on: Date;
  open: boolean;
  status_text: string;
  assigned_to: string;

  constructor(issue_title: string, issue_text: string, created_by: string) {
    this.issue_title = issue_title;
    this.issue_text = issue_text;
    this.created_by = created_by;
  }
}
