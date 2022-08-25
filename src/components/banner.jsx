import React from "react";
import Banner from "react-banner";
import "react-banner/dist/style.css";

export default (props) => {
        return (
            <Banner
            logo = "My Logo"
            url={window.location.pathname}
            items={[
                {content: "Stats", url: "/Stats"},
                {content: "Another", url: "/another"},
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
