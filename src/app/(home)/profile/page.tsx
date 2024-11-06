import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProfileForm from './profile-form';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
