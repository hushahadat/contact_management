import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { NavBar } from "../NavBar/NavBar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Card from "react-bootstrap/Card";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJs.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

function Dashboard() {
  const [dataa, setData] = useState([]);
  const { data: Country_Specific_data } = useQuery(["Cdata"], () => {
    return Axios.get("https://disease.sh/v3/covid-19/countries").then(
      (res) => res.data
    );
  });

  const { data: World_wide_data } = useQuery(["Wdata"], () => {
    return Axios.get("https://disease.sh/v3/covid-19/all").then(
      (res) => res.data
    );
  });
  const { data: graphData } = useQuery(["Gdata"], () => {
    return Axios.get(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    ).then((res) => res.data);
  });
  const customIcon = new Icon({
    iconUrl: require("../assets/placeholder.png"),
    iconSize: [38, 38],
  });
  //CHATJS
  let data = [];
  const labels = [];
  let dataSet = [];
  let grap_data;
  const randomBetween = (min, max) =>
    min + Math.floor(Math.random() * (max - min + 1));

  {
    graphData &&
      Object.entries(graphData)?.forEach((element) => {
        Object.entries(element[1])?.map(
          (ele) => (data?.push(ele[1]), labels?.push(ele[0]))
        );
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 255);
        const rgb = `rgb(${r},${g},${b})`;
        const r1 = randomBetween(0, 255);
        const g2 = randomBetween(0, 255);
        const b3 = randomBetween(0, 255);
        const rgb1 = `rgb(${r1},${g2},${b3})`;

        let obj = {
          label: element[0],
          data: data,
          borderColor: rgb1,
          backgroundColor: rgb,
        };
        dataSet.push(obj);
      });
    grap_data = {
      labels: labels,
      datasets: dataSet,
    };
  }

  return (
    <>
      <div className="main-conatiner">
        <div className="container-left">
          <NavBar />
        </div>
        <div className="container-mapright">
          <div className="map-container">
            <h3>Map</h3>
            <MapContainer center={[34.0479, 100.6197]} zoom={13}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerClusterGroup>
                {Country_Specific_data &&
                  Country_Specific_data.map((ele) => (
                    <Marker
                      position={[ele.countryInfo?.lat, ele.countryInfo?.long]}
                      icon={customIcon}
                    >
                      <Popup>
                        <Card.Img variant="top" src={ele.countryInfo?.flag} />
                        Countary Name : {ele.country} <br /> active {ele.active}{" "}
                        <br /> cases :{ele.cases}
                        <br /> deaths: {ele.deaths}
                        <br /> critical :{ele.critical}
                        <br /> todayCases :{ele.todayCases}
                        <br /> todayDeaths:{ele.todayDeaths}
                        <br /> todayRecovered :{ele.todayRecovered}
                      </Popup>
                    </Marker>
                  ))}
              </MarkerClusterGroup>
            </MapContainer>
          </div>
          <br />
          <br />

          <div className="graph-container">
            <h3>Graph</h3>
            <Line data={grap_data} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
