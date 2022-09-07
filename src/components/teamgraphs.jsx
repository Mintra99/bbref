import React, { useState, useEffect, useRef } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

//import East_conf_2022 from "../data/conference/east/df_2022_East.csv";
import team_data from "../data/nba_team_data.csv";

export default function TeamGraphs() {
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const csv_data = useRef(team_data);
  const [selectedTeam, setSelectedTeam] = useState("Atlanta Hawks");
  const [year, setYear] = useState([]);
  const [wins, setWins] = useState([]);
  const [teamsList, setTeamsList] = useState([]);

  useEffect(() => {
    // Loads csv file
    async function getData() {
      const response = await fetch(csv_data.current);
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text
      const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
      results.data.pop(); // removes the last value because it is empty
      const rows = results.data; // array of objects

      setParsedCsvData(rows);

      if (selectedTeam !== null) {
        let yearList = [];
        let winsList = [];
        let teamList = [];
        for (const i in rows) {
          let team = rows[i].Team;
          if (teamList.includes(team)) {
            console.log("");
          } else {
            teamList.push(team);
          }
          if (team === selectedTeam) {
            yearList.push(rows[i].Year);
            winsList.push(rows[i].W);
          }
        }
        setYear(yearList);
        setWins(winsList);
        setTeamsList(teamList);
      }
    }
    getData();
  }, [selectedTeam]);

  const renderDropdown = () => {
    let dropdownSelect = [];
    for (let i = 0; i <= teamsList.length; i++) {
      dropdownSelect.push(
        <Dropdown.Item eventKey={teamsList[i]}>{teamsList[i]}</Dropdown.Item>
      );
    }
    return dropdownSelect;
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Wins from 2010 for {selectedTeam}</h1>
      <div className="Stats-dropdown" style={{ display: "flex", gap: "1rem" }}>
        <DropdownButton
          variant="dark"
          title="Select a Team"
          id="dropdown-menu-align-right"
          onSelect={(ele) => setSelectedTeam(ele)}
        >
          {renderDropdown()}
        </DropdownButton>
      </div>
      <Plot
        data={[
          {
            x: year,
            y: wins,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
        ]}
        layout={{ width: 1100, height: 440, title: selectedTeam.current }}
      />
    </div>
  );
}
