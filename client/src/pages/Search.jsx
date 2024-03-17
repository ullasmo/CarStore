import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchData, setSearchData] = useState({
    searchTerm: "",
    mileageMin: 0,
    mileageMax: 100,
    priceMin: 0,
    priceMax: 1000000,
    transmission: "all",
    fuelType: "all",
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("searchTerm") || "";
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      searchTerm: searchTerm,
    }));
  }, [location.search]);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = new URLSearchParams({
        searchTerm: searchData.searchTerm,
        mileageMin: searchData.mileageMin,
        mileageMax: searchData.mileageMax,
        priceMin: searchData.priceMin,
        priceMax: searchData.priceMax,
        transmission: searchData.transmission,
        fuelType: searchData.fuelType,
        sort: searchData.sort,
        order: searchData.order,
      }).toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [searchData]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setSearchData({ ...searchData, [id]: checked });
    } else {
      setSearchData({ ...searchData, [id]: value });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";
      setSearchData({ ...searchData, sort, order });
    }
  };

  // Handle form submission logic
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchData.searchTerm);
    urlParams.set("mileageMin", searchData.mileageMin);
    urlParams.set("mileageMax", searchData.mileageMax);
    urlParams.set("priceMin", searchData.priceMin);
    urlParams.set("priceMax", searchData.priceMax);
    urlParams.set("transmission", searchData.transmission);
    urlParams.set("fuelType", searchData.fuelType);
    urlParams.set("sort", searchData.sort);
    urlParams.set("order", searchData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // Handle "Show more" button click logic
  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams();
    urlParams.set("startIndex", startIndex);
    urlParams.set("searchTerm", searchData.searchTerm);
    urlParams.set("mileageMin", searchData.mileageMin);
    urlParams.set("mileageMax", searchData.mileageMax);
    urlParams.set("priceMin", searchData.priceMin);
    urlParams.set("priceMax", searchData.priceMax);
    urlParams.set("transmission", searchData.transmission);
    urlParams.set("fuelType", searchData.fuelType);
    urlParams.set("sort", searchData.sort);
    urlParams.set("order", searchData.order);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-2 w-full"
              value={searchData.searchTerm}
              onChange={handleChange}
            />
          </div>
          {/* Mileage range input */}
          <div className="flex flex-col gap-2">
            <label className="whitespace-nowrap font-semibold">
              Mileage Range:
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="mileageMin"
                className="border rounded-lg p-2"
                placeholder="min"
                min="0"
                max="100"
                value={searchData.mileageMin}
                onChange={handleChange}
              />
              <span>to</span>
              <input
                type="number"
                id="mileageMax"
                className="border rounded-lg p-2"
                placeholder="max"
                min="0"
                max="100"
                value={searchData.mileageMax}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Price range input */}
          <div className="flex flex-col gap-2">
            <label className="whitespace-nowrap font-semibold">
              Price Range:
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="priceMin"
                className="border rounded-lg p-2"
                min="0"
                placeholder="min"
                max="10000000"
                value={searchData.priceMin}
                onChange={handleChange}
              />
              <span>to</span>
              <input
                type="number"
                id="priceMax"
                className="border rounded-lg p-2"
                min="0"
                max="10000000"
                placeholder="max"
                value={searchData.priceMax}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Transmission select */}
          <div className="flex flex-col gap-2">
            <label className="whitespace-nowrap font-semibold">
              Transmission:
            </label>
            <select
              id="transmission"
              className="border rounded-lg p-2"
              value={searchData.transmission}
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* Fuel type select */}
          <div className="flex flex-col gap-2">
            <label className="whitespace-nowrap font-semibold">
              Fuel Type:
            </label>
            <select
              id="fuelType"
              className="border rounded-lg p-2"
              value={searchData.fuelType}
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-2"
            >
              <option value="price_desc">Price high to low</option>
              <option value="price_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Car Listing results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {/* Display search results */}
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listings found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing.id} listing={listing} />
            ))}
          {/* Show more button */}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
