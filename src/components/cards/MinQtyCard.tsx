import React from "react";

interface ProductProps {
    image:string,
    description:string,
    name:string
}

function MinQtyCard(props:ProductProps) {

    const styleObj:React.CSSProperties={
        width:'100%',
        marginBottom:'10px'
    }

    return(
        <div className="card" style={styleObj}>
            <img src={props.image} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.description}</p>
                </div>
        </div>
    )
}
export default MinQtyCard;