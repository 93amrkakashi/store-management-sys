import { useState } from "react"
import { useProductsContext } from "../hooks/useProductsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const ProductForm = () => {
  const { dispatch } = useProductsContext()
  const { user } = useAuthContext()

  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [initQty, setinitQty] = useState(0)
  const [currQty, setcurrQty] = useState(0)
  const [out, setout] = useState(0)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const Product = {name, description, initQty }

    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      body: JSON.stringify(Product),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setname('')
      setdescription("")
      setinitQty(0)
      setcurrQty(0)
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_PRODUCTS', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Product</h3>

      <label>Product name:</label>
      <input 
        type="text"
        onChange={(e) => setname(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>initQty:</label>
      <input 
        type="number"
        onChange={(e) => setinitQty(e.target.value)}
        value={initQty}
        className={emptyFields.includes('initQty') ? 'error' : ''}
      />

      <label>description:</label>
      <input 
        type="text"
        onChange={(e) => setdescription(e.target.value)}
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ProductForm