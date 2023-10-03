// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

const dayDisp = $('#currentDay');
const currDay = dayjs();


$('#hour-block').on("click", function (e) {
  if (e.target.tagName == 'BUTTON') {
    alert("helplappelppp");
  }
      // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

dayDisp.text(dayjs().format('dddd, MMMM D[th]'));

// helper function to turn all classes off (past, present, future)
function toggleOff(n) {
  console.log("got here " + n);
  $(`#hour-${n}`).removeClass("past");
  $(`#hour-${n}`).removeClass("future");
  $(`#hour-${n}`).removeClass("present");
}

// iterate through hour divs
for (var i=9; i<=17; i++) {
  toggleOff(i);
  let hourDiv = $(`#hour-${i}`);
  // check hour against curr hour
  if (i < dayjs().hour()) {
    console.log("less");
    // change background color accordingly
    hourDiv.addClass("past");
  }
  else if (i > dayjs().hour()) {
    console.log("more");
    hourDiv.addClass("future");
  }
  else {
    console.log("equal");
    hourDiv.addClass("present");
  }
  
}