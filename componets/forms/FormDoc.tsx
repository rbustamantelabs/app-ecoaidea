"use client"; // this is a client component

import React, { useState } from "react";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";


const FormEvent = () => {
    // const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("espere...");
        getRes();
        // getRes2();
    };

    const [loading, setLoading] = useState(false);
    let [obj, setObj] = useState({ choices: [] });
    const [payload, setPayLoad] = useState({
        prompt: "",
        // prompt: "pregunte?",
        // prompt: "Quien es el presidente de eeuu?",
        // prompt: "Que es una criptomoneda y devuelve la lista de las 10 mejores criptomonedas?",
        // prompt: "What is the impact of creatine on cognition?",
        temperature: 0.9,
        n: 5,
        model: "text-davinci-003"
    });


    const getRes2 = async () => {
        const configuration = new Configuration({
            organization: "org-1wyY4xOolGB2b9BoZy5M3pe1",
            apiKey: "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",
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.listEngines();
        console.log("response", response);
  };
    
  const getRes = () => {

    setLoading(true);
    axios({
      method: "POST",
      url: "https://api.openai.com/v1/completions",
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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"
      }
    })
      .then((res) => {
        console.log(res);
        responseHandler(res);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message, e);
      });
  };

  const responseHandler = (res:any) => {
    if (res.status === 200) {
      setObj(res.data);
      setLoading(false);
    }
  };

    return (
        <form >
        <input type="text" placeholder="Pregunte? (5 rpta)"
         onChange={(e) => {
            setPayLoad({
              ...payload,
              prompt: e.target.value
            });
          }}
          value={payload.prompt}
        />
        {/* serarch field */}

        <button onClick={handleSubmit} >
            <img src="images/icon/54.svg" alt="icon" />
        </button>
        {/* Search button */}

        <select className="form-control" id="exampleFormControlSelect1">
            <option>Todos</option>
            <option>Negocios ecológicos</option>
            <option>Recursos para emprendedores</option>
            <option>Opción para financinanciamiento para startups</option>
        </select>
     
        <p>
              {loading ? (
                <span>cargando...</span>
              ) : (
                obj?.choices?.map((v:any, i) => <div>{v.text}</div>)
              )}
            </p>

        </form>
    );
};

export default FormEvent;
