import { AuthenticationService } from './../../../auth/authentication.service';
import { CategoryService } from './../../category/category.service';
import { ResponseObject } from './../../../../models/helpers/ResponseObject';
import { IDesignpage, DesignModel } from './../Design.model';
import { ConfirmDialogService } from '../../../../../../src/app/shared/confirm-dialog/confirm-dialog.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';
interface comp {
  type: string;
  rows: number;
  columns: any;
}

interface Fields {
  key: string;
  value: string;
}
import { MatDialog } from '@angular/material/dialog';
import { DesignService } from '../design.service';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-design',
  templateUrl: './add-design.component.html',
  styleUrls: ['./add-design.component.scss']
})
export class AddDesignComponent implements OnInit {
  user$;

  des!: DesignModel;

  TITELE;
  cancelText;
  confirmText;
  constructor(
    public dialog: MatDialog,
    public dialogservice: ConfirmDialogService,
    private readonly _designService: DesignService,
    private categoryservice: CategoryService,
    private auth: AuthenticationService,
    translate: TranslateService,
    private router: Router
  ) {
    translate.get('ISSUER.DESIGN').subscribe((text: string) => {
      this.TITELE = text['SAVEMESSAGE'];
      this.cancelText = text['CANCEL'];
      this.confirmText = text['CONFIRM'];
    });
  }
  OpenCustomizeShipe(content) {
    this.dialog.open(content, {
      disableClose: true,
      width: '40%'
    });
  }

  closePupUp() {
    this.dialog.closeAll();
  }

  allDesigns: DesignModel[] = [];
  checked = false;
  isDoubleSlide!: boolean;
  isChecked: boolean = true;
  private _editor: any;
  shapes: string[] = ['Custom', 'Card', 'Badge', 'Letter'];
  Side: string[] = ['Recto', 'Verso'];
  html = '';
  css = '';
  newDes: boolean = DesignService.newDes;
  designToUpDate = this._designService.designToUpDate;
  public HTML1: string = '';
  public HTML2: string = '';
  public CSS1: string = '';
  public CSS2: string = '';

  currentUser;
  categories: any;
  sb = this.auth.currentUserSubject
    .asObservable()
    .pipe(first((user) => !!user))
    .subscribe((user) => {
      this.currentUser = Object.assign({}, user);
    });

  issuerFields: Fields[] = [];

  certificateFields: string[] = [];

  recipientFields: [] = [];

  signerFields: string[] = [];

  public designForm!: FormGroup;
  public Shipe!: FormGroup;

