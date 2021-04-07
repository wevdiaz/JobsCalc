const Database = require("./config");

const initDb = {

    async init() {

        const db = await Database()

        await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_week INT,
            vacation_per_year INT,
            value_hour INT
        )`);

        await db.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`);

        await db.run(`INSERT INTO profile (
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_week,
            vacation_per_year,
            value_hour
        ) VALUES (
            "Diazz",
            "https://scontent-gru1-2.xx.fbcdn.net/v/t31.0-1/p160x160/13323239_982612931852428_1595034926018732273_o.jpg?_nc_cat=110&ccb=1-3&_nc_sid=dbb9e7&_nc_ohc=LflBkCeSIDcAX-VUJZz&_nc_ht=scontent-gru1-2.xx&tp=6&oh=13446b102e9f1be61ebb5ef47f593a68&oe=60858356",
            3000,
            5,
            5,
            4,
            75
        );`);

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "Pizzaria Guloso",
            2,
            1,
            1617514376018
        );`);

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "OneTwo Projects",
            3,
            47,
            1617514376018
        );`);

        await db.close()
    }
}


initDb.init();
