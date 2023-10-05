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
      let eventArr = JSON.parse(localStorage.getItem('events') || "[]");
      for (let i = 0; i < eventArr.length; i++) {
        if (eventArr[i].hour == hourNum) {
          eventArr.splice(i,1);
        }
      }
      
      // Before pushing new event, erase old event at that hour IF it exists
      // TODO
      
      eventArr.push(hourEvent);
      localStorage.setItem("events", JSON.stringify(eventArr));
      let message = $('<h4 class="text-center">Appointment added to LocalStorage! &#10003</h4>');
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
  let dateNum = currDay.date();
  console.log(dateNum);
  let suffix = 'th';

  if (dateNum == 1 || dateNum == 21 || dateNum == 31) {
    suffix = 'st';
  }
  else if (dateNum == 2 || dateNum == 22) {
    suffix = 'nd';
  }
  else if (dateNum == 3 || dateNum == 23) {
    suffix = 'rd';
  }

  dayDisp.text(dayjs().format(`dddd, MMMM D[${suffix}]`));
  
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

// When the document is ready

  // When a save button is clicked (line 46 html)
    // Retrive value from the sibling element
    // retrive value id attribute of the parent element as time
    // store the value into local storage with time as the key
    // display a notification by adding the class of show
    // After 5 seconds, high the notification by removing class of show
  
  // Define a function to update the hour