let data = {
    name: "Diazz",
    avatar: "https://scontent-gru1-2.xx.fbcdn.net/v/t31.0-1/p160x160/13323239_982612931852428_1595034926018732273_o.jpg?_nc_cat=110&ccb=1-3&_nc_sid=dbb9e7&_nc_ohc=LflBkCeSIDcAX-VUJZz&_nc_ht=scontent-gru1-2.xx&tp=6&oh=13446b102e9f1be61ebb5ef47f593a68&oe=60858356",
    "monthly-budget": 2000,
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year": 2,
    "value-hour": 75
}

module.exports = {
    get() {
        return data;
    },

    update(newData) {
        data = newData;
    }
}