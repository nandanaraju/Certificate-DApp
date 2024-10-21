import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route } from "react-router-dom"
import IndexPage from "./pages/IndexPage"
import ViewPage from "./pages/ViewPage"
import IssuePage from "./pages/IssuePage"
import MainLayout from "./layouts/MainLayout"

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/'element={<MainLayout/>}>
      <Route path='/' element={<IndexPage />} />
      <Route path='/issue' element={<IssuePage/>}/>
      <Route path='/view/:id' element={<ViewPage/>}/>
      
      </Route>


    </>


  ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
