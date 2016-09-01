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

/* global ionic */
(function (angular, ionic) {
	"use strict";

	ionic.Platform.isIE = function () {
		return ionic.Platform.ua.toLowerCase().indexOf('trident') > -1;
	}

	if (ionic.Platform.isIE()) {
		angular.module('ionic')
			.factory('$ionicNgClick', ['$parse', '$timeout', function ($parse, $timeout) {
				return function (scope, element, clickExpr) {
					var clickHandler = angular.isFunction(clickExpr) ? clickExpr : $parse(clickExpr);

					element.on('click', function (event) {
						scope.$apply(function () {
							if (scope.clicktimer) return; // Second call
							clickHandler(scope, { $event: (event) });
							scope.clicktimer = $timeout(function () { delete scope.clicktimer; }, 1, false);
						});
					});

					// Hack for iOS Safari's benefit. It goes searching for onclick handlers and is liable to click
					// something else nearby.
					element.onclick = function (event) { };
				};
			}]);
	}

	function SelectDirective() {
		'use strict';

		return {
			restrict: 'E',
			replace: false,
			link: function (scope, element) {
				if (ionic.Platform && (ionic.Platform.isWindowsPhone() || ionic.Platform.isIE() || ionic.Platform.platform() === "edge")) {
					element.attr('data-tap-disabled', 'true');
				}
			}
		};
	}

	angular.module('ionic')
    .directive('select', SelectDirective);

	/*angular.module('ionic-datepicker')
	.directive('select', SelectDirective);*/

})(angular, ionic);
(function () {
 'use strict';

 angular
   .module('App')
   .constant('server_config', {
      'url': "localhost:8080/",
   });
})();
(function () {
    'use strict';

    angular
        .module('App')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$ionicPopover'];
    function AppController($scope, $ionicPopover) {

        $scope.certifications = [
            {
                color: "#E47500",
                icon: "ion-ionic",
                title: "Hello Ionic"
            },
            {
                color: "#5AD863",
                icon: "ion-social-html5",
                title: "HTML5"
            },
            {
                color: "#F8E548",
                icon: "ion-social-javascript",
                title: "JS"
            },
            {
                color: "#AD5CE9",
                icon: "ion-social-sass",
                title: "Sass"
            },
            {
                color: "#3DBEC9",
                icon: "ion-social-css3",
                title: "CSS3"
            },
            {
                color: "#D86B67",
                icon: "ion-social-angular",
                title: "Angular"
            }
        ];

        $scope.exitApp = function () {
            ionic.Platform.exitApp();
        };

        $ionicPopover.fromTemplateUrl('templates/modals/popover.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function ($event) {
            $scope.popover.show($event);
        };

        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
    }
})();

(function() {
'use strict';

  angular
    .module('App')
    .controller('CertificateController', CertificateController);

    CertificateController.$inject = ['$scope', '$state', '$ionicModal'];
    function CertificateController($scope, $state, $ionicModal) {

      $ionicModal.fromTemplateUrl('templates/modals/end-objective-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.openObjectiveModal = function() {
        $scope.modal.show();
      };

      $scope.closeModal = function() {
        $scope.modal.hide();
      };

      $scope.beginCertification = function() {
        $scope.modal.hide();
        $state.go('app.scenario')
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
    }
})();

(function() {
'use strict';

  angular
    .module('App')
    .controller('CertificationsController', CertificationsController);

    CertificationsController.$inject = ['$scope', '$state', 'certificationsService'];
    function CertificationsController($scope, $state, certificationsService) {
      $scope.certifications = null;

      activate();
      ////////////

      function activate() {
        certificationsService.getAllCertifications()
          .then(function(certifications){
            $scope.certifications = certifications;
          });
      }

      $scope.openItem = function(){
          $state.go('app.certificate');
      };

      $scope.selectCertification = function (certID) {
        $state.go('app.certifications', { certID: certID});
      }
    }
})();

(function() {
'use strict';

  angular
    .module('App')
    .controller('EndObjectiveController', EndObjectiveController);

    EndObjectiveController.$inject = ['$scope', '$state'];
    function EndObjectiveController($scope, $state) {
      $scope.beginCertification = function() {
        $state.go('app.scenario')
      };
    }
})();

(function() {
'use strict';

    angular
        .module('App')
        .controller('ItemController', ItemController);

    ItemController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory'];
    function ItemController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory) {
        
        $scope.item = {
            title: $stateParams.title,
            icon: $stateParams.icon,
            color: $stateParams.color
        };
        
        if (!$scope.item.color) {
            $ionicViewSwitcher.nextDirection('back');
            $ionicHistory.nextViewOptions({
                disableBack: true,
                disableAnimate : true,
                historyRoot  : true
            });
            $state.go('app.gallery');
        }
    }
})();
(function () {
	'use strict';

	angular
		.module('App')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$state', '$ionicPopup', 'Modals', 'Model', 'userProfileService'];
	function LoginController($scope, $state, $ionicPopup, Modals, Model, userProfileService) {
    $scope.userData = null;
    $scope.userData = {
      user_name: '',
      password: ''
    };
    $scope.submitting = false;
    $scope.invalidLogin = false;


    activate();
    ///////////

    function activate() {
      return userProfileService.fetchUserDetails()
        .then(function(){
          $state.go('app.certifications');
        });
    }

    $scope.login = function() {
      $scope.submiting = true;
      $scope.invalidLogin = false;
      userProfileService.login()
        .then(function(){
          $state.go('app.certifications');
          $scope.submiting = false
        })
        .catch(function(){
          $scope.invalidLogin = true;
        });
    }


	}
})();

(function() {
'use strict';

  angular
    .module('App')
    .controller('ScenarioController', ScenarioController);

    ScenarioController.$inject = ['$scope', '$state'];
    function ScenarioController($scope, $state) {
      // $scope.submit = function () {

      // }
    }
})();

