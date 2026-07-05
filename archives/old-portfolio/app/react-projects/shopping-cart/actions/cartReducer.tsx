import { TCartState } from "../context/cartContext";
import { TShoppingDataStruct } from "../hooks/useGetShoppingData";

const cartReducer = (state: TCartState, action: any) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, shoppingData: null };
  }

  if (action.type === "REMOVE") {
    return {
      ...state,
      shoppingData: state?.shoppingData
        ? state?.shoppingData?.filter(
            (cartItem: TShoppingDataStruct) => cartItem?.id !== action?.payload
          )
        : state?.shoppingData || [],
    };
  }

  if (action.type === "INCREASE") {
    let tempCart = state?.shoppingData
      ? state?.shoppingData?.map((cartItem) => {
          if (cartItem?.id === action?.payload) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        })
      : state?.shoppingData || [];
    return { ...state, cart: tempCart };
  }

  if (action.type === "DECREASE") {
    let tempCart = state?.shoppingData
      ? state.shoppingData
          .map((cartItem) => {
            if (cartItem.id === action.payload) {
              return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
          })
          .filter((cartItem) => cartItem.quantity !== 0)
      : state?.shoppingData || [];
    return { ...state, cart: tempCart };
  }

  if (action.type === "GET_TOTALS") {
    let { cost, quantity }: { cost: number; quantity: number } =
      state.shoppingData
        ? state.shoppingData.reduce(
            (cartTotal, cartItem) => {
              const { cost, quantity } = cartItem;
              const itemTotal = cost * quantity;
              cartTotal.cost += itemTotal;
              cartTotal.quantity += quantity;
              return cartTotal;
            },
            {
              cost: 0,
              quantity: 0,
            }
          )
        : { cost: 0, quantity: 0 };
    cost = parseFloat(cost.toFixed(2));
    return { ...state, totalCartValue: cost, totalCartItemsCount: quantity };
  }

  if (action.type === "LOADING") {
    return { ...state, isLoading: true };
  }

  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, shoppingData: action.payload, isLoading: false };
  }

  if (action.type === "TOGGLE_AMOUNT") {
    let tempCart = state?.shoppingData
      ? state?.shoppingData
          .map((cartItem) => {
            if (cartItem.id === action.payload.id) {
              if (action.payload.type === "inc") {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
              }
              if (action.payload.type === "dec") {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
              }
            }
            return cartItem;
          })
          .filter((cartItem) => cartItem.quantity !== 0)
      : state?.shoppingData || [];
    return { ...state, shoppingData: tempCart };
  }
  throw new Error("no matching action type");
};

export default cartReducer;
