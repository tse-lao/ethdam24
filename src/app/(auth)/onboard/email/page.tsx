
import { serverApi } from "@/lib/data/server-api";
import CreateProfile from "./_components/create-profile";
import EmailVerification from "./_components/email-verify";
import FinishedProfile from "./_components/finished-profile";

export default async function EmailVerify() {
  //reda here the lang and the dictionary

  const { data: user } = await serverApi('/users/me');

  return (
    <div>
      <section className="my-2">
        {!user.email && <CreateProfile  />}
        {user?.email && !user.verified && (
          <EmailVerification user={user} />
        )}
        {user?.verified && <FinishedProfile />}
      </section>
    </div>
  );
}
