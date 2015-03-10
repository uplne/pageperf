var api = {
    renderData: function() {
        var data = window.performance.getEntriesByType('mark');

        this.createTimeline();
        this.parseData(data);
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
    }
};

api.renderData();