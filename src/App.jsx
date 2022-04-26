import { MultipleContainers } from './components/MultipleContainers'
import { rectSortingStrategy } from '@dnd-kit/sortable'

function App() {
  return (
    <div className='App'>
      <MultipleContainers
        columns={6}
        strategy={rectSortingStrategy}
        wrapperStyle={() => ({
          width: 50,
          height: 50,
        })}
        vertical={true}
        itemCount={17}
        // scrollable={true}
      />
    </div>
)}

export default App 