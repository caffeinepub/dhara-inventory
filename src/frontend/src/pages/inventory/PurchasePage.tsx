import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function PurchasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Purchase Entry</h1>
        <p className="text-muted-foreground">Record purchase transactions</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Purchase entry functionality requires backend implementation. Please contact your administrator.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Transactions</CardTitle>
          <CardDescription>No purchases recorded</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Backend support for purchase tracking is not yet implemented.</p>
        </CardContent>
      </Card>
    </div>
  );
}
