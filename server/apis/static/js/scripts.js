$(document).ready(function () {
  const customerGrowthChart = new Chart(
    $("#customerGrowthChart").get(0).getContext("2d"),
    {
      type: "line",
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: true,
          },
        },
      },
    }
  );

  loadChart(
    customerGrowthChart,
    $("#customerGrowthChart").data("chart-url"),
    "Customer Growth",
    `Monthly new user registration rate in ${new Date().getFullYear()}`
  );
});

function loadChart(chart, endpoint, title, subtitle) {
  $.ajax({
    url: endpoint,
    type: "GET",
    dataType: "json",
    success: (data) => {
      chart.data = data;

      chart.options.plugins.title.text = title;
      chart.options.plugins.title.display = true;
      chart.options.plugins.subtitle.text = subtitle;
      chart.options.plugins.subtitle.display = true;
      chart.update();
      console.info(data);
    },
    error: () =>
      console.error("Failed to fetch chart data from " + endpoint + "!"),
  });
}
