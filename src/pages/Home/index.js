import React, { useState, useEffect } from 'react';

import { MdAddShoppingCart } from 'react-icons/md'

import { formatPrice }  from '../../util/format'

import { ProductList } from './styles'

import { useSelector, useDispatch } from 'react-redux'

import * as CartActions from '../../store/modules/cart/actions'

import api from '../../services/api'

function Home({ history }){

    const amount = useSelector(state => 
        state.cart.reduce((sumAmount, product) => {
            sumAmount[product.id] = product.amount
            return sumAmount
        }, {})
    )

    const dispatch = useDispatch()

    const [products, setProducts] = useState([])

    useEffect(() => {

        async function loadProducts(){
            const response = await api.get('/products')

            const data = response.data.map(product => ({
                ...product,
                priceFormatted: formatPrice(product.price) 
            }))

            setProducts(data)
        }
        loadProducts()
    }, [])

    function handleAddProduct(id){
        dispatch(CartActions.addToCartRequest(id, history))
    }

    
    return (
        <ProductList>
            {products.map(product => (
                <li key={product.id}>
                    <img src={product.image} 
                    alt="tênis"/>
                    <strong>{product.title}</strong>
                    <span>{product.priceFormatted}</span>
                    <button type="button" onClick={() => handleAddProduct(product.id)}>
                        <div>
                            <MdAddShoppingCart color="#fff" size={16}/> {amount[product.id] || 0}
                        </div>
                        <span>Adicionar ao carrinho</span>
                    </button>
                </li>
            ))}


        </ProductList>
    )
    
}

export default Home;