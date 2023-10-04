// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function() {
  const dayDisp = $('#currentDay');
  const currDay = dayjs();
  let eventsArr = JSON.parse(localStorage.getItem('events'));

  console.log(eventsArr);
  
  for (var i=0; i<eventsArr.length; i++) {
    let hour = eventsArr[i].hour;
    console.log("im in here baby");
    console.log(`i is ${i}`);
    console.log(`hour is ${hour}`);
    console.log($(`#hour-${hour}`).children("textarea"));
    console.log(eventsArr[i].event);
    $(`#hour-${hour}`).children("textarea").val(eventsArr[i].event);
  }
  
  $('#hour-block').on("click", function (e) {
    if (e.target.tagName == 'BUTTON') {
      let hourInp = e.target.parentElement.children[1].value;
      let hourNum = e.target.parentElement.children[1].name;
      let hourEvent = {
        hour: hourNum,
        event: hourInp
      };
      let eventArr = localStorage.getItem('hourEvent');
      if (eventArr == null) {
        eventArr = [];
      }
      // Before pushing new event, erase old event at that hour IF it exists
      // TODO
      eventArr.push(hourEvent);
      localStorage.setItem("events", JSON.stringify(eventArr));
      let message = $('<h4 class="text-center">Item added to LocalStorage!</h4>');
      $('#hour-block').prepend(message);
    }
        // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
  
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
  
  });
  
  // TODO: change the 'th' at the end to be appropriate for each day
  dayDisp.text(dayjs().format('dddd, MMMM D[th]'));
  
  // helper function to turn all classes off (past, present, future)
  function toggleOff(n) {
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
      // change background color accordingly
      hourDiv.addClass("past");
    }
    else if (i > dayjs().hour()) {
      hourDiv.addClass("future");
    }
    else {
      hourDiv.addClass("present");
    }
    
  }
});

