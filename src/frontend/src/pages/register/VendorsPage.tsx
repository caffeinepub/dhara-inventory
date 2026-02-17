import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function VendorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
        <p className="text-muted-foreground">Manage your vendor database</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Vendor management functionality requires backend implementation. Please contact your administrator.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Vendor List</CardTitle>
          <CardDescription>No vendors available</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Backend support for vendors is not yet implemented.</p>
        </CardContent>
      </Card>
    </div>
  );
}
