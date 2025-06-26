const startdataEl = document.getElementById("startDate");
const enddataEl = document.getElementById("endDate");
const starttimeEl = document.getElementById("startTime");
const endtimeEl = document.getElementById("endTime");
const addprice = document.getElementById("Addprice");
const Addcategory = document.getElementById("Addcategory");
const addpriceplan = document.getElementById("addpriceplan");
const tdata = document.getElementById("tdata");
const tdata2 = document.getElementById("tdata2");
const tdata3 = document.getElementById("tdata3");
const updatebtn = document.getElementById("update");
const thearterinput = document.querySelector("#thearter input[type='text']");
const selects = document.getElementById("theaterSelect");
const h1 = document.getElementById("element");
const theaternamearrEl = [];
const alldatetime = [];
const allcreateshowtime = [];

// Update datetime range if inputs are ready
function updateIfReady() {
  if (
    startdataEl.value &&
    enddataEl.value &&
    starttimeEl.value &&
    endtimeEl.value
  ) {
    alldatetime.length = 0;
    alldatetime.push({
      startdate: startdataEl.value,
      enddate: enddataEl.value,
      starttime: starttimeEl.value,
      endtime: endtimeEl.value,
    });
    console.log("Updated datetime:", alldatetime[0]);
  }
}

[startdataEl, enddataEl, starttimeEl, endtimeEl].forEach((input) => {
  input.addEventListener("change", updateIfReady);
});

function showtime() {
  updateIfReady();
  const { startdate, enddate, starttime, endtime } = alldatetime[0] || {};

  if (startdate && enddate && starttime && endtime) {
    const trEl = document.createElement("tr");

    // Name input
    const tdName = document.createElement("td");
    const nameEl = document.createElement("input");
    nameEl.type = "text";
    nameEl.placeholder = "Enter Your Show Name";
    tdName.appendChild(nameEl);
    trEl.appendChild(tdName);

    // Start Time input
    const tdStart = document.createElement("td");
    const startEl = document.createElement("input");
    startEl.type = "time";
    tdStart.appendChild(startEl);
    trEl.appendChild(tdStart);

    // End Time input
    const tdEnd = document.createElement("td");
    const endEl = document.createElement("input");
    endEl.type = "time";
    tdEnd.appendChild(endEl);
    trEl.appendChild(tdEnd);

    // Remove button
    const tdBtn = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.classList = "btn";
    removeBtn.textContent = "Remove";
    removeBtn.onclick = function () {
      this.closest("tr").remove();
      validate(null); // Recalculate all
    };
    tdBtn.appendChild(removeBtn);
    trEl.appendChild(tdBtn);

    // Add to DOM
    tdata.appendChild(trEl);

    // Attach validation to changes
    [nameEl, startEl, endEl].forEach((input) => {
      input.addEventListener("change", () => validate(trEl));
    });
  }
}

function validate(row) {
  updateIfReady();
  allcreateshowtime.length = 0;

  const rows = tdata.querySelectorAll("tr");

  // Rebuild full array
  rows.forEach((r) => {
    const inputs = r.querySelectorAll("input");
    allcreateshowtime.push({
      name: inputs[0].value,
      start: inputs[1].value,
      end: inputs[2].value,
    });
  });

  if (!row) return;

  const inputs = row.querySelectorAll("input");
  const newstart = inputs[1].value;
  const newend = inputs[2].value;

  if (!newstart || !newend) return;

  const toMinutes = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
  };

  const newStartMin = toMinutes(newstart);
  const newEndMin = toMinutes(newend);
  const limitStartMin = toMinutes(alldatetime[0].starttime);
  const limitEndMin = toMinutes(alldatetime[0].endtime);

  //  Range limit checks
  if (newStartMin < limitStartMin) {
    alert(`Start time must be after ${alldatetime[0].starttime}`);
    inputs[1].value = "";
    return;
  }

  if (newEndMin > limitEndMin) {
    alert(`End time must be before ${alldatetime[0].endtime}`);
    inputs[2].value = "";
    return;
  }

  if (!inputs[1].value || !inputs[2].value) return;

  if (newStartMin >= newEndMin) {
    alert("Start time must be before End time.");
    inputs[1].value = "";
    inputs[2].value = "";
    return;
  }

  //  Check against existing rows
  for (let r of rows) {
    if (r === row) continue;

    const rInputs = r.querySelectorAll("input[type='time']");
    const exStart = rInputs[0]?.value;
    const exEnd = rInputs[1]?.value;

    if (!exStart || !exEnd) continue;

    const exStartMin = toMinutes(exStart);
    const exEndMin = toMinutes(exEnd);

    if (newStartMin === exStartMin) {
      alert("Start time must be unique.");
      inputs[1].value = "";
      return;
    }

    if (newStartMin < exEndMin && newEndMin > exStartMin) {
      alert("Time range overlaps with an existing show.");
      inputs[1].value = "";
      inputs[2].value = "";
      return;
    }
  }

  console.log("Start (min):", newStartMin, "End (min):", newEndMin);
  console.log("All showtimes:", allcreateshowtime);
}

