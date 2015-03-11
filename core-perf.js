var data;
var api = {
    renderData: function() {
        data = window.performance.getEntriesByType('mark');

        this.loadScripts();
    },

    loadScripts: function() {
        Promise.all([
            this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.5.0/lodash.min.js'),
            this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'),
            this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/vis/3.10.0/vis.js'),
            this.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/vis/3.10.0/vis.min.css'),
        ]).then(this.visualizeData)
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

    loadCSS: function(url) {
        var scriptPromise = new Promise(function(resolve, reject) {
            var script = document.createElement('link');
            script.setAttribute("rel", "stylesheet");
            script.setAttribute("type", "text/css");
            script.setAttribute("href", url);

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
        var container = document.createElement('div');
        container.id = 'visualization';
        document.body.appendChild(container);

        var arr = _.chain(data)
            .map(function(item, index) {
                return {
                    id: index,
                    content: item.name,
                    start: item.time
                }
            })
            .sortBy('time')
            .value();
  
        var items = new vis.DataSet(arr);

        // Configuration for the Timeline
        var options = {
            editable: true,
            start: arr[0].start,
            end: arr[arr.length - 1].start
        };

        // Create a Timeline
        var timeline = new vis.Timeline(
            container,
            items,
            options
        );
    }
};

api.renderData();