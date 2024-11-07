import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProfileForm from './profile-form';
import { getUser } from '@/actions/profile/actions';

export default async function Page() {
  return (
    <div className="flex items-center justify-center h-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ProfileForm user={await getUser()} />
        </CardContent>
      </Card>
    </div>
  );
}
