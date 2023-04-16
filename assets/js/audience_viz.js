////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Audience bar chart 
////////////////////////////////////////////////////////////////////////////////
am5.ready(function () {

  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("AUDIENCE-Barchart");


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
    // wheelX: "panX",
    // wheelY: "zoomX",
    // pinchZoomX: true
  }));

  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
  cursor.lineY.set("visible", false);


  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
  xRenderer.labels.template.setAll({
    rotation: -90,
    centerY: am5.p50,
    centerX: am5.p100,
    paddingRight: 15
  });

  xRenderer.grid.template.setAll({
    location: 1
  })

  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.3,
    categoryField: "Title",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  }));
  
  xAxis.get("renderer").labels.template.setAll({
  oversizedBehavior: "fit",
  });


  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 0.3,
    renderer: am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1
    })
  }));

  var MyAxisLabels = am5.Theme.new(root);
  MyAxisLabels.rule("AxisLabel").setAll({
    fontFamily: "Courier New",
    fontSize: 12
  });
  root.setThemes([
    MyAxisLabels
  ]);
  
  var scrollbarX = am5xy.XYChartScrollbar.new(root, {
    orientation: "horizontal",
    height: 50
  });

chart.set("scrollbarX", scrollbarX);

  // Create series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "Series 1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "AVG sentiment",
    sequencedInterpolation: true,
    categoryXField: "Title",
    fill: am5.color(0x835b91),
    //stroke: am5.color(0x095256),
    tooltip: am5.Tooltip.new(root, {
      am5.Tooltip.rule("tooltip").setAll({
        fontFamily: "Courier New",
        fontSize: 12
  });
      
      //labelText: "[fontFamily: Courier Prime,#FFFFFF]{valueY}"
    })
  }));

  series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
  /*series.columns.template.adapters.add("fill", function (fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  series.columns.template.adapters.add("stroke", function (stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  }); */


  // Set data
  var data = [{
    "Title": "2001: A Space Odyssey",
    "AVG sentiment": 0.824364
  },
  {
    "Title": "All About Eve",
    "AVG sentiment": 0.945763
  },
  {
    "Title": "Avatar",
    "AVG sentiment": 0.749356
  },
  {
    "Title": "Avengers: Endgame",
    "AVG sentiment": 0.466012
  },
  {
    "Title": "Back to the Future",
    "AVG sentiment": 0.9642386153846
  },
  {
    "Title": "Batman",
    "AVG sentiment": 0.848408
  },
  {
    "Title": "Batman Forever",
    "AVG sentiment": 0.644444
  },
  {
    "Title": "Batman Returns",
    "AVG sentiment": 0.702332
  },
  {
    "Title": "Beverly Hills Cop II",
    "AVG sentiment": 0.854596
  },
  {
    "Title": "Black Panther",
    "AVG sentiment": 0.38386
  },
  {
    "Title": "Blazing Saddles",
    "AVG sentiment": 0.802162
  },
  {
    "Title": "Butch Cassidy and the Sundance Kid",
    "AVG sentiment": 0.733344
  },
  {
    "Title": "Casablanca",
    "AVG sentiment": 0.98914
  },
  {
    "Title": "Cat on a Hot Tin Roof",
    "AVG sentiment": 0.559521
  },
  {
    "Title": "Cleopatra",
    "AVG sentiment": 0.671088
  },
  {
    "Title": "E.T. the Extra-Terrestrial",
    "AVG sentiment": 0.79138
  },
  {
    "Title": "Fiddler on the Roof",
    "AVG sentiment": 0.97328
  },
  {
    "Title": "Forever Amber",
    "AVG sentiment": 0.736903
  },
  {
    "Title": "Forrest Gump",
    "AVG sentiment": 0.930992
  },
  {
    "Title": "From Here To Eternity",
    "AVG sentiment": 0.848916
  },
  {
    "Title": "Ghost",
    "AVG sentiment": " 0.877444"
  },
  {
    "Title": "Ghostbusters",
    "AVG sentiment": 0.945372
  },
  {
    "Title": "Going My Way",
    "AVG sentiment": 0.9588
  },
  {
    "Title": "Gone with the Wind",
    "AVG sentiment": 0.870536
  },
  {
    "Title": "Grease",
    "AVG sentiment": 0.954555
  },
  {
    "Title": "Harry Potter and the Deathly Hallows: Part 2",
    "AVG sentiment": 0.654337
  },
  {
    "Title": "Harry Potter and the Half Blood Prince ",
    "AVG sentiment": 0.445196
  },
  {
    "Title": "Harry Potter and the Sorcerers Stone",
    "AVG sentiment": 0.966264
  },
  {
    "Title": "Independence Day",
    "AVG sentiment": 0.347692
  },
  {
    "Title": "JAWS",
    "AVG sentiment": 0.67524
  },
  {
    "Title": "Jurassic Park",
    "AVG sentiment": 0.9064
  },
  {
    "Title": "Lawrence of Arabia",
    "AVG sentiment": 0.830623
  },
  {
    "Title": "Love Story",
    "AVG sentiment": 0.823352
  },
  {
    "Title": "Man of Steel",
    "AVG sentiment": 0.666947
  },
  {
    "Title": "Mary Poppins",
    "AVG sentiment": 0.841872
  },
  {
    "Title": "Men in Black",
    "AVG sentiment": 0.889036
  },
  {
    "Title": "Mission Impossible II",
    "AVG sentiment": 0.373846
  },
  {
    "Title": "Pirates of the Caribbean: Dead Mans Chest",
    "AVG sentiment": 0.538244
  },
  {
    "Title": "Pirates of the Caribbean: The Curse of the Black Pearl",
    "AVG sentiment": 0.868730
  },
  {
    "Title": "Psycho",
    "AVG sentiment": 0.333404
  },
  {
    "Title": "Quo Vadis?",
    "AVG sentiment": 0.835096
  },
  {
    "Title": "Rocky",
    "AVG sentiment": 0.929748
  },
  {
    "Title": "Rogue One: A Star Wars Story",
    "AVG sentiment": 0.229788
  },
  {
    "Title": "Samson and Delilah",
    "AVG sentiment": 0.677692
  },
  {
    "Title": "Sergeant York",
    "AVG sentiment": 0.870572
  },
  {
    "Title": "Some like it hot",
    "AVG sentiment": 0.977403
  },
  {
    "Title": "Song of the South",
    "AVG sentiment": 0.588433
  },
  {
    "Title": "Spider-Man 2",
    "AVG sentiment": 0.893468
  },
  {
    "Title": "Spiderman",
    "AVG sentiment": 0.867508
  },
  {
    "Title": "Star Wars: Episode I - The Phantom Menace",
    "AVG sentiment": 0.745561
  },
  {
    "Title": "Star Wars: Episode III - Revenge of the Sith",
    "AVG sentiment": 0.176484
  },
  {
    "Title": "Star Wars: Episode IV - A New Hope",
    "AVG sentiment": 0.532369
  },
  {
    "Title": "Star Wars: Episode V - The Empire Strikes Back",
    "AVG sentiment": 0.735564
  },
  {
    "Title": "Star Wars: Episode VI - Return of the Jedi",
    "AVG sentiment": 0.447164
  },
  {
    "Title": "Star Wars: Episode VIII - The Last Jedi",
    "AVG sentiment": 0.238004
  },
  {
    "Title": "Star Wars: The Force Awakens",
    "AVG sentiment": 0.494348
  },
  {
    "Title": "Superman",
    "AVG sentiment": 0.817288
  },
  {
    "Title": "Superman II",
    "AVG sentiment": 0.493787
  },
  {
    "Title": "Terminator 2: Judgment Day",
    "AVG sentiment": 0.821007
  },
  {
    "Title": "The Avengers",
    "AVG sentiment": 0.949168
  },
  {
    "Title": "The Bells of St. Mary",
    "AVG sentiment": 0.960307
  },
  {
    "Title": "The Bible",
    "AVG sentiment": 0.9984
  },
  {
    "Title": "The Bridge on the River Kwai",
    "AVG sentiment": 0.920164
  },
  {
    "Title": "The Dark Knight",
    "AVG sentiment": 0.828008
  },
  {
    "Title": "The Exorcist",
    "AVG sentiment": 0.024424
  },
  {
    "Title": "The Godfather",
    "AVG sentiment": 0.737704
  },
  {
    "Title": "The Graduate",
    "AVG sentiment": 0.864592
  },
  {
    "Title": "The Greatest Show on Earth",
    "AVG sentiment": 0.920164
  },
  {
    "Title": "The Sea Chase",
    "AVG sentiment": 0.555912
  },
  {
    "Title": "The Snake Pit",
    "AVG sentiment": 0.571724
  },
  {
    "Title": "The Sound of Music",
    "AVG sentiment": 0.870596
  },
  {
    "Title": "The Ten Commandments",
    "AVG sentiment": 0.966792
  },
  {
    "Title": "Titanic",
    "AVG sentiment": 0.616566
  },
  {
    "Title": "Top Gun",
    "AVG sentiment": 0.734696
  },
  {
    "Title": "Transformers",
    "AVG sentiment": 0.713748
  },
  {
    "Title": "West Side Story",
    "AVG sentiment": 0.987488
  },
  {
    "Title": "White Christmas",
    "AVG sentiment": 0.932012
  },
  {
    "Title": "Who Framed Roger Rabbit",
    "AVG sentiment": 0.785553
  },
  {
    "Title": "X-Men: Days of Future Past",
    "AVG sentiment": 0.785
  },
  {
    "Title": "Yankee Doodle Dandy",
    "AVG sentiment": 0.952376
  }];

  xAxis.data.setAll(data);
  series.data.setAll(data);


  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(1000, 100);

}); // end am5.ready()

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Audience pie 
////////////////////////////////////////////////////////////////////////////////

