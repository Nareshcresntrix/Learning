// // const startdataEl = document.getElementById("startdate");
// // const enddataEl = document.getElementById("enddate");
// // const starttimeEl = document.getElementById("startime");
// // const endtimeEl = document.getElementById("endtime");
// // // console.log(startdataEl);
// // // console.log(enddataEl);
// // const tdata = document.getElementById("tdata");
// // const eventData = {
// //     eventDateRange: {
// //         startDate: "01-06-2025",
// //         endDate: "10-06-2025"
// //     },
// //     defaultDailyTime: {
// //         startTime: "09:00 AM",
// //         endTime: "11:00 PM"
// //     },
// //     dailyShowtimes: [
// //         { name: "A", startTime: "09:00 AM", endTime: "11:00 AM" },
// //         { name: "B", startTime: "12:00 PM", endTime: "02:00 PM" },
// //         { name: "C", startTime: "03:00 PM", endTime: "06:00 PM" },
// //         { name: "D", startTime: "07:00 PM", endTime: "09:00 AM" },
// //     ]
// // };
// // //save to date in localstorage
// // localStorage.setItem("mydata", JSON.stringify(eventData))
// // // get date from localstorage
// // let i = 0;
// // const Eventdata = JSON.parse(localStorage.getItem('mydata'))
// // console.log(Eventdata);
// // console.log('hello', Eventdata.eventDateRange);
// // console.log('hello', Eventdata.defaultDailyTime);
// // console.log('hello', Eventdata.dailyShowtimes[i]);
// // const Eventstartdate = Eventdata.eventDateRange.startDate
// // const Eventenddate = Eventdata.eventDateRange.endDate
// // const Eventstarttime = Eventdata.defaultDailyTime.startTime
// // const Eventendtime = Eventdata.defaultDailyTime.endTime
// // console.log(Eventstartdate, "MRs");
// //
// // const addprice = document.getElementById("Addprice")
// // function showtimes() {
// //     const stimeEl = starttimeEl.value;
// //     const etimeEl = endtimeEl.value;
// //     const sdataEl = startdataEl.value;
// //     const edataEl = enddataEl.value;
// //     if (sdataEl === Eventstartdate && edataEl === Eventenddate) {
// //         if (stimeEl === Eventstarttime && etimeEl === Eventendtime) {
// //             return Eventdata.dailyShowtimes.map((show) => {
// //                 return `
// //               <tr>
// //                   <td><h4>${show.name}</h4></td>
// //                   <td><input type="text" value="${show.startTime}" ></td>
// //                   <td><input type="text" value="${show.endTime}" ></td>
// //                   <td><button>Remove</button></td>
// //               </tr>
// //             `;
// //             })
// //         }
// //           return "";
// //     }
// // }
// //
// // startdataEl.addEventListener("input", showtimes);
// // enddataEl.addEventListener("input", showtimes);
// // starttimeEl.addEventListener("input", showtimes);
// // endtimeEl.addEventListener("input", showtimes);

// const eventData = {
//   eventDateRange: {
//     startDate: "2025-06-01",
//     endDate: "2025-06-10",
//   },
//   defaultDailyTime: {
//     startTime: "09:00",
//     endTime: "22:00",
//   },
//   dailyShowtimes: [
//     { name: "A", startTime: "09:00", endTime: "11:00" },
//     { name: "B", startTime: "12:00", endTime: "14:00" },
//     { name: "C", startTime: "15:00", endTime: "18:00" },
//     { name: "D", startTime: "19:00", endTime: "22:00" },
//   ],
// };
// const startdataEl = document.getElementById("startDate");
// const enddataEl = document.getElementById("endDate");
// const starttimeEl = document.getElementById("startTime");
// const endtimeEl = document.getElementById("endTime");
// const tdata = document.getElementById("tdata");
// const addprice = document.getElementById("Addprice");

// localStorage.setItem("mydata", JSON.stringify(eventData));
// const Eventdata = JSON.parse(localStorage.getItem("mydata"));

