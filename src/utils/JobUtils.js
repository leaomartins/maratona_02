module.exports = {
    remainingDays(job) {
        //Calculo de tempo restante
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

        //Data de criação do project
        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDay() + Number(remainingDays)
        const dueDateInMs = createdDate.setDate(dueDay)

        const timeDiffInMs = dueDateInMs - Date.now()

        //Transformar milisegundos em dias
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)

        //Restam x dias
        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}