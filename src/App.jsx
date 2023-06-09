import './App.css';
import Board from './components/Board/Board';
import { COLORS } from './features/enums';
const App = () => {
  return (
    <div class="app">
      <Board bgc={COLORS.BOARD}/>
    </div>
  );
}

export default App;
