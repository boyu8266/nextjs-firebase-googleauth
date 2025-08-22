import { auth } from "@/app/auth";
import { GoogleLoginButton } from "@/app/components/auth-components";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/"); // Redirect to the home page if the user is authenticated.
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Login to Your Account
        </h1>
        <GoogleLoginButton />
      </div>
    </main>
  );
}
