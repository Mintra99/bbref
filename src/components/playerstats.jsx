import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

// importing stats for players
import players_2022 from "../data/players/df_2022_player.csv";
import players_2021 from "../data/players/df_2021_player.csv";
import players_2020 from "../data/players/df_2020_player.csv";
import players_2019 from "../data/players/df_2019_player.csv";
import players_2018 from "../data/players/df_2018_player.csv";
import players_2017 from "../data/players/df_2017_player.csv";
import players_2016 from "../data/players/df_2016_player.csv";
import players_2015 from "../data/players/df_2015_player.csv";
import players_2014 from "../data/players/df_2014_player.csv";
import players_2013 from "../data/players/df_2013_player.csv";
import players_2012 from "../data/players/df_2012_player.csv";
import players_2011 from "../data/players/df_2011_player.csv";
import players_2010 from "../data/players/df_2010_player.csv";

export default function PlayerStats() {
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [sortedField, setSortedField] = useState(null);
  const [year, setYear] = useState("2022");
  const csv_data = useRef(players_2022);

  useEffect(() => {
    // Selects year and conference
    switch (year) {
      case "2010":
        csv_data.current = players_2010;
        break;
      case "2011":
        csv_data.current = players_2011;
        break;
      case "2012":
        csv_data.current = players_2012;
        break;
      case "2013":
        csv_data.current = players_2013;
        break;
      case "2014":
        csv_data.current = players_2014;
        break;
      case "2015":
        csv_data.current = players_2015;
        break;
      case "2016":
        csv_data.current = players_2016;
        break;
      case "2017":
        csv_data.current = players_2017;
        break;
      case "2018":
        csv_data.current = players_2018;
        break;
      case "2019":
        csv_data.current = players_2019;
        break;
      case "2020":
        csv_data.current = players_2020;
        break;
      case "2021":
        csv_data.current = players_2021;
        break;
      case "2022":
        csv_data.current = players_2022;
        break;
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
  }, [year]);

  return (
    <div className="Stats" style={{ margin: "20px" }}>
      <div className="Stats-dropdown" style={{ display: "flex", gap: "1rem" }}>
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

      <h2>Player stats {year}</h2>
      <Table className="Statstable" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>
              <button type="button" onClick={() => setSortedField("Team")}>
                Players
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("W")}>
                Pos
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("L")}>
                Age
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("GB")}>
                Team
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("Playoffs")}>
                Games
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("Playoffs")}>
                GS
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("Playoffs")}>
                Min
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("Playoffs")}>
                FG%
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("Playoffs")}>
                3P%
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("Playoffs")}>
                PTS
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("Playoffs")}>
                REB
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("Playoffs")}>
                AST
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("Playoffs")}>
                STL
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("Playoffs")}>
                BLK
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("Playoffs")}>
                TOV
              </button>
            </th>
            <th>
              <button type="button" onClick={() => setSortedField("Playoffs")}>
                PF
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {parsedCsvData &&
            parsedCsvData.map((parsedData, index) => (
              <tr key={index}>
                <td>{parsedData.Player}</td>
                <td>{parsedData.Pos}</td>
                <td>{parsedData.Age}</td>
                <td>{parsedData.Tm}</td>
                <td>{parsedData.G}</td>
                <td>{parsedData.GS}</td>
                <td>{parsedData.MP}</td>
                <td>
                  {parseFloat(
                    parseFloat(parsedData.FG) / parseFloat(parsedData.FGA)
                  ).toFixed(3)}
                </td>
                <td>{Object.values(parsedData)[12]}</td>
                <td>{parsedData.PTS}</td>
                <td>
                  {parseFloat(
                    parseFloat(parsedData.ORB) + parseFloat(parsedData.DRB)
                  ).toFixed(1)}
                </td>
                <td>{parsedData.AST}</td>
                <td>{parsedData.STL}</td>
                <td>{parsedData.BLK}</td>
                <td>{parsedData.TOV}</td>
                <td>{parsedData.PF}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
