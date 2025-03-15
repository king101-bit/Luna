import { MainNavbar } from "@/components/ui/MainNavbar";
import Sidebar from "@/components/ui/sidebar";

export default function Page() {
  return (
    <>
      <MainNavbar />
      <div className="flex flex-1">
        <Sidebar />
        <h1>Course Page</h1>
      </div>
    </>
  );
}
