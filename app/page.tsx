"use client"

import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";

import ClientOnly from "./components/ClientOnly";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useSearchParams} from "next/navigation";
import Listing from "@/app/components/Listing";

const Home = async () => {
    const params = useSearchParams();
  console.log(params.get("locationValue"), "params")


    const [postalCode, setPostalCode] = useState(  params.get("postalCodeValue")?.toString() || '');
    const [location, setLocation] = useState( params.get("locationValue")?.toString() || '');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
        console.log(result, "result")
    const fetchPostalCodeData = useCallback(async (location: string | undefined, postalCode: string | undefined) => {


        console.log("1")
        try {
            const response = await axios.get(`https://api.zippopotam.us/${location}/${postalCode}`);
            setResult(response.data);
            setError('');
        } catch (err) {
            setError('Could not fetch data. Please try again.');
            setResult(null);
        }
    }, [location , postalCode]);

    useEffect(() => {

            fetchPostalCodeData(location, postalCode);

    }, [location, postalCode, fetchPostalCodeData]);


  if (result === null) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {result && <Listing data={result} />}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;
