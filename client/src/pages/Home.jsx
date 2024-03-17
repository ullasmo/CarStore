import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Home() {
  const [newListings, setNewListings] = useState([]);
  const [eleListings, setEleListings] = useState([]);

  console.log(newListings);
  useEffect(() => {
    const fetchNewListings = async () => {
      try {
        const res = await fetch("/api/listing/get?&limit=3");
        const data = await res.json();
        setNewListings(data);
        fetchEleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchEleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?fuelType=Electric&limit=3");
        const data = await res.json();
        setEleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNewListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div>
        <div className="relative bg-[url('https://i.cdn.newsbytesapp.com/images/l86820230917164837.jpeg')] bg-cover h-screen bg-no-repeat bg-center">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 flex flex-col justify-center">
            <div className="flex flex-col gap-6 px-6 max-w-3xl mx-auto text-center">
              <h1 className="text-white font-bold text-3xl lg:text-5xl">
                Your <span className="text-green-500">Dream Car</span>,<br />{" "}
                Just One Click Away
              </h1>
              <div className="text-gray-100 text-sm">
                CarStore is the ultimate destination for your next car purchase
                or sale. Discover a diverse selection of vehicles tailored to
                your needs.
              </div>
              <div className="w-max mx-auto">
                <Link
                  to={"/search"}
                  className="bg-slate-100 text-xs sm:text-sm text-black font-bold hover:underline px-4 py-2 rounded-sm inline-block"
                >
                  Explore cars
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* listing new , electric */}

      <div className="max-w-6xl mx-auto flex flex-col py-10 p-3">
        {newListings && newListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent car listings
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?"}
              >
                Show more cars
              </Link>
            </div>
            <div className="flex flex-wrap justify-between">
              {newListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {eleListings && eleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Electric cars
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?fuelType=Electric"}
              >
                Show more electric cars
              </Link>
            </div>
            <div className="flex flex-wrap justify-between">
              {eleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      <h2 className="text-3xl font-bold my-2 text-center">Instructions</h2>

      <div className="max-w-6xl flex flex-col gap-6 pb-6 px-2 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-blue-200 rounded-lg p-4">
          <div className="md:w-1/2 order-2 md:order-1 p-10">
            <img
              src="https://www.jkcarmart.com/heroImage.png"
              alt="Selling"
              className="w-full"
            />
          </div>
          <div className="md:w-1/2 px-2 order-1 md:order-2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-left">How to Sell</h2>
            <ol className="list-decimal pl-5">
              <li>Gather Information About Your Car</li>
              <li>Clean and Prepare Your Car for Sale</li>
              <li>Take Quality Photos of Your Car</li>
              <li>Set an Asking Price</li>
              <li>Create a Compelling Listing</li>
              <li>Respond to Inquiries and Negotiate Offers</li>
              <li>Finalize the Sale</li>
            </ol>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-purple-200 rounded-lg p-4">
          <div className="md:w-1/2 order-2 md:order-1 p-10">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/man-buying-car-7301279-5979751.png"
              alt="Buying"
              className="w-full"
            />
          </div>
          <div className="md:w-1/2 px-2 order-1 md:order-2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-left">How to Buy</h2>
            <ol className="list-decimal pl-5">
              <li>Determine Your Budget and Needs</li>
              <li>Research Different Car Models and Features</li>
              <li>Browse Listings and Compare Cars</li>
              <li>Contact Sellers and Ask Questions</li>
              <li>Schedule Test Drives</li>
              <li>Negotiate the Price and Terms</li>
              <li>Complete the Purchase</li>
            </ol>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-start px-4">
          {/* Logo Column */}
          <div className="flex gap-2 mb-4 lg:mb-0 lg:w-1/4">
            {/* <img src="../images/logoW.png" alt="Logo" className="w-36 h-auto" /> */}
            <h1 className="text-3xl font-bold">
              Car<span className="text-blue-700">Store</span>
            </h1>
          </div>
          {/* Quick Links Column */}
          <div className="flex flex-col gap-2 lg:w-1/4 md:w-1/2 sm:w-1/2">
            <h2 className="text-xl font-bold">Quick Links</h2>
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white">
              About
            </Link>
            <Link to="/profile" className="text-gray-300 hover:text-white">
              Profile
            </Link>
            <Link to="/search" className="text-gray-300 hover:text-white">
              Search
            </Link>
          </div>
          {/* Account Column */}
          <div className="flex flex-col gap-2 lg:w-1/4 md:w-1/2 sm:w-1/2">
            <h2 className="text-xl font-bold">Account</h2>
            <Link
              to="/notifications"
              className="text-gray-300 hover:text-white"
            >
              Notifications
            </Link>
            <Link to="/sign-in" className="text-gray-300 hover:text-white">
              Sign In
            </Link>
            <Link to="/sign-up" className="text-gray-300 hover:text-white">
              Sign Up
            </Link>
          </div>
          {/* Follow Us Column */}
          <div className="flex flex-col gap-2 lg:w-1/4 md:w-1/2 sm:w-1/2 content-end">
            <h2 className="text-xl font-bold">Follow Us</h2>
            <div className="flex gap-4">
              <FaFacebook className="text-gray-300 hover:text-white transition duration-300" />
              <FaTwitter className="text-gray-300 hover:text-white transition duration-300" />
              <FaInstagram className="text-gray-300 hover:text-white transition duration-300" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
