import React from "react";
import Posts from "./Posts";
import Stories from "./Stories";

export default function Feed() {
  return (
    <div>
      <section>
        {/* User Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>
      <section>
        {/* User Stories */}
        {/* Posts */}
      </section>
    </div>
  );
}
