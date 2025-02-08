import React, { useContext } from 'react';
import { ApiSeminar } from '@/api/types';
import { createContext, FC, PropsWithChildren } from 'react';

const SeminarContext = createContext<ApiSeminar | null>(null);

type SeminarContextProviderProps = {
  value: ApiSeminar | null;
};

const SeminarContextProvider: FC<PropsWithChildren<SeminarContextProviderProps>> = ({
  value,
  children,
}) => {
  return <SeminarContext.Provider value={value}>{children}</SeminarContext.Provider>;
};

export function useSeminar() {
  return useContext(SeminarContext);
}
export default SeminarContextProvider;
