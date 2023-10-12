import { createContext, useEffect, useState } from "react";
import { DawContextType, Daw } from "../@types/daw";
import dawsData from "../assets/daws.json";
import {
  DawValidationRules,
  validateField,
} from "../routes/daws/DawValidationRules";
import React from "react";

export const DawContext = createContext<DawContextType | null>(null);

const dawsKey = "storedDaws";
const saveToLocalStorage = (daws: Daw[]) => {
  const stringified = JSON.stringify(daws);
  localStorage.setItem(dawsKey, stringified);
};

const readFromLocalStorage = (): Daw[] => {
  const stringified = localStorage.getItem(dawsKey);
  if (stringified === null) {
    return dawsData;
  }
  return JSON.parse(stringified!);
};

export const DawProvider = ({ children }: { children: React.ReactNode }) => {
  const [daws, setDaws] = useState<Daw[]>(readFromLocalStorage());

  useEffect(() => {
    const dawsFromStorage = readFromLocalStorage();
    setDaws(dawsFromStorage);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      saveToLocalStorage(daws);
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [daws]);

  const addDaw = (newDaw: Daw) => {
    const id = Math.max(...daws.map((daw) => daw.id)) + 1;
    newDaw.id = id;

    for (const key of Object.keys(newDaw) as (keyof Daw)[]) {
      if (validateField(newDaw[key], DawValidationRules[key]).length > 0) {
        return;
      }
    }

    const newDaws = [...daws, newDaw];
    setDaws(newDaws);
  };

  const updateDaw = (updatedDaw: Daw) => {
    const index = daws.findIndex((daw) => daw.id === updatedDaw.id);
    const newDaws = [...daws];
    newDaws[index] = updatedDaw;
    setDaws(newDaws);
  };

  return (
    <DawContext.Provider value={{ daws, addDaw, updateDaw }}>
      {children}
    </DawContext.Provider>
  );
};
