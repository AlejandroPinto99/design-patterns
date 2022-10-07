import TestingProxy from "./patterns/ProxyPattern/proxy";
import TestingProvider from "./patterns/ProviderPattern/provider";
import TestingThemeProvider from "./patterns/ProviderPattern/themeProvider";
import TestingPrototype from './patterns/PrototypePattern/prototype'
import { GetPokeData, RenderPokemonWithHook } from './patterns/PresentationalPattern/presentational'

const App = () => {
  return (
    <div className="App">
      {/* <TestingProxy /> */}

      <GetPokeData />
      <RenderPokemonWithHook />
    </div>
  );
}

export default App;
