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

calcBtn.addEventListener("click", function () {
  const day = Number(dayInput.value);
  const month = Number(monthInput.value);
  const year = Number(yearInput.value);

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const dayCurrentMonth = new Date(year, month, 0).getDate();

  let hasError = false;
  // Remove all errors
  document
    .querySelectorAll(".input-error")
    .forEach((el) => el.classList.add("hidden"));
  document
    .querySelectorAll(".input")
    .forEach((el) => el.classList.remove("error"));

  // Empty day input
  if (!day) {
    dayInput.classList.add("error");
    dayEmpty.classList.remove("hidden");
    hasError = true;
  } else if (day > dayCurrentMonth) {
    dayInput.classList.add("error");
    dayError.classList.remove("hidden");
    hasError = true;
  }

  // Empty month input
  if (!month) {
    monthInput.classList.add("error");
    monthEmpty.classList.remove("hidden");
    hasError = true;
  } else if (month > 12) {
    monthInput.classList.add("error");
    monthError.classList.remove("hidden");
    hasError = true;
  }

  // Empty year input
  if (!year) {
    yearInput.classList.add("error");
    yearEmpty.classList.remove("hidden");
    hasError = true;
  } else if (year > currentYear) {
    yearError.classList.remove("hidden");
    yearInput.classList.add("error");
    hasError = true;
  }

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
