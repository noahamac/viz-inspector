project_name: "viz-calendar_heatmap-marketplace"

constant: VIS_LABEL {
  value: "Calendar Heatmap"
  export: override_optional
}

constant: VIS_ID {
  value: "calendar_heatmap-marketplace"
  export:  override_optional
}

visualization: {
  id: "@{VIS_ID}"
  url: "https://marketplace-api.looker.com/viz-dist/calendar_chart_v2.js"
  label: "@{VIS_LABEL}"
}
