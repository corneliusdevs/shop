import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {Provider} from "react-redux";
import { store, persistor} from "./redux/store";
import { PersistGate} from "redux-persist/integration/react";

const express = require("express")
const path = require("path")
const app = express()
app.use(express.static(path.join(__dirname, "build")))

app.get("/*", function(req, res){
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

const PORT = process.env.PORT || 9000

app.listen(PORT , ()=>{
  console.log("frontend server running")
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading = {null} persistor={persistor}>
       <App />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
