import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function LedgerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ledger</h1>
        <p className="text-muted-foreground">View account balances and payment history</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Ledger functionality with payment tracking requires backend implementation. Please contact your administrator.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Account Ledger</CardTitle>
          <CardDescription>No ledger entries available</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Backend support for ledger with payment tracking is not yet implemented.</p>
        </CardContent>
      </Card>
    </div>
  );
}
