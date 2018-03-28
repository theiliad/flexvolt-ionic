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

        $scope.wadup = "FIEWOHFWIEPHFPWEH"
        $scope.pageLogic = traceLogic;
        $scope.hardwareLogic = hardwareLogic;
        $scope.updating = false;
        $scope.samplesArray = []
        $scope.sampleAvg = []
        $scope.performAveraging = false
        $scope.secondsLeft = 5

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

            $scope.interval = setInterval(function() {
                console.log("INTERVAL")
                $scope.secondsLeft--

                if ($scope.secondsLeft === 0) {
                    clearInterval($scope.interval)
                    $scope.performAveraging = false
                    $scope.secondsLeft = 5
                }
            }, 1000)
        }


        // array = {
        //     "25": 342342,
        //     "50": 3523,
        //     "75": 32423
        // }
        
        // for (let i = 0; i <= 180; i++) {
        //     let x = 0
        //     for (let j = i; j <= i + 20; j++) {
        //         x += array[i]
        //     }

        //     $scope.graphValues.push(x)
        // }





        $scope.getAverageValues = function() {
            const values = $scope.sampleAvg.map(sampleItem => sampleItem / 0.3 * 100).join(",")
            // console.log(values)
            return {
                values: values,
                peak: (Math.max(...$scope.sampleAvg)).toFixed(6),
                area: ($scope.sampleAvg.reduce((p, c) => p + c, 0)).toFixed(6),
                average: ($scope.sampleAvg.reduce((p, c) => p + c, 0) / $scope.sampleAvg.length).toFixed(6)
            }
        }

        function updateAnimate(){
            if ($scope.updating)return; // don't try to draw any graphics while the settings are being changed

            var dataIn = dataHandler.getData()
            const positiveData = dataIn[1].map(data => Math.abs(data))
            positiveData.map(data => {
                if ($scope.performAveraging) {
                    if ($scope.samplesArray.length < 10) {
                        $scope.samplesArray.push(data)
                    } else {
                        const newAvg = $scope.samplesArray.reduce((p, c) => p + c, 0) / 10
                        $scope.sampleAvg.push(newAvg)
                        $scope.samplesArray = []

                        console.log("New Avg.", newAvg)
                    }
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