(function () {
	'use strict';

	angular
		.module('App')
		.directive('holdList', holdList);

	holdList.$inject = ['$ionicGesture'];
	function holdList($ionicGesture) {

		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				$ionicGesture.on('hold', function (e) {

					var content = element[0].querySelector('.item-content');

					var buttons = element[0].querySelector('.item-options');
					var buttonsWidth = buttons.offsetWidth;

					ionic.requestAnimationFrame(function () {
						content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

						if (!buttons.classList.contains('invisible')) {
							content.style[ionic.CSS.TRANSFORM] = '';
							setTimeout(function () {
								buttons.classList.add('invisible');
							}, 250);
						} else {
							buttons.classList.remove('invisible');
							content.style[ionic.CSS.TRANSFORM] = 'translate3d(-' + buttonsWidth + 'px, 0, 0)';
						}
					});


				}, element);
			}
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.directive('ionMultipleSelect', ionMultipleSelect);

	ionMultipleSelect.$inject = ['$ionicModal', '$ionicGesture'];
	function ionMultipleSelect($ionicModal, $ionicGesture) {

		return {
			restrict: 'E',
			scope: {
				options: "="
			},
			controller: function ($scope, $element, $attrs) {
				$scope.multipleSelect = {
					title: $attrs.title || "Select Options",
					tempOptions: [],
					keyProperty: $attrs.keyProperty || "id",
					valueProperty: $attrs.valueProperty || "value",
					selectedProperty: $attrs.selectedProperty || "selected",
					templateUrl: $attrs.templateUrl || 'templates/multipleSelect.html',
					renderCheckbox: $attrs.renderCheckbox ? $attrs.renderCheckbox == "true" : true,
					animation: $attrs.animation || 'slide-in-up'
				};

				$scope.OpenModalFromTemplate = function (templateUrl) {
					$ionicModal.fromTemplateUrl(templateUrl, {
						scope: $scope,
						animation: $scope.multipleSelect.animation
					}).then(function (modal) {
						$scope.modal = modal;
						$scope.modal.show();
					});
				};

				$ionicGesture.on('tap', function (e) {
					$scope.multipleSelect.tempOptions = $scope.options.map(function (option) {
						var tempOption = {};
						tempOption[$scope.multipleSelect.keyProperty] = option[$scope.multipleSelect.keyProperty];
						tempOption[$scope.multipleSelect.valueProperty] = option[$scope.multipleSelect.valueProperty];
						tempOption[$scope.multipleSelect.selectedProperty] = option[$scope.multipleSelect.selectedProperty];

						return tempOption;
					});
					$scope.OpenModalFromTemplate($scope.multipleSelect.templateUrl);
				}, $element);

				$scope.saveOptions = function () {
					for (var i = 0; i < $scope.multipleSelect.tempOptions.length; i++) {
						var tempOption = $scope.multipleSelect.tempOptions[i];
						for (var j = 0; j < $scope.options.length; j++) {
							var option = $scope.options[j];
							if (tempOption[$scope.multipleSelect.keyProperty] == option[$scope.multipleSelect.keyProperty]) {
								option[$scope.multipleSelect.selectedProperty] = tempOption[$scope.multipleSelect.selectedProperty];
								break;
							}
						}
					}
					$scope.closeModal();
				};

				$scope.closeModal = function () {
					$scope.modal.remove();
				};
				$scope.$on('$destroy', function () {
					if ($scope.modal) {
						$scope.modal.remove();
					}
				});
			}
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.directive('ionSearchSelect', ionSearchSelect);

	ionSearchSelect.$inject = ['$ionicModal', '$ionicGesture'];
	function ionSearchSelect($ionicModal, $ionicGesture) {

		return {
			restrict: 'E',
			scope: {
				options: "=",
				optionSelected: "="
			},
			controller: function ($scope, $element, $attrs) {
				$scope.searchSelect = {
					title: $attrs.title || "Search",
					keyProperty: $attrs.keyProperty,
					valueProperty: $attrs.valueProperty,
					templateUrl: $attrs.templateUrl || 'templates/searchSelect.html',
					animation: $attrs.animation || 'slide-in-up',
					option: null,
					searchvalue: "",
					enableSearch: $attrs.enableSearch ? $attrs.enableSearch == "true" : true
				};

				$ionicGesture.on('tap', function (e) {

					if (!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty) {
						if ($scope.optionSelected) {
							$scope.searchSelect.option = $scope.optionSelected[$scope.searchSelect.keyProperty];
						}
					}
					else {
						$scope.searchSelect.option = $scope.optionSelected;
					}
					$scope.OpenModalFromTemplate($scope.searchSelect.templateUrl);
				}, $element);

				$scope.saveOption = function () {
					if (!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty) {
						for (var i = 0; i < $scope.options.length; i++) {
							var currentOption = $scope.options[i];
							if (currentOption[$scope.searchSelect.keyProperty] == $scope.searchSelect.option) {
								$scope.optionSelected = currentOption;
								break;
							}
						}
					}
					else {
						$scope.optionSelected = $scope.searchSelect.option;
					}
					$scope.searchSelect.searchvalue = "";
					$scope.modal.remove();
				};

				$scope.clearSearch = function () {
					$scope.searchSelect.searchvalue = "";
				};

				$scope.closeModal = function () {
					$scope.modal.remove();
				};
				$scope.$on('$destroy', function () {
					if ($scope.modal) {
						$scope.modal.remove();
					}
				});

				$scope.OpenModalFromTemplate = function (templateUrl) {
					$ionicModal.fromTemplateUrl(templateUrl, {
						scope: $scope,
						animation: $scope.searchSelect.animation
					}).then(function (modal) {
						$scope.modal = modal;
						$scope.modal.show();
					});
				};
			}
		};
	}
})();
(function () {
  'use strict';

  angular
    .module('App')
    .factory('certificationsService', certificationsService);

  certificationsService.$inject = ['$http'];
  function certificationsService($http) {

    return {
      getAllCertifications: function () {
        return $http.get('/app/certifications/')
          .then(function(response){
            return response.data;
          });
      }
    };
  }
})();

(function () {
	'use strict';

	angular
		.module('App')
		.factory('Modals', Modals);

	Modals.$inject = ['$ionicModal'];
	function Modals($ionicModal) {

		var modals = [];

		var _openModal = function ($scope, templateUrl, animation) {
			return $ionicModal.fromTemplateUrl(templateUrl, {
				scope: $scope,
				animation: animation || 'slide-in-up',
				backdropClickToClose: false
			}).then(function (modal) {
				modals.push(modal);
				modal.show();
			});
		};

		var _closeModal = function () {
			var currentModal = modals.splice(-1, 1)[0];
			currentModal.remove();
		};

		var _closeAllModals = function () {
			modals.map(function (modal) {
				modal.remove();
			});
			modals = [];
		};

		return {
			openModal: _openModal,
			closeModal: _closeModal,
			closeAllModals: _closeAllModals
		};
	}
})();

(function () {
	'use strict';

	angular
		.module('App')
		.factory('Model', Model);

	Model.$inject = ['Users'];
	function Model(Users) {

		return {
			Users: Users
		};
	}
})();
(function () {
  'use strict';

  angular
    .module('App')
    .factory('userProfileService', userProfileService);

  userProfileService.$inject = ['$http'];
  function userProfileService($http) {

    return {
      login: function (userConfig) {
        return $http.post('/login/', userConfig)
          .then(function(response){
            return response.data;
          });
      },

      fetchUserDetails: function() {
        return $http.get('/user-profile/')
          .then(function(response){
            return response.data;
          });
      }
    };
  }
})();

(function () {
	'use strict';

	angular
		.module('App')
		.factory('Users', Users);

	Users.$inject = [];
	function Users() {

		return {
			getAll: function () {
				return console.log("anything");
			}
		};
	}
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImlzc3Vlcy5qcyIsInNlcnZlci5jb25maWcuanMiLCJjb250cm9sbGVycy9hcHAuanMiLCJjb250cm9sbGVycy9jZXJ0aWZpY2F0ZS5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvY2VydGlmaWNhdGlvbnMuY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL2VuZC1vYmplY3RpdmUuY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL2l0ZW0uanMiLCJjb250cm9sbGVycy9sb2dpbi5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvc2NlbmFyaW8uY29udHJvbGxlci5qcyIsImRpcmVjdGl2ZXMvaG9sZExpc3QuanMiLCJkaXJlY3RpdmVzL211bHRpcGxlU2VsZWN0LmpzIiwiZGlyZWN0aXZlcy9zZWFyY2hTZWxlY3QuanMiLCJzZXJ2aWNlcy9jZXJ0aWZpY2F0aW9ucy5zZXJ2aWNlLmpzIiwic2VydmljZXMvbW9kYWxzLmpzIiwic2VydmljZXMvbW9kZWwuanMiLCJzZXJ2aWNlcy91c2VyLXByb2ZpbGUuc2VydmljZS5qcyIsInNlcnZpY2VzL3VzZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ0FwcCcgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcbmFuZ3VsYXIubW9kdWxlKCdBcHAnLCBbXG4gICdpb25pYycsXG4gICduZ0NvcmRvdmEnLFxuICAnbmdBbmltYXRlJyxcbiAgJ251LmNlcnQudGVtcGxhdGVzJ1xuICBdKVxuXG4gIC5ydW4oWyckaW9uaWNQbGF0Zm9ybScsXG5cbiAgICBmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAgICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICBdKVxuXG4gIC5jb25maWcoWyckc3RhdGVQcm92aWRlcicsXG4gICAgICAgICAgICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgICAgICAgICAnJGlvbmljQ29uZmlnUHJvdmlkZXInLFxuICAgICAgICAgICAnJGNvbXBpbGVQcm92aWRlcicsXG4gICAgICAgICAgIGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkaW9uaWNDb25maWdQcm92aWRlciwgJGNvbXBpbGVQcm92aWRlcikge1xuXG4gICAgJGNvbXBpbGVQcm92aWRlci5pbWdTcmNTYW5pdGl6YXRpb25XaGl0ZWxpc3QoL15cXHMqKGh0dHBzP3xmdHB8ZmlsZXxibG9ifGNvbnRlbnR8bXMtYXBweHx4LXdtYXBwMCk6fGRhdGE6aW1hZ2VcXC98aW1nXFwvLyk7XG4gICAgJGNvbXBpbGVQcm92aWRlci5hSHJlZlNhbml0aXphdGlvbldoaXRlbGlzdCgvXlxccyooaHR0cHM/fGZ0cHxtYWlsdG98ZmlsZXxnaHR0cHM/fG1zLWFwcHh8eC13bWFwcDApOi8pO1xuXG4gICAgJGlvbmljQ29uZmlnUHJvdmlkZXIuc2Nyb2xsaW5nLmpzU2Nyb2xsaW5nKGlvbmljLlBsYXRmb3JtLmlzSU9TKCkpO1xuXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICAgICAgdXJsOiBcIi9ob21lXCIsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvbG9naW4uaHRtbFwiLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ29udHJvbGxlcidcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgICB1cmw6ICcvYXBwJyxcbiAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0FwcENvbnRyb2xsZXInLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbWVudS5odG1sJ1xuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2FwcC5jZXJ0aWZpY2F0ZScsIHtcbiAgICAgICAgICAgIHVybDogXCIvY2VydGlmaWNhdGVcIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9jZXJ0aWZpY2F0ZS5odG1sXCIsXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ2VydGlmaWNhdGVDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5zY2VuYXJpbycsIHtcbiAgICAgICAgICAgIHVybDogXCIvc2NlbmFyaW9cIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9zY2VuYXJpby5odG1sXCIsXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnU2NlbmFyaW9Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5jZXJ0aWZpY2F0aW9ucycsIHtcbiAgICAgICAgICAgIHVybDogXCIvY2VydGlmaWNhdGlvbnNcIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9jZXJ0aWZpY2F0aW9ucy5odG1sXCIsXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ2VydGlmaWNhdGlvbnNDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5lbmRPYmplY3RpdmUnLCB7XG4gICAgICAgICAgICB1cmw6IFwiL2VuZC1vYmplY3RpdmVcIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9lbmQtb2JqZWN0aXZlLmh0bWxcIixcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdFbmRPYmplY3RpdmVDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5pdGVtJywge1xuICAgICAgICAgICAgdXJsOiBcIi9pdGVtL3t0aXRsZX1cIixcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBudWxsLFxuICAgICAgICAgICAgICAgIGljb246IG51bGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9pdGVtLmh0bWxcIixcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0l0ZW1Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKGZ1bmN0aW9uICgkaW5qZWN0b3IsICRsb2NhdGlvbikge1xuICAgICAgICB2YXIgJHN0YXRlID0gJGluamVjdG9yLmdldChcIiRzdGF0ZVwiKTtcbiAgICAgICAgJHN0YXRlLmdvKFwiaG9tZVwiKTtcbiAgICB9KTtcbn1dKTtcbiIsIi8qIGdsb2JhbCBpb25pYyAqL1xuKGZ1bmN0aW9uIChhbmd1bGFyLCBpb25pYykge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRpb25pYy5QbGF0Zm9ybS5pc0lFID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBpb25pYy5QbGF0Zm9ybS51YS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ3RyaWRlbnQnKSA+IC0xO1xuXHR9XG5cblx0aWYgKGlvbmljLlBsYXRmb3JtLmlzSUUoKSkge1xuXHRcdGFuZ3VsYXIubW9kdWxlKCdpb25pYycpXG5cdFx0XHQuZmFjdG9yeSgnJGlvbmljTmdDbGljaycsIFsnJHBhcnNlJywgJyR0aW1lb3V0JywgZnVuY3Rpb24gKCRwYXJzZSwgJHRpbWVvdXQpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgY2xpY2tFeHByKSB7XG5cdFx0XHRcdFx0dmFyIGNsaWNrSGFuZGxlciA9IGFuZ3VsYXIuaXNGdW5jdGlvbihjbGlja0V4cHIpID8gY2xpY2tFeHByIDogJHBhcnNlKGNsaWNrRXhwcik7XG5cblx0XHRcdFx0XHRlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdFx0c2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHNjb3BlLmNsaWNrdGltZXIpIHJldHVybjsgLy8gU2Vjb25kIGNhbGxcblx0XHRcdFx0XHRcdFx0Y2xpY2tIYW5kbGVyKHNjb3BlLCB7ICRldmVudDogKGV2ZW50KSB9KTtcblx0XHRcdFx0XHRcdFx0c2NvcGUuY2xpY2t0aW1lciA9ICR0aW1lb3V0KGZ1bmN0aW9uICgpIHsgZGVsZXRlIHNjb3BlLmNsaWNrdGltZXI7IH0sIDEsIGZhbHNlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0Ly8gSGFjayBmb3IgaU9TIFNhZmFyaSdzIGJlbmVmaXQuIEl0IGdvZXMgc2VhcmNoaW5nIGZvciBvbmNsaWNrIGhhbmRsZXJzIGFuZCBpcyBsaWFibGUgdG8gY2xpY2tcblx0XHRcdFx0XHQvLyBzb21ldGhpbmcgZWxzZSBuZWFyYnkuXG5cdFx0XHRcdFx0ZWxlbWVudC5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7IH07XG5cdFx0XHRcdH07XG5cdFx0XHR9XSk7XG5cdH1cblxuXHRmdW5jdGlvbiBTZWxlY3REaXJlY3RpdmUoKSB7XG5cdFx0J3VzZSBzdHJpY3QnO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0XHRyZXBsYWNlOiBmYWxzZSxcblx0XHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCkge1xuXHRcdFx0XHRpZiAoaW9uaWMuUGxhdGZvcm0gJiYgKGlvbmljLlBsYXRmb3JtLmlzV2luZG93c1Bob25lKCkgfHwgaW9uaWMuUGxhdGZvcm0uaXNJRSgpIHx8IGlvbmljLlBsYXRmb3JtLnBsYXRmb3JtKCkgPT09IFwiZWRnZVwiKSkge1xuXHRcdFx0XHRcdGVsZW1lbnQuYXR0cignZGF0YS10YXAtZGlzYWJsZWQnLCAndHJ1ZScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdGFuZ3VsYXIubW9kdWxlKCdpb25pYycpXG4gICAgLmRpcmVjdGl2ZSgnc2VsZWN0JywgU2VsZWN0RGlyZWN0aXZlKTtcblxuXHQvKmFuZ3VsYXIubW9kdWxlKCdpb25pYy1kYXRlcGlja2VyJylcblx0LmRpcmVjdGl2ZSgnc2VsZWN0JywgU2VsZWN0RGlyZWN0aXZlKTsqL1xuXG59KShhbmd1bGFyLCBpb25pYyk7IiwiKGZ1bmN0aW9uICgpIHtcbiAndXNlIHN0cmljdCc7XG5cbiBhbmd1bGFyXG4gICAubW9kdWxlKCdBcHAnKVxuICAgLmNvbnN0YW50KCdzZXJ2ZXJfY29uZmlnJywge1xuICAgICAgJ3VybCc6IFwibG9jYWxob3N0OjgwODAvXCIsXG4gICB9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ0FwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdBcHBDb250cm9sbGVyJywgQXBwQ29udHJvbGxlcik7XG5cbiAgICBBcHBDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckaW9uaWNQb3BvdmVyJ107XG4gICAgZnVuY3Rpb24gQXBwQ29udHJvbGxlcigkc2NvcGUsICRpb25pY1BvcG92ZXIpIHtcblxuICAgICAgICAkc2NvcGUuY2VydGlmaWNhdGlvbnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sb3I6IFwiI0U0NzUwMFwiLFxuICAgICAgICAgICAgICAgIGljb246IFwiaW9uLWlvbmljXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiSGVsbG8gSW9uaWNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjNUFEODYzXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJpb24tc29jaWFsLWh0bWw1XCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiSFRNTDVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjRjhFNTQ4XCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJpb24tc29jaWFsLWphdmFzY3JpcHRcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJKU1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNBRDVDRTlcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcImlvbi1zb2NpYWwtc2Fzc1wiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlNhc3NcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjM0RCRUM5XCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJpb24tc29jaWFsLWNzczNcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJDU1MzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sb3I6IFwiI0Q4NkI2N1wiLFxuICAgICAgICAgICAgICAgIGljb246IFwiaW9uLXNvY2lhbC1hbmd1bGFyXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQW5ndWxhclwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgJHNjb3BlLmV4aXRBcHAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpb25pYy5QbGF0Zm9ybS5leGl0QXBwKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJGlvbmljUG9wb3Zlci5mcm9tVGVtcGxhdGVVcmwoJ3RlbXBsYXRlcy9tb2RhbHMvcG9wb3Zlci5odG1sJywge1xuICAgICAgICAgICAgc2NvcGU6ICRzY29wZVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChwb3BvdmVyKSB7XG4gICAgICAgICAgICAkc2NvcGUucG9wb3ZlciA9IHBvcG92ZXI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5vcGVuUG9wb3ZlciA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICRzY29wZS5wb3BvdmVyLnNob3coJGV2ZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLnBvcG92ZXIucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ0FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0NlcnRpZmljYXRlQ29udHJvbGxlcicsIENlcnRpZmljYXRlQ29udHJvbGxlcik7XG5cbiAgICBDZXJ0aWZpY2F0ZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRzdGF0ZScsICckaW9uaWNNb2RhbCddO1xuICAgIGZ1bmN0aW9uIENlcnRpZmljYXRlQ29udHJvbGxlcigkc2NvcGUsICRzdGF0ZSwgJGlvbmljTW9kYWwpIHtcblxuICAgICAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0ZW1wbGF0ZXMvbW9kYWxzL2VuZC1vYmplY3RpdmUtbW9kYWwuaHRtbCcsIHtcbiAgICAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgICAgYW5pbWF0aW9uOiAnc2xpZGUtaW4tdXAnXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICAgICAgfSk7XG5cbiAgICAgICRzY29wZS5vcGVuT2JqZWN0aXZlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuYmVnaW5DZXJ0aWZpY2F0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gICAgICAgICRzdGF0ZS5nbygnYXBwLnNjZW5hcmlvJylcbiAgICAgIH07XG4gICAgICAvLyBDbGVhbnVwIHRoZSBtb2RhbCB3aGVuIHdlJ3JlIGRvbmUgd2l0aCBpdCFcbiAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5tb2RhbC5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ0FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0NlcnRpZmljYXRpb25zQ29udHJvbGxlcicsIENlcnRpZmljYXRpb25zQ29udHJvbGxlcik7XG5cbiAgICBDZXJ0aWZpY2F0aW9uc0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRzdGF0ZScsICdjZXJ0aWZpY2F0aW9uc1NlcnZpY2UnXTtcbiAgICBmdW5jdGlvbiBDZXJ0aWZpY2F0aW9uc0NvbnRyb2xsZXIoJHNjb3BlLCAkc3RhdGUsIGNlcnRpZmljYXRpb25zU2VydmljZSkge1xuICAgICAgJHNjb3BlLmNlcnRpZmljYXRpb25zID0gbnVsbDtcblxuICAgICAgYWN0aXZhdGUoKTtcbiAgICAgIC8vLy8vLy8vLy8vL1xuXG4gICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcbiAgICAgICAgY2VydGlmaWNhdGlvbnNTZXJ2aWNlLmdldEFsbENlcnRpZmljYXRpb25zKClcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihjZXJ0aWZpY2F0aW9ucyl7XG4gICAgICAgICAgICAkc2NvcGUuY2VydGlmaWNhdGlvbnMgPSBjZXJ0aWZpY2F0aW9ucztcbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgJHNjb3BlLm9wZW5JdGVtID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jZXJ0aWZpY2F0ZScpO1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLnNlbGVjdENlcnRpZmljYXRpb24gPSBmdW5jdGlvbiAoY2VydElEKSB7XG4gICAgICAgICRzdGF0ZS5nbygnYXBwLmNlcnRpZmljYXRpb25zJywgeyBjZXJ0SUQ6IGNlcnRJRH0pO1xuICAgICAgfVxuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ0FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0VuZE9iamVjdGl2ZUNvbnRyb2xsZXInLCBFbmRPYmplY3RpdmVDb250cm9sbGVyKTtcblxuICAgIEVuZE9iamVjdGl2ZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRzdGF0ZSddO1xuICAgIGZ1bmN0aW9uIEVuZE9iamVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkc3RhdGUpIHtcbiAgICAgICRzY29wZS5iZWdpbkNlcnRpZmljYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHN0YXRlLmdvKCdhcHAuc2NlbmFyaW8nKVxuICAgICAgfTtcbiAgICB9XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignSXRlbUNvbnRyb2xsZXInLCBJdGVtQ29udHJvbGxlcik7XG5cbiAgICBJdGVtQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHN0YXRlUGFyYW1zJywgJyRpb25pY1ZpZXdTd2l0Y2hlcicsICckc3RhdGUnLCAnJGlvbmljSGlzdG9yeSddO1xuICAgIGZ1bmN0aW9uIEl0ZW1Db250cm9sbGVyKCRzY29wZSwgJHN0YXRlUGFyYW1zLCAkaW9uaWNWaWV3U3dpdGNoZXIsICRzdGF0ZSwgJGlvbmljSGlzdG9yeSkge1xuICAgICAgICBcbiAgICAgICAgJHNjb3BlLml0ZW0gPSB7XG4gICAgICAgICAgICB0aXRsZTogJHN0YXRlUGFyYW1zLnRpdGxlLFxuICAgICAgICAgICAgaWNvbjogJHN0YXRlUGFyYW1zLmljb24sXG4gICAgICAgICAgICBjb2xvcjogJHN0YXRlUGFyYW1zLmNvbG9yXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBpZiAoISRzY29wZS5pdGVtLmNvbG9yKSB7XG4gICAgICAgICAgICAkaW9uaWNWaWV3U3dpdGNoZXIubmV4dERpcmVjdGlvbignYmFjaycpO1xuICAgICAgICAgICAgJGlvbmljSGlzdG9yeS5uZXh0Vmlld09wdGlvbnMoe1xuICAgICAgICAgICAgICAgIGRpc2FibGVCYWNrOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRpc2FibGVBbmltYXRlIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoaXN0b3J5Um9vdCAgOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmdhbGxlcnknKTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5jb250cm9sbGVyKCdMb2dpbkNvbnRyb2xsZXInLCBMb2dpbkNvbnRyb2xsZXIpO1xuXG5cdExvZ2luQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHN0YXRlJywgJyRpb25pY1BvcHVwJywgJ01vZGFscycsICdNb2RlbCcsICd1c2VyUHJvZmlsZVNlcnZpY2UnXTtcblx0ZnVuY3Rpb24gTG9naW5Db250cm9sbGVyKCRzY29wZSwgJHN0YXRlLCAkaW9uaWNQb3B1cCwgTW9kYWxzLCBNb2RlbCwgdXNlclByb2ZpbGVTZXJ2aWNlKSB7XG4gICAgJHNjb3BlLnVzZXJEYXRhID0gbnVsbDtcbiAgICAkc2NvcGUudXNlckRhdGEgPSB7XG4gICAgICB1c2VyX25hbWU6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnXG4gICAgfTtcbiAgICAkc2NvcGUuc3VibWl0dGluZyA9IGZhbHNlO1xuICAgICRzY29wZS5pbnZhbGlkTG9naW4gPSBmYWxzZTtcblxuXG4gICAgYWN0aXZhdGUoKTtcbiAgICAvLy8vLy8vLy8vL1xuXG4gICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gICAgICByZXR1cm4gdXNlclByb2ZpbGVTZXJ2aWNlLmZldGNoVXNlckRldGFpbHMoKVxuICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNlcnRpZmljYXRpb25zJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgJHNjb3BlLnN1Ym1pdGluZyA9IHRydWU7XG4gICAgICAkc2NvcGUuaW52YWxpZExvZ2luID0gZmFsc2U7XG4gICAgICB1c2VyUHJvZmlsZVNlcnZpY2UubG9naW4oKVxuICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICRzdGF0ZS5nbygnYXBwLmNlcnRpZmljYXRpb25zJyk7XG4gICAgICAgICAgJHNjb3BlLnN1Ym1pdGluZyA9IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbigpe1xuICAgICAgICAgICRzY29wZS5pbnZhbGlkTG9naW4gPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXHR9XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdBcHAnKVxuICAgIC5jb250cm9sbGVyKCdTY2VuYXJpb0NvbnRyb2xsZXInLCBTY2VuYXJpb0NvbnRyb2xsZXIpO1xuXG4gICAgU2NlbmFyaW9Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckc3RhdGUnXTtcbiAgICBmdW5jdGlvbiBTY2VuYXJpb0NvbnRyb2xsZXIoJHNjb3BlLCAkc3RhdGUpIHtcbiAgICAgIC8vICRzY29wZS5zdWJtaXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIC8vIH1cbiAgICB9XG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5kaXJlY3RpdmUoJ2hvbGRMaXN0JywgaG9sZExpc3QpO1xuXG5cdGhvbGRMaXN0LiRpbmplY3QgPSBbJyRpb25pY0dlc3R1cmUnXTtcblx0ZnVuY3Rpb24gaG9sZExpc3QoJGlvbmljR2VzdHVyZSkge1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnQScsXG5cdFx0XHRsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cdFx0XHRcdCRpb25pY0dlc3R1cmUub24oJ2hvbGQnLCBmdW5jdGlvbiAoZSkge1xuXG5cdFx0XHRcdFx0dmFyIGNvbnRlbnQgPSBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5pdGVtLWNvbnRlbnQnKTtcblxuXHRcdFx0XHRcdHZhciBidXR0b25zID0gZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcuaXRlbS1vcHRpb25zJyk7XG5cdFx0XHRcdFx0dmFyIGJ1dHRvbnNXaWR0aCA9IGJ1dHRvbnMub2Zmc2V0V2lkdGg7XG5cblx0XHRcdFx0XHRpb25pYy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0Y29udGVudC5zdHlsZVtpb25pYy5DU1MuVFJBTlNJVElPTl0gPSAnYWxsIGVhc2Utb3V0IC4yNXMnO1xuXG5cdFx0XHRcdFx0XHRpZiAoIWJ1dHRvbnMuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnZpc2libGUnKSkge1xuXHRcdFx0XHRcdFx0XHRjb250ZW50LnN0eWxlW2lvbmljLkNTUy5UUkFOU0ZPUk1dID0gJyc7XG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdGJ1dHRvbnMuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XG5cdFx0XHRcdFx0XHRcdH0sIDI1MCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRidXR0b25zLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xuXHRcdFx0XHRcdFx0XHRjb250ZW50LnN0eWxlW2lvbmljLkNTUy5UUkFOU0ZPUk1dID0gJ3RyYW5zbGF0ZTNkKC0nICsgYnV0dG9uc1dpZHRoICsgJ3B4LCAwLCAwKSc7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cblxuXHRcdFx0XHR9LCBlbGVtZW50KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuZGlyZWN0aXZlKCdpb25NdWx0aXBsZVNlbGVjdCcsIGlvbk11bHRpcGxlU2VsZWN0KTtcblxuXHRpb25NdWx0aXBsZVNlbGVjdC4kaW5qZWN0ID0gWyckaW9uaWNNb2RhbCcsICckaW9uaWNHZXN0dXJlJ107XG5cdGZ1bmN0aW9uIGlvbk11bHRpcGxlU2VsZWN0KCRpb25pY01vZGFsLCAkaW9uaWNHZXN0dXJlKSB7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdG9wdGlvbnM6IFwiPVwiXG5cdFx0XHR9LFxuXHRcdFx0Y29udHJvbGxlcjogZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuXHRcdFx0XHQkc2NvcGUubXVsdGlwbGVTZWxlY3QgPSB7XG5cdFx0XHRcdFx0dGl0bGU6ICRhdHRycy50aXRsZSB8fCBcIlNlbGVjdCBPcHRpb25zXCIsXG5cdFx0XHRcdFx0dGVtcE9wdGlvbnM6IFtdLFxuXHRcdFx0XHRcdGtleVByb3BlcnR5OiAkYXR0cnMua2V5UHJvcGVydHkgfHwgXCJpZFwiLFxuXHRcdFx0XHRcdHZhbHVlUHJvcGVydHk6ICRhdHRycy52YWx1ZVByb3BlcnR5IHx8IFwidmFsdWVcIixcblx0XHRcdFx0XHRzZWxlY3RlZFByb3BlcnR5OiAkYXR0cnMuc2VsZWN0ZWRQcm9wZXJ0eSB8fCBcInNlbGVjdGVkXCIsXG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6ICRhdHRycy50ZW1wbGF0ZVVybCB8fCAndGVtcGxhdGVzL211bHRpcGxlU2VsZWN0Lmh0bWwnLFxuXHRcdFx0XHRcdHJlbmRlckNoZWNrYm94OiAkYXR0cnMucmVuZGVyQ2hlY2tib3ggPyAkYXR0cnMucmVuZGVyQ2hlY2tib3ggPT0gXCJ0cnVlXCIgOiB0cnVlLFxuXHRcdFx0XHRcdGFuaW1hdGlvbjogJGF0dHJzLmFuaW1hdGlvbiB8fCAnc2xpZGUtaW4tdXAnXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0JHNjb3BlLk9wZW5Nb2RhbEZyb21UZW1wbGF0ZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZVVybCkge1xuXHRcdFx0XHRcdCRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCh0ZW1wbGF0ZVVybCwge1xuXHRcdFx0XHRcdFx0c2NvcGU6ICRzY29wZSxcblx0XHRcdFx0XHRcdGFuaW1hdGlvbjogJHNjb3BlLm11bHRpcGxlU2VsZWN0LmFuaW1hdGlvblxuXHRcdFx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKG1vZGFsKSB7XG5cdFx0XHRcdFx0XHQkc2NvcGUubW9kYWwgPSBtb2RhbDtcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbC5zaG93KCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0JGlvbmljR2VzdHVyZS5vbigndGFwJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHQkc2NvcGUubXVsdGlwbGVTZWxlY3QudGVtcE9wdGlvbnMgPSAkc2NvcGUub3B0aW9ucy5tYXAoZnVuY3Rpb24gKG9wdGlvbikge1xuXHRcdFx0XHRcdFx0dmFyIHRlbXBPcHRpb24gPSB7fTtcblx0XHRcdFx0XHRcdHRlbXBPcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LmtleVByb3BlcnR5XSA9IG9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Qua2V5UHJvcGVydHldO1xuXHRcdFx0XHRcdFx0dGVtcE9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3QudmFsdWVQcm9wZXJ0eV0gPSBvcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LnZhbHVlUHJvcGVydHldO1xuXHRcdFx0XHRcdFx0dGVtcE9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Quc2VsZWN0ZWRQcm9wZXJ0eV0gPSBvcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LnNlbGVjdGVkUHJvcGVydHldO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGVtcE9wdGlvbjtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQkc2NvcGUuT3Blbk1vZGFsRnJvbVRlbXBsYXRlKCRzY29wZS5tdWx0aXBsZVNlbGVjdC50ZW1wbGF0ZVVybCk7XG5cdFx0XHRcdH0sICRlbGVtZW50KTtcblxuXHRcdFx0XHQkc2NvcGUuc2F2ZU9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAkc2NvcGUubXVsdGlwbGVTZWxlY3QudGVtcE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdHZhciB0ZW1wT3B0aW9uID0gJHNjb3BlLm11bHRpcGxlU2VsZWN0LnRlbXBPcHRpb25zW2ldO1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCAkc2NvcGUub3B0aW9ucy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdFx0XHR2YXIgb3B0aW9uID0gJHNjb3BlLm9wdGlvbnNbal07XG5cdFx0XHRcdFx0XHRcdGlmICh0ZW1wT3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5rZXlQcm9wZXJ0eV0gPT0gb3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5rZXlQcm9wZXJ0eV0pIHtcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LnNlbGVjdGVkUHJvcGVydHldID0gdGVtcE9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Quc2VsZWN0ZWRQcm9wZXJ0eV07XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0JHNjb3BlLmNsb3NlTW9kYWwoKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdCRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmICgkc2NvcGUubW9kYWwpIHtcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbC5yZW1vdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5kaXJlY3RpdmUoJ2lvblNlYXJjaFNlbGVjdCcsIGlvblNlYXJjaFNlbGVjdCk7XG5cblx0aW9uU2VhcmNoU2VsZWN0LiRpbmplY3QgPSBbJyRpb25pY01vZGFsJywgJyRpb25pY0dlc3R1cmUnXTtcblx0ZnVuY3Rpb24gaW9uU2VhcmNoU2VsZWN0KCRpb25pY01vZGFsLCAkaW9uaWNHZXN0dXJlKSB7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdG9wdGlvbnM6IFwiPVwiLFxuXHRcdFx0XHRvcHRpb25TZWxlY3RlZDogXCI9XCJcblx0XHRcdH0sXG5cdFx0XHRjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG5cdFx0XHRcdCRzY29wZS5zZWFyY2hTZWxlY3QgPSB7XG5cdFx0XHRcdFx0dGl0bGU6ICRhdHRycy50aXRsZSB8fCBcIlNlYXJjaFwiLFxuXHRcdFx0XHRcdGtleVByb3BlcnR5OiAkYXR0cnMua2V5UHJvcGVydHksXG5cdFx0XHRcdFx0dmFsdWVQcm9wZXJ0eTogJGF0dHJzLnZhbHVlUHJvcGVydHksXG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6ICRhdHRycy50ZW1wbGF0ZVVybCB8fCAndGVtcGxhdGVzL3NlYXJjaFNlbGVjdC5odG1sJyxcblx0XHRcdFx0XHRhbmltYXRpb246ICRhdHRycy5hbmltYXRpb24gfHwgJ3NsaWRlLWluLXVwJyxcblx0XHRcdFx0XHRvcHRpb246IG51bGwsXG5cdFx0XHRcdFx0c2VhcmNodmFsdWU6IFwiXCIsXG5cdFx0XHRcdFx0ZW5hYmxlU2VhcmNoOiAkYXR0cnMuZW5hYmxlU2VhcmNoID8gJGF0dHJzLmVuYWJsZVNlYXJjaCA9PSBcInRydWVcIiA6IHRydWVcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQkaW9uaWNHZXN0dXJlLm9uKCd0YXAnLCBmdW5jdGlvbiAoZSkge1xuXG5cdFx0XHRcdFx0aWYgKCEhJHNjb3BlLnNlYXJjaFNlbGVjdC5rZXlQcm9wZXJ0eSAmJiAhISRzY29wZS5zZWFyY2hTZWxlY3QudmFsdWVQcm9wZXJ0eSkge1xuXHRcdFx0XHRcdFx0aWYgKCRzY29wZS5vcHRpb25TZWxlY3RlZCkge1xuXHRcdFx0XHRcdFx0XHQkc2NvcGUuc2VhcmNoU2VsZWN0Lm9wdGlvbiA9ICRzY29wZS5vcHRpb25TZWxlY3RlZFskc2NvcGUuc2VhcmNoU2VsZWN0LmtleVByb3BlcnR5XTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHQkc2NvcGUuc2VhcmNoU2VsZWN0Lm9wdGlvbiA9ICRzY29wZS5vcHRpb25TZWxlY3RlZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0JHNjb3BlLk9wZW5Nb2RhbEZyb21UZW1wbGF0ZSgkc2NvcGUuc2VhcmNoU2VsZWN0LnRlbXBsYXRlVXJsKTtcblx0XHRcdFx0fSwgJGVsZW1lbnQpO1xuXG5cdFx0XHRcdCRzY29wZS5zYXZlT3B0aW9uID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmICghISRzY29wZS5zZWFyY2hTZWxlY3Qua2V5UHJvcGVydHkgJiYgISEkc2NvcGUuc2VhcmNoU2VsZWN0LnZhbHVlUHJvcGVydHkpIHtcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgJHNjb3BlLm9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIGN1cnJlbnRPcHRpb24gPSAkc2NvcGUub3B0aW9uc1tpXTtcblx0XHRcdFx0XHRcdFx0aWYgKGN1cnJlbnRPcHRpb25bJHNjb3BlLnNlYXJjaFNlbGVjdC5rZXlQcm9wZXJ0eV0gPT0gJHNjb3BlLnNlYXJjaFNlbGVjdC5vcHRpb24pIHtcblx0XHRcdFx0XHRcdFx0XHQkc2NvcGUub3B0aW9uU2VsZWN0ZWQgPSBjdXJyZW50T3B0aW9uO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0JHNjb3BlLm9wdGlvblNlbGVjdGVkID0gJHNjb3BlLnNlYXJjaFNlbGVjdC5vcHRpb247XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCRzY29wZS5zZWFyY2hTZWxlY3Quc2VhcmNodmFsdWUgPSBcIlwiO1xuXHRcdFx0XHRcdCRzY29wZS5tb2RhbC5yZW1vdmUoKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQkc2NvcGUuY2xlYXJTZWFyY2ggPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JHNjb3BlLnNlYXJjaFNlbGVjdC5zZWFyY2h2YWx1ZSA9IFwiXCI7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0JHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHQkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZiAoJHNjb3BlLm1vZGFsKSB7XG5cdFx0XHRcdFx0XHQkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkc2NvcGUuT3Blbk1vZGFsRnJvbVRlbXBsYXRlID0gZnVuY3Rpb24gKHRlbXBsYXRlVXJsKSB7XG5cdFx0XHRcdFx0JGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKHRlbXBsYXRlVXJsLCB7XG5cdFx0XHRcdFx0XHRzY29wZTogJHNjb3BlLFxuXHRcdFx0XHRcdFx0YW5pbWF0aW9uOiAkc2NvcGUuc2VhcmNoU2VsZWN0LmFuaW1hdGlvblxuXHRcdFx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKG1vZGFsKSB7XG5cdFx0XHRcdFx0XHQkc2NvcGUubW9kYWwgPSBtb2RhbDtcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbC5zaG93KCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ0FwcCcpXG4gICAgLmZhY3RvcnkoJ2NlcnRpZmljYXRpb25zU2VydmljZScsIGNlcnRpZmljYXRpb25zU2VydmljZSk7XG5cbiAgY2VydGlmaWNhdGlvbnNTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJ107XG4gIGZ1bmN0aW9uIGNlcnRpZmljYXRpb25zU2VydmljZSgkaHR0cCkge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGdldEFsbENlcnRpZmljYXRpb25zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcHAvY2VydGlmaWNhdGlvbnMvJylcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5mYWN0b3J5KCdNb2RhbHMnLCBNb2RhbHMpO1xuXG5cdE1vZGFscy4kaW5qZWN0ID0gWyckaW9uaWNNb2RhbCddO1xuXHRmdW5jdGlvbiBNb2RhbHMoJGlvbmljTW9kYWwpIHtcblxuXHRcdHZhciBtb2RhbHMgPSBbXTtcblxuXHRcdHZhciBfb3Blbk1vZGFsID0gZnVuY3Rpb24gKCRzY29wZSwgdGVtcGxhdGVVcmwsIGFuaW1hdGlvbikge1xuXHRcdFx0cmV0dXJuICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCh0ZW1wbGF0ZVVybCwge1xuXHRcdFx0XHRzY29wZTogJHNjb3BlLFxuXHRcdFx0XHRhbmltYXRpb246IGFuaW1hdGlvbiB8fCAnc2xpZGUtaW4tdXAnLFxuXHRcdFx0XHRiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2Vcblx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKG1vZGFsKSB7XG5cdFx0XHRcdG1vZGFscy5wdXNoKG1vZGFsKTtcblx0XHRcdFx0bW9kYWwuc2hvdygpO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdHZhciBfY2xvc2VNb2RhbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBjdXJyZW50TW9kYWwgPSBtb2RhbHMuc3BsaWNlKC0xLCAxKVswXTtcblx0XHRcdGN1cnJlbnRNb2RhbC5yZW1vdmUoKTtcblx0XHR9O1xuXG5cdFx0dmFyIF9jbG9zZUFsbE1vZGFscyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdG1vZGFscy5tYXAoZnVuY3Rpb24gKG1vZGFsKSB7XG5cdFx0XHRcdG1vZGFsLnJlbW92ZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHRtb2RhbHMgPSBbXTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdG9wZW5Nb2RhbDogX29wZW5Nb2RhbCxcblx0XHRcdGNsb3NlTW9kYWw6IF9jbG9zZU1vZGFsLFxuXHRcdFx0Y2xvc2VBbGxNb2RhbHM6IF9jbG9zZUFsbE1vZGFsc1xuXHRcdH07XG5cdH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoJ0FwcCcpXG5cdFx0LmZhY3RvcnkoJ01vZGVsJywgTW9kZWwpO1xuXG5cdE1vZGVsLiRpbmplY3QgPSBbJ1VzZXJzJ107XG5cdGZ1bmN0aW9uIE1vZGVsKFVzZXJzKSB7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0VXNlcnM6IFVzZXJzXG5cdFx0fTtcblx0fVxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ0FwcCcpXG4gICAgLmZhY3RvcnkoJ3VzZXJQcm9maWxlU2VydmljZScsIHVzZXJQcm9maWxlU2VydmljZSk7XG5cbiAgdXNlclByb2ZpbGVTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJ107XG4gIGZ1bmN0aW9uIHVzZXJQcm9maWxlU2VydmljZSgkaHR0cCkge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxvZ2luOiBmdW5jdGlvbiAodXNlckNvbmZpZykge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2xvZ2luLycsIHVzZXJDb25maWcpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICBmZXRjaFVzZXJEZXRhaWxzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3VzZXItcHJvZmlsZS8nKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoJ0FwcCcpXG5cdFx0LmZhY3RvcnkoJ1VzZXJzJywgVXNlcnMpO1xuXG5cdFVzZXJzLiRpbmplY3QgPSBbXTtcblx0ZnVuY3Rpb24gVXNlcnMoKSB7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0Z2V0QWxsOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBjb25zb2xlLmxvZyhcImFueXRoaW5nXCIpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
