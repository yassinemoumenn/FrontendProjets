import { PackModel } from './../models/IssuerOrganization';
import { Component, OnInit } from '@angular/core';

import { of } from 'rxjs';
import { Observable } from 'rxjs/';

@Component({
  selector: 'app-credit-wallet',
  templateUrl: './credit-wallet.component.html',
  styleUrls: ['./credit-wallet.component.scss']
})
export class CreditWalletComponent implements OnInit {
  totalLength: any;
  page: number = 1;

  dataFromMessages$: Observable<any> | undefined;

  constructor() {}

  CreditType: boolean = false;

  indice: any = 0;
  packs: PackModel = {
    title: '',
    label: '',
    storage: 0,
    description: '',
    discount: 10,
    image: '',
    expireIn: new Date(),
    numberOfCertificates: 10,
    issuanceFee: 10,
    customVerificationPage: true,
    recipients: 10,
    signers: 10,
    categories: 10
  };
  monthlyCredits: any = of([
    {
      titel: 'Startup',
      desc: 'Optimal for 10+ team size and new startup',
      Prix: '833',
      Number_of_Certificates: '200',
      Recipient_Accounts: '8',
      Signer_Accounts: '5',
      Blokchain_Network: 'Public & Private',
      Storage: '10 GB',
      Backup: 'Monthly',
      Customer_support: 'Email'
    }, //credC
    {
      titel: 'Advanced',
      desc: 'Optimal for 100+ team size and grown company',
      Prix: '2500',
      Number_of_Certificates: '100',
      Recipient_Accounts: 'Unlimited',
      Signer_Accounts: '10',
      Blokchain_Network: 'Public & Private',
      Storage: '80 GB',
      Backup: 'Daily',
      Customer_support: 'Email & Phone & Chat'
    }, // cred Premium
    {
      titel: 'Enterprise',
      desc: 'Optimal for 1000+ team and enterpise',
      Prix: '20833',
      Number_of_Certificates: '500+',
      Recipient_Accounts: 'Unlimited',
      Signer_Accounts: 'Unlimited',
      Blokchain_Network: 'Public & Private',
      Storage: 'Unlimited',
      Backup: 'Daily',
      Customer_support: 'Email & Phone & Chat (Dedicated support)'
    }
  ]);

  annuelCredits: any = of([
    {
      titel: 'Startup',
      desc: 'Optimal for 10+ team size and new startup',
      Prix: '10000',
      Number_of_Certificates: '2000',
      Recipient_Accounts: '100',
      Signer_Accounts: '5',
      Blokchain_Network: 'Public & Private',
      Storage: '10 GB',
      Backup: 'Monthly',
      Customer_support: 'Email'
    },
    //credC
    {
      titel: 'Advanced',
      desc: 'Optimal for 100+ team size and grown company',
      Prix: '30000',
      Number_of_Certificates: '1000',
      Recipient_Accounts: 'Unlimited',
      Signer_Accounts: '20',
      Blokchain_Network: 'Public & Private',
      Storage: '80 GB',
      Backup: 'Daily',
      Customer_support: 'Email & Phone & Chat'
    },
    // cred Premium
    {
      titel: 'Enterprise',
      desc: 'Optimal for 1000+ team and enterpise',
      Prix: '250000',
      Number_of_Certificates: '50001+',
      Recipient_Accounts: 'Unlimited',
      Signer_Accounts: 'Unlimited',
      Blokchain_Network: 'Public & Private',
      Storage: 'Unlimited',
      Backup: 'Daily',
      Customer_support: 'Email & Phone & Chat (Dedicated support'
    }
  ]);

  styleY() {
    if (this.CreditType) {
      return { backgroundColor: '#e4e6ef', color: '#3f4254' };
    } else {
      return { backgroundColor: 'rgba(0,0,0,0)', color: '#b5b5c3' };
    }
  }

  styleM() {
    if (!this.CreditType) {
      return { backgroundColor: '#e4e6ef', color: '#3f4254' };
    } else {
      return { backgroundColor: 'rgba(0,0,0,0)', color: '#b5b5c3' };
    }
  }

  month() {
    this.CreditType = false;
  }

  year() {
    this.CreditType = true;
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
