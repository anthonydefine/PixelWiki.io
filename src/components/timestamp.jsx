import React from "react";

function TimeStamp(props) {
  const { timestamp } = props;

  if (!timestamp) {
    return <></>;
  }

  const dateObject = timestamp.toDate();
  
  const formattedDate = dateObject.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {formattedDate}
    </>
  );
}

export default TimeStamp;