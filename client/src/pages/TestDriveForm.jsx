/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { useSelector } from "react-redux";

const TestDriveForm = () => {
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const [listing, setListing] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  const getUserData = async () => {
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

  const handleAvailability = async () => {
    try {
      // Check if date and time are selected
      if (!dateTime) {
        throw new Error("Date and time are required");
      }

      const response = await fetch("/api/test-drive/booking-availbility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listingId: params.listingId,
          userId: currentUser,
          user: currentUser,
          time: dateTime,
        }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        setIsAvailable(true);
        message.success(responseData.message);
      } else {
        message.error(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleBooking = async () => {
    try {
      // Check if date and time are selected
      if (!dateTime) {
        throw new Error("Date and time are required");
      }

      const res = await fetch("/api/test-drive/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listingId: params.listingId,
          userId: currentUser,
          user: currentUser,
          time: dateTime,
        }),
      });
      const responseData = await res.json();

      if (responseData.success) {
        message.success(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="w-full">
        <h3 className="text-2xl font-bold mb-4 text-center">Book Test Drive</h3>
        <div className="w-[300] mx-auto">
          {listing && (
            <div className="mb-4 text-center">
              <h4 className="text-xl font-semibold">
                Car : {listing.make} {listing.model}
              </h4>
              <h4 className="text-xl font-semibold">
                Price : Rs. {listing.price}
              </h4>

              <div className="flex flex-col w-1/2 mt-6 mx-auto">
                <input
                  type="datetime-local"
                  className="border rounded p-2 mb-4"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                />

                <button
                  className="bg-blue-400 text-white py-2 px-4 mb-2 rounded"
                  onClick={handleAvailability}
                >
                  Check Availability
                </button>

                <button
                  className={`${
                    isAvailable
                      ? "bg-gray-800 text-white cursor-pointer"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  } py-2 px-4 rounded`}
                  onClick={handleBooking}
                  disabled={!isAvailable}
                >
                  Request Test Drive
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default TestDriveForm;
