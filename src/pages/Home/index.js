import React, { Component } from 'react';

import { MdAddShoppingCart } from 'react-icons/md'

import { formatPrice }  from '../../util/format'

import { ProductList } from './styles'

import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

import * as CartActions from '../../store/modules/cart/actions'

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

    handleAddProduct = (id) => {
        const { addToCartRequest } = this.props;
        addToCartRequest(id)
    }

    render(){
        const { products } = this.state;
        const { amount } = this.props;
        return (
            <ProductList>
                {products.map(product => (
                    <li key={product.id}>
                        <img src={product.image} 
                        alt="tênis"/>
                        <strong>{product.title}</strong>
                        <span>{product.priceFormatted}</span>
                        <button type="button" onClick={() => this.handleAddProduct(product.id)}>
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
}

const mapDispatchToProps = dispatch => (
    bindActionCreators(CartActions, dispatch)
)

const mapStateToProps = state => ({
    amount: state.cart.reduce((amount, product) => {
        amount[product.id] = product.amount
        return amount
    }, {})
})



export default connect(mapStateToProps, mapDispatchToProps)(Home);