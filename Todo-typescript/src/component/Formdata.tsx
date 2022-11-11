import React from "react";
import { useGetdata } from "../hooks/Getdata";

export type datainit = {
  name: string;
  email: string;
  password: string;
  id?:number
};


let initialvalue = {
  name: "",
  email: "",
  password: "",
  id:Date.now()
};

const Formdata:React.FC = () => {
 
    const { handleChange, handleSubmit, data,state}= useGetdata(initialvalue)
  return (
    <div>
      <form>
        <input onChange={handleChange} type="text"  placeholder="name" value={state.name} name="name"/>
        <input onChange={handleChange} type="email" placeholder="email"  value={state.email} name="email"/>
        <input onChange={handleChange} type="password" placeholder="password" value={state.password} name="password" />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>

      <div>
        {data.map((e)=>{
          return <li key={e.id}>{e.name}</li>
        })}
      </div>
    </div>
  );
};

export default Formdata;
