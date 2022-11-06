import ApexChart from 'apexcharts'
import ReactApexChart from "react-apexcharts"; 
import { useEffect, useState } from "react";
import axios from "axios";

function Chart(){
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("도넛");
  const [chartTypeData, setChartTypeData] = useState([]);
  const chartData = (data) => {
    if(chartType == "도넛"){
      const chartDataArr = []; 
      for(var i = 0; i < data.products.length; i++){
        const chart = {
          series: [],
          options: {
            chart: {
              type: 'donut',
            },
            legend: {
              position: 'bottom'
            },
            responsive: [{
              breakpoint: 480,
            }],
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    total: {
                      showAlways: true,
                      show: true,
                      label: 'Total',
                      fontSize: '15px',
                      color: 'black'
                    },
                    value: {
                      fontSize: '22px',
                      show: true,
                      color: 'black',
                    },
                  },
                }
              }
            },
            labels: [],
            title: {
              text: data.products[i].proKindName + '통계',
              align: 'center'
            },
          },
        }
        for(var j = 0; j < data.products[i].info.length; j++){
          chart.options.labels.push(data.products[i].info[j].proName);
          chart.series.push(data.products[i].info[j].quan);
        }
        chartDataArr.push(chart);
      }
      setChartTypeData(chartDataArr);
    }
  }
  const getData = async (type) => {
      const btnType = {};
      btnType.type = type;
      await axios.post("http://localhost:4000/admin/chart", btnType)
        .then((response) => {
            if(response.data != "fail"){
              setData(response.data);
              chartData(response.data);
              console.log(response.data);
            }else{alert("DB Error.")}
      });
      
  };
  useEffect(() => {
      getData("상품종류");
  }, [])

  const onClickBtn = (e) => {
    if(e.innerHTML == "년/월"){

      e.innerHTML = "상품종류";
    }else if(e.innerHTML == "상품종류"){
      e.innerHTML = "년/월";
    }
  }
  
  return (
      <div>
          <button onClick={(e) => onClickBtn(e)}>년/월</button>
          <div id="chart" style={{display : "flex", justifyContent: "flex-start"}}>
            {
              chartTypeData.map(chart => {
                return(
                  <ReactApexChart 
                    options={chart.options}
                    series={chart.series}
                    type="donut" 
                    width="500"
                  />
                );
              })
            }
              
          </div>
      </div>
  )
};
export default Chart;