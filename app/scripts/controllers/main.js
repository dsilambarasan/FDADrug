'use strict';

/**
 * @ngdoc function
 * @name reportApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reportApp
 */
angular.module('reportApp').controller('MainCtrl', function ($scope, drugUtilities, $timeout) {
  $scope.chosen = {
    "isSerious": false,
    "isReport": false,
    "isGender": false,
    "isAgeRange": false,
    "isYear": false
  };

  $scope.seriousness = 2;
  $scope.reporting   = 2;
  $scope.gender      = 2;
  $scope.fromage     = 1;
  $scope.toage       = 120;

  $scope.fromyear    = 1970;
  $scope.toyear      = new Date().getFullYear();

  $scope.myVar       = 1;
  $scope.searchedDrugName = '';

  $scope.maildrugCURL = 'http://54.254.212.175/FDA/index.html';

  /* To Get Search Parameters from URL */
  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  /* Base load of the page
   * If URL Available Contains Drug Name get the parameter values and load the page
   * Else the default URL gets loaded
   */
  $scope.$watch('myVar', function() {
    $scope.drugName      =  getParameterByName('drugName');
    var getDrugName      =  getParameterByName('drugName');
    var getSeriousness   =  getParameterByName('seriousness');
    var getGender        =  getParameterByName('paientsex');
    var getReporting     =  getParameterByName('reporting');
    var getFromAge       =  parseInt(getParameterByName('fromage'), 10);
    var getToAge         =  parseInt(getParameterByName('toage'), 10);
    var getFromYear      =  parseInt(getParameterByName('fromyear'), 10);
    var getToYear        =  parseInt(getParameterByName('toyear'), 10);

    if(getDrugName){
      if(getSeriousness){
        $scope.chosen.isSerious =   true;
        $scope.seriousness      =   getSeriousness;
      }

      if(getGender){
        $scope.chosen.isGender   =   true;
        $scope.gender            =   getGender;
      }

      if(getReporting){
        $scope.chosen.isReport   =   true;
        $scope.reporting         =   getReporting;
      }

      if(getFromAge){
        $scope.chosen.isAgeRange =   true;
        $scope.fromage           =  getFromAge;
        $scope.toage             =   getToAge;
      }

      if(getFromYear){
        $scope.chosen.isYear   =   true;
        $scope.fromyear        =   getFromYear;
        $scope.toyear          =   getToYear;
      }
      $scope.makeDrugURL();
    }
    else{
      var drugTURL         =   'https://api.fda.gov/drug/event.json';
      var drugCURL         =   'https://api.fda.gov/drug/event.json?&count=patient.reaction.reactionmeddrapt.exact';
      $scope.totalDrugDetails(drugTURL);
      $scope.countDrugDetails(drugCURL);
    }

  });

  /* To modify your Filter Options */
  $scope.changeFilterOptions       =   function(filterkey) {
    $scope.filterkey = filterkey;
    angular.forEach($scope.chosen, function(key, value) {
      if (value === $scope.filterkey) {
        $scope.chosen[value] = false;
      }
    });
    $scope.makeDrugURL();
  },

  /* To create a Search URL */
  $scope.makeDrugURL        =     function() {
    $scope.myloader       =    true;
    $scope.searchedDrugName   =     $scope.drugName;
    var searchparam = 0;
    var drugTURL = 'https://api.fda.gov/drug/event.json?api_key=pw60LprRW1vp9WXwFtosc6lT7Tm50AvH35rnIbOK';

    searchparam = 1;
    drugTURL += '&search=(patient.drug.medicinalproduct:"' + $scope.drugName +
      '"+OR+patient.drug.openfda.substance_name:"' + $scope.drugName +
      '"+OR+patient.drug.openfda.product_type:"' + $scope.drugName +
      '"+OR+patient.drug.openfda.manufacturer_name:"' + $scope.drugName +
      '"+OR+patient.drug.openfda.brand_name:"' + $scope.drugName +
      '"+OR+patient.drug.openfda.generic_name:"' + $scope.drugName +
      '"+OR+patient.drug.openfda.application_number:"' + $scope.drugName + '")';

    var drugCURL = drugTURL;

    $scope.maildrugCURL = 'http://54.254.212.175/FDA/index.html?drugName='+ $scope.drugName;

    if($scope.chosen.isSerious) {
      if (searchparam === 0) {
        searchparam = 1;
        drugTURL += '&search=';
        drugCURL += '&search=';
      }
      else {
        drugTURL += '+AND+';
        drugCURL += '+AND+';
      }
      drugTURL += '(serious:' + $scope.seriousness + ')';
      drugCURL += '(serious:' + $scope.seriousness + ')';
      $scope.maildrugCURL += '%26seriousness='+ $scope.seriousness;
    }

    if($scope.chosen.isReport) {
      if (searchparam === 0) {
        searchparam = 1;
        drugTURL += '&search=';
        drugCURL += '&search=';
      }
      else {
        drugTURL += '+AND+';
        drugCURL += '+AND+';
      }
      console.log($scope.reporting);
      /* Reported directly by public */
      if($scope.reporting == 1){
        drugTURL += '_missing_:companynumb';
        drugCURL += '_missing_:companynumb';
      }
      /* Reported through manufacturers */
      else{
        drugTURL += '_exists_:companynumb';
        drugCURL += '_exists_:companynumb';
      }

      $scope.maildrugCURL += '%26reporting=' + $scope.reporting;
    }

    if($scope.chosen.isGender) {
      if (searchparam === 0) {
        searchparam = 1;
        drugTURL += '&search=';
        drugCURL += '&search=';
      }
      else {
        drugTURL += '+AND+';
        drugCURL += '+AND+';
      }
      drugTURL += '(patient.patientsex:' + $scope.gender + ')';
      drugCURL += '(patient.patientsex:' + $scope.gender + ')';
      $scope.maildrugCURL += '%26paientsex='+ $scope.gender;
    }

    if($scope.chosen.isAgeRange) {
      if (searchparam === 0) {
        searchparam = 1;
        drugTURL += '&search=';
        drugCURL += '&search=';
      }
      else {
        drugTURL += '+AND+';
        drugCURL += '+AND+';
      }
      drugTURL += 'patient.patientonsetage:[' + $scope.fromage + '+TO+' + $scope.toage + ']';
      drugCURL += 'patient.patientonsetage:[' + $scope.fromage + '+TO+' + $scope.toage + ']';
      $scope.maildrugCURL += '%26fromage=' + $scope.fromage;
      $scope.maildrugCURL += '%26toage=' + $scope.toage;
    }

    if ($scope.chosen.isYear) {
      if (searchparam === 0) {
        searchparam = 1;
        drugTURL += '&search=';
        drugCURL += '&search=';
      }
      else {
        drugTURL += '+AND+';
        drugCURL += '+AND+';
      }
      drugTURL += 'receivedate:[' + $scope.fromyear + '0101' + '+TO+' + $scope.toyear + '0101' +']';
      drugCURL += 'receivedate:[' + $scope.fromyear + '0101' + '+TO+' + $scope.toyear + '0101' +']';
      $scope.maildrugCURL += '%26fromyear=' + $scope.fromyear;
      $scope.maildrugCURL += '%26toyear=' + $scope.toyear;
    }

    drugTURL += '';
    drugCURL += '&count=patient.reaction.reactionmeddrapt.exact';

    $scope.totalDrugDetails(drugTURL);
    $scope.countDrugDetails(drugCURL);

    $scope.myloader       =     false;
  },

  /* To Get Drug Details JSON */
  $scope.totalDrugDetails       =   function(drugTURL) {
    $scope.totalDrugData       =   [];
    drugUtilities.getContents({
      method: 'GET',
      url: drugTURL,
      data: {},
      success: function(data) {
        $scope.disclaimer    =  data.meta.disclaimer;
        $scope.last_updated    =  data.meta.last_updated;
        $scope.totalDrugData   =   data.meta.results.total;
      },
      error: function() {
        $scope.totalDrugData   =   [];
      }
    });
  },

  /* To Get Drug Count JSON */
  $scope.countDrugDetails       =   function(drugCURL) {
    $scope.countDrugData       =   [];
    drugUtilities.getContents({
      method: 'GET',
      url: drugCURL,
      data: {},
      success: function(data) {
        $scope.countDrugData   =   data.results;
        $scope.pieChart();
      },
      error: function() {
        $scope.countDrugData   =   [];
      }
    });
  },

  /* To Create Pie Chart */
  $scope.pieChart      =    function() {
    $scope.pieArray   =     [];
    angular.forEach($scope.countDrugData, function(value, key) {
      if (key < 10) {
        $scope.pieArray.push([value.term, value.count]);
      }
    });
    $timeout(function() {
      c3.generate({
        bindto: '#chart',
        data: {
          columns: $scope.pieArray,
          type: 'pie'
        },
        legend: {
          position: 'bottom'
        },
        tooltip:{
          format:{
            value:function(x){
              return x;
            }
          }
        }
      });
    }, 1000);
  },

  /* Check Seriousness Label */
  $scope.seriousCheck    =   function() {
    if ($scope.chosen.isSerious) {
      $scope.makeDrugURL();
    }
  },

  /* Check Method of Reporting Label */
  $scope.reportCheck    =   function() {
    if ($scope.chosen.isReport) {
      $scope.makeDrugURL();
    }
  },

  /* Check Gender Label */
  $scope.genderCheck    =   function() {
    if ($scope.chosen.isGender) {
      $scope.makeDrugURL();
    }
  },

  /* Check Age Group Label */
  $scope.ageRangeCheck  =   function() {
    if ($scope.chosen.isAgeRange) {
      $scope.makeDrugURL();
    }
  },

  /* Check Report Received On Label */
  $scope.yearCheck = function() {
    if ($scope.chosen.isYear) {
      $scope.makeDrugURL();
    }
  };

});

/* HTTP Server Request Utility */
angular.module('reportApp').factory('drugUtilities', [
  '$http',
  '$log',
  function($http, $log) {
    return {
      getContents: function(options) {
        $http({
          method: options.method,
          url: options.url,
          data: options.data
        }).success(function(data, status, headers, config) {
          // this callback will be called synchronously
          // when the response is available
          if (options.success) {
            options.success(data, status, headers, config);
          }
        }).error(function(data, status, headers, config) {
          // this callback will be called synchronously
          // when the response is available
          $log.log(""); //want to show log in console
          //console.clear();
          if (options.error) {
            options.error(data, status, headers, config);
          }
        });
      }
    };
  }
]);

/* Search Box Enter Directive*/
angular.module('reportApp').directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.makeDrugURL();
          scope.$eval(attrs.ngEnter, {
            'event': event
          });
        });
        event.preventDefault();
      }
    });
  };
});
