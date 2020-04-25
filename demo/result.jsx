import React from "react"
const b = 'c';

const a = () => {
  return <div style={{
    display: b ? "none" : 'flex'
  }}>
        this is div
        {b ? <span>
          this is span
        </span> : null}
      </div>;
};