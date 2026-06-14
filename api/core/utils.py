MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]


def get_year():
    year_dict = {}
    for month in MONTHS:
        year_dict[month] = 0

    return year_dict
