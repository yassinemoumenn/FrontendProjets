export const locale = {
  lang: 'en',
  data: {
    TRANSLATOR: {
      SELECT: 'Select your language'
    },
    MENU: {
      NEW: 'New',
      ACTIONS: 'Actions',
      PAGES: 'Pages',
      FEATURES: 'Features',
      APPS: 'Apps',
      DASHBOARD: 'Dashboard'
    },
    AUTH: {
      GENERAL: {
        OR: 'Or',
        SUBMIT_BUTTON: 'Submit',
        NO_ACCOUNT: "Don't have an account?",
        SIGNUP_BUTTON: 'Sign Up',
        SIGNIN_BUTTON: 'Sign IN',
        FORGOT_BUTTON: 'Forgot Password',
        BACK_BUTTON: 'Back',
        PRIVACY: 'Privacy',
        LEGAL: 'Legal',
        CONTACT: 'Contact'
      },
      LOGIN: {
        TITLE: 'Login Account',
        BUTTON: 'Sign In'
      },
      FORGOT: {
        TITLE: 'Forgotten Password?',
        DESC: 'Enter your email to reset your password',
        SUCCESS: 'Your account has been successfully reset.'
      },
      REGISTER: {
        TITLE: 'Sign Up',
        DESC: 'Enter your details to create your account',
        SUCCESS: 'Your account has been successfuly registered.'
      },
      INPUT: {
        EMAIL: 'Email',
        FULLNAME: 'Fullname',
        PASSWORD: 'Password',
        CONFIRM_PASSWORD: 'Confirm Password',
        USERNAME: 'Username'
      },
      VALIDATION: {
        INVALID: '{{name}} is not valid',
        REQUIRED: '{{name}} is required',
        MIN_LENGTH: '{{name}} minimum length is {{min}}',
        AGREEMENT_REQUIRED: 'Accepting terms & conditions are required',
        NOT_FOUND: 'The requested {{name}} is not found',
        INVALID_LOGIN: 'The login detail is incorrect',
        REQUIRED_FIELD: 'Required field',
        MIN_LENGTH_FIELD: 'Minimum field length:',
        MAX_LENGTH_FIELD: 'Maximum field length:',
        INVALID_FIELD: 'Field is not valid'
      }
    },
    ISSUER: {
      DASHBOARD: {
        CARD: {
          STATISTICS: {
            Signers: 'Signers',
            Recipients: 'Recipients',
            Categories: 'Categories',
            Certificates: 'Certificates'
          }
        }
      },
      CERTIFICATE: {
        SEARCH: 'Search',
        VIEW: {
          HEADER: {
            Title: 'Manage Certificates',
            ExportButton: {
              Title: 'Export',
              SubTitle: { Excel: 'Excel', Csv: 'Csv', Pdf: 'Pdf' }
            },
            ActionButton: {
              Title: 'Actions',
              SubTitle: {
                NewCertificate: 'New Certificate',
                UploadCertificates: 'Upload Certificates',
                IssueCertificates: 'Issue Certificates'
              }
            }
          },
          BODY: {
            CertificateId: 'Certificate ID',
            Recipient: 'Recipient',
            Category: 'Category',
            Design: 'Design',
            Signers: {
              Title: 'Signers',
              Signed: 'Signed',
              Unsigned: 'Unsigned'
            },
            Status: {
              Title: 'Status',
              Created: 'Created',
              Issued: 'Issued',
              Expired: 'Expired',
              Revoked: 'Revoked',
              Rejected: 'Rejected',
              Signed: 'Signed'
            },
            Actions: {
              Title: 'Actions',
              ViewCertificate: 'View Certificate',
              PrintCertificate: 'Print Certificate',
              VerifyCertificate: 'Verify Certificate',
              RevokeCertificate: 'Revoke Certificate',
              DeleteCertificate: 'Delete Certificate'
            }
          },
          FILTER: 'Filter by Status'
        },
        RECIPIENT: {
          HEADER: {
            Title: 'Certificates',
            SubTitle: 'Generate certificates for your recipients'
          },
          BODY: {
            RecipientID: 'Recipient ID',
            Recipient: 'Recipient',
            Email: 'Email',
            Phone: 'Phone'
          },
          FOOTER: {
            CancelButton: 'Cancel',
            NextButton: 'Next'
          },
          FILTER: 'Filter by category'
        },
        ADD: {
          HEADER: {
            Title: 'Certificates',
            SubTitle: 'fill out this form to complete certificate creation'
          },
          BODY: {
            Design: 'Choose a design',
            ExistingID: 'Existing ID'
          },
          FOOTER: {
            CancelButton: 'Cancel',
            SubmitButton: 'Sumbit'
          }
        },
        UPLOAD: {
          HEADER: {
            Title: 'Certificates',
            SubTitle: 'double check your files before uploading'
          }
        },
        ISSUE: {
          HEADER: {
            Title: 'Certificates',
            SubTitle: {
              Sub: 'issue signed certificates in the',
              Public: 'Public',
              Private: 'Private',
              And: 'and',
              Network: 'Network'
            }
          },
          BODY: {
            Design: 'Design',
            Recipient: 'Recipient',
            Category: 'Category'
          },
          FOOTER: {
            CancelButton: 'Cancel',
            IssueButton: 'Issue'
          },
          FILTER: 'Filter by category'
        },
        REVOKE: {
          HEADER: {
            Title: 'Certificates',
            SubTitle: 'revoke certificate'
          },
          BODY: {
            Alert: 'Certificate revocation can not be reverted',
            Reason: 'Reason',
            LeaveReason: 'Leave a reason for certificate revocation',
            MatHint: "Don't disclose personal info",
            MatError: 'Please leave a reason'
          },
          FOOTER: {
            CancelButton: 'Cancel',
            RevokeButton: 'Revoke'
          }
        },
        NODATA: {
          Title: 'Welcome!',
          Description:
            'There are no certificate added yet! ' +
            '\n' +
            ' Kickstart your business by adding your first certificate.',
          Button: 'Add Certificate'
        }
      },
      ORGANIZATION: {
        TITEL: 'Listing Organizations',
        BUTTONREQUEST: 'Request organization',
        NAME: 'name',
        ADMIN: 'admin',
        GROUP: 'group',
        SITE: ' web site',
        ACTION: 'action',
        REQUESTTITEL: 'Request organization',
        SELECTORGANIZATION: 'choose a organization',
        CLOSE: 'close',
        SENDREQUEST: 'send request',
        LEAVEORGANIZATION: 'do you want to leave this organization',
        CONFIRM: 'YES',
        CANCEL: 'CANCEL',
        SECTOR: 'Sector',
        ADDRESS: 'Address',
        STATE: '	STATE'
      },
      CATEGORY: {
        LISTITEL: 'Listing categories',
        NAME: 'Name',
        CERTIFICATE_CATEGORY_FIELDS: 'CERTIFICATE CATEGORY FIELDS',
        RECIPIENT_CATEGORY_FIELDS: 'RECIPIENT CATEGORY FIELDS',
        NEWCATEGORYBUTTON: 'New category',
        CATEGORY_FIELD: 'Certificate field',
        RECIPIENT_FIELD: 'Recipient field',
        ADD_CAT_TITELE: 'Add new category',
        UPDATE_CAT_TITELE: 'Update Category',
        CONFIRM: 'Confirm',
        CANCEL: 'Cancel',
        TYPE_CERTIF_ID: 'Type of the certificate ID ',
        CATEGORYNAME: 'Category name ',
        SIGNERS: 'Signers ',
        VERIFIERS: 'Verifiers ',
        CUSTEMNAME: 'Custem name ',
        NEWFIELD: 'New fields ',
        Add_Certificate_Fields: 'Add Certificate Fields',
        Add_Recipient_Fields: 'Add Recipient Fields',
        Add_Certificate_Fields_TITEL: 'Create your Certificate Fields',
        Add_RecipientFields_TITEL: 'Create your Recipient Fields',
        FieldsNAME: 'Field Name ',
        FieldsTIPE: '	type',
        REMOVE: 'Remove ',
        CLOSE: 'Close ',
        SAVE: 'Save ',
        Add_Certificate_Fields_in_Blockchain:
          'Add Certificate Fields in Blockchain ',
        Category_Certificate: 'Category Certificate :',
        Options_selected: 'Options selected',
        Add_Recipient_Fields_in_Blockchain:
          'Add Recipient Fields in Blockchain ',
        Category_Recipient: 'Category Recipient :',
        SEARCH: 'Search',
        GENERATE_ID_TITEL: 'Generate your custom ID ',
        DELET_MESSAG: 'Do you want to delet this category!!',
        CONFIRM_DELET: 'YES,Delet'
      },
      DESIGN: {
        SHAPES: 'Shapes',
        DESIGNNAME: 'Design name',
        RECTO: 'Recto',
        VERSO: 'Verso',
        CATEGORY: 'Category',
        SAVEMESSAGE: 'do you want to save this design!!',
        CONFIRM: 'YES,Save',
        CANCEL: 'CANCEL',
        CUSTOM: 'CUSTOM',
        CADER: 'CADER',
        BADGE: 'BADGE',
        LETTRE: 'LETTRE',
        SIDE: 'Side',
        LISTINGDESIGN: 'Listing designs',
        SEARCH: 'Search',
        AFFECTED: 'Affected',
        DATE: 'Date',
        DOUBLESIDE: 'Double sided',
        YES: 'YES',
        NO: 'NO',
        ERROR: 'Please choose an item',
        DELETE: 'Delete design',
        UPDATE: 'Update design',
        VIEW: 'View design',
        DUPLIQE: 'Duplicate design',
        Customize_shape: 'Customize Shape'
      },
      RECIPIENT: {
        HEADER: {
          Title: 'Recipients',
          ExportButton: {
            Title: 'Export',
            SubTitle: { Excel: 'Excel', Csv: 'Csv', Pdf: 'Pdf' }
          },
          ActionButton: {
            Title: 'Actions',
            SubTitle: {
              NewRecipient: 'New Recipient',
              InviteRecipients: 'Invite Recipients',
              UploadRecipients: 'Upload Recipients',
              RecipientRequests: 'Recipients Requests'
            }
          }
        },
        BODY: {
          ViewRecipients: {
            Search: 'Search',
            Phone: 'Phone',
            DeleteButton: 'Delete',
            RowsSelected: 'rows selected',
            RowSelected: 'row selected',
            ConfirmDelete: 'Are you sure ?',
            ConfirmButton: 'Confirm',
            CancelButton: 'Cancel',
            MsgDeleteSuccess: 'Recipient deleted successfully',
            MsgDeleteError: 'Delete recipient call in error',
            MsgEditSuccess: 'Recipient updated successfully',
            MsgEditError: 'Update recipient call in error',
            MsgAssignSuccess: 'Categories added successfully',
            MsgAssignError: 'Assign categories call in error',
            MsgConfirmDelete:
              'Do you really want to delete this Recipient? This process cannot be undone.',
            MsgConfirmDeleteMulti:
              'Do you really want to delete these Recipients? This process cannot be undone.'
          },
          AddEditRecipient: {
            TitleAdd: 'Add New Recipient',
            TitleEdit: 'Edit Recipient',
            FirstName: 'First Name',
            LastName: 'Last Name',
            Phone: 'Phone',
            Email: 'Email',
            Occupation: 'Occupation',
            Username: 'Username',
            Categories: 'Categories',
            ConfirmButton: 'Confirm',
            CancelButton: 'Cancel',
            MsgSuccess: 'Recipient added successfully',
            MsgError: 'Recipient added successfully'
          },
          InviteRecipients: {
            Title: 'Invite Recipients',
            Label: 'Search and invite recipients',
            Placeholder: 'New recipient...',
            Categories: 'Categories',
            InviteButton: 'Invite',
            CancelButton: 'Cancel',
            MsgSuccess: 'Recipients invited successfully'
          },
          RecipientRequests: {
            Title: 'Received Recipient Requests',
            Phone: 'Phone',
            DeleteButton: 'Delete',
            RowsSelected: 'rows selected',
            RowSelected: 'row selected'
          },
          AssignCategories: {
            Title: 'Assign category to :',
            Categories: 'Categories',
            ConfirmButton: 'Save Change',
            CancelButton: 'Cancel'
          },
          SendCredentials: {
            Title: 'Send credentials',
            Question: 'Do you want to send credentials to the user you added?',
            ResponseYes: 'Yes',
            ResponseNo: 'No',
            ConfirmButton: 'Send',
            CancelButton: 'Cancel'
          },
          EmptyList: {
            Title: 'Welcome!',
            Description: 'There are no recipients added yet',
            LabelButton: 'Add Recipient'
          }
        }
      },
      VERIFYCERTIFICATE: {
        Title: 'Verify Certificate',
        VerifyInput: 'Please enter certificate ID',
        ButtonLabel: 'Search'
      }
    },
    RECIPIENTORGANIZATION: {
      HEADER: {
        Title: 'Recipients',
        ExportButton: {
          Title: 'Export',
          SubTitle: { Excel: 'Excel', Csv: 'Csv', Pdf: 'Pdf' }
        },
        ActionButton: {
          Title: 'Actions',
          SubTitle: {
            NewRecipient: 'New Recipient',
            InviteRecipients: 'Invite Recipients',
            UploadRecipients: 'Upload Recipients',
            RecipientRequests: 'Recipients Requests'
          }
        }
      },
      BODY: {
        ViewRecipients: {
          Search: 'Search',
          Phone: 'Phone',
          DeleteButton: 'Delete',
          RequestButton: 'Request',
          RowsSelected: 'rows selected',
          RowSelected: 'row selected',
          ConfirmDelete: 'Are you sure ?',
          ConfirmButton: 'Confirm',
          CancelButton: 'Cancel',
          MsgDeleteSuccess: 'Recipient deleted successfully',
          MsgDeleteSuccessMulti: 'Recipients deleted successfully',
          MsgDeleteError: 'Delete recipient call in error',

          MsgAssignSuccess: 'Categories requested successfully',
          MsgAssignError: 'Request categories call in error',
          MsgConfirmDelete:
            'Do you really want to delete this Recipient? This process cannot be undone.',
          MsgConfirmDeleteMulti:
            'Do you really want to delete these Recipients? This process cannot be undone.',
          NoData: 'no data',
          NoPhone: 'no phone',
          NoBirth: 'no birthday',
          Birthday: 'Date of birth',
          Groups: 'Groups',
          Categories: 'Categories',
          Organizations: 'Organizations'
        },
        AddEditRecipient: {
          TitleAdd: 'Add New Recipient',
          TitleEdit: 'Edit Recipient',
          FirstName: 'First Name',
          LastName: 'Last Name',
          Phone: 'Phone',
          Email: 'Email',
          Occupation: 'Occupation',
          Username: 'Username',
          ConfirmButton: 'Confirm',
          CancelButton: 'Cancel',
          MsgSuccess: 'Recipient added successfully',
          MsgError: 'Recipient added successfully',
          MsgEditSuccess: 'Recipient updated successfully',
          MsgEditError: 'Update recipient call in error'
        },
        InviteRecipients: {
          Title: 'Invite Recipients',
          Label: 'Search and invite recipients',
          Placeholder: 'New recipient...',
          InviteButton: 'Invite',
          CancelButton: 'Cancel',
          MsgSuccess: 'Recipients invited successfully'
        },
        RecipientRequests: {
          Title: 'Received Recipient Requests',
          Phone: 'Phone',
          RequestDate: 'REQUEST DATE',
          AcceptButton: 'Accept',
          RejectButton: 'Reject',
          RowsSelected: 'rows selected',
          RowSelected: 'row selected',
          NoPhone: 'no phone',
          MsgSuccessAccept: 'Recipient Accepted successfully',
          MsgSuccessReject: 'Recipient Rejected successfully'
        },
        RequestsCategories: {
          Title: 'Request Recipient',
          Title_: 'Request Recipients',
          Search: 'Search',
          Categories: 'Categories',
          Groups: 'Groups',
          Organizations: 'Organizations',
          NoData: 'no data',
          MsgRequestSuccess: 'Requests sent successfully',
          ConfirmButton: 'Save Change',
          CancelButton: 'Cancel'
        },
        UploadRecipient: {
          Title: 'Upload Recipients'
        },
        SendCredentials: {
          Title: 'Send credentials',
          Question: 'Do you want to send credentials to the user you added?',
          ResponseYes: 'Yes',
          ResponseNo: 'No',
          ConfirmButton: 'Send',
          CancelButton: 'Cancel',
          MsgSuccess: 'Credentials sent successfully'
        },
        EmptyList: {
          Title: 'Welcome!',
          Description: 'There are no recipients added yet',
          LabelButton: 'Add Recipient'
        }
      }
    },
    SUBUSER: {
      TITLEMAINPAGE: 'Sub issuers',
      BTNADDSUBISSUER: 'New sub issuer',
      BTNCANCEL: 'Cancel',
      BTNCONFIRM: 'Confirm',
      ADD: 'Add',
      FNAME: 'First Name',
      LNAME: 'Last Name',
      EMAIL: 'Email',
      PHONE: 'Phone',
      POSITION: 'Position',
      PERMISSIONS: 'Permissions',
      ERRORREQUIERD: 'This field is required',
      TITLEADDSUBISSUER: 'Add new sub issuer',
      TITLEEDITSUBISSUER: 'Edit sub issuer N°: ',
      DELETE: 'Delete',
      EDIT: 'Edit',
      ACTIONS: 'Actions',
      ROWSSELECTED: 'rows selected',
      ROWSELECTED: 'row selected',
      ERRORPHONE: 'Please enter a Valid Phone',
      EMAILINVALID: 'Email invalid',
      SEARCH: 'Search',
      SELECTOPTION: 'Select a position',
      TITLECONFIRM: 'Are you sure ?',
      MSGCONFIRM:
        'Do you really want to delete this Sub Issuer? This process cannot be undone.',
      MSGCONFIRMDELETEMULTI:
        'Do you really want to delete these Sub Issuers? This process cannot be undone.'
    },
    VERIFIER: {
      DASHBOARD: {
        CARD: {
          STATISTICS: {
            Signers: 'Signers',
            Recipients: 'Recipients',
            Categories: 'Categories',
            Certificates: 'Certificates'
          }
        }
      }
    },
    ADMIN: {
      DASHBOARD: {
        CARD: {
          STATISTICS: {
            Signers: 'Signers',
            Recipients: 'Recipients',
            Categories: 'Categories',
            Certificates: 'Certificates'
          }
        }
      }
    },
    SIGNER: {
      DASHBOARD: {
        CARD: {
          STATISTICS: {
            Signers: 'Signers',
            Recipients: 'Recipients',
            Categories: 'Categories',
            Certificates: 'Certificates'
          }
        }
      },
      CERTIFICATE: {
        REJECT: {
          HEADER: {
            Title: 'Certificates',
            SubTitle: 'reject certificate'
          },
          BODY: {
            Alert: 'Certificate rejection cannot be reverted',
            Reason: 'Reason',
            LeaveReason: 'Leave a reason for certificate rejection',
            MatHint: "Don't disclose personal info",
            MatError: 'Please leave a reason'
          },
          FOOTER: {
            CancelButton: 'Cancel',
            RejectButton: 'Reject'
          }
        }
      }
    },
    RECIPIENT: {
      DASHBOARD: {
        CARD: {
          STATISTICS: {
            Signers: 'Signers',
            Recipients: 'Recipients',
            Categories: 'Categories',
            Certificates: 'Certificates'
          }
        }
      },
      CERTIFICATES: {
        LISTITEL: 'List des Certificates',
        CERTIFICATE_ID: 'CERTIFICATE ID',
        RECIPIENT_ID: '	RECIPIENT ID',
        RECIPIENT: '	RECIPIENT',
        ISSUER: '	ISSUER',
        STATE: '	STATE',
        CATEGORY: 'CATEGORY',
        ORGANIZATION: 'ORGANIZATION',
        CONFIRM: 'CONFIRM',
        CANCEL: 'CANCEL',
        REMOVE: 'REMOVE ',
        CLOSE: 'CLOSE ',
        SAVE: 'SAVE ',
        SEARCH: 'SEARCH',
        CONFIRM_DELET: 'Yes,Delete'
      }
    },
    SERVER: {
      ERROR: 'Please retry again in a few moments ...', //500
      UNAUTHORIZED: 'Unauthorized to perform this action', // 401
      FORBIDDEN: {
        // 403
        title: 'FORBIDDEN',
        text: 'Forbidded to perfom this action'
      },
      BAD_REQUEST: 'Invalid request, recheck your data', //400
      MANY_REQUESTS: 'Too many requests', //429
      NOT_FOUND: {
        //404
        title: 'NOT FOUND',
        text: 'Requested ressource not found'
      },
      MAINTENANCE: {
        //i503
        title: 'MAINTENANCE',
        text: 'Application under maintenance'
      },
      BUTTON_HOMEPAGE: 'Home page'
    },
    CLIENT: {},
    ERROR: {
      TOKEN: {
        EXPIRED: 'Session expired, please reconnect.',
        REVOKED: 'Session revoked, contact the support',
        BAD_CREDENTIALS: 'Invalid user, please reconnect.'
      }
    },
    REGISTRATION: {
      SINGUP: ' Sign Up',
      SINGUPASUSER: ' Sign Up As a User',
      SINGUPASORG: ' Sign Up As an Organization',
      SIGNUP_MESSAGE: 'Enter your details to create your account ',
      PHONE: 'Phone',
      PASSWORD: 'Password',
      CPASSWORD: 'Confirm Password',
      PREVIOUS: 'Previous',
      SUBMIT: 'Submit',
      SROLE: 'Select your role',
      ROLE: 'Role',
      SUBMITERROR: 'The registration details are incorrect',
      NEXT: 'Next',
      CANCEL: 'Cancel',
      FNAM: 'First Name',
      LNAM: 'Last Name',
      BIRTHD: 'Date of Birth',
      PW_CPW_MATCH: "Passsword and Confirm Password didn't match.",
      AGREE: 'I Agree to',
      CONDITION: ' the terms and conditions',
      PHONEMAILREQ: 'phone or email is required',
      EMAILVALIDATIONERR: 'Email is invalid',
      ORGNAME: 'Institution Name',
      COUNTRY: 'Country',
      CITY: 'City',
      POSTCODE: 'Postal Code',
      SECTOR: 'Sector',
      USERNAME: 'username'
    },
    ORGANIZATION: {
      SUBMITBUTTON: 'Submit',
      CANCELBUTTON: 'Cancel',
      USERS: {
        AMPRYPAGE: {
          TITLE: 'Welcome!',
          DESC:
            'There are no users added yet! ' +
            '\n' +
            ' Kickstart your business by adding your first user.',
          BUTTONLABEL: 'Add new User'
        },
        LISTING: {
          TITLE: 'Listing users',
          SEARSH: 'Search',
          FILTER: 'Filter by Role',
          INVITE: 'Invite Users'
        },
        ADDUSER: {
          DATEOFBIRTH: 'Date of birth',
          SELECTGROUP: 'Select group',
          SELECTGROUPS: 'Select groups',
          SELECTCATS: 'Select categories',
          ADDBUTTON: 'Add',
          UPDATEBUTTON: 'Update',
          ADDTITLE: 'Add new user',
          UPDATETITLE: 'Update user',
          CONFIRM: 'Submit'
        },
        AFFECT: {
          TITLE: 'Affect user to a group',
          INFOS: "User's information "
        },
        INVITE: {
          TITLE: 'Invite Users',
          SEARcH: 'Search for a user',
          searchplaceholder: 'Search user by Firtname,Lastname and Role.',
          NODATA: 'No records found !'
        },
        view: {
          USER: 'User ',
          PHONE: 'Phone',
          BIRTHDAY: 'Date of Birth',
          EDIT: 'update user',
          DELETE: 'delete user',
          ACCTIVATE: 'Activate Account',
          DEACTIVATE: 'Deactivate account',
          IMPERSONATE: 'Impersonate',
          AFFECT: 'Affect to a group',
          STATE: 'Account state',
          ACTIVE: 'Active',
          BLOCKED: 'Blocked',
          PENDING: 'Pending'
        },
        DELETEMODAL: {
          TITLE: 'Dissociate  user ',
          MESSAGE: 'Please confirm that you want to dissociate this user!',
          CANCEL: 'Cancel',
          CONFIRM: 'Confirm',
          WAIT: 'Processing . . .'
        },
        ChangeStateModal: {
          TITLE: 'Change Accounts State ',
          MESSAGEDEACTIVATE:
            'Please confirm that you want to Deactivate this account',
          MESSAGEACTIVATE:
            'Please confirm that you want to Activate this account',
          CANCEL: 'Cancel',
          CONFIRM: 'Confirm',
          WAIT: 'Processing . . .'
        }
      },
      REQUESTS: {
        EMPTYPAGE: {
          TITLE: 'Welcome!',
          DESC: 'There are no issuers requests yet! '
        },
        LISTING: {
          TITLE: 'Listing Issuers Requests',
          ISSUER: 'Issuer',
          PHONE: 'Phone',
          REQUESTDATE: 'Request Date',
          ACCEPT: 'Accept Request',
          REJECT: 'Refuse Request'
        },
        ACCEPTMODAL: {
          TITLE: 'Accept Request',
          MESSAGE: 'Please confirm that you want to accept this request!',
          CANCEL: 'Cancel',
          CONFIRM: 'Confirm',
          WAIT: 'Processing . . .'
        },
        REFUSEMODAL: {
          TITLE: 'Refuse Request',
          MESSAGE: 'Please confirm that you want to refuse this request!',
          CANCEL: 'Cancel',
          CONFIRM: 'Confirm',
          WAIT: 'Processing . . .'
        }
      },
      GROUPS: {
        LISTING: {
          GROUPS: 'Listing Groups',
          SEARCH: 'Search',
          FILTER: 'Filter',
          NAME: 'Name',
          ISSUER: 'Issuer',
          RECIPIENTS: 'Recipients',
          SIGNERS: 'Signers',
          CREDIT: 'Credit',
          EDITGROUP: 'Edit Group',
          DELETEGROUP: 'Delete Group',
          SEND: 'Send Credit',
          CREATE: 'Create Group'
        },
        FORM: {
          ADDTITLE: 'Add a group',
          UPDATETITLE: 'Update a group',
          SENDCREDIT: 'Send Credit',
          INPUTS: {
            NAME: 'Name',
            ISSUER: 'Issuer',
            RECIPIENTS: 'Recipients',
            SIGNERS: 'Signers',
            GROUP: 'Group',
            CREDIT: 'Enter Credit',
            CREDITERROR: "You don't have enaugh credit!"
          }
        },
        EMPTYPAGE: {
          TITLE: 'Welcome!',
          DESC: 'There are no groups added yet! '
        },
        DELETEMODAL: {
          TITLE: 'Delete Group ',
          MESSAGE: 'Please confirm that you want to delete this group !',
          CANCEL: 'Cancel',
          CONFIRM: 'Confirm',
          WAIT: 'Processing . . .'
        }
      },
      FAQ: {
        FUNCTIONALITIES: 'Functionalities',
        HOWITWORKS: 'How does it work?',
        USERS: 'Users',
        RESSOURCES: 'Resources',
        ADMIN: {
          TITLE: "Organization's Admin",
          DESC: "Organization's admin refers to one or many administrators, who provide support to individuals or teams, they are vital for the smooth-running of the business in the organization.",
          D1: " Organization's admin users handle incoming issuers requests, and create groups, assign issuers & signers.",
          D2: 'Create new users or invite them to join the community, they are also responsible to determine pack pricing for the customers.'
        },
        ISSUER: {
          TITLE: 'Issuer',
          DESC: 'An issuer is an approved individual belong to private or public institution which is set up for an educational, religious, social or professional cause. ',
          D1: 'The main role for the issuer is to create a certificates design,represent informations related to his institution,in addition to a set of skills and qualifications aquired by the trainee during a period of training & assigning categories to the created the certificates.',
          D2: 'The issuer can upload miltiples recipients from an excel/csv files, invite recipients to create accounts in Doccerts, or recieving recipients Requests as condidates for recieving their certificates he can add signers to sign certifcates as well.'
        },
        SIGNER: {
          TITLE: 'Signer',
          DESC: ' Signers are members of the actual institution you can look at them as jury who decide if a condidate master a set of skills and qualifications,or not.',
          D1: 'Signers are responsible for check and validation of trainee skills and qualification mentionned in the certifcate by a recipient.',
          D2: 'Signers can also report a certificate to be revoked from a recipient,based revision made by the institution.'
        },
        RECIPIENT: {
          TITLE: 'Recipient',
          DESC: 'A recipient is a condidate for recieving a certificate from the institution after validating a set createria made by the institution members.',
          D1: 'A recipient can create an account as a recipient and send requests to issuers,and recieve invitation from issuers as well.',
          D2: 'Recipients who recieve certificates from their issuers they can list their certifcates,view them and prints copies.'
        },
        VERIFIER: {
          TITLE: 'Verifier',
          DESC: 'A verifier can be individuals or entreprise member, or recruiter, humain Resources. who are looking for improve their team members,in diffrents professional fields.',
          D1: 'Verifiers are users of Doccerts plateform they benefit from the system in sense of helping them to accelerate the process of talent aquisition.',
          D2: 'Verifiers use the information of a certificate like the public key of the certificates to check the authenticity of the certifcate belonging to a recipient who is a condidate for employement for example.'
        },
        SUBUSER: {
          TITLE: 'Sub-user',
          DESC: 'A subissuer is an issuer who has zero or more restriction on his roles, the issuer can delegate some of its task to subissuer.',
          D1: 'Assign certificates to recipients and add recipients invite them to join doccerts.',
          D2: 'Create new users or invite them to join the community, they are also responsible to determine pack pricing for the customers.'
        },
        CATEGORY: {
          TITLE: 'Category',
          DESC: 'A category represent a set of certificates coordonates,that can be used to define necessary fields like recipient field :first name last name, recipient image, define certificate fields like title of the certifcates expiring date... ',
          D1: 'A category determine which set of necessary field should be included during the certificate design for example title field expiring date field, delievry date field, Mark, jury remark field ...',
          D2: 'Before designing a certificate you start creating a category that represent the necessary field that will determine information included in the certificate. during the creation of the certificate design you assign actual values to these field. once a category is created it became ready for future uses, a category can be modify or deleted by an issuer.'
        },
        CERTIFICATE: {
          TITLE: 'Certificate',
          DESC: ' A certificate is a unique digital document,digitally signed which authoritatively identifies the identity of an individual or organization. Using public key cryptography, its authenticity can be verified to ensure that legitimacy of the certificate. ',
          D1: "The certificate is issued by a group to a recipient the certificate holder,and signed by a trusted certificate authority. it's delieved with a public key.",
          D2: "the certificate is verified with the authority's public key of a certificate holder or recipient."
        },
        BLOCKCHAIN: {
          TITLE: 'Blockchain',
          DESC: 'Blockchain technology is most simply defined as a decentralized, distributed ledger that records the provenance of a digital asset. By inherent design, the data on a blockchain is unable to be modified, which makes it a legitimate disruptor for industries like Certifcations,payments, cybersecurity and healthcare.',
          D1: "The whole point of using a blockchain is to let people — in particular, people who don't trust one another — share valuable data in a secure, tamperproof way.",
          D2: 'The shared information is protected against modification, meaning that any al-teration would be easily and immediately detectable. For that reason, once information is rec-orded on the blockchain, it is considered immutable because it is so strongly protected.'
        }
      },
      WALLET: {
        TITLE: 'Choose Your Plan',
        SUBTITLE: ' If you need more info about our pricing, please check',
        LINK: 'Pricing Guidelines',
        MONTHLY: 'Monthly',
        ANNUAL: 'Annual',
        CERTIFICATE: 'Certificate',
        RECIPIENTACCOUNTS: 'Recipient Accounts',
        SIGNERACCOUNTS: 'Signer Accounts',
        BLOCKCHAIN: 'Blokchain Network',
        STORAGE: 'Of Storage',
        CUSTOMARSUPPORT: 'Customer support',
        BACKUP: 'Backup',
        SELECT: 'Select',
        MONTH: 'Month',
        YEAR: 'Year'
      },
      SUCCESSMESSAGES: {
        ADDSIGNER: 'Signer has been added successfully',
        UPDATESIGNER: 'Signer has been updated successfully',
        DELETESIGNER:
          'Signer has been removed from the organization successfully',
        ADDRECIPIENT: 'Recipient has been added successfully',
        UPDATERECIPIENT: 'Recipient has been updated successfully',
        DELETERECIPIENT:
          'Recipient has been removed from the organization successfully',
        ADDISSUER: 'Issuer has been added successfully',
        UPDATEISSUER: 'Issuer has been updated successfully',
        DELETEISSUER:
          'Issuer has been removed from the organization successfully',
        INVITEUSER: 'User has been invited',
        IMPERSONATE: 'User has been impersonated successfully',
        CHANGESTATE: 'Updated user successfully',
        CREDITSUCCESS: 'Credits updated successfully',
        ADDGROUP: 'Group has been added successfully',
        UPDAREGROUP: 'Group has been updated successfully',
        DELETEGROUP: 'Group has been deleted successfully',
        ACCEPTREQUEST: 'Request has been accepted successfully',
        REJECTREQUEST: 'Request has been rejected successfully'
      }
    },
    SHARED: {
      FULLRECIPIENTFIELDS: {
        SNACKBAR: {
          MsgFullSucces: 'Recipient fields filled successfully',
          MsgFullError: 'Fill recipient fields call an error'
        },
        HEADER: {
          Title: 'Recipient',
          SubTitle: 'fill out this form to complete recipient fields'
        },
        FOOTER: {
          CancelButton: 'Cancel',
          SubmitButton: 'Sumbit'
        }
      }
    },
    USER_PROFILE: {
      ASSIDE_BAR: {
        chat: 'Chat',
        follow: 'Follow',
        email: 'Email',
        phone: 'Phone',
        credits: 'Credits',
        overview: 'Overview',
        accountSettings: 'Account Settings',
        changePassword: 'Change Password',
        blockChainIdentity: 'Blockchain Identity'
      },
      OVERVIEW: {
        PERSONAL_INFO: {
          HEADER: {
            title: 'Personal Information',
            subTitle: 'Show your personal information',
            btnEdit: 'Edit'
          },
          BODY: {
            fullName: 'Full Name',
            contactPhone: 'Contact Phone',
            contactEmail: 'Contact Email',
            country: 'Country',
            birthday: 'Birthday',
            communication: 'Communication',
            phoneTitle: 'Phone number must be active',
            countryTitle: 'Country of origination'
          }
        },
        ORGANIZATION_INFO: {
          HEADER: {
            title: 'Organization Information',
            subTitle: 'Show your organization informaton',
            btnEdit: 'Edit'
          },
          BODY: {
            name: 'Name',
            address: 'Address',
            webSite: 'Web Site',
            sector: 'Sector'
          }
        }
      },
      PERSONAL_INFO: {
        HEADER: {
          title: 'Personal Information',
          subTitle: 'Update your personal information',
          btnCancel: 'Cancel',
          btnSaveChange: 'Save Change'
        },
        BODY: {
          btnUploadSignatur: 'Upload Signature',
          firstName: 'First Name',
          lastName: 'Last Name',
          birthday: 'Date Of Birth',
          contactInfo: 'Contact Info',
          email: 'Email',
          phone: 'Phone',
          msgSuccess: 'Your personal information has been updated',
          msgRequired: 'Required Field',
          msgEtherEmaolOrPhone: 'You must enter your ether email or phone'
        }
      },
      ORGANIZATION_INFO: {
        HEADER: {
          title: 'Organization Information',
          subTitle: 'update your organization information',
          btnSaveChange: 'Save Change',
          btnCancel: 'Cancel'
        },
        BODY: {
          organizationName: 'Organization Name',
          organizationNamePlaceholder: 'Enter Organization Name',
          address: 'Address',
          addressPlaceholder: 'Enter Address',
          webSite: 'Web Site',
          webSitePlaceholder: 'Enter Website',
          sector: 'Sector',
          sectorPlaceholder: 'Enter Sector',
          areaCode: 'Area Code',
          areaCodePlaceholder: 'Enter Area Code',

          institutionId: 'Institution Id',
          institutionIdPlaceholder: 'Enter Institution ID',
          msgSuccess: 'Your organization information has been updated'
        }
      },
      ACCOUNT_SETTINGS: {
        HEADER: {
          title: 'Account Settings',
          subTitle: 'update your account settings',
          btnSaveChange: 'Save Change',
          btnCancel: 'Cancel'
        },
        BODY: {
          accountNotification: 'Account Notification',
          emailNotification: 'Email Notification',
          phoneNotification: 'Phone Notification',
          security: 'Security',
          loginVerification: 'Login Verification',
          passwordResetVerification: 'Password reset verification',
          textLoginVerification:
            "Two-factor authentication adds an extra layer of security to your account. To log in, in addition you'll need to provide a 6 digit code.",
          learnMore: 'Learn more',
          checkboxText: 'Require personal information to reset your password.',
          textPasswordReset:
            'For extra security, this requires you to confirm your email or phone number when you reset your password.',
          deactivateYourAccount: 'Deactivate your account?',
          msgSuccess: 'Your account settings have been updated'
        }
      },
      CHANGE_PASSWORD: {
        HEADER: {
          title: 'Change Password',
          subTitle: 'Change your account password',
          btnSaveChange: 'Save Change',
          btnCancel: 'Cancel'
        },
        BODY: {
          textAlert: `Configure user passwords to expire periodically. Users will need warning that their passwords are going to expire,
          or they might inadvertently get locked out of the system!
          The password should contain at least 8 characters with a lowercase letter an uppercase letter a number and a special character.`,
          currentPassword: 'Current Password',
          newPassword: 'New Password',
          confirmPassword: 'Confirm Password',
          msgCurrentPasswordIncorrect: 'Current password is incorrect !',
          msgSuccess: 'Your password has been successfully modified.',
          msgInvalidPassword: `Make sure it's at least 8 characters including a number and a lowercase letter and a capital letter and a special character`
        }
      },
      BLOCKCHAIN_IDENTITY: {
        HEADER: {
          title: 'Blockchain Identity',
          subTitle: 'See your blockchain identity'
        },
        BODY: {
          PRIVATE: {
            title: 'Private Blockchain',
            subTitle: 'Generate your credentials to start issuing certificates',
            btnGenerate: 'Generate',
            pleaseWait: 'Please wait...',
            afterWait: 'this feature will be coming soon',
            key: 'Key',
            textCopy: 'Click to copy',
            msgCopier: 'Identity copied to clipboard',
            msgGeneratedSuccessfully:
              'Blockchain private key generated successfully'
          },
          PUBLIC: {
            title: 'Public Blockchain',
            subTitle: 'Generate your credentials to start issuing certificates',
            btnGenerate: 'Generate',
            pleaseWait: 'Please wait...',
            key: 'Key',
            textCopy: 'Click to copy',
            msgCopier: 'Identity copied to clipboard',
            msgGeneratedSuccessfully:
              'Blockchain public key generated successfully'
          }
        }
      }
    }
  }
};
