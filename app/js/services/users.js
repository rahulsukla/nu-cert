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
