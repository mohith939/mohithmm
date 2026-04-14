import { createContext, useContext, useReducer, ReactNode } from 'react';
import { getProductWeight } from '../lib/shipping';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
  weightKg: number;
  variant?: string;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> & { quantity: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingIndex = state.findIndex(item => item.id === action.payload.id);
      if (existingIndex >= 0) {
        const updated = [...state];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + action.payload.quantity
        };
        return updated;
      }
      return [...state, action.payload];
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload.id);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

interface CartContextType {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  addItemWithQuantity: (item: Omit<CartItem, 'quantity'>, qty: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addItem = (itemData: Omit<CartItem, 'quantity'>) => {
    const weightKg = getProductWeight(itemData.id);
    dispatch({ type: 'ADD_ITEM', payload: { ...itemData, weightKg, quantity: 1 } });
  };

  const addItemWithQuantity = (itemData: Omit<CartItem, 'quantity'>, qty: number) => {
    const weightKg = getProductWeight(itemData.id);
    dispatch({ type: 'ADD_ITEM', payload: { ...itemData, weightKg, quantity: qty } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cart, addItem, addItemWithQuantity, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

