import "./logs.scss";
import "./dropdown.scss";

import { useEffect, useState } from "react";
import { getTx } from "./icon";
import Logs from "./Logs";
import Error from "./Error";
import { useLocation } from "react-router-dom";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
} from "./Dropdown";

function App() {
  const [logs, setLog] = useState(null);
  const [logs_error, setLogError] = useState([]);

  const [tx, setTx] = useState(null);
  const [error, setError] = useState(false);

  const [selectedServer, setSelectedServer] = useState({
    sejong: false,
    mainnet: false,
    berlin: true,
  });
  useEffect(() => {
    console.log("hey");
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("tx");
    if (myParam) {
      setTx(myParam);
    }
    console.log(myParam);
  });
  useEffect(() => {
    if (tx) {
      getRes(tx, selectedServer.mainnet);
    }
  }, [tx]);
  const getRes = async (tx, mainnet, sejong, berlin) => {
    let queryParams = new URLSearchParams(window.location.search);

    queryParams.set("tx", tx);

    console.log(queryParams);

    const re = await getTx(tx, mainnet, sejong, berlin);
    console.log(re);
    if (re) {
      setError(false);
      let err = [];
      await re.trace.logs.map((data) => {
        if (
          data.msg.toUpperCase().includes("ERROR") ||
          data.msg.toUpperCase().includes("FAILURE") ||
          data.msg.toUpperCase().includes("INVALID") ||
          data.msg.toUpperCase().includes("SUCCESS=FALSE") ||
          data.msg.toUpperCase().includes("SYSTEMEXCEPTION") ||
          data.msg.toUpperCase().includes("OUTOFSTEP") ||
          data.msg.toUpperCase().includes("REVERTED")
        ) {
          err.push(data);
        }
      });
      setLog(re.trace.logs);
      setLogError(err);
    } else {
      setError(true);
    }
  };
  let btn = null;
  if (selectedServer.sejong) {
    btn = <button className="btn">{"Sejong"}</button>;
  } else if (selectedServer.mainnet) {
    btn = <button className="btn">{"Mainnet"}</button>;
  } else if (selectedServer.berlin) {
    btn = <button className="btn">{"Berlin"}</button>;
  }

  return (
    <div className="App">
      <div className="server-input">
        <div className="input-btn">
          <div className="form">
            <input
              type="text"
              name="txHash"
              autoComplete="off"
              value={tx}
              required
              onChange={(e) => {
                setTx(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getRes(
                    tx,
                    selectedServer.mainnet,
                    selectedServer.sejong,
                    selectedServer.berlin
                  );
                }
              }}
            />
            <label className="label-name">
              <span className="content-name">TxHash</span>
            </label>
          </div>
          <button
            onClick={(e) => {
              if (tx) {
                getRes(
                  tx,
                  selectedServer.mainnet,
                  selectedServer.sejong,
                  selectedServer.berlin
                );
              }
            }}
          >
            Trace
          </button>
        </div>

        <div className="server">
          <Dropdown toggle={btn}>
            <DropdownMenu>
              <DropdownItem
                onClick={() =>
                  setSelectedServer((res) => {
                    return {
                      sejong: false,
                      berlin: false,
                      mainnet: true,
                    };
                  })
                }
              >
                Mainnet
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem
                onClick={() =>
                  setSelectedServer((res) => {
                    return {
                      sejong: true,
                      mainnet: false,
                      berlin: false,
                    };
                  })
                }
              >
                Sejong
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem
                onClick={() =>
                  setSelectedServer((res) => {
                    return {
                      sejong: false,
                      mainnet: false,
                      berlin: true,
                    };
                  })
                }
              >
                Berlin
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {error ? <Error /> : <Logs logs_error={logs_error} logs={logs} />}
    </div>
  );
}

export default App;
