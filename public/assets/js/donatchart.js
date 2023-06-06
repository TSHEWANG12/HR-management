const path = window.location.pathname;
const features = document.querySelectorAll("#sidebar-nav a");
const activeFeature = [].slice.call(features).find(features => features.getAttribute("href") == path);
if(activeFeature) {
	activeFeature.classList.add("active");
}

const paiData = fethc('http:localhost:3000/piData');
const dataValue = await paiData.json();
console.log(dataValue)

const chartData = {
    labels: ["Request Accepted", "Pending Request"],
    data: [50,50],
  };
  
  const myChart = document.querySelector(".my-chart");
  const ul = document.querySelector(".request .details ul");
  
  new Chart(myChart, {
    type: "doughnut",
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: "Request Status",
          data: chartData.data,
        },
      ],
    },
    options: {
      borderwidth: 10,
      borderRadius: 2,
      hoverBorderWidth: 0,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
  
  const populateUl = () => {
    chartData.labels.forEach((l, i) => {
      let li = document.createElement("li");
      li.innerHTML = `${l}: <span class='percentage'>${chartData.data[i]}%</span>`;
      ul.appendChild(li);
    });
  };
  
  populateUl();
  