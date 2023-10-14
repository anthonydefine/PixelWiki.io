import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "flowbite-react";

function SearchItem(props) {
  const { background_image, name, id } = props;
  return (
    <>
      <Link key={id} to={name.toLowerCase()}>
        <div className="flex items-center">
          <Avatar size='lg' rounded img={background_image} />
          <h2 className="text-2xl font-bold tracking-wider ml-6">
            {name}
          </h2>
        </div>
      </Link>
    </>
  )
};

export default SearchItem;