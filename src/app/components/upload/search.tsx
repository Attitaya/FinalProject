import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";

function SearchBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    return (
        <div className="flex items-center">
            <div className="relative">
                <input
                type="text"
                placeholder="search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded pr-20 pl-2 py-2 font-bold"
                />
            <button
                onClick={handleSearch}
                className="absolute inset-y-0 right-0 px-3 flex items-center justify-center bg-gray-200 rounded-r"
            >
                <CgSearch />
            </button>
            </div>
        </div>
    );
}

export default SearchBar;
