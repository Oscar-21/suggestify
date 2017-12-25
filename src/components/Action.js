import React from 'react';

const Action = props => 
  <div>
    <a href='http://localhost:8888/api/login'>
      <button
        className="big-button"
        // onClick={props.handlePick}
        // onClick={props.click}
        // disabled={!props.hasOptions}
        // disabled={true}
      >
        Login&nbsp;&nbsp;/&nbsp;&nbsp;Sign up
      </button>
    </a>
  </div>
export default Action;
