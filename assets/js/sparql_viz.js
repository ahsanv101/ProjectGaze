////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Pictogram DLG
////////////////////////////////////////////////////////////////////////////////

/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

var rowSize = 14;
var colSize = 11;

function generateData(count) {
  var row = 1;
  var col = 1;
  var data = [];
  for (var i = 0; i < count; i++) {
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
  for (var i = 0; i < count; i++) {
    data.push({
      cat: (i + 1) + ""
    });
  }
  return data;
}



// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("SPARQLchartWRT");


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
  //wheelX: "panX",
  //wheelY: "zoomX",
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
    text: "[#247ba0][fontFamily: Courier Prime]Male[/]\n[#247ba0][fontFamily: Courier Prime]143[/][#999999][fontFamily: Courier Prime]/154[/]\n\n[#f25f5c][fontFamily: Courier Prime]Female[/]\n[#f25f5c][fontFamily: Courier Prime]11[/][#999999][fontFamily: Courier Prime]/154[/]",
    fontSize: 20,
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


  series.bullets.push(function (root) {
    return am5.Bullet.new(root, {
      locationX: 0.5,
      locationY: 0.5,
      sprite: am5.Graphics.new(root, {
        fill: color,
        svgPath: path,
        centerX: am5.p50,
        centerY: am5.p50,
        scale: 2
      })
    });
  });

  series.data.setAll(data);

  series.appear();
  return series;
}

var femaleColor = am5.color(0x93b487);
var maleColor = am5.color(0xb15859);
var placeholderColor = am5.color(0x999999);

var maleIcon = "M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"

var maleSeriesMax = makeSeries("Male", yAxis1, generateData(154), placeholderColor, maleIcon, false);
var maleSeries = makeSeries("Male", yAxis1, generateData(154), maleColor, maleIcon, true);
var FemaleSeries = makeSeries("Male", yAxis1, generateData(11), femaleColor, maleIcon, true);

//var femaleSeriesMax = makeSeries("Female", yAxis2, generateData(100), placeholderColor, femaleIcon, false);
//var femaleSeries = makeSeries("Female", yAxis2, generateData(67), femaleColor, femaleIcon, true);

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

var tooltip = am5.Tooltip.new(root, {
  getFillFromSprite: false,
  getStrokeFromSprite: true,
  autoTextColor: false,
  getLabelFillFromSprite: true,
  labelText: "[fontFamily: Courier Prime,bold]{category}[/][fontFamily: Courier Prime] :{value}"
});

tooltip.get("background").setAll({
  fill: am5.color(0xffffff),
  fillOpacity: 0.6
});

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    endAngle: 270,
    tooltip: tooltip
  })
);

series.states.create("hidden", {
  endAngle: -90
});

series.labels.template.setAll({
  text: "[fontFamily: Courier Prime]{category}"
});

series.get("colors").set("colors", [
  am5.color(0x449296),
  am5.color(0x93b487),
  am5.color(0xeabf8a),
  am5.color(0xb15859),
  am5.color(0x835b91),
  am5.color(0x163c6d)
]);

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
  pinchZoomX: true,
  pinchZoomY: true
}));

chart.get("colors").set("step", 2);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
  //tooltip: am5.Tooltip.new(root, {})
}));

xAxis.children.push(
  am5.Label.new(root, {
    text: "[fontFamily: Courier Prime]Production costs",
    x: am5.p50,
    centerX: am5.p50
  })
);

xAxis.get("renderer").labels.template.setAll({
  oversizedBehavior: "truncate",
  maxWidth: 100
});

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {}),
  //tooltip: am5.Tooltip.new(root, {})
}));

yAxis.children.unshift(
  am5.Label.new(root, {
    rotation: -90,
    text: "[fontFamily: Courier Prime]Box Office",
    y: am5.p50,
    centerX: am5.p50
  })
);

var MyAxisLabels = am5.Theme.new(root);
MyAxisLabels.rule("AxisLabel").setAll({
  fontFamily: "Courier Prime"
});
root.setThemes([
  MyAxisLabels
]);

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series0 = chart.series.push(am5xy.LineSeries.new(root, {
  calculateAggregates: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "BoxOffice",
  valueXField: "ProductionCosts",
  valueField: "gaze_score",
  tooltip: am5.Tooltip.new(root, {
    labelText: "[fontFamily: Courier Prime,#FFFFFF]ProductionCosts: {valueX}, BoxOffice: {valueY}, Gaze Score: {value}"
  })
}));


// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
var circleTemplate = am5.Template.new({});
series0.bullets.push(function () {
  var graphics = am5.Circle.new(root, {
    fill: series0.set("fill", am5.color(0x835b91)),
    fillOpacity: 0.7,
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
  max: 20,
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

var data = [
  {
    "ProductionCosts": 140000000,
    "BoxOffice": 305413918,
    "gaze_score": 30.25
  },
  {
    "ProductionCosts": 90000000,
    "BoxOffice": 250690539,
    "gaze_score": 51.66
  },
  {
    "ProductionCosts": 113000000,
    "BoxOffice": 380270577,
    "gaze_score": 54.86
  },
  {
    "ProductionCosts": 54000000,
    "BoxOffice": 108185706,
    "gaze_score": 32.12
  },
  {
    "ProductionCosts": 200000000,
    "BoxOffice": 659363944,
    "gaze_score": 51.66
  },
  {
    "ProductionCosts": 11000000,
    "BoxOffice": 460998507,
    "gaze_score": 51.66
  },
  {
    "ProductionCosts": 125000000,
    "BoxOffice": 215409889,
    "gaze_score": 71.29
  },
  {
    "ProductionCosts": 225000000,
    "BoxOffice": 291045518,
    "gaze_score": 35.13
  },
  {
    "ProductionCosts": 10500000,
    "BoxOffice": 435110554,
    "gaze_score": 0.0
  },
  {
    "ProductionCosts": 250000000,
    "BoxOffice": 381447587,
    "gaze_score": 33.96
  },
  {
    "ProductionCosts": 15000000,
    "BoxOffice": 45306425,
    "gaze_score": 65.0
  },
  {
    "ProductionCosts": 139000000,
    "BoxOffice": 407022860,
    "gaze_score": 60.79
  },
  {
    "ProductionCosts": 55000000,
    "BoxOffice": 134478449,
    "gaze_score": 55.84
  },
  {
    "ProductionCosts": 100000000,
    "BoxOffice": 184069126,
    "gaze_score": 51.66
  },
  {
    "ProductionCosts": 80000000,
    "BoxOffice": 162924631,
    "gaze_score": 61.16
  },
  {
    "ProductionCosts": 1400000,
    "BoxOffice": 8400000,
    "gaze_score": 21.07
  },
  {
    "ProductionCosts": 200000000,
    "BoxOffice": 373585825,
    "gaze_score": 55.07
  },
  {
    "ProductionCosts": 9000000,
    "BoxOffice": 260758300,
    "gaze_score": 25.0
  },
  {
    "ProductionCosts": 220000000,
    "BoxOffice": 623357910,
    "gaze_score": 54.86
  },
  {
    "ProductionCosts": null,
    "BoxOffice": 319246193,
    "gaze_score": 0.0
  },
  {
    "ProductionCosts": 32500000,
    "BoxOffice": 309306177,
    "gaze_score": 51.66
  },
  {
    "ProductionCosts": 18000000,
    "BoxOffice": 292753960,
    "gaze_score": 65.0
  },
  {
    "ProductionCosts": 102000000,
    "BoxOffice": 205881154,
    "gaze_score": 42.29
  },
  {
    "ProductionCosts": 63000000,
    "BoxOffice": 404214720,
    "gaze_score": 27.41
  },
  {
    "ProductionCosts": 115000000,
    "BoxOffice": 474544677,
    "gaze_score": 25.0
  },
  {
    "ProductionCosts": 185000000,
    "BoxOffice": 534987076,
    "gaze_score": 25.0
  },
  {
    "ProductionCosts": 800000,
    "BoxOffice": 82000000,
    "gaze_score": 35.96
  },
  {
    "ProductionCosts": 55000000,
    "BoxOffice": 330455270,
    "gaze_score": 60.17
  },
  {
    "ProductionCosts": 250000000,
    "BoxOffice": 302334374,
    "gaze_score": 35.30
  },
  {
    "ProductionCosts": 225000000,
    "BoxOffice": 423315812,
    "gaze_score": 41.53
  },
  {
    "ProductionCosts": 35000000,
    "BoxOffice": 251409241,
    "gaze_score": 56.91
  },
  {
    "ProductionCosts": 30000000,
    "BoxOffice": 243578797,
    "gaze_score": 38.33
  },
  {
    "ProductionCosts": 15000000,
    "BoxOffice": 180258178,
    "gaze_score": 41.53
  },
  {
    "ProductionCosts": 10500000,
    "BoxOffice": 60481243,
    "gaze_score": 65.0
  },
  {
    "ProductionCosts": 125000000,
    "BoxOffice": 317557891,
    "gaze_score": 25.0
  },
  {
    "ProductionCosts": 19000000,
    "BoxOffice": 212836762,
    "gaze_score": 38.33
  },
  {
    "ProductionCosts": 237000000,
    "BoxOffice": 760507625,
    "gaze_score": 33.01
  },
  {
    "ProductionCosts": 245000000,
    "BoxOffice": 936662225,
    "gaze_score": 30.92
  },
  {
    "ProductionCosts": 200000000,
    "BoxOffice": 700426566,
    "gaze_score": 31.96
  },
  {
    "ProductionCosts": 200000000,
    "BoxOffice": 532177324,
    "gaze_score": 25.0
  },
  {
    "ProductionCosts": 200000000,
    "BoxOffice": 620181382,
    "gaze_score": 16.05
  }
]

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

series0.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series0.appear(1000);

chart.appear(1000, 100);
