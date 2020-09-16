import React from "react";

const SearchBox = (props) => {
  return (
    <>
      <div style={{width:"60%",float: 'right',marginLeft:"15px"}}>
        <input
          type="text"

          name="query"
          className="form-control my-3"
          
          placeholder="search"
          value={props.value}
          onChange={(e) => props.onChange(e.currentTarget.value)}
          onKeyDown={(e)=>{if (e.key=="Enter"){props.search()}}}
        /></div>
        <div style={{width:"25%",float: 'right'}}>
      <button  
      className="my-3 btn btn-outline-primary "
      style={{float:"right"}}
       onClick={props.search}>search</button>
       </div>
    </>
  );
};

export default SearchBox;
