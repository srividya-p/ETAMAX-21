import { Fragment, React, useEffect, useState } from "react";
import EventCard from "../Events/EventCard/EventCard";
import axios from "axios";
import { Spin, Space } from "antd";
import "./MyEvents.css";

function MyEvents() {
  const [events, setEventsArr] = useState([]);
  const [err, setErr] = useState(0);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_WEB_URL+"/api/events/my-events", {
        headers: {
          Authorization: `bearer ${localStorage.getItem("usertoken")}`,
        },
      })
      .then((response) => {
        setEventsArr(
          response.data.map((event, i) => {
            return (
              <div className="me-main-item">
                <EventCard
                  key={i}
                  data={{
                    category: event.category,
                    day: event.day,
                    description: event.description,
                    end: event.end,
                    entryFee: event.entryFee,
                    image: event.image,
                    isTeamSizeStrict: event.isTeamSizeStrict,
                    maxSeats: event.maxSeats,
                    prizeMoney: event.prizeMoney,
                    seats: event.seats,
                    start: event.start,
                    teamSize: event.teamSize,
                    title: event.title,
                    teamMembers: event.teamMembers,
                  }}
                  displayAdd={false}
                />
              </div>
            );
          })
        );
      })
      .catch((e) => setErr(1));
  }, []);
  return (
    <Fragment>
      {err ? (
        <Space size="middle" style={{ height: "50vh", marginLeft: "46%" }}>
          <Spin size="large" />
        </Space>
      ) : (
        <div className="me-main">{events}</div>
      )}
    </Fragment>
  );
}

export default MyEvents;
