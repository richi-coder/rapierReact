import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', zIndex: 10, gap: '20px'}}>
        <Link to={'/fourlinksuspension'}>Four Link Suspension</Link>
        <Link to={'/linearsuspension'}>Linear Suspension</Link>
        <Link to={'/rigidvehicle'}>Rigid Vehicle (no suspension)</Link>
        <Link to={'/raycasting'}>Raycasting</Link>
    </div>
  )
}
