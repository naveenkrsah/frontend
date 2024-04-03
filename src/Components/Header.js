import React, { useState, useContext, useEffect } from "react";
import UserState from "../Context/Users/UserContext";
import UserItem from "./UserItem";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import User from "./User";
import { Link } from "react-router-dom";

const Header = (props) => {
  const context = useContext(UserState);
  const { queries, searchByName } = context;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const usersPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (query) => {
    const response = await searchByName(query);
    setFilteredUsers(response);
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };
  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = queries.slice(startIndex, endIndex);

  return (
    <div className="">
      <div className="container ">
        <div className="ui massive secondary menu">
          <Link to="/">
            <button className="bg-black text-white ui small button mt-3">Home</button>
          </Link>
          <Link to="/Teams">
            <button className="bg-black text-white ui small button mt-3">Create Team</button>
          </Link>

          <Link to="/AllTeam">
            <button className="bg-black text-white ui small button mt-3">View Team</button>
          </Link>
          <div className="right menu">
            <div className="item">
              <div className="border-black ui icon input">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <i className="search link icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {searchQuery ? (
        <div className="container my-5">
          <div className="container">
            <div className="d-flex justify-content-between">
              <h1>Result</h1>
            </div>
          </div>
          <div className="row">
            {currentUsers.map((user) => (
              <div className="col-md-3" key={user.id}>
                <UserItem user={user} />
              </div>
            ))}
          </div>
          <Stack
            spacing={3}
            direction="row"
            justifyContent="center"
            sx={{ marginTop: "20px" }}
          >
            <Pagination
              count={Math.ceil(queries.length / usersPerPage)}
              size="large"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </div>
      ) : (
        <User />
      )}
    </div>
  );
};

export default Header;
