import { Link } from "@tanstack/react-router";

import useAuthStore, { fakeUser } from "@/lib/auth";
import { usePersonaStudio } from "./demo-widget";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function Header() {
	const links = [{ to: "/", label: "Home" }];
	const { user, logout, login } = useAuthStore();
	const { toggleChatWidget, setUserDetails } = usePersonaStudio();

	const _login = () => {
		login(fakeUser);
		setUserDetails();
	};

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-2 py-1">
				<nav className="flex gap-4 text-lg">
					{links.map(({ to, label }) => {
						return (
							<Link key={to} to={to}>
								{label}
							</Link>
						);
					})}
				</nav>
				<div className="flex items-center gap-2">
					<Button onClick={() => toggleChatWidget()}>Toggle Chat</Button>
					{user ? (
						<Button onClick={() => logout()}>Logout {user.name}</Button>
					) : (
						<Button onClick={() => _login()}>Login</Button>
					)}

					<ModeToggle />
				</div>
			</div>
			<hr />
		</div>
	);
}
