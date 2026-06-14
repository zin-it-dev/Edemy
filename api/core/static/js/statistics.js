django.jQuery(document).ready(function () {
    let userRegistrationCtx = new Chart(
        django.jQuery("#userRegistrationChart").get(0).getContext("2d"),
        {
            type: "line",
            options: {
                animations: {
                    tension: {
                        duration: 10000,
                        easing: "linear",
                        from: 1,
                        to: 0,
                        loop: true,
                    },
                },
                plugins: {
                    title: { display: true },
                    subtitle: { display: true },
                },
            },
        },
    );

    django.jQuery.ajax({
        url: django.jQuery("#filterForm").data("url"),
        type: "GET",
        dataType: "json",
        success: (response) => {
            response.options.forEach((option) => {
                django.jQuery("#year").append(new Option(option, option));
            });
            const defaultYear = django.jQuery("#year").children().first().val();
            const defaultGroupBy = django.jQuery("#groupBy").val();
            const defaultRole = django.jQuery("#userRole").val();
            if (defaultYear) {
                loadAllCharts(defaultYear, defaultGroupBy, defaultRole);
            }
        },
        error: () => console.log("Failed to fetch chart filter options!"),
    });

    django.jQuery("#year, #groupBy, #userRole").on("change", function () {
        const selectedYear = django.jQuery("#year").val();
        const selectedGroupBy = django.jQuery("#groupBy").val();
        const selectedRole = django.jQuery("#userRole").val();
        loadAllCharts(selectedYear, selectedGroupBy, selectedRole);
    });

    function loadChart(chart, endpoint, params, title, subtitle) {
        django.jQuery.ajax({
            url: endpoint,
            data: params,
            type: "GET",
            dataType: "json",
            success: (response) => {
                chart.data = response;
                chart.options.plugins.title = { text: title, display: true };
                chart.options.plugins.subtitle = {
                    text: subtitle,
                    display: true,
                };
                chart.update();
                console.info(response);
            },
            error: () =>
                console.error(`Failed to fetch chart data from ${endpoint}!`),
        });
    }

    function loadAllCharts(year, groupBy, role) {
        const periodLabel = groupBy === "quarter" ? "Quarterly" : "Monthly";
        const roleLabel = role === "teacher" ? "Teacher" : "Student";

        loadChart(
            userRegistrationCtx,
            django.jQuery("#year").data("url"),
            { year: year, group_by: groupBy, role: role },
            `${periodLabel} Registrations`,
            `${periodLabel} new user (${roleLabel}) registration rate in ${year}`,
        );
    }
});
