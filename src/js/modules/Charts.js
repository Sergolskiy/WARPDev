/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable */

export default class OrderStatsChart {
  constructor() {
    this.dashboardWeekChartCanvas = document.querySelector('.dashboard-week-chart');
    this.dashboardMonthChartCanvas = document.querySelector('.dashboard-month-chart');
    this.dashboardYearChartCanvas = document.querySelector('.dashboard-year-chart');

    this.userActivityWeekCanvas = document.querySelector('.user-activity-week-chart');
    this.userActivityMonthCanvas = document.querySelector('.user-activity-month-chart');
    this.userActivityYearCanvas = document.querySelector('.user-activity-year-chart');

    this.userNumberWeekCanvas = document.querySelector('.user-number-week-chart');
    this.userNumberMonthCanvas = document.querySelector('.user-number-month-chart');
    this.userNumberYearCanvas = document.querySelector('.user-number-year-chart');

    this.restaurantWeekBestSellingCanvas = document.querySelector('.restaurant-week-best-selling');
    this.restaurantMonthBestSellingCanvas = document.querySelector('.restaurant-month-best-selling');
    this.restaurantYearBestSellingCanvas = document.querySelector('.restaurant-year-best-selling');

    this.today = new Date();
    this.month = this.today.getMonth();
    this.day = this.today.getDate();
    this.weekDay = this.today.getDay();

    this.todayColor = '#ED3E53';
    this.passedDayColor = '#E3B100';

    this.restaurantWeekOrderStatsCanvas = document.querySelector('.restaurant-order-stats-week-chart');
    this.restaurantMonthOrderStatsCanvas = document.querySelector('.restaurant-order-stats-month-chart');
    this.restaurantYearOrderStatsCanvas = document.querySelector('.restaurant-order-stats-year-chart');
  }

