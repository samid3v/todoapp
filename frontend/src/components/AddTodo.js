import React, { useState } from "react";
import TodoDataService from "../services/Todos";
import { Link, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const AddTodo = (props) => {
  let editing = false;
  let initialTodoTitle = "";
  let initialTodoMemo = "";

  const location = useLocation();
  const todo = location.state

  if (location.state) {
    editing = true;
    initialTodoTitle = todo.title;
    initialTodoMemo = todo.memo;
    console.log(todo)
  }

  const [title, setTitle] = useState(initialTodoTitle);
  const [memo, setMemo] = useState(initialTodoMemo);
  // keeps track if todo is submitted
  const [submitted, setSubmitted] = useState(false);

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const onChangeMemo = (e) => {
    const memo = e.target.value;
    setMemo(memo);
  };

  const saveTodo = () => {
    var data = {
      title: title,
      memo: memo,
      completed: false,
    };

    if (editing) {
      TodoDataService.updateTodo(
        todo.id,
        data,
        props.token
      )
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      TodoDataService.createTodo(data, props.token)
        .then((response) => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Container>
      {submitted ? (
        <div>
          <h4>Todo submitted successfully</h4>
          <Link to={"/todos/"}>Back to Todos</Link>
        </div>
      ) : (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>{editing ? "Edit" : "Create"} Todo</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="e.g. buy gift tomorrow"
              value={title}
              onChange={onChangeTitle}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={memo}
              onChange={onChangeMemo}
            />
          </Form.Group>
          <Button variant="info" onClick={saveTodo}>
            {editing ? "Edit" : "Add"} To-do
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default AddTodo;
