import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function SalesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sales Entry</h1>
        <p className="text-muted-foreground">Record sales transactions</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Sales entry with payment tracking requires backend implementation. Please contact your administrator.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Sales Transactions</CardTitle>
          <CardDescription>No sales recorded</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Backend support for sales tracking with payment status is not yet implemented.</p>
        </CardContent>
      </Card>
    </div>
  );
}
