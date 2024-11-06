import React, { useState, useRef, useImperativeHandle } from "react";

export const Exp2 = (props: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    console.log(">>>inputRef.current", inputRef.current);
    inputRef.current?.focus();
  };
  const handleClick2 = () => {
    console.log(">>>inputRef2.current", inputRef2.current);
    inputRef2.current?.focus();
  };
  const handleClick3 = () => {
    console.log(">>>inputRef3.current", inputRef3.current);
    inputRef3.current?.focus();
  };
  return (
    <>
    <div>
      <MyInput ref={inputRef}></MyInput>
      <button onClick={handleClick}>focus</button>
    </div>
    <div>
      <MyInput2 ref={inputRef2}></MyInput2>
      <button onClick={handleClick2}>focus</button>
    </div>
    <div>
      <MyInput3 ref={inputRef3}></MyInput3>
      <button onClick={handleClick3}>focus</button>
    </div>
    </>
  );
};

interface InputProps {
  value?: string;
}
interface InputRef extends HTMLInputElement {
  focus: () => void;
  blur: () => void;
  select: () => void;
  nativeElement?: HTMLElement | null;
}

const MyInput = React.forwardRef<InputRef, InputProps>((props, ref) => {
  return <input ref={ref}></input>;
});

const MyInput2 = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null); 
  useImperativeHandle(ref, ()=> inputRef.current!)
  return <input ref={inputRef}></input>;
});

type InputInstance = {
  focus?: () => void
  blur?: () => void
  clear?: () => void
  nativeElement?: HTMLInputElement | null
}

const MyInput3 = React.forwardRef<InputInstance, InputProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null); 
  useImperativeHandle(ref, ()=> ({
    focus() { 
      inputRef.current?.focus()
    },
    blur() { 
      inputRef.current?.blur()
    },
    get nativeElement() {
      return inputRef.current
    },
  }))
  return <input ref={inputRef}></input>;
});
