import React, { useState, useEffect, useRef } from "react";
import East_conf_2022 from "../data/df_2022_East.csv";
import West_conf_2022 from "../data/df_2022_West.csv";
import Papa from "papaparse";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

export default function Stats() {
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [sortedField, setSortedField] = useState(null);
  const [value, setValue] = useState("East");
  const csv_data = useRef(East_conf_2022);

  useEffect(() => {
    // Selects conference
    if (value === "East") {
      csv_data.current = East_conf_2022;
    } else {
      csv_data.current = West_conf_2022;
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
  }, [value]);

  return (
    <div className="Stats" style={{ margin: "20px" }}>
      <DropdownButton
        variant="dark"
        title="Select a conference"
        id="dropdown-menu-align-right"
        onSelect={(e) => setValue(e)}
      >
        <Dropdown.Item eventKey={"East"}>East</Dropdown.Item>
        <Dropdown.Item eventKey={"West"}>West</Dropdown.Item>
      </DropdownButton>
      <h2>{value}ern conference</h2>
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
