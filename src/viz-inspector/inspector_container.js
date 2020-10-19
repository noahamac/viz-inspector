import React from "react";
import ReactDOM from "react-dom";
import VizInspector from './VizInspector'
import * as d3 from "d3";
import moment from "moment";
import { timeYears } from "d3";

looker.plugins.visualizations.add({
  id: "viz_inspector_marketplace",
  label: "Viz Inspector",
  options: {
    view: {
      type: "string",
      label: "Visible",
      display: "select",
      section: "Plot",
      values: [
        {"data": "data"},
        {"element": "element"},
        {"config": "config"},
        {"queryResponse": "queryResponse"},
        {"details": "details"},
        {"done": "done"},
        {"this": "viz"},
      ],
      default: "config",
    },
  },
  create: function(element, config) {
    this.chart = ReactDOM.render(<div className="viz"></div>, element);
  },
  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    this.chart = ReactDOM.render(
      <VizInspector
        viz={this}
        width={element.clientWidth}
        height={element.clientHeight}
        data={data}
        element={element}
        config={config}
        queryResponse={queryResponse}
        details={details}
        done={done}
      />,
      element
    );
    done();
  }
});
