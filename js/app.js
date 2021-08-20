$(document).ready(function () {
  function find() {
    const firstname = $("#fname").val();
    const middlename = $("#mname").val();
    const lastname = $("#lname").val();
    const address = $("#address").val();
    const country = $("#slect1").val();
    const state = $("slect2").val();
    const zipcode = $("#zipcode").val();
    const email = $("#email").val();
    const phno = $("#phno").val();
    const height = $("#height").val();
    const weight = $("#weight").val();

    function isEmail($email) {
      var regex =
        /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test($email);
    }
    
    
  }


 

  $("#submit").click(function () {
    const firstname = $("#fname").val();
    const middlename = $("#mname").val();
    const lastname = $("#lname").val();
    const address = $("#address").val();
    const country = $("#slect1").val();
    const state = $("slect2").val();
    const zipcode = $("#zipcode").val();
    const email = $("#email").val();
    const phno = $("#phno").val();
    const height = $("#height").val();
    const weight = $("#weight").val();
    if (
      firstname != "" &&
      middlename != "" &&
      lastname != "" &&
      address != "" &&
      country != "" &&
      state != "" &&
      zipcode != "" &&
      email != "" &&
      phno != ""
    ) {

      $("#dispfirstname").html(firstname);
      $("#dispmiddlename").html(middlename);
      $("#displastname").html(lastname);
      $("#dispaddress").html(
        address + ", " + country + ", " + state + ", " + zipcode
      );
      $("#dispemail").html(email);
      $("#dispphno").html(phno);
      $("#disph").html(height);
      $("#dispw").html(weight);

      $("#dispDiv1").show();
      $("#dispDiv2").show();
      $("#dispDiv3").show();
      $("#dispDiv4").show();
      $("#dispDiv5").show();
      $("#dispDiv6").show();
      $("#dispDiv7").show();
      $("#dispDiv8").show();
    } else if (!isEmail(email)) {
      alert("Enter a Valid Email Id");
    } else {
      alert("Fill All Details");
    }


    $.ajax({
      url: "http://localhost:3000/database/update",
      processData: false,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data:JSON.stringify({
        
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        address: address,
        country: country,
        state: state,
        zipcode: zipcode,
        email: email,
        phonenumber:phno,
        height: height,
        weight: weight,
      }),
      success: function (res) {
        console.log(res);
      },
    });
  });

  $("#vd").click(function () {
   
    $.ajax({
      url: "http://localhost:3000/user/list",
      processData: false,
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      
      success: function (res) {

    for(let m=0; m<res.length;m++){
        $("#tb").append(`<tr>

        <td>${res[m].firstname}</td>
        <td>${res[m].middlename}</td>
        <td>${res[m].lastname}</td>
        <td>${res[m].country}</td>
        <td>${res[m].address}</td>
        <td>${res[m].state}</td>
        <td>${res[m].zipcode}</td>
        <td>${res[m].email}</td>
        <td>${res[m].phonenumber}</td>
        <td>${res[m].height}</td>
        <td>${res[m].weight}</td>
        <td class="userdel" style="cursor:pointer" userid="${res[m].id}"> 🗑️ </td>


      </tr>`);
    }
        console.log(res);
      },
    });
  });

  
  
  

  $("body").on( "click", ".userdel", function() {
    let userid=$(this).attr('userid')
    console.log(userid);
    $.ajax({
      url: "http://localhost:3000/user/"+userid,
      processData: false,
      type: 'DELETE',
      dataType: 'json',
      contentType: 'application/json',
      
      success: function (res) {
        console.log(res);
      },
    });
  });

  $("#slect2").change(function () {
    const a = $("#slect2").val();
    console.log(a);
  });

  $("#slect2").select2({
    tags: true,
  });

  $("#slect1").change(function () {
    var s1 = $("#slect1").val();

    if (s1 == "United States of America") {
      console.log(s1);
      const states = statelist();

      for (let i = 0; i < states.length; i++) {
        $("#slect2").append(new Option(states[i], states[i], true, true));
      }
    } else {
      $("#slect2").empty();
      $("#slect2").append(new Option("State", "State", true, true));
    }
  });
});

function statelist() {
  return [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
}
