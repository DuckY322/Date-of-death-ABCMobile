document.addEventListener("DOMContentLoaded", function () {

    function daysMonthsYears(from, to) {
        let daysMonthsYears = [];
        for (let i = from; i <= to; i++) {
            if (i < 10) {
                i = "0" + i;
            }
            daysMonthsYears.push(i);
        }
        return daysMonthsYears;
    }

    let questions = [
        {
            id: 2,
            description: `Уже совсем скоро Вы узнаете много интересного о своем будущем!`,
            title: `Укажите свою дату рождения:`,
            answers: [
                daysMonthsYears(1, 31),
                daysMonthsYears(1, 12),
                daysMonthsYears(1901, 2021),
                `Далее`,
            ],
            numQuestion: `Вопрос 3-5`
        },
        {
            id: 3,
            description: `Смерть родного человека – одно из тяжелейших испытаний в жизни каждого из нас!`,
            title: `Снятся ли Вам умершие люди?`,
            answers: [
                `Да`,
                `Нет`,
                `Иногда`
            ],
            numQuestion: `Вопрос 4-5`
        },
        {
            id: 4,
            description: `По вам скучает очень близкий человек, которого больше нет в мире живых.`,
            title: `Запись, которую Вы услышите, может шокировать людей с неокрепшей психикой. Вы готовы узнать, что ждет именно Вас?`,
            answers: [
                `Да`,
                `Затрудняюсь ответить`
            ],
            numQuestion: `Вопрос 5-5`
        }
    ]

    let responses = 0;

    document.querySelectorAll(".btn").forEach(el => {
        el.addEventListener("click", function () {
            let buttons = document.querySelectorAll(".btn");
            let select = document.querySelectorAll(".select");

            buttons.forEach(item => {
                item.style.display = "none";
            })

            select.forEach(item => {
                item.style.display = "none";
            })

            for (let i = 0; i < questions[responses].answers.length; i++) {
                if (typeof questions[responses].answers[i] === "object") {
                    select[i].style.display = "flex";

                    for (let j = 0; j < questions[responses].answers[i].length; j++) {
                        let option = document.createElement(`option`);
                        option.textContent = questions[responses].answers[i][j];
                        select[i].append(option);
                    }

                } else {
                    buttons[i].style.display = "flex";
                    buttons[i].textContent = questions[responses].answers[i];
                }
            }

            document.querySelector(".header__text").textContent = questions[responses].description;
            document.querySelector(".section-question__title").textContent = questions[responses].title;
            document.querySelector(".footnote").textContent = questions[responses].numQuestion;

            responses++;
        })
    });
});