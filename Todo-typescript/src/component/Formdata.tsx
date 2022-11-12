import React from "react";
import { useGetdata } from "../hooks/Getdata";

export type datainit = {
  todo: string;
  id?:number
};


let initialvalue = {
  todo: "",
  id:Date.now()
};

const Formdata:React.FC = () => {
 
    const { handleChange, handleSubmit, data,state}= useGetdata(initialvalue)
  return (
    <div>
      <form>
        <input onChange={handleChange} type="text"  placeholder="name" value={state.todo} name="name"/>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>

      <div>
        {data.map((e)=>{
          return <li key={e.id}>{e.todo}</li>
        })}
      </div>
    </div>
  );
};

export default Formdata;
