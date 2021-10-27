export enum IssueState {
  PENDING,
  RESOLVED
}

export class IssueModel {
  id?: string;
  issue: string;
  state?: IssueState;
  description?: string;
  sender: string;
  delegatedTo?: string;
  answer?: string;

  constructor(issue: IssueModel) {
    this.id = issue.id;
    this.issue = issue.issue;
    this.state = issue.state;
    this.description = issue.description;
    this.sender = issue.sender;
    this.delegatedTo = issue.delegatedTo;
    this.answer = issue.answer;
  }
}
