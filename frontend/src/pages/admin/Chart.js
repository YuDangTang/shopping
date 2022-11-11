import ApexChart from 'apexcharts'
import ReactApexChart from "react-apexcharts"; 
import { useEffect, useState } from "react";
import axios from "axios";

function Chart(){
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("도넛");
  const [chartTypeData, setChartTypeData] = useState([]);
  const [dates, setDate] = useState("전체 날짜");
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
      console.log("겟데이터")
  };

  useEffect(() => {
      getData("상품종류");
  }, [])

  const onClickBtn = async(e) => {
    const btnType = {};
    btnType.type = "날짜";
    btnType.date1= document.getElementsByName("date1")[0].value;
    const date = new Date(document.getElementsByName("date2")[0].value);
    const date2 = new Date(date);
    setDate(btnType.date1 + " ~ " + document.getElementsByName("date2")[0].value);
    date2.setDate(date.getDate() +1);
    btnType.date2= date2;
    await axios.post("http://localhost:4000/admin/chart", btnType)
      .then((response) => {
          if(response.data != "fail"){
            setData(response.data);
            chartData(response.data);
            console.log(response.data);
          }else{
            alert("해당 날짜에는 구매내역이 존재하지 않습니다.");
            setDate("전체 날짜");
            getData("상품종류");
          }
    });
  }
  console.log(dates);
  return (
      <div>
          <input type="date" name='date1' />
          <input type="date" name='date2' />
          <button onClick={(e) => {onClickBtn(e)}}>년/월</button>
          <h2 style={{textAlign:"center", marginBottom:"30px"}}>{dates}</h2>
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