(function(){
	'use strict';
		angular.module("app", ["chart.js"]).controller('LineCtrl',['$scope','$http',LineCtrl]);
		function LineCtrl($scope,$http) {
			$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
			$scope.series = [];
			$scope.data = [];

			$scope.onClick = function (points, evt) {
				console.log(points, evt);
			};
			
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
			$scope.labels = [];
			$scope.data = [];

			$http.get("https://api.population.io:80/1.0/population/2018/aged/18/").
				then(function(data) {
					angular.forEach(data.data, function(chartDoughnutData,key) {
						if (key <=9){
							$scope.data.push(chartDoughnutData.total);
							$scope.labels.push(chartDoughnutData.country);
						}
					});
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

			$http.get("https://api.population.io/1.0/population/2018/India/").
				then(function(data) {
					angular.forEach(data.data, function(chartBarData,key) {
						if (key >=10 && key<=20){
							$scope.males.push(chartBarData.males);
							$scope.females.push(chartBarData.females);
							$scope.labels.push("Age"+chartBarData.age);
						}
					});
					$scope.data.push($scope.males);
					$scope.data.push($scope.females);
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