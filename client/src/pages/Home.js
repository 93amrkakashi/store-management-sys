import { useEffect }from 'react'
import { useProductsContext} from "../hooks/useProductsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from '../components/WorkoutDetails'
// import WorkoutForm from '../components/WorkoutForm'

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
        {products && products.map((product) => (
          <WorkoutDetails key={product._id} product={product} />
        ))}
      </div>
      {/* <WorkoutForm /> */}
    </div>
  )
}

export default Home