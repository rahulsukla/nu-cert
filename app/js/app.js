// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'App' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('App', [
  'ionic',
  'ngCordova',
  'ngAnimate',
  'nu.cert.templates'
  ])

  .run(['$ionicPlatform',

    function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    }
  ])

  .config(['$stateProvider',
           '$urlRouterProvider',
           '$ionicConfigProvider',
           '$compileProvider',
           function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {

    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content|ms-appx|x-wmapp0):|data:image\/|img\//);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);

    $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS());

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "templates/login.html",
            controller: 'LoginController'
        })
        .state('app', {
            url: '/app',
            abstract: true,
            controller: 'AppController',
            templateUrl: 'templates/menu.html'
        })
        .state('app.certificate', {
            url: "/certificate",
            cache: false,
            views: {
                viewContent: {
                  templateUrl: "templates/certificate.html",
                  controller: 'CertificateController'
                }
            }
        })

        .state('app.congratulations', {
            url: "/congratulations",
            cache: false,
            views: {
                viewContent: {
                  templateUrl: "templates/congratulations.html",
                  controller: 'CongratulationsController'
                }
            }
        })

        .state('app.scenario', {
            url: "/scenario",
            cache: false,
            views: {
                viewContent: {
                  templateUrl: "templates/scenario.html",
                  controller: 'ScenarioController'
                }
            }
        })
        .state('app.certifications', {
            url: "/certifications",
            cache: false,
            views: {
                viewContent: {
                  templateUrl: "templates/certifications.html",
                  controller: 'CertificationsController'
                }
            }
        })

        .state('app.endObjective', {
            url: "/end-objective",
            cache: false,
            views: {
                viewContent: {
                  templateUrl: "templates/end-objective.html",
                  controller: 'EndObjectiveController'
                }
            }
        })

        .state('app.selectModule', {
           url: "/selectmodule",
           cache: false,
           views: {
               viewContent: {
                  templateUrl: "templates/select-module.html",
                  controller: 'SelectModuleController'
               }
           }
        })

        .state('app.item', {
            url: "/item/{title}",
            params: {
                color: null,
                icon: null
            },
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/item.html",
                    controller: 'ItemController'
                }
            }
        });

    $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get("$state");
        $state.go("home");
    });
}]);
