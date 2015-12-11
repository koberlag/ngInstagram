angular.module("ngInstagram", [])
.run(function ($rootScope) {
	//How to we prevent an infinite redirect loop if an access token is not granted?
	var parameter_name = 'access_token=',
		hash = window.location.hash;
		if (hash.indexOf(parameter_name) === -1) {
			//no access token
			$rootScope.clientId = 'dbb9284fb3b14907a08892f69809e575';
			$rootScope.redirectUrl = 'http://localhost:8080/ngInstagram/index.html';
			$rootScope.authorizeUrl = "https://api.instagram.com/oauth/authorize/?client_id=" + $rootScope.clientId + "&redirect_uri=" + $rootScope.redirectUrl + "&response_type=token&scope=public_content";
			window.location = authorizeUrl;
		}
		$rootScope.accessToken = hash.substring(hash.indexOf(parameter_name)+parameter_name.length);
})
.controller("appController", ["$scope", "$http", function($scope, $http){
	$scope.getData = function(){
		//QUESTION: Why aren't the root scope values available from the run function?
		var parameter_name = 'access_token=',
		hash = window.location.hash;
		if (hash.indexOf(parameter_name) === -1) {
			//no access token
			//we should show an 'unauthorized' error, but it would never get here because of the redirect in run()
			return;
		}
		$scope.accessToken = hash.substring(hash.indexOf(parameter_name)+parameter_name.length);

		var endpointUrl = "https://api.instagram.com/v1/tags/" + $scope.tag + "/media/recent";
		var config = {
			params: {
				access_token:$scope.accessToken,
				count:25,
				callback:"JSON_CALLBACK"
			}
		};
		$scope.resultDescription = "searching instagram";

		$http.jsonp(endpointUrl, config)
		.then(function(response){
			//success logic
			$scope.results = response.data.data;
		},
		function(response){
			//error logic
			
		});
	};

	function getUrlParameter(param, dummyPath) {
        var sPageURL = dummyPath || window.location.search.substring(1),
            sURLVariables = sPageURL.split(/[&||?]/),
            res;

        for (var i = 0; i < sURLVariables.length; i += 1) {
            var paramName = sURLVariables[i],
                sParameterName = (paramName || '').split('=');

            if (sParameterName[0] === param) {
                res = sParameterName[1];
            }
        }
        return res;
	}
}]);