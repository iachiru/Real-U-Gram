import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { useEffect } from "react";
import Story from "./Story";
import "./Stories.css";

export default function Stories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    setStories(
      [...Array(5)].map((profile) => ({
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
      }))
    );
  }, []);

  console.log(stories);

  return (
    <div className="stories">
      {stories.map((profile) => (
        <Story
          key={profile.userID}
          username={profile.username}
          avatar={profile.avatar}
        />
      ))}
    </div>
  );
}
