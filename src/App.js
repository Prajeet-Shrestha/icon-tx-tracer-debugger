import './logs.scss';
import './dropdown.scss';

import { useEffect, useState } from 'react';
import { getTx } from './icon';
import Logs from './Logs';
import Error from './Error';
import { Dropdown, DropdownMenu, DropdownItem, DropdownDivider } from './Dropdown';

function App() {
  const [logs, setLog] = useState(null);
  const [logs_error, setLogError] = useState([]);

  const [tx, setTx] = useState(null);
  const [error, setError] = useState(false);

  const [selectedServer, setSelectedServer] = useState({
    sejong: true,
    mainnet: false,
  });

  const getRes = async (tx, mainnet) => {
    const re = await getTx(tx, mainnet);
    if (re) {
      setError(false);
      let err = [];
      await re.trace.logs.map((data) => {
        if (
          data.msg.toUpperCase().includes('ERROR') ||
          data.msg.toUpperCase().includes('FAILURE') ||
          data.msg.toUpperCase().includes('INVALID') ||
          data.msg.toUpperCase().includes('SUCCESS=FALSE') ||
          data.msg.toUpperCase().includes('SYSTEMEXCEPTION') ||
          data.msg.toUpperCase().includes('OUTOFSTEP') ||
          data.msg.toUpperCase().includes('REVERTED')
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
  let btn = selectedServer.sejong ? (
    <button className='btn'>{'Sejong'}</button>
  ) : (
    <button className='btn'>{'Mainnet'}</button>
  );
  return (
    <div className='App'>
      <div className='server-input'>
        <div className='input-btn'>
          <div className='form'>
            <input
              type='text'
              name='txHash'
              autoComplete='off'
              required
              onChange={(e) => {
                setTx(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  getRes(tx, selectedServer.mainnet);
                }
              }}
            />
            <label className='label-name'>
              <span className='content-name'>TxHash</span>
            </label>
          </div>
          <button
            onClick={(e) => {
              if (tx) {
                getRes(tx, selectedServer.mainnet);
              }
            }}
          >
            Trace
          </button>
        </div>

        <div className='server'>
          <Dropdown toggle={btn}>
            <DropdownMenu>
              <DropdownItem
                onClick={() =>
                  setSelectedServer((res) => {
                    return {
                      sejong: false,
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
                    };
                  })
                }
              >
                Sejong
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
