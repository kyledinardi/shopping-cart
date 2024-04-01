import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='shop'>Shop</Link></li>
    </ul>
  )
}
