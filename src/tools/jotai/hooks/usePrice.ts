import { atom, Getter, useAtom, useAtomValue, useSetAtom } from "jotai";
import { countAtom } from "./useCount";

export const priceAtom = atom((get)=> 10 * get(countAtom));

export function usePrice() {
  return useAtom(priceAtom);
}

export function usePriceValue() {
  return useAtomValue(priceAtom);
}


export const getPriceAtom = atom<()=> void>((get) => ()=> {
  const price = get(priceAtom);
  console.log(">>>price", price);
});

export function useGetPrice() {
  return useAtom(getPriceAtom);
}

export function useGetPriceValue() {
  return useAtomValue(getPriceAtom);
}

// export function useSetCountValue() {
//   return useSetAtom(countAtom);
// }
