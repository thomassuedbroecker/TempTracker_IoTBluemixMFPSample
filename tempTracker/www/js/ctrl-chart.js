// *************************************************-->
// Created or modified by Thomas Südbröcker         -->
// All usage is on your own risk no guarantee       -->
// *************************************************-->
// *************************************************-->
// Objective: Create a chart based on the selection of the search result -->
//            Inside the chart it is possible to react on mouse events to get detailed data -->
//            of the selected chart point -->
// Comments:                                        -->
// *************************************************-->
// Documentation
// ***************
// https://blog.nraboy.com/2015/08/using-charts-in-your-ionic-framework-mobile-app/
// http://jtblin.github.io/angular-chart.js/#line-chart
// http://www.chartjs.org/

angular.module('app.ctrl-chart', ['chart.js'])

.controller('ChartCtrl', function ($scope, $state, ExchangeData){
  console.log('List to Display : ', ExchangeData.cloudants);

  var labelList = [];

  var arrayList = [];
  var dataList = [];
  var data = '';

  var i =0;
  var j =1;

  // Check list to display in the chart
  if (ExchangeData.cloudants !== undefined)
  {
    if (ExchangeData.cloudants.length !== undefined) {
      for (i=0;i<ExchangeData.cloudants.length;i++) {
        label = "" + j + "";
        j++;
        labelList.push(label);
        console.log('Build label list to Display : ', labelList);
      }

      // Set Chart.js Variables
      $scope.showChartDetail = false;
      console.log('Label List to Display : ', labelList);
      console.log('Label List to Display : ', labelList.toString());
      $scope.labels = labelList;
      $scope.lscaleIntegersOnly = false;
      //["January", "February", "March", "April", "May", "June", "July"];
      //$scope.series = ['Series A', 'Series B'];
      $scope.series = ['Temperature'];
      //$scope.data = [
      //  [65, 59, 80, 81, 56, 55, 40],
      //  [28, 48, 40, 19, 86, 27, 90]
      //];

      // Extract the data for the chart
      for (i=0;i<ExchangeData.cloudants.length;i++) {
        dataList.push(parseFloat(ExchangeData.cloudants[i].fields.theTemp));
        //dataList.push(parseInt(ExchangeData.cloudants[i].fields.theTemp));
        console.log('Data  : ', dataList);
        console.log('Data List to Display : ', dataList.toString());
      }
      console.log('Data List to Display : ', dataList);
      data = "[[" + dataList.toString() + "]]";
      console.log('Data to Display : ', data);
      arrayList.push(dataList);
      console.log('Array List to Display : ', arrayList.toString());

      // Set Chart.js Variables
      $scope.data = arrayList;
      //$scope.data = [[20,25]];

      // Set App Variables
      $scope.chartHeadline = "Chart for " + ExchangeData.cloudants.chartHeadline;
      $scope.cloudants = ExchangeData.cloudants;
    } else {
      WL.SimpleDialog.show(
        "No valide Data for a chart!" , "Get chart data first.",
        [{text: "OK, thanks", handler: function() {WL.Logger.debug("No Data for a chart!"); }
        }]
      );
      $state.go('find');
    }
  } else {
    WL.SimpleDialog.show(
      "No valide Data for a chart!" , "Get chart data first.",
      [{text: "OK, thanks", handler: function() {WL.Logger.debug("No Data for a chart!"); }
      }]
    );
    $state.go('find');
  }

  // Use the onClick to Show details of the selected Item in the Chart
  $scope.onClick = function (points, evt) {
    console.log("The Points : ", points);
    console.log("The Event : ", evt);
    var j = 0;

    // Get count of selected points
    if (points.length !== undefined) {
      for (j = 0; j < points.length; j++) {
       console.log("Extract Data at position (" + j +")", points[j]);
      }
    }

    var i = '';
    if (points[0] !== undefined )
    {
      i = points[0].label;
      currentPosition = parseInt(i) - 1;
      $scope.cloudant = ExchangeData.cloudants[currentPosition];
      $scope.showChartDetail = true;
      console.log(" Data at currentPosition : " + currentPosition + " : ", $scope.cloudant);
    } else {
      $scope.showChartDetail = false;
    }
    $scope.$apply();
  };
})
