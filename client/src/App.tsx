import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CargoUpload from './components/cargoUpload';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className='body'>
        <CargoUpload />
      </div>
    </QueryClientProvider>
  )
}

export default App
