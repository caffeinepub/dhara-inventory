import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetOrder } from '@/hooks/useQueries';
import { Download, Printer } from 'lucide-react';
import InvoiceA5 from '@/components/invoice/InvoiceA5';
import { toast } from 'sonner';

export default function InvoicePage() {
  const params = useParams({ strict: false });
  const orderId = params.orderId;
  const { data: order, isLoading } = useGetOrder(orderId ? BigInt(orderId) : undefined);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.info('PDF download requires additional setup');
  };

  if (!orderId) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoice</h1>
          <p className="text-muted-foreground">Select an order to generate invoice</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Please select an order from the Order Book to generate an invoice.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoice</h1>
          <p className="text-muted-foreground">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoice</h1>
          <p className="text-muted-foreground">Order not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoice</h1>
          <p className="text-muted-foreground">Order #{Number(order.orderId)}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <InvoiceA5 order={order} />
    </div>
  );
}
