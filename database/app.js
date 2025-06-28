// const express = require("express");
// const mysql = require("mysql");
// const bodyparser = require("body-parser");
// const app = express();
// const port = 3000;
// app.use(bodyparser.json());
// const conn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "event_management",
//   password: "",
// });
// conn.connect((err, connection) => {
//   if (err) throw err;
//   console.log("database connecting successfully");
// });

// app.post("/event/api", (req, res) => {
//   const { eventdefaultstartandend, showtime, ticketcategory, pricingplans } =
//     req.body;
//   conn.query(
//     "insert into events(thearter_name,startdate,enddate,starttime,endtime) values(?,?,?,?,?)",
//     [
//       eventdefaultstartandend.startdate,
//       eventdefaultstartandend.enddate,
//       eventdefaultstartandend.starttime,
//       eventdefaultstartandend.endtime,
//     ],
//     (err, eventResult) => {
//       if (err) {
//         console.error("Insert event error:", err);
//         return res.status(500).json({ message: "Event insert failed" });
//       }
//       const eventid=eventResult.insertid
//     }
//   );
// });

// app.listen(port, () => {
//   console.log("server is listing 3000 port");
// });

const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
const port = 3000;

app.use(bodyParser.json());

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "event_management",
});

conn.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  } else {
    console.log("Database connected");
  }
});

