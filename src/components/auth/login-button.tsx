import { usePrivy } from '@privy-io/react-auth';
import { useSession } from 'next-auth/react';
import { Button } from '../ui/button';


export default function LoginButton() {
  const {ready, authenticated, login, user} = usePrivy();
  const { data: session } = useSession();

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);


  return (
    <Button disabled={disableLogin} onClick={login}>
      Log in
    </Button>
  );
}