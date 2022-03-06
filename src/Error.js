import React from 'react';
import './error.scss';

function Error() {
  return (
    <div>
      <p class='text'>
        Oops..
        <br />
        something went wrong
      </p>
      <div class='container'>
        <div class='bg'>
          <div class='light'></div>
        </div>
        <div class='ufo'>
          <div class='ufo-bottom'></div>
          <div class='ufo-top'></div>
          <div class='ufo-glass'>
            <div class='alien'>
              <div class='alien-eye'></div>
            </div>
          </div>
        </div>
        <div class='bed'>
          <div class='mattress'></div>
        </div>
        <div class='man'>
          {/* <div class='foot'></div> */}
          {/* <div class='head'>
            <div class='face'></div>
            <div class='hair'></div>
          </div> */}
          <div class='man-body'></div>
          {/* <div class='arm'></div> */}
        </div>
      </div>
      <a href='https://codepen.io/SofiaSergio/' target='_blank'>
        <div id='link'>
          <i class='fab fa-codepen'></i>
          <p>Credits</p>
        </div>
      </a>
    </div>
  );
}

export default Error;
