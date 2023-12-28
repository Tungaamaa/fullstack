import React from 'react'
import { useServiceContext } from '../../context/ServiceContext'
import { Header } from '../../component';

export const Services = () => {

    const { services } = useServiceContext();

    if (!services) {
        return <div>services not found</div>;
    }
  return (
    <div>
    <Header/>
    <div>
    <h1> this is services page</h1>
    </div>

    <div>
    {services && services.map((service) => (
        <div>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <p>{service.price}</p>
        <p>{service.category}</p>
        </div>
    ))}
    </div>
    
    
    </div>
  )
}
