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

// ========== SHOWTIME ==========

function showtime() {
  const sdataEl = startdataEl.value;
  const edataEl = enddataEl.value;
  const stimeEl = starttimeEl.value;
  const etimeEl = endtimeEl.value;

  localStorage.setItem("globalTimeData", JSON.stringify({
    startDate: sdataEl,
    endDate: edataEl,
    startTime: stimeEl,
    endTime: etimeEl,
  }));

  if (sdataEl && edataEl && stimeEl && etimeEl) {
    const trEl = document.createElement("tr");

    const tdName = document.createElement("td");
    const nameEl = document.createElement("input");
    nameEl.type = "text";
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
    removeBtn.textContent = "Remove";
    removeBtn.onclick = function () {
      const removedRow = this.closest("tr");
      const removedIndex = Array.from(tdata.querySelectorAll("tr")).indexOf(removedRow);
      document.querySelectorAll("#tdata3 tr").forEach((planRow) => {
        const showtimeTd = planRow.children[2];
        const allShowtimeDivs = showtimeTd.querySelectorAll(".show-ckeckbox");
        if (allShowtimeDivs[removedIndex]) {
          allShowtimeDivs[removedIndex].remove();
        }
      });
      const showtimeData = JSON.parse(localStorage.getItem("showtimeData")) || [];
      showtimeData.splice(removedIndex, 1);
      localStorage.setItem("showtimeData", JSON.stringify(showtimeData));
      removedRow.remove();
    };
    tdBtn.appendChild(removeBtn);
    trEl.appendChild(tdBtn);
    tdata.appendChild(trEl);

    const validate = () => {
      const newStart = startEl.value;
      const newEnd = endEl.value;

      if (!newStart || !newEnd) return;

      if (newStart < stimeEl || newEnd > etimeEl || newStart >= newEnd) {
        alert("Invalid time range");
        startEl.value = "";
        endEl.value = "";
        return;
      }

      const rows = tdata.querySelectorAll("tr");
      for (let row of rows) {
        if (row === trEl) continue;
        const [exStart, exEnd] = row.querySelectorAll("input[type='time']");
        if (!exStart || !exEnd) continue;
        const overlap =
          (newStart >= exStart.value && newStart < exEnd.value) ||
          (newEnd > exStart.value && newEnd <= exEnd.value) ||
          (newStart <= exStart.value && newEnd >= exEnd.value);
        if (overlap) {
          alert("Time range overlaps");
          startEl.value = "";
          endEl.value = "";
          return;
        }
      }

      const showtimeData = JSON.parse(localStorage.getItem("showtimeData")) || [];
      const rowIndex = Array.from(tdata.querySelectorAll("tr")).indexOf(trEl);
      showtimeData[rowIndex] = {
        name: nameEl.value,
        start: startEl.value,
        end: endEl.value,
      };
      localStorage.setItem("showtimeData", JSON.stringify(showtimeData));
    };

    startEl.addEventListener("change", validate);
    endEl.addEventListener("change", validate);
  }
}

addprice.addEventListener("click", () => {
  const lastRow = tdata.querySelector("tr:last-child");
  if (lastRow) {
    const inputs = lastRow.querySelectorAll("input");
    if (![...inputs].every((inp) => inp.value.trim())) {
      alert("Fill all showtime fields before adding new one.");
      return;
    }
  }
  showtime();
});

function loadShowtimesFromStorage() {
  const globalTimeData = JSON.parse(localStorage.getItem("globalTimeData"));
  if (globalTimeData) {
    startdataEl.value = globalTimeData.startDate || "";
    enddataEl.value = globalTimeData.endDate || "";
    starttimeEl.value = globalTimeData.startTime || "";
    endtimeEl.value = globalTimeData.endTime || "";

    const showtimeData = JSON.parse(localStorage.getItem("showtimeData")) || [];
    showtimeData.forEach(({ name, start, end }) => {
      const trEl = document.createElement("tr");
  
      const tdName = document.createElement("td");
      const nameEl = document.createElement("input");
      nameEl.type = "text";
      nameEl.value = name;
      tdName.appendChild(nameEl);
      trEl.appendChild(tdName);
  
      const tdStart = document.createElement("td");
      const startEl = document.createElement("input");
      startEl.type = "time";
      startEl.value = start;
      tdStart.appendChild(startEl);
      trEl.appendChild(tdStart);
  
      const tdEnd = document.createElement("td");
      const endEl = document.createElement("input");
      endEl.type = "time";
      endEl.value = end;
      tdEnd.appendChild(endEl);
      trEl.appendChild(tdEnd);
  
      const tdBtn = document.createElement("td");
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.onclick = function () {
        const removedRow = this.closest("tr");
        const removedIndex = Array.from(tdata.querySelectorAll("tr")).indexOf(removedRow);
        document.querySelectorAll("#tdata3 tr").forEach((planRow) => {
          const showtimeTd = planRow.children[2];
          const allShowtimeDivs = showtimeTd.querySelectorAll(".show-ckeckbox");
          if (allShowtimeDivs[removedIndex]) {
            allShowtimeDivs[removedIndex].remove();
          }
        });
        const storedData = JSON.parse(localStorage.getItem("showtimeData")) || [];
        storedData.splice(removedIndex, 1);
        localStorage.setItem("showtimeData", JSON.stringify(storedData));
        removedRow.remove();
      };
      tdBtn.appendChild(removeBtn);
      trEl.appendChild(tdBtn);
      tdata.appendChild(trEl);
    });
  }

}

