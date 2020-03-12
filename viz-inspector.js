looker.plugins.visualizations.add({
  id: "viz-inspector",
  label: "Viz Inspector",
  options: {
  },
  create: function(element, config) {
    element.innerHTML = `
      <style>
        .viz-inspector {
          height: 100%;
          left: 0px;
          top: 0px;
        }
      </style>
    `;
    var container = element.appendChild(document.createElement("body"));
  },
  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();
    data != undefined ? JSONFormatter(data) : JSONFormatter({})
    done()
  }
});