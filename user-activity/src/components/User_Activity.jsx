import React, { useState } from "react";
import DayPicker from "react-day-picker";
import { Container, Row, Col, FormGroup } from "react-bootstrap";
import BarChart from "./BarChart";
import "react-day-picker/lib/style.css";

function UserActivity(props) {
  const [date, setDate] = useState({
    value: new Date().toISOString(),
    activity: null,
  });
  const dateWithTimeZone = (timeZone, str) => {
    let date = new Date(str);
    let utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
    let tzDate = new Date(date.toLocaleString("en-US", { timeZone: timeZone }));
    let offset = utcDate.getTime() - tzDate.getTime();

    date.setTime(date.getTime());
    return date;
  };
  const parseDate = (str) => {
    let dateString = str[0] + " " + str[1] + " " + str[2] + " ";
    let time = str[3].substr(0, str[3].length - 2);
    let clock = time.split(":");
    let hours = Number(clock[0]);
    if (str[3].substring(str[3].length - 2) === "PM") hours += 12;
    time = String(hours) + ":" + clock[1];
    dateString = dateString + time;
    return dateWithTimeZone(props.data.tz, dateString);
  };
  const activities = props.data.activity_periods.map((e) => {
    return {
      start: parseDate(e.start_time.split(" ").filter((e) => e.length > 0)),
      end: parseDate(e.end_time.split(" ").filter((e) => e.length > 0)),
    };
  });
  const handleChange = (value) => {
    setDate({
      value: value.toISOString(),
      activity: activities.filter(
        (e) =>
          e.start.getYear() === value.getYear() &&
          e.start.getMonth() === value.getMonth() &&
          e.start.getDate() === value.getDate()
      ),
    });
  };
  return (
    <Container>
      <Row xs={3}>
        <Col>
          <div>
            <FormGroup>
              <span>
                Select Date of Activity
                <DayPicker onDayClick={handleChange} />
              </span>
            </FormGroup>
          </div>
        </Col>
        <Col xs={8} md={4}>
          {date.activity && date.activity.length > 0 ? (
            <div>
              <BarChart
                start={date.activity[0].start}
                end={date.activity[0].end}
              />
              <p className="float-right">Hours</p>
            </div>
          ) : (
            "No Activity Found"
          )}
          <table>
            <tbody>{}</tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
}
export default UserActivity;
