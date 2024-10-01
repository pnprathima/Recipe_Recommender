import React from 'react';
import { Input } from '@chakra-ui/react';
import "./css/TypeAheadDropDown.css"


export default class TypeAheadDropDown extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     suggestions: [],
     text:''
   }
 }
 
 onTextChange = (e) => {
    try{
        const {iteams} = this.props;
        let suggestions = [];
        const value = e.target.value;
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, `i`);
            suggestions = iteams.sort().filter(v => regex.test(v));
        }


        this.setState(() => ({
            suggestions,
            text:value
        }));
        
    } catch{

    }
   
 }
 
 
 suggestionSelected=(value)=>{
   this.setState(()=>({
     text:value,
     suggestions:[]
   }))
 }
 
 renderSuggestions = () => {
   const { suggestions } = this.state;
   console.log("suggestions :",suggestions);
   if (suggestions.length === 0) {
     return null;
   }
   return (
     <ul>
       {suggestions.map(city => <li key={city} onClick={(e)=>this.suggestionSelected(city)}>{city}</li>)}
     </ul>
   )
 }
 
 render() {
  const {text}=this.state
  const {placeholder_inp, id_inp} = this.props;
  return (
  <div className="TypeAheadDropDown">
    {/* <input onChange={this.onTextChange} placeholder="Search city name" value={text} type="text" /> */}
    <Input data-testid={id_inp} onChange={this.onTextChange} size={"lg"} type="text" variant={'filled'} id={id_inp} placeholder={placeholder_inp} value={text}/>
    {this.renderSuggestions()}
 </div>
);
}
 
}
