looker.plugins.visualizations.add({
  // Id and Label are legacy properties that no longer have any function besides documenting
  // what the visualization used to have. The properties are now set via the manifest
  // form within the admin/visualizations page of Looker
  id: "viz-inspector",
  label: "Viz Inspector",
  options: {
    font_size: {
      type: "string",
      label: "Font Size",
      values: [
        {"Large": "large"},
        {"Small": "small"}
      ],
      display: "radio",
      default: "large"
    }
  },
  // Set up the initial state of the visualization
  create: function(element, config) {

    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = `
      <style>
        .viz-inspector {
          /* Vertical centering */
          height: 100%;
          left: 0px;
          top: 0px;
        }
      </style>
    `;

    // Create a container element to let us center the text.
    var container = element.appendChild(document.createElement("div"));
    container.className = "viz-inspector";

    // Create an element to contain the text.
    this._text = container.appendChild(document.createElement("div"));


  },
  // Render in response to the data or settings changing
  updateAsync: function(data, element, config, queryResponse, details, done) {

    // Clear any errors from previous updates
    this.clearErrors();

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    // if (queryResponse.fields.dimensions.length == 0) {
    //   this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
    //   return;
    // }

    // Grab the first cell of the data
    // var firstRow = data[0];
    // var firstCell = firstRow[queryResponse.fields.dimensions[0].name];

    // Insert the data into the page
    this._text.innerHTML = "DATA: " + JSON.stringify(data, null, 2) + "<br/><br/>";
    this._text.innerHTML += "CONFIG: " + JSON.stringify(config, null, 2) + "<br/><br/>";
    this._text.innerHTML += "QUERYRESPONSE: " + JSON.stringify(queryResponse, null, 2) + "<br/><br/>";
    this._text.innerHTML += "DETAILS: " + JSON.stringify(details, null, 2) + "<br/><br/>";

    // Set the size to the user-selected size
    // if (config.font_size == "small") {
    //   this._textElement.className = "hello-world-text-small";
    // } else {
    //   this._textElement.className = "hello-world-text-large";
    // }

    // We are done rendering! Let Looker know.
    done()
  }
});