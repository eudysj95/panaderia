import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Inicio } from '../layout/Inicio';
import { PrecioViveres } from '../layout/PrecioViveres';
import { PrecioPanaderia } from '../layout/PrecioPanaderia';
import { PreciosMayor } from '../layout/PreciosMayor';
import { Produccion } from '../layout/Produccion';

export const MyRoutes = () => {
  return (
    <div className='w-full bg-dark-bg min-h-screen px-4 sm:px-10 flex justify-center items-center'>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Inicio/>}/>
                <Route path='/viveres' element={<PrecioViveres/>}/>
                <Route path='/panaderia' element={<PrecioPanaderia/>}/>
                <Route path='/mayor' element={<PreciosMayor/>}/>
                <Route path='/produccion' element={<Produccion/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}
