import React from "react";
import { Button } from "flowbite-react";

function UserLibraryTable(props) {
  let genreArr = props.genres;

  return (
    <>
      <div className="flex justify-between">
        <span>
          <p>
            {props.name}
          </p>
          <p className="flex">
            {genreArr.slice(0, 3).map((item) => {
              return (
                <Button className='truncate' pill color='dark' size='xs'>{item.name}</Button>
              )
            })}
          </p>
        </span>
        <span>
          <p>Date Added</p>
          <p>insert date added</p>
        </span>
        <span>

        </span>
      </div>
    </>
  )
};

export default UserLibraryTable;