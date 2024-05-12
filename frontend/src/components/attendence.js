import React, { useEffect, useState } from "react";
import Skeleton from "./skeleton/skeleton";
import * as XLSX from "xlsx/xlsx.mjs";

import axios from "axios";

export default function Attendence() {
  const [attendance, setAttendence] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [name, setName] = useState("");

  const [majorAvailable, setMajorAvailable] = useState([]);
  const [major, setMajor] = useState("All");

  const [year, setYear] = useState("All");
  const [yearAvailable, setYearAvailable] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/attendence")
      .then((att) => {
        if (att.data === "Error") {
          window.alert("Error Loading data..");
          return;
        }
        let data = [];
        Object.keys(att.data).forEach((key) => {
          data.push(att.data[key]);
        });
        setFilteredData(data);

        let majorsVal = [];
        let yearsVal = [];

        for (let i = 0; i < data.length; i++) {
          if (majorsVal.indexOf(data[i].major) === -1) {
            majorsVal.push(data[i].major);
          }
          if (yearsVal.indexOf(data[i].year) === -1) {
            yearsVal.push(data[i].year);
          }
        }
        setMajorAvailable(majorsVal);
        setYearAvailable(yearsVal);
        setAttendence(data);
      })
      .catch((err) => {
        window.alert("Error fetching data.");
      });
  }, []);

  const handleMajor = (event) => {
    setMajor(event.target.value);
  };
  const handleYear = (event) => {
    setYear(event.target.value);
  };

  const handleFilter = (event) => {
    event.preventDefault();
    let newData = [];
    for (let i = 0; i < attendance.length; i++) {
      if (name === "" && year === "All" && major === "All") {
        newData = attendance;
        break;
      }
      if (
        (name === "" ||
          attendance[i].name.toLowerCase().includes(name.toLowerCase())) &&
        (year === "All" || attendance[i].year == year) &&
        (major === "All" || attendance[i].major === major)
      ) {
        newData.push(attendance[i]);
      }
    }
    // console.log(newData);
    setFilteredData(newData);
  };

  function LoadAttendence(props) {
    return (
      <>
        <tr>
          <td>{props.data.name}</td>
          <td>{props.data.major}</td>
          <td>{props.data.total_attendance}</td>
          <td>{props.data.last_attendance_time}</td>
          <td>{props.data.year}</td>
        </tr>
      </>
    );
  }
  function ExportData() {
    const filename = "attendence.xlsx";
    var ws = XLSX.utils.json_to_sheet(attendance);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, filename);
  }

  function ExportDataFiltered() {
    const filename = "attendence filtered.xlsx";
    var ws = XLSX.utils.json_to_sheet(filteredData);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, filename);
  }

  return (
    <>
      {attendance === "" ? (
        <div style={{ marginLeft: "10vw", width: "80vw" }}>
          <br />
          <br />
          <Skeleton type="square" />
          <Skeleton type="square" />
          <Skeleton type="square" />
          <Skeleton type="square" />
        </div>
      ) : (
        <>
          <br />
          <br />

          <div style={{ textAlign: "center" }}>
            <h4>Filter</h4>
            <form onSubmit={handleFilter}>
              {/* Name  */}
              <label>
                Name: &nbsp;
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {/* Year */}
              <label>
                Year: &nbsp;
                <select value={year} onChange={handleYear}>
                  <option value="All">All</option>
                  {yearAvailable.map((y) => (
                    <option value={y}>{y}</option>
                  ))}
                </select>
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {/* Major */}
              <label>
                Major: &nbsp;
                <select value={major} onChange={handleMajor}>
                  <option value="All">All</option>
                  {majorAvailable.map((m) => (
                    <option value={m}>{m}</option>
                  ))}
                </select>
              </label>
              <br />
              <button
                className="btn btn-primary"
                style={{ backgroundColor: "#dc3545" }}
                type="submit"
              >
                filter
              </button>
            </form>
          </div>
          <br/>

          <table id="customers">
            <tr>
              <th>Name</th>
              <th>Major</th>
              <th>Total Attendence</th>
              <th>Last attendance time</th>
              <th>year</th>
            </tr>
            {filteredData.map((student) => (
              <LoadAttendence data={student} />
            ))}
          </table>
          <br />
          <div style={{ textAlign: "center" }}>
            <button
              onClick={ExportData}
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: "#dc3545" }}
            >
              {" "}
              Download All data
            </button>{" "}
            &nbsp;
            <button
              onClick={ExportDataFiltered}
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: "#dc3545" }}
            >
              {" "}
              Download Filtered Data
            </button>
          </div>
          <br />
          <br />
        </>
      )}
    </>
  );
}
