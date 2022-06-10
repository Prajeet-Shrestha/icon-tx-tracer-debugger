import React from "react";
import "./error.scss";

function Error() {
  return (
    <div>
      <p class="text">
        Oops..
        <br />
        something went wrong
      </p>
      <div class="container">
        <div class="bg">
          <div class="light"></div>
        </div>
        <div class="ufo">
          <div class="ufo-bottom"></div>
          <div class="ufo-top"></div>
          <div class="ufo-glass">
            <div class="alien">
              <div class="alien-eye"></div>
            </div>
          </div>
        </div>
        <div class="bed">
          <div class="mattress"></div>
        </div>
        <div class="man">
          <div class="man-body"></div>
        </div>
      </div>
    </div>
  );
}

export default Error;
