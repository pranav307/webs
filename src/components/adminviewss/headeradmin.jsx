import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/checkauth";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  async function handleLogout() {
    await dispatch(logoutUser());
    toast({
      title: "Admin logged out successfully",
    });
    navigate("/auth/login");
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