// const Eventstartdate = Eventdata.eventDateRange.startDate;
// const Eventenddate = Eventdata.eventDateRange.endDate;
// const Eventstarttime = Eventdata.defaultDailyTime.startTime;
// const Eventendtime = Eventdata.defaultDailyTime.endTime;

// let i = 0;

// function showtimes() {
//   const sdataEl = startdataEl.value;
//   const edataEl = enddataEl.value;
//   const stimeEl = starttimeEl.value;
//   const etimeEl = endtimeEl.value;

//   console.log("Input values:", sdataEl, edataEl, stimeEl, etimeEl);
//   console.log(
//     "Expected:",
//     Eventstartdate,
//     Eventenddate,
//     Eventstarttime,
//     Eventendtime
//   );

//   if (
//     sdataEl === Eventstartdate &&
//     edataEl === Eventenddate &&
//     stimeEl === Eventstarttime &&
//     etimeEl === Eventendtime
//   ) {
//     if (i < Eventdata.dailyShowtimes.length) {
//       const show = Eventdata.dailyShowtimes[i];
//       const rowHTML = `
//                 <tr>
//                     <td><h4>${show.name}</h4></td>
//                     <td><input type="text" value="${show.startTime}"></td>
//                     <td><input type="text" value="${show.endTime}"></td>
//                     <td><button onclick="this.closest('tr').remove()">Remove</button></td>
//                 </tr>
//             `;
//       tdata.innerHTML += rowHTML;
//       i++;
//     } else {
//       alert("All showtimes have been added.");
//     }
//   } else {
//     alert("Date or time does not match.");
//   }
// }
// addprice.addEventListener("click", showtimes);

// // startdataEl.addEventListener("change", showtimes);
// // enddataEl.addEventListener("change", showtimes);
// // starttimeEl.addEventListener("change", showtimes);
// // endtimeEl.addEventListener("change", showtimes);

// // const eventData = {
// //     eventDateRange: {
// //         startDate: "2025-06-01",
// //         endDate: "2025-06-10"
// //     },
// //     defaultDailyTime: {
// //         startTime: "09:00 AM",
// //         endTime: "11:00 PM"
// //     },
// //     dailyShowtimes: [
// //         { name: "A", startTime: "09:00 AM", endTime: "11:00 AM" },
// //         { name: "B", startTime: "12:00 PM", endTime: "02:00 PM" },
// //         { name: "C", startTime: "03:00 PM", endTime: "06:00 PM" },
// //         { name: "D", startTime: "07:00 PM", endTime: "09:00 AM" },
// //     ]
// // };

// // localStorage.setItem("mydata", JSON.stringify(eventData));
// // const Eventdata = JSON.parse(localStorage.getItem("mydata"));

// // let i = 0;
// //  const startdataEl = document.getElementById("startdate");
// // const enddataEl = document.getElementById("enddate");
// // const starttimeEl = document.getElementById("startime");
// // const endtimeEl = document.getElementById("endtime");
// // const tdata = document.getElementById("body");
// // const addprice = document.getElementById("Addprice");
// // function showtimes() {
// //     if (i < Eventdata.dailyShowtimes.length) {
// //         const show = Eventdata.dailyShowtimes[i];
// //         const rowHTML = `
// //         <tr>
// //             <td><h4>${show.name}</h4></td>
// //             <td><input type="text" value="${show.startTime}"></td>
// //             <td><input type="text" value="${show.endTime}"></td>
// //             <td><button onclick="this.closest('tr').remove()">Remove</button></td>
// //         </tr>
// //         `;
// //         tdata.innerHTML += rowHTML;
// //         i++;
// //     } else {
// //         alert("All showtimes have been added.");
// //     }
// // }

// // // Show first showtime on page load
// // window.addEventListener("DOMContentLoaded", showtimes);

// // // Add next showtime on button click
// // addprice.addEventListener("click", showtimes);

// // const startdataEl = document.getElementById("startdate");
// // const enddataEl = document.getElementById("enddate");
// // const starttimeEl = document.getElementById("startime");
// // const endtimeEl = document.getElementById("endtime");
// // console.log(startdataEl);
// // console.log(enddataEl);
// // const tdata = document.getElementById("tdata");

