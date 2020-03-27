import React from 'react';
import TodoForm from "./ToDoForm";
import Todo from "./Todo";
import {Button, ButtonGroup} from "react-bootstrap";

export default class TodoList extends React.Component {

    state = {
        todos: [],
        todosToShow: 'all',
        toggleAllComplete: true
    };

    addTodo = (todo) => {
        this.setState({
            todos: [todo, ...this.state.todos]
        })
    }

    toggleComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        complete: !todo.complete
                    }
                } else {
                    return todo;
                }
            })
        })
    };

    updateTodoToShow = (s) => {
        this.setState({
            todosToShow: s
        })
    };

    handleDeleteTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    };

    removeAllCompleteTodos = () => {
        this.setState({
            todos: this.state.todos.filter(todo => !todo.complete)
        })
    };

    render() {
        let todos = [];

        if (this.state.todosToShow === 'all') {
            todos = this.state.todos;
        } else if (this.state.todosToShow === 'active') {
            todos = this.state.todos.filter(todo => !todo.complete);
        } else if (this.state.todosToShow === 'complete') {
            todos = this.state.todos.filter(todo => todo.complete);
        }

        return (
            <div>
                <h2>Todo list</h2>
                <TodoForm onSubmit={this.addTodo}/>
                {todos.map(todo => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        toggleComplete={() => this.toggleComplete(todo.id)}
                        deleteTodo={() => this.handleDeleteTodo(todo.id)}
                    />
                ))}
                <div>todos left: {this.state.todos.filter(todo => !todo.complete).length} </div>
                <ButtonGroup>
                    <Button variant={this.state.todosToShow === 'all' ? 'primary' : 'secondary'}
                            onClick={() => this.updateTodoToShow('all')}>show all</Button>
                    <Button variant={this.state.todosToShow === 'active' ? 'primary' : 'secondary'}
                            onClick={() => this.updateTodoToShow('active')}>active</Button>
                    <Button variant={this.state.todosToShow === 'complete' ? 'primary' : 'secondary'}
                            onClick={() => this.updateTodoToShow('complete')}>completed</Button>
                </ButtonGroup>
                {this.state.todos.some(todo => todo.complete)
                    ? <div>
                        <Button variant="secondary"
                                onClick={this.removeAllCompleteTodos}>remove all complete todos</Button>
                    </div>
                    : null}
                {this.state.todos.length
                    ? <div>
                        <Button variant="secondary" style={{margin:3}} onClick={() =>
                            this.setState({
                                todos: this.state.todos.map(todo => ({
                                    ...todo,
                                    complete: this.state.toggleAllComplete
                                })),
                                toggleAllComplete: !this.state.toggleAllComplete
                            })
                        }>
                            {this.state.toggleAllComplete ? 'complete all tasks' : 'open all tasks'}
                        </Button>
                    </div>
                    : null}
            </div>
        );
    }
}