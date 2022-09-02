import React from "react";
import Banner from "react-banner";
import "react-banner/dist/style.css";

function Nav() {
  return (
    <Banner
      logo="My Logo"
      url={window.location.pathname}
      items={[
        { content: "About", url: "/about" },
        { content: "Shop", url: "/shop" },
        {
          content: "Stats",
          url: "/stats",
          children: [
            { content: "teams", url: "/stats/teams" },
            { content: "players", url: "/stats/players" },
          ],
        },
      ]}
    />
  );
}

export default Nav;

// ------------------------ Old code ------------------------
// import { Link } from "react-router-dom";
// function Nav() {
//   return (
//     <nav>
//       <h3>Logo</h3>
//       <ul className="nav-links">
//         <Link to="/">
//           <li>Home</li>
//         </Link>
//         <Link to="/about">
//           <li>About</li>
//         </Link>
//         <Link to="/shop">
//           <li>Shop</li>
//         </Link>
//       </ul>
//     </nav>
//   );
// }

// export default Nav;
