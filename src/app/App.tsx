import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { ProjectDetail } from "./pages/ProjectDetail";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { ContactSection } from "./components/ContactSection";
import { ElasticDivider } from "./components/ElasticDivider";

function Layout() {
  return (
    <div className="w-full min-h-screen bg-[#fffcf8] font-['Figtree',sans-serif]">
      <Navbar />
      {/* Main content */}
      <div
        className="relative bg-[#fffcf8] rounded-b-3xl p-0"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}
      >
        <Outlet />
      </div>
      {/* Elastic green divider */}
      <ElasticDivider />
      {/* Footer */}
      <ContactSection />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "project/:slug", Component: ProjectDetail },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}