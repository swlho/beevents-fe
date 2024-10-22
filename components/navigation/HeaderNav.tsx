import { Link } from "@/components/navigation/Link"
import LoginButtonDialog from "./LoginButtonDialog"
import { createClient } from "@/utils/supabase/server"
import SignOutButtonDialog from "./SignOutButtonDialog"
import GoToDashboardButton from "./GoToDashboardButton"

export async function HeaderNav() {

  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    console.log("no user logged in")
  }

  return (
    <header>
      <div className="container flex items-center justify-between py-6 mx-auto">
        <Link href="/" className="text-2xl font-semibold no-underline">
        <span>
            <b className="text-yellow-400">BEE</b>VENTS🐝
        </span>
        </Link>
        {!data.user?
        <LoginButtonDialog /> : 
        <div>
        <GoToDashboardButton />
        <SignOutButtonDialog />
        </div>}
      </div>
    </header>
  )
}