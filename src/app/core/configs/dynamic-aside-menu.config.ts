import { OrganizationType } from 'src/app/models/Organization';

export const DynamicAsideMenuConfig = {
  items: [
    {
      title: 'Dashboard',
      root: true,
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      page: '/dashboard',
      translate: 'MENU.DASHBOARD',
      bullet: 'dot',
      role: 'ANY'
    },
    { section: 'Issuer', role: 'ISSUER', condition: 'organization required' },
    {
      title: 'Sub-Issuers',
      root: true,
      icon: 'fas fa-check-double',
      bullet: 'dot',
      svg: './assets/media/svg/icons/Communication/Group.svg',
      page: '/issuer/subIssuer',
      role: 'ISSUER',
      condition: 'organization required'
    },
    {
      title: 'Category',
      root: true,
      icon: 'flaticon2-menu-4',
      bullet: 'dot',
      svg: './assets/media/svg/icons/Layout/Layout-4-blocks.svg',
      page: 'issuer/category',
      role: 'ISSUER',
      condition: 'organization required'
    },
    {
      title: 'Recipient',
      root: true,
      badge: { type: 'badge-info' },
      bullet: 'dot',
      svg: './assets/media/svg/icons/General/school.svg',
      page: '/issuer/recipients',
      role: 'ISSUER',
      condition: 'organization required'
    },
    {
      title: 'Design',
      root: true,
      icon: 'fas fa-drafting-compass',
      bullet: 'dot',
      svg: './assets/media/svg/icons/General/paintbrush.svg',
      role: 'ISSUER',
      condition: 'organization required',
      submenu: [
        {
          title: 'Add Design',
          page: '/issuer/designs/add-design'
        },
        {
          title: 'Listing Designs',
          page: '/issuer/designs/listing-designs'
        }
      ]
    },
    {
      title: 'Certificate',
      root: true,
      icon: 'flaticon-medal',
      bullet: 'dot',
      svg: './assets/media/svg/icons/General/certificate.svg',
      page: '/issuer/certificate',
      role: 'ISSUER',
      condition: 'organization required'
    },
    {
      title: 'Organization',
      root: true,
      icon: 'fas fa-group',
      bullet: 'dot',
      svg: './assets/media/svg/icons/General/Bookmark.svg',
      page: '/issuer/organization',
      role: 'ISSUER'
    },
    {
      title: 'Invitations',
      root: true,
      svg: './assets/media/svg/icons/Communication/Incoming-mail.svg',
      page: '/issuer/invites',
      bullet: 'dot',
      role: 'ISSUER'
    },
    {
      title: 'Support Center',
      root: true,
      icon: 'flaticon-medal',
      bullet: 'dot',
      svg: './assets/media/svg/icons/Devices/Headphones.svg',
      page: '/issuer/supportCenter/support',
      role: 'ISSUER',
      condition: 'organization required'
    },
    {
      section: 'Recipient Portal',
      role: 'RECIPIENT',
      condition: 'organization required'
    },

    {
      title: 'Organizations',
      root: true,
      page: '/recipient/organizations',
      svg: './assets/media/svg/icons/General/Bookmark.svg',
      role: 'RECIPIENT'
    },
    {
      title: 'Certificates',
      page: '/recipient/certificates',
      root: true,
      svg: './assets/media/svg/icons/General/certificate.svg',
      condition: 'organization required',
      role: 'RECIPIENT'
    },
    {
      title: 'Invitations',
      root: true,
      svg: './assets/media/svg/icons/Communication/Incoming-mail.svg',
      page: '/recipient/invites',
      bullet: 'dot',
      role: 'RECIPIENT'
    },
    {
      title: 'Invitations',
      root: true,
      svg: './assets/media/svg/icons/Communication/Incoming-mail.svg',
      page: '/verifier/invites',
      bullet: 'dot',
      role: 'VERIFIER'
    },
    {
      section: 'Recipient Organization',
      role: 'ADMIN',
      type: OrganizationType.RECIPIENTORGANIZATION
    },
    {
      title: 'Recipient',
      root: true,
      badge: { type: 'badge-info' },
      bullet: 'dot',
      svg: './assets/media/svg/icons/General/school.svg',
      page: '/recipient-organization/recipients',
      role: 'ADMIN',
      type: OrganizationType.RECIPIENTORGANIZATION
    },
    {
      title: 'Certificates',
      root: true,
      badge: { type: 'badge-info' },
      bullet: 'dot',
      svg: './assets/media/svg/icons/General/certificate.svg',
      page: '/recipient-organization/certificates',
      role: 'ADMIN',
      type: OrganizationType.RECIPIENTORGANIZATION
    },

    {
      section: 'Organization',
      role: 'ADMIN',
      type: OrganizationType.ISSUERORGANIZATION
    },
    {
      title: 'Groups',
      root: true,
      icon: 'fas fa-group',
      bullet: 'dot',
      svg: './assets/media/svg/icons/General/Bookmark.svg',
      page: '/organization/groups',
      role: 'ADMIN',
      type: OrganizationType.ISSUERORGANIZATION
    },
    {
      title: 'Users',
      root: true,
      role: 'ADMIN',
      icon: 'fas fa-check-double',
      bullet: 'dot',
      svg: './assets/media/svg/icons/Communication/Group.svg',
      page: '/organization/users',
      type: OrganizationType.ISSUERORGANIZATION
    },
    {
      title: 'Issuer Requests',
      root: true,
      role: 'ADMIN',
      icon: 'fas fa-check-double',
      bullet: 'dot',
      svg: './assets/media/svg/icons/Communication/Group.svg',
      page: '/organization/IssuersRequests',
      type: OrganizationType.ISSUERORGANIZATION
    },
    {
      title: 'Pack',
      root: true,
      bullet: 'dot',
      icon: 'fas fa-wallet',
      svg: './assets/media/svg/icons/Shopping/Wallet.svg',
      page: '/organization/creditWallet',
      role: 'ADMIN',
      type: OrganizationType.ISSUERORGANIZATION
    },
    {
      title: 'FAQ',
      root: true,
      icon: 'fas fa-inbox',
      bullet: 'dot',
      svg: './assets/media/svg/icons/Communication/speech-bubble.svg',
      page: '/organization/faq-organization/faq',
      role: 'ADMIN',
      type: OrganizationType.ISSUERORGANIZATION
    },

    { section: 'signer', role: 'SIGNER' },
    {
      title: 'Certificates',
      root: true,
      bullet: 'dot',
      icon: 'fas fa-file',
      svg: './assets/media/svg/icons/General/certificate.svg',
      page: '/signer/certificates',
      role: 'SIGNER'
    },
    { section: 'verifier', role: 'VERIFIER' },
    {
      title: 'Verify Certificate',
      root: true,
      bullet: 'dot',
      icon: 'fas fa-file',
      svg: './assets/media/svg/icons/General/Search.svg',
      page: '/verifier/verifycertificate',
      role: 'VERIFIER'
    },
    {
      title: 'Organization',
      root: true,
      bullet: 'dot',
      icon: 'fas fa-file',
      svg: './assets/media/svg/icons/General/Bookmark.svg',
      page: '/verifier/organization',
      role: 'VERIFIER'
    }
  ]
};
