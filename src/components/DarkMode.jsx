import React, { useEffect, useState } from "react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

export const DarkMode = () => {
  const storedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(storedTheme || "light");

  storedTheme ||
    useEffect(() => {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {theme === "dark" ? (
        <div
          onClick={handleTheme}
          className="bg-gray-100 h-6 w-6 flex items-center justify-center rounded-full"
        >
          <IoSunny />
        </div>
      ) : (
        <div
          onClick={handleTheme}
          className="bg-gray-300 h-6 w-6 flex items-center justify-center rounded-full"
        >
          <IoMoon />
        </div>
      )}
    </>
  );
};
