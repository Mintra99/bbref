import React from "react";
import { CsvToHtmlTable } from "react-csv-to-table";

const data = [
    { name: "Anom", age: 19, gender: "Male" },
    { name: "Megha", age: 19, gender: "Female" },
    { name: "Subham", age: 25, gender: "Male"},
  ]

function Stats() {
    return (
        <div className="Stats-table">
          <table>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.name}</td>
                  <td>{val.age}</td>
                  <td>{val.gender}</td>
                </tr>
              )
            })}
          </table>
        </div>
      );
}

export default Stats;
