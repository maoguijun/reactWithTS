import * as React from "react";

interface Iprops {
  readonly inputValue: string;
  onChange: (v: string) => any;
  click: () => any;
}
const HeadBar = ({ inputValue, onChange, click, ...rest }: Iprops) => (
  <div className="head">
    <input
      type="text"
      value={inputValue}
      onChange={e => {
        onChange(e.target.value);
      }}
    />
    <button onClick={() => click()}>Add</button>
  </div>
);

export default HeadBar;
