// fist we made a func of reverse and used it to make IsPallindrome func. Then we made a func to convert date into string as any palindrome is a string, not a number, and so to check if dates are palindrome, we have to make it string first. Now, the dates could be in different formats and so we have to now also check/arrange date strings in those different formats--to check if arrangement in any format is a palindrome, so we will have a func for it to cover those formats. Then we made a checkAllPalindrome func to check any palindrome in the date formats.

const dateInput = document.querySelector("#bday-input");
const submitButton = document.querySelector(".submit-btn");
const output = document.querySelector(".output");

function reverseStr(str) {
  const reversedStr = str.split("").reverse().join("");
  return reversedStr;
}

function isPalindrome(str) {
  const reverse = reverseStr(str);
  return str === reverse;
}

function convertDateToString(date) {
  const dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}
// console.log(convertDateToString(new Date()));   //<<-- how to console date to check if it is a string in the above func

// let date = {
//   day: 12,
//   month: 4,
//   year: 2022,
// };
// console.log(convertDateToString(date));

function convertDateToAllDateFormats(date) {
  dateStr = convertDateToString(date);
  const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  const yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  const yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkAllPalindrome(date) {
  const listOfPalindrome = convertDateToAllDateFormats(date);
  let flag = false;

  for (let i = 0; i < listOfPalindrome.length; i++) {
    if (isPalindrome(listOfPalindrome[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

// let date = {
//   day: 30,
//   month: 11,
//   year: 2022,
// };
// console.log(checkAllPalindrome(date));

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return fals;
  }
  if (year % 4 === 0) {
    return true;
  }
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}
// let date = {
//   day: 31,
//   month: 12,
//   year: 2020,
// };

// console.log(getNextDate(date));

function nextPalindromeDate(date) {
  let ctr = 0;
  let nextDate = getNextDate(date);

  while (1) {
    ctr++;
    let isPalindrome = checkAllPalindrome(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

// let date = {
//   day: 1,
//   month: 01,
//   year: 2020,
// };

// console.log(nextPalindromeDate(date));

function clickHandler() {
  const dateInputStr = dateInput.value;

  if (dateInputStr !== "") {
    const listOfDate = dateInputStr.split("-");

    let date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    let isPalindrome = checkAllPalindrome(date);
    if (isPalindrome) {
      output.innerText = `Yay, your bday is a palindrome!`;
    } else {
      let [ctr, nextDate] = nextPalindromeDate(date);
      output.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
    }
  }
}

submitButton.addEventListener("click", clickHandler);
