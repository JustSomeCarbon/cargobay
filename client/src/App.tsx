import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CargoUpload from './components/cargoUpload';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className='min-h-screen w-screen flex items-center justify-center'>
        <CargoUpload />
      </div>
    </QueryClientProvider>
  )
}

export default App
