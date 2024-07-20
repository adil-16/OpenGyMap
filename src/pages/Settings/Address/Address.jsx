import React, { useState, useEffect } from "react";
import Map from "../components/Map";

const Address = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placeName, setPlaceName] = useState("");

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const LATITUDE = position.coords.latitude;
            const LONGITUDE = position.coords.longitude;
            setLocation({
              latitude: LATITUDE,
              longitude: LONGITUDE,
            });
            setLoading(false);
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                setError("User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                setError("The request to get user location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                setError("An unknown error occurred.");
                break;
              default:
                setError("An unknown error occurred.");
            }
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      if (location.latitude && location.longitude) {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
              location.latitude
            },${location.longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API}`
          );
          const res = await response.json();
          setPlaceName(res.results[0].formatted_address);
        } catch (err) {
          console.log(err);
        }
      }
    };

    getLocation();
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-custom-black">Address</h1>
      <div className="border-b border-payment-gray py-1 w-full mb-6"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-2 text-custom-black">
            Current Address
          </h2>
          <div className="relative mb-10">
            <img
              src="/Settings/location.png"
              alt="location"
              className="absolute left-6 top-4 w-6 h-6 object-contain"
            />
            <input
              type="text"
              value={placeName}
              className="pl-16 p-4 border rounded-full w-11/12 text-custom-black font-semibold"
              readOnly
            />
          </div>
          <div className="flex space-x-4">
            <button className="px-8 py-3 border text-custom-black rounded-xl">
              Cancel
            </button>
            <button className="px-8 py-3 bg-custom-gradient text-white rounded-xl">
              Update
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center">
          {location.latitude && location.longitude && (
            <Map latitude={location.latitude} longitude={location.longitude} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Address;