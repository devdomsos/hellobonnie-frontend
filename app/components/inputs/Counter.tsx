'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle?: string;
  value: string | undefined;
  onChange?: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
}) => {

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">
          {subtitle}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          className="
            font-light
            text-xl
            text-neutral-600
          "
        >
            {value}
          </div>
      </div>
    </div>
   );
}

export default Counter;
