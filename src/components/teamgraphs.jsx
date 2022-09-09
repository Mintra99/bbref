import React, { useState, useEffect, useRef } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "./css/QuantityInput.css";

import team_data from "../data/nba_team_data.csv";

export default function TeamGraphs() {
  const csv_data = useRef(team_data);
  const [selectedTeam1, setSelectedTeam1] = useState("Atlanta Hawks");
  const [selectedTeam2, setSelectedTeam2] = useState("Boston Celtics");

  const [year1, setYear1] = useState([]);
  const [year2, setYear2] = useState([]);
  const [wins1, setWins1] = useState([]);
  const [wins2, setWins2] = useState([]);
  const [PSG1, setPSG1] = useState([]);
  const [PAG1, setPAG1] = useState([]);
  const [PSG2, setPSG2] = useState([]);
  const [PAG2, setPAG2] = useState([]);
  const [SRS1, setSRS1] = useState([]);
  const [SRS2, setSRS2] = useState([]);

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

      if (selectedTeam1 !== null && selectedTeam2 !== null) {
        let yearList1 = [];
        let winsList1 = [];
        let yearList2 = [];
        let winsList2 = [];
        let PSGList1 = [];
        let PAGList1 = [];
        let PSGList2 = [];
        let PAGList2 = [];
        let SRSList1 = [];
        let SRSList2 = [];

        let teamList = [];
        for (const i in rows) {
          let team = rows[i].Team;
          if (teamList.includes(team)) {
            console.log("");
          } else {
            teamList.push(team);
          }
          if (team === selectedTeam1) {
            yearList1.push(rows[i].Year);
            winsList1.push(rows[i].W);
            PSGList1.push(Object.values(rows[i])[6]);
            PAGList1.push(Object.values(rows[i])[7]);
            SRSList1.push(rows[i].SRS);
          }
          if (team === selectedTeam2) {
            yearList2.push(rows[i].Year);
            winsList2.push(rows[i].W);
            PSGList2.push(Object.values(rows[i])[6]);
            PAGList2.push(Object.values(rows[i])[7]);
            SRSList2.push(rows[i].SRS);
          }
        }
        setYear1(yearList1);
        setWins1(winsList1);
        setYear2(yearList2);
        setWins2(winsList2);
        setPSG1(PSGList1);
        setPAG1(PAGList1);
        setPSG2(PSGList2);
        setPAG2(PAGList2);
        setSRS1(SRSList1);
        setSRS2(SRSList2);
        setTeamsList(teamList);
      }
    }
    getData();
  }, [selectedTeam1, selectedTeam2]);

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
      <h1>
        {selectedTeam1} VS {selectedTeam2}
      </h1>
      <div className="Stats-dropdown" style={{ display: "flex", gap: "1rem" }}>
        <DropdownButton
          variant="dark"
          title="Select Team 1"
          id="dropdown-menu-align-right"
          onSelect={(ele) => setSelectedTeam1(ele)}
        >
          {renderDropdown()}
        </DropdownButton>
        <DropdownButton
          variant="dark"
          title="Select Team 2"
          id="dropdown-menu-align-right"
          onSelect={(ele) => setSelectedTeam2(ele)}
        >
          {renderDropdown()}
        </DropdownButton>
      </div>
      <Plot
        data={[
          {
            x: year1,
            y: wins1,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
            name: selectedTeam1,
          },
          {
            x: year2,
            y: wins2,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
            name: selectedTeam2,
          },
        ]}
        layout={{ width: 900, height: 400, title: "Wins" }}
      />
      <Plot
        data={[
          {
            x: year1,
            y: PSG1,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
            name: selectedTeam1,
          },
          {
            x: year2,
            y: PSG2,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
            name: selectedTeam2,
          },
        ]}
        layout={{ width: 900, height: 400, title: "Points scored per game" }}
      />

      <Plot
        data={[
          {
            x: year1,
            y: PAG1,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
            name: selectedTeam1,
          },
          {
            x: year2,
            y: PAG2,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
            name: selectedTeam2,
          },
        ]}
        layout={{
          width: 900,
          height: 400,
          title: "Points scored against per game",
        }}
      />

      <Plot
        data={[
          {
            x: year1,
            y: SRS1,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
            name: selectedTeam1,
          },
          {
            x: year2,
            y: SRS2,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
            name: selectedTeam2,
          },
        ]}
        layout={{
          width: 900,
          height: 400,
          title: "Simple rating system",
        }}
      />
    </div>
  );
}
