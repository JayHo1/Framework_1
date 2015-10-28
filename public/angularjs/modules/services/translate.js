angular.module('Framework')
	.config(function ($translateProvider) {
	  $translateProvider.translations('en', {

	  	//**** Index

	  	INDEX_LOGIN		: 'Login',
		INDEX_REGISTER	: 'Register',
		INDEX_SIGNIN	: 'Sign In',
		INDEX_BIO		: 'Biography',
		INDEX_SIGNUP	: 'Sign Up',
		INDEX_CANCEL	: 'Cancel',
		PLH_USER		: '  Username',
		PLH_PASS		: '  Password',
		PLH_FIRST		: '  First name',
		PLH_LAST		: '  Last name',
		PLH_EMAIL		: '  Email',

		//**** Home

		HOME_EDIT		: 'Edit',
		HOME_LOGOUT		: 'Log out',
		HOME_MAILBOX	: 'Mailbox',
		HOME_COUNT		: {d: 'Days', h: 'Hours', m: 'Minutes', s: 'Seconds'},
		HOME_META		: {WRITE: 'Written by ', STATUS: 'Being solved' },
		GROUP			: 'Group',

		//*** Forum

		FORUM_SRCH		: '   Search',
		FORUM_CNT		: '   Click here to start your new topic',
		FORUM_CT 		: 'Create Topic',
		FORUM_SHOW		: 'Show preview',
		FORUM_STAT		: 'Satistics',
		FORUM_NB		: {MEM: 'Members', THR: 'Threads', REP: 'Replies'},
		FORUM_CTG		: 'Categories',
		FORUM_TOP		: 'Hot Topics',
		FORUM_HU		: 'Top Users',

		//*** Ticket

		TICKET_HOME		: 'Home',
		TICKET_LOGOUT	: 'Log Out',

	    BUTTON_LANG_EN 	: 'English',
	    BUTTON_LANG_FR	: 'French'
	  });
	  $translateProvider.translations('fr', {

	  	//**** Index

	  	INDEX_LOGIN		: 'S\'indentifier',
	    INDEX_REGISTER	: 'Créer un compte',
		INDEX_SIGNIN	: 'Se connecter',
		INDEX_BIO		: 'Biographie',
		INDEX_CANCEL	: 'Annuler',
		INDEX_SIGNUP	: 'Inscription',
		PLH_USER		: '  Nom d\'utilisateur',
		PLH_PASS		: '  Mot de passe',
		PLH_FIRST		: '  Prénom',
		PLH_LAST		: '  Nom',
		PLH_EMAIL		: '  Email',

		//**** Home

		HOME_EDIT		: 'Modifier',
		HOME_LOGOUT		: 'Déconnecter',
		HOME_MAILBOX	: 'Boîte Mail',
		HOME_COUNT		: {d: 'Jours', h: 'Heures', m: 'Minutes', s: 'Secondes'},
		HOME_META		: {WRITE: 'Ouvert par ', STATUS: 'En cours' },
		GROUP			: 'Groupe',

		//*** Forum

		FORUM_SRCH		: 'Recherche',
		FORUM_CNT		: 'Cliquez ici pour créer un nouveau sujet',
		FORUM_CT 		: 'Créer un sujet',
		FORUM_SHOW		: 'Aperçu',
		FORUM_STAT		: 'Statistiques',
		FORUM_NB		: {MEM: 'Membres', THR: 'Discussions', REP: 'Réponds'},
		FORUM_CTG		: 'Catégories',
		FORUM_TOP		: 'Chocolat Chaud',
		FORUM_HU		: 'Bonne gonzesse',

		//*** Ticket
		TICKET_HOME		: 'Connard',
		TICKET_LOGOUT	: 'Déconnecter',

	    BUTTON_LANG_EN	: 'Anglais',
	    BUTTON_LANG_FR	: 'Français'
	  });
  		$translateProvider.preferredLanguage('en');

  		$translateProvider.useCookieStorage();
	});