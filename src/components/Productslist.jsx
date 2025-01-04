import { useEffect, useState } from "react"

export function Productslist(){
    const [products, setProducts] = useState([])
    const [url, setUrl] =useState("http://localhost:8000/products")
    const [counter, setCounter] = useState(10000)
    const [Available, setAvailable] = useState(0)

    useEffect(()=>{
        fetch(url)
        .then(response => response.json())
        .then(data => setProducts(data));
    },[url, counter])

    useEffect(()=>{
        const count = products.filter(product => product.in_stock).length;
        setAvailable(count)
    },[products])
    
    const handleCounter =()=>{
        if(counter >=10000 && counter < 10020){
            setCounter(counter+1)
            setUrl(`http://localhost:8000/products?id=${counter+1}`)
        } else {
            setCounter(10001)
            setUrl(`http://localhost:8000/products?id=10001`)
        }
        
    }

    const handleAll = ()=>{
        setUrl("http://localhost:8000/products")
        setCounter(10000)
    }

    const handleAvailable = ()=>{
        setUrl("http://localhost:8000/products?in_stock=true")
        setCounter(10000)
    }
    
    
    return(
        <section>
    <div className="btn">
        <button onClick={handleAll}>All ({products.length})</button>
        <button onClick={handleAvailable}>Available ({Available})</button>
        <button onClick={handleCounter}>{counter}/10020</button>
    </div>
    {products.map((product) => (
        <div className="card" key={product.id}>
            <p className="id">{product.id}</p>
            <div className="img_des">
                <img src={product.img_url} alt="" />
                <p>{product.img_description}</p>
            </div>
            <p className="productName">{product.course_name}</p>
            <p className="price">
                <span>${product.price}</span>
                <span className={product.in_stock ? "Available" : "NotAvailable"}>
                    {product.in_stock ? "Available" : "Not Available"}
                </span>
            </p>
        </div>
    ))}
</section>

    )
}