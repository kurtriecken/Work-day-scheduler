// Jquery wrapper to ensure HTML is loaded before DOM manipulation occurs
$(function() {

  // Global varialbes
  const dayDisp = $('#currentDay');
  const currDay = dayjs();
  let eventArr = JSON.parse(localStorage.getItem('events') || "[]");
  
  // Initialization of page
  init();

  function init() {
    eventsDisplay();
    dateSetup();
    setBackgrounds();
  }

  // Populates calendar with data from local storage
  function eventsDisplay(){
    for (var i=0; i<eventArr.length; i++) {
    let hour = eventArr[i].hour;
    $(`#hour-${hour}`).children("textarea").val(eventArr[i].event);
    }
  }

  // Puts the current date at the top of the page
  function dateSetup() {
    let dateNum = currDay.date();
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
  }

  // Sets background colors of hours based on present time
  function setBackgrounds() {
    for (var i=9; i<=17; i++) {
      $(`#hour-${i}`).removeClass("past present future");
      let hourDiv = $(`#hour-${i}`);
      if (i < dayjs().hour()) {
        hourDiv.addClass("past");
      }
      else if (i > dayjs().hour()) {
        hourDiv.addClass("future");
      }
      else {
        hourDiv.addClass("present");
      }
      
    }
  }

  // Save buttons functionality
  $('#hour-block').on("click", function (e) {
    if (e.target.tagName == 'BUTTON') {
      let hourInp = e.target.parentElement.children[1].value.trim();
      let hourNum = e.target.parentElement.children[1].name;
      let hourEvent = {
        hour: hourNum,
        event: hourInp
      };
      eventArr = JSON.parse(localStorage.getItem('events') || "[]");
      for (let i = 0; i < eventArr.length; i++) {
        if (eventArr[i].hour == hourNum) {
          eventArr.splice(i,1);
        }
      }
      
      eventArr.push(hourEvent);
      localStorage.setItem("events", JSON.stringify(eventArr));
      $('#storage-message').toggleClass("hidden");
      setTimeout(() => {
        $('#storage-message').toggleClass("hidden");
      }, 5000);
    }
  
  });

  
  



});

// When the document is ready

  // When a save button is clicked (line 46 html)
    // Retrive value from the sibling element
    // retrive value id attribute of the parent element as time
    // store the value into local storage with time as the key
    // display a notification by adding the class of show
    // After 5 seconds, high the notification by removing class of show
  
  // Define a function to update the hour