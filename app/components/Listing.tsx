import {PostalData} from "@/app/types";


interface ListingProps {
    data: PostalData;
}
const Listing: React.FC<ListingProps> = ({ data }) => {
    const { 'post code': postCode, country, places } = data;

    return (
        <div>
            <div className="flex flex-col">
                <h2>Postal Code Information</h2>
                <div className="font-medium"><strong>Country:</strong>{country}</div>
                <div className="font-light text-gray-600"><strong>Post Code:</strong> {postCode}
                </div>
            </div>

            {places && places.map((place, index) => (
                <div className="mb-2" key={index}>
                    <p className="font-light text-gray-600"><strong>Place Name:</strong> {place['place name']}</p>
                    <p className="font-light text-gray-600"><strong>State:</strong> {place['state']}</p>
                    <p className="font-light text-gray-600"><strong>Longitude:</strong> {place['longitude']}</p>
                    <p className="font-light text-gray-600"><strong>Latitude:</strong> {place['latitude']}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default Listing
