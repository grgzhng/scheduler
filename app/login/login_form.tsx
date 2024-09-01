"use client";

import { login, signup } from "./actions";
import { useState } from "react";

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <form className="w-full max-w-sm">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? "Log In" : "Sign Up"}
      </h1>
      {!isLogin && (
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <button
        formAction={isLogin ? login : signup}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        {isLogin ? "Log In" : "Sign Up"}
      </button>
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="ml-1 text-blue-500 hover:underline"
        >
          {isLogin ? "Sign Up" : "Log In"}
        </button>
      </p>
    </form>
  );
}
