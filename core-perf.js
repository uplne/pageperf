var data;
var api = {
    renderData: function() {
        data = window.performance.getEntriesByType('mark');

        this.loadScripts();
    },

    loadScripts: function() {
        Promise.all([
            this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.5.0/lodash.min.js'),
            this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js')
        ]).then(function() {
            this.visualizeData();
        }.bind(this))
    },

    loadScript: function(url) {
        var scriptPromise = new Promise(function(resolve, reject) {
            var script = document.createElement('script');
            script.src = url;

            script.addEventListener('load', function() {
                resolve(url);
            }, false);

            document.body.appendChild(script);
        });

        return scriptPromise;
    },

    createTimeline: function() {
        var timeline = $(document.createElement('div')),
            body     = $('body');
        
        timeline.id = "timeline";
        timeline.css({
            position: 'fixed',
            top: 0,
            bottom: 0,
            width: '100%',
            height: '3em',
            backgroundColor: 'black'
        });
        body.append(timeline);
    },

    visualizeData: function() {
        this.loadScript("https://www.google.com/jsapi")
        .then(loadVisualisation);

        function loadVisualisation() {
            google.load("visualization", "1", {packages:["timeline"], callback: drawChart});
        }
        
        function drawChart() {
            var container = document.createElement('div');
            container.id = 'visualization';
            document.body.appendChild(container);

            var chart = new google.visualization.Timeline(container);
            var dataTable = new google.visualization.DataTable();

            dataTable.addColumn({ type: 'string', id: 'ID' });
            dataTable.addColumn({ type: 'string', id: 'Name' });
            dataTable.addColumn({ type: 'number', id: 'Start' });
            dataTable.addColumn({ type: 'number', id: 'Start' });

            var arr = _.chain(data)
                .sortBy('startTime')
                .map(function(item, index) {
                    return [
                        getType(item.name),
                        item.name,
                        item.startTime,
                        item.startTime + 10
                    ]
                })
                .value();

            arr.push(getPerformanceTiming());
            console.log(arr);
            dataTable.addRows(arr);

            var options = {
                height: window.innerHeight
            };

            chart.draw(dataTable, options);

            $(container).css({
                'position': 'fixed',
                'left' : 0,
                'bottom' : 0,
                'z-index' : '6000'
            });
        }

        function getType(data) {
            var item = data.split(' ')[0];
            return (item === 'gu.Commercial' || item === 'gu.DFP') ? 'Commercial' : 'Other';
        }

        function getPerformanceTiming() {
            var timing = window.performance.timing;
            return [
                [
                'Timing',
                'domContentLoadedEvent',
                (timing.domContentLoadedEventStart - timing.responseEnd) / 1000,
                (timing.domContentLoadedEventStart - timing.responseEnd) / 1000
                ],
                [
                'Timing',
                'loadEvent',
                (timing.loadEventEnd - timing.responseEnd) / 1000,
                (timing.loadEventEnd - timing.responseEnd) / 1000
                ],
                [
                'Timing',
                'domComplete',
                (timing.domComplete - timing.responseEnd) / 1000,
                (timing.domComplete - timing.responseEnd) / 1000
                ]
            ];
        }
    }
};

api.renderData();