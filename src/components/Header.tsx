import React from "react";
import { UserIcon } from "../assets/icons/user";
import { SearchIcon } from "../assets/icons/search";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="w-full min-h-[64px] border-b border-gray-100 flex items-center relative">
      <SearchIcon className="text-[22px] text-gray-300 absolute left-0 top-1/2 -translate-y-1/2 ml-2.5" />
      <input
        type="text"
        placeholder="Search"
        className="h-full w-full px-10 outline-none text-lg placeholder:text-gray-300"
      />
      <div className="px-4">
        <UserIcon className="text-2xl" />
      </div>
    </div>
  );
};

export default Header;
