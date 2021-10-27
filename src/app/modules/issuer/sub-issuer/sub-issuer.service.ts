import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, delay, shareReplay } from 'rxjs/operators';

import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubIssuerService {
  cache: Observable<any>[] = [];
  allCachedData: any[] = [];
  filteredData: any[] = [];

  constructor() {}

  /**
   * Get sub issuers, we use also this method to call search and filter.
   *
   * @param pageSize - Required page size
   * @param pageIndex - Required page index
   * @param filter - Optional value used in the filter
   * @param search - Optional value used in the search
   * @returns Observable<any>
   */
  GetSubIssuers(
    pageSize: number,
    pageIndex: number = 0,
    filter?: string,
    search?: string
  ): Observable<any> {
    let start = pageSize * pageIndex;
    let end = start + pageSize;
    let returnedData: any;

    this.filteredData = data;

    if (filter) {
      this.filteredData = this.Filter(filter);
    }

    if (search) {
      this.filteredData = this.Search(search);
    }

    let observable$ = of(this.filteredData.slice(start, end)).pipe(
      delay(500),
      shareReplay(1),
      catchError((err) => {
        return EMPTY;
      })
    );

    // First load
    if (this.cache.length === 0) {
      this.cache.push(observable$);
      returnedData = observable$;
    } else {
      if (this.cache.length > pageIndex) {
        // Previous
        returnedData = this.cache[pageIndex];
      } else {
        // Next
        this.cache.push(observable$);
        returnedData = observable$;
      }
    }

    this.allCachedData = this.GetAllCachedData();

    return returnedData;
  }

  /**
   * Search a sub issuer that contains the key search
   *
   * @param search - value used in the search
   * @returns any[]
   */
  Search(search: string): any[] {
    // send this search to backend
    search = search.trim().toLowerCase();
    return this.filteredData.filter(
      (it) =>
        it.firstname.trim().toLowerCase().includes(search) ||
        it.lastname.trim().toLowerCase().includes(search) ||
        it.email.trim().toLowerCase().includes(search) ||
        it.phone.trim().toLowerCase().includes(search) ||
        it.position.trim().toLowerCase().includes(search) ||
        it.id.trim().toLowerCase().includes(search) ||
        it.id.trim().toLowerCase().includes(search)
    );
  }
  /**
   * Filter sub issuers by postion
   *
   * @param filter - value used in the filater
   * @returns any[]
   */
  Filter(filter: string): any[] {
    // send this filter to backend
    if (filter.trim().toLowerCase() !== 'all')
      return this.filteredData.filter(
        (it) => it.position.trim().toLowerCase() === filter.trim().toLowerCase()
      );
    else return this.filteredData;
  }
  /**
   * Get lengnth of filtered data
   *
   * @param filter - value used in the filater
   * @returns void
   */
  GetAllItemsLength() {
    return this.filteredData.length;
  }
  /**
   * Get all cached items
   *
   * @returns any[]
   */
  GetAllCachedData(): any[] {
    forkJoin(this.cache).subscribe((res) => {
      this.allCachedData = [].concat.apply([], res);
    });
    return this.allCachedData;
  }
}

