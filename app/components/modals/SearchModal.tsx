'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CountrySelect, {
  CountrySelectValue
} from "../inputs/CountrySelect";
import Heading from '../Heading';
import InputPostal from "@/app/components/inputs/InputPostal";
import Listing from "@/app/components/Listing";
import Button from "@/app/components/Button";
import {toast} from "react-hot-toast";
import fetcher from "@/app/libs/fetcher";

enum STEPS {
  LOCATION = 0,
  POSTAL = 1,
  INFO = 2,
}

const SearchModal = () => {
  // States
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<CountrySelectValue>();
  const [postalCode, setPostalCode] = useState('');

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [location]);

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(e.target.value);
  };
  const handleSearch = async () => {
    if (!postalCode || !location?.value) return;
    try {
      const response = await fetcher(`https://api.zippopotam.us/${location?.value}/${postalCode}`);
      setResult(response);
      setError('');
    } catch (err) {
      setError('Could not fetch data. Please try again.');
      setResult(null);
    }
  };
  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    if (!location && step === STEPS.LOCATION) {
      toast("Please choose country")
    } else if (location && !postalCode && step === STEPS.POSTAL ) {
      toast("Please type postal code")
    } else {
      setStep((value) => value + 1);
    }
  }, [location, step, postalCode ]);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      postalCodeValue: postalCode,
    };

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  },
  [
    step,
    searchModal,
    location,
    router,
    onNext,
    params
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Close'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to search?"
        subtitle="Pick a location below!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => {
          console.log(value, "value")
          setLocation(value as CountrySelectValue)
          }
        }

      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.POSTAL) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Enter Postal Code?"
          subtitle="Make sure the postal code is correct!"
        />
        <InputPostal
            value={postalCode}
            onChange={handleInputChange}
            label="Enter postal code"
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Summary"
        />
        <Counter
          value={location?.value}
          title="Country"
        />
        <hr />
        <Counter
          value={postalCode}
          title="Postal Code"
        />
        <hr />
        <div className="postal-code-lookup">

          {result ? <Listing data={result} /> : <></>}
          {error && toast(error)}
          <Button
              disabled={!location || !postalCode}
              label="Search!"
              onClick={handleSearch}
          />
        </div>
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
}

export default SearchModal;
