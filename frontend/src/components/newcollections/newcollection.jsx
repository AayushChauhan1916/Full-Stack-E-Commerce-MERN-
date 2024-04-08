import "./newcollection.css"
import Item from "../items/item"
import { useEffect, useState } from "react";


function Newcollections(){
    const[new_collections,setNewCollection] = useState([])
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await fetch("http://localhost:8080/newcollection",{
                    method:"GET"
                })
                const data = await res.json()
                if(data){
                    setNewCollection(data)
                }
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
    },[])
    return(
        <div className="new-collections">
            <h1>New Collections</h1>
            <hr />
            <div className="collections">
                {new_collections.map((item,i)=>{
                    return <Item key={i} image={item.image} name={item.name} old_price={item.old_price} new_price={item.new_price} id={item.id} />
                })}
            </div>
        </div>
    )
}

export default Newcollections;