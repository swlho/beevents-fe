import { Link } from "@/components/navigation/Link"
import LoginButtonDialog from "./LoginButtonDialog"

export function HeaderNav() {
  return (
    <header>
      <div className="container flex items-center justify-between py-6 mx-auto">
        <Link href="/" className="text-2xl font-semibold no-underline">
        <span>
            <b className="text-yellow-400">BEE</b>VENTS
        </span>
        </Link>
        <LoginButtonDialog />
      </div>
    </header>
  )
}