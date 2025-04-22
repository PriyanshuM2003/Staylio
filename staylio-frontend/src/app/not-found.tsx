"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const handleGoHome = () => {
    router.replace("/");
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center space-y-4">
      <h1>404</h1>
      <h3>Page not found</h3>
      <h4>The page you are looking for does not exist.</h4>
      <Button onClick={handleGoHome}>Go Home</Button>
    </main>
  );
}
