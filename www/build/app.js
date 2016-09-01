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

    CertificateController.$inject = ['$scope', '$state'];
    function CertificateController($scope, $state) {
      $scope.certificate = null;

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

      // activate();
      // ////////////

      // function activate() {
      //   certificationsService.getAllCertifications()
      //     .then(function(certifications){
      //       $scope.certifications = certifications;
      //     });
      // }

      $scope.openCertificate = function(){
          $state.go('app.certificate');
      };

      $scope.selectCertification = function () {
        $state.go('app.certifications');
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
      $scope.continueExam = function() {
        $state.go('app.selectModule')
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

    ScenarioController.$inject = ['$scope', '$state', '$ionicNavBarDelegate'];
    function ScenarioController($scope, $state, $ionicNavBarDelegate) {
      $ionicNavBarDelegate.showBackButton(false);
      $scope.searchString = '';
      $scope.questionCounter = 0;
      $scope.scenarios = [{"question":"You are now in a Datacenter which has an Empty Rack, a Flat Switch, a Laptop with a Foundation VM in it, and a Nutanix package.","error":"","hint":"open the package"},{"question":"The box contains NX-3450 Nodes with chassis in the boxes with required cables.","error":"","hint":"type some random"},{"question":"The box contains NX-3450 Nodes with chassis in the boxes with required cables.","error":"I don't know what you are saying","hint":"connect, mount or rack"},{"question":"The nodes have now been racked, what is next ?","error":"","hint":"image this or create foundation"},{"question":"No nodes are visible in the Block & Node config Page of foundation.","error":"","hint":"discover nodes or block"},{"question":"2 Blocks and 8 Nodes have now been discovered. However, we need 2 different clusters.","error":"","hint":"remove 1 block"},{"question":"Done! Only 1 block with 4 nodes has been selected for imaging.","error":"","hint":"next"},{"question":"Error on Foundation, global configuration page. Error: Global config: Fill in the empty value(s)","error":"","hint":"enter, IPs"},{"question":"IP address successfully configured. Node imaging page shows only 4.7 version available.","error":"","hint":"download"},{"question":"Which version","error":"","hint":"4.7.1"},{"question":"Download completed","error":"","hint":"upload"},{"question":"Upload completed. Version 4.7.1 is still not visible in the node imaging page.","error":"","hint":"refresh"},{"question":"4.7.1 is now visible. Foundation is in progress <10 second delay>. Cluster A is now created. Congratulations, Foundation is now completed. Cluster B is also imaged and ready.","error":"","hint":"completed","status":"completed"}];

      $scope.submitAnswer = function () {
        $scope.questionCounter = $scope.questionCounter + 1;
        $scope.searchString = '';
      };
    }
})();

(function() {
'use strict';

  angular
    .module('App')
    .controller('SelectModuleController', SelectModuleController);

    SelectModuleController.$inject = ['$scope', '$state'];
    function SelectModuleController($scope, $state) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImlzc3Vlcy5qcyIsInNlcnZlci5jb25maWcuanMiLCJjb250cm9sbGVycy9hcHAuanMiLCJjb250cm9sbGVycy9jZXJ0aWZpY2F0ZS5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvY2VydGlmaWNhdGlvbnMuY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL2VuZC1vYmplY3RpdmUuY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL2l0ZW0uanMiLCJjb250cm9sbGVycy9sb2dpbi5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvc2NlbmFyaW8uY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL3NlbGVjdC1tb2R1bGUuY29udHJvbGxlci5qcyIsImRpcmVjdGl2ZXMvaG9sZExpc3QuanMiLCJkaXJlY3RpdmVzL211bHRpcGxlU2VsZWN0LmpzIiwiZGlyZWN0aXZlcy9zZWFyY2hTZWxlY3QuanMiLCJzZXJ2aWNlcy9jZXJ0aWZpY2F0aW9ucy5zZXJ2aWNlLmpzIiwic2VydmljZXMvbW9kYWxzLmpzIiwic2VydmljZXMvbW9kZWwuanMiLCJzZXJ2aWNlcy91c2VyLXByb2ZpbGUuc2VydmljZS5qcyIsInNlcnZpY2VzL3VzZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ0FwcCcgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcbmFuZ3VsYXIubW9kdWxlKCdBcHAnLCBbXG4gICdpb25pYycsXG4gICduZ0NvcmRvdmEnLFxuICAnbmdBbmltYXRlJyxcbiAgJ251LmNlcnQudGVtcGxhdGVzJ1xuICBdKVxuXG4gIC5ydW4oWyckaW9uaWNQbGF0Zm9ybScsXG5cbiAgICBmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAgICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICBdKVxuXG4gIC5jb25maWcoWyckc3RhdGVQcm92aWRlcicsXG4gICAgICAgICAgICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgICAgICAgICAnJGlvbmljQ29uZmlnUHJvdmlkZXInLFxuICAgICAgICAgICAnJGNvbXBpbGVQcm92aWRlcicsXG4gICAgICAgICAgIGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkaW9uaWNDb25maWdQcm92aWRlciwgJGNvbXBpbGVQcm92aWRlcikge1xuXG4gICAgJGNvbXBpbGVQcm92aWRlci5pbWdTcmNTYW5pdGl6YXRpb25XaGl0ZWxpc3QoL15cXHMqKGh0dHBzP3xmdHB8ZmlsZXxibG9ifGNvbnRlbnR8bXMtYXBweHx4LXdtYXBwMCk6fGRhdGE6aW1hZ2VcXC98aW1nXFwvLyk7XG4gICAgJGNvbXBpbGVQcm92aWRlci5hSHJlZlNhbml0aXphdGlvbldoaXRlbGlzdCgvXlxccyooaHR0cHM/fGZ0cHxtYWlsdG98ZmlsZXxnaHR0cHM/fG1zLWFwcHh8eC13bWFwcDApOi8pO1xuXG4gICAgJGlvbmljQ29uZmlnUHJvdmlkZXIuc2Nyb2xsaW5nLmpzU2Nyb2xsaW5nKGlvbmljLlBsYXRmb3JtLmlzSU9TKCkpO1xuXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICAgICAgdXJsOiBcIi9ob21lXCIsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvbG9naW4uaHRtbFwiLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ29udHJvbGxlcidcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgICB1cmw6ICcvYXBwJyxcbiAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0FwcENvbnRyb2xsZXInLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbWVudS5odG1sJ1xuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2FwcC5jZXJ0aWZpY2F0ZScsIHtcbiAgICAgICAgICAgIHVybDogXCIvY2VydGlmaWNhdGVcIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9jZXJ0aWZpY2F0ZS5odG1sXCIsXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ2VydGlmaWNhdGVDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5zY2VuYXJpbycsIHtcbiAgICAgICAgICAgIHVybDogXCIvc2NlbmFyaW9cIixcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9zY2VuYXJpby5odG1sXCIsXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnU2NlbmFyaW9Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhcHAuY2VydGlmaWNhdGlvbnMnLCB7XG4gICAgICAgICAgICB1cmw6IFwiL2NlcnRpZmljYXRpb25zXCIsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvY2VydGlmaWNhdGlvbnMuaHRtbFwiLFxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NlcnRpZmljYXRpb25zQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdhcHAuZW5kT2JqZWN0aXZlJywge1xuICAgICAgICAgICAgdXJsOiBcIi9lbmQtb2JqZWN0aXZlXCIsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvZW5kLW9iamVjdGl2ZS5odG1sXCIsXG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnRW5kT2JqZWN0aXZlQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdhcHAuc2VsZWN0TW9kdWxlJywge1xuICAgICAgICAgICB1cmw6IFwiL3NlbGVjdG1vZHVsZVwiLFxuICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICB2aWV3Q29udGVudDoge1xuICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL3NlbGVjdC1tb2R1bGUuaHRtbFwiLFxuICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1NlbGVjdE1vZHVsZUNvbnRyb2xsZXInXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5pdGVtJywge1xuICAgICAgICAgICAgdXJsOiBcIi9pdGVtL3t0aXRsZX1cIixcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBudWxsLFxuICAgICAgICAgICAgICAgIGljb246IG51bGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9pdGVtLmh0bWxcIixcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0l0ZW1Db250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKGZ1bmN0aW9uICgkaW5qZWN0b3IsICRsb2NhdGlvbikge1xuICAgICAgICB2YXIgJHN0YXRlID0gJGluamVjdG9yLmdldChcIiRzdGF0ZVwiKTtcbiAgICAgICAgJHN0YXRlLmdvKFwiaG9tZVwiKTtcbiAgICB9KTtcbn1dKTtcbiIsIi8qIGdsb2JhbCBpb25pYyAqL1xuKGZ1bmN0aW9uIChhbmd1bGFyLCBpb25pYykge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRpb25pYy5QbGF0Zm9ybS5pc0lFID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBpb25pYy5QbGF0Zm9ybS51YS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ3RyaWRlbnQnKSA+IC0xO1xuXHR9XG5cblx0aWYgKGlvbmljLlBsYXRmb3JtLmlzSUUoKSkge1xuXHRcdGFuZ3VsYXIubW9kdWxlKCdpb25pYycpXG5cdFx0XHQuZmFjdG9yeSgnJGlvbmljTmdDbGljaycsIFsnJHBhcnNlJywgJyR0aW1lb3V0JywgZnVuY3Rpb24gKCRwYXJzZSwgJHRpbWVvdXQpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgY2xpY2tFeHByKSB7XG5cdFx0XHRcdFx0dmFyIGNsaWNrSGFuZGxlciA9IGFuZ3VsYXIuaXNGdW5jdGlvbihjbGlja0V4cHIpID8gY2xpY2tFeHByIDogJHBhcnNlKGNsaWNrRXhwcik7XG5cblx0XHRcdFx0XHRlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdFx0c2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHNjb3BlLmNsaWNrdGltZXIpIHJldHVybjsgLy8gU2Vjb25kIGNhbGxcblx0XHRcdFx0XHRcdFx0Y2xpY2tIYW5kbGVyKHNjb3BlLCB7ICRldmVudDogKGV2ZW50KSB9KTtcblx0XHRcdFx0XHRcdFx0c2NvcGUuY2xpY2t0aW1lciA9ICR0aW1lb3V0KGZ1bmN0aW9uICgpIHsgZGVsZXRlIHNjb3BlLmNsaWNrdGltZXI7IH0sIDEsIGZhbHNlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0Ly8gSGFjayBmb3IgaU9TIFNhZmFyaSdzIGJlbmVmaXQuIEl0IGdvZXMgc2VhcmNoaW5nIGZvciBvbmNsaWNrIGhhbmRsZXJzIGFuZCBpcyBsaWFibGUgdG8gY2xpY2tcblx0XHRcdFx0XHQvLyBzb21ldGhpbmcgZWxzZSBuZWFyYnkuXG5cdFx0XHRcdFx0ZWxlbWVudC5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7IH07XG5cdFx0XHRcdH07XG5cdFx0XHR9XSk7XG5cdH1cblxuXHRmdW5jdGlvbiBTZWxlY3REaXJlY3RpdmUoKSB7XG5cdFx0J3VzZSBzdHJpY3QnO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0XHRyZXBsYWNlOiBmYWxzZSxcblx0XHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCkge1xuXHRcdFx0XHRpZiAoaW9uaWMuUGxhdGZvcm0gJiYgKGlvbmljLlBsYXRmb3JtLmlzV2luZG93c1Bob25lKCkgfHwgaW9uaWMuUGxhdGZvcm0uaXNJRSgpIHx8IGlvbmljLlBsYXRmb3JtLnBsYXRmb3JtKCkgPT09IFwiZWRnZVwiKSkge1xuXHRcdFx0XHRcdGVsZW1lbnQuYXR0cignZGF0YS10YXAtZGlzYWJsZWQnLCAndHJ1ZScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdGFuZ3VsYXIubW9kdWxlKCdpb25pYycpXG4gICAgLmRpcmVjdGl2ZSgnc2VsZWN0JywgU2VsZWN0RGlyZWN0aXZlKTtcblxuXHQvKmFuZ3VsYXIubW9kdWxlKCdpb25pYy1kYXRlcGlja2VyJylcblx0LmRpcmVjdGl2ZSgnc2VsZWN0JywgU2VsZWN0RGlyZWN0aXZlKTsqL1xuXG59KShhbmd1bGFyLCBpb25pYyk7IiwiKGZ1bmN0aW9uICgpIHtcbiAndXNlIHN0cmljdCc7XG5cbiBhbmd1bGFyXG4gICAubW9kdWxlKCdBcHAnKVxuICAgLmNvbnN0YW50KCdzZXJ2ZXJfY29uZmlnJywge1xuICAgICAgJ3VybCc6IFwibG9jYWxob3N0OjgwODAvXCIsXG4gICB9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ0FwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdBcHBDb250cm9sbGVyJywgQXBwQ29udHJvbGxlcik7XG5cbiAgICBBcHBDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckaW9uaWNQb3BvdmVyJ107XG4gICAgZnVuY3Rpb24gQXBwQ29udHJvbGxlcigkc2NvcGUsICRpb25pY1BvcG92ZXIpIHtcblxuICAgICAgICAkc2NvcGUuY2VydGlmaWNhdGlvbnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sb3I6IFwiI0U0NzUwMFwiLFxuICAgICAgICAgICAgICAgIGljb246IFwiaW9uLWlvbmljXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiSGVsbG8gSW9uaWNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjNUFEODYzXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJpb24tc29jaWFsLWh0bWw1XCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiSFRNTDVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjRjhFNTQ4XCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJpb24tc29jaWFsLWphdmFzY3JpcHRcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJKU1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNBRDVDRTlcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcImlvbi1zb2NpYWwtc2Fzc1wiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlNhc3NcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjM0RCRUM5XCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJpb24tc29jaWFsLWNzczNcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJDU1MzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sb3I6IFwiI0Q4NkI2N1wiLFxuICAgICAgICAgICAgICAgIGljb246IFwiaW9uLXNvY2lhbC1hbmd1bGFyXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQW5ndWxhclwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgJHNjb3BlLmV4aXRBcHAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpb25pYy5QbGF0Zm9ybS5leGl0QXBwKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJGlvbmljUG9wb3Zlci5mcm9tVGVtcGxhdGVVcmwoJ3RlbXBsYXRlcy9tb2RhbHMvcG9wb3Zlci5odG1sJywge1xuICAgICAgICAgICAgc2NvcGU6ICRzY29wZVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChwb3BvdmVyKSB7XG4gICAgICAgICAgICAkc2NvcGUucG9wb3ZlciA9IHBvcG92ZXI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5vcGVuUG9wb3ZlciA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICRzY29wZS5wb3BvdmVyLnNob3coJGV2ZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLnBvcG92ZXIucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ0FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0NlcnRpZmljYXRlQ29udHJvbGxlcicsIENlcnRpZmljYXRlQ29udHJvbGxlcik7XG5cbiAgICBDZXJ0aWZpY2F0ZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRzdGF0ZSddO1xuICAgIGZ1bmN0aW9uIENlcnRpZmljYXRlQ29udHJvbGxlcigkc2NvcGUsICRzdGF0ZSkge1xuICAgICAgJHNjb3BlLmNlcnRpZmljYXRlID0gbnVsbDtcblxuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ0FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0NlcnRpZmljYXRpb25zQ29udHJvbGxlcicsIENlcnRpZmljYXRpb25zQ29udHJvbGxlcik7XG5cbiAgICBDZXJ0aWZpY2F0aW9uc0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRzdGF0ZScsICdjZXJ0aWZpY2F0aW9uc1NlcnZpY2UnXTtcbiAgICBmdW5jdGlvbiBDZXJ0aWZpY2F0aW9uc0NvbnRyb2xsZXIoJHNjb3BlLCAkc3RhdGUsIGNlcnRpZmljYXRpb25zU2VydmljZSkge1xuICAgICAgJHNjb3BlLmNlcnRpZmljYXRpb25zID0gbnVsbDtcblxuICAgICAgLy8gYWN0aXZhdGUoKTtcbiAgICAgIC8vIC8vLy8vLy8vLy8vL1xuXG4gICAgICAvLyBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcbiAgICAgIC8vICAgY2VydGlmaWNhdGlvbnNTZXJ2aWNlLmdldEFsbENlcnRpZmljYXRpb25zKClcbiAgICAgIC8vICAgICAudGhlbihmdW5jdGlvbihjZXJ0aWZpY2F0aW9ucyl7XG4gICAgICAvLyAgICAgICAkc2NvcGUuY2VydGlmaWNhdGlvbnMgPSBjZXJ0aWZpY2F0aW9ucztcbiAgICAgIC8vICAgICB9KTtcbiAgICAgIC8vIH1cblxuICAgICAgJHNjb3BlLm9wZW5DZXJ0aWZpY2F0ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJHN0YXRlLmdvKCdhcHAuY2VydGlmaWNhdGUnKTtcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5zZWxlY3RDZXJ0aWZpY2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jZXJ0aWZpY2F0aW9ucycpO1xuICAgICAgfVxuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ0FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0VuZE9iamVjdGl2ZUNvbnRyb2xsZXInLCBFbmRPYmplY3RpdmVDb250cm9sbGVyKTtcblxuICAgIEVuZE9iamVjdGl2ZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRzdGF0ZSddO1xuICAgIGZ1bmN0aW9uIEVuZE9iamVjdGl2ZUNvbnRyb2xsZXIoJHNjb3BlLCAkc3RhdGUpIHtcbiAgICAgICRzY29wZS5jb250aW51ZUV4YW0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHN0YXRlLmdvKCdhcHAuc2VsZWN0TW9kdWxlJylcbiAgICAgIH07XG4gICAgfVxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnQXBwJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0l0ZW1Db250cm9sbGVyJywgSXRlbUNvbnRyb2xsZXIpO1xuXG4gICAgSXRlbUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRzdGF0ZVBhcmFtcycsICckaW9uaWNWaWV3U3dpdGNoZXInLCAnJHN0YXRlJywgJyRpb25pY0hpc3RvcnknXTtcbiAgICBmdW5jdGlvbiBJdGVtQ29udHJvbGxlcigkc2NvcGUsICRzdGF0ZVBhcmFtcywgJGlvbmljVmlld1N3aXRjaGVyLCAkc3RhdGUsICRpb25pY0hpc3RvcnkpIHtcbiAgICAgICAgXG4gICAgICAgICRzY29wZS5pdGVtID0ge1xuICAgICAgICAgICAgdGl0bGU6ICRzdGF0ZVBhcmFtcy50aXRsZSxcbiAgICAgICAgICAgIGljb246ICRzdGF0ZVBhcmFtcy5pY29uLFxuICAgICAgICAgICAgY29sb3I6ICRzdGF0ZVBhcmFtcy5jb2xvclxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgaWYgKCEkc2NvcGUuaXRlbS5jb2xvcikge1xuICAgICAgICAgICAgJGlvbmljVmlld1N3aXRjaGVyLm5leHREaXJlY3Rpb24oJ2JhY2snKTtcbiAgICAgICAgICAgICRpb25pY0hpc3RvcnkubmV4dFZpZXdPcHRpb25zKHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlQmFjazogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlQW5pbWF0ZSA6IHRydWUsXG4gICAgICAgICAgICAgICAgaGlzdG9yeVJvb3QgIDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5nYWxsZXJ5Jyk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuY29udHJvbGxlcignTG9naW5Db250cm9sbGVyJywgTG9naW5Db250cm9sbGVyKTtcblxuXHRMb2dpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRzdGF0ZScsICckaW9uaWNQb3B1cCcsICdNb2RhbHMnLCAnTW9kZWwnLCAndXNlclByb2ZpbGVTZXJ2aWNlJ107XG5cdGZ1bmN0aW9uIExvZ2luQ29udHJvbGxlcigkc2NvcGUsICRzdGF0ZSwgJGlvbmljUG9wdXAsIE1vZGFscywgTW9kZWwsIHVzZXJQcm9maWxlU2VydmljZSkge1xuICAgICRzY29wZS51c2VyRGF0YSA9IG51bGw7XG4gICAgJHNjb3BlLnVzZXJEYXRhID0ge1xuICAgICAgdXNlcl9uYW1lOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJ1xuICAgIH07XG4gICAgJHNjb3BlLnN1Ym1pdHRpbmcgPSBmYWxzZTtcbiAgICAkc2NvcGUuaW52YWxpZExvZ2luID0gZmFsc2U7XG5cblxuICAgIGFjdGl2YXRlKCk7XG4gICAgLy8vLy8vLy8vLy9cblxuICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuICAgICAgcmV0dXJuIHVzZXJQcm9maWxlU2VydmljZS5mZXRjaFVzZXJEZXRhaWxzKClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jZXJ0aWZpY2F0aW9ucycpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5zdWJtaXRpbmcgPSB0cnVlO1xuICAgICAgJHNjb3BlLmludmFsaWRMb2dpbiA9IGZhbHNlO1xuICAgICAgdXNlclByb2ZpbGVTZXJ2aWNlLmxvZ2luKClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5jZXJ0aWZpY2F0aW9ucycpO1xuICAgICAgICAgICRzY29wZS5zdWJtaXRpbmcgPSBmYWxzZVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAkc2NvcGUuaW52YWxpZExvZ2luID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblx0fVxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnQXBwJylcbiAgICAuY29udHJvbGxlcignU2NlbmFyaW9Db250cm9sbGVyJywgU2NlbmFyaW9Db250cm9sbGVyKTtcblxuICAgIFNjZW5hcmlvQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHN0YXRlJywgJyRpb25pY05hdkJhckRlbGVnYXRlJ107XG4gICAgZnVuY3Rpb24gU2NlbmFyaW9Db250cm9sbGVyKCRzY29wZSwgJHN0YXRlLCAkaW9uaWNOYXZCYXJEZWxlZ2F0ZSkge1xuICAgICAgJGlvbmljTmF2QmFyRGVsZWdhdGUuc2hvd0JhY2tCdXR0b24oZmFsc2UpO1xuICAgICAgJHNjb3BlLnNlYXJjaFN0cmluZyA9ICcnO1xuICAgICAgJHNjb3BlLnF1ZXN0aW9uQ291bnRlciA9IDA7XG4gICAgICAkc2NvcGUuc2NlbmFyaW9zID0gW3tcInF1ZXN0aW9uXCI6XCJZb3UgYXJlIG5vdyBpbiBhIERhdGFjZW50ZXIgd2hpY2ggaGFzIGFuIEVtcHR5IFJhY2ssIGEgRmxhdCBTd2l0Y2gsIGEgTGFwdG9wIHdpdGggYSBGb3VuZGF0aW9uIFZNIGluIGl0LCBhbmQgYSBOdXRhbml4IHBhY2thZ2UuXCIsXCJlcnJvclwiOlwiXCIsXCJoaW50XCI6XCJvcGVuIHRoZSBwYWNrYWdlXCJ9LHtcInF1ZXN0aW9uXCI6XCJUaGUgYm94IGNvbnRhaW5zIE5YLTM0NTAgTm9kZXMgd2l0aCBjaGFzc2lzIGluIHRoZSBib3hlcyB3aXRoIHJlcXVpcmVkIGNhYmxlcy5cIixcImVycm9yXCI6XCJcIixcImhpbnRcIjpcInR5cGUgc29tZSByYW5kb21cIn0se1wicXVlc3Rpb25cIjpcIlRoZSBib3ggY29udGFpbnMgTlgtMzQ1MCBOb2RlcyB3aXRoIGNoYXNzaXMgaW4gdGhlIGJveGVzIHdpdGggcmVxdWlyZWQgY2FibGVzLlwiLFwiZXJyb3JcIjpcIkkgZG9uJ3Qga25vdyB3aGF0IHlvdSBhcmUgc2F5aW5nXCIsXCJoaW50XCI6XCJjb25uZWN0LCBtb3VudCBvciByYWNrXCJ9LHtcInF1ZXN0aW9uXCI6XCJUaGUgbm9kZXMgaGF2ZSBub3cgYmVlbiByYWNrZWQsIHdoYXQgaXMgbmV4dCA/XCIsXCJlcnJvclwiOlwiXCIsXCJoaW50XCI6XCJpbWFnZSB0aGlzIG9yIGNyZWF0ZSBmb3VuZGF0aW9uXCJ9LHtcInF1ZXN0aW9uXCI6XCJObyBub2RlcyBhcmUgdmlzaWJsZSBpbiB0aGUgQmxvY2sgJiBOb2RlIGNvbmZpZyBQYWdlIG9mIGZvdW5kYXRpb24uXCIsXCJlcnJvclwiOlwiXCIsXCJoaW50XCI6XCJkaXNjb3ZlciBub2RlcyBvciBibG9ja1wifSx7XCJxdWVzdGlvblwiOlwiMiBCbG9ja3MgYW5kIDggTm9kZXMgaGF2ZSBub3cgYmVlbiBkaXNjb3ZlcmVkLiBIb3dldmVyLCB3ZSBuZWVkIDIgZGlmZmVyZW50IGNsdXN0ZXJzLlwiLFwiZXJyb3JcIjpcIlwiLFwiaGludFwiOlwicmVtb3ZlIDEgYmxvY2tcIn0se1wicXVlc3Rpb25cIjpcIkRvbmUhIE9ubHkgMSBibG9jayB3aXRoIDQgbm9kZXMgaGFzIGJlZW4gc2VsZWN0ZWQgZm9yIGltYWdpbmcuXCIsXCJlcnJvclwiOlwiXCIsXCJoaW50XCI6XCJuZXh0XCJ9LHtcInF1ZXN0aW9uXCI6XCJFcnJvciBvbiBGb3VuZGF0aW9uLCBnbG9iYWwgY29uZmlndXJhdGlvbiBwYWdlLiBFcnJvcjogR2xvYmFsIGNvbmZpZzogRmlsbCBpbiB0aGUgZW1wdHkgdmFsdWUocylcIixcImVycm9yXCI6XCJcIixcImhpbnRcIjpcImVudGVyLCBJUHNcIn0se1wicXVlc3Rpb25cIjpcIklQIGFkZHJlc3Mgc3VjY2Vzc2Z1bGx5IGNvbmZpZ3VyZWQuIE5vZGUgaW1hZ2luZyBwYWdlIHNob3dzIG9ubHkgNC43IHZlcnNpb24gYXZhaWxhYmxlLlwiLFwiZXJyb3JcIjpcIlwiLFwiaGludFwiOlwiZG93bmxvYWRcIn0se1wicXVlc3Rpb25cIjpcIldoaWNoIHZlcnNpb25cIixcImVycm9yXCI6XCJcIixcImhpbnRcIjpcIjQuNy4xXCJ9LHtcInF1ZXN0aW9uXCI6XCJEb3dubG9hZCBjb21wbGV0ZWRcIixcImVycm9yXCI6XCJcIixcImhpbnRcIjpcInVwbG9hZFwifSx7XCJxdWVzdGlvblwiOlwiVXBsb2FkIGNvbXBsZXRlZC4gVmVyc2lvbiA0LjcuMSBpcyBzdGlsbCBub3QgdmlzaWJsZSBpbiB0aGUgbm9kZSBpbWFnaW5nIHBhZ2UuXCIsXCJlcnJvclwiOlwiXCIsXCJoaW50XCI6XCJyZWZyZXNoXCJ9LHtcInF1ZXN0aW9uXCI6XCI0LjcuMSBpcyBub3cgdmlzaWJsZS4gRm91bmRhdGlvbiBpcyBpbiBwcm9ncmVzcyA8MTAgc2Vjb25kIGRlbGF5Pi4gQ2x1c3RlciBBIGlzIG5vdyBjcmVhdGVkLiBDb25ncmF0dWxhdGlvbnMsIEZvdW5kYXRpb24gaXMgbm93IGNvbXBsZXRlZC4gQ2x1c3RlciBCIGlzIGFsc28gaW1hZ2VkIGFuZCByZWFkeS5cIixcImVycm9yXCI6XCJcIixcImhpbnRcIjpcImNvbXBsZXRlZFwiLFwic3RhdHVzXCI6XCJjb21wbGV0ZWRcIn1dO1xuXG4gICAgICAkc2NvcGUuc3VibWl0QW5zd2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkc2NvcGUucXVlc3Rpb25Db3VudGVyID0gJHNjb3BlLnF1ZXN0aW9uQ291bnRlciArIDE7XG4gICAgICAgICRzY29wZS5zZWFyY2hTdHJpbmcgPSAnJztcbiAgICAgIH07XG4gICAgfVxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnQXBwJylcbiAgICAuY29udHJvbGxlcignU2VsZWN0TW9kdWxlQ29udHJvbGxlcicsIFNlbGVjdE1vZHVsZUNvbnRyb2xsZXIpO1xuXG4gICAgU2VsZWN0TW9kdWxlQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHN0YXRlJ107XG4gICAgZnVuY3Rpb24gU2VsZWN0TW9kdWxlQ29udHJvbGxlcigkc2NvcGUsICRzdGF0ZSkge1xuICAgICAgLy8gJHNjb3BlLnN1Ym1pdCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgLy8gfVxuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoJ0FwcCcpXG5cdFx0LmRpcmVjdGl2ZSgnaG9sZExpc3QnLCBob2xkTGlzdCk7XG5cblx0aG9sZExpc3QuJGluamVjdCA9IFsnJGlvbmljR2VzdHVyZSddO1xuXHRmdW5jdGlvbiBob2xkTGlzdCgkaW9uaWNHZXN0dXJlKSB7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdBJyxcblx0XHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblx0XHRcdFx0JGlvbmljR2VzdHVyZS5vbignaG9sZCcsIGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0XHR2YXIgY29udGVudCA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLml0ZW0tY29udGVudCcpO1xuXG5cdFx0XHRcdFx0dmFyIGJ1dHRvbnMgPSBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5pdGVtLW9wdGlvbnMnKTtcblx0XHRcdFx0XHR2YXIgYnV0dG9uc1dpZHRoID0gYnV0dG9ucy5vZmZzZXRXaWR0aDtcblxuXHRcdFx0XHRcdGlvbmljLnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRjb250ZW50LnN0eWxlW2lvbmljLkNTUy5UUkFOU0lUSU9OXSA9ICdhbGwgZWFzZS1vdXQgLjI1cyc7XG5cblx0XHRcdFx0XHRcdGlmICghYnV0dG9ucy5jbGFzc0xpc3QuY29udGFpbnMoJ2ludmlzaWJsZScpKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQuc3R5bGVbaW9uaWMuQ1NTLlRSQU5TRk9STV0gPSAnJztcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0YnV0dG9ucy5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKTtcblx0XHRcdFx0XHRcdFx0fSwgMjUwKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGJ1dHRvbnMuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQuc3R5bGVbaW9uaWMuQ1NTLlRSQU5TRk9STV0gPSAndHJhbnNsYXRlM2QoLScgKyBidXR0b25zV2lkdGggKyAncHgsIDAsIDApJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblxuXG5cdFx0XHRcdH0sIGVsZW1lbnQpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5kaXJlY3RpdmUoJ2lvbk11bHRpcGxlU2VsZWN0JywgaW9uTXVsdGlwbGVTZWxlY3QpO1xuXG5cdGlvbk11bHRpcGxlU2VsZWN0LiRpbmplY3QgPSBbJyRpb25pY01vZGFsJywgJyRpb25pY0dlc3R1cmUnXTtcblx0ZnVuY3Rpb24gaW9uTXVsdGlwbGVTZWxlY3QoJGlvbmljTW9kYWwsICRpb25pY0dlc3R1cmUpIHtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0b3B0aW9uczogXCI9XCJcblx0XHRcdH0sXG5cdFx0XHRjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG5cdFx0XHRcdCRzY29wZS5tdWx0aXBsZVNlbGVjdCA9IHtcblx0XHRcdFx0XHR0aXRsZTogJGF0dHJzLnRpdGxlIHx8IFwiU2VsZWN0IE9wdGlvbnNcIixcblx0XHRcdFx0XHR0ZW1wT3B0aW9uczogW10sXG5cdFx0XHRcdFx0a2V5UHJvcGVydHk6ICRhdHRycy5rZXlQcm9wZXJ0eSB8fCBcImlkXCIsXG5cdFx0XHRcdFx0dmFsdWVQcm9wZXJ0eTogJGF0dHJzLnZhbHVlUHJvcGVydHkgfHwgXCJ2YWx1ZVwiLFxuXHRcdFx0XHRcdHNlbGVjdGVkUHJvcGVydHk6ICRhdHRycy5zZWxlY3RlZFByb3BlcnR5IHx8IFwic2VsZWN0ZWRcIixcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogJGF0dHJzLnRlbXBsYXRlVXJsIHx8ICd0ZW1wbGF0ZXMvbXVsdGlwbGVTZWxlY3QuaHRtbCcsXG5cdFx0XHRcdFx0cmVuZGVyQ2hlY2tib3g6ICRhdHRycy5yZW5kZXJDaGVja2JveCA/ICRhdHRycy5yZW5kZXJDaGVja2JveCA9PSBcInRydWVcIiA6IHRydWUsXG5cdFx0XHRcdFx0YW5pbWF0aW9uOiAkYXR0cnMuYW5pbWF0aW9uIHx8ICdzbGlkZS1pbi11cCdcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQkc2NvcGUuT3Blbk1vZGFsRnJvbVRlbXBsYXRlID0gZnVuY3Rpb24gKHRlbXBsYXRlVXJsKSB7XG5cdFx0XHRcdFx0JGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKHRlbXBsYXRlVXJsLCB7XG5cdFx0XHRcdFx0XHRzY29wZTogJHNjb3BlLFxuXHRcdFx0XHRcdFx0YW5pbWF0aW9uOiAkc2NvcGUubXVsdGlwbGVTZWxlY3QuYW5pbWF0aW9uXG5cdFx0XHRcdFx0fSkudGhlbihmdW5jdGlvbiAobW9kYWwpIHtcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbCA9IG1vZGFsO1xuXHRcdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnNob3coKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQkaW9uaWNHZXN0dXJlLm9uKCd0YXAnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdCRzY29wZS5tdWx0aXBsZVNlbGVjdC50ZW1wT3B0aW9ucyA9ICRzY29wZS5vcHRpb25zLm1hcChmdW5jdGlvbiAob3B0aW9uKSB7XG5cdFx0XHRcdFx0XHR2YXIgdGVtcE9wdGlvbiA9IHt9O1xuXHRcdFx0XHRcdFx0dGVtcE9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Qua2V5UHJvcGVydHldID0gb3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5rZXlQcm9wZXJ0eV07XG5cdFx0XHRcdFx0XHR0ZW1wT3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC52YWx1ZVByb3BlcnR5XSA9IG9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3QudmFsdWVQcm9wZXJ0eV07XG5cdFx0XHRcdFx0XHR0ZW1wT3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5zZWxlY3RlZFByb3BlcnR5XSA9IG9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Quc2VsZWN0ZWRQcm9wZXJ0eV07XG5cblx0XHRcdFx0XHRcdHJldHVybiB0ZW1wT3B0aW9uO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdCRzY29wZS5PcGVuTW9kYWxGcm9tVGVtcGxhdGUoJHNjb3BlLm11bHRpcGxlU2VsZWN0LnRlbXBsYXRlVXJsKTtcblx0XHRcdFx0fSwgJGVsZW1lbnQpO1xuXG5cdFx0XHRcdCRzY29wZS5zYXZlT3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8ICRzY29wZS5tdWx0aXBsZVNlbGVjdC50ZW1wT3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIHRlbXBPcHRpb24gPSAkc2NvcGUubXVsdGlwbGVTZWxlY3QudGVtcE9wdGlvbnNbaV07XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8ICRzY29wZS5vcHRpb25zLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBvcHRpb24gPSAkc2NvcGUub3B0aW9uc1tqXTtcblx0XHRcdFx0XHRcdFx0aWYgKHRlbXBPcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LmtleVByb3BlcnR5XSA9PSBvcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LmtleVByb3BlcnR5XSkge1xuXHRcdFx0XHRcdFx0XHRcdG9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Quc2VsZWN0ZWRQcm9wZXJ0eV0gPSB0ZW1wT3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5zZWxlY3RlZFByb3BlcnR5XTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkc2NvcGUuY2xvc2VNb2RhbCgpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdCRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCRzY29wZS5tb2RhbC5yZW1vdmUoKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0JHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWYgKCRzY29wZS5tb2RhbCkge1xuXHRcdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoJ0FwcCcpXG5cdFx0LmRpcmVjdGl2ZSgnaW9uU2VhcmNoU2VsZWN0JywgaW9uU2VhcmNoU2VsZWN0KTtcblxuXHRpb25TZWFyY2hTZWxlY3QuJGluamVjdCA9IFsnJGlvbmljTW9kYWwnLCAnJGlvbmljR2VzdHVyZSddO1xuXHRmdW5jdGlvbiBpb25TZWFyY2hTZWxlY3QoJGlvbmljTW9kYWwsICRpb25pY0dlc3R1cmUpIHtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0b3B0aW9uczogXCI9XCIsXG5cdFx0XHRcdG9wdGlvblNlbGVjdGVkOiBcIj1cIlxuXHRcdFx0fSxcblx0XHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcblx0XHRcdFx0JHNjb3BlLnNlYXJjaFNlbGVjdCA9IHtcblx0XHRcdFx0XHR0aXRsZTogJGF0dHJzLnRpdGxlIHx8IFwiU2VhcmNoXCIsXG5cdFx0XHRcdFx0a2V5UHJvcGVydHk6ICRhdHRycy5rZXlQcm9wZXJ0eSxcblx0XHRcdFx0XHR2YWx1ZVByb3BlcnR5OiAkYXR0cnMudmFsdWVQcm9wZXJ0eSxcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogJGF0dHJzLnRlbXBsYXRlVXJsIHx8ICd0ZW1wbGF0ZXMvc2VhcmNoU2VsZWN0Lmh0bWwnLFxuXHRcdFx0XHRcdGFuaW1hdGlvbjogJGF0dHJzLmFuaW1hdGlvbiB8fCAnc2xpZGUtaW4tdXAnLFxuXHRcdFx0XHRcdG9wdGlvbjogbnVsbCxcblx0XHRcdFx0XHRzZWFyY2h2YWx1ZTogXCJcIixcblx0XHRcdFx0XHRlbmFibGVTZWFyY2g6ICRhdHRycy5lbmFibGVTZWFyY2ggPyAkYXR0cnMuZW5hYmxlU2VhcmNoID09IFwidHJ1ZVwiIDogdHJ1ZVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdCRpb25pY0dlc3R1cmUub24oJ3RhcCcsIGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0XHRpZiAoISEkc2NvcGUuc2VhcmNoU2VsZWN0LmtleVByb3BlcnR5ICYmICEhJHNjb3BlLnNlYXJjaFNlbGVjdC52YWx1ZVByb3BlcnR5KSB7XG5cdFx0XHRcdFx0XHRpZiAoJHNjb3BlLm9wdGlvblNlbGVjdGVkKSB7XG5cdFx0XHRcdFx0XHRcdCRzY29wZS5zZWFyY2hTZWxlY3Qub3B0aW9uID0gJHNjb3BlLm9wdGlvblNlbGVjdGVkWyRzY29wZS5zZWFyY2hTZWxlY3Qua2V5UHJvcGVydHldO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdCRzY29wZS5zZWFyY2hTZWxlY3Qub3B0aW9uID0gJHNjb3BlLm9wdGlvblNlbGVjdGVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkc2NvcGUuT3Blbk1vZGFsRnJvbVRlbXBsYXRlKCRzY29wZS5zZWFyY2hTZWxlY3QudGVtcGxhdGVVcmwpO1xuXHRcdFx0XHR9LCAkZWxlbWVudCk7XG5cblx0XHRcdFx0JHNjb3BlLnNhdmVPcHRpb24gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWYgKCEhJHNjb3BlLnNlYXJjaFNlbGVjdC5rZXlQcm9wZXJ0eSAmJiAhISRzY29wZS5zZWFyY2hTZWxlY3QudmFsdWVQcm9wZXJ0eSkge1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAkc2NvcGUub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHR2YXIgY3VycmVudE9wdGlvbiA9ICRzY29wZS5vcHRpb25zW2ldO1xuXHRcdFx0XHRcdFx0XHRpZiAoY3VycmVudE9wdGlvblskc2NvcGUuc2VhcmNoU2VsZWN0LmtleVByb3BlcnR5XSA9PSAkc2NvcGUuc2VhcmNoU2VsZWN0Lm9wdGlvbikge1xuXHRcdFx0XHRcdFx0XHRcdCRzY29wZS5vcHRpb25TZWxlY3RlZCA9IGN1cnJlbnRPcHRpb247XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHQkc2NvcGUub3B0aW9uU2VsZWN0ZWQgPSAkc2NvcGUuc2VhcmNoU2VsZWN0Lm9wdGlvbjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0JHNjb3BlLnNlYXJjaFNlbGVjdC5zZWFyY2h2YWx1ZSA9IFwiXCI7XG5cdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdCRzY29wZS5jbGVhclNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkc2NvcGUuc2VhcmNoU2VsZWN0LnNlYXJjaHZhbHVlID0gXCJcIjtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdCRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmICgkc2NvcGUubW9kYWwpIHtcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbC5yZW1vdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCRzY29wZS5PcGVuTW9kYWxGcm9tVGVtcGxhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGVVcmwpIHtcblx0XHRcdFx0XHQkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwodGVtcGxhdGVVcmwsIHtcblx0XHRcdFx0XHRcdHNjb3BlOiAkc2NvcGUsXG5cdFx0XHRcdFx0XHRhbmltYXRpb246ICRzY29wZS5zZWFyY2hTZWxlY3QuYW5pbWF0aW9uXG5cdFx0XHRcdFx0fSkudGhlbihmdW5jdGlvbiAobW9kYWwpIHtcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbCA9IG1vZGFsO1xuXHRcdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnNob3coKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnQXBwJylcbiAgICAuZmFjdG9yeSgnY2VydGlmaWNhdGlvbnNTZXJ2aWNlJywgY2VydGlmaWNhdGlvbnNTZXJ2aWNlKTtcblxuICBjZXJ0aWZpY2F0aW9uc1NlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnXTtcbiAgZnVuY3Rpb24gY2VydGlmaWNhdGlvbnNTZXJ2aWNlKCRodHRwKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZ2V0QWxsQ2VydGlmaWNhdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwcC9jZXJ0aWZpY2F0aW9ucy8nKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoJ0FwcCcpXG5cdFx0LmZhY3RvcnkoJ01vZGFscycsIE1vZGFscyk7XG5cblx0TW9kYWxzLiRpbmplY3QgPSBbJyRpb25pY01vZGFsJ107XG5cdGZ1bmN0aW9uIE1vZGFscygkaW9uaWNNb2RhbCkge1xuXG5cdFx0dmFyIG1vZGFscyA9IFtdO1xuXG5cdFx0dmFyIF9vcGVuTW9kYWwgPSBmdW5jdGlvbiAoJHNjb3BlLCB0ZW1wbGF0ZVVybCwgYW5pbWF0aW9uKSB7XG5cdFx0XHRyZXR1cm4gJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKHRlbXBsYXRlVXJsLCB7XG5cdFx0XHRcdHNjb3BlOiAkc2NvcGUsXG5cdFx0XHRcdGFuaW1hdGlvbjogYW5pbWF0aW9uIHx8ICdzbGlkZS1pbi11cCcsXG5cdFx0XHRcdGJhY2tkcm9wQ2xpY2tUb0Nsb3NlOiBmYWxzZVxuXHRcdFx0fSkudGhlbihmdW5jdGlvbiAobW9kYWwpIHtcblx0XHRcdFx0bW9kYWxzLnB1c2gobW9kYWwpO1xuXHRcdFx0XHRtb2RhbC5zaG93KCk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0dmFyIF9jbG9zZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGN1cnJlbnRNb2RhbCA9IG1vZGFscy5zcGxpY2UoLTEsIDEpWzBdO1xuXHRcdFx0Y3VycmVudE1vZGFsLnJlbW92ZSgpO1xuXHRcdH07XG5cblx0XHR2YXIgX2Nsb3NlQWxsTW9kYWxzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0bW9kYWxzLm1hcChmdW5jdGlvbiAobW9kYWwpIHtcblx0XHRcdFx0bW9kYWwucmVtb3ZlKCk7XG5cdFx0XHR9KTtcblx0XHRcdG1vZGFscyA9IFtdO1xuXHRcdH07XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0b3Blbk1vZGFsOiBfb3Blbk1vZGFsLFxuXHRcdFx0Y2xvc2VNb2RhbDogX2Nsb3NlTW9kYWwsXG5cdFx0XHRjbG9zZUFsbE1vZGFsczogX2Nsb3NlQWxsTW9kYWxzXG5cdFx0fTtcblx0fVxufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuZmFjdG9yeSgnTW9kZWwnLCBNb2RlbCk7XG5cblx0TW9kZWwuJGluamVjdCA9IFsnVXNlcnMnXTtcblx0ZnVuY3Rpb24gTW9kZWwoVXNlcnMpIHtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRVc2VyczogVXNlcnNcblx0XHR9O1xuXHR9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnQXBwJylcbiAgICAuZmFjdG9yeSgndXNlclByb2ZpbGVTZXJ2aWNlJywgdXNlclByb2ZpbGVTZXJ2aWNlKTtcblxuICB1c2VyUHJvZmlsZVNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnXTtcbiAgZnVuY3Rpb24gdXNlclByb2ZpbGVTZXJ2aWNlKCRodHRwKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbG9naW46IGZ1bmN0aW9uICh1c2VyQ29uZmlnKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4vJywgdXNlckNvbmZpZylcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIGZldGNoVXNlckRldGFpbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvdXNlci1wcm9maWxlLycpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuZmFjdG9yeSgnVXNlcnMnLCBVc2Vycyk7XG5cblx0VXNlcnMuJGluamVjdCA9IFtdO1xuXHRmdW5jdGlvbiBVc2VycygpIHtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRnZXRBbGw6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIGNvbnNvbGUubG9nKFwiYW55dGhpbmdcIik7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
