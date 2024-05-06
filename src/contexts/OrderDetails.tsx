import { createContext, useContext } from "react";

interface OrderDetailsContext {
  totals: {
    scoops: number;
    toppings: number;
  };
  optionCounts: {
    scoops: { [key: string]: number };
    toppings: { [key: string]: number };
  };
}

const OrderDetails = createContext<OrderDetailsContext>({
  totals: { scoops: 0, toppings: 0 },
  optionCounts: { scoops: {}, toppings: {} },
});

export const useOrderDetails = () => {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within an OrderDetailsProvider"
    );
  }

  return contextValue;
};
