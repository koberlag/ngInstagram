angular.module("ngInstagram", [])
.factory('authFactory', function(){
	var parameter_name = 'access_token=',
		hash = window.location.hash,
		clientId = 'dbb9284fb3b14907a08892f69809e575',
		redirectUrl = 'http://localhost:8080/ngInstagram/index.html',
		authorizeUrl = "https://api.instagram.com/oauth/authorize/?client_id=" + clientId + "&redirect_uri=" + redirectUrl + "&response_type=token&scope=public_content",
		accessToken = '';

		if (hash.indexOf(parameter_name) === -1) {
			window.location = authorizeUrl;
		}
		accessToken = hash.substring(hash.indexOf(parameter_name)+parameter_name.length);

		return {
			auth : {
				accessToken : accessToken
			}
		};
})
.service('tagService', function($http, authFactory){
	this.getRecentTags = function(tag){
		var endpointUrl = "https://api.instagram.com/v1/tags/" + tag + "/media/recent",
		    config = {
				params: {
					access_token: authFactory.auth.accessToken,
					count:25,
					callback:"JSON_CALLBACK"
				}
			};

		return $http.jsonp(endpointUrl, config)
		.then(function(response){
			//success logic
			return response.data;
		},
		function(response){
			//error logic
			
		});
	};
})
.controller("appController", function($scope, tagService){
	
	$scope.getRecentTags = function(){
		$scope.resultDescription = "Searching Instagram";
		tagService.getRecentTags($scope.tag).then(function(response){
			$scope.results = response.data;
		});
	};
});