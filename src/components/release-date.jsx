import React from "react";

function ReleaseDate(props) {
  let data = props.props;
  let year = data?.slice(0,4);
  let month = data?.slice(5,7) - 1;
  let day = data?.slice(8,10);
  const monthsArr = [ 
    "January", "Feburary", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"
  ]
  let releasedMonth = monthsArr[month];
  return (
    <>
      <h1>{releasedMonth} {day}, {year}</h1>
    </>
  )
}

export default ReleaseDate;