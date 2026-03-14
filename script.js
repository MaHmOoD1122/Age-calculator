"use strict";
const dayInput = document.querySelector(".day-input");
const monthInput = document.querySelector(".month-input");
const yearInput = document.querySelector(".year-input");

const dayNo = document.querySelector(".day-no");
const monthNo = document.querySelector(".month-no");
const yearNo = document.querySelector(".year-no");

const dayEmpty = document.querySelector(".day-empty");
const monthEmpty = document.querySelector(".month-empty");
const yearEmpty = document.querySelector(".year-empty");

const dayError = document.querySelector(".day-error");
const monthError = document.querySelector(".month-error");
const yearError = document.querySelector(".year-error");

const calcBtn = document.querySelector(".calculate-btn");

const ageForm = document.querySelector(".ageForm");
yearInput.max = new Date().getFullYear();

let hasError = false;
const showError = function (inputEl, errorInput) {
  inputEl.classList.add("error");
  errorInput.classList.remove("hidden");
};
const checkDay = function (day, dayCurrentMonth) {
  if (!day || day <= -1) {
    showError(dayInput, dayEmpty);
    hasError = true;
  } else if (day > dayCurrentMonth) {
    showError(dayInput, dayError);
    hasError = true;
  }
};
const checkMonth = function (month) {
  if (!month || month <= -1) {
    showError(monthInput, monthEmpty);
    hasError = true;
  } else if (month > 12) {
    showError(monthInput, monthError);
    hasError = true;
  }
};
const checkYear = function (year, currentYear) {
  if (!year || year <= -1) {
    showError(yearInput, yearEmpty);
    hasError = true;
  } else if (year > currentYear) {
    showError(yearInput, yearError);
    hasError = true;
  }
};
const checkDate = function (inputDate, currentDate) {
  if (inputDate > currentDate) {
    showError(yearInput, yearError);
    hasError = true;
  }
};
ageForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  const day = Number(dayInput.value);
  const month = Number(monthInput.value);
  const year = Number(yearInput.value);
  const inputDate = new Date(year, month - 1, day);

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const dayCurrentMonth = new Date(year, month, 0).getDate();

  hasError = false;
  // Remove all errors
  document
    .querySelectorAll(".input-error")
    .forEach((el) => el.classList.add("hidden"));
  document
    .querySelectorAll(".input")
    .forEach((el) => el.classList.remove("error"));

  // Check the full date
  checkDate(inputDate, currentDate);
  // Empty day input or lower than -1
  checkDay(day, dayCurrentMonth);
  // Empty month input or lower than -1
  checkMonth(month);
  // Empty year input or lower than -1
  checkYear(year, currentYear);
  //////////////////////////////
  if (hasError) {
    dayNo.textContent = "- - ";
    monthNo.textContent = "- - ";
    yearNo.textContent = "- - ";
    return;
  }
  let birthDay = currentDay - day;
  let birthMonth = currentMonth - month;
  let birthYear = currentYear - year;

  // To prevent the negative days
  if (birthDay < 0) {
    const daysInPrevMonth = new Date(
      currentYear,
      currentMonth - 1,
      0,
    ).getDate();
    birthDay += daysInPrevMonth;
    birthMonth--;
  }
  // To prevent the negative months
  if (birthMonth < 0) {
    birthMonth += 12;
    birthYear--;
  }
  dayNo.textContent = `${birthDay} `;
  monthNo.textContent = `${birthMonth} `;
  yearNo.textContent = `${birthYear} `;
});
