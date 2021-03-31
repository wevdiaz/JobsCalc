const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const Profile = {
    data: {
        name: "Diazz",
        avatar: "https://scontent-gru1-2.xx.fbcdn.net/v/t31.0-1/p160x160/13323239_982612931852428_1595034926018732273_o.jpg?_nc_cat=110&ccb=1-3&_nc_sid=dbb9e7&_nc_ohc=LflBkCeSIDcAX-VUJZz&_nc_ht=scontent-gru1-2.xx&tp=6&oh=13446b102e9f1be61ebb5ef47f593a68&oe=60858356",
        "monthly-budget": 2000,
        "days-per-week": 5,
        "hours-per-day": 8,
        "vacation-per-year": 2,
        "value-hour": 75
    },

    controllers: {
        index(req, res) {
            return res.render( views + "profile", { profile });
        },

        update(req, res) {
            // req.body para pegar os dados
            // definir quantas semanas tem num ano
            // remover as semanas de férias do ano
            // quantas horas por semana estou trabalhando
            // total de horas trabalhando no mês
        }
    }
}

const Job = {
    data : [
        {
            id: 1,
            name: "Pizzaria Guloso",
            'daily-hours': 2,
            'total-hours': 1,
            created_at: Date.now(),       
        },
    
        {
            id: 2,
            name: "OneTwo Project",
            'daily-hours': 3,
            'total-hours': 47,
            created_at: Date.now(),        
        },
    ],

    controllers: {

        index(req, res) {
            const updatedJobs = Job.data.map((job) => {

                const remaining = Job.services.remainingDays(job);
                const status = remaining <= 0 ? "done" : "progress";
        
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Profile.data["value-hour"] * job['total-hours']
                }
            });
            
            res.render( views + "index", { jobs: updatedJobs })
        },

        create(req, res) {
           return res.render( views + "job")
        },

        save(req, res) {
            const lastId = Job.data[jobs.length - 1]?.id || 1;   

            jobs.push({
                id: lastId + 1,
                name: req.body.name,
                'daily-hours': req.body['daily-hours'],
                'total-hours': req.body['total-hours'],
                created_at: Date.now()
            });
        
            return res.redirect("/");
        }
    },
    services: {
        remainingDays(job) {
            const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();
        
            const createdDate = new Date(job.created_at);
            const dueDay = createdDate.getDate() + Number(remainingDays);
            const dueDateInMs = createdDate.setDate(dueDay);
        
            const timeDiffInMs = dueDateInMs - Date.now();
        
            const dayInMs = 1000 * 60 * 60 * 24;
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
        
            return dayDiff;
        }
    }
}






routes.get("/", Job.controllers.index );
routes.get("/job", Job.controllers.create );
routes.post("/job", Job.controllers.save );

routes.get("/job/edit", (req, res) => res.render( views + "job-edit"));
routes.get("/profile", Profile.controllers.index );

module.exports = routes;