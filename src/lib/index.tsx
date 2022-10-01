import * as React from "react"
import {createContext, ReactNode, useContext} from "react";

export type ContextValueProvider<T> = () => T | null;

function buildContext<T = unknown>() {
  return createContext<T | null>(null);  
}

function buildContextProvider<T>(context: ReturnType<typeof buildContext<T>>,
  contextValueProvider: ContextValueProvider<T>) {
  const Provider = ({children}: {children: ReactNode}) => (
    <context.Provider value={contextValueProvider()}>
      {children}
    </context.Provider>
  );
  return Provider;
}

function buildContextConsumer<T>(context: ReturnType<typeof buildContext<T>>) {
  return context.Consumer;
}

function buildUseContext<T>(context: ReturnType<typeof buildContext<T>>) {
  return () => useContext(context);
}

export function createAuthentication<T>(contextValueProvider: ContextValueProvider<T>) {
  const Context = buildContext<T>(); // We type the Context based on the generic AuthService
  const useContext = buildUseContext(Context);
  const Provider = buildContextProvider(Context, contextValueProvider);
  const Consumer = buildContextConsumer(Context);
  return {
    Context,
    Provider,
    Consumer,
    useContext,
  };
}