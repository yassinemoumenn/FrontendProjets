export enum FieldType {
  text = 'text',
  email = 'email',
  date = 'date',
  file = 'file',
  time = 'time',
  number = 'number'
}
export class Field {
  name: string;
  type: FieldType;
  value?: string;
  new?: boolean;
  inBlockchain?: boolean;

  constructor(field: Field) {
    this.name = field.name;
    this.type = field.type;
    this.value = field.value;
    this.new = field.new || false;
    this.inBlockchain = field.inBlockchain || false;
  }
}
