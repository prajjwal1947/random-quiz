import React, { useState ,useEffect} from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
} from "@material-ui/core";
import axios from 'axios';

const App = () => {
    const[post,setpost]=useState([]);
    const[input,setInput]=useState('');
    const [answer,SetAnswer]=useState('');
    const[text,setText]=useState('')
   
    
    const getRepo=()=>{
      axios.get("https://jservice.io/api/random").then((response)=>{
         console.log(response.data);
        const myRepo=response.data;
        setpost(myRepo);
        console.log(myRepo[0].answer);
        SetAnswer(myRepo[0].answer)
       
      })
    }
   useEffect(()=>{
     getRepo()
   },[])

   const onChange=(e)=>{
    // console.log(e.target.value);
    setInput(e.target.value);
   }

   const onClick=()=>{
   console.log(input);
   if(input==answer){
     setText("Right")
   }
   else{
     setText("wrong");
   }
   setInput('');
   }
   
   const onNext=()=>{
  
      getRepo()
      setText('')
   
   }
  return (
    <article >
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" >{post.map((data)=>{
         
          return(<>
             {data.question}
           
             </>
          )
        })}</Typography>
        <TextField id="standard-basic" label="Standard" variant="standard" onChange={(e)=>onChange(e)} value={input}></TextField>
      </CardContent>
      <CardActions>
        <Button variant="contained" type='button' onClick={()=>onClick()} >Submit</Button>
      </CardActions>
      <CardActions>
        <Button variant="contained" type='button' onClick={()=>onNext()} >next</Button>
      </CardActions>
      <Typography  variant="h5" component="h2">{text}</Typography>

    </Card>
  </article>
  )
}

export default App