  changeCategory(event) {
    const blockManager = this._editor.BlockManager;

    this._designService.getCategoryById(event.value).subscribe((res) => {
      res.data.signers!.forEach((element) => {
        this._designService.getSigner(element + '').subscribe((res) => {
          blockManager.add(res.data.id, {
            label: '<h6 style="font-size: 11px;">firstname</h6>',
            category:
              'signer Fields[' +
              res.data.firstname +
              ' ' +
              res.data.lastname +
              ']',
            content: ' <div> ' + res.data.firstname + '</div>'
          });

          blockManager.add(res.data.lastname, {
            label: '<h6 style="font-size: 11px;">lastname</h6>',
            category:
              'signer Fields[' +
              res.data.firstname +
              ' ' +
              res.data.lastname +
              ']',
            content: ' <div> ' + res.data.lastname + '</div>'
          });

          blockManager.add(res.data.email, {
            label: '<h6 style="font-size: 11px;">email</h6>',
            category:
              'signer Fields[' +
              res.data.firstname +
              ' ' +
              res.data.lastname +
              ']',
            content: ' <div> ' + res.data.email + '</div>'
          });

          blockManager.add(res.data.role, {
            label: '<h6 style="font-size: 11px;">role</h6>',
            category:
              'signer Fields[' +
              res.data.firstname +
              ' ' +
              res.data.lastname +
              ']',
            content: ' <div> ' + res.data.role + '</div>'
          });

          if (res.data.address !== null) {
            let country = res.data.address?.country;
            let city = res.data.address?.city;
            blockManager.add(res.data.address + 'address', {
              label: '<h6 style="font-size: 11px;">address</h6>',
              category:
                'signer Fields[' +
                res.data.firstname +
                ' ' +
                res.data.lastname +
                ']',
              content: ' <div> ' + city + ',' + country + '</div>'
            });
          }
          blockManager.add(res.data.birthday + 'Dirthday', {
            label: '<h6 style="font-size: 11px;">date of birth</h6>',
            category:
              'signer Fields[' +
              res.data.firstname +
              ' ' +
              res.data.lastname +
              ']',
            content: ' <div> ' + res.data.birthday + '</div>'
          });

          blockManager.add(res.data.signature + 'signature', {
            label: '<h6 style="font-size: 11px;">signature</h6>',
            category:
              'signer Fields[' +
              res.data.firstname +
              ' ' +
              res.data.lastname +
              ']',
            content: ' <div> ' + res.data.signature + '</div>'
          });

          let dialCode = res.data.phone?.dialCode;
          let areaCodes = res.data.phone?.areaCodes + '';
          blockManager.add(res.data.phone, {
            label: '<h6 style="font-size: 11px;">phone</h6>',
            category:
              'signer Fields[' +
              res.data.firstname +
              ' ' +
              res.data.lastname +
              ']',
            content: ' <div> ' + dialCode + ' ' + areaCodes + '</div>'
          });
        });
      });

      res.data.fields.certificate.forEach((element) => {
        blockManager.add(element.name, {
          label: '<h6 style="font-size: 11px;">' + element.name + '</h6>',
          category: 'Certificate Fields',
          content: ' <div> %' + element.name + '</div>'
        });
      });
      blockManager.add('qrcode', {
        label: '<h6 style="font-size: 11px;">QR code</h6>',
        category: 'Certificate Fields',
        content: ' <div> %qrcode </div>'
      });
      blockManager.add('Certificate id', {
        label: '<h6 style="font-size: 11px;">Certificate id</h6>',
        category: 'Certificate Fields',
        content: ' <div>%certificateid</div>'
      });
      res.data.fields.recipient.forEach((element) => {
        blockManager.add(element.name, {
          label: '<h6 style="font-size: 11px;">' + element.name + '</h6>',
          category: 'Recipient Fields',
          content: ' <div> @' + element.name + '</div>'
        });
      });
    });
  }

