import { useProductsContext} from '../hooks/useProductsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ product }) => {
  const { dispatch } = useProductsContext()
  const { user } = useAuthContext()
console.log(product)
  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('http://localhost:5000/api/products/' + product._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_PRODUCTS', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{product.name}</h4>
      {/* <p><strong>Load (kg): </strong>{product.load}</p> */}
      {/* <p><strong>Reps: </strong>{workout.reps}</p> */}
      <p>{formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails