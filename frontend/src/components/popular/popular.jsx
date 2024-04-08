import Item from "../items/item";
import "./popular.css"
import data_product from "../assets/data.js";
import { useState ,useEffect} from "react";

function Popular(){
    const [popular,setPopular] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await fetch("http://localhost:8080/popular",{
                    method:"GET"
                })
                const data = await res.json()
                if(data){
                    setPopular(data)
                }
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
    },[])
    return(
        <div className="popular">
            <h1>Popular In Women</h1>
            <hr/>
            <div className="popular-item">
                {popular.map((item,i)=>{
                    return <Item key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
                })}
            </div>
        </div>
    )
}
export default Popular;