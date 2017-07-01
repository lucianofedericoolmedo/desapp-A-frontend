'use strict';

angular.module('users-profiles').controller('UserProfileCtrl', 
	[ '$scope', '$stateParams', '$state', '$controller',
	'UserProfile', 'Authentication', '$location', 
	'Threshold', '$filter', 'SweetAlert',
	function ($scope, $stateParams, $state, $controller,
		UserProfile, Authentication, $location, 
		Threshold, $filter, SweetAlert) {

		$scope.$state = $state;
		$controller('DashboardCtrl', {$scope: $scope}); //This works

		$scope.thresholds = Threshold.getPossiblesThresholds();
		$scope.thresholdsCriterias = Threshold.getPossiblesThresholdsCriterias();

		function manageErrorResponseHelper(message) {
			SweetAlert.swal("Error", 
				message, "error");
		}

		function manageErrorResponse (message) {
			manageErrorResponseHelper(message.data.message);
		}

		$scope.findProfile = function () {
			var userId = Authentication.getUserId();
			UserProfile.getByUserId( { id : userId }, function (successResponse) {
				$scope.profile = successResponse;
			}, manageErrorResponse);
		};

		function formatBirthdayDate () {
			var birthday = $scope.profile.userData.birthday;
			$scope.profile.userData.birthday = $filter('date')(birthday, 'dd/MM/yyyy');
		}


		$scope.update = function () {
			formatBirthdayDate();
			var userProfile = angular.copy($scope.profile);
			UserProfile.update(userProfile, function (successResponse) {
				$location.url('/');
			}, manageErrorResponse)
		};

		$scope.changedThreshold = function (selectedThreshold) {
			$scope.thresholdInstance = angular.copy(selectedThreshold);
		};

		///////////////// Logic for date picker /////////////////
		$scope.inlineOptions = {
			customClass: getDayClass,
			minDate: new Date(),
			showWeeks: false
		};

		$scope.dateOptions = {
			dateDisabled: disabled,
			formatYear: 'yy',
			maxDate: new Date(2020, 5, 22),
			minDate: new Date(),
			startingDay: 1
		};

		// Disable weekend selection
		function disabled(data) {
			var date = data.date,
				mode = data.mode;
			return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
		}

		$scope.toggleMin = function() {
			$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
			$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
		};

		$scope.toggleMin();

		$scope.setDate = function(year, month, day) {
			$scope.profile.userData.birthday = new Date(year, month, day);
		};

		$scope.format = 'dd/MM/yyyy';

		var tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
		var afterTomorrow = new Date();
			afterTomorrow.setDate(tomorrow.getDate() + 1);
		
		$scope.events = [
			{
			  date: tomorrow,
			  status: 'full'
			},
			{
			  date: afterTomorrow,
			  status: 'partially'
			}
		];

		function getDayClass(data) {
			var date = data.date,
				mode = data.mode;
			if (mode === 'day') {
				var dayToCheck = new Date(date).setHours(0,0,0,0);

				for (var i = 0; i < $scope.events.length; i++) {
					var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

					if (dayToCheck === currentDay) {
						return $scope.events[i].status;
					}
				}
			}
		}

}]);