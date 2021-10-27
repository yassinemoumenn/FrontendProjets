export interface IDesignpage {
  html: string;
  css: string;
}

export class DesignModel {
  id?: number;
  name!: string;
  shape!: string;
  time!: string;
  category!: string;
  author!: string;
  isUsed!: boolean;
  recto!: IDesignpage;
  verso!: IDesignpage;
  height!: string;
  width!: string;

  constructor(design: DesignModel) {
    this.id = design.id;
    this.name = design.name;
    this.shape = design.shape;
    this.time = design.time;
    this.category = design.category;
    this.author = design.author;
    this.isUsed = design.isUsed;
    this.recto = design.recto;
    this.verso = design.verso;
  }
}
