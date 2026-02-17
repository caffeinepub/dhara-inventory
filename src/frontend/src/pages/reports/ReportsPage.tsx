import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Business analytics and reports</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Advanced reporting features require backend implementation. Please contact your administrator.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Summary</CardTitle>
            <CardDescription>Daily and monthly sales reports</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Backend support for sales summaries is not yet implemented.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profit & Loss</CardTitle>
            <CardDescription>Revenue and cost analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Backend support for P&L calculation is not yet implemented.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax Reports</CardTitle>
            <CardDescription>GST and tax summaries</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Backend support for tax reports is not yet implemented.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Reports</CardTitle>
            <CardDescription>Stock movement and valuation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Backend support for inventory reports is not yet implemented.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