// // const data1 = [
// //   {
// //     sdate: "04-06-2025",
// //     edate: "06-06-2025",
// //   },

// //   { name: "A",
// //     stime: "09:00 PM",
// //     etime: "11:00 PM"
// //   },

// //   {
// //     name: "B",
// //     stime: "12:00 AM",
// //     etime: "02:00 AM",
// //   },

// //   {
// //     name: "c",
// //     stime: "03:00 AM",
// //     etime: "06:00 AM",
// //   },
// // ];

// // const data2 = [
// //   {
// //     sdate: "07-06-2025",
// //     edate: "09-06-2025",
// //   },

// //   { name: "A",
// //     stime: "09:00 PM",
// //     etime: "11:00 PM"
// //   },

// //   {
// //     name: "B",
// //     stime: "12:00 AM",
// //     etime: "02:00 AM",
// //   },
// // ];
// // const data3 = [
// //   {
// //     sdate: "10-06-2025",
// //     edate: "13-06-2025",
// //   },

// //   { name: "A",
// //     stime: "09:00 PM",
// //     etime: "11:00 PM"
// //   },

// //   {
// //     name: "B",
// //     stime: "12:00 AM",
// //     etime: "02:00 AM",
// //   },
// // ];
// // // Save to localStorage
// // localStorage.setItem("myData1", JSON.stringify(data1));
// // localStorage.setItem("myData2", JSON.stringify(data2));
// // localStorage.setItem("myData3", JSON.stringify(data3));
// // // Later, get it back
// // const savedData1 = JSON.parse(localStorage.getItem("myData1"));
// // const savedData2 = JSON.parse(localStorage.getItem("myData2"));
// // const savedData3 = JSON.parse(localStorage.getItem("myData3"));
// // // console.log(savedData1[0].sdate);
// // const [dateRange1, ...timeBlocks1] = savedData1;
// // const [dateRange2, ...timeBlocks2] = savedData2;
// // const [dateRange3, ...timeBlocks3] = savedData3;
// // console.log('Hello',dateRange1.sdate);
// // console.log('Hello',dateRange2.sdate);
// // console.log('Hello',dateRange3.sdate);
// // console.log('hi',timeBlocks1[1].stime);
// // function showtimes() {
// //   const stimeEl = starttimeEl.value;
// //   const etimeEl = endtimeEl.value;
// //   const sdataEl = startdataEl.value;
// //   const edataEl = enddataEl.value;

// //     if(sdataEl===dateRange1[1].sdate && edataEl===dateRange1[1].edate){
// //           if(stimeEl===timeBlocks1[1].stime && etimeEl===timeBlocks1[1].etime)
// //       return tdata.innerHTML +=`
// //         <tr>
// //           <td><h4>${d}</h4></td>
// //           <td>${item.stime}</td>
// //           <td>${item.etime}</td>
// //           <td><span onclick="this.closest('tr').remove()" style="cursor:pointer;color:red;">Remove</span></td>
// //         </tr>`
// //     }
// // }
// // startdataEl.addEventListener("input", showtimes);
// // enddataEl.addEventListener("input", showtimes);
// // starttimeEl.addEventListener("input", showtimes);
// // endtimeEl.addEventListener("input", showtimes);

// // if(sdataEl===datest1 && edataEl===dateed1){
// //    if(stimeEl===)
// // }

// // const datest1=savedData1[0].sdate
// // const dateed1=savedData1[0].edate
// // const datastarttime1=savedData1[1].stime
// // const dataendtime1=savedData1[1].etime

// // const datest2=savedData2[0].sdate
// // const dateed2=savedData2[0].edate
// // const datastarttime2=savedData2[1].stime
// // const dataendtime2=savedData2[1].etime

// // const datest3=savedData2[0].sdate
// // const dateed3=savedData2[0].edate
// // const datastarttime3=savedData2[1].stime
// // const dataendtime3=savedData2[1].etime

