import React from "react";
import Posts from "../postRelated/Posts";
import Stories from "../../storiesRelated/Stories";
import Header from "../../header/Header.js";

export default function Feed() {
  return (
    <div>
      
      <section>
        {/* User Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>
    </div>
  );
}
