import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-certificates',
  templateUrl: './view-certificates.component.html',
  styleUrls: ['./view-certificates.component.scss']
})
export class ViewCertificatesComponent {
  @Input() displayedRows$!: any[];

  side: string = 'Recto';
  constructor(public dialog: MatDialog) {}
  public columns = ['certificateID', 'recipient', 'email', 'State', 'Actions'];

  page1;
  page2;
  NameDesign;
  hasVerso;
  Recto!: boolean;
  RectoVErso() {
    if (!this.Recto) {
      this.side = 'Recto';
      let app1 = document.getElementById('DivToShowRecto');
      app1!.innerHTML = this.page1;
    } else {
      this.side = 'Verso';
      let app2 = document.getElementById('DivToShowRecto');
      app2!.innerHTML = this.page2;
    }
    this.Recto = !this.Recto;
  }
  openDialog(content, design): void {

    this.page1 = design.recto.html + design.recto.css;
    this.page2 = design.verso.html + design.verso.css;
    this.NameDesign = design.name;
    this.hasVerso = design.verso.html === undefined ? false : true;
    this.Recto = design.verso.html === undefined ? false : true;
    this.dialog.open(content, {
      disableClose: true,
      width: '70%',
      height: '80%'
    });
    let app1 = document.getElementById('DivToShowRecto');
    app1!.innerHTML = this.page1;

    let app2 = document.getElementById('DivToShowVerso');
    app2!.innerHTML = this.page2;
  }

  close() {
    this.dialog.closeAll();
  }

}
