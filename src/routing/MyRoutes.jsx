import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Inicio } from '../layout/Inicio';
import { PrecioViveres } from '../layout/PrecioViveres';
import { PrecioPanaderia } from '../layout/PrecioPanaderia';
import { PreciosMayor } from '../layout/PreciosMayor';
import { Produccion } from '../layout/Produccion';
import { AppLayout } from '../components/AppLayout';

export const MyRoutes = () => {
  return (
        <BrowserRouter>
            <AppLayout>
                <Routes>
                    <Route path='/' element={<Inicio/>}/>
                    <Route path='/viveres' element={<PrecioViveres/>}/>
                    <Route path='/panaderia' element={<PrecioPanaderia/>}/>
                    <Route path='/mayor' element={<PreciosMayor/>}/>
                    <Route path='/produccion' element={<Produccion/>}/>
                </Routes>
            </AppLayout>
        </BrowserRouter>
  )
}
