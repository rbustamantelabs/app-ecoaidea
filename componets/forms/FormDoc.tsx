"use client"; // this is a client component

import React, { useState } from "react";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import Image from "next/image";

const FormEvent = () => {
  
  const [param_temperature, setParam_Temperature] = useState(0.5);
  const [param_n, setParam_N] = useState(5);
  const [param_model, setParam_Model] = useState("text-davinci-003");
  
  // const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const handleSubmit = (event: any) => {
        event.preventDefault();


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
        temperature: param_temperature,
        n: param_n,
        model: param_model
    });


    const getRes2 = async () => {
        const configuration = new Configuration({
            organization: "org-1wyY4xOolGB2b9BoZy5M3pe1",
            apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
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
          "Bearer " + process.env.NEXT_PUBLIC_OPENAI_KEY
      }
    })
      .then((res) => {
        // console.log(res);
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
            // setParam_Temperature( Number(process.env.NEXT_PUBLIC_OPENAI_TEMPERATURE || 0.5) );
            // setParam_N( Number(process.env.NEXT_PUBLIC_OPENAI_N || 4) );
            // setParam_Model( (process.env.NEXT_PUBLIC_OPENAI_MODEL || "text-davinci-003") );
          
            setPayLoad({
              ...payload,
              prompt: e.target.value
            });
          }}
          value={payload.prompt}
        />
        {/* serarch field */}

        <button onClick={handleSubmit} >
            <Image 
              src="images/icon/54.svg" 
              alt="icon"
              width={27}
              height={23}
              priority
            />
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
