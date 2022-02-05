import React from "react";

function Loader(props) {
  return (
    <div class="progress" style={{ marginTop: "25%" }}>
      <div class="indeterminate"></div>
    </div>
  );
}

export default Loader;
