const { parse, isBefore, isEqual, isAfter } = dateFns;
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
const alldatetime = [];
    flatpickr("#startDate", {
      onChange: function (selectedDates) {
        startDate = selectedDates[0];
     
      }
    });
    flatpickr("#endDate", {
      onChange: function (selectedDates) {
        endDate = selectedDates[0];
      }
    });
let previousStart = starttimeEl.value;
let previousEnd = endtimeEl.value;

//  Check if any row exists
function hasAnyShowtimeRow() {
  return tdata.querySelectorAll("tr").length > 0;
}

//  Clear all time inputs in the daily showtimes table
function clearAllDailyTimeInputs() {
  if (alldatetime.length === 0) return;

  const basedate = new Date(); // Used for parsing

  const defaultStart = parse(alldatetime[0].starttime, "HH:mm", basedate);
  const defaultEnd = parse(alldatetime[0].endtime, "HH:mm", basedate);

  const rows = tdata.querySelectorAll("tr");

  rows.forEach((row) => {
    const inputs = row.querySelectorAll("input[type='time']");
    const startInput = inputs[0];
    const endInput = inputs[1];

    if (!startInput || !endInput || !startInput.value || !endInput.value)
      return;

    const rowStart = parse(startInput.value, "HH:mm", basedate);
    const rowEnd = parse(endInput.value, "HH:mm", basedate);

    const isOutOfRange =
      isBefore(rowStart, defaultStart) || isAfter(rowEnd, defaultEnd);

    if (isOutOfRange) {
      startInput.value = "";
      endInput.value = "";
    }
  });
}