app.post("/event/api", (req, res) => {
  const {
    theatername,
    eventdefaultstartandend,
    showtimes,
    ticketcategories,
    pricingplans,
  } = req.body;

  console.log("______________________________________________****", req.body);
  console.log("eventdefaultstartandend", eventdefaultstartandend);
  console.log("showtimes", showtimes);
  console.log("ticketcategories", ticketcategories);
  console.log("pricingplans", pricingplans);
  console.log("pricingplans", pricingplans[0].tickets);
  const insertEventQuery = `
    INSERT INTO events (thearter_name, startdate, enddate, starttime, endtime)
    VALUES (?, ?, ?, ?, ?)
  `;

  const eventValues = [
    theatername.name,
    eventdefaultstartandend.startdate,
    eventdefaultstartandend.enddate,
    eventdefaultstartandend.starttime,
    eventdefaultstartandend.endtime,
  ];

  conn.query(insertEventQuery, eventValues, (err, eventResult) => {
    if (err) {
      console.error("Event insert failed:", err);
      return res.status(500).json({ message: "Event insert failed" });
    }

    const eventId = eventResult.insertId;

    // Insert showtimes
    if (Array.isArray(showtimes)) {
      showtimes.forEach((show) => {
        const showQuery = `
          INSERT INTO showtimes (event_id, name, starttime, endtime)
          VALUES (?, ?, ?, ?)
        `;
        conn.query(
          showQuery,
          [eventId, show.name, show.starttime, show.endtime],
          (err) => {
            if (err) console.error("Showtime insert error:", err);
          }
        );
      });
    }

    // Insert ticket categories
    if (Array.isArray(ticketcategories)) {
      ticketcategories.forEach((cat) => {
        const ticketQuery = `
          INSERT INTO ticket_categories (event_id, category, price, count)
          VALUES (?, ?, ?, ?)
        `;
        conn.query(
          ticketQuery,
          [eventId, cat.category, cat.price, cat.count],
          (err) => {
            if (err) console.error("Ticket category insert error:", err);
          }
        );
      });
    }

    // Insert pricing plans and nested tickets
if (Array.isArray(pricingplans)) {
  pricingplans.forEach((plan) => {
    const planQuery = `
      INSERT INTO pricing_plans (event_id, startdate, enddate, shows)
      VALUES (?, ?, ?, ?)
    `;

    const showString = Array.isArray(plan.shows)
      ? plan.shows
          .map((s) => `${s.showname}:${s.shownamestatus ? "1" : "0"}`)
          .join(",")
      : "";

    conn.query(
      planQuery,
      [eventId, plan.startdate, plan.enddate, showString],
      (err, planResult) => {
        if (err) {
          console.error("Pricing plan insert error:", err);
          return;
        }

        const planId = planResult.insertId;

        if (Array.isArray(plan.tickets)) {
          plan.tickets.forEach((ticket) => {
            const ticketQuery = `
              INSERT INTO plan_tickets (plan_id, category, price, count, categorystatus)
              VALUES (?, ?, ?, ?, ?)
            `;
            conn.query(
              ticketQuery,
              [
                planId,
                ticket.category,
                ticket.price,
                ticket.count,
                ticket.catecheck ? 1 : 0,
              ],
              (err) => {
                if (err) console.error("Plan ticket insert error:", err);
              }
            );
          });
        }
      }
    );
  });
}


    res.json({
      message: "Event with multiple showtimes/plans saved",
      event_id: eventId,
    });
  });
});
app.get("/event/:id", (req, res) => {
  const eventId = req.params.id;

  const getEventQuery = `SELECT * FROM events WHERE id = ?`;
  const getShowtimesQuery = `SELECT * FROM showtimes WHERE event_id = ?`;
  const getTicketCategoriesQuery = `SELECT * FROM ticket_categories WHERE event_id = ?`;
  const getPricingPlansQuery = `SELECT * FROM pricing_plans WHERE event_id = ?`;
  const getPlanTicketsQuery = `SELECT * FROM plan_tickets WHERE plan_id = ?`;

  conn.query(getEventQuery, [eventId], (err, eventRows) => {
    if (err) {
      console.error("Error fetching event:", err);
      return res.status(500).json({ error: "Event fetch failed" });
    }

    if (eventRows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    const event = eventRows[0];

    // Fetch showtimes
    conn.query(getShowtimesQuery, [eventId], (err, showtimes) => {
      if (err) return res.status(500).json({ error: "Showtimes fetch failed" });

      // Fetch ticket categories
      conn.query(getTicketCategoriesQuery, [eventId], (err, ticketcategories) => {
        if (err) return res.status(500).json({ error: "Ticket categories fetch failed" });

        // Fetch pricing plans
        conn.query(getPricingPlansQuery, [eventId], (err, pricingplansRaw) => {
          if (err) return res.status(500).json({ error: "Pricing plans fetch failed" });

          const pricingplans = [];
          let completed = 0;

          if (pricingplansRaw.length === 0) {
            return res.json({
              event,
              showtimes,
              ticketcategories,
              pricingplans: [],
            });
          }

          pricingplansRaw.forEach((plan) => {
            conn.query(getPlanTicketsQuery, [plan.id], (err, tickets) => {
              if (err) {
                console.error("Error fetching tickets:", err);
                tickets = [];
              }

              pricingplans.push({
                ...plan,
                shows: plan.shows.split(",").map((item) => {
                  const [showname, shownamestatus] = item.split(":");
                  return { showname, shownamestatus: shownamestatus === "1" };
                }),
                tickets,
              });

              completed++;
              if (completed === pricingplansRaw.length) {
                // Final response once all plans processed
                res.json({
                  event,
                  showtimes,
                  ticketcategories,
                  pricingplans,
                });
              }
            });
          });
        });
      });
    });
  });
});

// app.get("/event/:id", (req, res) => {
//   const eventId = req.params.id;

//   // Step 1: Fetch event data
//   const eventQuery = `SELECT * FROM events WHERE id = ?`;
//   conn.query(eventQuery, [eventId], (err, eventResults) => {
//     if (err || eventResults.length === 0) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     const event = eventResults[0];
//     const eventResponse = {
//       theatername: { name: event.thearter_name },
//       eventdefaultstartandend: {
//         startdate: event.startdate,
//         enddate: event.enddate,
//         starttime: event.starttime,
//         endtime: event.endtime,
//       },
//       showtimes: [],
//       ticketcategories: [],
//       pricingplans: [],
//     };

//     // Step 2: Fetch showtimes
//     const showQuery = `SELECT name, starttime, endtime FROM showtimes WHERE event_id = ?`;
//     conn.query(showQuery, [eventId], (err, shows) => {
//       if (err) return res.status(500).json({ message: "Showtime fetch error" });
//       eventResponse.showtimes = shows;

//       // Step 3: Fetch ticket categories
//       const ticketQuery = `SELECT category, price, count FROM ticket_categories WHERE event_id = ?`;
//       conn.query(ticketQuery, [eventId], (err, tickets) => {
//         if (err) return res.status(500).json({ message: "Ticket fetch error" });
//         eventResponse.ticketcategories = tickets;

//         // Step 4: Fetch pricing plans
//         const planQuery = `SELECT * FROM pricing_plans WHERE event_id = ?`;
//         conn.query(planQuery, [eventId], (err, plans) => {
//           if (err)
//             return res
//               .status(500)
//               .json({ message: "Pricing plan fetch error" });

//           const planIds = plans.map((p) => p.id);
//           if (planIds.length === 0) {
//             return res.json(eventResponse); //  Return full response
//           }

//           // Step 5: Fetch all plan_tickets in one go
//           const planTicketQuery = `SELECT * FROM plan_tickets WHERE plan_id IN (${planIds
//             .map(() => "?")
//             .join(",")})`;
//           conn.query(planTicketQuery, planIds, (err, planTickets) => {
//             if (err)
//               return res
//                 .status(500)
//                 .json({ message: "Plan ticket fetch error" });

//             // Attach tickets to their plans
//             const pricingplans = plans.map((plan) => ({
//               startdate: plan.startdate,
//               enddate: plan.enddate,
//               shows: plan.shows,
//               tickets: planTickets
//                 .filter((t) => t.plan_id === plan.id)
//                 .map((t) => ({
//                   category: t.category,
//                   price: t.price,
//                   count: t.count,
//                 })),
//             }));

//             eventResponse.pricingplans = pricingplans;

//             //  Final response
//             res.json(eventResponse);
//           });
//         });
//       });
//     });
//   });
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
