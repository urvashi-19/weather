import { useState } from "react";
import "./App.css";
import sun from "./sun.png";
import sun1 from "./sun (1).png";
import cloudy from "./cloudy-day.png";
import haze from "./haze.png";
import rainy from "./rainy-day.png";
import storm from "./storm.png";

var id   ;
function App(props) {
  const [city, setCity] = useState("Delhi");
  const [search, setSearch] = useState("Delhi");
  const [temp, setTemp] = useState("28°C");
  const [desc, setDesc] = useState("");
  const [weathers, setweathers] = useState({});

  const valueofsearchbox = (event) => {
    setSearch(event.target.value);
  };
    const tellme = () => {
    let a = " " + search;
      let b = a.length;
      let c = "";
      for (let i = 0; i < b; i++) {
        if (a.charAt(i) == " ") {
          c = c + a.charAt(i + 1).toUpperCase();
        } else if (a.charAt(i) != " ") {
          c = c + a.charAt(i + 1);
        }
      }
    setCity(c);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=4fc29c297a8262f72916963077e74a0e`
    )
      .then((apidata) => {
        let actualdata = apidata.json();
        return actualdata;
      })
      .then((actualdata) => {
        console.log(actualdata);
        setweathers(actualdata);
        let temp = Math.round(actualdata.main.temp);
        id=actualdata.weather[0].id;
        console.log(id);
        setTemp(temp - 273 + "°C");
      })
      .catch((error) => {
        setTemp("place does not exsist");
      });
  };
  return (
    <>
   <section className={(typeof weathers.main != undefined)?((id>=600)?'body': (id>=500)?'rainy':(id>=400)?'rainy':(id>=300)?'cloudy':(id>=200)?'storm':'body'):'body'}>
        <div className="col-md-12">
          <div className="wetherBg">
            <h1 className="heading">WEATHER APP</h1>
            <div className="d-grid  gap-3 col-4 mt-4">
              <input
                style={{ color: "black" }}
                onChange={valueofsearchbox}
                className="form-control"
              />
              <button onClick={tellme} className="btn btn-primary" type="button">Search</button>
            </div>
          </div>

          <div className="col-md-12 text-center">
            <div className="shadow rounded wetherResultBox">
              <img className="icon" src={(typeof weathers.main != undefined)?((id>=700)?sun:(id>=600)?sun1:(id>=500)?rainy:(id>=400)?rainy:(id>=300)?cloudy:(id>=200)?storm:sun):sun} />
              <h1 className="city">{city}</h1>
              <h1 className="temp">{temp}</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;