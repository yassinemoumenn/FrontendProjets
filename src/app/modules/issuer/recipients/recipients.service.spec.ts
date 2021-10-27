import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { RecipientsService } from './recipients.service';
import { environment } from '../../../../environments/environment';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

describe('RecipientsService', () => {
  let injector: TestBed;
  let service: RecipientsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecipientsService]
    });

    injector = getTestBed();
    service = injector.get(RecipientsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getRecipient', () => {
    it('should return an Observable<Recipient[]>', () => {
      service.GetRecipients(10, 0).subscribe((data) => {
        expect(data.data.content.length).toBe(10);
        expect(data.data.content).toEqual(getRecipients.data.content);
      });

      const req = httpMock.expectOne(
        `${environment.apiUrl}/issuer/recipients?page=1&size=10`
      );
      expect(req.request.method).toBe('GET');
      req.flush(getRecipients.data.content);
    });

    it('Get all requests recipients using default pageIndex', () => {
      service.GetRecipients(10).subscribe((data) => {
        expect(data.data.content.length).toBe(10);
        expect(data.data.content).toEqual(getRecipients.data.content);
      });

      const req = httpMock.expectOne(
        `${environment.apiUrl}/issuer/recipients?page=1&size=10`
      );
      expect(req.request.method).toBe('GET');
      req.flush(getRecipients.data.content);
    });

    it('should return an Observable<Recipient>', () => {
      service.GetRecipientByID('60e6dd5ae3e6391802c72136').subscribe((data) => {
        expect(data).toEqual(getRecipientByID);
      });

      const req = httpMock.expectOne(
        `${environment.apiUrl}/issuer/recipients/60e6dd5ae3e6391802c72136`
      );
      expect(req.request.method).toBe('GET');
      req.flush(getRecipientByID);
    });

    it("should return null if recipient doesn't exists", () => {
      service.GetRecipientByID('1').subscribe((data) => {
        expect(data).toEqual(null);
      });
      const req = httpMock.expectOne(
        `${environment.apiUrl}/issuer/recipients/1`
      );
      req.flush(getRecipientByID);
    });
  });

  describe('#saveRecipient', () => {
    it('Create new recipient', () => {
      let newRecipent = {
        firstname: 'Hishame',
        lastname: 'AFIFI',
        username: 'Hishame AFIFI',
        password: '1234',
        email: 'hishame@gmail.com',
        phone: '06484784748',
        categories: ['Cat 1', 'Cat 2']
      };
      service.CreateRecipient(newRecipent).subscribe(
        (data) => expect(data.data).toEqual(createRecipient.data),
        (err) => expect(err.message).toEqual('Internal server error')
      );

      const req = httpMock.expectOne(`${environment.apiUrl}/issuer/recipients`);
      expect(req.request.method).toBe('POST');
      req.flush(createRecipient);
    });

    it('update recipient', () => {
      let recipientID = '60ec1c7e24884f7250d877c2';
      let recipient = {
        firstname: 'Hishame',
        lastname: 'AFIFI',
        username: 'Hishame AFIFI',
        password: '1234',
        email: 'hishame@gmail.com',
        phone: '06484784748',
        categories: ['Cat 1', 'Cat 2']
      };
      service
        .UpdateRecipient(recipientID, recipient)
        .subscribe((data) => expect(data.data).toEqual(updateRecipient.data));

      const req = httpMock.expectOne(
        `${environment.apiUrl}/issuer/recipients/${recipientID}`
      );
      expect(req.request.method).toBe('PUT');
      req.flush(updateRecipient);
    });
  });

  describe('#deleteRecipient', () => {
    it('delete recipient', () => {
      let recipientID = '60ec1c7e24884f7250d877c2';
      service
        .DeleteRecipient(recipientID)
        .subscribe((data) => expect(data).toEqual(deleteRecipient));

      const req = httpMock.expectOne(
        `${environment.apiUrl}/issuer/recipients/${recipientID}`
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(deleteRecipient);
    });
  });

  describe('#getCategories', () => {
    it('should return an Observable<Category[]>', () => {
      service.GetCategories().subscribe((data) => {
        expect(data.data.content).toEqual(getCategories.data.content);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/issuer/categories`);
      expect(req.request.method).toBe('GET');
      req.flush(getCategories.data.content);
    });
  });

  describe('#getRecipientsRequests', () => {
    it('should return an Observable<Recipient[]>', () => {
      service.GetRequestsRecipient(10, 0).subscribe((data) => {
        expect(data).toEqual(getRecipientsRequests);
      });
    });

    it('Get all requests recipients length', () => {});

    it('Get all requests recipients using default pageIndex', () => {
      service.GetRequestsRecipient(10).subscribe((data) => {
        expect(data).toEqual(getRecipientsRequests);
      });
    });
  });
});
const getRecipientsRequests = [
  {
    id: 'rec-1-2021',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hishame1997@gmail.com',
    phone: '+212638371144'
  },
  {
    id: 'rec-2-2021',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hishame1997@gmail.com',
    phone: '+212638371144'
  },
  {
    id: 'rec-3-2021',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hishame1997@gmail.com',
    phone: '+212638371144'
  },
  {
    id: 'rec-4-2021',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hishame1997@gmail.com',
    phone: '+212638371144'
  },
  {
    id: 'rec-5-2021',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hishame1997@gmail.com',
    phone: '+212638371144'
  },
  {
    id: 'rec-6-2021',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hishame1997@gmail.com',
    phone: '+212638371144'
  },
  {
    id: 'rec-7-2021',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hishame1997@gmail.com',
    phone: '+212638371144'
  },
  {
    id: 'rec-8-2021',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hishame1997@gmail.com',
    phone: '+212638371144'
  },
  {
    id: 'rec-9-2021',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hishame1997@gmail.com',
    phone: '+212638371144'
  },
  {
    id: 'rec-10-2021',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    email: 'hishame1997@gmail.com',
    phone: '+212638371144'
  }
];
const getCategories = {
  data: {
    content: [
      {
        id: 'CAT-882059876',
        name: 'Cat 1',
        issuer: '60e6c6a1776c6d055828b099',
        idGenerationType: 'CUSTOM',
        blockchainFields: null,
        fields: {
          recipient: [
            {
              name: 'F1',
              type: null,
              value: 'val1',
              new: false
            }
          ],
          certificate: [
            {
              name: 'F1',
              type: null,
              value: 'val1',
              new: false
            }
          ]
        },
        signers: null
      },
      {
        id: 'CAT-143037232',
        name: 'Cat 2',
        issuer: '60e6c6a1776c6d055828b099',
        idGenerationType: 'CUSTOM',
        blockchainFields: null,
        fields: {
          recipient: [
            {
              name: 'F1',
              type: null,
              value: 'val1',
              new: false
            }
          ],
          certificate: [
            {
              name: 'F1',
              type: null,
              value: 'val1',
              new: false
            }
          ]
        },
        signers: null
      },
      {
        id: 'CAT-154260883',
        name: 'Cat 3',
        issuer: '60e6c6a1776c6d055828b099',
        idGenerationType: 'CUSTOM',
        blockchainFields: null,
        fields: {
          recipient: [
            {
              name: 'F1',
              type: null,
              value: 'val1',
              new: false
            }
          ],
          certificate: [
            {
              name: 'F1',
              type: null,
              value: 'val1',
              new: false
            }
          ]
        },
        signers: null
      },
      {
        id: 'CAT-199220418',
        name: 'Cat 4',
        issuer: '60e6c6a1776c6d055828b099',
        idGenerationType: 'CUSTOM',
        blockchainFields: null,
        fields: {
          recipient: [
            {
              name: 'F1',
              type: null,
              value: 'val1',
              new: false
            }
          ],
          certificate: [
            {
              name: 'F1',
              type: null,
              value: 'val1',
              new: false
            }
          ]
        },
        signers: null
      }
    ],
    pageable: {
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 10,
      paged: true,
      unpaged: false
    },
    totalPages: 1,
    totalElements: 4,
    last: true,
    number: 0,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true
    },
    size: 10,
    numberOfElements: 4,
    first: true,
    empty: false
  }
};
const deleteRecipient = {
  success: true,
  message: 'Recipient deleted successfully',
  data: 1
};
const updateRecipient = {
  success: true,
  message: 'Recipient updated successfully',
  data: {
    createdAt: '2021-07-12T10:42:06.927+00:00',
    updatedAt: '2021-07-12T07:47:40.639+00:00',
    id: '60ec1c7e24884f7250d877c2',
    userId: 'REC-337805055',
    firstname: 'Hishame30',
    lastname: 'Hishame30',
    username: 'Hishame30 AFIFI',
    birthday: null,
    email: 'Hishame30@gmail.com',
    phone: '06484054748',
    address: null,
    gender: null,
    picture: null,
    role: 'RECIPIENT',
    countryCode: null,
    statistics: [
      {
        title: 'Recipients',
        icon: './assets/media/svg/icons/General/User.svg',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        title: 'Signers',
        icon: './assets/media/svg/icons/Communication/Group.svg',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        title: 'Categories',
        icon: './assets/media/svg/icons/Layout/Layout-4-blocks.svg',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        title: 'Certificates',
        icon: './assets/media/svg/icons/Design/Layers.svg',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ],
    accountSettings: null,
    permissions: null,
    authorities: null,
    categories: ['Cat 1', 'Cat 2'],
    affiliations: [
      {
        organization: '60e6c6a2776c6d055828b0a3',
        group: '60e6c6a2776c6d055828b0a4',
        joinDate: '2021-07-12T10:42:06.798+00:00'
      }
    ],
    enabled: true
  }
};
const createRecipient = {
  success: true,
  message: 'Recipient Registration Successfull',
  data: {
    createdAt: '2021-07-12T10:38:00.038+00:00',
    updatedAt: '2021-07-12T10:38:00.038+00:00',
    id: '60ec1b8824884f7250d877c0',
    userId: 'REC-104952169',
    firstname: 'Hishame',
    lastname: 'AFIFI',
    username: 'Hishame AFIFI',
    birthday: null,
    email: 'hishame@gmail.com',
    phone: '06484784748',
    address: null,
    gender: null,
    picture: null,
    role: 'RECIPIENT',
    countryCode: null,
    statistics: [
      {
        title: 'Recipients',
        icon: './assets/media/svg/icons/General/User.svg',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        title: 'Signers',
        icon: './assets/media/svg/icons/Communication/Group.svg',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        title: 'Categories',
        icon: './assets/media/svg/icons/Layout/Layout-4-blocks.svg',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        title: 'Certificates',
        icon: './assets/media/svg/icons/Design/Layers.svg',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ],
    accountSettings: null,
    permissions: null,
    authorities: null,
    categories: ['Cat 1', 'Cat 2'],
    affiliations: [
      {
        organization: '60e6c6a2776c6d055828b0a3',
        group: '60e6c6a2776c6d055828b0a4',
        joinDate: '2021-07-12T10:37:59.885+00:00'
      }
    ],
    enabled: true
  }
};
const getRecipientByID = {
  createdAt: '2021-07-08T11:11:22.264+00:00',
  updatedAt: '2021-07-12T07:47:40.639+00:00',
  id: '60e6dd5ae3e6391802c72136',
  userId: 'REC-464685636',
  firstname: 'hishame100',
  lastname: 'hishame100',
  username: 'hishame100 hishame100',
  birthday: '1970-01-01T00:11:47.645+00:00',
  email: 'hishame100@doccerts.com',
  phone: '+212635309087',
  address: null,
  gender: null,
  picture: null,
  role: 'RECIPIENT',
  countryCode: null,
  statistics: [
    {
      title: 'Recipients',
      icon: './assets/media/svg/icons/General/User.svg',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      title: 'Signers',
      icon: './assets/media/svg/icons/Communication/Group.svg',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      title: 'Categories',
      icon: './assets/media/svg/icons/Layout/Layout-4-blocks.svg',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      title: 'Certificates',
      icon: './assets/media/svg/icons/Design/Layers.svg',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ],
  accountSettings: null,
  permissions: null,
  authorities: null,
  categories: ['Cat 2', 'Cat 3', 'Cat 4'],
  affiliations: [
    {
      organization: '60e6c6a2776c6d055828b0a3',
      group: '60e6c6a2776c6d055828b0a4',
      joinDate: '2021-07-08T11:11:22.103+00:00'
    }
  ],
  enabled: true
};
const getRecipients: any = {
  data: {
    content: [
      {
        createdAt: '2021-07-08T11:11:22.264+00:00',
        updatedAt: '2021-07-12T07:47:40.639+00:00',
        id: '60e6dd5ae3e6391802c72136',
        userId: 'REC-464685636',
        firstname: 'hishame100',
        lastname: 'hishame100',
        username: 'hishame100 hishame100',
        birthday: '1970-01-01T00:11:47.645+00:00',
        email: 'hishame100@doccerts.com',
        phone: '+212635309087',
        address: null,
        gender: null,
        picture: null,
        role: 'RECIPIENT',
        countryCode: null,
        statistics: [
          {
            title: 'Recipients',
            icon: './assets/media/svg/icons/General/User.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Signers',
            icon: './assets/media/svg/icons/Communication/Group.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Categories',
            icon: './assets/media/svg/icons/Layout/Layout-4-blocks.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Certificates',
            icon: './assets/media/svg/icons/Design/Layers.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        accountSettings: null,
        permissions: null,
        authorities: null,
        categories: ['Cat 2', 'Cat 3', 'Cat 4'],
        affiliations: [
          {
            organization: '60e6c6a2776c6d055828b0a3',
            group: '60e6c6a2776c6d055828b0a4',
            joinDate: '2021-07-08T11:11:22.103+00:00'
          }
        ],
        enabled: true
      },
      {
        createdAt: '2021-07-08T12:19:49.599+00:00',
        updatedAt: '2021-07-12T07:47:40.639+00:00',
        id: '60e6ed65e3e6391802c7214c',
        userId: 'REC-890971281',
        firstname: 'hishame2',
        lastname: 'hishame2',
        username: 'hishame2 hishame2',
        birthday: '1970-01-01T00:01:10.560+00:00',
        email: 'hishame2@doccerts.com',
        phone: '+212625357087',
        address: null,
        gender: null,
        picture: null,
        role: 'RECIPIENT',
        countryCode: null,
        statistics: [
          {
            title: 'Recipients',
            icon: './assets/media/svg/icons/General/User.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Signers',
            icon: './assets/media/svg/icons/Communication/Group.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Categories',
            icon: './assets/media/svg/icons/Layout/Layout-4-blocks.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Certificates',
            icon: './assets/media/svg/icons/Design/Layers.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        accountSettings: null,
        permissions: null,
        authorities: null,
        categories: ['Cat 1', 'Cat 3'],
        affiliations: [
          {
            organization: '60e6c6a2776c6d055828b0a3',
            group: '60e6c6a2776c6d055828b0a4',
            joinDate: '2021-07-08T12:19:49.448+00:00'
          }
        ],
        enabled: true
      },
      {
        createdAt: '2021-07-08T12:24:19.769+00:00',
        updatedAt: '2021-07-12T07:47:40.639+00:00',
        id: '60e6ee73e3e6391802c72152',
        userId: 'REC-624514465',
        firstname: 'hishame3',
        lastname: 'hishame3',
        username: 'hishame3',
        birthday: '1970-01-01T00:01:10.761+00:00',
        email: 'hishame3@doccerts.com',
        phone: '0625307387',
        address: null,
        gender: null,
        picture: null,
        role: 'RECIPIENT',
        countryCode: null,
        statistics: [
          {
            title: 'Recipients',
            icon: './assets/media/svg/icons/General/User.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Signers',
            icon: './assets/media/svg/icons/Communication/Group.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Categories',
            icon: './assets/media/svg/icons/Layout/Layout-4-blocks.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Certificates',
            icon: './assets/media/svg/icons/Design/Layers.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        accountSettings: null,
        permissions: null,
        authorities: null,
        categories: ['Cat 2', 'Cat 3', 'Cat 1'],
        affiliations: [
          {
            organization: '60e6c6a2776c6d055828b0a3',
            group: '60e6c6a2776c6d055828b0a4',
            joinDate: '2021-07-08T12:24:19.616+00:00'
          }
        ],
        enabled: true
      },
      {
        createdAt: '2021-07-08T12:24:41.527+00:00',
        updatedAt: '2021-07-12T07:47:40.639+00:00',
        id: '60e6ee89e3e6391802c72155',
        userId: 'REC-166547712',
        firstname: 'hishame4',
        lastname: 'hishame4',
        username: 'hishame4 hishame4',
        birthday: '1970-01-01T00:01:10.761+00:00',
        email: 'hishame4@doccerts.com',
        phone: '+212625307087',
        address: null,
        gender: null,
        picture: null,
        role: 'RECIPIENT',
        countryCode: null,
        statistics: [
          {
            title: 'Recipients',
            icon: './assets/media/svg/icons/General/User.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Signers',
            icon: './assets/media/svg/icons/Communication/Group.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Categories',
            icon: './assets/media/svg/icons/Layout/Layout-4-blocks.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Certificates',
            icon: './assets/media/svg/icons/Design/Layers.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        accountSettings: null,
        permissions: null,
        authorities: null,
        categories: ['Cat 1', 'Cat 3'],
        affiliations: [
          {
            organization: '60e6c6a2776c6d055828b0a3',
            group: '60e6c6a2776c6d055828b0a4',
            joinDate: '2021-07-08T12:24:41.371+00:00'
          }
        ],
        enabled: true
      },
      {
        createdAt: '2021-07-08T12:24:57.258+00:00',
        updatedAt: '2021-07-12T07:47:40.639+00:00',
        id: '60e6ee99e3e6391802c72157',
        userId: 'REC-388168299',
        firstname: 'hishame5',
        lastname: 'hishame5',
        username: 'hishame5',
        birthday: '1970-01-01T00:01:10.761+00:00',
        email: 'hishame5@doccerts.com',
        phone: '0635307087',
        address: null,
        gender: null,
        picture: null,
        role: 'RECIPIENT',
        countryCode: null,
        statistics: [
          {
            title: 'Recipients',
            icon: './assets/media/svg/icons/General/User.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Signers',
            icon: './assets/media/svg/icons/Communication/Group.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Categories',
            icon: './assets/media/svg/icons/Layout/Layout-4-blocks.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Certificates',
            icon: './assets/media/svg/icons/Design/Layers.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        accountSettings: null,
        permissions: null,
        authorities: null,
        categories: ['Cat 2', 'Cat 3', 'Cat 1'],
        affiliations: [
          {
            organization: '60e6c6a2776c6d055828b0a3',
            group: '60e6c6a2776c6d055828b0a4',
            joinDate: '2021-07-08T12:24:57.103+00:00'
          }
        ],
        enabled: true
      },
      {
        createdAt: '2021-07-08T12:32:32.816+00:00',
        updatedAt: '2021-07-12T07:47:40.639+00:00',
        id: '60e6f060e3e6391802c72159',
        userId: 'REC-837837395',
        firstname: 'hishame6',
        lastname: 'hishame6',
        username: 'hishame6',
        birthday: null,
        email: 'hishame6@doccerts.com',
        phone: '0635303087',
        address: null,
        gender: null,
        picture: null,
        role: 'RECIPIENT',
        countryCode: null,
        statistics: [
          {
            title: 'Recipients',
            icon: './assets/media/svg/icons/General/User.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Signers',
            icon: './assets/media/svg/icons/Communication/Group.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Categories',
            icon: './assets/media/svg/icons/Layout/Layout-4-blocks.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Certificates',
            icon: './assets/media/svg/icons/Design/Layers.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        accountSettings: null,
        permissions: null,
        authorities: null,
        categories: ['Cat 2', 'Cat 3', 'Cat 1'],
        affiliations: [
          {
            organization: '60e6c6a2776c6d055828b0a3',
            group: '60e6c6a2776c6d055828b0a4',
            joinDate: '2021-07-08T12:32:32.670+00:00'
          }
        ],
        enabled: true
      },
      {
        createdAt: '2021-07-08T12:48:26.635+00:00',
        updatedAt: '2021-07-12T07:47:40.639+00:00',
        id: '60e6f41ae3e6391802c7215b',
        userId: 'REC-850806583',
        firstname: 'nez',
        lastname: 'af',
        username: 'nez af',
        birthday: null,
        email: 'hishame.afifi1997@g.com',
        phone: '+212695857856',
        address: null,
        gender: null,
        picture: null,
        role: 'RECIPIENT',
        countryCode: null,
        statistics: [
          {
            title: 'Recipients',
            icon: './assets/media/svg/icons/General/User.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Signers',
            icon: './assets/media/svg/icons/Communication/Group.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Categories',
            icon: './assets/media/svg/icons/Layout/Layout-4-blocks.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Certificates',
            icon: './assets/media/svg/icons/Design/Layers.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        accountSettings: null,
        permissions: null,
        authorities: null,
        categories: ['Cat 1', 'Cat 2'],
        affiliations: [
          {
            organization: '60e6c6a2776c6d055828b0a3',
            group: '60e6c6a2776c6d055828b0a4',
            joinDate: '2021-07-08T12:48:26.461+00:00'
          }
        ],
        enabled: true
      },
      {
        createdAt: '2021-07-08T12:51:00.777+00:00',
        updatedAt: '2021-07-12T07:47:40.639+00:00',
        id: '60e6f4b4e3e6391802c7215d',
        userId: 'REC-198285158',
        firstname: 'zahra',
        lastname: 'ELKHA',
        username: 'zahra ELKHA',
        birthday: null,
        email: 'hishame.afifi1997@gm.fr',
        phone: '+212696785785',
        address: null,
        gender: null,
        picture: null,
        role: 'RECIPIENT',
        countryCode: null,
        statistics: [
          {
            title: 'Recipients',
            icon: './assets/media/svg/icons/General/User.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Signers',
            icon: './assets/media/svg/icons/Communication/Group.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Categories',
            icon: './assets/media/svg/icons/Layout/Layout-4-blocks.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Certificates',
            icon: './assets/media/svg/icons/Design/Layers.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        accountSettings: null,
        permissions: null,
        authorities: null,
        categories: ['Cat 3', 'Cat 4'],
        affiliations: [
          {
            organization: '60e6c6a2776c6d055828b0a3',
            group: '60e6c6a2776c6d055828b0a4',
            joinDate: '2021-07-08T12:51:00.611+00:00'
          }
        ],
        enabled: true
      },
      {
        createdAt: '2021-07-08T12:52:04.241+00:00',
        updatedAt: '2021-07-12T07:47:40.639+00:00',
        id: '60e6f4f4e3e6391802c7215f',
        userId: 'REC-167481569',
        firstname: 'abdelouahid',
        lastname: 'afifi',
        username: 'abdelouahid afifi',
        birthday: null,
        email: 'hishame.afifi1997@gmail.bo',
        phone: '+212674674674',
        address: null,
        gender: null,
        picture: null,
        role: 'RECIPIENT',
        countryCode: null,
        statistics: [
          {
            title: 'Recipients',
            icon: './assets/media/svg/icons/General/User.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Signers',
            icon: './assets/media/svg/icons/Communication/Group.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Categories',
            icon: './assets/media/svg/icons/Layout/Layout-4-blocks.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Certificates',
            icon: './assets/media/svg/icons/Design/Layers.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        accountSettings: null,
        permissions: null,
        authorities: null,
        categories: ['Cat 2', 'Cat 3'],
        affiliations: [
          {
            organization: '60e6c6a2776c6d055828b0a3',
            group: '60e6c6a2776c6d055828b0a4',
            joinDate: '2021-07-08T12:52:04.078+00:00'
          }
        ],
        enabled: true
      },
      {
        createdAt: '2021-07-08T12:54:42.227+00:00',
        updatedAt: '2021-07-12T07:47:40.639+00:00',
        id: '60e6f592e3e6391802c72161',
        userId: 'REC-768711640',
        firstname: 'abderrahmane',
        lastname: 'AFIFI',
        username: 'abderrahmane AFIFI',
        birthday: null,
        email: 'hishame.afifi1997@gmail.co',
        phone: '+212606996896',
        address: null,
        gender: null,
        picture: null,
        role: 'RECIPIENT',
        countryCode: null,
        statistics: [
          {
            title: 'Recipients',
            icon: './assets/media/svg/icons/General/User.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Signers',
            icon: './assets/media/svg/icons/Communication/Group.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Categories',
            icon: './assets/media/svg/icons/Layout/Layout-4-blocks.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            title: 'Certificates',
            icon: './assets/media/svg/icons/Design/Layers.svg',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        accountSettings: null,
        permissions: null,
        authorities: null,
        categories: ['Cat 2', 'Cat 3', 'Cat 4'],
        affiliations: [
          {
            organization: '60e6c6a2776c6d055828b0a3',
            group: '60e6c6a2776c6d055828b0a4',
            joinDate: '2021-07-08T12:54:42.070+00:00'
          }
        ],
        enabled: true
      }
    ],
    pageable: {
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 10,
      paged: true,
      unpaged: false
    },
    totalPages: 2,
    totalElements: 12,
    last: false,
    number: 0,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true
    },
    size: 10,
    numberOfElements: 10,
    first: true,
    empty: false
  }
};
