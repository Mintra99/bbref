import React from "react";
import Banner from "react-banner";
import "react-banner/dist/style.css";

function Nav() {
        return (
            <Banner
            logo = "My Logo"
            url={window.location.pathname}
            items={[
                {content: "Stats", url: "/stats"},
                {content: "About", url: "/about"},
                {content: "Shop", url: "/shop"},
                {content: "Link with children", 
                url: "/children", 
                children: [
                    {content: "child1", url:"/children/child1"},
                    {content: "child2", url:"/children/child2"},
                    {content: "child3", url:"/children/child3"}
                ]}
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