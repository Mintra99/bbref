import React, { useState, useEffect, useRef } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "./css/QuantityInput.css";

import player_data from "../data/nba_player_data.csv";

// Fix the cases where a player have played for several team in a season (Use Team: tot)
export default function Graphs() {
  const csv_data = useRef(player_data);
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2022");
  const [playersList, setPlayersList] = useState([]);
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [statsList, setStatsList] = useState([]);
  const [PTS, setPTS] = useState([]);
  const [AST, setAST] = useState([]);
  const [vsPlayers, setVsPlayers] = useState([]);

  const years = [
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
  ];

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
    }
    getData();
  }, []);

  useEffect(() => {
    // Creates a list of the players
    async function getPlayers() {
      let playerList = [];
      let currPlayerStats = [];
      for (const i in parsedCsvData) {
        if (parsedCsvData[i].Year === selectedYear) {
          if (playerList.includes(parsedCsvData[i].Player)) {
            console.log("");
          } else {
            playerList.push(parsedCsvData[i].Player);
            currPlayerStats.push(parsedCsvData[i]);
          }
        }
      }
      console.log(playerList);
      setPlayersList(playerList);
      setStatsList(currPlayerStats);
    }
    getPlayers();
  }, [selectedYear]);

  useEffect(() => {
    // displays players
    function displayPlayers() {
      let ptsList = [];
      let astList = [];
      let vsPlayersList = [];

      for (const i in statsList) {
        if (statsList[i].Player === player1) {
          astList.push(statsList[i].AST);
          vsPlayersList.push(statsList[i].Player);
          ptsList.push(statsList[i].PTS);
        }
        if (statsList[i].Player === player2) {
          astList.push(statsList[i].AST);
          vsPlayersList.push(statsList[i].Player);
          ptsList.push(statsList[i].PTS);
        }
      }

      setPTS(ptsList);
      setAST(astList);
      setVsPlayers(vsPlayersList);
    }
    displayPlayers();
  }, [player1, player2]);

  const renderDropdown_year = () => {
    // Renders dropdown for years
    let dropdownSelect = [];
    for (let i = 0; i <= years.length; i++) {
      dropdownSelect.push(
        <Dropdown.Item eventKey={years[i]}>{years[i]}</Dropdown.Item>
      );
    }
    return dropdownSelect;
  };

  const renderDropdown_player = () => {
    // Renders dropdown for players
    let dropdownSelect = [];
    for (let i = 0; i <= playersList.length; i++) {
      dropdownSelect.push(
        <Dropdown.Item eventKey={playersList[i]}>
          {playersList[i]}
        </Dropdown.Item>
      );
    }
    return dropdownSelect;
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>
        {player1} vs {player2} {selectedYear}
      </h1>
      <div className="Stats-dropdown" style={{ display: "flex", gap: "1rem" }}>
        <DropdownButton
          variant="dark"
          title="Select Year"
          id="dropdown-menu-align-right"
          onSelect={(ele) => setSelectedYear(ele)}
        >
          {renderDropdown_year()}
        </DropdownButton>
        <DropdownButton
          variant="dark"
          title="Select Player 1"
          id="dropdown-menu-align-right"
          onSelect={(ele) => setPlayer1(ele)}
        >
          {renderDropdown_player()}
        </DropdownButton>
        <DropdownButton
          variant="dark"
          title="Select Player 2"
          id="dropdown-menu-align-right"
          onSelect={(ele) => setPlayer2(ele)}
        >
          {renderDropdown_player()}
        </DropdownButton>
      </div>
      <Plot
        data={[
          {
            type: "pie",
            values: PTS,
            labels: vsPlayers,
            textinfo: "value",
          },
        ]}
        layout={{ title: "Points per game" }}
      />
      <Plot
        data={[
          {
            type: "pie",
            values: AST,
            labels: vsPlayers,
            textinfo: "value",
          },
        ]}
        layout={{ title: "Assist per game" }}
      />
    </div>
  );
}
