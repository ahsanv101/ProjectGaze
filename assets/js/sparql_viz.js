
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Pictogram DLG
////////////////////////////////////////////////////////////////////////////////

var rowSize = 32;
var colSize = 5;

function generateData(count) {
  var row = 1;
  var col = 1;
  var data = [];
  for(var i = 0; i < count; i++) {
    data.push({
      x: col + "",
      y: row + ""
    });
    col++;
    if (col > rowSize) {
      row++;
      col = 1;
    }
  }
  return data;
}

function generateCategories(count) {
  var data = [];
  for(var i = 0; i < count; i++) {
    data.push({
      cat: (i + 1) + ""
    });
  }
  return data;
}



// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("SPARQLchartDLG");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  layout: root.verticalLayout
}));


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "cat",
  renderer: am5xy.AxisRendererX.new(root, {})
}));
var xRenderer = xAxis.get("renderer");
xRenderer.labels.template.set("forceHidden", true);
xRenderer.grid.template.set("forceHidden", true);
xAxis.data.setAll(generateCategories(rowSize));

var yAxis1 = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "cat",
  renderer: am5xy.AxisRendererY.new(root, {})
}));
var yRenderer1 = yAxis1.get("renderer");
yRenderer1.labels.template.set("forceHidden", true);
yRenderer1.grid.template.set("forceHidden", true);
yAxis1.data.setAll(generateCategories(colSize));

yAxis1.children.unshift(
  am5.Label.new(root, {
    text: "[#3e8488]Male[/]\n[#3e8488]143[/][#999999]/154[/]",
    fontSize: 32,
    y: am5.p50,
    centerY: am5.p50
  })
);

var yAxis2 = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "cat",
  renderer: am5xy.AxisRendererY.new(root, {}),
  marginTop: 20
}));
var yRenderer2 = yAxis2.get("renderer");
yRenderer2.labels.template.set("forceHidden", true);
yRenderer2.grid.template.set("forceHidden", true);
yAxis2.data.setAll(generateCategories(colSize));

yAxis2.children.unshift(
  am5.Label.new(root, {
    text: "[#b15859]Female[/]\n[#b15859]11[/][#999999]/154[/]",
    fontSize: 32,
    y: am5.p50,
    centerY: am5.p50
  })
);

chart.leftAxesContainer.set("layout", root.verticalLayout);


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function makeSeries(name, yAxis, data, color, path) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    categoryYField: "y",
    openCategoryYField: "y",
    categoryXField: "x",
    openCategoryXField: "x",
    clustered: false
  }));

  series.columns.template.setAll({
    width: am5.percent(100),
    height: am5.percent(100),
    fillOpacity: 0,
    strokeOpacity: 0
  });

  
  series.bullets.push(function(root) {
    return am5.Bullet.new(root, {
      locationX: 0.5,
      locationY: 0.5,
      sprite: am5.Graphics.new(root, {
        fill: color,
        svgPath: path,
        centerX: am5.p50,
        centerY: am5.p50,
        scale: 0.8
      })
    });
  });
  
  series.data.setAll(data);
  
  series.appear();
  return series;
}

var femaleColor = am5.color(0xb15859); /* b15859 */ /* f25f5c */
var maleColor = am5.color(0x3e8488); /* 57b5ba */ /* 247ba0 */ 
var placeholderColor = am5.color(0x999999);

