import { BiWorld } from "react-icons/bi";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import { GiTrophy } from "react-icons/gi";

const Info = () => {
    return (
        <div className="mt-2 py-5">
            <div className="main-container flex justify-between max-md:grid-cols-2 max-md:gap-x-20 max-md:gap-y-10">
                <div className="flex items-center gap-2 uppercase text-small">
                    <BiWorld className="text-3xl" />
                    <span>Free Shipping Worldwide</span>
                </div>
                <div className="flex items-center gap-2 uppercase text-small">
                    <FaArrowRotateLeft className="text-3xl" />
                    <span>Money Back Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 uppercase text-small">
                    <IoIosLock className="text-3xl" />
                    <span>Secure Online Payments</span>
                </div>
                <div className="flex items-center gap-2 uppercase text-small">
                    <GiTrophy className="text-3xl" />
                    <span>Best Premium Quality</span>
                </div>
            </div>
        </div>
    )
};

export default Info;