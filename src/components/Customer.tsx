import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import AxiosInstance from '../config/axiosInstance.ts';
import '../App.css';

interface Customer{
    _id:string,
    name:string,
    address:string,
    salary:number
}

const Customer:React.FC = ()=>{

    const [customers, setCustomers]=useState<Customer[]>([])
    const [modalState, setModalState]=useState<boolean>(false);

    const [name,setName]=useState('');
    const [address,setAddress]=useState('');
    const [salary,setSalary]=useState<number | ''>('');

    const [selectedCustomerId,setSelectedCustomerId]=useState('');
    const [updateName,setUpdateName]=useState('');
    const [updateAddress,setUpdateAddress]=useState('');
    const [updateSalary,setUpdateSalary]=useState<number | ''>('');

    useEffect(()=>{
        findAllCustomers();
    }, [])


    const updateCustomer= async ()=>{
        try{

            await AxiosInstance.put('/customers/update/'+selectedCustomerId,{
                name:updateName,address:updateAddress,salary:updateSalary
            });
            setModalState(false);
            findAllCustomers();

        }catch (e){
            console.log(e)
        }
    }

    const findAllCustomers= async ()=>{
        const response = await AxiosInstance.get('/customers/find-all?searchText=&page=1&size=10');
        console.log(response.data);
        
        setCustomers(response.data);
    }

    const deleteCustomer= async (id :string)=>{
        await AxiosInstance.delete('/customers/delete-by-id/'+id);
    }

    const loadModal= async (id:string)=>{
        const customer = await AxiosInstance.get('/customers/find-by-id/'+id);
        console.log(customer.data)
        setSelectedCustomerId(customer.data._id)
        setUpdateName(customer.data.name)
        setUpdateAddress(customer.data.address)
        setUpdateSalary(parseFloat(customer.data.salary))
        
        setModalState(true);
    }

    const saveCustomer= async ()=>{
        try{
            const response = await AxiosInstance.post('/customers/create',{
                name,address,salary
            });
            console.log(response);

            setName('');
            setSalary('');
            setAddress('');

        }catch (e){
            console.log(e)
        }
    }

    return (
        <>
        <br/>

    <div className="container">
        <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
                <div className="form-group">
                    <label htmlFor="customerName">Customer Name</label>
                    <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" className='form-control' id='customerName'/>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
                <div className="form-group">
                    <label htmlFor="customerAddress">Customer Address</label>
                    <input value={address} onChange={(e)=>{setAddress(e.target.value)}}  type="text" className='form-control' id='customerAddress'/>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
                <div className="form-group">
                    <label htmlFor="customerSalary">Salary</label>
                    <input value={salary} onChange={(e)=>{setSalary(e.target.value==''?'':parseFloat(e.target.value))}} type="number" className='form-control' id='customerSalary'/>
                </div>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-6">
                <button onClick={saveCustomer} className='btn btn-primary col-4'>Save Customer</button>
            </div>
            </div>
        <hr/><br />
        <div className="row">
            <div className="col-12">
                <form className='col-12'>
                    <input type="search" className='form-control' placeholder='Search Customers here'/>
                </form>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-12">

                <table className='table table-hover table-bordered table-primary table-border'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer Name</th>
                        <th>Address</th>
                        <th>Salary</th>
                        <th>Delete Option</th>
                        <th>Update Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer, index)=>
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td>{customer.salary}</td>
                            <td>
                                <button
                                    onClick={()=>{
                                        if (confirm('are you sure?')){
                                            deleteCustomer(customer._id)
                                        }}}
                                    className='btn btn-outline-danger btn-sm'>Delete</button>
                            </td>
                            <td>
                                <button onClick={()=>{
                                    loadModal(customer._id);
                                }} className='btn btn-outline-success btn-sm'>Update</button>
                            </td>
                        </tr>
                    )}

                    </tbody>
                </table>

            </div>
        </div>
    </div>

            {/*==============================*/}

            <Modal show={modalState}>

                <div className='p-4'>
                    <h2>Update Customer</h2>
                    <hr/>

                    <div className="col-12">
                        <div className="form-group">
                            <input type="text" defaultValue={updateName}
                                   onChange={(e)=>setUpdateName(e.target.value)}
                                   className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdateAddress(e.target.value)}
                                type="text" defaultValue={updateAddress} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdateSalary(parseFloat(e.target.value))}
                                type="text" defaultValue={updateSalary} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <button type='button' className='btn-success btn col-12'
                                onClick={()=>updateCustomer()}
                        >Update Customer</button>
                        <br/>
                        <br/>
                        <button type='button' className='btn-secondary btn col-12' onClick={()=>setModalState(false)}>Close Modal</button>
                    </div>

                </div>

            </Modal>


            {/*==============================*/}

</>
    )
}

export default Customer;