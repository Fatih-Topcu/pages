import React from "react";
import { Link } from "@reach/router";

import {
  Container,
  Header,
  Icon,
  Form,
  Button,
  Input,
  TextArea,
  Modal,
} from "semantic-ui-react";
import axios from "axios";

class Add extends React.Component {
  state = {
    title: "",
    content: "",
    username: "",
    imageSrc: "",
    open: false,
    submitted: false,
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async () => {
    const { title, content, username, imageSrc } = this.state;

    const headers = {
      "Content-type": "application/json",
    };

    if (title.length > 1 && content.length > 1 && username.length > 1) {
      const postData = {
        title: title,
        content: content,
        username: username,
        imageSrc: imageSrc.length > 0 ? imageSrc : "",
      };

      axios.post("https://workers.fatihtopcu97.workers.dev/add", postData, {
        headers,
      });

      this.setSubmitted(true);
    } else {
      this.setOpen(true);
    }
  };

  setOpen(input) {
    this.setState({ "open": input });
  }

  setSubmitted(input) {
    this.setState({ "submitted": input });
  }

  render() {
    const { title, content, username, imageSrc } = this.state;
    return (
      <>
        <Modal
          basic
          onClose={() => this.setOpen(false)}
          onOpen={() => this.setOpen(true)}
          open={this.state.open}
          size="small"
        >
          <Header icon>
            <Icon name="exclamation triangle" />
            Please enter all inputs
          </Header>

          <Modal.Actions>
            <Button color="green" inverted onClick={() => this.setOpen(false)}>
              <Icon name="checkmark" /> Okay
            </Button>
          </Modal.Actions>
        </Modal>

        <Modal
          basic
          onClose={() => this.setSubmitted(false)}
          onOpen={() => this.setSubmitted(true)}
          open={this.state.submitted}
          closeOnDimmerClick={false}
          closeOnEscape={false}
          size="small"
        >
          <Header icon>
            <Icon name="check circle" />
            Post submitted
          </Header>

          <Modal.Actions>
            <Link to={`/`}>
              <Button color="green" inverted>
                <Icon name="checkmark" /> Okay
              </Button>
            </Link>
          </Modal.Actions>
        </Modal>

        <Container style={{ marginTop: "2rem" }}>
          <Link to="/">
            <Icon name="chevron left" size="large" />
            Go back
          </Link>
          <Header as="h2" icon textAlign="center">
            <Icon name="plus circle" color="blue" />
            <Header.Content>Add New Post</Header.Content>
          </Header>

          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Title"
                placeholder="Title"
                name="title"
                value={title}
                onChange={this.handleChange}
              />

              <Form.Field
                control={Input}
                label="User name"
                placeholder="User name"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Field
              control={TextArea}
              label="Content"
              name="content"
              placeholder="Content of your post..."
              value={content}
              onChange={this.handleChange}
            />

            <Form.Field
              control={Input}
              label="Image Source (Optional)"
              name="imageSrc"
              placeholder="Enter image source for your post (Direct Link)"
              value={imageSrc}
              onChange={this.handleChange}
            />
            <Form.Field control={Button}>Add post</Form.Field>
          </Form>
        </Container>
      </>
    );
  }
}

export default Add;
