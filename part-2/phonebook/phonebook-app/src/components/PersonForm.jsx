import React from "react";

function PersonForm({ submit, value1, value2, keychange1, keychange2 }) {
  return (
    <form onSubmit={submit}>
      <div>
        name: <input value={value1} onChange={keychange1} />
      </div>

      <br />

      <div>
        number: <input value={value2} onChange={keychange2} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;
