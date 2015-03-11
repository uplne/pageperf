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
            google.load("visualization", "1", {packages:["table"], callback: drawChart});
        }
        
        function drawChart() {
            var container = document.createElement('div');
            container.id = 'visualization';
            document.body.appendChild(container);

            var chart = new google.visualization.Timeline(container);
            var dataTable = new google.visualization.DataTable();

            /*dataTable.addColumn({ type: 'string', id: 'ID' });
            dataTable.addColumn({ type: 'string', id: 'Name' });
            dataTable.addColumn({ type: 'number', id: 'Start' });
            dataTable.addColumn({ type: 'number', id: 'End' });*/

            dataTable.addColumn('string', 'Name');
            dataTable.addColumn('number', 'Salary');

            var arr = _.chain(data)
                .sortBy('startTime')
                .map(function(item, index) {
                    return [
                        item.name,
                        item.timeStart
                    ]
                })
                .value();

            console.log(arr);
            dataTable.addRows(arr);

            chart.draw(dataTable, {showRownNumber: true});
        }
    }
};

api.renderData();