[starttimeEl, endtimeEl].forEach((input) => {
  input.addEventListener("change", () => {
    updateIfReady();
    revalidateAllRows();
  });
});

function revalidateAllRows() {
  const rows = tdata.querySelectorAll("tr");
  rows.forEach((row) => {
    validate(row);
  });
}

// function validate() {
//   updateIfReady();
//   allcreateshowtime.length = 0; // clear previous data
//   const rows = tdata.querySelectorAll("tr");

//   rows.forEach((row) => {
//     const inputs = row.querySelectorAll("input");
//     allcreateshowtime.push({
//       name: inputs[0].value,
//       start: inputs[1].value,
//       end: inputs[2].value,
//     });
//   });

//   const newstart = allcreateshowtime[0].start;
//   const newend = allcreateshowtime[0].end;
//   const stimeEl = alldatetime[0].starttime;
//   const etimeEl = alldatetime[0].endtime;
//   if (!newstart || !newend) return;
//   const toMinutes = (timeStr) => {
//     const [h, m] = timeStr.split(":").map(Number);
//     return h * 60 + m;
//   };

//   const newStartMin = toMinutes(newstart);
//   const newEndMin = toMinutes(newend);
//   const limitStartMin = toMinutes(stimeEl);
//   const limitEndMin = toMinutes(etimeEl);

//   if (newStartMin < limitStartMin) {
//     alert(`Start time must be after ${stimeEl}`);
//     startEl.value = "";
//     allcreateshowtime[0].start = "";
//     return;
//   }

//   if (newEndMin > limitEndMin) {
//     alert(`End time must be before ${etimeEl}`);
//     allcreateshowtime[0].end = "";
//     return;
//   }
//   if (newStartMin >= newEndMin) {
//     alert("Start time must be before End time.");
//     allcreateshowtime[0].start = "";
//     // allcreateshowtime[0].end = "";
//     return;
//   }

//   const allrows = tdata.querySelectorAll("tr");

//   allrows.forEach((row) => {
//     // if (row === trEl) return;

//     const inputs = row.querySelectorAll("input[type='time']");
//     const exStart = inputs[0]?.value;
//     const exEnd = inputs[1]?.value;

//     if (!exStart || !exEnd) return;

//     const exStartMin = toMinutes(exStart);
//     const exEndMin = toMinutes(exEnd);
//     if (newStartMin === exStartMin) {
//       alert("Start time must be unique");
//       allcreateshowtime[0].start = "";
//       return;
//     }
//     if(newStartMin<exEndMin){
//       alert("Start time must be before existing show end time");
//     allcreateshowtime[0].start = "";
//       return;
//     }
//   });
//   console.log("Start (min):", newStartMin, "End (min):", newEndMin);
//   console.log("ALL CREATE SHOW TIME:", allcreateshowtime);
// }

// const validate = () => {

//   const newStart = startEl.value;
//   const newEnd = endEl.value;
//   const stimeEl = alldatetime[0].starttime;
//   const etimeEl = alldatetime[0].endtime;

//   if (!newStart || !newEnd) return;

//   const toMinutes = (timeStr) => {
//     const [h, m] = timeStr.split(":").map(Number);
//     return h * 60 + m;
//   };
//   const newStartMin = toMinutes(newStart);
//   const newEndMin = toMinutes(newEnd);
//   const limitStartMin = toMinutes(stimeEl);
//   const limitEndMin = toMinutes(etimeEl);

//   if (newStartMin < limitStartMin) {
//     alert(`Start time must be after ${stimeEl}`);
//     startEl.value = "";
//     return;
//   }

