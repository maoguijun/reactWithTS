import * as React from "react";
import { type } from "../config";
import "./state.css";
interface Iprops {
  state: string;
  sort: (x: string) => void;
}
const StateBar = (props: Iprops) => (
  <div>
    <div style={{ overflow: "hidden", margin: 8 }}>
      {["1", "2", "3", "4", "all"].map((value, index) => {
        return (
          <div
            className={`states ${type[value]}`}
            style={props.state === value ? { fontSize: 25 } : {}}
            key={index}
            onClick={() => {
              props.sort(value);
            }}
          >
            {value}
          </div>
        );
      })}
    </div>
  </div>
);

export default StateBar;
