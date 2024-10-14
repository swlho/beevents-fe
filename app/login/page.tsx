import BackButton from "@/components/navigation/BackButton"
import { Metadata } from "next"
import { login, signup } from './actions'
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    description: "Beevents - Login",
  }
  
  export default async function LoginPage() {
  
    return (
      <>
      <BackButton path={"javascript:history.go(-1)"} />
      <h1 className="mb-4 font-medium">Login to your account or sign up</h1>
      <form className="flex flex-col">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" className="outline-yellow-500" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" className="outline-yellow-500" required />
        <Button className="bg-yellow-400 rounded-2xl mt-3 mb-3 hover:bg-yellow-200" formAction={login}>Log in</Button>
        <Button className="bg-yellow-400 rounded-2xl" formAction={signup}>Sign up</Button>
      </form>
      </>
    )
  }