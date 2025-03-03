import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export const countAtom = atom(0);

export function useCount() {
  return useAtom(countAtom);
}

export function useCountValue() {
  return useAtomValue(countAtom);
}

export function useSetCountValue() {
  return useSetAtom(countAtom);
}
