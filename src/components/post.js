import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import axios from "axios";

import {
  Container,
  Header,
  Image,
  Icon,
  Form,
  Comment,
  Button,
  Input,
  TextArea,
} from "semantic-ui-react";

const Post = ({ id }) => {
  const [post, setPost] = useState({});
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);

  const handleSubmit = () => {
    if (username.length > 1 && content.length > 1) {
      setDisableButtons(true);
      let commentData = {
        id: id,
        username: username,
        content: content,
      };

      const headers = {
        "Content-type": "application/json",
      };

      axios
        .post("https://workers.fatihtopcu97.workers.dev/comment", commentData, {
          headers,
        })
        .then(() => {
          setUsername("");
          setContent("");
          window.location.reload();
        });
    }
  };

  const getPost = async () => {
    axios
      .get(`https://workers.fatihtopcu97.workers.dev/posts/${id}`)
      .then((response) => {
        const post = response.data;

        setPost(post);
      });
  };

  const ratingButton = async (like) => {
    setDisableButtons(true);
    const rating = { rating: like, id: id };

    const headers = {
      "Content-type": "application/json",
    };

    axios
      .post("https://workers.fatihtopcu97.workers.dev/rating", rating, {
        headers,
      })
      .then(() => {
        window.location.reload();
      });
  };

  const handleChange = (e, { name, value }) => {
    if (name === "content") {
      setContent(value);
    }

    if (name === "username") {
      setUsername(value);
    }
  };

  useEffect(() => {
    getPost();
  }, [id]);

  if (!Object.keys(post).length) return <div />;

  return (
    <>
      <Container style={{ marginTop: "4rem", paddingBottom: "8rem" }}>
        <Link to="/">
          <Icon name="chevron left" size="large" />
          Go back
        </Link>
        <Header as="h1">{post.title}</Header>
        <p>
          <Icon name="user" size="small" /> {post.username} &nbsp;&nbsp;&nbsp;
          <Icon name="calendar" size="small" />
          {new Date(post.date).toLocaleDateString()}
        </p>
        {post.imageSrc && post.imageSrc !== "" && (
          <Image src={post.imageSrc} size="big" />
        )}
        <br />
        <p style={{ fontSize: "18px" }}>{post.content}</p>

        <br />

        <p style={{ float: "right", marginRight: "12rem" }}>
          <span
            style={{
              fontSize: "20px",
              marginRight: "1.5rem",
              marginLeft: "1rem",
            }}
          >
            Rating
          </span>
          <Icon
            onClick={(e) => {
              ratingButton(-1);
            }}
            disabled={disableButtons}
            className="likeButton likeButton-red"
            name="thumbs down outline"
            size="big"
          />
          <span
            style={{
              fontSize: "20px",
              marginRight: "1.5rem",
              marginLeft: "1rem",
            }}
          >
            {post.rating}
          </span>
          <Icon
            onClick={() => {
              ratingButton(+1);
            }}
            disabled={disableButtons}
            className="likeButton likeButton-blue"
            name="thumbs up outline"
            size="big"
          />
        </p>

        <br />
        <br />

        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>

          {post.comments.map((comment) => (
            <Comment>
              <Comment.Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Font_Awesome_5_solid_user-circle.svg/1200px-Font_Awesome_5_solid_user-circle.svg.png" />
              <Comment.Content>
                <Comment.Author as="a">User: {comment.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{new Date(comment.date).toLocaleDateString()}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.content}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}

          <Form onSubmit={handleSubmit}>
            <Form.Field
              control={TextArea}
              label="Your Comment"
              name="content"
              placeholder="Your comment..."
              value={content}
              onChange={handleChange}
            />

            <Form.Field
              inline
              control={Input}
              label="User name"
              placeholder="User name"
              name="username"
              value={username}
              onChange={handleChange}
            />
            <Form.Field
              style={{ float: "right" }}
              control={Button}
              disabled={disableButtons}
            >
              Add comment
            </Form.Field>
          </Form>
        </Comment.Group>
      </Container>
    </>
  );
};

export default Post;
