"use client"; // this is a client component

import React, { useState, useRef } from "react";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import Image from "next/image";
import OpenAI from "openai-api";

const openai = new OpenAI(process.env.OPENAI_API || "");

const FormEvent = () => {
  
  const [param_temperature, setParam_Temperature] = useState(0.5);
  const [param_n, setParam_N] = useState(10);
  // const [param_model, setParam_Model] = useState("code-davinci-002");
  const [param_model, setParam_Model] = useState("text-davinci-003");
  
  // const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
 
    const inputRef = useRef();

    let input = "quien es messi?";
    const handleSubmit = (event: any) => {
        event.preventDefault();

        // input = inputRef.current.value;

        getRes();
        // getRes2();
    };

    const [loading, setLoading] = useState(false);
    let [obj, setObj] = useState({ choices: [] });
    const [payload, setPayLoad] = useState({
        prompt: "slogan para una empresa de software",
        // prompt: "What is the impact of creatine on cognition?",
        temperature: param_temperature,
        n: param_n
        , model: param_model
        , max_tokens: 1000
        // , stop: "."
        // , stop: ['AI:', `Human:`],
    });

    const getRes3 = async () => {
      const res = await openai.complete({
        engine: "davinci",
        prompt: input,
        maxTokens: 50,
        temperature: 0.7,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1
      });

      console.log(res);
    };

    const getRes2 = async () => {
        const configuration = new Configuration({
            organization: "org-1wyY4xOolGB2b9BoZy5M3pe1",
            apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
        });
        const openai = new OpenAIApi(configuration);
        // const response = await openai.listEngines();


        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Quien es messi?`,
          max_tokens: 1000,
          temperature: 0.5
        });
        //console.log(response.data.choices[0].text);
        // questionData = response.;
        var questionString = response.data.choices[0].text;
    
        console.log("response", response);
        console.log("questionString", questionString);
  };
    
  const getRes = () => {

    setLoading(true);

    axios({
      method: "POST",
      url: "https://api.openai.com/v1/completions",
      // url: "https://api.openai.com/v1/engines/davinci/completions",
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + process.env.NEXT_PUBLIC_OPENAI_KEY
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
        <input type="text" placeholder="pregunte? (10 rpta)"
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
                obj?.choices?.map((v:any, i) => <div className="form-control"><li> {v.text}</li></div>)
              )}
            </p>

        </form>
    );
};

export default FormEvent;
