"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { CartItem, User } from "./types"

interface State {
  cart: CartItem[]
  user: User | null
}

type Action =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_USER"; payload: User | null }

const initialState: State = {
  cart: [],
  user: null,
}

const AppContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
}>({ state: initialState, dispatch: () => null })

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.cart.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          JSON.stringify(item.customization) === JSON.stringify(action.payload.customization),
      )

      if (existingItemIndex !== -1) {
        // If item exists, don't change the quantity
        return state
      } else {
        // If item doesn't exist, add it to the cart with quantity 1
        return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] }
      }
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
        ),
      }
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      }
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      const cart = JSON.parse(savedCart)
      cart.forEach((item: CartItem) => {
        dispatch({ type: "ADD_TO_CART", payload: item })
      })
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(state.cart))
  }, [state.cart])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)

