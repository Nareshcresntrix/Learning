

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


function showtime() {
  const sdataEl = startdataEl.value;
  const edataEl = enddataEl.value;
  const stimeEl = starttimeEl.value;
  const etimeEl = endtimeEl.value;
  console.log(thearterinput.value, "values here");
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
      this.closest("tr").remove();
    };
     tdBtn.appendChild(removeBtn);
    trEl.appendChild(tdBtn);

    tdata.appendChild(trEl);

    const validate = () => {
      const newStart = startEl.value;
      const newEnd = endEl.value;

      if (!newStart || !newEnd) return;

      if (newStart < stimeEl) {
        alert(`Start time must be after ${stimeEl}`);
        startEl.value = "";
        return;
      }

      if (newEnd > etimeEl) {
        alert(`End time must be before ${etimeEl}`);
        endEl.value = "";
        return;
      }

      if (newStart >= newEnd) {
        alert("Start time must be before End time.");
        startEl.value = "";
        endEl.value = "";
        return;
      }

      const rows = tdata.querySelectorAll("tr");
      console.log(rows);

      rows.forEach((row) => {
        if (row === trEl) return; // Skip current row

        const inputs = row.querySelectorAll("input[type='time']");
        console.log("Row:", row);
        console.log("Time Inputs Found:", inputs.length, inputs);

        const exStart = inputs[0]?.value;
        const exEnd = inputs[1]?.value;

        if (!exStart || !exEnd) return;

        if (newStart === exEnd) {
          alert("New start time cannot be equal to an existing end time.");
          startEl.value = "";
          endEl.value = "";
          return;
        }

        const overlap =
          (newStart >= exStart && newStart < exEnd) ||
          (newEnd > exStart && newEnd <= exEnd) ||
          (newStart <= exStart && newEnd >= exEnd);

        if (overlap) {
          alert("Time range overlaps with an existing entry.");
          startEl.value = "";
          endEl.value = "";
          return;
        }
      });
    };

    startEl.addEventListener("change", validate);
    endEl.addEventListener("change", validate);
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


thearterinput.addEventListener("change", (e) => {
  const theaternameEl = e.target.value.trim() ;
  if(theaternameEl==="")return;
  theaternamearrEl.push(theaternameEl);
});
console.log(theaternamearrEl)

updatebtn.addEventListener("click", () => {
  const option = document.createElement("option");
  theaternamearrEl.map((name) => {
    option.innerText = name;
    option.value = name;
    selects.append(option);
    thearterinput.value = "";
  });
});