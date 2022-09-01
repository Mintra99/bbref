import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

import East_conf_2022 from "../data/df_2022_East.csv";
import West_conf_2022 from "../data/df_2022_West.csv";
import East_conf_2021 from "../data/df_2021_East.csv";
import West_conf_2021 from "../data/df_2021_West.csv";
import East_conf_2020 from "../data/df_2020_East.csv";
import West_conf_2020 from "../data/df_2020_West.csv";
import East_conf_2019 from "../data/df_2019_East.csv";
import West_conf_2019 from "../data/df_2019_West.csv";
import East_conf_2018 from "../data/df_2018_East.csv";
import West_conf_2018 from "../data/df_2018_West.csv";
import East_conf_2017 from "../data/df_2017_East.csv";
import West_conf_2017 from "../data/df_2017_West.csv";
import East_conf_2016 from "../data/df_2016_East.csv";
import West_conf_2016 from "../data/df_2016_West.csv";
import East_conf_2015 from "../data/df_2015_East.csv";
import West_conf_2015 from "../data/df_2015_West.csv";
import East_conf_2014 from "../data/df_2014_East.csv";
import West_conf_2014 from "../data/df_2014_West.csv";
import East_conf_2013 from "../data/df_2013_East.csv";
import West_conf_2013 from "../data/df_2013_West.csv";
import East_conf_2012 from "../data/df_2012_East.csv";
import West_conf_2012 from "../data/df_2012_West.csv";
import East_conf_2011 from "../data/df_2011_East.csv";
import West_conf_2011 from "../data/df_2011_West.csv";
import East_conf_2010 from "../data/df_2010_East.csv";
import West_conf_2010 from "../data/df_2010_West.csv";

export default function Stats() {
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [sortedField, setSortedField] = useState(null);
  const [conference, setConference] = useState("East");
  const [year, setYear] = useState(2022);
  const csv_data = useRef(East_conf_2022);

  useEffect(() => {
    // Selects conference
    // if (conference === "East") {
    //   csv_data.current = East_conf_2022;
    // } else {
    //   csv_data.current = West_conf_2022;
    // }

    // Selects year and conference
    switch(year){
      case 2010:
        if (conference === "East") {
          csv_data.current = East_conf_2010;
        } else {
          csv_data.current = West_conf_2010;
        }
      case 2011:
        if (conference === "East") {
          csv_data.current = East_conf_2011;
        } else {
          csv_data.current = West_conf_2011;
        }
      case 2012:
        if (conference === "East") {
          csv_data.current = East_conf_2012;
        } else {
          csv_data.current = West_conf_2012;
        }
      case 2013:
        if (conference === "East") {
          csv_data.current = East_conf_2013;
        } else {
          csv_data.current = West_conf_2013;
        }
      case 2014:
        if (conference === "East") {
          csv_data.current = East_conf_2014;
        } else {
          csv_data.current = West_conf_2014;
        }
      case 2015:
        if (conference === "East") {
          csv_data.current = East_conf_2015;
        } else {
          csv_data.current = West_conf_2015;
        }
      case 2016:
        if (conference === "East") {
          csv_data.current = East_conf_2016;
        } else {
          csv_data.current = West_conf_2016;
        }
      case 2017:
        if (conference === "East") {
          csv_data.current = East_conf_2017;
        } else {
          csv_data.current = West_conf_2017;
        }
      case 2018:
        if (conference === "East") {
          csv_data.current = East_conf_2018;
        } else {
          csv_data.current = West_conf_2018;
        }
      case 2019:
        if (conference === "East") {
          csv_data.current = East_conf_2019;
        } else {
          csv_data.current = West_conf_2019;
        }
      case 2020:
        if (conference === "East") {
          csv_data.current = East_conf_2020;
        } else {
          csv_data.current = West_conf_2020;
        }
      case 2021:
        if (conference === "East") {
          csv_data.current = East_conf_2021;
        } else {
          csv_data.current = West_conf_2021;
        }
      case 2022:
        if (conference === "East") {
          csv_data.current = East_conf_2022;
        } else {
          csv_data.current = West_conf_2022;
        }
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
        <Dropdown.Item eventKey={2020}>2022</Dropdown.Item>
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
      <h2>{conference}ern conference {year}</h2>
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