  confirmdialogv1() {
    const options = {
      title: this.TITELE,
      message: '',
      cancelText: this.cancelText,
      confirmText: this.confirmText,
      waitDesciption: 'processing . . .'
    };

    this.dialogservice.open(options);

    this.dialogservice.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        if (this.designForm.value.Side === 'Recto') {
          this.designForm.value.HTML1 = this._editor
            .getHtml()
            .replace('\\', '');
          this.designForm.value.CSS1 =
            '<style>' + this._editor.getCss() + '</style>';
          this.designForm.value.HTML2 = this.HTML2;
          this.designForm.value.CSS2 = this.CSS2;
        } else {
          this.designForm.value.HTML1 = this.HTML1;
          this.designForm.value.CSS1 = this.CSS1;
          this.designForm.value.HTML2 = this._editor
            .getHtml()
            .replace('\\', '');
          this.designForm.value.CSS2 =
            '<style>' + this._editor.getCss() + '</style>';
        }
        this.designForm.value.date = new Date().toLocaleString();
        let Recto: IDesignpage = {
          html: this.designForm.value.HTML1,
          css: this.designForm.value.CSS1
        };

        let Verso: IDesignpage = {
          html: this.designForm.value.HTML2,
          css: this.designForm.value.CSS2
        };
        this.des = {
          name: this.designForm.value.name.trim().toLowerCase(),
          shape: this.designForm.value.shapes.trim().toLowerCase(),
          time: this.designForm.value.date,
          category: this.designForm.value.category,
          isUsed: false,
          author: this.user$.id,
          recto: Recto,
          verso: Verso,
          height: this.Shipe.value.hiegth.toString(),
          width: this.Shipe.value.whidth.toString()
        };

        if (this.newDes) {
          this._designService.createDesign([this.des]).subscribe((res) => {});
        } else {
          this._designService
            .updateDesign(this.designToUpDate.id, this.des)
            .subscribe((res) => {
              this.router.navigateByUrl('/issuer/designs/listing-designs');
            });
        }
      }
    });
  }

  get editor() {
    return this._editor;
  }

  DragModeOn() {
    this._editor.setDragMode('absolute');
  }

  DragModeOff() {
    this._editor.setDragMode('null');
  }
  signersId: String[] = [];
  organization: any;
  Currentorganization: Fields[] = [];

  ngOnInit() {
    let CurrentOrganization;
    this.currentUser.groups.forEach((element) => {
      if (element.currentOrganization === true) {
        CurrentOrganization = element.organization;
      }
    });

    this._designService
      .getCurrentOrganization(CurrentOrganization.id)
      .subscribe((result) => {
        this.organization = result.data;
        this.Currentorganization = [
          { key: 'domain', value: this.organization.domain },
          { key: 'areaCode', value: this.organization.areaCode },
          { key: 'id', value: this.organization.id },
          { key: 'address', value: this.organization.location },
          { key: 'name', value: this.organization.name },
          { key: 'pack', value: this.organization.pack },
          { key: 'type', value: this.organization.type },
          { key: 'wallet', value: this.organization.wallet },
          { key: 'admin', value: this.organization.admin },
          { key: 'institutionId', value: this.organization.institutionId }
        ];

        const blockManager = this._editor.BlockManager;
        this.Currentorganization.forEach((element) => {
          blockManager.add(element.value + '-' + element.key, {
            label: '<h6 style="font-size: 11px;">' + element.key + '</h6>',
            category: 'Organization Fields',
            content: ' <div>' + element.value + '</div>'
          });
        });
      });

    this.issuerFields = [
      { key: 'First name', value: this.currentUser.firstname },
      { key: 'Last name', value: this.currentUser.lastname },
      { key: 'email', value: this.currentUser.email },
      { key: 'role', value: this.currentUser.role },
      { key: 'address', value: this.currentUser.address },
      { key: 'signature', value: this.currentUser.signature },
      { key: 'occupation', value: this.currentUser.occupation },
      { key: 'username', value: this.currentUser.username },
      { key: 'gender', value: this.currentUser.gender },
      { key: 'enabled', value: this.currentUser.enabled }
    ];

    this.Shipe = new FormGroup({
      whidth: new FormControl(
        this.newDes ? '' : this.designToUpDate.width.slice(0, -2),
        [Validators.required]
      ),
      hiegth: new FormControl(
        this.newDes ? '' : this.designToUpDate.height.slice(0, -2),
        [Validators.required]
      )
    });

    this.auth.currentUserSubject.asObservable().subscribe((data) => {
      this.user$ = data;
    });

    this.categoryservice.getAllCategories().subscribe((res) => {
      let Allcategories = res.data['content'];
      this.categories = Allcategories;
      this.signersId = this.categories.signers;
    });

    this._designService
      .getDesigns()
      .subscribe((res: ResponseObject<DesignModel[]>) => {
        this.allDesigns = res.data;
      });
    this.HTML1 = this.newDes ? '' : this._designService.Html1;
    this.CSS1 = this.newDes ? '' : this._designService.CSS1;
    this.HTML2 = this.newDes ? '' : this._designService.Html2;
    this.CSS2 = this.newDes ? '' : this._designService.CSS2;
    this._editor = this.initializeEditor();

    const blockManager = this._editor.BlockManager;
    this.issuerFields.forEach((element) => {
      blockManager.add(element.value + '-' + element.key, {
        label: '<h6 style="font-size: 11px;">' + element.key + '</h6>',
        category: 'Issuer Fields',
        content: ' <div>' + element.value + '</div>'
      });
    });
    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedDate = datepipe.transform(
      this.currentUser.birthday,
      'dd/MM/YYYY'
    );

    blockManager.add('birthday', {
      label: '<h6 style="font-size: 11px;">Date of birth</h6>',
      category: 'Issuer Fields',
      content: ' <div>' + formattedDate + '</div>'
    });

    blockManager.add('PHONE', {
      label: '<h6 style="font-size: 11px;">phone</h6>',
      category: 'Issuer Fields',
      content:
        ' <div>' +
        this.currentUser.phone.dialCode +
        this.currentUser.phone.areaCodes +
        '</div>'
    });

    blockManager.add('Pictur', {
      label: '<h6 style="font-size: 11px;">picture</h6>',
      category: 'Issuer Fields',
      content: ' <img src="' + this.currentUser.picture + '"></img>'
    });

    if (this.currentUser.address !== null) {
      let country = this.currentUser.address?.country;
      let city = this.currentUser.address.city;
      blockManager.add('Adress', {
        label: '<h6 style="font-size: 11px;">Adress</h6>',
        category: 'Issuer Fields',
        content: ' <div>' + city + ',' + country + '</div>'
      });
    }

    this.editor.setComponents(this.HTML1);
    this.editor.setStyle(this.CSS1);
    const attrTable = 'data-table';
    const attrTableBody = 'data-tbody';
    const attrTableFooter = 'data-tfoot';
    const attrTableHeader = 'data-thead';

    // eslint-disable-next-line no-unused-expressions
    this.isDoubleSlide === !this.newDes
      ? this.designToUpDate.isDoubleSlide
      : false;

    this.designForm = new FormGroup({
      shapes: new FormControl(!this.newDes ? this.designToUpDate.shape : '', [
        Validators.required
      ]),
      category: new FormControl(
        !this.newDes ? this.designToUpDate.category : '',
        [Validators.required]
      ),
      name: new FormControl(!this.newDes ? this.designToUpDate.name : '', [
        Validators.required
      ]),
      isDoubleSlide: new FormControl(this.isDoubleSlide),

      date: new FormControl(''),
      HTML1: new FormControl(''),
      CSS1: new FormControl(''),
      HTML2: new FormControl(''),
      CSS2: new FormControl(''),
      VERSO: new FormControl(!this.newDes ? this.designToUpDate.verso : ''),
      Side: new FormControl('Recto')
    });

    const GetButton = this._editor.Panels.getButton('options', 'sw-visibility');
    GetButton.attributes.buttons['className'] = 'far fa-square';
    GetButton.attributes.className = 'far fa-square';

    const fullScreenButton = this._editor.Panels.getButton(
      'options',
      'fullscreen'
    );
    fullScreenButton.attributes.buttons['className'] = 'fas fa-expand';
    fullScreenButton.attributes.className = 'fas fa-expand';

    this._editor.render();

    this._editor.Panels.addButton('options', [
      {
        id: 'DragMode',
        className: 'fas fa-arrows-alt',
        command: 'DragMode',
        attributes: { title: 'Drag Mode' }
      }
    ]);

    /** remove from panel */
    this._editor.Panels.removeButton('devices-c', 'set-device-desktop');
    this._editor.Panels.removeButton('devices-c', 'set-device-tablet');
    this._editor.Panels.removeButton('devices-c', 'set-device-mobile');

    /** remove from block */
    this.editor.BlockManager.remove('link-block');
    this.editor.BlockManager.remove('quote');

    this._editor.Commands.add('DragMode', {
      run: () => {
        this.DragModeOn();
      },
      stop: () => {
        this.DragModeOff();
      }
    });

    const TOOLBAR_CELL = [
      {
        attributes: { class: 'fas fa-flag' },
        command: 'table-insert-row-above'
      },
      {
        attributes: { class: 'fa fa-clone' },
        command: 'tlb-clone'
      },
      {
        attributes: { class: 'fas fa-trash' },
        command: 'tlb-delete'
      }
    ];

    const components2 = this._editor.DomComponents;
    const text = components2.getType('text');
    components2.addType('cell', {
      model: text.model.extend(
        {
          defaults: Object.assign({}, text.model.prototype.defaults, {
            type: 'cell',
            tagName: 'td',
            draggable: ['tr']
          })
        },

        {
          isComponent(el) {
            let result;
            const tag = el.tagName;
            if (tag === 'TD' || tag === 'TH') {
              result = {
                type: 'cell',
                tagName: tag.toLowerCase()
              };
            }
            return result;
          }
        }
      ),
      view: text.view
    });

    this._editor.on('component:selected', (m) => {
      m.set('toolbar', TOOLBAR_CELL);
    });

    this._editor.Commands.add('table-insert-row-above', (editor) => {
      const selected = editor.getSelected();

      if (selected.is('cell')) {
        const rowComponent = selected.parent();
        const rowIndex = rowComponent.collection.indexOf(rowComponent);
        const cells = rowComponent.components().length;
        const rowContainer = rowComponent.parent();

        rowContainer.components().add(
          {
            type: 'row',
            components: [...Array(cells).keys()].map((i) => ({
              type: 'cell',
              content: 'New Cell'
            }))
          },
          { at: rowIndex }
        );
      }
    });

    this._editor.DomComponents.getWrapper().setStyle(
      ' background-image: url(); background-size: contain; background-repeat: no-repeat; '
    );

    this._editor.Panels.addButton('options', [
      {
        id: 'save-db',
        className: 'fa fa-floppy-o',
        command: 'save-db',
        attributes: { title: 'Save Design' }
      }
    ]);

    this._editor.Commands.add('save-db', {
      run: function (editor, sender) {
        // eslint-disable-next-line no-unused-expressions
        sender && sender.set('active'); // turn off the button
        editor.store();
      }
    });

    this._editor.on('run:save-db', () => {
      if (this.designForm.invalid) {
        if (this.designForm.controls.category.errors) {
          this.designForm.controls.category.markAsTouched();
        }

        if (this.designForm.controls.name.errors) {
          this.designForm.controls.name.markAsTouched();
        }
        if (this.designForm.controls.shapes.errors) {
          this.designForm.controls.shapes.markAsTouched();
        }
      } else {
        this.confirmdialogv1();
      }
    });

    //table block
    const options = {
      ...{
        tableBlock: {},

        // Object to extend the default accordions properties, eg. `{ name: 'Table', droppable: false,row: 3,columns: 3, ... }`
        tableProps: {
          rows: 3,
          columns: 3,
          header: true,
          footer: true
        },
        // Object to extend the default table body properties, eg. `{ name: 'tbody', ... }`
        bodyProps: {},

        // Object to extend the default table head properties
        headProps: {},

        // Object to extend the default table footer properties
        footerProps: {},

        // Table attribute identifier (main component)
        attrTable,

        // Table Body attribute identifier
        attrTableBody,

        // Table Footer content attribute identifier
        attrTableFooter,

        // Table Header container attribute identifier
        attrTableHeader,

        // Default class to use on table
        classTable: 'table',

        // Default class to use on table body
        classTableBody: 'table-body',

        // Default class to use on table footer
        classTableFooter: 'table-footer',

        // Default class to use on table header
        classTableHeader: 'table-header',

        style: `
        table {
          width: 100%;
          border: 1px solid #cccccc;
          margin-bottom: 20px;
        }
        table td {
          padding: 8px;
          border: 1px solid #cccccc;
        }
      `
      }
    };

    // Add components
    const Type = 'table';
    const attrKey = options.attrTable;
    const classKey = options.classTable;
    const domc = this._editor.DomComponents;
    const defaultComponent = domc.getType('table');

    const tableModel = defaultComponent.model;
    const tableView = defaultComponent.view;
    const tableProps = options.tableProps || {};

    const components = [];
    const modal = this._editor.Modal;

    this._editor.DomComponents.addType(Type, {
      model: tableModel.extend(
        {
          defaults: {
            ...tableModel.prototype.defaults,
            components,

            traits: [
              {
                type: 'number',
                label: 'Number of Rows',
                name: 'rows',
                changeProp: 1
              },
              {
                type: 'number',
                label: 'Number of Columns',
                name: 'columns',
                changeProp: 1
              },
              {
                type: 'checkbox',
                label: 'Table Header',
                name: 'header',
                valueTrue: true,
                valueFalse: false,
                changeProp: 1
              },
              {
                type: 'checkbox',
                label: 'Table Footer',
                name: 'footer',
                valueTrue: true,
                valueFalse: false,
                changeProp: 1
              }
            ],

            tableProps
          },

          init() {
            const attrs = this.getAttributes();
            attrs[attrKey] = 1;
            this.setAttributes(attrs);
            // eslint-disable-next-line no-unused-expressions
            classKey && this.addClass(classKey);
            this.listenTo(this, 'change:rows', this.changeDimensions);
            this.listenTo(this, 'change:columns', this.changeDimensions);
            this.listenTo(this, 'change:header', this.changeDimensions);
            this.listenTo(this, 'change:footer', this.changeDimensions);
          },

          changeDimensions() {
            const addRows = this.get('rows');
            const addColumns = this.get('columns');
            const header = this.get('header');
            const footer = this.get('footer');

            const components: comp[] = [];

            if (header) {
              components.push({
                type: 'thead',
                rows: 1,
                columns: addColumns
              });
            }
            components.push({
              type: 'tbody',
              rows: addRows,
              columns: addColumns
            });

            if (footer) {
              components.push({
                type: 'tfoot',
                rows: 1,
                columns: addColumns
              });
            }
            this.components(components);
          }
        },
        {}
      ),

      view: tableView.extend({
        init() {
          this.listenTo(this.model, 'active', this.openModal);
        },

        openModal() {
          const divContainer = document.createElement('div');

          const containerRows = document.createElement('div');
          containerRows.className = 'modal-table-row';
          const labelRows = document.createElement('label');
          labelRows.innerHTML = 'No. of Rows';
          containerRows.appendChild(labelRows);

          const inputRows = document.createElement('input');
          inputRows.setAttribute('type', 'number');
          inputRows.setAttribute('value', '3');

          inputRows.onchange = (ev: Event) => {
            this.setRows = inputRows.value;
          };

          containerRows.appendChild(inputRows);
          divContainer.appendChild(containerRows);

          const containerColumns = document.createElement('div');
          containerColumns.className = 'modal-table-column';
          const labelColumns = document.createElement('label');
          labelColumns.innerHTML = 'No. of Columns';
          containerColumns.appendChild(labelColumns);

          const inputColumns = document.createElement('input');
          inputColumns.setAttribute('type', 'number');
          inputColumns.setAttribute('value', '3');
          inputColumns.onchange = () => {
            this.setColumns = inputColumns.value;
          };

          containerColumns.appendChild(inputColumns);
          divContainer.appendChild(containerColumns);

          const containerBtn = document.createElement('div');
          containerBtn.className = 'modal-create-btn';
          const btn = document.createElement('button');
          btn.setAttribute('type', 'button');
          btn.innerHTML = 'Create Table';
          btn.onclick = () => {
            this.model.set('rows', inputRows.value);
            this.model.set('columns', inputColumns.value);
            modal.close();
          };
          containerBtn.appendChild(btn);
          divContainer.appendChild(containerBtn);

          const style = document.createElement('style');
          style.innerHTML = `
          .gjs-mdl-dialog {
            width: 35%;
          }
          .modal-table-row, .modal-table-column {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;
          }
          .modal-table-row label, .modal-table-column label {
            font-size: 14px;
            flex: 1;
          }
          .modal-table-row input, .modal-table-column input {
            flex: 1;
            height: 35px;
            border-radius: 10px;
            border: 1px solid #f5f5f5;
            padding: 2px 16px;
            color: #333333;
          }
          .modal-table-row input, .modal-table-column input:focus {
            outline: none
          }
          .modal-create-btn {
            text-align: right;
          }
          .modal-create-btn button {
            height: 35px;
            border-radius: 10px;
            border: none;
            cursor: pointer;
            padding: 0 10px;
            color: #333333;
          }
          .modal-create-btn button:focus {
            outline: none
          }
          `;
          divContainer.appendChild(style);

          modal.setTitle('Add a New Table').setContent(divContainer).open();
        }
      })
    });

    // Add blocks
    const bm = this._editor.BlockManager;
    const { tableBlock } = options;
    const style = options.style;
    const type = 'table';
    const content = `<table data-gjs-type="${type}"></table>
      ${style ? `<style>${style}</style>` : ''}`;
    // eslint-disable-next-line no-unused-expressions
    tableBlock &&
      bm.add('table', {
        label: 'Table',
        attributes: { class: 'mdi mdi-table-large ' },
        category: 'Basic',
        activate: 1,
        content,
        tableBlock
      });

    if (!this.newDes) {
      if (
        this.designToUpDate.height !== '' &&
        this.designToUpDate.width !== ''
      ) {
        let device = this._editor.Devices.get('Custom_Device');
        device.attributes.height = this.designToUpDate.height + 'px';
        device.attributes.width = this.designToUpDate.width + 'px';
        this._editor.setDevice('Custom');
        this._editor.setDevice('Custom_Device');
        this._editor.Devices.get('Custom_Device');
        this._editor.Devices.get('Custom_Device');
      } else {
        this.editor.setDevice(this.designToUpDate.shape);
      }
    } else {
      const device2 = this._editor.setDevice('Custom');
    }
  }

  LandingPage = {
    html: this.html,
    css: this.css,
    components: null,
    style: null
  };

  ApplyShipe() {
    let device = this._editor.Devices.get('Custom_Device');
    device.attributes.height = this.Shipe.value.hiegth.toString() + 'px';
    device.attributes.width = this.Shipe.value.whidth.toString() + 'px';
    this._editor.setDevice('Custom');
    this._editor.setDevice('Custom_Device');
    this._editor.Devices.get('Custom_Device');
    this._editor.Devices.get('Custom_Device');
    this.closePupUp();
  }

  private initializeEditor(): any {
    return grapesjs.init({
      blockManager: {},
      allowScripts: 1,
      autorender: false,
      container: '#gjs',
      forceClass: false,
      dragMode: null,
      styleManager: '',
      panels: {},
      selectorManager: '',
      storageManager: {},
      fromElement: false,
      components: this.LandingPage.components || this.LandingPage.html,
      style: this.LandingPage.style || this.LandingPage.css,
      pageManager: {
        pages: [{}]
      },
      deviceManager: {
        devices: [
          {
            name: 'Custom',
            width: '',
            widthMedia: '20000px'
          },
          {
            name: 'Letter',
            width: '900px',
            height: '610px',
            widthMedia: '20000px'
          },
          {
            name: 'Card',
            width: '530px',
            height: '336px',
            widthMedia: '20000px'
          },
          {
            name: 'Badge',
            width: '450px',
            height: '550px',
            widthMedia: '20000px'
          },
          {
            id: 'Custom_Device',
            name: 'Custom_Device',
            width: '100px',
            height: '50px',
            widthMedia: '20000px'
          }
        ]
      },

      plugins: ['gjs-preset-webpage'],
      pluginsOpts: {
        'gjs-preset-webpage': {
          navbarOpts: false,
          countdownOpts: false,
          formsOpts: false,
          blocksBasicOpts: {
            blocks: [
              'image',
              'text',
              'column1',
              'column2',
              'column3',
              'column3-7'
            ],
            flexGrid: false,
            stylePrefix: 'lala-'
          }
        }
      },
      assetManager: { assets: [{}] }
    });
  }

  shapeStyle(event) {
    this._editor.setDevice(event);
    this.Shipe.value.hiegth = '';
    this.Shipe.value.whidth = '';
  }

  RectoVerso(Val) {
    if (Val === 'Recto') {
      this.HTML2 = this._editor.getHtml().replace('\\', '');
      this.CSS2 = '<style>' + this._editor.getCss() + '</style>';
      this.editor.setComponents(this.HTML1);
      this.editor.setStyle(this.CSS1);
    } else {
      this.HTML1 = this._editor.getHtml().replace('\\', '');
      this.CSS1 = '<style>' + this._editor.getCss() + '</style>';
      this.editor.setComponents(this.HTML2);
      this.editor.setStyle(this.CSS2);
    }
  }
}
