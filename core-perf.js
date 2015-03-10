var api = {
    renderData: function() {
        var data = window.performance.getEntriesByType('mark');

        this.createTimeline();
    },

    createTimeline: function() {
        var timeline = document.createElement('div');
        timeline.id = "timeline";
        timeline.style.cssText = "position: fixed; z-index: 6000; left: 0, bottom: 0; background-color: black; width: 100%; height: 2em;";
        document.body.appendChild(timeline);
    }
};

api.renderData();