am5.ready(function () {


  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("AUDIENCE-Pie");

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([am5themes_Animated.new(root)]);

  var container = root.container.children.push(
    am5.Container.new(root, {
      width: am5.p100,
      height: am5.p100,
      layout: root.horizontalLayout
    })
  );

  // Create main chart
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
  var chart = container.children.push(
    am5percent.PieChart.new(root, {
      tooltip: am5.Tooltip.new(root, {})
    })
  );

  // Create series
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
  var series = chart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: "value",
      categoryField: "category",
      alignLabels: false,
    })
  );

  //series.labels.template.set("forceHidden", true);

  series.labels.template.setAll({
    text: "[fontFamily: Courier Prime]{category}",
    textType: "radial",
    oversizedBehavior: "wrap",
    fontSize: 12,
    radius: 10,
    maxWidth: 150,
    inside: true
  });

  series.ticks.template.set("visible", false);
  series.slices.template.set("toggleKey", "none");

  // add events
  series.slices.template.events.on("click", function (e) {
    selectSlice(e.target);
  });

  series.get("colors").set("colors", [
    am5.color(0x449296),
    am5.color(0x93b487),
    am5.color(0xeabf8a),
    am5.color(0xb15859),
    am5.color(0x835b91),
    am5.color(0x163c6d),
    am5.color(0x449296),
    am5.color(0x93b487),
    am5.color(0xeabf8a),
    am5.color(0xb15859),
    am5.color(0x835b91),
    am5.color(0x163c6d),
    am5.color(0x449296),
    am5.color(0x93b487),
    am5.color(0xeabf8a),
    am5.color(0xb15859),
    am5.color(0x835b91),
  ]);

  // Create sub chart
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
  var subChart = container.children.push(
    am5percent.PieChart.new(root, {
      radius: am5.percent(50),
      tooltip: am5.Tooltip.new(root, {})
    })
  );

  // Create sub series
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
  var subSeries = subChart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: "value",
      categoryField: "category",
      alignLabels: true
    })
  );

  subSeries.get("colors").set("colors", [
    am5.color(0xb15859),
    am5.color(0x93b487)
  ]);

  subSeries.data.setAll([
    { category: "sexist", value: 0 },
    { category: "not sexist", value: 0 }]);

  subSeries.slices.template.set("toggleKey", "none");
  subSeries.labels.template.setAll({
    textType: "circular",
    inside: true,
    radius: 10,
    text: "[fontFamily: Courier Prime]{category}"
  });

  var selectedSlice;

  series.on("startAngle", function () {
    updateLines();
  });

  container.events.on("boundschanged", function () {
    root.events.on("frameended", function () {
      updateLines();
    })
  })

  function updateLines() {
    if (selectedSlice) {
      var startAngle = selectedSlice.get("startAngle");
      var arc = selectedSlice.get("arc");
      var radius = selectedSlice.get("radius");

      var x00 = radius * am5.math.cos(startAngle);
      var y00 = radius * am5.math.sin(startAngle);

      var x10 = radius * am5.math.cos(startAngle + arc);
      var y10 = radius * am5.math.sin(startAngle + arc);

      var subRadius = subSeries.slices.getIndex(0).get("radius");
      var x01 = 0;
      var y01 = -subRadius;

      var x11 = 0;
      var y11 = subRadius;

      var point00 = series.toGlobal({ x: x00, y: y00 });
      var point10 = series.toGlobal({ x: x10, y: y10 });

      var point01 = subSeries.toGlobal({ x: x01, y: y01 });
      var point11 = subSeries.toGlobal({ x: x11, y: y11 });

      line0.set("points", [point00, point01]);
      line1.set("points", [point10, point11]);
    }
  }

  // lines
  var line0 = container.children.push(
    am5.Line.new(root, {
      position: "absolute",
      stroke: root.interfaceColors.get("text"),
      strokeDasharray: [2, 2]
    })
  );
  var line1 = container.children.push(
    am5.Line.new(root, {
      position: "absolute",
      stroke: root.interfaceColors.get("text"),
      strokeDasharray: [2, 2]
    })
  );

  // Set data
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
  series.data.setAll([
    {
      category: "All About Eve",
      value: 30,
      subData: [
        { category: "sexist", value: 4 },
        { category: "not sexist", value: 26 },
      ]
    },
    {
      category: "Cat on a Hot Tin Roof",
      value: 28,
      subData: [
        { category: "sexist", value: 3 },
        { category: "not sexist", value: 25 },
      ]
    },
    {
      category: "Cleopatra",
      value: 26,
      subData: [
        { category: "sexist", value: 1 },
        { category: "not sexist", value: 25 },
      ]
    },
    {
      category: "Forever Amber",
      value: 33,
      subData: [
        { category: "sexist", value: 4 },
        { category: "not sexist", value: 29 },
      ]
    },
    {
      category: "Ghostbusters",
      value: 25,
      subData: [
        { category: "sexist", value: 1 },
        { category: "not sexist", value: 24 },
      ]
    },
    {
      category: "Grease",
      value: 27,
      subData: [
        { category: "sexist", value: 2 },
        { category: "not sexist", value: 25 },
      ]
    },
    {
      category: "Lawrence of Arabia",
      value: 26,
      subData: [
        { category: "sexist", value: 1 },
        { category: "not sexist", value: 25 },
      ]
    },

    {
      category: "Mission Impossible II",
      value: 26,
      subData: [
        { category: "sexist", value: 2 },
        { category: "not sexist", value: 24 },
      ]
    },

    {
      category: "Pirates of the Caribbean: The Curse of the Black Pearl",
      value: 26,
      subData: [
        { category: "sexist", value: 1 },
        { category: "not sexist", value: 25 },
      ]
    },

    {
      category: "Quo Vadis?",
      value: 26,
      subData: [
        { category: "sexist", value: 2 },
        { category: "not sexist", value: 24 },
      ]
    },

    {
      category: "Rogue One: A Star Wars Story",
      value: 26,
      subData: [
        { category: "sexist", value: 1 },
        { category: "not sexist", value: 25 },
      ]
    },

    {
      category: "Some like it hot",
      value: 26,
      subData: [
        { category: "sexist", value: 1 },
        { category: "not sexist", value: 25 },
      ]
    },

    {
      category: "Star Wars: Episode IV - A New Hope",
      value: 26,
      subData: [
        { category: "sexist", value: 1 },
        { category: "not sexist", value: 25 },
      ]
    },

    {
      category: "Terminator 2: Judgment Day",
      value: 26,
      subData: [
        { category: "sexist", value: 1 },
        { category: "not sexist", value: 25 },
      ]
    },

    {
      category: "The Bells of St. Mary",
      value: 27,
      subData: [
        { category: "sexist", value: 2 },
        { category: "not sexist", value: 25 },
      ]
    },

    {
      category: "The Graduate",
      value: 26,
      subData: [
        { category: "sexist", value: 2 },
        { category: "not sexist", value: 24 },
      ]
    },

    {
      category: "Transformers",
      value: 27,
      subData: [
        { category: "sexist", value: 2 },
        { category: "not sexist", value: 25 },
      ]
    }
  ]);

  function selectSlice(slice) {
    selectedSlice = slice;
    var dataItem = slice.dataItem;
    var dataContext = dataItem.dataContext;

    if (dataContext) {
      var i = 0;
      subSeries.data.each(function (dataObject) {
        var dataObj = dataContext.subData[i];
        if (dataObj) {
          subSeries.data.setIndex(i, dataObj);
          if (!subSeries.dataItems[i].get("visible")) {
            subSeries.dataItems[i].show();
          }
        }
        else {
          subSeries.dataItems[i].hide();
        }

        i++;
      });
    }

    var middleAngle = slice.get("startAngle") + slice.get("arc") / 2;
    var firstAngle = series.dataItems[0].get("slice").get("startAngle");

    series.animate({
      key: "startAngle",
      to: firstAngle - middleAngle,
      duration: 1000,
      easing: am5.ease.out(am5.ease.cubic)
    });
    series.animate({
      key: "endAngle",
      to: firstAngle - middleAngle + 360,
      duration: 1000,
      easing: am5.ease.out(am5.ease.cubic)
    });
  }

  container.appear(1000, 10);

  series.events.on("datavalidated", function () {
    selectSlice(series.slices.getIndex(0));
  });

}); // end am5.ready()


