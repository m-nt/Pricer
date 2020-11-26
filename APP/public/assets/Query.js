
setTimeout(() => {
  $("document").ready(() => {
    $("#registering").submit((event) => {
      event.preventDefault();
      $.post("http://localhost:8080/users/register", {
        Email: $("#RegisterEmail").val(),
        Username: $("#RegisterUser").val(),
        Password: $("#RegisterPassword").val(),
        CPassword: $("#CPassword").val()
      }, (data, status) => {
        if (data.redirect) {
          window.location.href = data.redirect
          warning = data.warning
          if (warning) {
            let len = warning.length
            for (let i = 0; i < len; i++) {
              error(warning[i].massage, "warning")
            }
          }
        } else {
          errors = data.errors

          $("#RegisterUser").val(data.Username)
          $("#RegisterEmail").val(data.Email)
          $("#RegisterPassword").val(data.Password)
          $("#CPassword").val(data.CPassword)

          if (errors) {
            let len = errors.length
            for (let i = 0; i < len; i++) {
              error(errors[i].massage, "danger")
            }
          }
        }
      })

    })
    $("#submitRSA").submit((event) => {
      event.preventDefault()
      $.post("http://localhost:8080/users/getRSA", (data, status) => {
        $("#exampleTextarea").val(data.RSA)
      })
    })
  })
}, 300)


setTimeout(() => {
  $("#temprery").remove()
}, 5000)

if (window.location.href === "http://localhost:8080/") {
  FreeFeed()
}

let getUrlParameter = function getUrlParameter(sParam) {
  let sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
}
if (getUrlParameter('error')) {
  setTimeout(() => {
    $('document').ready(() => {
      //do somthing with massage
      let msg = getUrlParameter('error')
      error(msg, "danger")
    })
  }, 100)

}
if (getUrlParameter('massage')) {
  setTimeout(() => {
    $('document').ready(() => {
      //do somthing with massage
      let msg = getUrlParameter('massage')
      error(msg, "success")
    })
  }, 100)

}
function error(msg, type) {
  let msgBody = `<div class="alert alert-dismissible alert-${type}">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>${msg}</strong>
    </div>`
  $('#alert').append(msgBody)
}
function FreeFeed() {

  setTimeout(() => {
    $("document").ready(() => {
      $.get('http://localhost:5000/free/currency', (data, status) => {
        data.forEach(item => set(item))
      })
      $.get('http://localhost:5000/free/gold', (data, status) => {
        data.forEach(item => set(item))
      })
    })
  }, 500)


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
}

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