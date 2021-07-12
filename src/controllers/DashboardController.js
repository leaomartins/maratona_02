const Profile = require('../model/Profile')
const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    async index(req, res) {

        const jobs = await Job.get()
        const profile = await Profile.get()


        const statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let jobTotalHours = 0

        const updatedJobs = jobs.map(job => {
            //Ajuste jobs
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            //Somando quantidade de jobs por status
            statusCount[status] = +1

            //Total de horas dia de cada JOb em progress
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        const freeHours = profile["hours-per-day"] - jobTotalHours

        return res.render("index",
            {
                jobs: updatedJobs,
                profile: profile,
                statusCount: statusCount,
                freeHours: freeHours
            })
    }
}