import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const { dispatch } = useAuthContext();

  const logout = () => {
    //delete user ftom local storage
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    //redirect
    router.push("/login");
  };

  return { logout };
};
