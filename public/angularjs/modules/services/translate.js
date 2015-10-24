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

	    BUTTON_LANG_EN	: 'Anglais',
	    BUTTON_LANG_FR	: 'Français'
	  });
  		$translateProvider.preferredLanguage('en');

  		$translateProvider.useCookieStorage();
	});