import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

import { RiShareForwardLine } from "react-icons/ri";
import { IoMdColorFill } from "react-icons/io";
import { TbManualGearbox } from "react-icons/tb";
import { BsFuelPumpFill } from "react-icons/bs";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { IoIosPricetags } from "react-icons/io";
import { BsSpeedometer } from "react-icons/bs";

import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <RiShareForwardLine
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-6xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold text-center">
              {listing.make} -{listing.model}
            </p>
            <div className="flex justify-center gap-4 sm:gap-6 mx-auto w-full">
              <div className="bg-red-900 text-white text-center p-1 rounded-md flex flex-col items-center w-1/4">
                <IoIosPricetags className="text-2xl mb-3" />
                <p className="text-sm text-slate-100">Price</p>
                <p className="text-base">Rs. {listing.price}</p>
              </div>
              <div className="bg-green-900 text-white text-center p-1 rounded-md flex flex-col items-center w-1/4">
                <BsSpeedometer className="text-2xl mb-3" />
                <p className="text-sm text-slate-100">Mileage</p>
                <p className="text-base">{listing.mileage}</p>
              </div>
              <div className="bg-slate-800 text-white text-center p-1 rounded-md flex flex-col items-center w-1/4">
                <LiaBusinessTimeSolid className="text-2xl mb-3" />
                <p className="text-sm text-slate-100">Status</p>

                <p className="text-base">{listing.status}</p>
              </div>
            </div>

            <h2 className="font-bold text-lg text-center">
              Car Specifications
            </h2>
            <div className="flex justify-center gap-x-4 sm:gap-x-6 mx-auto w-full flex-wrap mb-10">
              <div className="flex flex-col items-center justify-between bg-slate-300 rounded-lg p-6 w-1/3 sm:w-1/5 mb-3">
                <LiaBusinessTimeSolid className="text-4xl text-green-900 mb-4" />
                <p className="text-sm text-slate-800">Make year</p>
                <p className="text-base text-black ">{listing.year}</p>
              </div>
              <div className="flex flex-col items-center justify-between bg-slate-300 rounded-lg p-6 w-1/3 sm:w-1/5 mb-3">
                <TbManualGearbox className="text-4xl text-green-900 mb-4" />
                <p className="text-sm text-slate-800">Transmission</p>
                <p className="text-base text-black ">{listing.transmission}</p>
              </div>
              <div className="flex flex-col items-center justify-between bg-slate-300 rounded-lg p-6 w-1/3 sm:w-1/5 mb-3">
                <BsFuelPumpFill className="text-4xl text-green-900 mb-4" />
                <p className="text-sm text-slate-800">Fule</p>
                <p className="text-base text-black ">{listing.fuelType}</p>
              </div>
              <div className="flex flex-col items-center justify-between bg-slate-300 rounded-lg p-6 w-1/3 sm:w-1/5 mb-3">
                <IoMdColorFill className="text-4xl text-green-900 mb-4" />
                <p className="text-sm text-slate-800">Color</p>
                <p className="text-base text-black ">{listing.color}</p>
              </div>
            </div>
            <div className="flex justify-center gap-4 sm:gap-6 mx-auto w-full bg-gray-200 rounded-lg p-3 fixed bottom-0 left-0">
              {currentUser && listing.userRef !== currentUser._id && (
                <Link
                  to={`/`}
                  className="bg-red-900 text-white text-center rounded-md flex flex-col items-center w-1/4 p-3"
                >
                  Book
                </Link>
              )}
              {currentUser && listing.userRef !== currentUser._id && (
                <Link
                  to={`/schedule/${listing._id}`}
                  className="bg-green-900 text-white text-center rounded-md flex flex-col items-center w-1/4 p-3"
                >
                  Test Drive
                </Link>
              )}
              {currentUser &&
                listing.userRef !== currentUser._id &&
                !contact && (
                  <button
                    onClick={() => setContact(true)}
                    className="bg-slate-800 text-white text-center rounded-md flex flex-col items-center w-1/4 p-3"
                  >
                    Contact owner
                  </button>
                )}
            </div>

            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
