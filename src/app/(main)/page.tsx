import { auth } from "@/lib/auth-options";

export default function MainPage() {
    const session = auth();
  return (
    <div>
        <h1>Session</h1>
        <pre>
            {JSON.stringify(session, null, 2)}    
        </pre>
    </div>
  )
}
