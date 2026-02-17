import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage system configuration</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Settings management requires backend implementation. Please contact your administrator.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Credentials</CardTitle>
            <CardDescription>Change username and password</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Backend support for credential management is not yet implemented.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>UPI Payment Configuration</CardTitle>
            <CardDescription>Configure Paytm UPI details for invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Backend support for payment configuration is not yet implemented.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Settings</CardTitle>
            <CardDescription>Firm details and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Backend support for business settings is not yet implemented.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
