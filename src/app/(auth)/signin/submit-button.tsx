import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Loading...' : 'Sign in'}
    </Button>
  );
}
