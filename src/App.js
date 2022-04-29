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
  const [CustomServer, setCustomServer] = useState("");

  const [selectedServer, setSelectedServer] = useState({
    sejong: false,
    mainnet: false,
    berlin: true,
    lisbon: false,
    custom: false,
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

  const checkError = (data) => {
    if (
      data.toUpperCase().includes("ERROR") ||
      data.toUpperCase().includes("FAILURE") ||
      data.toUpperCase().includes("INVALID") ||
      data.toUpperCase().includes("SUCCESS=FALSE") ||
      data.toUpperCase().includes("SYSTEMEXCEPTION") ||
      data.toUpperCase().includes("OUTOFSTEP") ||
      data.toUpperCase().includes("REVERTED") ||
      data.toUpperCase().includes("SCOREEXCEPTION") ||
      data.toUpperCase().includes("ONLY NFT OWNER")
    ) {
      return true;
    } else {
      return false;
    }
  };
  const getRes = async (tx, mainnet, sejong, berlin, lisbon, custom) => {
    let queryParams = new URLSearchParams(window.location.search);

    queryParams.set("tx", tx);

    console.log(queryParams);

    const re = await getTx(
      tx,
      mainnet,
      sejong,
      berlin,
      lisbon,
      custom,
      CustomServer
    );
    if (re) {
      setError(false);
      let err = [];
      await re.trace.logs.map((data) => {
        if (checkError(data.msg)) {
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
  } else if (selectedServer.lisbon) {
    btn = <button className="btn">{"Lisbon"}</button>;
  } else if (selectedServer.custom) {
    btn = <button className="btn">{"Custom"}</button>;
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
                    selectedServer.berlin,
                    selectedServer.lisbon,
                    selectedServer.custom
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
                  selectedServer.berlin,
                  selectedServer.lisbon,
                  selectedServer.custom
                );
              }
            }}
          >
            Trace
          </button>
        </div>

        <div className="server">
          {selectedServer.custom ? (
            <input
              type="text"
              onChange={(e) => {
                setCustomServer(e.target.value);
              }}
            />
          ) : null}
          <Dropdown toggle={btn}>
            <DropdownMenu>
              <DropdownItem
                onClick={() =>
                  setSelectedServer((res) => {
                    return {
                      sejong: false,
                      berlin: false,
                      mainnet: true,
                      lisbon: false,
                      custom: false,
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
                      lisbon: false,
                      custom: false,
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
                      lisbon: false,
                      custom: false,
                    };
                  })
                }
              >
                Berlin
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem
                onClick={() =>
                  setSelectedServer((res) => {
                    return {
                      sejong: false,
                      mainnet: false,
                      berlin: false,
                      lisbon: true,
                      custom: false,
                    };
                  })
                }
              >
                Lisbon
              </DropdownItem>{" "}
              <DropdownDivider />
              <DropdownItem
                onClick={() =>
                  setSelectedServer((res) => {
                    return {
                      sejong: false,
                      mainnet: false,
                      berlin: false,
                      lisbon: false,
                      custom: true,
                    };
                  })
                }
              >
                Custom
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {error ? (
        <Error />
      ) : (
        <Logs checkError={checkError} logs_error={logs_error} logs={logs} />
      )}
    </div>
  );
}

export default App;
