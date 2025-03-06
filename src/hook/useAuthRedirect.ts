import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/stores/UserStore"; // Adjust the import path

const useAuthRedirect = (redirectPath: string = "/dashboard") => {
  const router = useRouter();
  const { user, loading } = useUserStore();

  useEffect(() => {
    console.log("From Hook", user);
    // Redirect if the user is authenticated and not loading
    if (!loading && user) {
      console.log("Redirecting to dashboard");
      router.replace(redirectPath);
    }
  }, [user, loading, router, redirectPath]);

  return { user, loading };
};

export default useAuthRedirect;