const data = [
  {
    id: 'Sub-123-Iss1',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hamid1997@gmail.com',
    birthday: '23/11/1997',
    phone: '+212-646251144',
    position: 'position2',
    permissions: ['read'],
    subIssuerPic: 'https://picsum.photos/400'
  },
  {
    id: 'Sub-456-Iss2',
    firstname: 'Zahra',
    lastname: 'ELKHADIR',
    email: 'zahra.elkhadir1975@gmail.com',
    birthday: '20/1/1975',
    phone: '+212-646250909',
    position: 'position1',
    permissions: ['read', 'writeread']
  },
  {
    id: 'Sub-789-Iss3',
    firstname: 'Abdelouahid',
    lastname: 'AYT BABA',
    email: 'Abdelouahid.aytbaba1965@gmail.com',
    birthday: '18/3/1965',
    phone: '+1-646257940',
    position: 'position1',
    permissions: ['read', 'writeread'],
    subIssuerPic: 'https://picsum.photos/200'
  },
  {
    id: 'Sub-098-Iss4',
    firstname: 'Nezha position1',
    lastname: 'AFIFI',
    email: 'nezha.afifi1993@gmail.com',
    birthday: '20/10/1993',
    phone: '+212-646290984',
    position: 'position2',
    permissions: ['approver']
  },
  {
    id: 'Sub-123-Iss5',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hamid1997@gmail.com',
    birthday: '23/11/1997',
    phone: '+212-646251144',
    position: 'position2',
    permissions: ['read'],
    subIssuerPic: 'https://picsum.photos/400'
  },
  {
    id: 'Sub-456-Iss6',
    firstname: 'Zahra',
    lastname: 'ELKHADIR',
    email: 'zahra.elkhadir1975@gmail.com',
    birthday: '20/1/1975',
    phone: '+212-646250909',
    position: 'position1',
    permissions: ['read', 'writeread']
  },
  {
    id: 'Sub-789-Iss7',
    firstname: 'Abdelouahid',
    lastname: 'AYT BABA',
    email: 'Abdelouahid.aytbaba1965@gmail.com',
    birthday: '18/3/1965',
    phone: '+1-646257940',
    position: 'position1',
    permissions: ['read', 'writeread'],
    subIssuerPic: 'https://picsum.photos/200'
  },
  {
    id: 'Sub-098-Iss8',
    firstname: 'Nezha position1',
    lastname: 'AFIFI',
    email: 'nezha.afifi1993@gmail.com',
    birthday: '20/10/1993',
    phone: '+212-646290984',
    position: 'position3',
    permissions: ['approver']
  },
  {
    id: 'Sub-123-Iss9',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hamid1997@gmail.com',
    birthday: '23/11/1997',
    phone: '+212-646251144',
    position: 'position2',
    permissions: ['read'],
    subIssuerPic: 'https://picsum.photos/400'
  },
  {
    id: 'Sub-456-Iss10',
    firstname: 'Zahra',
    lastname: 'ELKHADIR',
    email: 'zahra.elkhadir1975@gmail.com',
    birthday: '20/1/1975',
    phone: '+212-646250909',
    position: 'position1',
    permissions: ['read', 'writeread']
  },
  {
    id: 'Sub-789-Iss11',
    firstname: 'Abdelouahid',
    lastname: 'AYT BABA',
    email: 'Abdelouahid.aytbaba1965@gmail.com',
    birthday: '18/3/1965',
    phone: '+1-646257940',
    position: 'position1',
    permissions: ['read', 'writeread'],
    subIssuerPic: 'https://picsum.photos/200'
  },
  {
    id: 'Sub-098-Iss12',
    firstname: 'Nezha position1',
    lastname: 'AFIFI',
    email: 'nezha.afifi1993@gmail.com',
    birthday: '20/10/1993',
    phone: '+212-646290984',
    position: 'position3',
    permissions: ['approver']
  },
  {
    id: 'Sub-123-Iss13',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hamid1997@gmail.com',
    birthday: '23/11/1997',
    phone: '+212-646251144',
    position: 'position2',
    permissions: ['read'],
    subIssuerPic: 'https://picsum.photos/400'
  },
  {
    id: 'Sub-456-Iss14',
    firstname: 'Zahra',
    lastname: 'ELKHADIR',
    email: 'zahra.elkhadir1975@gmail.com',
    birthday: '20/1/1975',
    phone: '+212-646250909',
    position: 'position1',
    permissions: ['read', 'writeread']
  },
  {
    id: 'Sub-789-Iss15',
    firstname: 'Abdelouahid',
    lastname: 'AYT BABA',
    email: 'Abdelouahid.aytbaba1965@gmail.com',
    birthday: '18/3/1965',
    phone: '+1-646257940',
    position: 'position1',
    permissions: ['read', 'writeread'],
    subIssuerPic: 'https://picsum.photos/200'
  },
  {
    id: 'Sub-098-Iss16',
    firstname: 'Nezha position1',
    lastname: 'AFIFI',
    email: 'nezha.afifi1993@gmail.com',
    birthday: '20/10/1993',
    phone: '+212-646290984',
    position: 'position3',
    permissions: ['approver']
  },
  {
    id: 'Sub-123-Iss17',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hamid1997@gmail.com',
    birthday: '23/11/1997',
    phone: '+212-646251144',
    position: 'position2',
    permissions: ['read'],
    subIssuerPic: 'https://picsum.photos/400'
  },
  {
    id: 'Sub-456-Iss18',
    firstname: 'Zahra',
    lastname: 'ELKHADIR',
    email: 'zahra.elkhadir1975@gmail.com',
    birthday: '20/1/1975',
    phone: '+212-646250909',
    position: 'position1',
    permissions: ['read', 'writeread']
  },
  {
    id: 'Sub-789-Iss19',
    firstname: 'Abdelouahid',
    lastname: 'AYT BABA',
    email: 'Abdelouahid.aytbaba1965@gmail.com',
    birthday: '18/3/1965',
    phone: '+1-646257940',
    position: 'position1',
    permissions: ['read', 'writeread'],
    subIssuerPic: 'https://picsum.photos/200'
  },
  {
    id: 'Sub-098-Iss20',
    firstname: 'Nezha position1',
    lastname: 'AFIFI',
    email: 'nezha.afifi1993@gmail.com',
    birthday: '20/10/1993',
    phone: '+212-646290984',
    position: 'position3',
    permissions: ['approver']
  },
  {
    id: 'Sub-123-Iss21',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hamid1997@gmail.com',
    birthday: '23/11/1997',
    phone: '+212-646251144',
    position: 'position2',
    permissions: ['read'],
    subIssuerPic: 'https://picsum.photos/400'
  },
  {
    id: 'Sub-456-Iss22',
    firstname: 'Zahra',
    lastname: 'ELKHADIR',
    email: 'zahra.elkhadir1975@gmail.com',
    birthday: '20/1/1975',
    phone: '+212-646250909',
    position: 'position1',
    permissions: ['read', 'writeread']
  },
  {
    id: 'Sub-789-Iss23',
    firstname: 'Abdelouahid',
    lastname: 'AYT BABA',
    email: 'Abdelouahid.aytbaba1965@gmail.com',
    birthday: '18/3/1965',
    phone: '+1-646257940',
    position: 'position1',
    permissions: ['read', 'writeread'],
    subIssuerPic: 'https://picsum.photos/200'
  },
  {
    id: 'Sub-098-Iss24',
    firstname: 'Nezha position1',
    lastname: 'AFIFI',
    email: 'nezha.afifi1993@gmail.com',
    birthday: '20/10/1993',
    phone: '+212-646290984',
    position: 'position3',
    permissions: ['approver']
  },
  {
    id: 'Sub-123-Iss25',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hamid1997@gmail.com',
    birthday: '23/11/1997',
    phone: '+212-646251144',
    position: 'position2',
    permissions: ['read'],
    subIssuerPic: 'https://picsum.photos/400'
  },
  {
    id: 'Sub-456-Iss26',
    firstname: 'Zahra',
    lastname: 'ELKHADIR',
    email: 'zahra.elkhadir1975@gmail.com',
    birthday: '20/1/1975',
    phone: '+212-646250909',
    position: 'position1',
    permissions: ['read', 'writeread']
  },
  {
    id: 'Sub-789-Iss27',
    firstname: 'Abdelouahid',
    lastname: 'AYT BABA',
    email: 'Abdelouahid.aytbaba1965@gmail.com',
    birthday: '18/3/1965',
    phone: '+1-646257940',
    position: 'position1',
    permissions: ['read', 'writeread'],
    subIssuerPic: 'https://picsum.photos/200'
  },
  {
    id: 'Sub-098-Iss28',
    firstname: 'Nezha position1',
    lastname: 'AFIFI',
    email: 'nezha.afifi1993@gmail.com',
    birthday: '20/10/1993',
    phone: '+212-646290984',
    position: 'position3',
    permissions: ['approver']
  },
  {
    id: 'Sub-123-Iss29',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hamid1997@gmail.com',
    birthday: '23/11/1997',
    phone: '+212-646251144',
    position: 'position2',
    permissions: ['read'],
    subIssuerPic: 'https://picsum.photos/400'
  },
  {
    id: 'Sub-456-Iss30',
    firstname: 'Zahra',
    lastname: 'ELKHADIR',
    email: 'zahra.elkhadir1975@gmail.com',
    birthday: '20/1/1975',
    phone: '+212-646250909',
    position: 'position1',
    permissions: ['read', 'writeread']
  },
  {
    id: 'Sub-789-Iss31',
    firstname: 'Abdelouahid',
    lastname: 'AYT BABA',
    email: 'Abdelouahid.aytbaba1965@gmail.com',
    birthday: '18/3/1965',
    phone: '+1-646257940',
    position: 'position1',
    permissions: ['read', 'writeread'],
    subIssuerPic: 'https://picsum.photos/200'
  },
  {
    id: 'Sub-098-Iss32',
    firstname: 'Nezha position1',
    lastname: 'AFIFI',
    email: 'nezha.afifi1993@gmail.com',
    birthday: '20/10/1993',
    phone: '+212-646290984',
    position: 'position3',
    permissions: ['approver']
  },
  {
    id: 'Sub-123-Iss33',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hamid1997@gmail.com',
    birthday: '23/11/1997',
    phone: '+212-646251144',
    position: 'position2',
    permissions: ['read'],
    subIssuerPic: 'https://picsum.photos/400'
  },
  {
    id: 'Sub-456-Iss34',
    firstname: 'Zahra',
    lastname: 'ELKHADIR',
    email: 'zahra.elkhadir1975@gmail.com',
    birthday: '20/1/1975',
    phone: '+212-646250909',
    position: 'position1',
    permissions: ['read', 'writeread']
  },
  {
    id: 'Sub-789-Iss35',
    firstname: 'Abdelouahid',
    lastname: 'AYT BABA',
    email: 'Abdelouahid.aytbaba1965@gmail.com',
    birthday: '18/3/1965',
    phone: '+1-646257940',
    position: 'position1',
    permissions: ['read', 'writeread'],
    subIssuerPic: 'https://picsum.photos/200'
  },
  {
    id: 'Sub-098-Iss36',
    firstname: 'Nezha position1',
    lastname: 'AFIFI',
    email: 'nezha.afifi1993@gmail.com',
    birthday: '20/10/1993',
    phone: '+212-646290984',
    position: 'position3',
    permissions: ['approver']
  },
  {
    id: 'Sub-123-Iss37',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hamid1997@gmail.com',
    birthday: '23/11/1997',
    phone: '+212-646251144',
    position: 'position2',
    permissions: ['read'],
    subIssuerPic: 'https://picsum.photos/400'
  },
  {
    id: 'Sub-456-Iss38',
    firstname: 'Zahra',
    lastname: 'ELKHADIR',
    email: 'zahra.elkhadir1975@gmail.com',
    birthday: '20/1/1975',
    phone: '+212-646250909',
    position: 'position1',
    permissions: ['read', 'writeread']
  },
  {
    id: 'Sub-789-Iss39',
    firstname: 'Abdelouahid',
    lastname: 'AYT BABA',
    email: 'Abdelouahid.aytbaba1965@gmail.com',
    birthday: '18/3/1965',
    phone: '+1-646257940',
    position: 'position1',
    permissions: ['read', 'writeread'],
    subIssuerPic: 'https://picsum.photos/200'
  },
  {
    id: 'Sub-098-Iss40',
    firstname: 'Nezha position1',
    lastname: 'AFIFI',
    email: 'nezha.afifi1993@gmail.com',
    birthday: '20/10/1993',
    phone: '+212-646290984',
    position: 'position3',
    permissions: ['approver']
  }
];
