import React from 'react';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux';
import * as CartActions from '../../store/modules/cart/actions' 
import { formatPrice } from '../../util/format'

import { Container, ProductTable, Total } from './styles'

function Cart(){

    const total = useSelector(state => 
        formatPrice(state.cart.reduce(( total, product) => {
            return total + product.price * product.amount
        }, 0)
    ));

    const cart = useSelector(state => 
        state.cart.map(product => ({
            ...product,
            subtotal: formatPrice(product.amount * product.price)
        })
    ));

    const dispatch = useDispatch()

    function incrementAmount(id, amount){
        dispatch(CartActions.updateAmountRequest(id, amount))
    }

    function decrementAmount(id, amount){
        dispatch(CartActions.updateAmountRequest(id, amount))
    }

    return (
        <Container>
            <ProductTable>
                <thead>
                    <tr>
                        <th/>
                        <th>PRODUTO</th>
                        <th>QTD</th>
                        <th>SUBTOTAL</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(product => (
                        <tr key={product.id}>
                            <td>
                                <img 
                                    src={product.image}
                                    alt={product.title}
                                />
                            </td>
                            <td>
                                <strong>{product.title}</strong>
                                <span>{product.priceFormatted}</span>
                            </td>
                            <td>
                                <div>
                                    <button 
                                        type="button"
                                        onClick={() => decrementAmount(product.id, product.amount - 1)}
                                        >
                                        <MdRemoveCircleOutline size={20} color="#7159c1"/>
                                    </button>
                                    <input type="number" readOnly value={product.amount}/>
                                    <button 
                                        type="button" 
                                        onClick={() => incrementAmount(product.id, product.amount + 1)}
                                        >
                                        <MdAddCircleOutline size={20} color="#7159c1"/>
                                    </button> 
                                </div>
                            </td>
                            <td>
                                <strong>{product.subtotal}</strong>
                            </td>
                            <td>
                                <button 
                                    type="button"
                                    onClick={() => dispatch(CartActions.removeFromCart(product.id))}
                                    ><MdDelete color="#7159c1" size={20}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </ProductTable>
            <footer>
                <button type="button">Finalizar pedido</button>

                <Total>
                    <span>TOTAL</span>
                    <strong>{total}</strong>
                </Total>
            </footer>

        </Container>
    )
}

export default Cart;