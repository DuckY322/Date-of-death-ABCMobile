document.addEventListener("DOMContentLoaded", function() {

    let user = {
        dateOfBirth: {
            day: "",
            month: "",
            year: "",
        }
    };

    let buttons = document.querySelectorAll("button");
    let select = document.querySelectorAll(".select");

    let responses = 0;

    let selectErr = 0;

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

    function nextQuestion() {
        buttons.forEach(item => {
            item.style.display = "none";
        })

        select.forEach(item => {
            item.style.display = "none";
        })

        for (let i = 0; i < questions[responses].answers.length; i++) {
            if (typeof questions[responses].answers[i] === "object") {
                selectErr++;
                select[i].style.display = "flex";

                for (let j = 0; j < questions[responses].answers[i].length; j++) {
                    let option = document.createElement("option");
                    option.classList.add("option");
                    option.value = questions[responses].answers[i][j];
                    option.textContent = questions[responses].answers[i][j];
                    select[i].append(option);
                }

            } else {
                buttons[i].style.display = "flex";
                buttons[i].innerHTML = questions[responses].answers[i] + "<div class='btn-gradient'></div>";
            }
        }

        if (typeof questions[responses].description === "object") {
            variableDescription();
        } else {
            document.querySelector(".header__text").classList.remove("off");
            document.querySelector(".header__container_white").classList.add("off");
            document.querySelector(".header__text").textContent = questions[responses].description;
        }


        document.querySelector(".section-question__title").textContent = questions[responses].title;
        document.querySelector(".footnote").textContent = questions[responses].numQuestion;

        responses++;
    }

    function checkSelects() {
        for (let item of select) {
            if (item.selectedIndex === 0) {
                item.classList.add("select_err");
            } else {
                if (item.name === "day" && user.dateOfBirth.day === "") {
                    user.dateOfBirth.day = item.value;
                    item.classList.remove("select_err");
                    selectErr--;
                } else if (item.name === "month" && user.dateOfBirth.month === "") {
                    user.dateOfBirth.month = item.value;
                    item.classList.remove("select_err");
                    selectErr--;
                } else if (item.name === "year" && user.dateOfBirth.year === "") {
                    user.dateOfBirth.year = item.value;
                    item.classList.remove("select_err");
                    selectErr--;
                }
            }
        }
        if (selectErr === 0) {
            document.querySelector(".header").classList.toggle("off");
            document.querySelector(".section-question").classList.toggle("off");
            document.querySelector(".section-loading").classList.toggle("off");
            setTimeout(() => {
                document.querySelector(".header").classList.toggle("off");
                document.querySelector(".section-question").classList.toggle("off");
                document.querySelector(".section-loading").classList.toggle("off");
                nextQuestion();
            }, 2000);
        }
    }

    function variableDescription() {
        document.querySelector(".header__text").classList.add("off");
        document.querySelector(".header__container_white").classList.remove("off");

        let dateOfBirth = Math.round((new Date() - new Date(user.dateOfBirth.year, user.dateOfBirth.month - 1, user.dateOfBirth.day)) / 1000 / 60 / 60 / 24 / 30 / 12);

        if (dateOfBirth <= 35) {
            document.querySelector(".header__text_white").textContent = questions[responses].description[0];
        } else if (dateOfBirth >= 36 && dateOfBirth <= 45) {
            document.querySelector(".header__text_white").textContent = questions[responses].description[1];
        } else if (dateOfBirth >= 46) {
            document.querySelector(".header__text_white").textContent = questions[responses].description[2];
        }
    }

    function recording() {
        document.querySelector(".header").classList.toggle("off");
        document.querySelector(".section-question").classList.toggle("off");
        document.querySelector(".section-recording").classList.toggle("off");

        let recPercent = 0;
        let recScale = document.querySelector(".section-recording__line-percent");
        let recLine = document.querySelector(".section-recording__line");

        const recInterval = setInterval(() => {
            recPercent++;
            recScale.textContent = recPercent + "%";
            recLine.style.setProperty('--rec-line', recPercent + '%');
            if (recPercent === 100) {
                clearTimeout(recInterval);
                callPage();
            }
        }, 50);
    }

    function callPage() {
        document.querySelector(".section-recording").classList.toggle("off");
        document.querySelector(".section-call").classList.toggle("off");
        document.querySelector(".footer").classList.toggle("off");

        let dateNow = new Date();
        let dayNow = dateNow.getDate() + 1;
        let monthNow = dateNow.getMonth() + 1;
        let yearNow = dateNow.getFullYear();

        if (dayNow < 10) {
            dayNow = "0" + dayNow;
        }

        if (monthNow < 10) {
            monthNow = "0" + monthNow;
        }

        document.querySelector(".section-call__event-text").textContent = `???????????? ???????????????? ?????????????? ?????????? ?????????????????? ?????? ${dayNow}.${monthNow}.${yearNow}`;
    }

    let questions = [{
        description: "???? ?????????????????? ?????? ???? ???????????? ?????????????????????? ?????????? ????????????, ???? ?????????? ?????????????? ?????? ???????????????? ???????? ?????????????? ???????? ?? ???????????????? ???????? ?????????? ???? ???????????? ????????.",
        title: "?????????? ???? ???????????????????? ???????? ???????????????? ???????????????????",
        answers: [
            "????????",
            "????????",
            "??????????",
            "??????????",
        ],
        numQuestion: "???????????? 2-5"
    }, {
        description: "?????? ???????????? ?????????? ???? ?????????????? ?????????? ?????????????????????? ?? ?????????? ??????????????!",
        title: "?????????????? ???????? ???????? ????????????????:",
        answers: [
            daysMonthsYears(1, 31),
            daysMonthsYears(1, 12),
            daysMonthsYears(1921, 2021),
            "??????????",
        ],
        numQuestion: "???????????? 3-5"
    }, {
        description: "???????????? ?????????????? ???????????????? ??? ???????? ???? ???????????????????? ?????????????????? ?? ?????????? ?????????????? ???? ??????!",
        title: "???????????? ???? ?????? ?????????????? ?????????",
        answers: [
            "????",
            "??????",
            "????????????"
        ],
        numQuestion: "???????????? 4-5"
    }, {
        description: [
            "???? ?????? ?????????????? ?????????? ?????????????? ??????????????, ???????????????? ???????????? ?????? ?? ???????? ??????????.",
            "???? ?????? ?????????????? ?????????? ?????????????? ??????????????, ???????????????? ???????????? ?????? ?? ???????? ??????????. ???????????????? ?????? ?????????????? ?????? ??????????????.",
            "???? ?????? ?????????????? ?????????? ?????????????? ??????????????, ???????????????? ???????????? ?????? ?? ???????? ??????????. ???????????????? ?????? ??????-???? ???? ?????????? ??????????????????."
        ],
        title: "????????????, ?????????????? ???? ????????????????, ?????????? ???????????????????? ?????????? ?? ???????????????????? ????????????????. ???? ???????????? ????????????, ?????? ???????? ???????????? ???????",
        answers: [
            "????",
            "?????????????????????? ????????????????"
        ],
        numQuestion: "???????????? 5-5"
    }]

    nextQuestion();

    document.querySelectorAll("button").forEach(el => {
        el.addEventListener("click", function() {
            if (responses < questions.length) {
                if (selectErr > 0) {
                    checkSelects();
                } else {
                    nextQuestion();
                }
            } else {
                recording();
            }
        })
    });

    document.querySelector(".section-call__btn").addEventListener("click", function() {
        const request = new XMLHttpRequest();
        const url = "https://swapi.dev/api/people/1/";
        request.open("GET", url);
        request.setRequestHeader('Content-Type', 'application/x-www-form-url');
        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                console.log(request.responseText);
            }
        });
        request.send();
    });
});