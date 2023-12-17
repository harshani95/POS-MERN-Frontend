import React from "react";

function MinQtyCard() {

    const styleObj:React.CSSProperties={
        width:'100%',
        marginBottom:'10px'
    }

    return(
        <div className="card" style={styleObj}>
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}
export default MinQtyCard;