// ========== TICKET CATEGORY ==========

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
    tdcateName.append(cateNameEl);
    tr2.append(tdcateName);

    const tdcateprice = document.createElement("td");
    const priceEl = document.createElement("input");
    priceEl.type = "text";
    tdcateprice.append(priceEl);
    tr2.append(tdcateprice);

    const tdcatecount = document.createElement("td");
    const countEl = document.createElement("input");
    countEl.type = "text";
    tdcatecount.append(countEl);
    tr2.append(tdcatecount);

    const tdcatebtn = document.createElement("td");
    const cateremoveBtn = document.createElement("button");
    cateremoveBtn.textContent = "Remove";
    cateremoveBtn.onclick = function () {
      const removedRow = this.closest("tr");
      const removedIndex = Array.from(tdata2.querySelectorAll("tr")).indexOf(removedRow);
      removedRow.remove();

      // remove from localStorage
      const ticketdata = JSON.parse(localStorage.getItem("ticketdata")) || [];
      ticketdata.splice(removedIndex, 1);
      localStorage.setItem("ticketdata", JSON.stringify(ticketdata));
    };
    tdcatebtn.append(cateremoveBtn);
    tr2.append(tdcatebtn);
    tdata2.appendChild(tr2);

    //  Save on input event
    const updateTicketStorage = () => {
      const index = Array.from(tdata2.querySelectorAll("tr")).indexOf(tr2);
      const ticketdata = JSON.parse(localStorage.getItem("ticketdata")) || [];
      ticketdata[index] = {
        name: cateNameEl.value,
        price: priceEl.value,
        count: countEl.value,
      };
      localStorage.setItem("ticketdata", JSON.stringify(ticketdata));
    };

    cateNameEl.addEventListener("input", updateTicketStorage);
    priceEl.addEventListener("input", updateTicketStorage);
    countEl.addEventListener("input", updateTicketStorage);
  }
}


Addcategory.addEventListener("click", () => {
  const lastrows = document.querySelector("#tdata2 tr:last-child");
  if (lastrows) {
    const input = lastrows.querySelectorAll("input");
    const [cateNameEl, catepriceEl, catecountEl] = [...input].map(i => i.value.trim());
    if (!cateNameEl || !catepriceEl || !catecountEl) {
      alert("Please fill all ticket category inputs before adding new one");
      return;
    }
  }
  ticketcategory();
});

function loadTicketCategory() {
  const ticketdata = JSON.parse(localStorage.getItem("ticketdata")) || [];
  ticketdata.forEach((item) => {
    const tr2 = document.createElement("tr");

    const tdcateName = document.createElement("td");
    const cateNameEl = document.createElement("input");
    cateNameEl.type = "text";
    cateNameEl.value = item.name;
    tdcateName.append(cateNameEl);
    tr2.append(tdcateName);

    const tdcateprice = document.createElement("td");
    const priceEl = document.createElement("input");
    priceEl.type = "text";
    priceEl.value = item.price;
    tdcateprice.append(priceEl);
    tr2.append(tdcateprice);

    const tdcatecount = document.createElement("td");
    const countEl = document.createElement("input");
    countEl.type = "text";
    countEl.value = item.count;
    tdcatecount.append(countEl);
    tr2.append(tdcatecount);

    const tdcatebtn = document.createElement("td");
    const cateremoveBtn = document.createElement("button");
    cateremoveBtn.textContent = "Remove";
    cateremoveBtn.onclick = function () {
      const removedRow = this.closest("tr");
      const removedIndex = Array.from(tdata2.querySelectorAll("tr")).indexOf(removedRow);

      document.querySelectorAll("#tdata3 tr").forEach((planRow) => {
        const categoryTd = planRow.children[3];
        const allCategories = categoryTd.querySelectorAll(".pricing-showtime");
        if (allCategories[removedIndex]) {
          allCategories[removedIndex].remove();
        }
      });

      removedRow.remove();
      const updatedData = JSON.parse(localStorage.getItem("ticketdata")) || [];
      updatedData.splice(removedIndex, 1);
      localStorage.setItem("ticketdata", JSON.stringify(updatedData));
    };
    tdcatebtn.append(cateremoveBtn);
    tr2.append(tdcatebtn);

    tdata2.appendChild(tr2);

    const updateTicketStorage = () => {
      const index = Array.from(tdata2.querySelectorAll("tr")).indexOf(tr2);
      const ticketdata = JSON.parse(localStorage.getItem("ticketdata")) || [];
      ticketdata[index] = {
        name: cateNameEl.value,
        price: priceEl.value,
        count: countEl.value,
      };
      localStorage.setItem("ticketdata", JSON.stringify(ticketdata));
    };

    cateNameEl.addEventListener("input", updateTicketStorage);
    priceEl.addEventListener("input", updateTicketStorage);
    countEl.addEventListener("input", updateTicketStorage);
  });
}




