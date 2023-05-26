import { useEffect }from 'react'
import { useProductsContext} from "../hooks/useProductsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from '../components/WorkoutDetails'
import ProductForm from '../components/ProductForm'

const Home = () => {
  const {products, dispatch} = useProductsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5000/api/products', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_PRODUCTS', payload: json})
      }
    }

    if (user) {
      fetchProducts()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
      <table className="min-w-full bg-gray-800 text-white text-left">
  <thead>
    <tr>
      <th className="px-4 py-2 border-b border-l border-t ">Name</th>
      <th className="px-4 py-2 border-b border-l border-t ">QTY</th>
      <th className="px-4 py-2 border-b border-l border-t ">Avail</th>
      <th className="px-4 py-2 border-b border-l border-t ">Edit</th>
      <th className="px-4 py-2 border-b border-l border-t ">Delete</th>
    </tr>
  </thead>
        {products && products.map((product) => (
          <WorkoutDetails key={product._id} product={product} />
        ))}
        </table>
      </div>
      <ProductForm />
    </div>
  )
}

export default Home