import { usePrivy } from '@privy-io/react-auth';
import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';

export default function LogoutButton() {
  const {ready, authenticated, logout} = usePrivy();
  // Disable logout when Privy is not ready or the user is not authenticated
  const disableLogout = !ready || (ready && !authenticated);
  
function logoutUser() {
  // Log out the user
  signOut({callbackUrl: '/'});
  logout();
  // Redirect to the home page
}

  return (
    <Button disabled={disableLogout} onClick={logoutUser}>
      Log out
    </Button>
  );
}