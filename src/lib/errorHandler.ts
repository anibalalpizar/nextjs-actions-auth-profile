'use client';

import { toast } from '@/hooks/use-toast';

export const handleClientError = (errorMessage: string) => {
  toast({
    title: 'Error',
    description: errorMessage,
    duration: 5000,
  });
};
