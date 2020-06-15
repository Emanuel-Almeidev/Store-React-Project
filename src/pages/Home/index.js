import React, { Component } from 'react';

import { MdAddShoppingCart } from 'react-icons/md'

import { formatPrice }  from '../../util/format'

import { ProductList } from './styles'

import api from '../../services/api'

class Home extends Component{

    state = {
        products: [],
    }

    async componentDidMount(){
        const response = await api.get('/products')

        const data = response.data.map(product => ({
            ...product,
            priceFormatted: formatPrice(product.price) 
        }))
        
        this.setState({
            products: data,
        })
    }

    

    render(){
        const { products } = this.state;
        return (
            <ProductList>
                {products.map(product => (
                    <li key={product.id}>
                        <img src={product.image} 
                        alt="tênis"/>
                        <strong>{product.title}</strong>
                        <span>{product.priceFormatted}</span>
                        <button type="button">
                            <div>
                                <MdAddShoppingCart color="#fff" size={16}/> 3
                            </div>
                            <span>Adicionar ao carrinho</span>
                        </button>
                    </li>
                ))}

    
            </ProductList>
        )
    }
}

export default Home;