//   if (newEndMin > limitEndMin) {
//     alert(`End time must be before ${etimeEl}`);
//     endEl.value = "";
//     return;
//   }

//   if (newStartMin >= newEndMin) {
//     alert("Start time must be before End time.");
//     startEl.value = "";
//     endEl.value = "";
//     return;
//   }

//   const rows = tdata.querySelectorAll("tr");

//   rows.forEach((row) => {
//     if (row === trEl) return;

//     const inputs = row.querySelectorAll("input[type='time']");
//     const exStart = inputs[0]?.value;
//     const exEnd = inputs[1]?.value;

//     if (!exStart || !exEnd) return;

//     const exStartMin = toMinutes(exStart);
//     const exEndMin = toMinutes(exEnd);

//     if (newStartMin === exEndMin) {
//       alert("New start time cannot be equal to an existing end time.");
//       startEl.value = "";
//       return;
//     }

//     const overlap =
//       (newStartMin >= exStartMin && newStartMin < exEndMin) ||
//       (newEndMin > exStartMin && newEndMin <= exEndMin) ||
//       (newStartMin <= exStartMin && newEndMin >= exEndMin);

//     if (overlap) {
//       alert("Time range overlaps with an existing entry.");
//       startEl.value = "";
//       endEl.value = "";
//       return;
//     }
//   });
//   console.log("Start (min):", newStartMin, "End (min):", newEndMin);
// };

// startEl.addEventListener("change", validate);
// endEl.addEventListener("change", validate);
// updateShowtime();

addprice.addEventListener("click", () => {
  console.log(addprice);
  const lastRow = tdata.querySelector("tr:last-child");

  if (lastRow) {
    const inputs = lastRow.querySelectorAll("input");
    const nameVal = inputs[0]?.value.trim();
    const startVal = inputs[1]?.value;
    const endVal = inputs[2]?.value;

    if (!nameVal || !startVal || !endVal) {
      showCustomAlert(
        "Please fill in all fields (Name, Start Time, End Time) before adding another showtime."
      );
      return;
    }
  }
  showtime();
});

// let latestDateTime = {
//   startdate: "",
//   enddate: "",
//   starttime: "",
//   endtime: ""
// };

// [startdataEl, enddataEl, starttimeEl, endtimeEl].forEach((input) => {
//   input.addEventListener("change", () => {
//     latestDateTime = {
//       startdate: startdataEl.value,
//       enddate: enddataEl.value,
//       starttime: starttimeEl.value,
//       endtime: endtimeEl.value
//     };
//     console.log("Latest defaults:", latestDateTime);
//     revalidateAllRows()
//   });
// });

// function toMinutes(timeStr) {
//   const [h, m] = timeStr.split(":").map(Number);
//   return h * 60 + m;
// }

// function showtime() {
//   const sdataEl = latestDateTime.startdate;
//   const edataEl = latestDateTime.enddate;
//   const stimeEl = latestDateTime.starttime;
//   const etimeEl = latestDateTime.endtime;
//   console.log(sdataEl)
//   console.log(edataEl)
//   console.log(stimeEl)
//   console.log(etimeEl)

//   if (!sdataEl || !edataEl || !stimeEl || !etimeEl) {
//     alert("Please select default date and time ranges first.");
//     return;
//   }

//   const trEl = document.createElement("tr");

//   const tdName = document.createElement("td");
//   const nameEl = document.createElement("input");
//   nameEl.type = "text";
//   nameEl.placeholder = "Enter Show Name";
//   tdName.appendChild(nameEl);
//   trEl.appendChild(tdName);

//   const tdStart = document.createElement("td");
//   const startEl = document.createElement("input");
//   startEl.type = "time";
//   tdStart.appendChild(startEl);
//   trEl.appendChild(tdStart);

//   const tdEnd = document.createElement("td");
//   const endEl = document.createElement("input");
//   endEl.type = "time";
//   tdEnd.appendChild(endEl);
//   trEl.appendChild(tdEnd);

//   const tdBtn = document.createElement("td");
//   const removeBtn = document.createElement("button");
//   removeBtn.classList.add("btn");
//   removeBtn.textContent = "Remove";
//   removeBtn.onclick = () => trEl.remove();
//   tdBtn.appendChild(removeBtn);
//   trEl.appendChild(tdBtn);

//   tdata.appendChild(trEl);

