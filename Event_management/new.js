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
const theaternamearrEl = [];
console.log(selects);



function showtime() {
  const sdataEl = startdataEl.value;
  const edataEl = enddataEl.value;
  const stimeEl = starttimeEl.value;
  const etimeEl = endtimeEl.value;

  console.log("Start Date:", sdataEl);
  console.log("End Date:", edataEl);
  console.log("Start Time:", stimeEl);
  console.log("End Time:", etimeEl);
  if (sdataEl && edataEl && stimeEl && etimeEl) {
    const trEl = document.createElement("tr");

    const tdName = document.createElement("td");
    const nameEl = document.createElement("input");
    nameEl.type = "text";
    nameEl.placeholder = "Enter Your show Name ";
    tdName.appendChild(nameEl);
    trEl.appendChild(tdName);

    const tdStart = document.createElement("td");
    const startEl = document.createElement("input");
    startEl.type = "time";
    tdStart.appendChild(startEl);
    trEl.appendChild(tdStart);

    const tdEnd = document.createElement("td");
    const endEl = document.createElement("input");
    endEl.type = "time";
    tdEnd.appendChild(endEl);
    trEl.appendChild(tdEnd);

    const tdBtn = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.classList = "btn";
    removeBtn.textContent = "Remove";
    removeBtn.onclick = function () {
      const removedRow = this.closest("tr");
      const removedIndex = Array.from(tdata.querySelectorAll("tr")).indexOf(
        removedRow
      );

      // Remove matching showtime checkbox-label from all pricing plans
      document.querySelectorAll("#tdata3 tr").forEach((planRow) => {
        const showtimeTd = planRow.children[2]; // 3rd column (index 2)
        const allShowtimeDivs = showtimeTd.querySelectorAll(".show-ckeckbox");
        if (allShowtimeDivs[removedIndex]) {
          allShowtimeDivs[removedIndex].remove();
        }
      });
      removedRow.remove();
    };

    tdBtn.appendChild(removeBtn);
    trEl.appendChild(tdBtn);

    tdata.appendChild(trEl);

    const validate = () => {
      const newStart = startEl.value;
      const newEnd = endEl.value;

      if (!newStart || !newEnd) return;

      const toMinutes = (timeStr) => {
        const [h, m] = timeStr.split(":").map(Number);
        return h * 60 + m;
      };

      const newStartMin = toMinutes(newStart);
      const newEndMin = toMinutes(newEnd);
      const limitStartMin = toMinutes(stimeEl);
      const limitEndMin = toMinutes(etimeEl);

      if (newStartMin < limitStartMin) {
        alert(`Start time must be after ${stimeEl}`);
        startEl.value = "";
        return;
      }

      if (newEndMin > limitEndMin) {
        alert(`End time must be before ${etimeEl}`);
        endEl.value = "";
        return;
      }

      if (newStartMin >= newEndMin) {
        alert("Start time must be before End time.");
        startEl.value = "";
        endEl.value = "";
        return;
      }

      const rows = tdata.querySelectorAll("tr");

      rows.forEach((row) => {
        if (row === trEl) return;

        const inputs = row.querySelectorAll("input[type='time']");
        const exStart = inputs[0]?.value;
        const exEnd = inputs[1]?.value;

        if (!exStart || !exEnd) return;

        const exStartMin = toMinutes(exStart);
        const exEndMin = toMinutes(exEnd);

        if (newStartMin === exEndMin) {
          alert("New start time cannot be equal to an existing end time.");
          startEl.value = "";
          return;
        }

        const overlap =
          (newStartMin >= exStartMin && newStartMin < exEndMin) ||
          (newEndMin > exStartMin && newEndMin <= exEndMin) ||
          (newStartMin <= exStartMin && newEndMin >= exEndMin);

        if (overlap) {
          alert("Time range overlaps with an existing entry.");
          startEl.value = "";
          endEl.value = "";
          return;
        }
      });

      console.log("Start (min):", newStartMin, "End (min):", newEndMin);
    };

    startEl.addEventListener("change", validate);
    endEl.addEventListener("change", validate);
    // startEl.addEventListener("change",showtime)
    // edataEl.addEventListener("change",showtime)
    updateShowtime();
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
      if (!nameVal || !startVal || !endVal) {
        showCustomAlert(
          "Please fill in all fields (Name, Start Time, End Time) before adding another showtime."
        );
        return;
      }
      return;
    }
  }
  showtime();
});

// tickecategory-------------------------//
function ticketcategory() {
  const sdataEl = startdataEl.value;
  const edataEl = enddataEl.value;
  const stimeEl = starttimeEl.value;
  const etimeEl = endtimeEl.value;

  if (sdataEl && edataEl && stimeEl && etimeEl) {
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
        const allCategories = categoryTd.querySelectorAll(".pricing-showtime");
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

// pricingplans----------------------------------------------------//
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

updatebtn.addEventListener("click", () => {});

thearterinput.addEventListener("change", (e) => {
  const theaternameEl = e.target.value;
  theaternamearrEl.push(theaternameEl);
});

updatebtn.addEventListener("click", () => {
  const option = document.createElement("option");
  theaternamearrEl.map((name) => {
    option.innerText = name;
    option.value = name;
    selects.append(option);
    thearterinput.value = "";
  });
});


function showCustomAlert(message) {
  const alertBox = document.getElementById("custom-alert");
  const alertMsg = document.getElementById("alert-message");

  alertMsg.textContent = message;
  alertBox.classList.add("show");

  // Optional auto-close
  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 3000);
}

function closeCustomAlert() {
  const alertBox = document.getElementById("custom-alert");
  alertBox.classList.remove("show");
}