//  Update the default time values and trigger validation
function updateIfReady() {
  if (
    startdataEl.value ||
    enddataEl.value ||
    starttimeEl.value ||
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

//  Confirm and handle default start time change
starttimeEl.addEventListener("change", function () {
  if (hasAnyShowtimeRow()) {
    const confirmChange = confirm(
      "Changing default start time will clear alldaily showtimes u can refill them. Continue?"
    );
    if (confirmChange) {
      updateIfReady();
      clearAllDailyTimeInputs();
      previousStart = starttimeEl.value;
    } else {
      starttimeEl.value = previousStart;
    }
  } else {
    updateIfReady();
    previousStart = starttimeEl.value;
  }
});

//  Confirm and handle default end time change
endtimeEl.addEventListener("change", function () {
  if (hasAnyShowtimeRow()) {
    const confirmChange = confirm(
      "Changing default end time will clear alldaily showtimes u can refill them. Continue?"
    );
    if (confirmChange) {
      updateIfReady();
      clearAllDailyTimeInputs();
      previousEnd = endtimeEl.value;
    } else {
      endtimeEl.value = previousEnd;
    }
  } else {
    updateIfReady();
    previousEnd = endtimeEl.value;
  }
});

function showtime() {
  updateIfReady();

  if (alldatetime.length > 0 && alldatetime[0]) {
    const { startdate, enddate, starttime, endtime } = alldatetime[0];

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
      // startEl.setAttribute(
      //   "onkeydown",
      //   "return event.key < '0' || event.key > '9'"
      // );
      tdStart.appendChild(startEl);
      trEl.appendChild(tdStart);

      // End Time input
      const tdEnd = document.createElement("td");
      const endEl = document.createElement("input");
      endEl.type = "time";
      // endEl.setAttribute(
      //   "onkeydown",
      //   "return event.key < '0' || event.key > '9'"
      // );
      tdEnd.appendChild(endEl);
      trEl.appendChild(tdEnd);

      // Remove button
      const tdBtn = document.createElement("td");
      const removeBtn = document.createElement("button");
      removeBtn.classList = "btn";
      removeBtn.textContent = "Remove";
      removeBtn.onclick = function () {
        const removedRow = this.closest("tr");
        const removedIndex = Array.from(tdata.querySelectorAll("tr")).indexOf(
          removedRow
        );
        console.log("removedIndex===========>",removedIndex);
        console.log("removedRow===========>",removedRow);
        // Remove matching showtime checkbox-label from all pricing plans
        tdata3.querySelectorAll("tr").forEach((planRow) => {
          const showtimestartEl = planRow.children[0];
          const showtimeTd = planRow.children[2]; // 3rd column (index 2)
          const allShowtimeDivs = showtimeTd.querySelectorAll(".show-ckeckbox");
          if (allShowtimeDivs[removedIndex]) {
            allShowtimeDivs[removedIndex].remove();
          }
          console.log("showtimestartEl===========>",showtimestartEl.querySelectorAll("input[type='date']").va)
          console.log("showtimetd===========>",showtimeTd)
          console.log("allShowtimeDivs===========>",allShowtimeDivs)
        });
        removedRow.remove();
      };
      tdBtn.appendChild(removeBtn);
      trEl.appendChild(tdBtn);

      // Add to DOM
      tdata.appendChild(trEl);
      [nameEl, startEl, endEl].forEach((input) => {
        input.addEventListener("change", () => {
          validate(trEl);
        });
      });
      updateShowtime();
      console.log("Tdata===========>", tdata.querySelectorAll("tr"));
      console.log("tdata===========>", document.querySelectorAll("#tdata tr"));
    }
  }
}
function validate(row) {
  const inputs = row.querySelectorAll("input");
  const newstart = inputs[1].value;
  const newend = inputs[2].value;

  if (!newstart || !newend) return;

  const basedate = new Date();

  // Parse all times
  const defaultStart = parse(alldatetime[0].starttime, "HH:mm", basedate);
  const defaultEnd = parse(alldatetime[0].endtime, "HH:mm", basedate);
  const newStartTime = parse(newstart, "HH:mm", basedate);
  const newEndTime = parse(newend, "HH:mm", basedate);
  console.log(newStartTime);
  // 1. Start must be before end
  if (!isBefore(newStartTime, newEndTime)) {
    alert("Start time must be before end time.");
    inputs[2].value = "";
    return;
  }

  // 2. Must be within default allowed range
  if (isBefore(newStartTime, defaultStart)) {
    alert(`Start time must be after: ${alldatetime[0].starttime}`);
    inputs[1].value = "";
    return;
  }

  if (isBefore(defaultEnd, newEndTime)) {
    alert(`End time must be before: ${alldatetime[0].endtime}`);
    inputs[2].value = "";
    return;
  }

  // 4. Overlap or touch detection
  const rows = tdata.querySelectorAll("tr");
  for (let tr of rows) {
    if (tr === row) continue;

    const otherInputs = tr.querySelectorAll("input");
    const otherStart = parse(otherInputs[1].value, "HH:mm", basedate);
    const otherEnd = parse(otherInputs[2].value, "HH:mm", basedate);

    if (isEqual(newStartTime, otherEnd)) {
      alert("Start time and End time cannot be the same.");
      inputs[1].value = "";
      return;
    }
    console.log("newEndTime", newEndTime, "otherEnd", otherEnd);
    console.log("newStartTime", newStartTime, "otherStart", otherStart);
    // console.log(newStartTime,"===",otherStart)
    console.log(newEndTime, "===", otherEnd);
    // const overlap2 = newStartTime < otherEnd && newEndTime<otherEnd ;
    const overlap2 =
      newStartTime > otherStart &&
      newStartTime < otherEnd &&
      newEndTime < otherEnd;
    const overlap3 = newStartTime < otherEnd && newEndTime > otherEnd;
    const overlap4 = newStartTime < otherEnd && isEqual(newEndTime, otherEnd);
    const overlap5 = newStartTime < otherStart && newEndTime > otherStart;
    if (overlap5) {
      alert("This time range overlaps or touches another showtime 5.");
      // inputs[1].value = "";
      inputs[2].value = "";
      return;
    }
    if (overlap4) {
      alert("This time range overlaps or touches another showtime 2.");
      inputs[1].value = "";
      inputs[2].value = "";
      return;
    }

    if (isEqual(otherStart, newEndTime)) {
      alert("Start time and End time cannot be the same never.");
      inputs[2].value = "";
      return;
    }
    if (overlap2) {
      alert("This time range overlaps or touches another showtime1.");
      inputs[1].value = "";
      inputs[2].value = "";
      return;
    }

    if (overlap3) {
      alert("This time range overlaps or touches another showtime.");
      inputs[1].value = "";
      return;
    }
  }
}

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

function ticketcategory() {
  if (alldatetime.length > 0 && alldatetime[0]) {
    const { startdate, enddate, starttime, endtime } = alldatetime[0];

    if (startdate && enddate && starttime && endtime) {
      const tr2 = document.createElement("tr");

      const tdcateName = document.createElement("td");
      const cateNameEl = document.createElement("input");
      cateNameEl.type = "text";
      cateNameEl.placeholder = "Enter your Show Category Name";
      tdcateName.append(cateNameEl);
      tr2.append(tdcateName);

      const tdcateprice = document.createElement("td");
      const priceEl = document.createElement("input");
      priceEl.type = "text";
      priceEl.placeholder = "Enter Your Ticket Price ₹";
      tdcateprice.append(priceEl);
      tr2.append(tdcateprice);

      const tdcatecount = document.createElement("td");
      const countEl = document.createElement("input");
      countEl.type = "text";
      countEl.placeholder = "Enter your Ticket Count";
      tdcatecount.append(countEl);
      tr2.append(tdcatecount);

      const tdcatebtn = document.createElement("td");
      const cateremoveBtn = document.createElement("button");
      cateremoveBtn.textContent = "Remove";
      cateremoveBtn.classList = "btn";
      cateremoveBtn.onclick = function () {
        const removedRow = this.closest("tr");
        const removedIndex = Array.from(tdata2.querySelectorAll("tr")).indexOf(
          removedRow
        );

        // Remove corresponding ticket category blocks in all pricing plan rows
        document.querySelectorAll("#tdata3 tr").forEach((planRow) => {
          const categoryTd = planRow.children[3]; // 4th column
          const allCategories =
            categoryTd.querySelectorAll(".pricing-showtime");
          if (allCategories[removedIndex]) {
            allCategories[removedIndex].remove();
          }
        });

        removedRow.remove();
      };

      tdcatebtn.append(cateremoveBtn);
      tr2.append(tdcatebtn);

      tdata2.appendChild(tr2);
      updateTicketCategory();
    }
  }
}
Addcategory.addEventListener("click", () => {
  const lastrows = document.querySelector("#tdata2 tr:last-child");
  if (lastrows) {
    const input = lastrows.querySelectorAll("input");
    const cateNameEl = input[0]?.value.trim();
    const catepriceEl = input[1]?.value.trim();
    const catecountEl = input[2]?.value.trim();

    if (!cateNameEl || !catepriceEl || !catecountEl) {
      alert("please full all ticketcategory input after add new one");
      return;
    }
  }
  ticketcategory();
});

let i = 0;
let j = 0;

function pricingplans() {
  const allInputs = document.querySelectorAll('#tdata input[type="text"]');
  const timeinput = document.querySelectorAll('#tdata input[type="time"]');
  const hastimeinput = Array.from(timeinput).some(
    (input) => input.value === ""
  );
  const hasEmptyshow = Array.from(allInputs).some(
    (input) => input.value.trim() === ""
  );
  if (hastimeinput) {
    alert("please fill all showtime input");
    return;
  }
  if (hasEmptyshow) {
    alert("Please fill out all Name inputs before adding a pricing plan.");
    return;
  }

  const allticketinputs = document.querySelectorAll(
    "#tdata2 input[type='text']"
  );
  const hasEmptyticket = Array.from(allticketinputs).some(
    (input) => input.value.trim() === ""
  );

  if (hasEmptyticket) {
    alert(
      "Please fill out all ticket category inputs before adding a pricing plan."
    );
    return;
  }

  const tr3 = document.createElement("tr");

  const pricestartdatetdEl = document.createElement("td");
  const pricestartdatedivEl = document.createElement("div");
  const pricestartdateinput = document.createElement("input");
  pricestartdatedivEl.classList = "priceinput";
  pricestartdateinput.type = "date";
  pricestartdatedivEl.append(pricestartdateinput);
  pricestartdatetdEl.append(pricestartdatedivEl);
  tr3.append(pricestartdatetdEl);

  const priceenddatatdEl = document.createElement("td");
  const priceenddatedivEl = document.createElement("div");
  const priceenddateinput = document.createElement("input");
  priceenddatedivEl.classList = "priceinput";
  priceenddateinput.type = "date";
  priceenddatedivEl.append(priceenddateinput);
  priceenddatatdEl.append(priceenddatedivEl);
  tr3.append(priceenddatatdEl);

  const showtdEl = document.createElement("td");
  allInputs.forEach((el, index) => {
    const showdivEl = document.createElement("div");
    showdivEl.className = "show-ckeckbox";

    const showinputEl = document.createElement("input");
    showinputEl.type = "checkbox";
    showinputEl.id = `showtime${i}-${index}`;

    const showlabelEl = document.createElement("label");
    showlabelEl.htmlFor = `showtime${i}-${index}`;
    const labelId = `label-showtime${i}-${index}`;
    showlabelEl.id = labelId;
    showlabelEl.innerText = el.value || `Show ${index + 1}`;

    // el.dataset.labelId = labelId;
    // el.addEventListener("input", () => {
    //   const label = document.getElementById(labelId);
    //   if (label) {
    //     label.innerText = el.value || `Show ${index + 1}`;
    //   }
    // });

    showdivEl.appendChild(showinputEl);
    showdivEl.appendChild(showlabelEl);
    showtdEl.appendChild(showdivEl);
  });
  tr3.append(showtdEl);

  const ticketcategorytdEl = document.createElement("td");
  const ticketRows = tdata2.querySelectorAll("tr");
  ticketRows.forEach((row, index) => {
    const inputs = row.querySelectorAll("input[type='text']");
    if (inputs.length < 3) return;

    const categoryName = inputs[0].value;
    const categoryPrice = inputs[1].value;
    const categoryCount = inputs[2].value;

    const ticketmaindivEl = document.createElement("div");
    ticketmaindivEl.classList = "pricing-showtime";

    const ticketfirstdivEl = document.createElement("div");
    const ticketfirstinputEl = document.createElement("input");
    ticketfirstinputEl.type = "checkbox";
    ticketfirstinputEl.id = `pricingplan${j}-${index}`;
    const ticketlabelEl = document.createElement("label");
    ticketlabelEl.htmlFor = `pricingplan${j}-${index}`;
    ticketlabelEl.innerText = categoryName;
    ticketfirstdivEl.append(ticketfirstinputEl, ticketlabelEl);

    const ticketseconddivEl = document.createElement("div");
    ticketseconddivEl.classList = "pricing-showtime-in";
    const ticketsecond1stinput = document.createElement("input");
    ticketsecond1stinput.type = "text";
    ticketsecond1stinput.value = categoryPrice;
    ticketsecond1stinput.placeholder = "Price";

    const ticketsecond2ndinput = document.createElement("input");
    ticketsecond2ndinput.type = "text";
    ticketsecond2ndinput.value = categoryCount;
    ticketsecond2ndinput.placeholder = "Count";

    ticketseconddivEl.append(ticketsecond1stinput, ticketsecond2ndinput);
    ticketmaindivEl.append(ticketfirstdivEl, ticketseconddivEl);
    ticketcategorytdEl.append(ticketmaindivEl);
  });
  tr3.append(ticketcategorytdEl);

  const removeTd = document.createElement("td");
  removeTd.innerHTML = `<button onclick="this.closest('tr').remove()" class="btn" >Remove</button>`;
  tr3.appendChild(removeTd);

  tdata3.appendChild(tr3);
  i++;
  j++;

  const globalStart = startdataEl.value;
  const globalEnd = enddataEl.value;

  const validateDates = () => {
    const startVal = pricestartdateinput.value;
    const endVal = priceenddateinput.value;

    if (!startVal || !endVal) return;

    if (startVal > endVal) {
      alert("Start date cannot be after end date.");
      pricestartdateinput.value = "";
      priceenddateinput.value = "";
      return;
    }

    if (globalStart && startVal < globalStart) {
      alert(
        `Start date cannot be before the event start date (${globalStart})`
      );
      pricestartdateinput.value = "";
      return;
    }

    if (globalEnd && endVal > globalEnd) {
      alert(`End date cannot be after the event end date (${globalEnd})`);
      priceenddateinput.value = "";
      return;
    }

    const rows = tdata3.querySelectorAll("tr");
    for (const row of rows) {
      if (row === tr3) continue;
      const inputs = row.querySelectorAll("input[type='date']");
      const exStart = inputs[0]?.value;
      const exEnd = inputs[1]?.value;

      if (startVal === exEnd) {
        alert("New start date cannot be equal to an existing end date.");
        pricestartdateinput.value = "";
        priceenddateinput.value = "";
        return;
      }

      const overlap =
        (startVal >= exStart && startVal <= exEnd) ||
        (endVal >= exStart && endVal <= exEnd) ||
        (startVal <= exStart && endVal >= exEnd);

      if (overlap) {
        alert("Date range overlaps with an existing pricing plan.");
        pricestartdateinput.value = "";
        priceenddateinput.value = "";
        return;
      }
    }
  };

  pricestartdateinput.addEventListener("change", validateDates);
  priceenddateinput.addEventListener("change", validateDates);
}

addpriceplan.addEventListener("click", () => {
  const lastrow = document.querySelector("#tdata3 tr:last-child");

  if (lastrow) {
    const inputs = lastrow.querySelectorAll("input[type='date']");
    const startdate = inputs[0]?.value;
    const enddate = inputs[1]?.value;

    if (!startdate || !enddate) {
      alert("please fill pervious start and end date after add new one");
      return;
    }
  }
  pricingplans();
});

function updateShowtime() {
  const allShowtimeInputs = document.querySelectorAll(
    '#tdata input[type="text"]'
  ); // all showtime names
  const pricingPlanRows = document.querySelectorAll("#tdata3 tr"); // all pricing plan rows

  pricingPlanRows.forEach((row, rowIndex) => {
    const showtimeTd = row.children[2]; // 3rd <td> is for showtimes
    showtimeTd.innerHTML = ""; // clear existing

    allShowtimeInputs.forEach((el, index) => {
      const showDiv = document.createElement("div");
      showDiv.className = "show-ckeckbox";

      const checkboxId = `showtime-${rowIndex}-${index}`;
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = checkboxId;

      const label = document.createElement("label");
      label.htmlFor = checkboxId;
      label.innerText = el.value || `Showtime ${index + 1}`;

      // Sync label if name changes
      el.addEventListener("input", () => {
        label.innerText = el.value || `Showtime ${index + 1}`;
      });

      showDiv.appendChild(input);
      showDiv.appendChild(label);
      showtimeTd.appendChild(showDiv);
    });
  });
}

function updateTicketCategory() {
  const categoryRows = document.querySelectorAll("#tdata2 tr"); // All ticket category rows
  const pricingPlanRows = document.querySelectorAll("#tdata3 tr"); // All pricing plan rows

  pricingPlanRows.forEach((row, rowIndex) => {
    const categoryTd = row.children[3]; // 4th column in pricing plan

    categoryRows.forEach((catRow, catIndex) => {
      const inputs = catRow.querySelectorAll('input[type="text"]');
      const nameInput = inputs[0]; // Category name
      const price1Input = inputs[1]; // Price
      const price2Input = inputs[2]; // Count

      if (!nameInput) return;

      const checkboxId = `cat-${rowIndex}-${catIndex}`;
      const currentLabel = nameInput.value.trim() || `Category ${catIndex + 1}`;

      //  Check if label with same text already exists in this pricing plan row
      const existingLabels = Array.from(
        categoryTd.querySelectorAll("label")
      ).map((l) => l.innerText.trim());
      if (existingLabels.includes(currentLabel)) return;

      // Create checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = checkboxId;

      // Create label for checkbox
      const label = document.createElement("label");
      label.htmlFor = checkboxId;
      label.innerText = currentLabel;

      // Sync label text when category name changes
      nameInput.addEventListener("input", () => {
        label.innerText = nameInput.value.trim() || `Category ${catIndex + 1}`;
      });

      // Wrap checkbox + label
      const checkboxLabelDiv = document.createElement("div");
      checkboxLabelDiv.appendChild(checkbox);
      checkboxLabelDiv.appendChild(label);

      // Create corresponding price inputs
      const priceInput1 = document.createElement("input");
      priceInput1.type = "text";
      priceInput1.value = price1Input?.value || "";

      const priceInput2 = document.createElement("input");
      priceInput2.type = "text";
      priceInput2.value = price2Input?.value || "";

      // Sync ticket category -> pricing plan (one-way sync)
      if (price1Input) {
        price1Input.addEventListener("input", () => {
          priceInput1.value = price1Input.value;
        });
      }

      if (price2Input) {
        price2Input.addEventListener("input", () => {
          priceInput2.value = price2Input.value;
        });
      }

      // Wrap price inputs
      const innerDiv = document.createElement("div");
      innerDiv.className = "pricing-showtime-in";
      innerDiv.appendChild(priceInput1);
      innerDiv.appendChild(priceInput2);

      // Final wrapper for entire category
      const wrapDiv = document.createElement("div");
      wrapDiv.className = "pricing-showtime";
      wrapDiv.appendChild(checkboxLabelDiv);
      wrapDiv.appendChild(innerDiv);

      // Append to the pricing plan cell
      categoryTd.appendChild(wrapDiv);
    });
  });
}
