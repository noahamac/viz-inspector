var tree;
function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}
looker.plugins.visualizations.add({
  id: "viz-inspector",
  label: "Viz Inspector",
  options: {
  },
  create: function(element, config) {
    element.innerHTML = `
    <style>
    .jsontree_bg {
        background: #FFF;
    }
    
    /* Styles for the container of the tree (e.g. fonts, margins etc.) */
    .jsontree_tree {
        margin-left: 30px;
        font-family: 'PT Mono', monospace;
        font-size: 14px;
    }
    
    /* Styles for a list of child nodes */
    .jsontree_child-nodes {
        display: none;
        margin-left: 35px;
        margin-bottom: 5px;
        line-height: 2;
    }
    .jsontree_node_expanded > .jsontree_value-wrapper > .jsontree_value > .jsontree_child-nodes {
        display: block;
    }
    
    /* Styles for labels */
    .jsontree_label-wrapper {
        float: left;
        margin-right: 8px;
    }
    .jsontree_label {
        font-weight: normal;
        vertical-align: top;
        color: #000;
        position: relative;
        padding: 1px;
        border-radius: 4px;
        cursor: default;
    }
    .jsontree_node_marked > .jsontree_label-wrapper > .jsontree_label {
        background: #fff2aa;
    }
    
    /* Styles for values */
    .jsontree_value-wrapper {
        display: block;
        overflow: hidden;
    }
    .jsontree_node_complex > .jsontree_value-wrapper {
        overflow: inherit;
    }
    .jsontree_value {
        vertical-align: top;
        display: inline;
    }
    .jsontree_value_null {
        color: #777;
        font-weight: bold;
    }
    .jsontree_value_string {
        color: #025900;
        font-weight: bold;
    }
    .jsontree_value_number {
        color: #000E59;
        font-weight: bold;
    }
    .jsontree_value_boolean {
        color: #600100;
        font-weight: bold;
    }
    
    /* Styles for active elements */
    .jsontree_expand-button {
        position: absolute;
        top: 3px;
        left: -15px;
        display: block;
        width: 11px;
        height: 11px;
        background-image: url('icons.svg');
    }
    .jsontree_node_expanded > .jsontree_label-wrapper > .jsontree_label > .jsontree_expand-button {
        background-position: 0 -11px;
    }
    .jsontree_show-more {
        cursor: pointer;
    }
    .jsontree_node_expanded > .jsontree_value-wrapper > .jsontree_value > .jsontree_show-more {
        display: none;
    }
    .jsontree_node_empty > .jsontree_label-wrapper > .jsontree_label > .jsontree_expand-button,
    .jsontree_node_empty > .jsontree_value-wrapper > .jsontree_value > .jsontree_show-more {
        display: none !important;
    }
    .jsontree_node_complex > .jsontree_label-wrapper > .jsontree_label {
        cursor: pointer;
    }
    .jsontree_node_empty > .jsontree_label-wrapper > .jsontree_label {
        cursor: default !important;
    }
    </style>`
    
    var container = element.appendChild(document.createElement("div"));
    container.className = 'viz-inspector'
    
    var collapse_btn = element.appendChild(document.createElement("BUTTON"));
    collapse_btn.innerHTML = `Collapse`
    collapse_btn.className = 'collapse_btn'
    
    var expand_btn = element.appendChild(document.createElement("BUTTON"));
    expand_btn.innerHTML = `Expand`
    expand_btn.className = 'expand_btn'
    
    var copy_btn = element.appendChild(document.createElement("BUTTON"));
    copy_btn.innerHTML = `Copy to Clipboard`
    copy_btn.className = 'copy_btn'
    
    var selectList = element.appendChild(document.createElement("select"));
    selectList.innerHTML = `
      <option value="data">data</option>
      <option value="queryResponse">queryResponse</option>
      <option value="config">config</option>
      <option value="details">details</option>
    `
    selectList.className = 'select_list'
    
    tree = jsonTree.create({}, element);
  },
  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();
    var obj_name = document.querySelector('.select_list').value
    tree.loadData(eval(obj_name));
    $('.collapse_btn').click(function () {
      tree.collapse()
    });
    $('.expand_btn').click(function () {
      tree.expand()
    });
    $('.copy_btn').click(function () {
      obj_name = document.querySelector('.select_list').value
      copyToClipboard(JSON.stringify(eval(obj_name)))
    });
    $('.select_list').on('change', function () {
      obj_name = document.querySelector('.select_list').value
      tree.loadData(eval(obj_name));
    });
    done()
  }
});
