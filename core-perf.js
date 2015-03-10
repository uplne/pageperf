var api = {
    renderData: function() {
        var data = window.performance.getEntriesByType('mark');
        console.log(data);
    }
};

api.renderData();