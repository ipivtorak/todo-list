import React from 'react';
import TodoForm from "./ToDoForm";
import Todo from "./Todo";

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
                <div>
                    <button onClick={() => this.updateTodoToShow('all')}>all</button>
                    <button onClick={() => this.updateTodoToShow('active')}>active</button>
                    <button onClick={() => this.updateTodoToShow('complete')}>complete</button>
                </div>
                {this.state.todos.some(todo => todo.complete)
                    ? <div>
                        <button onClick={this.removeAllCompleteTodos}>remove all complete todos</button>
                    </div>
                    : null}
                {this.state.todos.length ? <div>
                    <button onClick={() =>
                        this.setState({
                            todos: this.state.todos.map(todo => ({
                                ...todo,
                                complete: this.state.toggleAllComplete
                            })),
                            toggleAllComplete: !this.state.toggleAllComplete
                        })
                    }>
                        {this.state.toggleAllComplete ? 'complete all tasks' : 'open all tasks'}
                    </button>
                </div> : null}
            </div>
        );
    }
}