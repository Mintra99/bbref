import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

import East_conf_2022 from "../data/conference/east/df_2022_East.csv";
import West_conf_2022 from "../data/conference/west/df_2022_West.csv";
import East_conf_2021 from "../data/conference/east/df_2021_East.csv";
import West_conf_2021 from "../data/conference/west/df_2021_West.csv";
import East_conf_2020 from "../data/conference/east/df_2020_East.csv";
import West_conf_2020 from "../data/conference/west/df_2020_West.csv";
import East_conf_2019 from "../data/conference/east/df_2019_East.csv";
import West_conf_2019 from "../data/conference/west/df_2019_West.csv";
import East_conf_2018 from "../data/conference/east/df_2018_East.csv";
import West_conf_2018 from "../data/conference/west/df_2018_West.csv";
import East_conf_2017 from "../data/conference/east/df_2017_East.csv";
import West_conf_2017 from "../data/conference/west/df_2017_West.csv";
import East_conf_2016 from "../data/conference/east/df_2016_East.csv";
import West_conf_2016 from "../data/conference/west/df_2016_West.csv";
import East_conf_2015 from "../data/conference/east/df_2015_East.csv";
import West_conf_2015 from "../data/conference/west/df_2015_West.csv";
import East_conf_2014 from "../data/conference/east/df_2014_East.csv";
import West_conf_2014 from "../data/conference/west/df_2014_West.csv";
import East_conf_2013 from "../data/conference/east/df_2013_East.csv";
import West_conf_2013 from "../data/conference/west/df_2013_West.csv";
import East_conf_2012 from "../data/conference/east/df_2012_East.csv";
import West_conf_2012 from "../data/conference/west/df_2012_West.csv";
import East_conf_2011 from "../data/conference/east/df_2011_East.csv";
import West_conf_2011 from "../data/conference/west/df_2011_West.csv";
import East_conf_2010 from "../data/conference/east/df_2010_East.csv";
import West_conf_2010 from "../data/conference/west/df_2010_West.csv";

export default function Stats() {
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [sortedField, setSortedField] = useState(null);
  const [conference, setConference] = useState("East");
  const [year, setYear] = useState("2022");
  const csv_data = useRef(East_conf_2022);

  useEffect(() => {
    // Selects conference
    // if (conference === "East") {
    //   csv_data.current = East_conf_2022;
    // } else {
    //   csv_data.current = West_conf_2022;
    // }

    // Selects year and conference
    switch (year) {
      case "2010":
        if (conference === "East") {
          csv_data.current = East_conf_2010;
          break;
        } else {
          csv_data.current = West_conf_2010;
          break;
        }
      case "2011":
        if (conference === "East") {
          csv_data.current = East_conf_2011;
          break;
        } else {
          csv_data.current = West_conf_2011;
          break;
        }
      case "2012":
        if (conference === "East") {
          csv_data.current = East_conf_2012;
          break;
        } else {
          csv_data.current = West_conf_2012;
          break;
        }
      case "2013":
        if (conference === "East") {
          csv_data.current = East_conf_2013;
          break;
        } else {
          csv_data.current = West_conf_2013;
          break;
        }
      case "2014":
        if (conference === "East") {
          csv_data.current = East_conf_2014;
          break;
        } else {
          csv_data.current = West_conf_2014;
          break;
        }
      case "2015":
        if (conference === "East") {
          csv_data.current = East_conf_2015;
          break;
        } else {
          csv_data.current = West_conf_2015;
          break;
        }
      case "2016":
        if (conference === "East") {
          csv_data.current = East_conf_2016;
          break;
        } else {
          csv_data.current = West_conf_2016;
          break;
        }
      case "2017":
        if (conference === "East") {
          csv_data.current = East_conf_2017;
          break;
        } else {
          csv_data.current = West_conf_2017;
          break;
        }
      case "2018":
        if (conference === "East") {
          csv_data.current = East_conf_2018;
          break;
        } else {
          csv_data.current = West_conf_2018;
          break;
        }
      case "2019":
        if (conference === "East") {
          csv_data.current = East_conf_2019;
          break;
        } else {
          csv_data.current = West_conf_2019;
          break;
        }
      case "2020":
        if (conference === "East") {
          csv_data.current = East_conf_2020;
          break;
        } else {
          csv_data.current = West_conf_2020;
          break;
        }
      case "2021":
        if (conference === "East") {
          csv_data.current = East_conf_2021;
          break;
        } else {
          csv_data.current = West_conf_2021;
          break;
        }
      case "2022":
        if (conference === "East") {
          csv_data.current = East_conf_2022;
          break;
        } else {
          csv_data.current = West_conf_2022;
          break;
        }
      default:
        console.log("HOW BRO???");
        break;
    }

    // Loads csv file
    async function getData() {
      const response = await fetch(csv_data.current);
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text
      const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
      const rows = results.data; // array of objects
      setParsedCsvData(rows);
    }
    getData();
  }, [conference, year]);

  return (
    <div className="Stats" style={{ margin: "20px" }}>
      <div className="Stats-dropdown" style={{ display: "flex", gap: "1rem" }}>
        <DropdownButton
          variant="dark"
          title="Select a conference"
          id="dropdown-menu-align-right"
          onSelect={(e) => setConference(e)}
        >
          <Dropdown.Item eventKey={"East"}>East</Dropdown.Item>
          <Dropdown.Item eventKey={"West"}>West</Dropdown.Item>
        </DropdownButton>

        <DropdownButton
          variant="dark"
          title="Select a Year"
          id="dropdown-menu-align-right"
          onSelect={(ele) => setYear(ele)}
        >
          <Dropdown.Item eventKey={2022}>2022</Dropdown.Item>
          <Dropdown.Item eventKey={2021}>2021</Dropdown.Item>
          <Dropdown.Item eventKey={2020}>2020</Dropdown.Item>
          <Dropdown.Item eventKey={2019}>2019</Dropdown.Item>
          <Dropdown.Item eventKey={2018}>2018</Dropdown.Item>
          <Dropdown.Item eventKey={2017}>2017</Dropdown.Item>
          <Dropdown.Item eventKey={2016}>2016</Dropdown.Item>
          <Dropdown.Item eventKey={2015}>2015</Dropdown.Item>
          <Dropdown.Item eventKey={2014}>2014</Dropdown.Item>
          <Dropdown.Item eventKey={2013}>2013</Dropdown.Item>
          <Dropdown.Item eventKey={2012}>2012</Dropdown.Item>
          <Dropdown.Item eventKey={2011}>2011</Dropdown.Item>
          <Dropdown.Item eventKey={2010}>2010</Dropdown.Item>
        </DropdownButton>
      </div>

      <h2>
        {conference}ern conference {year}
      </h2>
      <Table className="Statstable" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>
              <button type="button" onClick={() => setSortedField("Team")}>
                Teams
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("W")}>
                Wins
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("L")}>
                Losses
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("GB")}>
                GB
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("Playoffs")}>
                Playoffs
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {parsedCsvData &&
            parsedCsvData.map((parsedData, index) => (
              <tr key={index}>
                <td>{parsedData.Team}</td>
                <td>{parsedData.W}</td>
                <td>{parsedData.L}</td>
                <td>{parsedData.GB}</td>
                <td>{parsedData.Playoffs}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
