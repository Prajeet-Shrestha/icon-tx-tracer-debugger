import React, { useState, useEffect } from 'react';
// import './toggle.scss';
function Logs({ logs, logs_error }) {
  const [viewLog, setViewLog] = useState(logs);

  const [showOnlyError, setShowOnlyError] = useState(false);
  useEffect(() => {
    if (showOnlyError) {
      setViewLog(logs_error);
    } else {
      setViewLog(logs);
    }
  }, [showOnlyError]);
  useEffect(() => {
    if (showOnlyError) {
      setViewLog(logs_error);
    } else {
      setViewLog(logs);
    }
  }, [logs, logs_error]);
  return (
    <div className='log_block'>
      <h2>
        ICON Trace Log
        {logs ? (
          <div>
            <input
              type='checkbox'
              onChange={(e) => {
                setShowOnlyError(e.target.checked);
              }}
              id='cb-toggle'
            />
            <label className={`label`}>Show only errors</label>
          </div>
        ) : null}
      </h2>
      <ol className='activity-feed'>
        {viewLog?.map(({ level, msg, ts }, index) => {
          let color = '#dadada';
          let dotBackground = 'rgb(113, 211, 0)';
          if (
            msg.toUpperCase().includes('ERROR') ||
            msg.toUpperCase().includes('FAILURE') ||
            msg.toUpperCase().includes('INVALID') ||
            msg.toUpperCase().includes('SUCCESS=FALSE') ||
            msg.toUpperCase().includes('SYSTEMEXCEPTION') ||
            msg.toUpperCase().includes('OUTOFSTEP') ||
            msg.toUpperCase().includes('REVERTED')
          ) {
            color = '#CE2F2F';
            dotBackground = '#CE2F2F';
          }
          return (
            <li className={`feed-item time-${ts}`} key={index}>
              <time className={`date`}>
                time - {ts} | level - {level}
              </time>
              <span className='text' style={{ color: color }}>
                {msg}
              </span>
              <div className='dot' style={{ background: dotBackground }}></div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Logs;
