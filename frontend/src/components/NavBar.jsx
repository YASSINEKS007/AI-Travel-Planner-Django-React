import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setLogout } from "../store/state";

const NavBar = () => {
  const theme = useTheme();
  const main = theme.palette.primary.main;
  const background = theme.palette.background.default;

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const links = [
    { id: 0, label: "Home", to: "/home" },
    { id: 1, label: "Your Recommendations", to: "/recommendations" },
    { id: 2, label: "Profile", to: "/profile" },
  ];

  const logout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center">
      <nav
        className="flex items-center justify-center w-[85%] h-12 mt-3 rounded-full shadow-md"
        style={{ backgroundColor: background }}
      >
        <div className="flex flex-1 justify-around m-2">
          {links.map((link) => (
            <NavLink
              to={link.to}
              key={link.id}
              className="flex-1 text-center transition-colors rounded-full p-2"
              style={({ isActive }) => ({
                backgroundColor: isActive
                  ? theme.palette.primary.main
                  : hoveredIndex === link.id
                  ? theme.palette.primary.main
                  : "transparent",
                color: theme.palette.text.primary,
                fontWeight: isActive ? "bold" : "normal",
              })}
              onMouseEnter={() => setHoveredIndex(link.id)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            className="flex-1 text-center transition-colors rounded-full p-2"
            style={{
              backgroundColor: hoveredIndex === 3 ? main : "transparent",
              color: theme.palette.hover.primary,
            }}
            onMouseEnter={() => setHoveredIndex(3)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
