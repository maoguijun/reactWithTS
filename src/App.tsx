import * as React from "react";
import HeadBar from "./components/HeadBar";
import ItemBar from "./components/ItemBar";
import StateBar from "./components/StateBar";

interface Ilist {
  key: string;
  modifyValue: string;
  text: string;
  isModify: boolean;
  stateValue: number;
}

class App extends React.Component {
  constructor(props: object) {
    super(props);
    this.state = {
      changenum: -1,
      filterState: "all",
      list: [],
      num: 0,
      value: ""
    };
  }

  public addClick = (): any => {
    const {
      value,
      num,
      list
    }: { list: Ilist[]; value: string; num: number } = this.state as {
      value: string;
      num: number;
      list: any[];
    };
    if (value === "") {
      return false;
    }
    const listNew = [...list];
    listNew.push({
      isModify: false,
      key: `item_${num}`,
      modifyValue: "",
      stateValue: 1,
      text: value
    });
    this.setState({
      list: listNew,
      num: num + 1,
      value: ""
    });
  };
  public textChange = (value: string): any => {
    this.setState({
      value
    });
  };

  // ???
  public deleteHandle = (key: string): any => {
    const { list }: { list: Ilist[] } = this.state as { list: any[] };
    const listNew = list.filter(
      (item): any => {
        if (item.key !== key) {
          return item;
        }
      }
    );
    this.setState({
      list: listNew
    });
  };
  public sortHandle = (value: string): any => {
    this.setState({
      filterState: value
    });
  };

  public stateChange = (key: string): any => {
    const { list }: { list: Ilist[] } = this.state as { list: any[] };
    list.map(
      (item): any => {
        if (item.key === key && item.stateValue !== 4) {
          return {
            ...item,
            stateValue: ++item.stateValue
          };
        }
      }
    );
    this.setState({
      list
    });
  };
  public modifyHandle = (key: string): any => {
    const { list }: { list: Ilist[] } = this.state as { list: any[] };
    list.map(
      (item): any => {
        if (item.key === key) {
          item.isModify = true;
          return item;
        }
      }
    );
    this.setState({
      list
    });
  };
  public modifyChange = (key: string, value: string) => {
    const { list } = this.state as { list: any[] };
    list.map(
      (item): any => {
        if (item.key === key) {
          item.modifyValue = value;
          return item;
        }
      }
    );
    this.setState({
      list
    });
  };
  public saveHandle = (key: string): any => {
    const { list }:{list:Ilist[]} = this.state as { list: any[] };
    list.map(
      (item): any => {
        if (item.key === key) {
          item.text = item.modifyValue;
          item.modifyValue = "";
          item.isModify = false;
          return item;
        }
      }
    );
    this.setState({
      list
    });
  };
  public cancel = (key: string): any => {
    const { list }:{list:Ilist[]} = this.state as { list: any[] };
    list.map(
      (item): any => {
        if (item.key === key) {
          item.modifyValue = "";
          item.isModify = false;
          return item;
        }
      }
    );
    this.setState({
      list
    });
  };

  public render() {
    const { list, value, filterState }:{list:Ilist[],value:string,filterState:string} = this.state as {
      list: any[];
      value: string;
      filterState: string;
    };
    const viewList = (() => {
      if (filterState === "all") {
        return list;
      } else {
        return list.filter(
          (item): any => {
            if (item.stateValue.toString() === filterState) {
              return item;
            }
          }
        );
      }
    })();
    return (
      <div
        style={{
          padding: "20px 0 0 20px"
        }}
      >
        <HeadBar
          click={this.addClick}
          inputValue={value}
          onChange={this.textChange}
        />
        <StateBar sort={this.sortHandle} state={filterState} />
        <ItemBar
          list={viewList}
          delete={this.deleteHandle}
          stateChange={this.stateChange}
          modify={this.modifyHandle}
          save={this.saveHandle}
          textChange={this.modifyChange}
          cancel={this.cancel}
        />
      </div>
    );
  }
}

export default App;
