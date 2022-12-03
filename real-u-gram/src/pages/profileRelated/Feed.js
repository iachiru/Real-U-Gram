import React from "react";
import Posts from "../postRelated/Posts";
import Stories from "../../storiesRelated/Stories";

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
