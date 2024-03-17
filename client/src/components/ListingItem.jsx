/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
// import { MdLocationOn } from "react-icons/md";
import { IoMdColorFill } from "react-icons/io";
import { TbManualGearbox } from "react-icons/tb";
import { BsFuelPumpFill } from "react-icons/bs";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { IoIosPricetags } from "react-icons/io";
import { BsSpeedometer } from "react-icons/bs";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] mb-4">
      <Link to={`/listing/${listing._id}`} className="flex flex-col h-full">
        <img
          src={
            listing.imageUrls[0] ||
            "https://img.freepik.com/free-vector/vehicle-sale-concept-illustration_114360-1634.jpg"
          }
          alt="listing cover"
          className="h-[330px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.make}-{listing.model}
          </p>
          <div className="flex flex-col gap-1  bg-slate-100 rounded-lg">
            <div className="flex items-center">
              {/* <MdLocationOn className="h-4 w-4 text-green-700 mr-1" /> */}
              <p className="text-sm text-gray-600 truncate p-2">
                <IoIosPricetags className="inline-block text-lg" /> Rs.{" "}
                {listing.price}
              </p>
              <span className="mx-auto">|</span>
              <p className="text-sm text-gray-600 truncate p-2">
                <BsSpeedometer className="inline-block text-base" />{" "}
                {listing.mileage} Km/hour
              </p>
            </div>

            <div className="grid grid-cols-2 gap-1 text-sm text-gray-600 p-3">
              <div className="flex items-end">
                <TbManualGearbox className="inline-block text-lg mr-2" />{" "}
                {listing.transmission}
              </div>
              <div className="flex items-end justify-end">
                {listing.fuelType}
                <BsFuelPumpFill className="inline-block text-base ml-2" />{" "}
              </div>
              <div className="flex items-end">
                <IoMdColorFill className="inline-block text-lg mr-2" />{" "}
                {listing.color}
              </div>
              <div className="flex items-end justify-end">
                {listing.year}
                <LiaBusinessTimeSolid className="inline-block text-lg ml-2" />{" "}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
