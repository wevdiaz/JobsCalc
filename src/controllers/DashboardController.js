const Job = require("../models/Job");
const Profile = require("../models/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {

    index(req, res) {

        const jobs = Job.get();
        const profile = Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        // total de horas por dia de cada Job em progresso
        let jobTotalJours = 0;
    
        const updatedJobs = jobs.map((job) => {
    
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? "done" : "progress";

            // somando a quantidade de status
            statusCount[status] += 1;

            jobTotalJours = status === "progress" ? jobTotalJours += Number(job["daily-hours"]) :  jobTotalJours;            
    
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        });

        // Quantidade de oras quero trabalhar/dia  menos a quantidade de horas/dia do projeto
        const freeHours = profile["hours-per-day"] - jobTotalJours;
        
        res.render("index", { jobs: updatedJobs, profile, statusCount, freeHours })
    }
}