var maleIcon = "M 25.1 10.7 c 2.1 0 3.7 -1.7 3.7 -3.7 c 0 -2.1 -1.7 -3.7 -3.7 -3.7 c -2.1 0 -3.7 1.7 -3.7 3.7 C 21.4 9 23 10.7 25.1 10.7 z M 28.8 11.5 H 25.1 h -3.7 c -2.8 0 -4.7 2.5 -4.7 4.8 V 27.7 c 0 2.2 3.1 2.2 3.1 0 V 17.2 h 0.6 v 28.6 c 0 3 4.2 2.9 4.3 0 V 29.3 h 0.7 h 0.1 v 16.5 c 0.2 3.1 4.3 2.8 4.3 0 V 17.2 h 0.5 v 10.5 c 0 2.2 3.2 2.2 3.2 0 V 16.3 C 33.5 14 31.6 11.5 28.8 11.5 z";
var femaleIcon = "M 18.4 15.1 L 15.5 25.5 c -0.6 2.3 2.1 3.2 2.7 1 l 2.6 -9.6 h 0.7 l -4.5 16.9 H 21.3 v 12.7 c 0 2.3 3.2 2.3 3.2 0 V 33.9 h 1 v 12.7 c 0 2.3 3.1 2.3 3.1 0 V 33.9 h 4.3 l -4.6 -16.9 h 0.8 l 2.6 9.6 c 0.7 2.2 3.3 1.3 2.7 -1 l -2.9 -10.4 c -0.4 -1.2 -1.8 -3.3 -4.2 -3.4 h -4.7 C 20.1 11.9 18.7 13.9 18.4 15.1 z M 28.6 7.2 c 0 -2.1 -1.6 -3.7 -3.7 -3.7 c -2 0 -3.7 1.7 -3.7 3.7 c 0 2.1 1.6 3.7 3.7 3.7 C 27 10.9 28.6 9.2 28.6 7.2 z";

var maleSeriesMax = makeSeries("Male", yAxis1, generateData(154), placeholderColor, maleIcon, false);
var maleSeries = makeSeries("Male", yAxis1, generateData(143), maleColor, maleIcon, true);

var femaleSeriesMax = makeSeries("Female", yAxis2, generateData(154), placeholderColor, femaleIcon, false);
var femaleSeries = makeSeries("Female", yAxis2, generateData(11), femaleColor, femaleIcon, true);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);



////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Pie chart MG1
////////////////////////////////////////////////////////////////////////////////

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("SPARQLchartMG1");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
var chart = root.container.children.push(
  am5percent.PieChart.new(root, {
    endAngle: 270
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    endAngle: 270
  })
);

series.states.create("hidden", {
  endAngle: -90
});

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll([{
  category: "Superhero movies",
  value: 4
}, {
  category: "Action movies",
  value: 1
}, {
  category: "Space adventure movies",
  value: 1
}, {
  category: "Science fiction movies",
  value: 1
}, {
  category: "Western movies",
  value: 1
}, {
  category: "Drama movies",
  value: 2
}]);

series.appear(1000, 100);





////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Bubble chart MG2
////////////////////////////////////////////////////////////////////////////////

/* // read local JSON file in javascript
data = fetch("data/sparql/mg2.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
 */

var arr = null;
$.ajax({
    'async': false,
    'global': false,
    'url': "/data.json",
    'dataType': "json",
    'success': function (data) {
        arr = data;
    }
});

console.log(arr)

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("SPARQLchartMG2");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelY: "zoomXY",
  pinchZoomX:true,
  pinchZoomY:true
}));

chart.get("colors").set("step", 2);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series0 = chart.series.push(am5xy.LineSeries.new(root, {
  calculateAggregates: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  valueField: "value",
  tooltip: am5.Tooltip.new(root, {
    labelText: "x: {valueX}, y: {valueY}, value: {value}"
  })
}));


// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
var circleTemplate = am5.Template.new({});
series0.bullets.push(function() {
  var graphics = am5.Circle.new(root, {
    fill: series0.get("fill"),
  }, circleTemplate);
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Add heat rule
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
series0.set("heatRules", [{
  target: circleTemplate,
  min: 3,
  max: 35,
  dataField: "value",
  key: "radius"
}]);

series0.strokes.template.set("strokeOpacity", 0);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  snapToSeries: [series0]
}));

// Add scrollbars
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical"
}));

/* 
var data = [{
  "y": 1,
  "x": 1,
  "value": 59,
}, {
  "y": 5,
  "x": 3,
  "value": 50,
}, {
  "y": 9,
  "x": 8,
  "value": 19,
}, {
  "y": 6,
  "x": 5,
  "value": 65,
}, {
  "y": 15,
  "x": 4,
  "value": 92,
}, {
  "y": 13,
  "x": 1,
  "value": 8,
}, {
  "y": 1,
  "x": 6,
  "value": 35,
}] */

series0.data.setAll(arr);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series0.appear(1000);

chart.appear(1000, 100);