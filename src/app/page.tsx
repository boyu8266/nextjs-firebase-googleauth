import { auth } from "@/app/auth";
import { LoginHistoryHomeView } from "@/app/components/LoginHistoryHomeView";
import TopToolbar from "@/app/components/top-toolbar";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <TopToolbar />
      <LoginHistoryHomeView className="px-5" />
    </main>
  );
}
