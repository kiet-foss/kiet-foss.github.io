var myApp = angular.module('myApp', ['ngRoute', 'angular.filter', 'angularUtils.directives.dirPagination', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']).config(function ($httpProvider) {
  $httpProvider.defaults.xsrfCookieName = 'csrftoken'
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'
});;

angular
  .module('myApp').service('fileUpload', function ($http, $log) {
    this.uploadFileToUrl = function (file, uploadUrl, type) {

      var fd = new FormData();
      fd.append('file', file);
      fd.append('param', type);

      if (file != undefined) {
        console.log(file.type);
        var validExts = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']; // Allowed Extensions
        if (validExts.indexOf(file.type) == -1) {
          alert('Check File Type', 'Allowed files are pdf,jpg,jpeg and png.', 'warning');
          return;
        }
        if (file.type == "text/plain") {
          file.type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
        if (file.size >= 10 * 1024 * 1024) {  // Max Upload Size is 2MB
          alert('Check File Size', 'Max Upload size is 2 Mb', 'warning');
          return;
        }
      }

      var ret = $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined, withCredentials: true }
      }).then(function (response) {
        if (response.data.error == true)
          alert('Problem in Upoading file', response.data.msg, 'warning');
        return response;
      }).catch(function (response) {
        alert('Error', 'File Could Not Be Uploaded..', 'error');
      });
      return ret;

    }

  });



myApp.config(function ($routeProvider) {

  $routeProvider

    .when('/', {
      templateUrl: 'pages/index.html',
      controller: 'homeController'
    })
    .when('/blog', {
      templateUrl: 'pages/blogs.html',
      controller: 'blogController'
    })
    .when('/events', {
      templateUrl: 'pages/event.html',
      controller: 'eventController'
    })
    .when('/forum', {
      templateUrl: 'pages/forum.html',
      controller: 'forumController'
    })

});

myApp.controller('homeController', ['$scope', '$http', '$location', '$window', '$rootScope', '$route', 'fileUpload', '$q', function ($scope, $http, $location, $window, $rootScope, $route, fileUpload, $q) {
}]);

myApp.controller('blogController', ['$scope', '$http', '$location', '$window', '$rootScope', '$route', 'fileUpload', '$q', function ($scope, $http, $location, $window, $rootScope, $route, fileUpload, $q) {
}]);
myApp.controller('eventController', ['$scope', '$http', '$location', '$window', '$rootScope', '$route', 'fileUpload', '$q', function ($scope, $http, $location, $window, $rootScope, $route, fileUpload, $q) {
  $('.post-module').hover(function() {
    $(this).find('.description').stop().animate({
      height: "toggle",
      opacity: "toggle"
    }, 300);
  });
}]);
myApp.controller('forumController', ['$scope', '$http', '$location', '$window', '$rootScope', '$route', 'fileUpload', '$q', function ($scope, $http, $location, $window, $rootScope, $route, fileUpload, $q) {
  document.getElementById('forum_embed').src =
  'https://groups.google.com/forum/embed/?place=forum/kiet-foss'
  + '&showsearch=true&showpopout=true&showtabs=false'
  + '&parenturl=' + encodeURIComponent(window.location.href);
}]);