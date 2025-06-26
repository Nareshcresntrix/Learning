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
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
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
        conn.query(
          planQuery,
          [eventId, plan.startdate, plan.enddate, plan.shows],
          (err, planResult) => {
            if (err) {
              console.error("Pricing plan insert error:", err);
              return;
            }

            const planId = planResult.insertId;

            if (Array.isArray(plan.tickets)) {
              plan.tickets.forEach((ticket) => {
                const ticketQuery = `
                  INSERT INTO plan_tickets (plan_id, category, price, count)
                  VALUES (?, ?, ?, ?)
                `;
                conn.query(
                  ticketQuery,
                  [planId, ticket.category, ticket.price, ticket.count],
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

    res.json({ message: "Event with multiple showtimes/plans saved", event_id: eventId });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
