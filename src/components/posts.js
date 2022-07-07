import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import axios from "axios";

import { Container, Header, Icon, Label, List } from "semantic-ui-react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState(0);

  const getPosts = async () => {
    axios
      .get("https://workers.fatihtopcu97.workers.dev/posts")
      .then((response) => {
        const arr = response.data;

        setPosts(arr);
      });
  };
  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    let sorted = [...posts];
    if (sort === 1) {
      sorted.sort((a, b) => {
        if (a.rating > b.rating) {
          return 1;
        } else {
          return -1;
        }
      });
      setPosts(sorted);
    } else if (sort === -1) {
      sorted.sort((a, b) => {
        if (a.rating > b.rating) {
          return -1;
        } else {
          return 1;
        }
      });
      setPosts(sorted);
    } else {
      getPosts();
    }
  }, [sort]);

  return (
    <div>
      <Container style={{ marginTop: "2rem" }}>
        <Header as="h2" icon textAlign="center">
          <Header.Content as="h2">Posts</Header.Content>
          <Header.Content as="h5">I intentionally disabled new Post and new Comment functionalities.</Header.Content>
          <Icon name="newspaper outline" circular />
        </Header>
        <Link to={`/add`}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              display: "inline-block",
            }}
          >
            Add New Post <Icon name="add circle" size="big" />
          </div>
        </Link>
        <Label
          style={{ cursor: "pointer", float: "right" }}
          as="h3"
          icon
          textAlign="center"
          onClick={() => {
            if (sort === 0) {
              setSort(1);
            } else if (sort === 1) {
              setSort(-1);
            } else {
              setSort(0);
            }
          }}
        >
          {sort === 1 && <Icon name="chevron down" />}
          {sort === -1 && <Icon name="chevron up" />}
          Rating
        </Label>

        <br />
        <br />

        <List celled animated divided size="big">
          {posts &&
            posts.map((post) => (
              <List.Item>
                <List.Content>
                  <List.Content floated="right">
                    <List.Header>{post.rating}</List.Header>
                  </List.Content>
                  <Link to={`/posts/${post.id}`}>
                    <List.Header>
                      <Icon name="chevron right" size="big" />
                      {post.title}
                    </List.Header>
                  </Link>
                  <p style={{ marginLeft: "1rem" }}>
                    <Icon name="user" size="small" /> {post.username}{" "}
                    &nbsp;&nbsp;&nbsp;
                    <Icon name="calendar" size="small" />
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </List.Content>
              </List.Item>
            ))}
        </List>
      </Container>
    </div>
  );
};

export default Posts;
