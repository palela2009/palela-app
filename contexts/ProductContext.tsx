import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface ProductState {
  phones: Product[];
  laptops: Product[];
  loading: boolean;
  error: string | null;
}

type ProductAction =
  | { type: "SET_PHONES"; payload: Product[] }
  | { type: "SET_LAPTOPS"; payload: Product[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const initialState: ProductState = {
  phones: [],
  laptops: [],
  loading: false,
  error: null,
};

const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case "SET_PHONES":
      return { ...state, phones: action.payload, loading: false };
    case "SET_LAPTOPS":
      return { ...state, laptops: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

interface ProductContextType {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
