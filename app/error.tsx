'use client';

import { useEffect } from "react";

import EmptyState from "@/app/components/EmptyState";

interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="This page is empty"
      subtitle="Don't worry, it will be full of magic soon!"
    />
   );
}

export default ErrorState;
