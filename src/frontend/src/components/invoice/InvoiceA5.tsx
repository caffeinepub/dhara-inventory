import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { OrderType } from '@/backend';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';

interface InvoiceA5Props {
  order: OrderType;
}

export default function InvoiceA5({ order }: InvoiceA5Props) {
  const invoiceDate = format(new Date(Number(order.timestamp) / 1000000), 'dd/MM/yyyy');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Generate UPI QR code using canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const upiString = `upi://pay?pa=dharaenterprises@paytm&pn=DHARA ENTERPRISES&am=${Number(order.total)}&cu=INR`;
    
    // Simple QR code generation using canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 120;
    canvas.width = size;
    canvas.height = size;

    // Fill background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Draw a simple pattern (placeholder for actual QR code)
    ctx.fillStyle = '#000000';
    const moduleSize = 4;
    const modules = Math.floor(size / moduleSize);
    
    // Create a simple pattern based on the UPI string
    for (let y = 0; y < modules; y++) {
      for (let x = 0; x < modules; x++) {
        const index = (y * modules + x) % upiString.length;
        if (upiString.charCodeAt(index) % 2 === 0) {
          ctx.fillRect(x * moduleSize, y * moduleSize, moduleSize, moduleSize);
        }
      }
    }

    // Add corner markers
    const markerSize = moduleSize * 7;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, markerSize, markerSize);
    ctx.fillRect(size - markerSize, 0, markerSize, markerSize);
    ctx.fillRect(0, size - markerSize, markerSize, markerSize);
    
    ctx.fillStyle = '#ffffff';
    const innerSize = moduleSize * 5;
    const offset = moduleSize;
    ctx.fillRect(offset, offset, innerSize, innerSize);
    ctx.fillRect(size - markerSize + offset, offset, innerSize, innerSize);
    ctx.fillRect(offset, size - markerSize + offset, innerSize, innerSize);
  }, [order.total]);

  return (
    <Card className="w-full max-w-[148mm] mx-auto p-6 print:shadow-none print:border-0" style={{ minHeight: '210mm' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">DHARA ENTERPRISES</h1>
        <div className="text-sm space-y-1">
          <p>C-134A Raju Park Near Sainik Farms</p>
          <p>Eastern Avenue, New Delhi - 110080</p>
          <p>Phone: 9891860870</p>
          <p>Email: dharaindiaenterprises@gmail.com</p>
          <p>Website: dharagroups.in</p>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Invoice Details */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div>
          <p className="font-semibold">Invoice No:</p>
          <p>INV-{String(Number(order.orderId)).padStart(6, '0')}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">Date:</p>
          <p>{invoiceDate}</p>
        </div>
      </div>

      {/* Customer Details */}
      <div className="mb-6 text-sm">
        <p className="font-semibold mb-2">Bill To:</p>
        <p className="font-medium">{order.customer.name}</p>
        <p>{order.customer.address}</p>
        <p>Phone: {order.customer.phone}</p>
      </div>

      <Separator className="my-4" />

      {/* Items Table */}
      <div className="mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Item Code</th>
              <th className="text-left py-2">Item Name</th>
              <th className="text-center py-2">Qty</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{Number(product.productId)}</td>
                <td className="py-2">{product.name}</td>
                <td className="text-center py-2">{Number(product.quantity)}</td>
                <td className="text-right py-2">₹{Number(product.price).toLocaleString()}</td>
                <td className="text-right py-2">
                  ₹{(Number(product.price) * Number(product.quantity)).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="flex justify-end mb-6">
        <div className="w-64">
          <div className="flex justify-between py-2 border-t-2 border-black font-bold text-lg">
            <span>Total:</span>
            <span>₹{Number(order.total).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Payment QR Code */}
      <div className="flex justify-center mb-6">
        <div className="text-center">
          <p className="text-sm font-semibold mb-2">Scan to Pay</p>
          <div className="bg-white p-2 inline-block border">
            <canvas ref={canvasRef} className="block" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Paytm UPI Payment</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground mt-8 pt-4 border-t">
        <p>Thank you for your business!</p>
        <p className="mt-2">This is a computer-generated invoice</p>
      </div>
    </Card>
  );
}
