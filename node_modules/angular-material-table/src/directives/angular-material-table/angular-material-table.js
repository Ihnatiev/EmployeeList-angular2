angular.module('ngMaterialTable', ['ngMaterial'])
  .directive('mdTable', function ($sce) {
    return {
      restrict: 'E',
      scope: {
        headers: '=',
        content: '=',
        sortable: '=',
        filters: '=',
        customClass: '=customClass',
        thumbs:'=',
        count: '='
      },
      controller: function ($scope, $filter) {
        var orderBy = $filter('orderBy');
        $scope.tablePage = 0;
        $scope.nbOfPages = function () {
          return Math.ceil($scope.content.length / $scope.count);
        };
      	$scope.handleSort = function (field) {
          return $scope.sortable.indexOf(field) > -1;
        };
        $scope.order = function (predicate, reverse) {
          $scope.content = orderBy($scope.content, predicate, reverse);
          $scope.predicate = predicate;
        };
        $scope.order($scope.sortable[0], false);
        $scope.getNumber = function (num) {
			    return new Array(num);
        };
        $scope.goToPage = function (page) {
          $scope.tablePage = page;
        };
      },
      templateUrl: $sce.trustAsResourceUrl('https://secrettriangle.github.io/angular-material-table/src/directives/angular-material-table/angular-material-table.html')
    }
  })
  .directive('mdColresize', function ($timeout) {
    return {
      restrict: 'A',
      link: function ($scope, $el) {
        $scope.$evalAsync(function () {
          $timeout(function () {
            $el.colResizable({
              liveDrag: true,
              fixed: true
            });
          }, 100);
        });
      }
    }
  })
  .filter('startFrom',function () {
    return function (input, start) {
      return input.slice(+start);
    }
  });
