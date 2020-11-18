
setTimeout(() => {
  $("document").ready(() => {
    $.get('http://localhost:5000/free/currency', (data, status) => {
      data.forEach(item => set(item))
    })
    $.get('http://localhost:5000/free/gold', (data, status) => {
      data.forEach(item => set(item))
    })
  })
}, 1000)


setInterval(() => {
  $("document").ready(() => {
    //$("#data").append("hello mother fucker");
    $.get('http://localhost:5000/free/currency', (data, status) => {
      data.forEach(item => set(item))
    })
    $.get('http://localhost:5000/free/gold', (data, status) => {
      data.forEach(item => set(item))
    })
  });
}, 30000);

function set(item) {
  switch (item.name) {
    case "USD":
      $("#usdp").text(item.corrent)
      $("#usdd").text(item.date)
      $("#usdt").text(item.corrent_time)
      break;
    case "EUR":
      $("#eurp").text(item.corrent)
      $("#eurd").text(item.date)
      $("#eurt").text(item.corrent_time)
      break;
    case "CNY":
      $("#cnyp").text(item.corrent)
      $("#cnyd").text(item.date)
      $("#cnyt").text(item.corrent_time)
      break;
    case "CHF":
      $("#chfp").text(item.corrent)
      $("#chfd").text(item.date)
      $("#chft").text(item.corrent_time)
      break;
    case "AED_sana":
      $("#aedp").text(item.corrent)
      $("#aedd").text(item.date)
      $("#aedt").text(item.corrent_time)
      break;
    case "GoldCoin":
      $("#gcp").text(item.corrent)
      $("#gcd").text(item.date)
      $("#gct").text(item.corrent_time)
      break;
    case "Gold18":
      $("#g18p").text(item.corrent)
      $("#g18d").text(item.date)
      $("#g18t").text(item.corrent_time)
      break;
    case "Gold24":
      $("#g24p").text(item.corrent)
      $("#g24d").text(item.date)
      $("#g24t").text(item.corrent_time)
      break;
    default:
      console.log(item.name);
      console.log("its not here");
      break;
  }
}