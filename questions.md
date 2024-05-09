# Questions

## 1. What is the difference between Component and PureComponent?
## Give an example where it might break my app.

Component does not implement `shouldComponentUpdate`, which means the component always re-renders when state or props change, even if the state and props are the same. On the other hand a PureComponent does a shallow comparison and only re-renders if there is a difference.


## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

Context acts as a global state for a tree of components, such as themes, setting, etc. If a component that consumes that context implements `shouldComponentUpdate` and returns `false`, it can miss updates if only the context data changes, which can result in outdated data being displayed.


## 3. Describe 3 ways to pass information from a component to its PARENT.

- Using callbacks, passing functions from the parent to the child component, which the child can invoke to communicate back.
- With Context API or a global state like redux.
- Moving the state managment to the parent and allowing child components to update the state through passed functions.


## 4. Give 2 ways to prevent components from re-rendering.

- We can use React.memo for functional components, it memoizes the component based on props.
- Using useMemo hook, which allows us to memoize expensive calculations so they are not recalculated every render unless certain dependencies change.


## 5. What is a fragment and why do we need it? Give an example where it might break my app.

It allows us to add multiple elements to a React component without the need of wrapping them in an extra DOM node, like a `<div>`. It is beneficial because we can only return one root element in a component.


## 6. Give 3 examples of the HOC pattern.

They are functions that take a component and return a new enhanced component, adding it data or functionality.
- React.memo() (available in functional components)
- connect() (it allows us to connect our components to a redux store)
- withTheme() (it could be a custom HOC to allow us to wrap our components with a theme)


## 7. What's the difference in handling exceptions in promises, callbacks and async...await?

- With `promises` the error is handled using the `.catch()` method, if the promises is rejected.
- Using `callbacks`, the first parameter is reserved for an error object.
- In `Async/Await` we use `try/catch` blocks to handle exceptions.


## 8. How many arguments does setState take and why is it async.

`setState` takes up to 2 parameters, the new state and a callback function that is executed when the state has been updated.

It is async in order to improve performance. It groups multiples state updates into on batch, reducing the number of times components need to be re-rendered.


## 9. List the steps needed to migrate a Class to Function Component.

- In order to migrate a Class to a function component your need to have at least the React version 16 installed.
- Remove the reserved word `class` and replace it with a function. `const MyComponent = () => {}` or `function MyComponent() {}`
- Remove the `render` method and use `return`.
- Replace `state` with `useState` hook.
- Convert lifecycle methods such as `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` to `useEffect` hook.
- Use the hook `useCallback` for event handlers.
- Replace `Context.Consumer` with `useContext` hook.


## 10.List a few ways styles can be used with components.

- Inline CSS styles `<CustomComponent style={{ color: red; background: #000000 }} />`
- Using a traditional CSS stylesheet, in this way is useful to use a CSS pre-processor like SASS. `Import ‘@styles/styles.scss’` `<CustomComponent className=“myStyle” />`.
- CSS Modules is similar to the previous one, but the implementation is slightly different `import styles from ‘@styles/Button.module.scss’` `<CustomComponent className=“styles.button” />`.
- Styled Components `<StyledComponent primary={primary} />`
- Tailwind CSS `<CustomComponent className=“bg-blue-500 text-white flex” />`.


## 11. How to render an HTML string coming from the server.

Using the `dangerouslySetInnerHTML` prop. However, it can be unsafe.
