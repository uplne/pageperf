var api = {
    renderData: function() {
        var data = window.performance.getEntriesByType('mark');
    }
};

api.renderData();