// Price Plan Creation
function loadPricePlansFromStorage() {
  const showtimeList = JSON.parse(localStorage.getItem("showtimeData")) || [];
  const ticketList = JSON.parse(localStorage.getItem("ticketdata")) || [];
  const plans = JSON.parse(localStorage.getItem("priceplan")) || [];

  plans.forEach(plan => {
    const tr3 = document.createElement("tr");

    // Plan Name
    const tdPlanName = document.createElement("td");
    const planInput = document.createElement("input");
    planInput.type = "text";
    planInput.value = plan.planName;
    tdPlanName.appendChild(planInput);
    tr3.appendChild(tdPlanName);

    // Price
    const tdPlanPrice = document.createElement("td");
    const priceInput = document.createElement("input");
    priceInput.type = "text";
    priceInput.value = plan.planPrice;
    tdPlanPrice.appendChild(priceInput);
    tr3.appendChild(tdPlanPrice);

    // Showtimes
    const tdShowtime = document.createElement("td");
    showtimeList.forEach((item, idx) => {
      const div = document.createElement("div");
      div.className = "show-ckeckbox";
      const label = document.createElement("label");
      label.textContent = item.name || `Showtime ${idx + 1}`;
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = !!plan.showtimes?.[idx];
      div.appendChild(label);
      div.appendChild(checkbox);
      tdShowtime.appendChild(div);
    });
    tr3.appendChild(tdShowtime);

    // Categories
    const tdCategory = document.createElement("td");
    ticketList.forEach((item, idx) => {
      const div = document.createElement("div");
      div.className = "pricing-showtime";
      const label = document.createElement("label");
      label.textContent = item.name || `Category ${idx + 1}`;
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = !!plan.categories?.[idx];
      div.appendChild(label);
      div.appendChild(checkbox);
      tdCategory.appendChild(div);
    });
    tr3.appendChild(tdCategory);

    // Remove button
    const tdRemove = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = function () {
      const removedRow = this.closest("tr");
      const index = Array.from(tdata3.querySelectorAll("tr")).indexOf(removedRow);
      removedRow.remove();

      const plans = JSON.parse(localStorage.getItem("priceplan")) || [];
      plans.splice(index, 1);
      localStorage.setItem("priceplan", JSON.stringify(plans));
    };
    tdRemove.appendChild(removeBtn);
    tr3.appendChild(tdRemove);

    // Save on update
    const updateStorage = () => {
      const index = Array.from(tdata3.querySelectorAll("tr")).indexOf(tr3);
      const plans = JSON.parse(localStorage.getItem("priceplan")) || [];

      const showtimes = [...tdShowtime.querySelectorAll("input")].map(cb => cb.checked);
      const categories = [...tdCategory.querySelectorAll("input")].map(cb => cb.checked);

      plans[index] = {
        planName: planInput.value,
        planPrice: priceInput.value,
        showtimes,
        categories,
      };
      localStorage.setItem("priceplan", JSON.stringify(plans));
    };

    planInput.addEventListener("input", updateStorage);
    priceInput.addEventListener("input", updateStorage);
    [...tdShowtime.querySelectorAll("input"), ...tdCategory.querySelectorAll("input")]
      .forEach(cb => cb.addEventListener("change", updateStorage));

    tdata3.appendChild(tr3);
  });
}

// Call this on DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  loadShowtimesFromStorage();
  loadTicketCategory();
  loadPricePlansFromStorage(); //  don't forget this line
});