// function checkInputsAndShowFirst() {
//   const sdataEl = startdataEl.value;
//   const edataEl = enddataEl.value;
//   const stimeEl = starttimeEl.value;
//   const etimeEl = endtimeEl.value;

//   if (
//     sdataEl === Eventstartdate &&
//     edataEl === Eventenddate &&
//     stimeEl === Eventstarttime &&
//     etimeEl === Eventendtime &&
//     !firstShown
//   ) {
//     const show = Eventdata.dailyShowtimes[0];
//     const rowHTML = `
//       <tr>
//         <td><h4>${show.name}</h4></td>
//         <td><input type="text" value="${show.startTime}"></td>
//         <td><input type="text" value="${show.endTime}"></td>
//         <td><button onclick="this.closest('tr').remove()">Remove</button></td>
//       </tr>
//     `;
//     tdata.innerHTML += rowHTML;
//     i = 1;
//     firstShown = true;
//   }
// }

// const eventData = {
//   eventDateRange: {
//     startDate: "2025-06-01",
//     endDate: "2025-06-10",
//   },
//   defaultDailyTime1: {
//     startTime: "09:00",
//     endTime: "22:00",
//   },
//   dailyShowtimes1: [
//     { name: "A", startTime: "09:00", endTime: "11:00" },
//     { name: "B", startTime: "12:00", endTime: "14:00" },
//     { name: "C", startTime: "15:00", endTime: "18:00" },
//     { name: "D", startTime: "19:00", endTime: "22:00" },
//   ],
//   defaultDailyTime2: {
//     startTime: "12:00",
//     endTime: "22:00",
//   },
//   dailyShowtimes2: [
//     { name: "B", startTime: "12:00", endTime: "14:00" },
//     { name: "C", startTime: "15:00", endTime: "18:00" },
//     { name: "D", startTime: "19:00", endTime: "22:00" },
//   ],
//   defaultDailyTime3: {
//     startTime: "15:00",
//     endTime: "22:00",
//   },
//   dailyShowtimes3: [
//     { name: "C", startTime: "15:00", endTime: "18:00" },
//     { name: "D", startTime: "19:00", endTime: "22:00" },
//   ],
//   ticketCategories: [
//     { categoryname: "vip", price: 30, ticketcount: 0 },
//     { categoryname: "gold", price: 25, ticketcount: 0 },
//     { categoryname: "silver", price: 20, ticketcount: 0 },
//     { categoryname: "bronxe", price: 15, ticketcount: 0 },
//     { categoryname: "standard", price: 10, ticketcount: 0 },
//   ],
// };
// const startdataEl = document.getElementById("startDate");
// const enddataEl = document.getElementById("endDate");
// const starttimeEl = document.getElementById("startTime");
// const endtimeEl = document.getElementById("endTime");
// const tdata = document.getElementById("tdata");
// const addprice = document.getElementById("Addprice");

// localStorage.setItem("mydata", JSON.stringify(eventData));
// const Eventdata = JSON.parse(localStorage.getItem("mydata"));

// const Eventstartdate = Eventdata.eventDateRange.startDate;
// const Eventenddate = Eventdata.eventDateRange.endDate;
// const Eventstarttime = Eventdata.defaultDailyTime1.startTime;
// const Eventendtime = Eventdata.defaultDailyTime1.endTime;

// let i = 0;

// function showtimes1() {
//   const sdataEl = startdataEl.value;
//   const edataEl = enddataEl.value;
//   const stimeEl = starttimeEl.value;
//   const etimeEl = endtimeEl.value;

//   const Eventstartdate = Eventdata.eventDateRange.startDate;
//   const Eventenddate = Eventdata.eventDateRange.endDate;
//   const Eventstarttime = Eventdata.defaultDailyTime1.startTime;
//   const Eventendtime = Eventdata.defaultDailyTime1.endTime;

