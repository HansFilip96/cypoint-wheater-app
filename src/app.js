import WeatherTable from "./components/weatherTable/WeatherTable";
import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherTable />} />
        <Route path="/:forecastDate" element={<WeatherTable />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
