var firebaseRef = null

(function () {
    'use strict';

    angular.module('flexvolt.trace', [])

    .controller('TraceCtrl', ['$stateParams', '$scope', '$state', 'flexvolt', '$ionicPopover', '$ionicModal', 'tracePlot', 'traceLogic', 'dataHandler', 'hardwareLogic', 'logicOptions', 'customPopover',
    function($stateParams, $scope, $state, flexvolt, $ionicPopover, $ionicModal, tracePlot, traceLogic, dataHandler, hardwareLogic, logicOptions, customPopover) {
        var currentUrl = $state.current.url;
        console.log('currentUrl = '+currentUrl);
        $scope.demo = $stateParams.demo;
        var afID = undefined;

        customPopover.add($ionicPopover, $scope, 'popover', 'pages/trace/trace-settings.html',traceLogic.updateSettings);
        customPopover.add($ionicPopover, $scope, 'filterpopover', 'templates/filter-popover.html',traceLogic.updateSettings);
        customPopover.add($ionicPopover, $scope, 'averagePopover', 'templates/average-popover.html', traceLogic.updateSettings);
        // customPopover.add($ionicPopover, $scope, 'helpover','pages/trace/trace-help.html');
        customPopover.addHelp($ionicModal, $scope, 'helpModal','pages/trace/trace-help.html');





        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.onload = function(){
            var config = {
                apiKey: "AIzaSyB5__nHtPnD4n20Zd7mlJ4QvfExi67VSnY",
                authDomain: "flexvolt-12163.firebaseapp.com",
                databaseURL: "https://flexvolt-12163.firebaseio.com",
                projectId: "flexvolt-12163",
                storageBucket: "",
                messagingSenderId: "119340612248"
            }

            firebaseRef = firebase
            firebase.initializeApp(config)
        }.bind($scope)
        script.src = 'https://www.gstatic.com/firebasejs/4.12.1/firebase.js'
        document.getElementsByTagName('head')[0].appendChild(script);






        $scope.pageLogic = traceLogic;
        $scope.hardwareLogic = hardwareLogic;
        $scope.updating = false;
        $scope.samplesArray = []
        $scope.sampleAvg = []
        $scope.performAveraging = false
        $scope.secondsLeft = 5000

        $scope.latestValue = 0
        $scope.tempValues = []
        $scope.graphValues = []

        $scope.onChange = function(){
            if (afID){
              window.cancelAnimationFrame(afID);
            }
            afID = undefined;
            $scope.updating  = true;
            init();
            $scope.updating  = false;
            paintStep();
        };

        $scope.startAveraging = function() {
            $scope.performAveraging = true
            $scope.samplesArray = []
            $scope.sampleAvg = []
            $scope.tempValues = []
            $scope.graphValues = []

            $scope.interval = setInterval(function() {
                console.log("INTERVAL")
                $scope.secondsLeft -= 25
                $scope.tempValues.push($scope.latestValue)

                if ($scope.secondsLeft === 0) {
                    console.log("OVER")
                    for (let i = 0; i <= 180; i++) {
                        let x = 0
                        for (let j = i; j <= i + 20; j++) {
                            x += $scope.tempValues[i]
                        }
                        
                        console.log(`X: ${x}`)
                        console.log(typeof $scope.tempValues[2], parseInt($scope.tempValues[2]))
                        $scope.graphValues.push(x)

                        if (firebaseRef) {
                            const database = firebaseRef.database()
                            database.ref('/values').set($scope.getAverageValues())
                        }
                    }

                    console.log("FINAL RESULT", $scope.graphValues)

                    $scope.performAveraging = false
                    $scope.secondsLeft = 5000

                    clearInterval($scope.interval)
                }
            }, 25)
        }

        // array = {
        //     "25": 342342,
        //     "50": 3523,
        //     "75": 32423
        // }

        $scope.getAverageValues = function() {
            const values = $scope.graphValues.map(sampleItem => sampleItem / 3 * 100).join(",")
            // console.log(values)
            return {
                values: values,
                peak: (Math.max(...$scope.graphValues)).toFixed(6),
                area: ($scope.graphValues.reduce((p, c) => p + c, 0)).toFixed(6),
                average: ($scope.graphValues.reduce((p, c) => p + c, 0) / $scope.graphValues.length).toFixed(6)
            }
        }

        function updateAnimate(){
            if ($scope.updating)return; // don't try to draw any graphics while the settings are being changed

            var dataIn = dataHandler.getData()
            const positiveData = dataIn[1].map(data => Math.abs(data))
            positiveData.map(data => {
                if ($scope.performAveraging) {
                    // if ($scope.samplesArray.length < 10) {
                    //     $scope.samplesArray.push(data)
                    // } else {
                    //     const newAvg = $scope.samplesArray.reduce((p, c) => p + c, 0) / 10
                    //     $scope.sampleAvg.push(newAvg)
                    //     $scope.samplesArray = []

                    //     console.log("New Avg.", newAvg)
                    // }

                    $scope.latestValue = data
                }
            })
            if (dataIn === null || dataIn === angular.undefined ||
                dataIn[0] === angular.undefined || dataIn[0].length === 0){return;}
            tracePlot.update(dataIn, dataHandler.controls.live);

        }

        function paintStep(){
            //console.log('state = '+$state.current.url);
            if ($state.current.url === currentUrl){
                afID = window.requestAnimationFrame(paintStep);
                updateAnimate();
            } else if ($state.current.url === '/connection'){
                afID = window.requestAnimationFrame(paintStep);
            }
        }

        function init() {
            traceLogic.ready()
                .then(function(){
                    traceLogic.settings.nChannels = Math.min(traceLogic.settings.nChannels,hardwareLogic.settings.nChannels);
                    //console.log('INFO: Settings: '+angular.toJson(traceLogic.settings));
                    dataHandler.init(traceLogic.settings.nChannels);
                    for (var i= 0; i < traceLogic.settings.filters.length; i++){
                        dataHandler.addFilter(traceLogic.settings.filters[i]);
                    }
        //            dataHandler.setMetrics(60);
                    tracePlot.init('traceWindow',traceLogic.settings.nChannels, hardwareLogic.settings.vMax, $stateParams.demo);
                    paintStep();
                });
        }

        window.onresize = function(){
            if (afID){
              window.cancelAnimationFrame(afID);
            }
            afID = undefined;
            $scope.updating  = true;
            //console.log('INFO: Resize w:'+window.innerWidth+', h:'+window.innerHeight);
            tracePlot.resize();
            $scope.updating  = false;
            paintStep();
        };

        init();
    }])
}());
