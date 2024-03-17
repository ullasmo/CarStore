import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";

const TestDriveBooking = () => {
  const [testDrives, setTestDrives] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getTestDrives = async () => {
      try {
        const res = await axios.post("/api/test-drive/user-booking", {
          userId: currentUser._id,
        });
        if (res.data.success) {
          const testDrivesWithDetails = res.data.data.map((testDrive) => ({
            id: testDrive._id,
            carMake: testDrive.make,
            carModel: testDrive.model,
            username: testDrive.username,
            status: testDrive.status,
            time: testDrive.time,
            isApproved: testDrive.status === "approved",
            isRejected: testDrive.status === "rejected",
          }));
          setTestDrives(testDrivesWithDetails);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser) {
      getTestDrives();
    }
  }, [currentUser]);

  const handleApprove = async (id) => {
    try {
      setLoading(true);
      await axios.put(`/api/test-drive/${id}/approve`);
      setTestDrives((prevTestDrives) =>
        prevTestDrives.map((testDrive) =>
          testDrive.id === id
            ? { ...testDrive, status: "approved", isApproved: true }
            : testDrive
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id) => {
    try {
      setLoading(true);
      await axios.put(`/api/test-drive/${id}/reject`);
      setTestDrives((prevTestDrives) =>
        prevTestDrives.map((testDrive) =>
          testDrive.id === id
            ? { ...testDrive, status: "rejected", isRejected: true }
            : testDrive
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Test Drive Lists
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testDrives.map((testDrive, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-6 rounded-lg relative"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {testDrive.carMake} {testDrive.carModel}
              </h2>
              <span
                className={`status-badge ${
                  testDrive.status === "pending"
                    ? "bg-yellow-400"
                    : testDrive.status === "approved"
                    ? "bg-green-400"
                    : "bg-red-400"
                } text-white px-2 py-1 rounded-md text-sm`}
              >
                {testDrive.status}
              </span>
            </div>
            <p className="text-gray-700 mb-2">Username: {testDrive.username}</p>
            <p className="text-gray-700">
              Time: {moment(testDrive.time).format("DD-MM-YYYY HH:mm")}
            </p>
            <div className="mt-4">
              {!testDrive.isApproved && !testDrive.isRejected && (
                <>
                  <button
                    onClick={() => handleApprove(testDrive.id)}
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(testDrive.id)}
                    disabled={loading}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TestDriveBooking;