//   if (
//     sdataEl === Eventstartdate &&
//     edataEl === Eventenddate &&
//     stimeEl === Eventstarttime &&
//     etimeEl === Eventendtime
//   ) {
//     if (i < Eventdata.dailyShowtimes1.length) {
//       const show = Eventdata.dailyShowtimes1[i];
//       const rowHTML = `
//         <tr>
//           <td><h4>${show.name}</h4></td>
//           <td><input type="text" value="${show.startTime}"></td>
//           <td><input type="text" value="${show.endTime}"></td>
//           <td><button onclick="this.closest('tr').remove()">Remove</button></td>
//         </tr>
//       `;
//       tdata.innerHTML += rowHTML;
//       i++;
//     } else {
//       alert("All showtimes have been added.");
//     }
//   }
// }

// // Attach the check to all inputs
// [startdataEl, enddataEl, starttimeEl, endtimeEl].forEach((el) =>
//   el.addEventListener("input", showtimes1)
// );

// addprice.addEventListener("click", showtimes1);

// function showtimes2() {
//   const sdataEl = startdataEl.value;
//   const edataEl = enddataEl.value;
//   const stimeEl = starttimeEl.value;
//   const etimeEl = endtimeEl.value;

//   const Eventstartdate = Eventdata.eventDateRange.startDate;
//   const Eventenddate = Eventdata.eventDateRange.endDate;
//   const Eventstarttime = Eventdata.defaultDailyTime2.startTime;
//   const Eventendtime = Eventdata.defaultDailyTime2.endTime;
//   if (
//     sdataEl === Eventstartdate &&
//     edataEl === Eventenddate &&
//     stimeEl === Eventstarttime &&
//     etimeEl === Eventendtime
//   ) {
//     if (i < Eventdata.dailyShowtimes2.length) {
//       const show = Eventdata.dailyShowtimes2[i];
//       const rowHTML = `
//         <tr>
//           <td><h4>${show.name}</h4></td>
//           <td><input type="text" value="${show.startTime}"></td>
//           <td><input type="text" value="${show.endTime}"></td>
//           <td><button onclick="this.closest('tr').remove()">Remove</button></td>
//         </tr>
//       `;
//       tdata.innerHTML += rowHTML;
//       i++;
//     } else {
//       alert("All showtimes have been added.");
//     }
//   }
// }
// [startdataEl, enddataEl, starttimeEl, endtimeEl].forEach((el) =>
//   el.addEventListener("input", showtimes2)
// );

// addprice.addEventListener("click", showtimes2);

// function showtimes3() {
//   const sdataEl = startdataEl.value;
//   const edataEl = enddataEl.value;
//   const stimeEl = starttimeEl.value;
//   const etimeEl = endtimeEl.value;

//   const Eventstartdate = Eventdata.eventDateRange.startDate;
//   const Eventenddate = Eventdata.eventDateRange.endDate;
//   const Eventstarttime = Eventdata.defaultDailyTime3.startTime;
//   const Eventendtime = Eventdata.defaultDailyTime3.endTime;
//   if (
//     sdataEl === Eventstartdate &&
//     edataEl === Eventenddate &&
//     stimeEl === Eventstarttime &&
//     etimeEl === Eventendtime
//   ) {
//     if (i < Eventdata.dailyShowtimes3.length) {
//       const show = Eventdata.dailyShowtimes3[i];
//       const rowHTML = `
//         <tr>
//           <td><h4>${show.name}</h4></td>
//           <td><input type="text" value="${show.startTime}"></td>
//           <td><input type="text" value="${show.endTime}"></td>
//           <td><button onclick="this.closest('tr').remove()">Remove</button></td>
//         </tr>
//       `;
//       tdata.innerHTML += rowHTML;
//       i++;
//     } else {
//       alert("All showtimes have been added.");
//     }
//   }
// }
// [startdataEl, enddataEl, starttimeEl, endtimeEl].forEach((el) =>
//   el.addEventListener("input", showtimes3)
// );

// addprice.addEventListener("click", showtimes3);

const timetominutes = (timestr) => {
  const [hr, m] = timestr.split(":").map(Number);
  return hr * 60 + m;
};
console.log(timetominutes("08:20"));
