var api = {
    renderData: function() {
        var data = window.performance.getEntriesByType('mark');

        this.loadScripts();
        this.createTimeline();
        this.parseData(data);
    },

    loadScripts: function() {
        var lodash = document.createElement('script');
        lodash.src = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.5.0/lodash.min.js';
        document.body.appendChild(lodash);

        var jquery = document.createElement('script');
        jquery.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js';
        document.body.appendChild(jquery);

        var visjs = document.createElement('script');
        visjs.src = 'https://cdnjs.cloudflare.com/ajax/libs/vis/3.10.0/vis.min.js';
        document.body.appendChild(visjs);

        var viscss = document.createElement('link');
        viscss.setAttribute("rel", "stylesheet");
        viscss.setAttribute("type", "text/css");
        viscss.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/vis/3.10.0/vis.min.css");
        document.body.appendChild(viscss);
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

    parseData: function(data) {
        console.log(_.chain(data)
        .map(function(item) {
            return {
                name: item.name,
                time: item.startTime
            }
        })
        .sortBy('time')
        .value());
    },

    visualizeData: function(data) {
        var container = document.createElement('div');
        container.id = 'visualization';
        document.body.append(container);

        var arr = _.map(data, function(item, index) {
            return {
                id: index,
                content: item.name,
                start: item.time
            }
        })
  
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