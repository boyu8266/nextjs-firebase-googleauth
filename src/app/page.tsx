import { LoginHistoryHomeView } from "@/app/components/LoginHistoryHomeView";
import TopToolbar from "@/app/components/top-toolbar";

export default function Home() {
  return (
    <main>
      <TopToolbar />
      <LoginHistoryHomeView className="px-5" />
    </main>
  );
}
