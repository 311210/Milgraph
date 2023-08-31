import { Link, useMatch, useResolvedPath } from "react-router-dom"
import React  from 'react';
export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Milgraph
      </Link>
      <ul>
        <CustomLink to="/Converter">Graph Converter</CustomLink>
        <CustomLink to="/Visualization">Graph Visualization</CustomLink>
        <CustomLink to="/What">What is Graph ?</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}