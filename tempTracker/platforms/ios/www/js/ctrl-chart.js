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

  for (i=0;i<ExchangeData.cloudants.length;i++) {
    label = "" + j + "";
    j++;
    labelList.push(label);
  }

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

  $scope.data = arrayList;
  //$scope.data = [[20,25]];
  $scope.chartHeadline = "Chart for " + ExchangeData.cloudants.chartHeadline;
  $scope.cloudants = ExchangeData.cloudants;

  // Use the onClick to Show details of the selected Item in the Chart
  $scope.onClick = function (points, evt) {
    console.log("The Points : ", points);
    console.log("The Event : ", evt);
    console.log("Extract Data at position (0) : ", points[0]);
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
