project_name: "viz-inspector-marketplace"

constant: VIS_LABEL {
  value: "Viz Inspector"
  export: override_optional
}

constant: VIS_ID {
  value: "viz-inspector-marketplace"
  export:  override_optional
}

visualization: {
  id: "@{VIS_ID}"
  url: "dist.js"
  label: "@{VIS_LABEL}"
}
