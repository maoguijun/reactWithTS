import * as React from "react";
import { type } from "../config";

interface Items {
  key: string;
  stateValue: number;
  isModify: boolean;
  modifyValue: string;
  text: string;
}
interface Iprops {
  readonly list: any;
  textChange: (x: string, y: string) => void;
  delete: (x: string) => void;
  stateChange: (x: string) => void;
  save: (x: string) => void;
  modify: (x: string) => void;
  cancel: (x: string) => void;
}

const ItemBar = (props: Iprops) => (
  <div style={{ padding: "10px 0" }}>
    <div>
      {props.list &&
        props.list.map(
          (item: Items, index: number): any => (
            <div key={item.key} className={type[item.stateValue]}>
              {item.isModify ? (
                <input
                  type="text"
                  value={item.modifyValue}
                  onChange={e => props.textChange(item.key, e.target.value)}
                />
              ) : (
                item.text
              )}
              <button onClick={() => props.delete(item.key)}>Delete</button>
              <button
                disabled={item.stateValue === 4 ? true : false}
                style={{
                  backgroundColor: item.stateValue === 4 ? "red" : ""
                }}
                onClick={() => props.stateChange(item.key)}
              >
                State:{item.stateValue}
              </button>
              {item.isModify ? (
                <button
                  onClick={() => {
                    props.save(item.key);
                  }}
                >
                  确定
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.modify(item.key);
                  }}
                >
                  Modify
                </button>
              )}
              {item.isModify && (
                <button
                  onClick={() => {
                    props.cancel(item.key);
                  }}
                >
                  取消
                </button>
              )}
            </div>
          )
        )}
    </div>
  </div>
);

export default ItemBar;
