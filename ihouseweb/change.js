let doorOpen = false;
let ledOpenred = false;
let ledOpengreen = false;
let fanOpen = false;
let lightOpen = true;
let lightRing = false;
let lightStrip = false;
var r_color = 0;
var g_color = 0;
var b_color = 0;
const config = {
    minTemp: 0,
    maxTemp: 100,
    unit: "Celcius" };
const Hconfig = {
    minTemp: 0,
    maxTemp: 100,
    unit: "degree" };
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity .temperature");
let Tdegree = 27;
let Hdegree = 87;

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyANb_liFPd2Eysd324y8jlUw_WPFfbPf2A",
    authDomain: "myhouse-59ddd.firebaseapp.com",
    databaseURL: "https://myhouse-59ddd.firebaseio.com",
    projectId: "myhouse-59ddd",
    storageBucket: "myhouse-59ddd.appspot.com",
    messagingSenderId: "90168120796",
    appId: "1:90168120796:web:960c0a79427721038eeb19",
    measurementId: "G-SH95M8H1YJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

function updateData(doc, value) {
    var ref = db.collection('iHouse').doc(doc);

    ref.update(value).then(() => {
        console.log('update data successful');
    });
}

getData();

function getData() {
    var ref = db.collection('iHouse');
    ref.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            console.log(doc.id);
            switch (doc.id) {
                case "door":
                    doorOpen = doc.data().onoff;
                    changeDoor();
                    break;
                case "fan":
                    fanOpen = doc.data().onoff;
                    changefan();
                    break;
                case "led":

                    break;
                case "temperature":
                    Tdegree=doc.data().degree;
                    console.log(doc.data().degree);
                    break;
                case "humidity":
                    Hdegree=doc.data().degree;
                    console.log(doc.data().degree);
                    break;
                case "light":
                    document.getElementById('red').value = doc.data().red;
                    document.getElementById('green').value = doc.data().green;
                    document.getElementById('blue').value = doc.data().blue;

                    let rgb = ['#red', '#green', '#blue'];
                    let rgb_color = [0, 0, 0];
                    let color = [
                        '#f22 0%,#f22 ',
                        'rgb(34, 255, 170) 0%,rgb(34, 255, 170) ',
                        'rgb(34, 86, 255) 0%,rgb(34, 86, 255) ',
                    ]
                    rgb.forEach((value, index) => {
                        let rgbcolor = ($(value).val() - (120 + index * 10)) * 10 + 5;
                        rgb_color[index] = (($(value).val() % 100) % 10) * (255 / 9);

                        $(value).css({
                            'background-image': '-webkit-linear-gradient(left ,' + color[index] + rgbcolor + '%,#fff ' + rgbcolor + '%, #fff 100%)'
                        });

                    });
                    r_color = rgb_color[0];
                    g_color = rgb_color[1];
                    b_color = rgb_color[2];
                    changergb();
                    break;
                case "lightOpen":
                    lightOpen = doc.data().onoff;
                    changelight();
                    break;
                case "lightRing":
                    document.getElementById('options').value = doc.data().Options;
                    break;
                case "lightStrip":
                    lightStrip = doc.data().onoff;
                    changelightStrip();
                    break;
            }



        });

    });

}


// $('input,select').change(function (event) {
//     // event.preventDefault();
//     console.log("input, select");
//     let action = event.target;
//     let category = '';
//     let num = Math.floor(Number(action.value) / 10);
//     console.log(Number(action.value) / 10);
//     let key = ''


//     if (num == 12) {
//         key = 'red';
//         category = 'light';
//     }
//     if (num == 13) {
//         key = 'green';
//         category = 'light';
//     }
//     if (num == 14) {
//         key = 'blue';
//         category = 'light';
//     }
//     if (num == 15) {
//         key = 'Options';
//         category = 'lightRing';
//     }
//     updateData(category, {
//         [key]: Number(action.value)
//     });
//     send(action.value);

// });



// $('button').click(function (event) {
//     // event.preventDefault();
//     // lightStrip = !lightStrip;
//     let action = event.target
//     updateData('lightStrip', {
//         onoff: lightStrip
//     });
//     console.log("button");
//     send(action.value);
// });

// $('#door').click(function (event) {
//     // event.preventDefault();
//     let value = !doorOpen ? '111' : '110';

//     updateData('door', {
//         onoff: Boolean(doorOpen)
//     });
//     console.log("#door");
//     send(value);
// });

