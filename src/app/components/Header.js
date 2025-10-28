"use client";

import React from "react";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-green-500 rounded-md flex items-center justify-center text-white font-bold">
              SW
            </div>
            <h1 className="text-lg font-semibold">SustainWear — Admin</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-sm px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              Notifications
            </button>
            <div className="flex items-center space-x-2">
              <img
                src={`https://ui-avatars.com/api/?name=Admin&background=4CAF50&color=fff`}
                alt="admin"
                className="h-8 w-8 rounded-full"
              />
              <div className="text-sm">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
