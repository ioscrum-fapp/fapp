import React, { Component } from 'react'
import { Outlet, Link } from "react-router-dom";
import '../styles/Layout.css'

export default class Layout extends Component {
  render() {
    return (
        <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/statistics">Statistics</Link>
            </li>
            <li>
              <Link to="/placeholder">Placeholder</Link>
            </li>
          </ul>
        </nav>
  
        <Outlet />
      </>
    )
  }
}
