import React from "react";
import {Button} from "react-bootstrap";

export default (props) => (
    <div className="todo" style={{alignItems: 'center'}}>
        <div
            style={{
                textDecoration: props.todo.complete ? 'line-through' : 'none',
            }}
            onClick={props.toggleComplete}>{props.todo.text}
        </div>
        <Button variant="danger"
                onClick={props.deleteTodo}
                style={{
                    transform: 'rotate(45deg)',
                    width: 20,
                    height: 20,
                    fontSize: 20,
                    padding: 0,
                    textAlign: 'center',
                    lineHeight: 0,
                    borderRadius: '50%',
                    paddingBottom: 4,
                    marginLeft: 5
                }}
        >+</Button>
    </div>

);