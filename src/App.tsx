import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Homepage/Hero";
import StatsSection from "./components/Homepage/StatsSection";
import TopCategories from "./components/Homepage/TopCategories";
import TopCourses from "./components/Homepage/TopCourses";
import TopInstructors from "./components/Homepage/TopInstructors";
import TopAbout from "./components/Homepage/TopAbout";
import BecomeInstructor from "./components/Homepage/BecomeInstructor";
import CheckoutCourses from "./components/Homepage/CheckoutCourses";
import Footer from "./components/Footer";

import SignupPage from "./pages/auth/Signup";
import LoginPage from "./pages/auth/Login";
import CoursesPage from "./pages/Courses";
import CourseDetailsPage from "./pages/CourseDetails";
import ShoppingCartPage from "./pages/ShoppingCart";
import CheckoutPage from "./pages/Checkout";
import PurchaseCompletePage from "./pages/PurchaseComplete";

import DashboardPage from "./pages/admin/Dashboard";
import InstructorsManagement from "./pages/admin/Instructors";
import CoursesManagement from "./pages/admin/Courses";
import CourseCRUDs from "./pages/admin/CourseCRUDs";

import { useAuth } from "./context/AuthContext";
import AuthWrapper from "./components/AuthWrapper";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useLoading } from "./context/LoadingContext";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import NotFound from "./pages/NotFound";


const App = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { loading, setLoading } = useLoading();

  useEffect(() => {
  setLoading(true);
  const timer = setTimeout(() => setLoading(false), 800); 
  return () => clearTimeout(timer);
}, [location.pathname]);

  console.log("USER = ", user);

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="relative">
      {loading && <LoadingSpinner />}

      {!isAdminRoute && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            user?.isAdmin ? (
              <Navigate to="/admin" replace />
            ) : (
              <main className="pt-[72px] px-20">
                <Hero />
                <div className="space-y-20 mt-20">
                  <StatsSection />
                  <TopCategories />
                  <TopCourses />
                  <TopInstructors />
                  <TopAbout />
                  <BecomeInstructor />
                  <CheckoutCourses />
                </div>
              </main>
            )
          }
        />

        <Route
          path="/signup"
          element={
            <AuthWrapper guestOnly>
              <SignupPage />
            </AuthWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <AuthWrapper guestOnly>
              <LoginPage />
            </AuthWrapper>
          }
        />

        <Route
          path="/courses/:page?"
          element={
            // <AuthWrapper allowedRoles={["User", "Admin"]}>
            <CoursesPage />
            // </AuthWrapper>
          }
        />
        <Route
          path="/course/:id"
          element={
            // <AuthWrapper allowedRoles={["User", "Admin"]}>
            <CourseDetailsPage />
            // </AuthWrapper>
          }
        />
        <Route
          path="/shoppingCart"
          element={
            <AuthWrapper allowedRoles={["User"]}>
              <ShoppingCartPage />
            </AuthWrapper>
          }
        />
        <Route
          path="/checkout"
          element={
            <AuthWrapper allowedRoles={["User"]} requireNonEmptyCart>
              <CheckoutPage />
            </AuthWrapper>
          }
        />
        <Route
          path="/purchaseComplete"
          element={
            <AuthWrapper allowedRoles={["User"]}>
              <PurchaseCompletePage />
            </AuthWrapper>
          }
        />

        <Route
          path="/admin"
          element={
            <AuthWrapper allowedRoles={["Admin"]}>
              <DashboardPage />
            </AuthWrapper>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AuthWrapper allowedRoles={["Admin"]}>
              <DashboardPage />
            </AuthWrapper>
          }
        />
        <Route
          path="/admin/instructors/:page?"
          element={
            <AuthWrapper allowedRoles={["Admin"]}>
              <InstructorsManagement />
            </AuthWrapper>
          }
        />
        <Route
          path="/admin/courses/:page?"
          element={
            <AuthWrapper allowedRoles={["Admin"]}>
              <CoursesManagement key={window.location.pathname} />
            </AuthWrapper>
          }
        />
        <Route
          path="/admin/courses/add"
          element={
            <AuthWrapper allowedRoles={["Admin"]}>
              <CourseCRUDs mode="add" />
            </AuthWrapper>
          }
        />
        <Route
          path="/admin/courses/view/:id"
          element={
            <AuthWrapper allowedRoles={["Admin"]}>
              <CourseCRUDs mode="view" />
            </AuthWrapper>
          }
        />
        <Route
          path="/admin/courses/edit/:id"
          element={
            <AuthWrapper allowedRoles={["Admin"]}>
              <CourseCRUDs mode="update" />
            </AuthWrapper>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
};

export default App;
