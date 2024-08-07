// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(init = '') {
  const [name, setName] = React.useState(() =>  window.localStorage.getItem('name') ?? init);

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name]);

  return [name, setName];
}

// extra 4
function useLocalStorageStateFlex(key, init = '') {
  const [flexString, setFlexString] = React.useState(() => window.localStorage.getItem(key) ?? JSON.stringify(init));

  React.useEffect(() => {
    window.localStorage.setItem(key, flexString)
  }, [flexString]);

  const setFlex = (value) => {
    setFlexString(JSON.stringify(value))
  }

  return [flexString, setFlex];
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName

  // extra 1 + 2 
  // const [name, setName] = React.useState(() =>  window.localStorage.getItem('name') ?? initialName)
  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  // extra 3
  const [name, setName] = useLocalStorageState(initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
