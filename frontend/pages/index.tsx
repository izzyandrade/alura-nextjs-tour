import { useState } from "react";
import { useRouter } from "next/router";

export default function AuthScreen() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("papai")
    router.push("/home")
  }

  return (
    <div>
      <h1>Login Page</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input
          placeholder="Username" name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label>Password: </label>
        <input
          placeholder="Password" name="password" type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div>
          <button type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}