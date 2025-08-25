import { getAllLoginHistory } from "@/lib/firestore/services/login-history.service";
import { LoginHistoryTable } from "./LoginHistoryTable";

export async function LoginHistoryHomeView({
  className,
}: {
  className?: string;
}) {
  const history = await getAllLoginHistory(10);

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">Recent Logins</h2>
      <LoginHistoryTable history={history} />
    </div>
  );
}
