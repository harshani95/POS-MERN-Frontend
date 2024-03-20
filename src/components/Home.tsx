import DefaultCard from "./cards/DefaultCard.tsx";
import DefaultChart from "./cards/DefaultChart.tsx";
import MinQtyCard from "./cards/MinQtyCard.tsx";
import AxiosInstance from '../config/axiosInstance.ts';
import React, {useEffect, useState} from "react";
import Product from "./Product.tsx";

const  Home:React.FC = ()=>{
    const[products, setProducts]=useState<Product[]>([]);
    const[productCount,setProductCount]=useState<number>(0);
    const[orderCount,setOrderCount]=useState<number>(0);
    const[customerCount,setCoustomerCount]=useState<number>(0);
    const[income,setIncome]=useState<number>(0);

    useEffect(()=>{
        findAllProducts();
        findAllCounts();
    }, [])

    const findAllProducts= async ()=>{
        const response = await AxiosInstance.get('/products/find-all-min');
        setProducts(response.data);
    }

    const findAllCounts= async ()=>{
        const productCount = await AxiosInstance.get('/products/find-all-count');
        setProductCount(productCount.data);

        const customerCount = await AxiosInstance.get('/customers/find-count');
        setCoustomerCount(customerCount.data);

        const orderCount = await AxiosInstance.get('/orders/find-count');
        setOrderCount(orderCount.data);

        const income = await AxiosInstance.get('/orders/find-income');
        setIncome(income.data.totalCostSum)
    
    }

    return (
        <>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-photo/female-friends-out-shopping-together_53876-25041.jpg?t=st=1710940189~exp=1710943789~hmac=cbf1de7ce40cd180617a77f8b755cc8c15c9833689488248f32a408581e661c2&w=740'
                            description='All Customers in System'
                            title='Customers'
                            value={customerCount}
                            key={1}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-vector/t-shirt-print-demand-services-promotional-apparel-design-merch-clothing-custom-merchandise-products-merch-design-service-concept_335657-124.jpg?size=626&ext=jpg&ga=GA1.2.1010534045.1685872185&semt=sph'
                            description='All Products in System '
                            title='Products'
                            value={productCount}
                            key={1}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/premium-photo/black-friday-composition-with-three-bags-cart_23-2147709333.jpg?w=740'
                            description='All Orders in System '
                            title='Orders'
                            value={orderCount}
                            key={1}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-photo/person-carrying-lot-cash_53876-65367.jpg?w=740&t=st=1702482890~exp=1702483490~hmac=2f80e70d6f5d8949c51877db9816a9fae2fcb07d8a7d3bbec21df8acde8e1be2'
                            description='All Income in System '
                            title='Income'
                            value={income}
                            key={1}
                        />
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12 col-md-9">
                        <div className="context">
                            <DefaultChart/>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        {products.map((prod,index)=>(
                            <MinQtyCard name={prod.name} image={prod.image} description={prod.description} key={index} />
                        ))}

                    </div>
                </div>
            </div>

        </>
    )
}
export default Home;