////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Audience overlay  
////////////////////////////////////////////////////////////////////////////////

am5.ready(function () {

  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("AUDIENCE-Overlay");

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: true,
    panY: false,
    // wheelX: "panX",
    // wheelY: "zoomX",
    layout: root.verticalLayout
  }));


  // Add scrollbar
  // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
  /* chart.set("scrollbarX", am5.Scrollbar.new(root, {
    orientation: "horizontal"
  })); */

  var data = [{

    "Title": "All About Eve",
    "AVG sentiment": 9,
    "AVG sexism": 4
  },

  {
    "Title": "Cat on a Hot Tin Roof",
    "AVG sentiment": 5,
    "AVG sexism": 3
  },
  {
    "Title": "Cleopatra",
    "AVG sentiment": 6,
    "AVG sexism": 1
  },
  {
    "Title": "Forever Amber",
    "AVG sentiment": 7,
    "AVG sexism": 4
  },
  {
    "Title": "Ghostbusters",
    "AVG sentiment": 9,
    "AVG sexism": 1
  },
  {
    "Title": "Grease",
    "AVG sentiment": 9,
    "AVG sexism": 2
  },

  {
    "Title": "Lawrence of Arabia",
    "AVG sentiment": 8,
    "AVG sexism": 1
  },

  {
    "Title": "Mission Impossible II",
    "AVG sentiment": 3,
    "AVG sexism": 2
  },

  {
    "Title": "Pirates of the Caribbean: The Curse of the Black Pearl",
    "AVG sentiment": 8,
    "AVG sexism": 1
  },

  {
    "Title": "Quo Vadis?",
    "AVG sentiment": 8,
    "AVG sexism": 2
  },
  {
    "Title": "Rogue One: A Star Wars Story",
    "AVG sentiment": 2,
    "AVG sexism": 1
  },

  {
    "Title": "Some like it hot",
    "AVG sentiment": 9,
    "AVG sexism": 1
  },
  {
    "Title": "Star Wars: Episode IV - A New Hope",
    "AVG sentiment": 5,
    "AVG sexism": 1
  },

  {
    "Title": "Terminator 2: Judgment Day",
    "AVG sentiment": 8,
    "AVG sexism": 1
  },

  {
    "Title": "The Bells of St. Mary",
    "AVG sentiment": 9,
    "AVG sexism": 2
  },

  {
    "Title": "The Graduate",
    "AVG sentiment": 8,
    "AVG sexism": 2
  },

  {
    "Title": "Transformers",
    "AVG sentiment": 7,
    "AVG sexism": 2
  }];

  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xRenderer = am5xy.AxisRendererX.new(root, {
    minGridDistance: 30
  });

  var xAxis =
    chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "Title",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {
        themeTags: ["axis"],
        animationDuration: 200
      })
    }));

  xRenderer.grid.template.setAll({
    location: 1
  })

  xAxis.get("renderer").labels.template.setAll({
    oversizedBehavior: "hide",
    maxWidth: 1,
  });

  xAxis.data.setAll(data);

  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    min: 0,
    renderer: am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1
    })
  }));

  var MyAxisLabels = am5.Theme.new(root);
  MyAxisLabels.rule("AxisLabel").setAll({
    fontFamily: "Courier Prime"
  });
  root.setThemes([
    MyAxisLabels
  ]);

  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

  var series0 = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "[fontFamily: Courier Prime]Audience's overall tone (from 1, lowest, to 10, highest)",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "AVG sentiment",
    categoryXField: "Title",
    clustered: false,
    fill: am5.color(0xeabf8a),
    tooltip: am5.Tooltip.new(root, {
      labelText: "[fontFamily: Courier Prime]{valueY}"
    })
  }));

  series0.columns.template.setAll({
    width: am5.percent(80),
    tooltipY: 0,
    strokeOpacity: 0
  });


  series0.data.setAll(data);


  var series1 = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "[fontFamily: Courier Prime]Sexist instances in the audience's reviews",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "AVG sexism",
    categoryXField: "Title",
    clustered: false,
    fill: am5.color(0x449296),
    tooltip: am5.Tooltip.new(root, {
      labelText: "[fontFamily: Courier Prime]{valueY}"
    })
  }));

  series1.columns.template.setAll({
    width: am5.percent(50),
    tooltipY: 0,
    strokeOpacity: 0
  });

  series1.data.setAll(data);

  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));


  // add legend
  var legend = chart.children.push(am5.Legend.new(root, {}));
  legend.data.setAll(chart.series.values);


  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  chart.appear(1000, 1000);
  series0.appear();
  series1.appear();

}); // end am5.ready()