//   const validate = () => {
//     const newStart = startEl.value;
//     const newEnd = endEl.value;
//     if (!newStart || !newEnd) return;

//     const newStartMin = toMinutes(newStart);
//     const newEndMin = toMinutes(newEnd);
//     const limitStartMin = toMinutes(stimeEl);
//     const limitEndMin = toMinutes(etimeEl);

//     if (newStartMin < limitStartMin) {
//       alert(`Start time must be after ${stimeEl}`);
//       startEl.value = "";
//       return;
//     }

//     if (newEndMin > limitEndMin) {
//       alert(`End time must be before ${etimeEl}`);
//       endEl.value = "";
//       return;
//     }

//     if (newStartMin >= newEndMin) {
//       alert("Start time must be before end time.");
//       startEl.value = "";
//       endEl.value = "";
//       return;
//     }

//     const rows = tdata.querySelectorAll("tr");
//     rows.forEach((row) => {
//       if (row === trEl) return;

//       const timeInputs = row.querySelectorAll("input[type='time']");
//       const exStart = timeInputs[0]?.value;
//       const exEnd = timeInputs[1]?.value;

//       if (!exStart || !exEnd) return;

//       const exStartMin = toMinutes(exStart);
//       const exEndMin = toMinutes(exEnd);

//       const overlap =
//         (newStartMin >= exStartMin && newStartMin < exEndMin) ||
//         (newEndMin > exStartMin && newEndMin <= exEndMin) ||
//         (newStartMin <= exStartMin && newEndMin >= exEndMin);

//       if (overlap) {
//         alert("Time overlaps with an existing show.");
//         startEl.value = "";
//         endEl.value = "";
//         return;
//       }
//     });
//     console.log("Start (min):", newStartMin, "End (min):", newEndMin);
//   };
//   startEl.addEventListener("change", validate);
//   endEl.addEventListener("change", validate);
// }

// addprice.addEventListener("click", () => {
//   const lastRow = tdata.querySelector("tr:last-child");
//   if (lastRow) {
//     const inputs = lastRow.querySelectorAll("input");
//     const nameVal = inputs[0]?.value.trim();
//     const startVal = inputs[1]?.value;
//     const endVal = inputs[2]?.value;
//     if (!nameVal || !startVal || !endVal) {
//       alert("Please fill all fields in the previous row first.");
//       return;
//     }
//   }
//   showtime();
// });

// let prevStart = starttimeEl.value;
// let prevEnd = endtimeEl.value;

// function revalidateAllRows() {
//   const rows = tdata.querySelectorAll("tr");

//   let cancelUpdate = false;

//   rows.forEach((row) => {
//     const inputs = row.querySelectorAll("input[type='time']");
//     const startInput = inputs[0];
//     const endInput = inputs[1];

//     const startVal = startInput.value;
//     const endVal = endInput.value;

//     if (!startVal || !endVal) return;

//     const startMin = toMinutes(startVal);
//     const endMin = toMinutes(endVal);
//     const limitStart = toMinutes(starttimeEl.value);
//     const limitEnd = toMinutes(endtimeEl.value);

//     if (startMin < limitStart || endMin > limitEnd) {
//       const confirmClear = confirm(
//         `Existing row (${startVal}–${endVal}) is now invalid based on updated default time.`
//       );

//       if (confirmClear) {
//         startInput.value = "";
//         endInput.value = "";
//       } else {
//         cancelUpdate = true;
//       }
//     }
//   });

//   if (cancelUpdate) {
//     // Revert to old default values
//     starttimeEl.value = prevStart;
//     endtimeEl.value = prevEnd;
//   } else {
//     // Accept the new defaults
//     prevStart = starttimeEl.value;
//     prevEnd = endtimeEl.value;
//   }
// }

// // Helper function to convert HH:MM to minutes

eventmangement = [
  eventdefaultstartandend = {
    startdate: "",
    enddate: "",
    starttime: "",
    endtime: "",
  },
  showtime = {
    Name: "",
    starttime: "",
    endtime: "",
  },
  ticketcategory={
    category: "",
      price: "",
      count: "",
  },
  pricingplans={
    startdate: "",
    enddate: "",
    shows: "",
    tickets: [
      {
        category: "",
        price: "",
        count: "",
      },
    ],
  },
]
//   (ticketcategory = [
//     {
//       category: "",
//       price: "",
//       count: "",
//     },
//   ]);
// pricingplans = [{}];

