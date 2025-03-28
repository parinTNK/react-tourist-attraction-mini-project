import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "lucide-react";

function TripList() {
    const [trips, setTrips] = useState([]);
    const [searchKeywords, setSearchKeywords] = useState([]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get(`http://localhost:4001/trips?keywords=${searchKeywords.join(" ")}`);
                setTrips(response.data.data);
            } catch (error) {
                console.error("Error fetching trips:", error);
            }
        };

        fetchTrips();
    }, [searchKeywords]); // Re-fetch trips when searchKeywords changes

    const handleTagClick = (tag) => {
        setSearchKeywords((prev) => [...prev, tag]); // เพิ่ม tag เข้าไปใน array
    };

    return (
        <div className="container mx-auto flex justify-center flex-col items-center p-4">
            <h1 className="text-5xl font-bold text-blue-500 mb-10 mt-14 items-center">เที่ยวไหนดี</h1>
            <div className="w-3/5">
                <p className="mb-4">ค้นหาที่เที่ยว</p>
            </div>
            <input
                type="text"
                value={searchKeywords.join(" ")}
                onChange={(e) => setSearchKeywords(e.target.value.split(" "))} // Update searchKeywords on input change
                placeholder="หาที่เที่ยวแล้วไปกัน..."
                className="w-3/5 p-2 border-b-2 border-gray-300 text-center focus:outline-none"
            />

            {/* post card */}
            <div className="flex flex-col gap-6 h-300 mt-10">
                {trips.map((trip) => (
                    <div
                        key={trip.eid}
                        className="gap-7 flex flex-col md:flex-row my-5"
                    >
                        {/* Left Column: Photos */}
                        <div className="md:w-1/3 flex flex-col gap-2">
                            <img
                                src={trip.photos[0]}
                                alt={trip.title}
                                className="w-full h-80 object-cover rounded-3xl"
                            />
                        </div>

                        {/* Right Column: Information */}
                        <div className="md:w-2/3 md:ml-4 flex gap-6 flex-col ">
                            <div>
                                <a className="text-2xl font-bold text-gray-800 hover:underline underline-offset-8" href={trip.url}>{trip.title}</a>
                                <p className="text-gray-600 mt-2 line-clamp-1">
                                    {trip.description}
                                </p>
                            </div>
                            <a
                                href={trip.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                อ่านต่อ
                            </a>
                            <div className="flex flex-wrap gap-2">
                                {trip.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        onClick={() => handleTagClick(tag)} // Add onClick handler
                                        className="bg-blue-100 text-blue-500 text-sm px-2 py-1 rounded cursor-pointer hover:bg-blue-200"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-4">
                                <div className="flex overflow-x-auto space-x-2">
                                    {trip.photos.slice(1).map((photo, index) => (
                                        <img
                                            key={index}
                                            src={photo}
                                            alt={`Photo ${index + 1}`}
                                            className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-end items-center mt-1">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(trip.url);
                                    alert("Link copied to clipboard!");
                                }}
                                className="flex items-center gap-2 text-blue-500 hover:underline text-sm"
                            >
                                <Link className="w-6 h-6" />
                                Copy Link
                            </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TripList;