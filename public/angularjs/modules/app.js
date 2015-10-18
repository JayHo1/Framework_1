
var app = angular.module('myApp', ['pascalprecht.translate']);


app.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    TITLE: 'Sign In',
    BIO: 'Biography',
    BUTTON_LANG_EN: 'English',
    BUTTON_LANG_FR: 'French'
  });
  $translateProvider.translations('fr', {
    TITLE: 'Se Connecter',
    BIO: 'Biographie',
    BUTTON_LANG_EN: 'Anglais',
    BUTTON_LANG_FR: 'Français'
  });
  	$translateProvider.preferredLanguage('en');
});

app.controller('Ctrl', function ($scope, $translate) {

  $scope.changeLanguage = function (key) {
    $translate.use(key);
  }
});
