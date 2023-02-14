import Link from "next/link";
import SignOut from "./SignOut";

const Navigation = ({ session }) => {
    return (
        <nav className="relative container mx-auto p-6 border-b border-gray-300">
            <div className="flex items-center justify-between space-x-6">
                <Link href="/" className="hover:text-blue-600">
                    Home
                </Link>
                {
                    session && (
                        <Link href="/create-post" className="hover:text-blue-600">
                            Create Post
                        </Link>
                    )
                }
                {
                    session && (
                        <Link href="/my-posts" className="hover:text-blue-600">
                            My Posts
                        </Link>
                    )
                }
                <Link href="/profile" className="hover:text-blue-600">
                    Profile
                </Link>
                {
                    session &&
                    <p >
                        Signed in: {session.user.email}
                    </p>
                }
                {
                    session &&
                    <SignOut session={session} />
                }
            </div>
        </nav>
    )
};

export default Navigation;
