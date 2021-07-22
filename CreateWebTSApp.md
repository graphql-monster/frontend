# Create React Todo with GraphQL

## 1. Create new project on GraphQL Monster

![alt admin playground](/documentation/create-project.png)

1. Open project page on https://graphql.monster/projects
1. Press create new project

![alt admin playground](/documentation/create-project-schema.png)

1. Select main tab
1. Type name of your new project
1. add schema with your model

```
@create("user")
@update("user")
@remove("user")
@all("user")
type Todo @model {
   title: String!
   completed: Boolean
}
```

This schema says creat `Todo` model with fields `title` and `completed`. Where title is a text and completed have a boolean value. We also specify `create`, `update`, `remove` and query `all` can be done with any logged user. For more info about schema visit the documentation with [schema description](https://www.graphql.monster/documentation/schema-description).

## 2. Create app from template

use `react-create-app` and choice a existing template and create predefined app

```
npx create-react-app my-web-ts-app --template cra-template-graphql-monster-typescript

```

After all done move into created directory created directory

```
cd my-web-ts-app
```

## 3. Connect your web app with graphql.monster

![alt project list](/documentation/project-list.png)

1. Open your project page on https://graphql.monster/projects
2. Copy your project link to clipboard
3. Paste to `.env` file in root of your react application directory as `REACT_APP_HOST`

![alt env file](/documentation/env.png)

## 4. Run the application

And now you can start the application with command `start`

```

npm start
# or
yarn start
```

After the aplication fully start you should reach url http://localhost:3000/ where you can see actual state of your new created app

## 5. Login and register

In connected App already working [login](http://localhost:3000/login) (you can use your graphql.monster account credentials to login as admin) or [register](http://localhost:3000/register) new regular user.

![alt register page](/documentation/register-before.png)

After register you can see some network trafic with obtained `token` and user info like `id` and `role`. As you can see on `Header` whole state of application is changed and user is stored in redux store.
![alt user dashboard page with network](/documentation/register-after.png)

## 6. Create new (Todo) component

### Create component with style

In `src/pages/user/` create directory Toto with these two files `Todo.tsx` and `Todo.css`

```
// Todo.tsx
import React from 'react'
import { useEffect, useState, useCallback } from "react";
import { Button } from 'react-bootstrap';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import './Todo.css'

export function Todo() {
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasks, setTasks] = useState([
        {
            title: "Grab some Pizza",
            completed: true
        },
        {
            title: "Do your workout",
            completed: true
        },
        {
            title: "Hangout with friends",
            completed: false
        }
    ]);
    const [itemForRemove, setItemForRemove] = useState<any | null>(null)

    useEffect(() => {
        setTasksRemaining(tasks.filter(task => !task.completed).length)
    }, [tasks]);

    const addTask = (title: string) => {
        const newTasks = [...tasks, { title, completed: false }];
        setTasks(newTasks);
    };

    const completeTask = (index: number) => {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
    };

    const removeTask = useCallback((index: number) => {
        setItemForRemove({ name: tasks[index].title, index })
    }, [tasks]);

    const doRemoveTask = useCallback(() => {
        if (itemForRemove != null) {
            const newTasks = [...tasks];
            newTasks.splice(itemForRemove.index, 1);
            setTasks(newTasks);
            setItemForRemove(null)
        }
    }, [tasks, itemForRemove]);

    return (
        <div className="todo-container">
            <h1>Tasks</h1>
            <div className="tasks">
                {tasks.map((task, index) => (
                    <Task
                        task={task}
                        index={index}
                        completeTask={completeTask}
                        removeTask={removeTask}
                        key={index}
                    />
                ))}
            </div>
            <div className="create-task" >
                <CreateTask addTask={addTask} />
                <div className="header">Pending tasks ({tasksRemaining})</div>
            </div>

            <DeleteModal
                show={!!itemForRemove}
                deleteObject={itemForRemove}
                modelName={'Todo'}
                onHide={() => setItemForRemove(null)}
                onDelete={doRemoveTask} />
        </div>
    );
}

function CreateTask({ addTask }: any) {
    const [value, setValue] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!value) return;

        addTask(value);
        setValue("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                placeholder="Add a new task"
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}

function Task({ task, index, completeTask, removeTask }: any) {
    return (
        <div
            className="task"
            style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
            <div><Button variant={'danger'} size={'sm'} onClick={() => removeTask(index)}>x</Button></div>
            <div className='title'>{task.title}</div>
            <div className='right'>
                <Button onClick={() => completeTask(index)}>Complete</Button>
            </div>
        </div>
    );
}
```

```
/* Todo.css */

.todo-container {
    width: 50vw;
    margin: 10em auto;
    border-radius: 15px;
    padding: 20px 10px;
}

.task {
    border: 1px solid white;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between
}

.title {
    margin-left: 5px;
    flex-grow: 1;
    font-size: 1.6em;
}

.create-task {
    margin: 2em 3em;
}
.create-task input[type=text] {
    width: 80%;
    padding: 0.7em;
}

.create-task div {
    color: gray;
}

h1 {
    margin: 1em 0em;
}
```

![alt VSC with todo.tsx and todo.css](/documentation/vsc-todo-tsx-todo-css.png)

### Register Todo component in App router (optional)

In `src/App.tsx` add row with `<ProtectedRoute path="/todo"><Todo /></ProtectedRoute>` right bellow `<Switch>` (or somewhere before switch closing tab). Also don't forget to import our Todo component `import { Todo } from "./pages/user/Todo/Todo";`.

![alt VSC with todo.tsx and todo.css](/documentation/vsc-app-tsx-todo-route.png)

Now if you will try access to http://localhost:3000/todo and see this page:

![alt todo](/documentation/todo-page.png)

But this page is now protected, that mean if you will logged out, you can't reach it. In case you want to create a public component instead of use `<ProtectRoute>` use just `<Route>` in this case it will be `<Route path="/todo"><Todo /></Route>`

### Add link for our Todo component (optional)

Open `src/pages/user/UserDashboard.tsx` and add behind H2 tag a link to our Todo component `<Link to={'/todo'}>Todo</Link>` with import `import { Link } from 'react-router-dom';` somewhere on top. The result should look similar to this

![alt scr/pages/userUserDashboard.tsx](/documentation/vsc-user-dashobar-tsx.png)

And now after your user will login or register and register to user dashboard he shoudl see link to Todo. This todo link is active and take us to our component Todo
![alt User Dashboard Page with Todo link](/documentation/browser-user-dashobard.png)

(Keep in mind, for full working the `/todo` have to be a registred in `App.tsx` router, look on previous optional step)

# Connect to GraphQL

## Load tasks from server with GraphQL query

In `scr/pages/user/Todo.tsx` right before Todo start component itself, add const for `ALL_TODO_QUERY` with following content

```
const ALL_TODO_QUERY = gql`{
    allTodo {
        id,
        title,
        completed
    }
  }`
```

Inside Todo component add `useQuery` hook, with handle `onCompleted` to capture loaded data and set to our component state with `setTasks`

```
    const { loading } = useQuery(ALL_TODO_QUERY, {
        onCompleted: (data) => {
            setTasks(data?.allTodo?.map((d: any) => ({ ...d })) || [])
        }
    })
```

Note: we have use `Array.map` because the data from `useQuery` are in readonly (immutable) state and our `completeTask` method (on line 54) change `completed` field on it and that will invoke a exception. In case we will never modified the incoming data `setTasks(data?.allTodo || [])` will be enough.

Also you can remove the initial array for `useState` with `tasks` and `setTasks`, so updated `Todo.tsx` should look like
![alt all task](/documentation/vsc-query-all-task.png)

now in our page all contents dissapear and you should see just the input box

## Add loading info (optional)

After all hooks and before `return` we can add info about data are loading

```
if (loading) return <Loading />
```

## Add task into server with GraphQL mutation

Again in `scr/pages/user/Todo.tsx` right before start Todo component itself, add const for `CREATE_MUTATION` with following content

```
const CREATE_MUTATION = gql`
    mutation CreateTodo($title: String!, $completed:Boolean) {
    createTodo(title: $title, completed: $completed) {
        id
        title,
        completed
    }
}`
```

Inside Todo component add `useMutation` hook with `createTodo` method

```
   const [createTodo, { error: createError }] = useMutation(CREATE_MUTATION)
```

and modify our `addTask` method:

1. mark the method as asynchronous with keyword `async`
2. wait for call `createTodo` mutation with variables of our new task `title` and `completed: false`
3. create new array with old and new

NOTE: we waiting for response of `createTodo` because we want to know `id` of new created Todo. The `id` we will need for updating and removing

```
    const addTask = async (title: string) => {
        const createdData = await createTodo({ variables: { title, completed: false } }) as any
        const newTasks = [...tasks, createdData.createTodo];
        setTasks(newTasks)
    };
```

The code should look like:
![alt create mutation for task](/documentation/vsc-create-mutation.png)

Now if you add some Todos, you should see them even after refresh page.

## Update task in server with GraphQL mutation

Continue in `scr/pages/user/Todo.tsx` right before start Todo component itself , add const for `UPDATE_MUTATION` with following content

```
const UPDATE_MUTATION = gql`
    mutation UpdateTodo($id: ID!, $completed: Boolean) {
    updateTodo(id: $id, completed: $completed) {
        id
        title,
        completed
    }
}`
```

Inside Todo component add `useMutation` hook with `updateTodo` method

```
   const [updateTodo, { error: updateError }] = useMutation(UPDATE_MUTATION)
```

On start (or end) of our method `completeTask` add call `updateTodo`

```
   updateTodo({ variables: { id: tasks[index].id, completed: true } })
```

Now you should be able to see `marked` completed tasks even after refresh page. The code should look like
![alt update mutation for task](/documentation/vsc-update-mutation.png)

## Remove task from server with GraphQL mutation

Continue in `scr/pages/user/Todo.tsx` right before start Todo component itself , add const for `REMOVE_MUTATION` with following content

```
const REMOVE_MUTATION = gql`
    mutation RemoveTodo($id: ID!) {
    removeTodo(id: $id) {
        id
    }
}`
```

Inside Todo component add `useMutation` hook with `removeTodo` method

```
   const [removeTodo, { error: removeError }] = useMutation(REMOVE_MUTATION)
```

On start (or end) of our method `doRemoveTask` add call `removeTodo`

```
   removeTodo({ variables: { id: tasks[itemForRemove.index].id } })
```

we can also update `removeTask` method with `id`

```
   setItemForRemove({ id:  name: tasks[index].id, name: tasks[index].title, index })
```

Now you should not see remove tasks even after refresh page. The code should look like
![alt update mutation for task](/documentation/vsc-update-mutation.png)

## Get logged User and load only user Todos (optional)

We can load only Todo what was created by current (logged) User

### Update imports and selectUser from redux store

On top of our file:

```
import { useSelector } from 'react-redux';
import { selectUser } from '../../../app/reducers/userSlice';
```

In top of Todo compomnent:

```
  const user = useSelector(selectUser) || { id: null }
```

### Update ALL_TODO_QUERY

We need update all todo query to accept filter with user id

```
const ALL_TODO_QUERY = gql`
query allTodo($filter: TodoFilter) {
    allTodo(filter: $filter) {
      id
      title,
      completed
    }
  }`
```

### Pass user to filter

The main part is pass `variables`, with `filter` and `user.id` for `user_every`, but note also the `skip` part what we say if `user.id` is not have a value don't load anything!

```
   const { data, loading } = useQuery(ALL_TODO_QUERY, {
      onCompleted: (data) => {
         setTasks(data?.allTodo?.map((d: any) => ({ ...d })) || [])
      },
      skip: !user.id,
      variables: {
         filter: {
               user_every: { id: user.id },
         },
      }
   })
```

Now if you will register/create new user and you will switching between these accounts, you should not see Todos of one user in another one.

### Update schema to add protection also on server side

Now the filter select the right todos for right user, but if the user will try the GraphQL interface he can skip this condition and see all of Todos accross the users. To add protection also on server side we can say allTodos can be query just with particular filter.

There is kind of special protection tag `{{userId}}` what we saying userId is same as userId in present token.

```
@all(filter:"user_every.id={{userId}}")
```

Token is included authomaticaly (if any user is logged) in each graphql call, particulary in `Authorizaiton` header with tag `Bearer`

We can also protect another calls like update and delete to say only owner can update or delete specified `Todo` so whole graphql.monster schema will looks like:

```
@create("user")
@update("owner")
@remove("owner")
@all(filter:"user_every.id={{userId}}")
type Todo @model {
   title: String!
   completed: Boolean
}
```

# Final Todo.tsx

```
// Todo.tsx
import { useMutation, useQuery } from '@apollo/client';
import { gql } from 'graphql.macro';
import React from 'react'
import { useEffect, useState, useCallback } from "react";
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../app/reducers/userSlice';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import Loading from '../../../components/Loading/Loading';
import './Todo.css'

const ALL_TODO_QUERY = gql`
query allTodo($filter: TodoFilter) {
    allTodo(filter: $filter) {
      id
      title,
      completed
    }
  }`

const CREATE_MUTATION = gql`
    mutation CreateTodo($title: String!, $completed:Boolean) {
    createTodo(title: $title, completed: $completed) {
        id
        title,
        completed
    }
}`

const UPDATE_MUTATION = gql`
    mutation UpdateTodo($id: ID!, $completed: Boolean) {
    updateTodo(id: $id, completed: $completed) {
        id
        title,
        completed
    }
}`

const REMOVE_MUTATION = gql`
    mutation RemoveTodo($id: ID!) {
    removeTodo(id: $id) {
        id
    }
}`

export function Todo() {
    const user = useSelector(selectUser) || { id: null }
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasks, setTasks] = useState([] as any[]);
    const [itemForRemove, setItemForRemove] = useState<any | null>(null)

    const { data, loading } = useQuery(ALL_TODO_QUERY, {
        onCompleted: (data) => {
            setTasks(data?.allTodo?.map((d: any) => ({ ...d })) || [])
        },
        skip: !user.id,
        variables: {
            filter: {
                user_every: { id: user.id },
            },
        }
    })

    const [createTodo, { error: createError }] = useMutation(CREATE_MUTATION)
    const [updateTodo, { error: updateError }] = useMutation(UPDATE_MUTATION)
    const [removeTodo, { error: removeError }] = useMutation(REMOVE_MUTATION)

    useEffect(() => {
        setTasksRemaining(tasks.filter(task => !task.completed).length)
    }, [tasks]);

    const addTask = async (title: string) => {
        const createdData = await createTodo({ variables: { title, completed: false } }) as any
        const newTasks = [...tasks, createdData.createTodo];
        setTasks(newTasks)
    };

    const completeTask = (index: number) => {
        updateTodo({ variables: { id: tasks[index].id, completed: true } })
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
    };

    const removeTask = useCallback((index: number) => {
        setItemForRemove({ id: tasks[index].id, name: tasks[index].title, index })
    }, [tasks]);

    const doRemoveTask = useCallback(() => {
        if (itemForRemove != null) {
            const newTasks = [...tasks];
            newTasks.splice(itemForRemove.index, 1);
            setTasks(newTasks);
            setItemForRemove(null)
            removeTodo({ variables: { id: tasks[itemForRemove.index].id } })
        }
    }, [tasks, itemForRemove]);

    if (loading) return <Loading />

    return (
        <div className="todo-container">
            <h1>Tasks</h1>
            <div className="tasks">
                {tasks.map((task, index) => (
                    <Task
                        task={task}
                        index={index}
                        completeTask={completeTask}
                        removeTask={removeTask}
                        key={index}
                    />
                ))}
            </div>
            <div className="create-task" >
                <CreateTask addTask={addTask} />
                <div className="header">Pending tasks ({tasksRemaining})</div>
            </div>

            <DeleteModal
                show={!!itemForRemove}
                deleteObject={itemForRemove}
                modelName={'Todo'}
                onHide={() => setItemForRemove(null)}
                onDelete={doRemoveTask} />
        </div>
    );
}

function CreateTask({ addTask }: any) {
    const [value, setValue] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!value) return;

        addTask(value);
        setValue("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                placeholder="Add a new task"
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}

function Task({ task, index, completeTask, removeTask }: any) {
    return (
        <div
            className="task"
            style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
            <div><Button variant={'danger'} size={'sm'} onClick={() => removeTask(index)}>x</Button></div>
            <div className='title'>{task.title}</div>
            <div className='right'>
                <Button onClick={() => completeTask(index)}>Complete</Button>
            </div>
        </div>
    );
}

```
