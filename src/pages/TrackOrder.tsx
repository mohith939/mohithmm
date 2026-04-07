import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Loader2, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

const TrackOrder = () => {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

// const GAS_URL = 'https://script.google.com/macros/s/AKfycby4zvKZizbhoG0LVbdcruQqOC_rSaEUIP_yLZPfqWDCqaZpbDGaMr5HKmo9l0LRQK4v4g/exec';
  
  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrders([]);

    try {
      const response = await fetch(`/gas?phone=${phone}`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
        if (data.orders.length === 0) {
          toast({
            variant: "destructive",
            title: "No Orders Found",
            description: "No orders for this phone number."
          });
        }
      } else {
        throw new Error(data.error || 'Track failed');
      }
    } catch (err) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Track Failed",
        description: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader className="text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="text-3xl font-heading">Track Your Order</CardTitle>
              <CardDescription>Enter your phone number to view order status</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrack} className="max-w-md mx-auto space-y-4">
                <div>
                  <Input
                    type="tel"
                    placeholder="Phone number (e.g. 919392633211)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    className="text-lg py-6"
                    maxLength={12}
                  />
                </div>
                <Button type="submit" className="w-full rounded-full gap-2" disabled={loading || phone.length < 10}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Track Order
                    </>
                  )}
                </Button>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              {orders.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Your Orders</h3>
                  <div className="rounded-xl border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-semibold">{order.orderId}</TableCell>
                            <TableCell className="max-w-md">{order.items}</TableCell>
                            <TableCell>₹{order.totalAmount}</TableCell>
                            <TableCell>
                              <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                                {order.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TrackOrder;

