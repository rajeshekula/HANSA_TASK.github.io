(function(){
	'use strict';
		angular.module("app", ["chart.js"]).controller('LineCtrl',['$scope','$http',LineCtrl]);
		function LineCtrl($scope,$http) {
			$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
			$scope.series = [];
			$scope.data = [];

			$scope.exportImg = function($event) {
				var dataURL = document.querySelector("#line").toDataURL("image/png");
				document.getElementById('img-link').href=dataURL;

			};
			$http.get("https://www.json-generator.com/api/json/get/clayCfTkzm?indent=2").
				then(function(data) {
					angular.forEach(data.data, function(chartLineData,key) {
						$scope.data.push(chartLineData.chart);
						$scope.series.push("series "+key);
					});
				});
		}

		angular.module("app").controller('DoughnutCtrl',['$scope','$http',DoughnutCtrl]);
		function DoughnutCtrl($scope,$http){
			$scope.labels = ['Buses','Four wheelers','Goods vehicles','others','Two wheelers'];
			$scope.data = [];
			$scope.temp = [];
			$scope.buses = 0;
			$scope.four = 0;
			$scope.goods = $scope.others = $scope.two = 0;
			$http.get("https://api.data.gov.in/resource/7a82b08b-d7fe-4edb-82f7-216a1f1bed07?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&offset=0&limit=10").
				then(function(data) {
					angular.forEach(data.data.records, function(chartDoughnutData,key) {
						$scope.buses += parseInt(chartDoughnutData.buses_);
						$scope.four += parseInt(chartDoughnutData.cars_jeeps_and_taxis);
						$scope.goods += parseInt(chartDoughnutData.goods_vehicles);
						$scope.others += parseInt(chartDoughnutData.others_);
						$scope.two += parseInt(chartDoughnutData.two_wheelers_);

					});
					$scope.data.push($scope.buses,$scope.four,$scope.goods,$scope.others,$scope.two);
				});
			$scope.exportImg = function($event) {
				var dataURL = document.querySelector("#doughnut").toDataURL("image/png");
				document.getElementById('img-link1').href=dataURL;

			};
		}

		angular.module("app").controller('BarCtrl',['$scope','$http',BarCtrl]);
		function BarCtrl($scope,$http) {
			$scope.labels = [];
			$scope.series = ['Males', 'Females'];
			$scope.males = [];
			$scope.females = [];

			$scope.data = [];

			$http.get("http://www.json-generator.com/api/json/get/bVmCHuBzkO?indent=2").
				then(function(data) {

					angular.forEach(data.data, function(chartBarData,key) {
						if (key >=10 && key<=20){
							$scope.males.push(chartBarData.males);
							$scope.females.push(chartBarData.females);
							$scope.labels.push("Age"+chartBarData.age);
						}
					});
					$scope.data.push($scope.males,$scope.females);
				});

			$scope.exportImg = function($event) {
				var dataURL = document.querySelector("#bar").toDataURL("image/png");
				document.getElementById('img-link2').href=dataURL;

			};
		}

		angular.module("app").controller('PieCtrl',['$scope','$http',PieCtrl]);
		function PieCtrl($scope,$http) {
			$scope.labels = [];
  			$scope.data = [];

			$http.get("https://api.data.gov.in/resource/7a82b08b-d7fe-4edb-82f7-216a1f1bed07?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&offset=0&limit=10").
				then(function(data) {
					angular.forEach(data.data.records, function(chartPieData,key) {
						$scope.labels.push("Reg vehicles in "+chartPieData._year_as_on_31st_march_);
						$scope.data.push(chartPieData.all_vehicles);
					});
				});

			$scope.exportImg = function($event) {
				var dataURL = document.querySelector("#pie").toDataURL("image/png");
				document.getElementById('img-link3').href=dataURL;

			};
		}

    }());
     