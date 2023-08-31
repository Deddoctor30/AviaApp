import Filter from "./components/filters/Filter";
import Main from "./components/main/Main";
import './styles/_global.scss';
import './App.scss';
import { useEffect, useState } from "react";
import { useHttp } from "./hooks/http.hoock";
import { IFlights } from "./types/flights";

function App() {
  const [data, setData] = useState<IFlights[] | []>([])
  const [filterValue, setFilterValue] = useState<any>({})
  const {request} = useHttp();
  useEffect(() => {
    request('http://localhost:5000/result')
       .then(data => setData(data.flights))
       .catch(error => console.log(error))
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])


  return (
      <div className="wrapper">
        <div className="container">
          <section className="fly">
            {data.length === 0 
              ?
                <h1 className="fly__loading">Идет загрузка...</h1>
              :
                <>
                  <Filter data={data} setFilter={setFilterValue}/>
                  <Main data={data} getFilter={filterValue}/>
                </>
            }
          </section>
        </div>
      </div>
  );
}

export default App;
