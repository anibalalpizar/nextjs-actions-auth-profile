'use client';

import { toast } from '@/hooks/use-toast';

export const handleClientMessage = (
  message: string,
  type: 'error' | 'success'
) => {
  toast({
    title: type === 'error' ? 'Error' : 'Success',
    description: message,
    duration: 5000,
  });
};
