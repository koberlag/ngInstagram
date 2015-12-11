angular.module("ngInstagram", [])
.controller("appController", ["$scope", "$http", function($scope, $http){
	$scope.results = [];
	$scope.clientId = 'dbb9284fb3b14907a08892f69809e575';
	$scope.clientSecret ='1995809cb97147f6a1a9be556a65a9ba';
	$scope.redirectUrl = 'http://localhost:8080/ngInstagram/index.html';
	$scope.authorizeUrl = "https://api.instagram.com/oauth/authorize/?client_id=" + $scope.clientId + "&redirect_uri=" + $scope.redirectUrl + "&response_type=token&scope=public_content";

	$scope.getData = function(){
		var parameter_name = 'access_token=',
		hash = window.location.hash;

		if (!hash.indexOf(parameter_name)) {
			//no access token
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