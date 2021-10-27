export const locale = {
  lang: 'fr',
  data: {
    MENU: {
      NEW: 'Nouveau',
      ACTIONS: 'Actes',
      CREATE_POST: 'Créer un nouveau Post',
      PAGES: 'Pages',
      FEATURES: 'Fonctionnalités',
      APPS: 'Applications',
      DASHBOARD: 'Tableau de Bord'
    },
    ISSUER: {
      DASHBOARD: {
        CARD: {
          STATISTICS: {
            Signers: 'Signataires',
            Recipients: 'Destinataires',
            Categories: 'Catégories',
            Certificates: 'Certificats'
          }
        }
      },
      CERTIFICATE: {
        SEARCH: 'Rechercher',
        VIEW: {
          HEADER: {
            Title: 'Gérer les certificats',
            ExportButton: {
              Title: 'Exporter',
              SubTitle: { Excel: 'Excel', Csv: 'Csv', Pdf: 'Pdf' }
            },
            ActionButton: {
              Title: 'Actions',
              SubTitle: {
                NewCertificate: 'Ajouter un certificat',
                UploadCertificates: 'Télécharger des certificats',
                IssueCertificates: 'Délivrer des certificats'
              }
            }
          },
          BODY: {
            CertificateId: 'Identifiant du certificat',
            Recipient: 'Destinataire',
            Category: 'Catégorie',
            Design: 'Désign',
            Signers: {
              Title: 'Signataires',
              Signed: 'Signé',
              Unsigned: 'Non signé'
            },
            Status: {
              Title: 'Statut',
              Created: 'Crée',
              Issued: 'Délivrer',
              Expired: 'Expiré',
              Revoked: 'Révoqué',
              Rejected: 'Rejetée',
              Signed: 'Signé'
            },
            Actions: {
              Title: 'Actions',
              ViewCertificate: 'Afficher le certificat',
              PrintCertificate: 'Imprimer le certificat',
              VerifyCertificate: 'Vérifier le certificat',
              RevokeCertificate: 'Révoquer le certificat',
              DeleteCertificate: 'Supprimer le certificat'
            }
          },
          FILTER: 'Filtrer par statut'
        },
        RECIPIENT: {
          HEADER: {
            Title: 'Certificats',
            SubTitle: 'générer des certificats pour vos destinataires'
          },
          BODY: {
            RecipientID: 'Identifiant du destinataire',
            Recipient: 'Destinataire',
            Email: 'E-mail',
            Phone: 'Téléphoner'
          },
          FOOTER: {
            CancelButton: 'Annuler',
            NextButton: 'Suivant'
          },
          FILTER: 'Filter par catégorie'
        },
        ADD: {
          HEADER: {
            Title: 'Certificats',
            SubTitle:
              'remplissez ce formulaire pour terminer la création du certificat'
          },
          BODY: {
            Design: 'Choisissez un désign',
            ExistingID: 'Identifiant existant'
          },
          FOOTER: {
            CancelButton: 'Annuler',
            SubmitButton: 'Soumettre'
          }
        },
        UPLOAD: {
          HEADER: {
            Title: 'Certificats',
            SubTitle: 'revérifiez vos fichiers avant de les télécharger'
          }
        },
        ISSUE: {
          HEADER: {
            Title: 'Certificats',
            SubTitle: {
              Sub: 'délivrer des certificats signés dans le',
              Public: 'Public',
              Private: 'Privée',
              And: 'et',
              Network: 'Réseau'
            }
          },
          BODY: {
            Design: 'Désign',
            Recipient: 'Destinataire',
            Category: 'Catégorie'
          },
          FOOTER: {
            CancelButton: 'Annuler',
            IssueButton: 'Délivrer'
          },
          FILTER: 'Filter par catégorie'
        },
        REVOKE: {
          HEADER: {
            Title: 'Certificats',
            SubTitle: 'révoquer le certificat'
          },
          BODY: {
            Alert: 'La révocation du certificat ne peut pas être annulée',
            Reason: 'Raison',
            LeaveReason: 'Laisser une raison pour la révocation du certificat',
            MatHint: "Ne divulguez pas d'informations personnelles",
            MatError: 'Veuillez laisser une raison'
          },
          FOOTER: {
            CancelButton: 'Annuler',
            RevokeButton: 'Révoquer'
          }
        },
        NODATA: {
          Title: 'Bienvenue!',
          Description:
            "Il n'y a pas encore de certificat ajouté! " +
            '\n' +
            'Lancez votre entreprise en ajoutant votre premier certificat.',
          Button: 'Ajouter un certificat'
        }
      },

      ORGANIZATION: {
        TITEL: 'list des organisations',
        BUTTONREQUEST: 'rejoinder une organization',
        NAME: 'nom',
        ADMIN: 'admin',
        GROUP: 'group',
        SITE: 'site web',
        ACTION: 'action',
        REQUESTTITEL: 'rejoinder organization',
        SELECTORGANIZATION: 'selectioner une organization',
        CLOSE: 'fermer',
        SENDREQUEST: 'envoyer ',
        LEAVEORGANIZATION: 'voulez-vous quitter cette organisation',
        CONFIRM: 'OUI',
        CANCEL: 'Annuler',
        SECTOR: 'Secteur',
        ADDRESS: 'Adresse',
        STATE: ' Status'
      },
      CATEGORY: {
        LISTITEL: 'Liste des catégories',
        NAME: 'nom',
        CERTIFICATE_CATEGORY_FIELDS: 'LES CHAMPS DE CATÉGORIE DE CERTIFICAT',
        RECIPIENT_CATEGORY_FIELDS: 'LES CHAMPS DE CATÉGORIE DE BENEFICIAIRE',
        NEWCATEGORYBUTTON: 'Nouvelle catégorie',
        CATEGORY_FIELD: 'Champ du certificat',
        RECIPIENT_FIELD: 'Champ destinataire',
        ADD_CAT_TITELE: 'Ajouter une nouvelle catégorie',
        UPDATE_CAT_TITELE: 'Mettre à jour la catégorie',
        CONFIRM: 'Confirmer',
        CANCEL: 'annuler',
        TYPE_CERTIF_ID: "Type de l'identifiant du certificat ",
        CATEGORYNAME: 'NOM DE CATÉGORIE',
        SIGNERS: 'Signataires ',
        VERIFIERS: ' Vérificateurs',
        CUSTEMNAME: 'Nom personnalisé ',
        NEWFIELD: 'Nouveau champ ',
        Add_Certificate_Fields: 'Ajouter des champs de certificat',
        Add_Recipient_Fields: 'Ajouter des champs de beneficiaire',
        Add_Certificate_Fields_TITEL: 'Créez votre certificat de catégorie',
        Add_RecipientFields_TITEL:
          'Créez votre certificat de catégorie beneficiaire',
        FieldsNAME: 'Nom de domaine',
        FieldsTIPE: '	type',
        REMOVE: 'Supprimer ',
        CLOSE: 'fermer ',
        SAVE: 'enregistrer ',
        Add_Certificate_Fields_in_Blockchain:
          'Ajouter des champs de certificat dans Blockchain ',
        Category_Certificate: 'Certificat de catégorie:',
        Options_selected: 'Options sélectionnées',
        Add_Recipient_Fields_in_Blockchain:
          'Ajouter des champs de destinataire dans Blockchain ',
        Category_Recipient: 'Catégorie Destinataire:',
        SEARCH: 'Chercher',
        GENERATE_ID_TITEL: 'Générez votre identifiant personnalisé',
        DELET_MESSAG: 'Voulez-vous supprimer cette catégorie !!',
        CONFIRM_DELET: 'OUI,Suprimer'
      },
      DESIGN: {
        SHAPES: 'Formes',
        DESIGNNAME: 'Nom du dessin',
        RECTO: 'Recto',
        VERSO: 'Verso',
        CATEGORY: 'Catégorie',
        SAVEMESSAGE: 'voulez-vous enregistrer cette conception !',
        CONFIRM: 'enregistrer ',
        CANCEL: 'annuler',
        CUSTOM: 'personnalisé',
        CADER: 'cadreur',
        BADGE: 'badge',
        LETTRE: 'lettre',
        SIDE: 'côté',
        LISTINGDESIGN: 'List des designs',
        SEARCH: 'Chercher',
        AFFECTED: 'Affect',
        DATE: 'Date',
        DOUBLESIDE: 'Double face',
        YES: 'OUI',
        NO: 'NON',
        ERROR: 'Veuillez choisir un article',
        DELETE: 'Suprimer design',
        UPDATE: 'Modifier design',
        VIEW: 'View design',
        DUPLIQE: 'Dupliquer design',
        Customize_shape: 'Personnaliser le format '
      },
      RECIPIENT: {
        HEADER: {
          Title: 'Recipients',
          ExportButton: {
            Title: 'Exportation',
            SubTitle: { Excel: 'Excel', Csv: 'Csv', Pdf: 'Pdf' }
          },
          ActionButton: {
            Title: 'Actions',
            SubTitle: {
              NewRecipient: 'Nouveau Recipient',
              InviteRecipients: 'Inviter des Recipients',
              UploadRecipients: 'Télécharger des Recipients',
              RecipientRequests: 'Demandes des Recipients'
            }
          }
        },
        BODY: {
          ViewRecipients: {
            Search: 'Chercher',
            Phone: 'Téléphone',
            DeleteButton: 'Supprimer',
            RowsSelected: 'lignes sélectionnées',
            RowSelected: 'ligne sélectionnée',
            ConfirmDelete: 'Es-tu sûr ?',
            ConfirmButton: 'Confirmer',
            CancelButton: 'Annuler',
            MsgDeleteSuccess: 'Recipient supprimé avec succès',
            MsgDeleteError: 'Erreur',
            MsgEditSuccess: 'Recipient mis à jour avec succès',
            MsgEditError: 'Erreur',
            MsgAssignSuccess: 'Catégories ajoutées avec succès',
            MsgAssignError: 'Assign categories call in error',
            MsgConfirmDelete:
              'Voulez-vous vraiment supprimer ce recipient?  Ce processus ne peut pas être annulé.',
            MsgConfirmDeleteMulti:
              'Voulez-vous vraiment supprimer ces recipients?  Ce processus ne peut pas être annulé.'
          },
          AddEditRecipient: {
            TitleAdd: 'Ajouter un nouveau Recipient',
            TitleEdit: 'Modifier Recipient',
            FirstName: 'Prénom',
            LastName: 'Nom',
            Phone: 'Téléphone',
            Email: 'Email',
            Occupation: 'Occupation',
            Username: "Nom d'utilisateur",
            Categories: 'Catégories',
            ConfirmButton: 'Confirmer',
            CancelButton: 'Annuler',
            MsgSuccess: 'Recipient ajouté avec succès',
            MsgError: 'Erreur'
          },
          InviteRecipients: {
            Title: 'Inviter des Recipients',
            Label: 'Rechercher et inviter des recipients',
            Placeholder: 'Nouveau recipient...',
            Categories: 'Catégories',
            InviteButton: 'Inviter',
            CancelButton: 'Annuler',
            MsgSuccess: 'Recipients invités avec succès'
          },
          RecipientRequests: {
            Title: 'Demandes des Recipients reçues',
            Phone: 'Téléphone',
            DeleteButton: 'Supprimer',
            RowsSelected: 'rows selected',
            RowSelected: 'ligne sélectionnée'
          },
          AssignCategories: {
            Title: 'Attribuer une catégorie à :',
            Categories: 'Catégories',
            ConfirmButton: 'Sauvegarder',
            CancelButton: 'Annuler'
          },
          SendCredentials: {
            Title: 'Envoyer les info de connexion',
            Question:
              "Voulez-vous envoyer des informations de connexion à l'utilisateur que vous avez ajouté ?",
            ResponseYes: 'Oui',
            ResponseNo: 'Non',
            ConfirmButton: 'Envoyer',
            CancelButton: 'Annuler'
          },
          EmptyList: {
            Title: 'Bienvenue!',
            Description: "Il n'y a pas encore de recipient ajoutés",
            LabelButton: 'Ajouter Recipient'
          }
        }
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
            NewRecipient: 'Nouveau Recipient',
            InviteRecipients: 'Inviter Recipients',
            UploadRecipients: 'Télécharger Recipients',
            RecipientRequests: 'Demandes des Recipients'
          }
        }
      },
      BODY: {
        ViewRecipients: {
          Search: 'Chercher',
          Phone: 'Téléphone',
          DeleteButton: 'Supprimer',
          RequestButton: 'Demander',
          RowsSelected: 'lignes sélectionnées',
          RowSelected: 'ligne sélectionnée',
          ConfirmDelete: 'Es-tu sûr ?',
          ConfirmButton: 'Confirmer',
          CancelButton: 'Annuler',
          MsgDeleteSuccess: 'Recipient supprimé avec succès',
          MsgDeleteSuccessMulti: 'Recipients supprimés avec succès',
          MsgDeleteError: 'Delete recipient call in error',

          MsgAssignSuccess: 'Catégories demandées avec succès',
          MsgAssignError: 'Request categories call in error',
          MsgConfirmDelete:
            'Voulez-vous vraiment supprimer ce recipient?  Ce processus ne peut pas être annulé.',
          MsgConfirmDeleteMulti:
            'Voulez-vous vraiment supprimer ces recipients?  Ce processus ne peut pas être annulé.',
          NoData: 'pas de données',
          NoPhone: 'pas de téléphone',
          NoBirth: "pas d'anniversaire",
          Birthday: 'Date de naissance',
          Groups: 'Groupes',
          Categories: 'Catégories',
          Organizations: 'Organisations'
        },
        AddEditRecipient: {
          TitleAdd: 'Ajouter un nouveau Recipient',
          TitleEdit: 'Modifier Recipient',
          FirstName: 'Prénom',
          LastName: 'Nom',
          Phone: 'Téléphone',
          Email: 'E-mail',
          Occupation: 'Occupation',
          Username: "Nom d'utilisateur",
          ConfirmButton: 'Confirmer',
          CancelButton: 'Annuler',
          MsgSuccess: 'Recipient ajouté avec succès',
          MsgError: 'Recipient ajouté avec succès',
          MsgEditSuccess: 'Recipient mis à jour avec succès',
          MsgEditError: 'Update recipient call in error'
        },
        InviteRecipients: {
          Title: 'Inviter des Recipients',
          Label: 'Rechercher et inviter des recipients',
          Placeholder: 'Nouveau recipient...',
          InviteButton: 'Inviter',
          CancelButton: 'Annuler',
          MsgSuccess: 'Recipients invités avec succès'
        },
        RecipientRequests: {
          Title: 'Demandes de recipients reçues',
          Phone: 'Téléphone',
          RequestDate: 'DATE DE LA DEMANDE',
          AcceptButton: 'Accepter',
          RejectButton: 'Rejeter',
          RowsSelected: 'lignes sélectionnées',
          RowSelected: 'ligne sélectionnée',
          NoPhone: 'pas de téléphone',
          MsgSuccessAccept: 'Recipient accepté avec succès',
          MsgSuccessReject: 'Recipient rejeté avec succès'
        },
        RequestsCategories: {
          Title: 'Demande',
          Title_: 'Demande',
          Search: 'Chercher',
          Categories: 'Catégories',
          Groups: 'Groupes',
          Organizations: 'Organisations',
          NoData: 'pas de données',
          MsgRequestSuccess: 'Demandes envoyées avec succès',
          ConfirmButton: 'Demander',
          CancelButton: 'Annuler'
        },
        UploadRecipient: {
          Title: 'Télécharger Recipients'
        },
        SendCredentials: {
          Title: 'Envoyer les information de connexion',
          Question:
            "Voulez-vous envoyer des informations de connexion à l'utilisateur que vous avez ajouté ?",
          ResponseYes: 'Oui',
          ResponseNo: 'Non',
          ConfirmButton: 'Envoyer',
          CancelButton: 'Annuler',
          MsgSuccess: 'Informations envoyés avec succès'
        },
        EmptyList: {
          Title: 'Bienvenue!',
          Description: "Il n'y a pas encore de recipients ajoutés",
          LabelButton: 'Ajouter Recipient'
        }
      }
    },
    SUBUSER: {
      TITLEMAINPAGE: 'Sub issuers',
      BTNADDSUBISSUER: 'Nouveau sub issuer',
      BTNCANCEL: 'Annuler',
      BTNCONFIRM: 'Confirmer',
      ADD: 'Ajouter',
      FNAME: 'Prénom',
      LNAME: 'Nom de famille',
      EMAIL: 'Email',
      PHONE: 'Téléphone',
      POSITION: 'Position',
      PERMISSIONS: 'Autorisations',
      ERRORREQUIERD: 'Ce champ est requis',
      TITLEADDSUBISSUER: 'Ajouter un nouveau sub issuer',
      TITLEEDITSUBISSUER: 'Modifier sub issuer N°: ',
      DELETE: 'Supprimer',
      EDIT: 'Modifier',
      ACTIONS: 'Actions',
      ROWSSELECTED: 'lignes sélectionnées',
      ROWSELECTED: 'ligne sélectionnée',
      ERRORPHONE: "S'il vous plaît entrer un téléphone valide",
      EMAILINVALID: 'Email invalide',
      SEARCH: 'Rechercher',
      SELECTOPTION: 'Sélectionner une position',
      TITLECONFIRM: 'Êtes-vous sûr ?',
      MSGCONFIRM:
        'Voulez-vous vraiment supprimer ce sub issuer? ce processus ne peut pas être annulé.',
      MSGCONFIRMDELETEMULTI:
        'Voulez-vous vraiment supprimer ces sub issuers? ce processus ne peut pas être annulé.'
    },
    VERIFIER: {
      DASHBOARD: {
        CARD: {
          STATISTICS: {
            Signers: 'Signataires',
            Recipients: 'Destinataires',
            Categories: 'Catégories',
            Certificates: 'Certificats'
          }
        }
      },
      VERIFYCERTIFICATE: {
        Title: 'Vérifier le certificat',
        VerifyInput: "Veuillez saisir l'ID du certificat",
        ButtonLabel: 'Chercher'
      }
    },
    ADMIN: {
      DASHBOARD: {
        CARD: {
          STATISTICS: {
            Signers: 'Signataires',
            Recipients: 'Destinataires',
            Categories: 'Catégories',
            Certificates: 'Certificats'
          }
        }
      }
    },
    SIGNER: {
      DASHBOARD: {
        CARD: {
          STATISTICS: {
            Signers: 'Signataires',
            Recipients: 'Destinataires',
            Categories: 'Catégories',
            Certificates: 'Certificats'
          }
        }
      },
      CERTIFICATE: {
        REJECT: {
          HEADER: {
            Title: 'Certificats',
            SubTitle: 'rejeter le certificat'
          },
          BODY: {
            Alert: 'Le rejet du certificat ne peut pas être annulée',
            Reason: 'Raison',
            LeaveReason: 'Laisser une raison pour le rejet du certificat',
            MatHint: "Ne divulguez pas d'informations personnelles",
            MatError: 'Veuillez laisser une raison'
          },
          FOOTER: {
            CancelButton: 'Annuler',
            RejectButton: 'Révoquer'
          }
        }
      }
    },
    RECIPIENT: {
      DASHBOARD: {
        CARD: {
          STATISTICS: {
            Signers: 'Signataires',
            Recipients: 'Destinataires',
            Categories: 'Catégories',
            Certificates: 'Certificats'
          }
        }
      },
      CERTIFICATES: {
        LISTITEL: 'List des Certificates',
        NAME: 'nom',
        CERTIFICATE_ID: 'ID de certificat',
        RECIPIENT_ID: 'Identifiant du destinataire',
        RECIPIENT: '	destinataire',
        ISSUER: '	ISSUER',
        STATE: '	STATu',
        CATEGORY: 'CATÉGORIE',
        ORGANIZATION: 'ORGANIZATION',
        CONFIRM: 'Confirmer',
        CANCEL: 'annuler',
        REMOVE: 'Supprimer ',
        CLOSE: 'fermer ',
        SAVE: 'enregistrer ',
        SEARCH: 'Chercher',

        CONFIRM_DELET: 'OUI,Suprimer'
      }
    },
    ERROR: {
      TOKEN: {
        EXPIRED: 'Session expirée, veuillez-vous reconnecter.',
        BAD_CREDENTIALS: 'Utilisateur invalide, veuillez-vous reconnecter.'
      }
    },
    REGISTRATION: {
      SINGUP: " S'inscrire",
      SINGUPASUSER: " Inscrivez-vous en tant qu'utilisateur",
      SINGUPASORG: "Inscrivez-vous en tant qu'organisation",
      SIGNUP_MESSAGE: 'Saisir vos coordonnées pour créer votre compte',
      PHONE: 'Téléphoner',
      PASSWORD: 'Mot de passe',
      CPASSWORD: 'Confirmez le mot de passe',
      NEXT: 'Suivante',
      CANCEL: 'Annuler',
      FNAM: 'Prénom',
      LNAM: 'Nom de famille',
      BIRTHD: 'Date de naissance',
      PW_CPW_MATCH:
        'Mot de passe et Confirmer le mot de passe ne correspondent pas.',
      AGREE: "J'accepte",
      CONDITION: ' les termes et conditions',
      PREVIOUS: 'Précédent',
      SUBMIT: 'Enregistrer',
      SROLE: 'Sélectionnez votre rôle',
      ROLE: 'Role',
      SUBMITERROR: "Les détails d'inscription sont incorrects",
      PHONEMAILREQ: 'téléphone ou e-mail est requis',
      EMAILVALIDATIONERR: 'Le courriel est invalide',
      ORGNAME: "Nom de l'Organization ",
      COUNTRY: 'Pays',
      CITY: 'Ville',
      POSTCODE: 'Code Postal',
      SECTOR: 'Secteur',
      USERNAME: "nom d'Utilisateur"
    },
    ORGANIZATION: {
      SUBMITBUTTON: 'Soumettre',
      CANCELBUTTON: 'Annuler',
      USERS: {
        AMPRYPAGE: {
          TITLE: 'Bienvenue!',
          DESC:
            "Il n'y a pas encore d'utilisateurs ajoutés ! " +
            '\n' +
            'Démarrez votre activité en ajoutant votre premier utilisateur.',
          BUTTONLABEL: 'Ajouter un utilisateur'
        },
        LISTING: {
          TITLE: 'Liste des utilisateurs',
          SEARSH: 'Rechercher',
          FILTER: 'Filtrer par le role',
          INVITE: 'Inviter des utilisateurs'
        },
        ADDUSER: {
          DATEOFBIRTH: 'Date de naissance',
          SELECTGROUP: 'Sélectionnez le groupe',
          SELECTGROUPS: 'Sélectionnez les groupes',
          SELECTCATS: 'Sélectionnez les categories',
          ADDBUTTON: 'Ajouter',
          UPDATEBUTTON: 'mettre à jour',
          ADDTITLE: 'Ajouter un nouvel utilisateur',
          UPDATETITLE: 'Mettre à jour utilisateur',
          CONFIRM: 'Soumettre'
        },
        AFFECT: {
          TITLE: 'Affecter un utilisateur à un groupe',
          INFOS: "Informations sur l'utilisateur "
        },
        INVITE: {
          TITLE: 'Inviter des utilisateurs',
          SEARcH: 'Rechercher un utilisateur',
          searchplaceholder:
            'Rechercher un utilisateur par Nom, Prénom et Rôle.',
          NODATA: 'Aucun enregistrement trouvé !'
        },
        view: {
          USER: 'Utilisateur',
          PHONE: 'Téléphone',
          BIRTHDAY: 'Date de Naissance',
          EDIT: 'Modifier un utilisateur',
          DELETE: 'Dissocier un utilisateur',
          ACCTIVATE: 'Activer le compte',
          DEACTIVATE: 'Désactiver le compte',
          IMPERSONATE: 'Imiter ',
          AFFECT: 'Affecter a un group',
          STATE: 'État du compte',
          ACTIVE: 'Actif',
          BLOCKED: 'Bloqué',
          PENDING: 'En attente'
        },
        DELETEMODAL: {
          TITLE: "Dissocier l'utilisateur ",
          MESSAGE:
            'Veuillez confirmer que vous voulez dissocier cet utilisateur !',
          CANCEL: 'Annuler',
          CONFIRM: 'Confirmer',
          WAIT: 'En cours de traitement . . .'
        },
        ChangeStateModal: {
          TITLE: 'Change Accounts State ',
          MESSAGEACTIVATE:
            'Veuillez confirmer que vous voulez activer ce compte.',
          MESSAGEDEACTIVATE:
            'Veuillez confirmer que vous voulez désactiver ce compte',
          CANCEL: 'Annuler',
          CONFIRM: 'Confirmer',
          WAIT: 'En cours de traitement . . .'
        }
      },
      REQUESTS: {
        EMPTYPAGE: {
          TITLE: 'Bienvenue!',
          DESC: "Il n'y a pas encore de demandes d'émetteurs ! "
        },
        LISTING: {
          TITLE: "Liste des demandes d'émetteurs",
          ISSUER: 'Émetteur',
          PHONE: 'Téléphone',
          REQUESTDATE: 'Date de la demande',
          ACCEPT: 'Accepter la demande',
          REJECT: 'Refuser la demande'
        },
        ACCEPTMODAL: {
          TITLE: 'Accepter la demande',
          MESSAGE:
            'Veuillez confirmer que vous voulez accepter cette demande !',
          CANCEL: 'Annuler',
          CONFIRM: 'Confirmer',
          WAIT: 'En cours de traitement . . .'
        },
        REFUSEMODAL: {
          TITLE: 'Refuser la demande',
          MESSAGE: 'Veuillez confirmer que vous voulez refuser cette demande !',
          CANCEL: 'Annuler',
          CONFIRM: 'Confirmer',
          WAIT: 'En cours de traitement . . .'
        }
      },
      GROUPS: {
        LISTING: {
          GROUPS: 'Liste des groupes',
          SEARCH: 'Rechercher',
          FILTER: 'Filtrer',
          NAME: 'Nom',
          ISSUER: 'Émetteur',
          RECIPIENTS: 'Destinataires',
          SIGNERS: 'Signataires',
          CREDIT: 'Crédit',
          EDITGROUP: 'Modifier ce groupe',
          DELETEGROUP: 'Supprimer ce groupe',
          SEND: 'Envoyer un crédit',
          CREATE: 'Créer un groupe'
        },
        FORM: {
          ADDTITLE: 'Ajouter un groupe',
          UPDATETITLE: 'Modifier un groupe',
          SENDCREDIT: 'Envoyer un crédit',
          INPUTS: {
            NAME: 'Nom',
            ISSUER: 'Émetteur',
            RECIPIENTS: 'Destinataires',
            SIGNERS: 'Signataires',
            GROUP: 'Groupe',
            CREDIT: 'Entrer le crédit',
            CREDITERROR: "Vous n'avez pas assez de crédit!"
          }
        },
        EMPTYPAGE: {
          TITLE: 'Bienvenue!',
          DESC: "Il n'y a pas encore de groupes ajoutés ! "
        },
        DELETEMODAL: {
          TITLE: 'Supprimer le groupe ',
          MESSAGE: 'Veuillez confirmer que vous voulez supprimer ce groupe !',
          CANCEL: 'Annuler',
          CONFIRM: 'Confirmer',
          WAIT: 'En cours de traitement . . .'
        }
      },
      FAQ: {
        FUNCTIONALITIES: 'Fonctionnalités',
        HOWITWORKS: ' Comment cela fonctionne-t-il ?',
        USERS: 'Utilisateurs',
        RESSOURCES: 'Ressources',
        ADMIN: {
          TITLE: "Admin de l'organisation",
          DESC: "L'administrateur de l'organisation se réfère à un ou plusieurs administrateurs, qui fournissent un soutien aux individus ou aux équipes, ils sont essentiels pour le bon fonctionnement de l'entreprise dans l'organisation.",
          D1: " Les utilisateurs de l'administration de l'organisation traitent les demandes d'émetteurs entrants, créent des groupes, attribuent des émetteurs et des signataires.",
          D2: 'Ils créent de nouveaux utilisateurs ou les invitent à rejoindre la communauté. Ils sont également responsables de la détermination des prix des packs pour les clients.'
        },
        ISSUER: {
          TITLE: 'Émetteur',
          DESC: 'Un émetteur est un individu approuvé appartenant à une institution privée ou publique qui est mise en place pour une cause éducative, religieuse, sociale ou professionnelle. ',
          D1: "Le rôle principal de l'émetteur est de créer un design de certificats, de représenter les informations relatives à son institution, en plus d'un ensemble de compétences et de qualifications acquises par le stagiaire pendant une période de formation et d'attribuer des catégories aux certificats créés.",
          D2: "L'émetteur peut télécharger plusieurs destinataires à partir d'un fichier excel/csv, inviter les destinataires à créer des comptes dans Doccerts, ou demander aux destinataires de recevoir des condidats pour recevoir leurs certificats ; il peut également ajouter des signataires pour signer les certificats."
        },
        SIGNER: {
          TITLE: 'Signataire',
          DESC: " Les signataires sont des membres de l'institution actuelle. Vous pouvez les considérer comme des jurés qui décident si un condidat maîtrise un ensemble de compétences et de qualifications, ou non.",
          D1: 'Les signataires sont responsables de la vérification et de la validation des compétences et des qualifications du stagiaire mentionnées dans le certificat par le destinataire.',
          D2: "Les signataires peuvent également signaler le retrait d'un certificat à un destinataire, sur la base d'une révision effectuée par l'institution."
        },
        RECIPIENT: {
          TITLE: 'Destinataire',
          DESC: "Un destinataire est un condidat qui reçoit un certificat de l'institution après avoir validé un ensemble de créations faites par les membres de l'institution.",
          D1: 'Un destinataire peut créer un compte en tant que destinataire et envoyer des demandes aux émetteurs, et recevoir des invitations des émetteurs également.',
          D2: 'Les destinataires qui reçoivent des certificats de leurs émetteurs peuvent lister leurs certificats, les visualiser et en imprimer des copies.'
        },
        VERIFIER: {
          TITLE: 'Vérificateur',
          DESC: "Un vérificateur peut être un individu ou un membre d'une entreprise, ou un recruteur, des ressources humaines, qui cherchent à améliorer les membres de leur équipe, dans différents domaines professionnels.",
          D1: "Les vérificateurs sont des utilisateurs de la plateforme Doccerts et bénéficient du système dans le sens où il les aide à accélérer le processus d'acquisition de talents.",
          D2: "Les vérificateurs utilisent les informations d'un certificat comme la clé publique des certificats pour vérifier l'authenticité du certificat appartenant à un destinataire qui est un candidat à l'embauche par exemple."
        },
        SUBUSER: {
          TITLE: 'Sous-utilisateur',
          DESC: "Un sous-émetteur est un émetteur qui a zéro ou plus de restriction sur ses rôles, l'émetteur peut déléguer certaines de ses tâches à un sous-émetteur.",
          D1: 'Attribuer des certificats aux destinataires et ajouter des destinataires en les invitant à rejoindre les doccerts.',
          D2: 'Créer de nouveaux utilisateurs ou les inviter à rejoindre la communauté, ils sont également responsables de la détermination des prix des packs pour les clients.'
        },
        CATEGORY: {
          TITLE: 'Catégorie',
          DESC: "Une catégorie représente un ensemble de coordonnées de certificats, qui peut être utilisé pour définir les champs nécessaires comme le champ du destinataire : prénom nom, image du destinataire, définir les champs du certificat comme le titre du certificat, la date d'expiration... ",
          D1: "Une catégorie détermine quel ensemble de champs nécessaires doivent être inclus lors de la conception du certificat, par exemple le champ titre, le champ date d'expiration, le champ date de livraison, le champ marque, le champ remarque du jury...",
          D2: "Avant de concevoir un certificat, vous commencez à créer une catégorie qui représente le champ nécessaire qui déterminera les informations incluses dans le certificat. Pendant la création de la conception du certificat, vous attribuez des valeurs réelles à ces champs. Une fois qu'une catégorie est créée, elle devient prête pour des utilisations futures, une catégorie peut être modifiée ou supprimée par un émetteur.Traduit avec www.DeepL.com/Translator (version gratuite)"
        },
        CERTIFICATE: {
          TITLE: 'Certificat',
          DESC: "Un certificat est un document numérique unique, signé numériquement, qui identifie de manière officielle l'identité d'un individu ou d'une organisation. En utilisant la cryptographie à clé publique, son authenticité peut être vérifiée pour assurer la légitimité du certificat. ",
          D1: 'Le certificat est émis par un groupe à un destinataire, le détenteur du certificat, et signé par une autorité de certification de confiance. Il est délivré avec une clé publique.',
          D2: "le certificat est vérifié avec la clé publique de l'autorité d'un détenteur de certificat ou d'un destinataire."
        },
        BLOCKCHAIN: {
          TITLE: 'Blockchain',
          DESC: "La technologie Blockchain est plus simplement définie comme un registre décentralisé et distribué qui enregistre la provenance d'un actif numérique. De par leur conception même, les données d'une blockchain ne peuvent être modifiées, ce qui en fait un élément perturbateur légitime pour des secteurs tels que les certifications, les paiements, la cybersécurité et les soins de santé.",
          D1: "Le but de l'utilisation d'une blockchain est de permettre aux gens - en particulier à ceux qui ne se font pas confiance - de partager des données précieuses de manière sûre et inviolable.",
          D2: "Les informations partagées sont protégées contre toute modification, ce qui signifie que toute altération serait facilement et immédiatement détectable. Pour cette raison, une fois qu'une information est enregistrée sur la blockchain, elle est considérée comme immuable car elle est fortement protégée."
        }
      },
      WALLET: {
        TITLE: 'Choisissez votre plan',
        SUBTITLE:
          "Si vous avez besoin de plus d'informations sur nos prix, veuillez consulter",
        LINK: 'Directives de tarification',
        MONTHLY: 'Mensuel',
        ANNUAL: 'Annuel',
        CERTIFICATE: 'Certificats',
        RECIPIENTACCOUNTS: 'Comptes du destinataire',
        SIGNERACCOUNTS: 'Comptes du signataire',
        BLOCKCHAIN: 'Blokchain Network',
        STORAGE: 'Stockage',
        CUSTOMARSUPPORT: 'Support client',
        BACKUP: 'Sauvegarde',
        SELECT: 'Sélectionnez',
        MONTH: 'Mois',
        YEAR: 'Année'
      },
      SUCCESSMESSAGES: {
        ADDSIGNER: 'Le signataire a été ajouté avec succès',
        UPDATESIGNER: 'Le signataire a été mis à jour avec succès',
        DELETESIGNER:
          "Le signataire a été retiré de l'organisation avec succès",
        ADDRECIPIENT: 'Le destinataire a été ajouté avec succès',
        UPDATERECIPIENT: 'Le destinataire a été mis à jour avec succès',
        DELETERECIPIENT:
          "Le destinataire a été retiré de l'organisation avec succès",
        ADDISSUER: "L'émetteur a été ajouté avec succès",
        UPDATEISSUER: "L'émetteur a été mis à jour avec succès",
        DELETEISSUER: "L'émetteur a été retiré de l'organisation avec succès",
        INVITEUSER: "L'utilisateur a été invité",
        AFFECT: "L'utilisateur a été mis à jour avec succès",
        IMPERSONATE: "Usurpation d'identité réussie",
        CHANGESTATE: "L'utilisateur a été mis à jour avec succès",
        CREDITSUCCESS: 'Crédits mis à jour avec succès',
        ADDGROUP: 'Le groupe a été ajouté avec succès',
        UPDAREGROUP: 'Le groupe a été mis à jour avec succès',
        DELETEGROUP: "Le groupe a été retiré de l'organisation avec succès",
        ACCEPTREQUEST: 'La demande a été acceptée avec succès',
        REJECTREQUEST: 'La demande a été rejetée avec succès'
      }
    },
    SHARED: {
      FULLRECIPIENTFIELDS: {
        SNACKBAR: {
          MsgFullSucces: 'Les champs du destinataire remplis avec succès',
          MsgFullError: 'Remplir les champs du destinataire appeler une erreur'
        },
        HEADER: {
          Title: 'Destinataire',
          SubTitle:
            'Complétez ce formulaire pour remplir les champs destinataire'
        },
        FOOTER: {
          CancelButton: 'Annuler',
          SubmitButton: 'Soumettre'
        }
      }
    },
    SERVER: {
      FORBIDDEN: {
        // 403
        title: 'INTERDIT',
        text: 'Accès non autorisé'
      },
      NOT_FOUND: {
        //404
        title: 'INTROUVABLE',
        text: 'Ressource demandée introuvable'
      },
      MAINTENANCE: {
        //i503
        title: 'MAINTENANCE',
        text: 'Application en cours de maintenance'
      },
      BUTTON_HOMEPAGE: "Page d'accueil"
    },
    USER_PROFILE: {
      ASSIDE_BAR: {
        chat: 'Chat',
        follow: 'Suivre',
        email: 'E-mail',
        phone: 'Téléphone',
        credits: 'Crédits',
        overview: 'Aperçu',
        accountSettings: 'Paramètres du compte',
        changePassword: 'Changer le mot de passe',
        blockChainIdentity: 'Identité Blockchain'
      },
      OVERVIEW: {
        PERSONAL_INFO: {
          HEADER: {
            title: 'Informations personnelles',
            subTitle: 'Afficher vos informations personnelles',
            btnEdit: 'Modifier'
          },
          BODY: {
            fullName: 'Nom et prénom',
            contactPhone: 'Numéro du contact',
            contactEmail: 'Email du contact',
            country: 'Pays',
            birthday: 'Date de naissance',
            communication: 'Communication',
            phoneTitle: 'Le numéro de téléphone doit être actif',
            countryTitle: "Pays d'origine"
          }
        },
        ORGANIZATION_INFO: {
          HEADER: {
            title: "Informations de l'organisation",
            subTitle: 'Afficher les informations de votre organisation',
            btnEdit: 'Modifier'
          },
          BODY: {
            name: 'Nom',
            address: 'Adresse',
            webSite: 'Site Web',
            sector: 'secteur'
          }
        }
      },
      PERSONAL_INFO: {
        HEADER: {
          title: 'Informations personnelles',
          subTitle: 'Mettre à jour vos informations personnelles',
          btnCancel: 'Annuler',
          btnSaveChange: 'Sauvegarder'
        },
        BODY: {
          btnUploadSignatur: 'Télécharger la signature',
          firstName: 'Prénom',
          lastName: 'Nom',
          birthday: 'Date de naissance',
          contactInfo: 'Informations de contact',
          email: 'E-mail',
          phone: 'Téléphone',
          msgSuccess: 'Vos informations personnelles ont été mises à jour',
          msgRequired: 'Champs requis',
          msgEtherEmaolOrPhone:
            'Vous devez entrer votre e-mail ou votre téléphone'
        }
      },
      ORGANIZATION_INFO: {
        HEADER: {
          title: "Informations de l'organisation",
          subTitle: 'mettre à jour les informations de votre organisation',
          btnSaveChange: 'Sauvegarder',
          btnCancel: 'Annuler'
        },
        BODY: {
          organizationName: "Nom de l'organisation",
          organizationNamePlaceholder: "Saisir le nom de l'organisation",
          address: 'Adresse',
          addressPlaceholder: "Entrer l'adresse",
          webSite: 'Site Web',
          webSitePlaceholder: 'Entrer sur le site Web',
          sector: 'Secteur',
          sectorPlaceholder: 'Entrer le secteur',
          areaCode: 'Àrea code',
          areaCodePlaceholder: 'Saisir Àrea code',

          institutionId: "Identifiant de l'établissement",
          institutionIdPlaceholder: "Saisir l'identifiant de l'établissement",
          msgSuccess:
            'Les informations de votre organisation ont été mises à jour'
        }
      },
      ACCOUNT_SETTINGS: {
        HEADER: {
          title: 'Paramètres du compte',
          subTitle: 'Mettre à jour les paramètres de votre compte',
          btnSaveChange: 'Sauvegarder',
          btnCancel: 'Annuler'
        },
        BODY: {
          accountNotification: 'Notification de compte',
          emailNotification: 'Notification par Email',
          phoneNotification: 'Notification par téléphone',
          security: 'Sécurité',
          loginVerification: 'Identification',
          passwordResetVerification: 'Réinitialisation du mot de passe',
          textLoginVerification:
            "L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte.  Pour vous connecter, vous devrez en plus fournir un code à 6 chiffres.",
          learnMore: 'Apprendre plus',
          checkboxText:
            'Exiger des informations personnelles pour réinitialiser votre mot de passe.',
          textPasswordReset:
            'Pour plus de sécurité, vous devez confirmer votre adresse e-mail ou votre numéro de téléphone lorsque vous réinitialisez votre mot de passe.',
          deactivateYourAccount: 'Désactiver votre compte?',
          msgSuccess: 'Les paramètres de votre compte ont été mis à jour'
        }
      },
      CHANGE_PASSWORD: {
        HEADER: {
          title: 'Changer le mot de passe',
          subTitle: 'Changer le mot de passe de votre compte',
          btnSaveChange: 'Sauvegarder',
          btnCancel: 'Annuler'
        },
        BODY: {
          textAlert: `Configurez les mots de passe utilisateur pour qu'ils expirent périodiquement.  Les utilisateurs devront être avertis que leurs mots de passe vont expirer, ou ils pourraient être bloqués par inadvertance hors du système!  Le mot de passe doit contenir au moins 8 caractères avec une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.`,
          currentPassword: 'Mot de passe actuel',
          newPassword: 'Nouveau mot de passe',
          confirmPassword: 'Confirmez le mot de passe',
          msgCurrentPasswordIncorrect: 'Ce mot de passe est incorrect !',
          msgSuccess: 'Votre mot de passe a été modifié avec succès.',
          msgInvalidPassword: `Assurez-vous que c'est au moins 8 caractères dont un chiffre et une lettre minuscule et une lettre majuscule et un caractère spécial`
        }
      },
      BLOCKCHAIN_IDENTITY: {
        HEADER: {
          title: 'Identité Blockchain',
          subTitle: 'Voir votre identité blockchain'
        },
        BODY: {
          PRIVATE: {
            title: 'Blockchain Privé',
            subTitle:
              'Générez votre clef pour commencer à émettre des certificats',
            btnGenerate: 'Générer',
            pleaseWait: 'Veuillez patenter...',
            afterWait: 'this feature will be coming soon',
            key: 'Clef',
            textCopy: 'Cliquez pour copier',
            msgCopier: 'Identité copiée dans le presse-papiers',
            msgGeneratedSuccessfully:
              'Clef privée Blockchain générée avec succès'
          },
          PUBLIC: {
            title: 'Blockchain Publique',
            subTitle:
              'Générez votre clef pour commencer à émettre des certificats',
            btnGenerate: 'Générer',
            pleaseWait: 'Veuillez patenter...',
            key: 'Clef',
            textCopy: 'Cliquez pour copier',
            msgCopier: 'Identité copiée dans le presse-papiers',
            msgGeneratedSuccessfully:
              'Clef publique Blockchain générée avec succès'
          }
        }
      }
    }
  }
};
