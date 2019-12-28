import React from "react";

export default function Section({ title, content, id }) {
  return (
    <div className="section" id={id}>
      <div className="section-outer">
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </div>
  );
}
