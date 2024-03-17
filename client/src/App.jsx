import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import HeaderNav from "./components/HeaderNav";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import TestDriveForm from "./pages/TestDriveForm";
import NotificationPage from "./pages/NotificationPage";
import TestDriveBooking from "./pages/TestDriveBooking";

export default function App() {
  return (
    <BrowserRouter>
      <HeaderNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/schedule/:listingId" element={<TestDriveForm />} />

        <Route element={<PrivateRoute />}>
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/test-drive-booked" element={<TestDriveBooking />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
