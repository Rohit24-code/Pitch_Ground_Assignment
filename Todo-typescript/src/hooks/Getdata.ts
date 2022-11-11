import React, { useState } from 'react'
import { datainit } from '../component/Formdata';

export const useGetdata = (initialvalue:datainit) => {
    
    const [state,setState] = useState<datainit>(initialvalue)
        const [data,setData]= useState<datainit[]>([])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let { name, value } = e.target;
      setState({ ...state, [name]: value });
    };

    const handleSubmit=(e:React.SyntheticEvent)=>{
         e.preventDefault();
          setData([...data,{...state}])
          setState({
        name:"",
        email:"",
        password:""
    })
    }
    return{handleChange,handleSubmit,data,state}
}

