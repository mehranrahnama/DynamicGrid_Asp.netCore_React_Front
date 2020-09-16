import React from 'react' 
import LOV from '../../common/LOV/LOV'
import SeedTable from './SeedTable'
export default function SeedLOV(props){
return(
    <LOV tableComponent={SeedTable}  valueToShow={"Name"} {...props} ></LOV>
)
}