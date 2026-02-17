import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage system users and permissions</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          User management functionality requires backend implementation. Please contact your administrator.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>No users available</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Backend support for user management is not yet implemented.</p>
        </CardContent>
      </Card>
    </div>
  );
}
