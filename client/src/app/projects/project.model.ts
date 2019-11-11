export class Project {
  _id: string;
  name: string;
  slug: string;
  owner: string;
  url: string;
  issueCount: number;
  createdOn: Date;
  updatedOn: Date;

  constructor(name: string, owner: string) {
    this.name = name;
    this.owner = owner;
  }
}
