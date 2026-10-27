import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { useEffect } from "react";
import Lenis from "lenis";
import Index from "./pages/Index";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PashuMelaPage from "./pages/PashuMelaPage";
import VerifyPass from "./pages/VerifyPass";
import Terms from "./pages/Terms";
import Accommodation from "./pages/Accommodation";

const queryClient = new QueryClient();

const App = () => {
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AdminAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pashu-mela" element={<PashuMelaPage />} />
                {/* Public pass verification target for the QR codes */}
                <Route path="/verify/:code" element={<VerifyPass />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/accommodation" element={<Accommodation />} />
                {/* Admin routes - completely separate from public site */}
                <Route path="/admin-access" element={<AdminLogin />} />
                <Route path="/admin-access/dashboard" element={<AdminDashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AdminAuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
