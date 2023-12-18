"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [display, setDisplay] = useState<number>(0);
  const [operation, setOperation] = useState<string>("");
  const [value, setValue] = useState<number | null>(null);
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [history, setHistory] = useState<string>("");

  function resetCalc() {
    setDisplay(0);
    setValue(null);
    setCurrentValue(null);
    setResult(null);
    setOperation("");
    setHasMore(false);
    setHistory("");
  }

  function handleDisplay(digit: number) {
    if (result != null && currentValue != null) {
      resetCalc();
      setDisplay(digit);
      setCurrentValue(digit);
    } else {
      if (display == 0) {
        setDisplay(digit);
        setCurrentValue(digit);
      } else if (display != 0 && currentValue == null) {
        setDisplay(digit);
        setCurrentValue(digit);
      } else {
        setDisplay(parseInt(display.toString() + digit.toString()));
        setCurrentValue(parseInt(display.toString() + digit.toString()));
      }
    }
  }

  function handleOperation(op: string) {
    if (op == "del") {
      setDisplay(parseInt(display.toString().slice(0, -1)));
      setCurrentValue(parseInt(display.toString().slice(0, -1)));
    } else {
      if (currentValue != null && result == null && value == null) {
        setValue(currentValue);
        setOperation(op);
        setDisplay(0);
        setCurrentValue(null);
      } else if (currentValue != null && value != null) {
        calculation(op, value, currentValue, "continue");
      } else if (result != null && currentValue != null) {
        setResult(null);
      } else {
        return false;
      }
    }
  }

  function calculation(
    op: string,
    firstVal: number,
    secondVal: number,
    type: string,
  ) {
    let operationType = "";

    if (type == "normal") {
      operationType = op;
    } else {
      operationType = operation;
    }
    switch (operationType) {
      case "+":
        if (type == "normal") {
          setResult(firstVal + secondVal);
        } else {
          setValue(firstVal + secondVal);
          setOperation(op);
        }
        break;

      case "-":
        if (type == "normal") {
          setResult(firstVal - secondVal);
        } else {
          setValue(firstVal - secondVal);
          setOperation(op);
        }
        break;

      case "*":
        if (type == "normal") {
          setResult(firstVal * secondVal);
        } else {
          setValue(firstVal * secondVal);
          setOperation(op);
        }
        break;

      case "/":
        if (type == "normal") {
          if (secondVal != 0) {
            setResult(firstVal / secondVal);
          } else {
            setResult(0);
          }
        } else {
          if (secondVal != 0) {
            setValue(firstVal / secondVal);
            setOperation(op);
          } else {
            setValue(0);
          }
        }
        break;
    }

    if (type == "continue") {
      setCurrentValue(null);
      setHasMore(true);
      setResult(null);
    }
  }

  function checkResult() {
    if (
      value != null &&
      operation != "" &&
      result == null &&
      currentValue != null
    ) {
      calculation(operation, value, currentValue, "normal");
    }
  }

  function listHistory() {
    if (history != "") {
      setHistory(history + operation + currentValue + " = " + result);
    } else {
      setHistory(value + operation + currentValue + " = " + result);
    }
  }

  useEffect(() => {
    if (result != null && currentValue != null) {
      setDisplay(result);
    }
  }, [result, currentValue]);

  useEffect(() => {
    if (result == null && value != null && hasMore) {
      setDisplay(value);
      setCurrentValue(null);
      setHasMore(false);
    }
  }, [result, hasMore, value]);

  useEffect(() => {
    if (result != null) listHistory();
  }, [result]);

  // console.log(
  //   "display: " +
  //     display +
  //     "     |    value: " +
  //     value +
  //     "     |    currentValue: " +
  //     currentValue +
  //     "     |    op: " +
  //     operation +
  //     "     |    result: " +
  //     result,
  // );

  // console.log(history);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-cyan-800 pt-4">
      <div className="flex flex-col space-y-2 w-60 h-56">
        <div className="">
          <label className="text-white font-bold">Histórico</label>
          <input
            type="text"
            readOnly
            value={history}
            className="input w-full rounded-md min-h-[70px] bg-zinc-100 text-black font-bold text-right border-0 focus:out overflow-x-scroll"
          />
        </div>
        <input
          type="text"
          readOnly
          value={display}
          className="input w-full rounded-md min-h-[50px] bg-zinc-800 text-white font-bold text-right border-0 focus:out"
        />
        <div className="bg-slate-800 grid grid-cols-4 grid-rows-5 gap-4 p-2 rounded-md">
          <button
            className="btn rounded-md w-full h-10 p-1 text-xl bg-zinc-200 text-black min-h-[20px] border-0 border-transparent uppercase"
            onClick={(e) => {
              handleDisplay(7);
            }}
          >
            7
          </button>
          <button
            className="btn rounded-md w-full h-10 p-1 text-xl bg-zinc-200 text-black min-h-[20px] border-0 border-transparent uppercase"
            onClick={(e) => {
              handleDisplay(8);
            }}
          >
            8
          </button>
          <button
            className="btn rounded-md w-full h-10 p-1 text-xl bg-zinc-200 text-black min-h-[20px] border-0 border-transparent uppercase"
            onClick={(e) => {
              handleDisplay(9);
            }}
          >
            9
          </button>
          <button
            className="btn rounded-md w-full h-10 p-1 text-xl bg-zinc-200 text-black min-h-[20px] border-0 border-transparent uppercase"
            onClick={(e) => {
              handleOperation("+");
            }}
          >
            +
          </button>
          <button
            className="btn rounded-md w-full h-10 p-1 text-xl bg-zinc-200 text-black min-h-[20px] border-0 border-transparent uppercase"
            onClick={(e) => {
              handleDisplay(4);
            }}
          >
            4
          </button>
          <button
            className="btn rounded-md w-full h-10 p-1 text-xl bg-zinc-200 text-black min-h-[20px] border-0 border-transparent uppercase"
            onClick={(e) => {
              handleDisplay(5);
            }}
          >
            5
          </button>
          <button
            className="btn rounded-md w-full h-10 p-1 text-xl bg-zinc-200 text-black min-h-[20px] border-0 border-transparent uppercase"
            onClick={(e) => {
              handleDisplay(6);
            }}
          >
            6
          </button>
          <button
            className="btn rounded-md w-full h-10 p-1 text-xl bg-zinc-200 text-black min-h-[20px] border-0 border-transparent uppercase"
            onClick={(e) => {
              handleOperation("-");
            }}
          >
            -
          </button>
          <button
            className="btn rounded-md w-full h-10 p-1 text-xl bg-zinc-200 text-black min-h-[20px] border-0 border-transparent uppercase"
            onClick={(e) => {
              handleDisplay(1);
            }}
          >
            1
          </button>
          <button
            className="btn rounded-md w-full h-10 p-1 text-xl bg-zinc-200 text-black min-h-[20px] border-0 border-transparent uppercase"
            onClick={(e) => {
              handleDisplay(2);
            }}
          >
            2
          </button>
          <button
            className="btn rounded-md w-full h-10 p-1 text-xl bg-zinc-200 text-black min-h-[20px] border-0 border-transparent uppercase"
            onClick={(e) => {
              handleDisplay(3);
            }}
          >
            3
          </button>
          <button
            className="btn rounded-md w-full h-10 p-1 text-xl bg-zinc-200 text-black min-h-[20px] border-0 border-transparent uppercase"
            onClick={(e) => {
              handleOperation("*");
            }}
          >
            *
          </button>
          <button
            className="btn rounded-md w-full h-10 p-1 text-xl bg-zinc-200 text-black min-h-[20px] border-0 border-transparent uppercase"
            onClick={(e) => {
              handleDisplay(0);
            }}
          >
            0
          </button>
          <button
            className="btn rounded-md w-full h-10 p-1 text-xl bg-cyan-600 text-white min-h-[20px] border-0 border-transparent uppercase col-end-4"
            onClick={resetCalc}
          >
            C
          </button>
          <button
            className="btn rounded-md w-full h-10 p-1 text-xl bg-zinc-200 text-black min-h-[20px] border-0 border-transparent uppercase col-end-5"
            onClick={(e) => {
              handleOperation("/");
            }}
          >
            /
          </button>
          <button
            className={`btn rounded-md w-full h-10 p-1 text-xl  text-white min-h-[20px] border-0 border-transparent uppercase col-span-2 hover:bg-red-800 ${
              display.toString().length <= 1 ||
              currentValue == null ||
              result != null
                ? "bg-red-500 opacity-20 pointer-events-none"
                : "bg-red-700"
            }`}
            onClick={(e) => {
              handleOperation("del");
            }}
          >
            del
          </button>
          <button
            className="btn rounded-md w-full h-10 p-1 text-xl bg-zinc-200 text-black min-h-[20px] border-0 border-transparent uppercase col-span-2"
            onClick={() => checkResult()}
          >
            =
          </button>
        </div>
      </div>
    </main>
  );
}
