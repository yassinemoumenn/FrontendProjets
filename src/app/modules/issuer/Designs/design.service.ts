import { CategoryModel } from 'src/app/modules/issuer/category/Category.model';
import { SignerModel } from './../../signer/Signer.model';
import { DesignModel, IDesignpage } from './Design.model';
import { ResponseObject } from './../../../models/helpers/ResponseObject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../../src/environments/environment';
import { Organization } from 'src/app/models/Organization';

const API_DESIGN_URL = `${environment.apiUrl}/design`;

const API_ISSUER_URL = `${environment.apiUrl}/issuer`;
@Injectable({
  providedIn: 'root'
})
export class DesignService {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router
  ) {}

  public Html1;
  public CSS1;
  public Html2;
  public CSS2;
  public static newDes: boolean = true;

  ID: number = 0;
  designToUpDate: any;
  pageIndex!: number;
  pageSize!: number;
  listDesigns: DesignModel[] = [];
  listLength = this.listDesigns.length;

  getCurrentOrganization(id): Observable<ResponseObject<Organization>> {
    return this.http.get<ResponseObject<Organization>>(
      `${API_ISSUER_URL}/organizations/${id}`
    );
  }

  /**
   * Create new designs
   *
   * @param designs - an array of designs
   * @returns Observable<ResponseObject<DesignModel[]>>
   */
  createDesign(
    designs: DesignModel[]
  ): Observable<ResponseObject<DesignModel[]>> {
    return this.http.post<ResponseObject<DesignModel[]>>(
      `${API_DESIGN_URL}/`,
      designs
    );
  }

  /**
   * Update Design By idDesign
   *
   * @param designID - Id of the design
   * @param design - the new design
   * @returns Observable<ResponseObject<DesignModel[]>>
   */
  updateDesign(
    designID: string,
    design: DesignModel
  ): Observable<ResponseObject<DesignModel>> {
    return this.http.put<ResponseObject<DesignModel>>(
      `${API_DESIGN_URL}/${designID}`,
      design
    );
  }
  /**
   * Update Multiple Designs
   *
   * @param designs - array of the new designs
   * @returns Observable<ResponseObject<DesignModel[]>>
   */
  updateDesigns(
    designs: DesignModel[]
  ): Observable<ResponseObject<DesignModel[]>> {
    return this.http.put<ResponseObject<DesignModel[]>>(
      `${API_DESIGN_URL}/`,
      designs
    );
  }

  /**
   * Delete multiple Designs By IDs
   *
   * @param designIds - array that contains designs Ids
   * @returns Observable<ResponseObject<number>>
   */
  deleteDesigns(designID: string[]): Observable<ResponseObject<number>> {
    return this.http.request<ResponseObject<number>>(
      'delete',
      `${API_DESIGN_URL}/`,
      {
        body: designID
      }
    );
  }
  /**
   * Get All design
   *
   * @param designID - Id of the design
   * @returns Observable<ResponseObject<number>>
   */
  getDesigns(): Observable<ResponseObject<DesignModel[]>> {
    return this.http.get<ResponseObject<DesignModel[]>>(`${API_DESIGN_URL}/`);
  }

  /**
   * Get design By ID
   *
   * @param designID - Id of the design
   * @returns Observable<ResponseObject<number>>
   */
  getDesign(designID: string): Observable<ResponseObject<DesignModel>> {
    return this.http.get<ResponseObject<DesignModel>>(
      `${API_DESIGN_URL}/${designID}`
    );
  }

  /**
   * Get designs By categoryID
   *
   * @param categoryID - Id of the category
   * @returns Observable<ResponseObject<DesignModel[]>>
   */
  getDesignByCategoryID(
    categoryID: string
  ): Observable<ResponseObject<DesignModel[]>> {
    return this.http.get<ResponseObject<DesignModel[]>>(
      `${API_DESIGN_URL}/findbycategory/${categoryID}`
    );
  }

  /**
   * Get designs
   *
   * @param listDesigns - Array of all designs
   * @param pageIndex - index of the page
   * @param pageSize - Size of the page
   * @returns Observable<DesignModel[]>
   */
  getDesignsPage(listDesigns: DesignModel[], pageIndex, pageSize) {
    let ListE: any = [];
    for (
      let index = pageIndex * pageSize;
      index < pageIndex * pageSize + pageSize;
      index++
    ) {
      let cc = listDesigns[index];
      if (cc !== undefined) {
        ListE.push(cc);
      }
    }
    return of(ListE);
  }

  /**
   * Redirect To Update Page
   *
   * @param design - the new design
   * @param pageIndex - index of the page
   * @param pageSize - Size of the page
   * @returns Void
   */
  RedirectToUpdate(design: DesignModel, pageIndex, pageSize) {
    DesignService.newDes = false;
    this.designToUpDate = design;

    this.Html1 = design.recto.html;
    this.CSS1 = design.recto.css;
    this.Html2 = design.verso.html;
    this.CSS2 = design.verso.css;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.router.navigateByUrl('/issuer/designs/add-design');
  }
  EmptyListClickEvent() {
    this.router.navigateByUrl('/issuer/designs/add-design');
  }

  /**
   * pagination
   *
   * @param listDesigns - Array of all designs
   * @param paginator - an object contains pageIndex and pageSize
   * @returns observable<DesignModel[]>
   */
  pagination(listDesigns: DesignModel[], paginator) {
    let ListE: any = [];
    for (
      let index = paginator.pageIndex * paginator.pageSize;
      index < paginator.pageIndex * paginator.pageSize + paginator.pageSize;
      index++
    ) {
      let cc = listDesigns[index];

      if (cc !== undefined) {
        ListE.push(cc);
      }
    }
    return of(ListE);
  }

  /**
   * Filter sub issuers by postion
   *
   * @param filter - value used in the filater
   * @returns any[]
   */
  Filter(listDesigns: DesignModel[], filter) {
    return listDesigns
      .filter((it) => it.category === filter)
      .concat(listDesigns.filter((it) => it.category !== filter));
  }

  /**
   * Search a sub issuer that contains the key search
   *
   * @param search - value used in the search
   * @returns any[]
   */
  Search(listDesigns: DesignModel[], search, pageIndex, pageSize) {
    if (search !== undefined) {
      let list: any = [{}];
      list = listDesigns.filter(
        (it) =>
          it.name.toLowerCase().includes(search.toLowerCase()) ||
          it.category.toLowerCase().includes(search.toLowerCase())
      );
      this.listLength = list.length;
      return list;
    } else {
      return this.getDesignsPage(listDesigns, pageIndex, pageSize);
    }
  }

  getSigner(signerID: string): Observable<ResponseObject<SignerModel>> {
    return this.http.get<ResponseObject<SignerModel>>(
      `${API_ISSUER_URL}/signer/${signerID}`
    );
  }

  getCategoryById(
    categoryID: string
  ): Observable<ResponseObject<CategoryModel>> {
    return this.http.get<ResponseObject<CategoryModel>>(
      `${API_ISSUER_URL}/categories/${categoryID}`
    );
  }
}
