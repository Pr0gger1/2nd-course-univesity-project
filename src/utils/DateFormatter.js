export class DateFormatter {
    week = [
        "Понедельник", "Вторник",
        "Среда", "Четверг",
        "Пятница", "Суббота",
        "Воскресенье"
    ]

    months = [
        "Январь", "Февраль",
        "Март", "Апрель",
        "Май", "Июнь",
        "Июль", "Август",
        "Сентябрь", "Октябрь",
        "Ноябрь", "Декабрь"
    ]

    getDayOfWeek() {
        return this.week[new Date().getDay() - 1];
    }
    getMonth(initial_form = false) {
        let month = this.months[new Date().getMonth()];
        if (!initial_form) {
            if (month in ['Март', 'Август'])
                month = month.replace(month.at(-1), 'а');
            month = month.replace(month.at(-1), 'я');
        }
        return month;
    }
    getTime() {
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();
        return `${hour}:${minute}`;
    }
    getFullDate() {
        let day = new Date().getDate();
        let month = this.getMonth();
        let year = new Date().getFullYear();

        return `${day} ${month} ${year}`;
    }

}