  chartExtensions() {
    Chart.elements.Rectangle.prototype.draw = function() {

      var ctx = this._chart.ctx;
      var vm = this._view;
      var left, right, top, bottom, signX, signY, borderSkipped, radius;
      var borderWidth = vm.borderWidth;
      // Set Radius Here
      // If radius is large enough to cause drawing errors a max radius is imposed
      var cornerRadius = 5;

      if (!vm.horizontal) {
          // bar
          left = vm.x - vm.width / 2;
          right = vm.x + vm.width / 2;
          top = vm.y;
          bottom = vm.base;
          signX = 1;
          signY = bottom > top? 1: -1;
          borderSkipped = vm.borderSkipped || 'bottom';
      } else {
          // horizontal bar
          left = vm.base;
          right = vm.x;
          top = vm.y - vm.height / 2;
          bottom = vm.y + vm.height / 2;
          signX = right > left? 1: -1;
          signY = 1;
          borderSkipped = vm.borderSkipped || 'left';
      }

      // Canvas doesn't allow us to stroke inside the width so we can
      // adjust the sizes to fit if we're setting a stroke on the line
      if (borderWidth) {
          // borderWidth shold be less than bar width and bar height.
          var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
          borderWidth = borderWidth > barSize? barSize: borderWidth;
          var halfStroke = borderWidth / 2;
          // Adjust borderWidth when bar top position is near vm.base(zero).
          var borderLeft = left + (borderSkipped !== 'left'? halfStroke * signX: 0);
          var borderRight = right + (borderSkipped !== 'right'? -halfStroke * signX: 0);
          var borderTop = top + (borderSkipped !== 'top'? halfStroke * signY: 0);
          var borderBottom = bottom + (borderSkipped !== 'bottom'? -halfStroke * signY: 0);
          // not become a vertical line?
          if (borderLeft !== borderRight) {
              top = borderTop;
              bottom = borderBottom;
          }
          // not become a horizontal line?
          if (borderTop !== borderBottom) {
              left = borderLeft;
              right = borderRight;
          }
      }

      ctx.beginPath();
      ctx.fillStyle = vm.backgroundColor;
      ctx.strokeStyle = vm.borderColor;
      ctx.lineWidth = borderWidth;

      // Corner points, from bottom-left to bottom-right clockwise
      // | 1 2 |
      // | 0 3 |
      var corners = [
          [left, bottom],
          [left, top],
          [right, top],
          [right, bottom]
      ];

      // Find first (starting) corner with fallback to 'bottom'
      var borders = ['bottom', 'left', 'top', 'right'];
      var startCorner = borders.indexOf(borderSkipped, 0);
      if (startCorner === -1) {
          startCorner = 0;
      }

      function cornerAt(index) {
          return corners[(startCorner + index) % 4];
      }

      // Draw rectangle from 'startCorner'
      var corner = cornerAt(0);
      ctx.moveTo(corner[0], corner[1]);
      let nextCornerId;
      for (var i = 1; i < 4; i++) {
          corner = cornerAt(i);
          nextCornerId = i+1;
          if(nextCornerId == 4){
              nextCornerId = 0
          }

          let nextCorner = cornerAt(nextCornerId);

          let width = corners[2][0] - corners[1][0];
          let height = corners[0][1] - corners[1][1];
          let x = corners[1][0];
          let y = corners[1][1];

          var radius = cornerRadius;

          // Fix radius being too large
          if(radius > height/2){
              radius = height/2;
          }if(radius > width/2){
              radius = width/2;
          }

          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);

      }

      ctx.fill();
      if (borderWidth) {
          ctx.stroke();
      }
  };
  }

  getRandomNumber() {
    const min = 250;
    const max = 700;
    return Math.floor(
      Math.random() * (max - min) + min,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  getBarsColor(today, lastDay) {
    const colors = [];
    const bars = [];

    for (let i = 0; i <= lastDay; i++) {
      if (i < today) {
        colors.push(this.passedDayColor);
        bars.push(this.getRandomNumber());
      } else if (i === today) {
        colors.push(this.todayColor);
        bars.push(this.getRandomNumber());
      } else {
        bars.push(220);
      }
    }

    return {
      colors,
      bars,
    };
  }


  userActivityWeekChart() {
    if (this.userActivityWeekCanvas) {
      const ctx = this.userActivityWeekCanvas.getContext('2d');
      const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        data: {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{
            label: false,
            backgroundColor: 'transparent',
            borderColor: '#E3B100',
            data: [100, 224, 301, 457, 400, 517, 190],
          }],
        },

        options: {
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    }
  }

  userActivityMonthChart() {
    if (this.userActivityMonthCanvas) {
      const ctx = this.userActivityMonthCanvas.getContext('2d');
      const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        data: {
          labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
          datasets: [{
            label: false,
            backgroundColor: 'transparent',
            borderColor: '#E3B100',
            data: [100, 224, 301, 457, 400, 517, 190, 242, 216, 23, 522, 100, 224, 301, 457, 400, 517, 190, 242, 216, 23, 522, 100, 224, 301, 457, 400, 517, 190, 242, 216, 23, 522],
          }],
        },

        options: {
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    }
  }

  userActivityYearChart() {
    if (this.userActivityYearCanvas) {
      const ctx = this.userActivityYearCanvas.getContext('2d');
      const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        data: {
          labels: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
          datasets: [{
            label: false,
            backgroundColor: 'transparent',
            borderColor: '#E3B100',
            data: [130, 224, 301, 257, 400, 517, 90, 150, 150, 70, 70, 150],
          }],
        },

        options: {
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    }
  }

  restaurantWeekOrderStatsChart() {
    if (this.restaurantWeekOrderStatsCanvas) {
      const ctx = this.restaurantWeekOrderStatsCanvas.getContext('2d');
      const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        data: {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{
            label: false,
            backgroundColor: 'transparent',
            borderColor: '#E3B100',
            data: [100, 224, 301, 457, 400, 517, 190],
          }],
        },

        options: {
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    }
  }

  restaurantMonthOrderStatsChart() {
    if (this.restaurantMonthOrderStatsCanvas) {
      const ctx = this.restaurantMonthOrderStatsCanvas.getContext('2d');
      const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        data: {
          labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
          datasets: [{
            label: false,
            backgroundColor: 'transparent',
            borderColor: '#E3B100',
            data: [100, 224, 301, 457, 400, 517, 190, 242, 216, 23, 522, 100, 224, 301, 457, 400, 517, 190, 242, 216, 23, 522, 100, 224, 301, 457, 400, 517, 190, 242, 216, 23, 522],
          }],
        },

        options: {
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    }
  }

  restaurantYearOrderStatsChart() {
    if (this.restaurantYearOrderStatsCanvas) {
      const ctx = this.restaurantYearOrderStatsCanvas.getContext('2d');
      const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        data: {
          labels: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
          datasets: [{
            label: false,
            backgroundColor: 'transparent',
            borderColor: '#E3B100',
            data: [130, 224, 301, 257, 400, 517, 90, 150, 150, 70, 70, 150],
          }],
        },

        options: {
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    }
  }


  dashboardWeekChart() {
    if (this.dashboardWeekChartCanvas) {
      const ctx = this.dashboardWeekChartCanvas.getContext('2d');
      const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        data: {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{
            label: false,
            backgroundColor: '#E4E5EB',
            borderColor: '#E3B100',
            data: [100, 224, 301, 457, 400, 517, 490],
          }],
        },

        options: {
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    }
  }

  dashboardMonthChart() {
    if (this.dashboardMonthChartCanvas) {
      const barsData = this.getBarsColor(this.day - 1, 30);
      const ctx = this.dashboardMonthChartCanvas.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',

        data: {
          labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
          datasets: [{
            label: false,
            backgroundColor: barsData.colors,
            borderWidth: 0,
            borderColor: 'transparent',
            borderSkipped: 'bottom, top, left, right',
            data: barsData.bars,
          }],
        },

        options: {
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    }
  }

  dashboardYearChart() {
    if (this.dashboardYearChartCanvas) {
      const barsData = this.getBarsColor(this.month, 12);
      const ctx = this.dashboardYearChartCanvas.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',

        data: {
          labels: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
          datasets: [{
            label: false,
            backgroundColor: barsData.colors,
            borderWidth: 0,
            borderColor: 'transparent',
            borderSkipped: 'bottom, top, left, right',
            data: barsData.bars,
            scaleLineColor: 'rgba(0,0,0,0)',
          }],
        },

        options: {
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    }
  }

  userNumberYearChart() {
    if (this.userNumberYearCanvas) {
      const barsData = this.getBarsColor(this.month, 12);
      const ctx = this.userNumberYearCanvas.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',

        data: {
          labels: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
          datasets: [{
            label: false,
            backgroundColor: barsData.colors,
            borderWidth: 0,
            borderColor: 'transparent',
            borderSkipped: 'bottom, top, left, right',
            data: barsData.bars,
            scaleLineColor: 'rgba(0,0,0,0)',
          }],
        },

        options: {
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    }
  }

  userNumberWeekChart() {
    if (this.userNumberWeekCanvas) {
      const barsData = this.getBarsColor(this.weekDay, 6);
      const ctx = this.userNumberWeekCanvas.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',

        data: {
          labels: ['Su.', 'Mo.', 'Tu.', 'We.', 'Th.', 'Fr.', 'Sa.'],
          datasets: [{
            label: false,
            backgroundColor: barsData.colors,
            borderWidth: 0,
            borderColor: 'transparent',
            borderSkipped: 'bottom, top, left, right',
            data: barsData.bars,
            scaleLineColor: 'rgba(0,0,0,0)',
          }],
        },

        options: {
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    }
  }

  userNumberMonthChart() {
    if (this.userNumberMonthCanvas) {
      const barsData = this.getBarsColor(this.day - 1, 30);
      const ctx = this.userNumberMonthCanvas.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',

        data: {
          labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
          datasets: [{
            label: false,
            backgroundColor: barsData.colors,
            borderWidth: 0,
            borderColor: 'transparent',
            borderSkipped: 'bottom, top, left, right',
            data: barsData.bars,
            scaleLineColor: 'rgba(0,0,0,0)',
          }],
        },

        options: {
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    }
  }

  restaurantBestSellingYearChart() {
    if (this.restaurantYearBestSellingCanvas) {
      const barsData = this.getBarsColor(this.month, 12);
      const ctx = this.restaurantYearBestSellingCanvas.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',

        data: {
          labels: ['Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name'],
          datasets: [{
            label: false,
            backgroundColor: ['#ED3E53', '#ED3E53', '#E3B100', '#ED3E53', '#ED3E53', '#ED3E53', '#ED3E53', '#ED3E53', '#ED3E53', '#ED3E53'],
            borderWidth: 0,
            borderColor: 'transparent',
            borderSkipped: 'bottom, top, left, right',
            data: [220, 430, 540, 221, 543, 346, 678, 278, 688, 540],
            scaleLineColor: 'rgba(0,0,0,0)',
          }],
        },

        options: {
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    }
  }

  restaurantBestSellingWeekChart() {
    if (this.restaurantWeekBestSellingCanvas) {
      const barsData = this.getBarsColor(this.weekDay, 6);

      const ctx = this.restaurantWeekBestSellingCanvas.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',

        data: {
          labels: ['Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name'],
          datasets: [{
            label: false,
            backgroundColor: ['#0009DA', '#0009DA', '#0009DA', '#0009DA', '#0009DA', '#0009DA', '#0009DA', '#0009DA', '#0009DA', '#0009DA'],
            borderWidth: 0,
            borderColor: 'transparent',
            borderSkipped: 'bottom, top, left, right',
            data: [220, 430, 540, 221, 543, 346, 678, 278, 688, 540],
            scaleLineColor: 'rgba(0,0,0,0)',
          }],
        },

        options: {
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    }
  }

  restaurantBestSellingMonthChart() {
    if (this.restaurantMonthBestSellingCanvas) {
      const barsData = this.getBarsColor(this.day - 1, 30);
      const ctx = this.restaurantMonthBestSellingCanvas.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',

        data: {
          labels: ['Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name', 'Name'],
          datasets: [{
            label: false,
            backgroundColor: ['#ED3E53', '#ED3E53', '#E3B100', '#ED3E53', '#ED3E53', '#ED3E53', '#ED3E53', '#ED3E53', '#ED3E53', '#ED3E53'],
            borderWidth: 0,
            borderColor: 'transparent',
            borderSkipped: 'bottom, top, left, right',
            data: [220, 430, 540, 221, 543, 346, 678, 278, 688, 540],
            scaleLineColor: 'rgba(0,0,0,0)',
          }],
        },

        options: {
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    }
  }

  init() {
    this.chartExtensions();
    this.dashboardWeekChart();
    this.dashboardMonthChart();
    this.dashboardYearChart();
    this.userActivityWeekChart();
    this.userActivityMonthChart();
    this.userActivityYearChart();
    this.userNumberYearChart();
    this.userNumberMonthChart();
    this.userNumberWeekChart();
    this.restaurantBestSellingWeekChart();
    this.restaurantBestSellingMonthChart();
    this.restaurantBestSellingYearChart();
    this.restaurantWeekOrderStatsChart();
    this.restaurantMonthOrderStatsChart();
    this.restaurantYearOrderStatsChart();
  }
}