const units = {
    Celcius: "°C",
    degree: "%" };
  
  
 
  function setTemperature() {
    if(temperature.dataset.value != Tdegree + units[Hconfig.unit]){
        Tdegree=temperature.dataset.value.substring(0, 3);
        updateData('temperature', {
            degree: Tdegree,
        });
    }
    temperature.style.height = (Tdegree - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
    temperature.dataset.value = Tdegree + units[config.unit];

  }

  function setHumidity() {
    if(humidity.dataset.value != Hdegree + units[Hconfig.unit]){
        Hdegree=humidity.dataset.value.substring(0, 3);
        updateData('humidity', {
            degree: Hdegree,
        });
    }
    humidity.style.height = (Hdegree - Hconfig.minTemp) / (Hconfig.maxTemp - Hconfig.minTemp) * 100 + "%";
    humidity.dataset.value = Hdegree + units[Hconfig.unit];
    
  }
  

  setTimeout(setTemperature, 1000);
  setTimeout(setHumidity, 1000);



function send(value) {
    $.get(
        '/action/', {
            'action': value
        },
        function (data) {

        }
    );
}

function changethreelight() {

    console.log("changethreelight");
    var b = $('#blue');
    var g = $('#green');
    var r = $('#red');
    updateData('light', {
        blue: Number(b.val()),
        green: Number(g.val()),
        red: Number(r.val()),
    });
    send(b.val());
    send(g.val());
    send(r.val());
}


function changeOptions() {
    // event.preventDefault();
    console.log("#options");
    //let action = event.target;
    let event = document.getElementById('options').value;

    value = {
        Options: Number(event)
    }
    category = 'lightRing';

    updateData(category, value);
    send(event);

}


function peopleInduction() {

    document.getElementById("people_induction").style.cursor = "url('./images/cursor.cur'),auto";
    document.getElementById("door").src = "./images/opendoor.png";
    document.getElementById("fan").src = "./images/fan.png";
    document.getElementById("light").src = "./images/closelight.png";
    document.getElementById("page").style.backgroundImage = "url('./images/house_black.png')";
    r = $('#red').val(120);
    b = $('#green').val(130);
    g = $('#blue').val(140);
    r.css({
        'background-image': '-webkit-linear-gradient(left ,rgb(34, 255, 170) 0%,rgb(34, 255, 170) 0%,#fff 0%, #fff 100%)'
    });
    g.css({
        'background-image': '-webkit-linear-gradient(left ,rgb(34, 255, 170) 0%,rgb(34, 255, 170) 0%,#fff 0%, #fff 100%)'
    });
    b.css({
        'background-image': '-webkit-linear-gradient(left ,rgb(34, 255, 170) 0%,rgb(34, 255, 170) 0%,#fff 0%, #fff 100%)'
    });
    r_color = 0;
    g_color = 0;
    b_color = 0;
    updateData('door', {
        onoff: true
    });
    updateData('fan', {
        onoff: true
    });
    updateData('lightOpen', {
        onoff: true
    });
    updateData('light', {
        blue: 140,
        green: 130,
        red: 120,
    });
    updateData('lightRing', {
        Options: Number(150)
    });
    lightStrip = false;
    changelightStrip();
    console.log("peopleInduction");
    changergb();
    send(110);
    send(120);
    send(130);
    send(140);
    send(150);
    

}

function peopleLeave() {
    document.getElementById("door").src = "./images/closedoor.png";

}

function changering() {
    openlightRing()
    lightRing = !lightRing;
}

function changeDoor() {
    console.log(document.getElementById("door").src);
    if (!doorOpen) {
        document.getElementById("door").src = "./images/opendoor.png";
        send('111');
    } else {
        document.getElementById("door").src = "./images/closedoor.png";
        send('110');
    }
    updateData('door', {
        onoff: Boolean(doorOpen)
    });


    doorOpen = !doorOpen;
}

function changefan() {
    console.log(document.getElementById("fan").src);
    if (!fanOpen) {
        document.getElementById("fan").src = "./images/fanopen.gif";
    } else {
        document.getElementById("fan").src = "./images/fan.png";
    }
    updateData('fan', {
        onoff: Boolean(fanOpen)
    });
    fanOpen = !fanOpen;

}

function changelight() {
    console.log(document.getElementById("light").src);
    if (!lightOpen) {
        document.getElementById("light").src = "./images/openlight.png";
        document.getElementById("page").style.backgroundImage = "url('./images/housebg.jpg')";
    } else {
        document.getElementById("light").src = "./images/closelight.png";
        document.getElementById("page").style.backgroundImage = "url('./images/house_black.png')";
    }

    lightOpen = !lightOpen;
    updateData('lightOpen', {
        onoff: Boolean(!lightOpen)
    });
}

function changelightStrip() {
    console.log(document.getElementById("lightStrip").innerText);
    if (!lightStrip) {
        document.getElementById("lightStrip").innerText = "燈條關閉";
        document.getElementById("lightstrip_img").src="./images/lightstrip_open.gif";
    } else {
        document.getElementById("lightStrip").innerText = "燈條發亮";
        document.getElementById("lightstrip_img").src="./images/lightstrip.png";
    }
    updateData('lightStrip', {
        onoff: Boolean(lightStrip)
    });
    lightStrip = !lightStrip;
    send('160');
}


$(function () {
    var r = $('#red');
    r.on('mouseenter', function () {
        var p = (r.val() - 120) * 10 + 5;
        r_color = ((r.val() % 100) % 10) * (255 / 9);
        r.on('click', function () {
            p = (r.val() - 120) * 10 + 5;
            r_color = ((r.val() % 100) % 10) * (255 / 9);
            console.log("val=" + p);
            bg(p);

        });
        r.on('mousemove', function () {
            p = (r.val() - 120) * 10 + 5;
            r_color = ((r.val() % 100) % 10) * (255 / 9);
            bg(p);

        });

    });

    function bg(n) {
        r.css({
            'background-image': '-webkit-linear-gradient(left ,#f22 0%,#f22 ' + n +
                '%,#fff ' + n +
                '%, #fff 100%)'
        });
        changergb();
        console.log("r");
    }


});

$(function () {
    var g = $('#green');
    g.on('mouseenter', function () {
        var p = (g.val() - 130) * 10 + 5;
        g_color = ((g.val() % 100) % 10) * (255 / 9);
        g.on('click', function () {
            p = (g.val() - 130) * 10 + 5;
            g_color = ((g.val() % 100) % 10) * (255 / 9);
            console.log("val=" + p);
            bg(p);

        });
        g.on('mousemove', function () {
            p = (g.val() - 130) * 10 + 5;
            g_color = ((g.val() % 100) % 10) * (255 / 9);
            bg(p);

        });


    });

    function bg(n) {
        g.css({
            'background-image': '-webkit-linear-gradient(left ,rgb(34, 255, 170) 0%,rgb(34, 255, 170) ' +
                n + '%,#fff ' + n + '%, #fff 100%)'
        });
        changergb();
        console.log("g");
    }
});
$(function () {
    var b = $('#blue');
    b.on('mouseenter', function () {
        var p = (b.val() - 140) * 10 + 5;
        b_color = ((b.val() % 100) % 10) * (255 / 9);
        b.on('click', function () {
            p = (b.val() - 140) * 10 + 5;
            b_color = ((b.val() % 100) % 10) * (255 / 9);
            console.log("val=" + b.val());
            bg(p);

        });
        b.on('mousemove', function () {
            p = (b.val() - 140) * 10 + 5;
            b_color = ((b.val() % 100) % 10) * (255 / 9);
            bg(p);

        });


    });

    function bg(n) {
        b.css({
            'background-image': '-webkit-linear-gradient(left ,rgb(34, 86, 255) 0%,rgb(34, 86, 255) ' +
                n + '%,#fff ' + n + '%, #fff 100%)'
        });
        changergb();
        console.log("b");
    }
});


function changergb() {
    if (r_color == 0 && g_color == 0 && b_color == 0) {
        document.getElementById('page').style.borderTop = "20px solid #32251B";
    } else {
        document.getElementById('page').style.borderTop = "20px solid rgb(" + r_color + "," + g_color +
            "," + b_color + ")";

    }


    console.log("r:" + r_color);
    console.log("g:" + g_color);
    console.log("b:" + b_color);

}




var combox = document.getElementById("common_box");
var cli_on = document.getElementById("cli_on");
var timer = null,
    initime = null,
    r_len = 0;
function openlightRing() {
    /*
    combox.style.right = flag?'-270px':0;
    flag = !flag;
    */
    clearTimeout(initime);
    if (lightRing) {
        r_len = 0;
        timer = setInterval(slideright, 10);
    } else {
        r_len = -270;
        timer = setInterval(slideleft, 10);
    }
}
//展開
function slideright() {
    if (r_len <= -270) {
        clearInterval(timer);
        return false;
    } else {
        r_len -= 5;
        combox.style.right = r_len + 'px';
    }
}
//收縮
function slideleft() {
    if (r_len >= 0) {
        clearInterval(timer);
        return false;
    } else {
        r_len += 5;
        combox.style.right = r_len + 'px';
    }
}


