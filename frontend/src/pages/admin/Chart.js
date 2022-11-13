import ApexChart from 'apexcharts'
import ReactApexChart from "react-apexcharts"; 
import { useEffect, useState } from "react";
import Option from '../../components/Option';
import axios from "axios";

function Chart(){
  const [data, setData] = useState([]);
  const [chartTypeData, setChartTypeData] = useState([]);
  const [dates, setDate] = useState("전체 날짜");
  const [text, setText] = useState("년도별");
  const [proKind, setKind] = useState([]);
  const chartData = (data, text) => {
    const chartDataArr = []; 
    if(text == "년도별"){
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
    }else{
      data.proYear.sort();
      var num = 0;
      while(num < 2){
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
              text: "",
              align: 'center'
            },
          },
        }
        if(num == 0){
          chart.options.text = "수량";
          for(var i = 0; i < data.proYear.length; i++){
            chart.options.labels.push(data.proYear[i]);
            for(var j = 0; j < data.products.length; j++){
              if(data.products[j].year == data.proYear[i]){
                chart.series.push(data.products[j].quan);
              }
            }
          }
          chartDataArr.push(chart);
        }else if(num == 1){
          chart.options.text = "수익";
          for(var i = 0; i < data.proYear.length; i++){
            chart.options.labels.push(data.proYear[i]);
            for(var j = 0; j < data.products.length; j++){
              if(data.products[j].year == data.proYear[i]){
                chart.series.push(data.products[j].profit);
              }
            }
          }
          chartDataArr.push(chart);
        }
        num++;
      }
    }
    console.log("chartDataArr: ", chartDataArr)
    setChartTypeData(chartDataArr);
  }
  const getData = async (text) => {
      const btnType = {};
      btnType.type = text;
      await axios.post("http://localhost:4000/admin/chart", btnType)
        .then((response) => {
            if(response.data != "fail"){
              console.log(response.data);
              setData(response.data);
              chartData(response.data, text);
            }else{alert("DB Error.")}
      });
  };

  useEffect(() => {
      getData("년도별");
  }, [])
  const onClickBtn = async(e, text) => {
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
            chartData(response.data, text);
            console.log(response.data);
          }else{
            alert("해당 날짜에는 구매내역이 존재하지 않습니다.");
            setDate("전체 날짜");
            getData("년도별");
          }
    });
  }
  const onClickText = async(e) => {
    if(e.currentTarget.innerHTML == "년도별"){
      e.currentTarget.innerHTML = "상품종류별";
      setText("상품종류별");
      getData("상품종류별");
    }else{
      e.currentTarget.innerHTML = "년도별";
      setText("년도별");
      getData("년도별");
    }
  }
  return (
      <div>
          <button onClick={(e) => {onClickText(e)}}>{text}</button>
          {
            text == "년도별"
            ? <><input type="date" name='date1' />
            <input type="date" name='date2' />
            <button onClick={(e) => {onClickBtn(e, text)}}>년/월</button></>
            : null
          }
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