import React from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function Main() {
  const [diceValues, setDiceValues] = React.useState(diceArray); //contains an array which is value of diceArray function
  const [success, setSuccess] = React.useState(false);
  const [rollNumber, setRollNumber] = React.useState(0);

  //generates array of die values

  function genDiceValues() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function diceArray() {
    const newValues = [];
    for (let i = 0; i < 10; i++) {
      newValues.push(genDiceValues());
    }
    return newValues;
  }

  //creates dice
  const dice = diceValues.map((x) => (
    <Dice
      key={x.id}
      value={x.value}
      isHeld={x.isHeld}
      toggleHold={() => toggleHold(x.id)}
    />
  ));

  function rollDice() {
    setDiceValues((prev) =>
      prev.map((x) => (x.isHeld === true ? x : genDiceValues()))
    );
    setRollNumber((prev) => prev + 1);
  }

  //maps through to check for the id that was clicked and toggles the isHeld property
  function toggleHold(id) {
    setDiceValues((prev) =>
      prev.map((x) => (x.id === id ? { ...x, isHeld: !x.isHeld } : x))
    );
  }

  //we use effect to manage the success state
  React.useEffect(() => {
    const checkHeld = diceValues.every((x) => x.isHeld);

    const checkValue = diceValues.every((x) => x.value === diceValues[0].value);

    if (checkHeld && checkValue) {
      setSuccess(true);
    }
  }, [diceValues]);

  function restart() {
    setSuccess(false);
    setDiceValues(diceArray());
    setRollNumber(0);
  }

  return (
    <main className="m-5 bg-slate-100 h-[calc(100vh-2.5em)] max-w-[800px] rounded-lg flex flex-col justify-around items-center">
      {success && <Confetti />}
      <div className="flex flex-col items-center">
        {" "}
        <h1 className="font-bold text-3xl pb-5">Tenzies</h1>
        <p className="text-sm">Roll until all dice are the same.</p>
        <p className="text-sm">
          Click each die to freeze it at its current value between rolls.
        </p>
      </div>
      <div className="grid grid-cols-5 auto-rows-minmax gap-5">{dice}</div>

      <div className="flex flex-row content-center items-center gap-5">
        {" "}
        <button
          onClick={success ? restart : rollDice}
          className="bg-green-500 hover:bg-indigo-400 outline-none inline-block py-2 px-6 text-black mt-10 rounded-lg transition duration-500"
        >
          {success ? "Re-start" : "Roll"}
        </button>
        <div className="flex items-center pt-8">
          <h2>Number of rolls: {rollNumber}</h2>
        </div>
      </div>
    </main>
  );
}
