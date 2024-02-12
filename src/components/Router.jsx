import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { RoutePath } from '../common/RoutePath';

const Router = () => {
  return (
    <Routes>
      <Route path={RoutePath.sample1.path} element={<RoutePath.sample1.component />} />
      <Route path={RoutePath.sample2.path} element={<RoutePath.sample2.component />} />
      <Route path={RoutePath.sample3.path} element={<RoutePath.sample3.component />} />
    </Routes>
  )
}

export default Router;