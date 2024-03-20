
import React, { useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import AxiosInstance from '../config/axiosInstance.ts';
import {storage} from '../config/firebase.ts';
import '../App.css';

interface Product{
    _id:string,
    name:string,
    description:string,
    image:string
    unitPrice:number
    qtyOnHand:number
}

const Product:React.FC = ()=>{
    const [products, setProducts]=useState<Product[]>([]);
    const [loadModalState, setLoadModalState]=useState<boolean>(false);
    const [viewModalState, setViewModalState]=useState<boolean>(false);
    const [searchText,setSearchText] = useState("");

    const [image, setImage]=useState<File | null>(null);
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [unitPrice,setUnitPrice]=useState<number | ''>('');
    const [qtyOnHand,setQtyOnHand]=useState<number | ''>('');

    const [selectedProductId,setSelectedProductId]=useState('');
    const [updateName,setUpdateName]=useState('');
    const [updateDescription,setUpdateDescription]=useState('');
    const [updateImage,setUpdateImage]=useState('');
    const [updateQtyOnHand,setUpdateQtyOnHand]=useState<number | ''>('');
    const [updateUnitPrice,setUpdateUnitPrice]=useState<number | ''>('');
    
    

    const handleFile = async (event:React.ChangeEvent<HTMLInputElement>)=>{
        //setImage(event.target.files[0]);
        if (event.target.files && event.target.files.length > 0) {
            setImage(event.target.files[0]);
        }
    }

    useEffect(()=>{
        findAllProducts();
    }, [searchText]);

    const updateProduct= async ()=>{
        try{ 
             await AxiosInstance.put('http://localhost:3000/api/v1/products/update/'+selectedProductId,{
            name:updateName,
            description:updateDescription,
            image:updateImage,
            qtyOnHand:updateQtyOnHand,
            unitPrice:updateUnitPrice
            
        });
        setLoadModalState(false);
        findAllProducts();

    }catch (e){
            console.log(e)
        }    
    }

    const findAllProducts= async ()=>{
        const response = await AxiosInstance.get('/products/find-all?searchText=&page=1&size=10');
        setProducts(response.data);
    }

    const deleteProduct= async (id: string)=>{
        await AxiosInstance.delete('/products/delete-by-id/'+id);
        findAllProducts();
    }

    const loadModal= async (id:string)=>{
        const product = await AxiosInstance.get('/products/find-by-id/'+id);
        console.log(product.data)
        setSelectedProductId(product.data._id)
        setUpdateName(product.data.name)
        setUpdateDescription(product.data.description)
        setUpdateImage(product.data.image)
        setUpdateQtyOnHand(parseFloat(product.data.qtyOnHand))
        setUpdateUnitPrice(parseFloat(product.data.unitPrice))
        
        setLoadModalState(true);
    }

    const viewModal= async (id:string)=>{
        const product = await AxiosInstance.get('/products/find-by-id/'+id);
        console.log(product.data)
        setSelectedProductId(product.data._id)
        setName(product.data.name)
        setDescription(product.data.description)
        setQtyOnHand(parseFloat(product.data.qtyOnHand))
        setUnitPrice(parseFloat(product.data.unitPrice))
        
        setViewModalState(true);
    }

    const searchProduct = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const response = await AxiosInstance.get(`/products/find-all?searchText=${searchText}&page=1&size=10`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error searching customers:', error);
    }
}


    const saveProduct=async ()=>{
        let imageUrl='https://cdn.4imprint.com/qtz/homepage/categories/images21/drinkware0222.jpg';
         if(image){
            try {
                const storageRef = storage.ref();
                const imageRef = storageRef.child(`images/${Math.random()+'-'+image.name}`);
                const snapshot= await imageRef.put(image);
                imageUrl=await snapshot.ref.getDownloadURL();
            }catch (e) {
                console.log(e)
            }
    }
        try{
            await AxiosInstance.post('/products/create',{
                name,description,unitPrice,qtyOnHand,image:imageUrl
            });

            setName('');
            setDescription('');
            setQtyOnHand('');
            setUnitPrice('');

            findAllProducts();

        }catch (e){
            console.log(e)
        }
    }

    const styleObj:React.CSSProperties={
        marginBottom:'20px'
    }

return (
 <>
     <br/>

     <div className="container">
         <div className="row">
             <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                 <div className="form-group">
                     <label htmlFor="productName">Product Name</label>
                     <input value={name} type="text" onChange={(e)=>setName(e.target.value)} className='form-control' id='productName'/>
                 </div>
             </div>
             <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                 <div className="form-group">
                     <label htmlFor="price">Unit Price</label>
                     <input value={unitPrice} type="number" onChange={(e)=>setUnitPrice(parseFloat(e.target.value))} className='form-control' id='price'/>
                 </div>
             </div>
             <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                 <div className="form-group">
                     <label htmlFor="qty">QTY On Hand</label>
                     <input value={qtyOnHand} type="number"  onChange={(e)=>setQtyOnHand(parseFloat(e.target.value))} className='form-control' id='qty'/>
                 </div>
             </div>
             <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                 <div className="form-group">
                     <label htmlFor="image">Product Image</label>
                     <input onChange={handleFile} type="file" className='form-control' id='image'/>
                 </div>
             </div>
             <div className="col-12">
                 <div className="form-group">
                     <label htmlFor="description">Description</label>
                     <textarea value={description} rows={2} onChange={(e)=>setDescription(e.target.value)} className='form-control' id='description'/>
                 </div>
             </div>

         </div>
         <br/>
         <div className="row">
             <div className="col-6">
                 <button className='btn btn-primary col-6' onClick={saveProduct}>Save Product</button>
             </div>
         </div>
         <hr/><br />
         <form className="d-flex" role="search" onSubmit={searchProduct}>
                <input className="form-control me-2"  placeholder="Search Product here" value={ searchText } onChange={(e) => setSearchText(e.target.value)} type="search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
        </form><br />
         <div className="row">
             <div className="col-12">

                 <table className='table table-hover table-bordered table-info table-border'>
                     <thead>
                     <tr>
                         <th>ID</th>
                         <th>Product Name</th>
                         <th>QTY On Hand</th>
                         <th>Unit Price</th>
                         <th>Delete Option</th>
                         <th>Update Option</th>
                         <th>See more</th>
                     </tr>
                     </thead>
                     <tbody>
                     {products.map((product, index)=>
                     <tr key={index}>
                         <td>{index}</td>
                         <td>{product.name}</td>
                         <td>{product.qtyOnHand}</td>
                         <td>{product.unitPrice}</td>
                         <td>
                             <button className='btn btn-danger btn-sm'
                             onClick={()=>{
                                if(confirm('are you sure?')){
                                    deleteProduct(product._id)
                            } }}>Delete</button>
                         </td>
                         <td>
                             <button className='btn btn-success btn-sm'  
                             onClick={()=>{
                                    loadModal(product._id);
                                }}>Update</button>
                         </td>
                         <td>
                             <button className='btn btn-info btn-sm'  
                             onClick={
                                ()=>{viewModal(product._id)}}>View</button>
                         </td>
                     </tr>
                         )}
                     </tbody>
                 </table>

             </div>
         </div>
     </div>

     {/*==============================*/}

        <Modal show={loadModalState}>

        <div className='p-4'>
            <h2 className="text-center heading">Update Product</h2> <br />

            <div className="mb-3 row">
            <label className="col-sm-4 col-form-label">Product Name</label>
                <div className="col-sm-8">
                <input type="text" defaultValue={updateName}
                   onChange={(e)=>setUpdateName(e.target.value)}
                   className='form-control'/> 
                </div>
            </div>
            <br />

            <div className="mb-3 row">
            <label className="col-sm-4 col-form-label">Description</label>
                <div className="col-sm-8">
                <input type="text" defaultValue={updateDescription} className='form-control'
                onChange={(e)=>setUpdateDescription(e.target.value)}/>
                </div>
            </div>
            <br />

            <div className="mb-3 row">
            <label className="col-sm-4 col-form-label">Image</label>
                <div className="col-sm-8">
                <input onChange={handleFile} type="file" className='form-control' id='image'/>
                </div>
            </div>
            <br />

            <div className="mb-3 row">
            <label className="col-sm-4 col-form-label">Qty On Hand</label>
                <div className="col-sm-8">
                <input type="text" defaultValue={updateQtyOnHand}
                   onChange={(e)=>setUpdateQtyOnHand(parseInt(e.target.value))}
                   className='form-control'/>
                </div>
            </div>
            <br />

            <div className="mb-3 row">
            <label className="col-sm-4 col-form-label">Unit Price</label>
                <div className="col-sm-8">
                <input type="text" defaultValue={updateUnitPrice}
                   onChange={(e)=>setUpdateUnitPrice(parseFloat(e.target.value))}
                   className='form-control'/>
                </div>
            </div>
            <br />

    
    <div className="col-12">
        <button type='button' className='btn-success btn col-12'
                onClick={()=>updateProduct()}
        >Update Product</button>
        <br/>
        <br/>
        <button type='button' className='btn-warning btn col-12' onClick={()=>setLoadModalState(false)}>Close Modal</button>
    </div>

</div>

        </Modal>


    {/*==============================*/}

    {/*==============================*/}

    <Modal show={viewModalState}>
    <div className="p-4" tabIndex={-1}>
    <div className="modal-dialog">
        <div className="modal-content">
         <div className="modal-header">
            <h5 className="modal-title">Product Details</h5>
             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
        <div className="modal-body">
        <div className="mb-3 row">
        <label className="col-sm-4 col-form-label">Product Name</label>
            <div className="col-sm-8">
            <input type="text" defaultValue={name}
               onChange={(e)=>setName(e.target.value)}
               className='form-control'/> 
            </div>
        </div>
        <br />
        <div className="mb-3 row">
        <label className="col-sm-4 col-form-label">Description</label>
            <div className="col-sm-8">
            <input type="text" defaultValue={description} className='form-control'
            onChange={(e)=>setDescription(e.target.value)}/>
            </div>
        </div>
        <br />
        <div className="mb-3 row">
        <label className="col-sm-4 col-form-label">Qty On Hand</label>
            <div className="col-sm-8">
            <input type="text" defaultValue={qtyOnHand}
               onChange={(e)=>setQtyOnHand(parseInt(e.target.value))}
               className='form-control'/>
            </div>
        </div>
        <br />
        <div className="mb-3 row">
        <label className="col-sm-4 col-form-label">Unit Price</label>
            <div className="col-sm-8">
            <input type="text" defaultValue={unitPrice}
               onChange={(e)=>setUnitPrice(parseFloat(e.target.value))}
               className='form-control'/>
            </div>
        </div>
        <br />
        </div>
        <div className="modal-footer">
             <button type="button" className="btn btn-danger"  onClick={()=>setViewModalState(false)}>Close</button>
        </div>
        </div>
    </div>
</div>
</Modal>

    {/*==============================*/}


 </>
)
}
export default Product;