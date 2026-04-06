import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Cart = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace('₹', ''));
    return sum + (priceNum * item.quantity);
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-20 container mx-auto px-4 text-center">
          <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground mb-6 opacity-50" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/">
            <Button size="lg" className="rounded-full gap-2">
              <ShoppingCart className="h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-10">Your Cart</h1>

          <div className="bg-card rounded-3xl border border-border p-8 mb-8">
            <div className="space-y-6">
              {cart.map((item) => {
                const priceNum = parseInt(item.price.replace('₹', ''));
                const itemTotal = priceNum * item.quantity;
                return (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-background hover:bg-accent/10 transition-colors">
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{item.name}</h3>
                      <p className="text-primary font-bold text-lg mb-3">₹{priceNum * item.quantity}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-card p-2 rounded-xl border">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-accent"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center font-mono font-semibold text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-accent"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive/80 p-1 -m-1 rounded-full transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <span>Total items: {totalItems}</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary mb-3">₹{totalPrice}</div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={clearCart} className="rounded-full">
                  Clear Cart
                </Button>
                <Link to="/checkout">
                  <Button size="lg" className="rounded-full gap-2">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;

