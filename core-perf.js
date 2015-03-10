var api = {
    renderData: function() {
        var data = window.performance.getEntriesByType('mark');

        this.createTimeline();
    },

    createTimeline: function() {
        var timeline = $(document.createElement('div')),
            body     = $('body');
        
        timeline.id = "timeline";
        timeline.css({
            position: 'fixed',
            top: 0,
            bottom: 0,
            width: 100%,
            height: 3em,
            backgroundColor: 'black'
        });
        body.append(timeline);
    }
};

api.renderData();