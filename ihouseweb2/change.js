let doorOpen = false;
let ledOpenred = false;
let ledOpengreen = false;
let fanOpen = false;
let lightOpen = true;
let lightStrip = false;
var r_color = 0;
var g_color = 0;
var b_color = 0;

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
    let num = 0;
    ref.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            console.log(doc.data());
            switch (num) {
                case 0:
                    doorOpen = doc.data().onoff;
                    changeDoor();
                    break;
                case 1:
                    fanOpen = doc.data().onoff;
                    changefan();
                    break;
                case 2:

                    break;
                case 3:
                    document.getElementById('red').value = doc.data().red;
                    document.getElementById('green').value = doc.data().green;
                    document.getElementById('blue').value = doc.data().blue;
                    var rgbcolor = 0;
                    rgbcolor = ($('#red').val() - 120) * 10 + 5;
                    $('#red').css({
                        'background-image': '-webkit-linear-gradient(left ,#f22 0%,#f22 ' + rgbcolor +
                            '%,#fff ' + rgbcolor +
                            '%, #fff 100%)'
                    });
                    rgbcolor = ($('#green').val() - 130) * 10 + 5;
                    $('#green').css({
                        'background-image': '-webkit-linear-gradient(left ,rgb(34, 255, 170) 0%,rgb(34, 255, 170) ' +
                            rgbcolor + '%,#fff ' + rgbcolor + '%, #fff 100%)'
                    });
                    rgbcolor = ($('#blue').val() - 140) * 10 + 5;
                    $('#blue').css({
                        'background-image': '-webkit-linear-gradient(left ,rgb(34, 86, 255) 0%,rgb(34, 86, 255) ' +
                            rgbcolor + '%,#fff ' + rgbcolor + '%, #fff 100%)'
                    });
                    break;
                case 4:
                    lightOpen = doc.data().onoff;
                    changelight();
                    break;
                case 5:
                    document.getElementById('Options').value = doc.data().Options;
                    break;
                case 6:
                    lightStrip = doc.data().onoff;
                    changelightStrip();
                    break;
            }
            num++;


        });

    });

}

$('input, select').change(function (event) {
    // event.preventDefault();
    let action = event.target;
    let category = '';
    let num = Math.floor(Number(action.value) / 10);
    console.log(Number(action.value) / 10);
    let value;
    if (num == 12) {
        value = {
            red: Number(action.value)
        };
        category = 'light';
    }
    if (num == 13) {
        value = {
            green: Number(action.value)
        };
        category = 'light';
    }
    if (num == 14) {
        value = {
            blue: Number(action.value)
        };
        category = 'light';
    }
    if (num == 15) {
        value = {
            Options: Number(action.value)
        }
        category = 'lightRing';
        console.log("action.value"+action.value);
    }
    updateData(category, value);
    send(action.value);

});

$('#Options').click(function (event) {
    // event.preventDefault();
    value = {
        Options: Number(action.value)
    }
    category = 'lightRing';
    console.log("lightRing=" + action.value);
    updateData(category, value);
    send(action.value);
});


$('button').click(function (event) {
    // event.preventDefault();
    // lightStrip = !lightStrip;
    let action = event.target
    updateData('lightStrip', {
        onoff: lightStrip
    });

    send(action.value);
});

$('#door').click(function (event) {
    // event.preventDefault();
    let value = !doorOpen ? '111' : '110';

    updateData('door', {
        onoff: Boolean(doorOpen)
    });
    send(value);
});

function send(value) {
    $.get(
        '/action/', {
        'action': value
    },
        function (data) {

        }
    );
}

function peopleInduction() {
    // if(document.getElementById("people_induction").style.cursor==default){
    // 	document.getElementById("people_induction").style.cursor = "url('./images/cursor.cur'),auto";
    // }
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
        onoff:  true
    });
    updateData('lightOpen', {
        onoff: true
    });
      updateData('light', {
        blue: 0,
        green: 0,
        red: 0,
    });
    changergfb();
    //  var r=document.getElementById("red");
    // console.log("r.value"+r.value);
    //  r.value=120;		
    // var r = $('#red');
    // r.val()=120;
}

function peopleLeave() {
    document.getElementById("door").src = "./images/closedoor.png";
    
}

function changeDoor() {
    console.log(document.getElementById("door").src);
    if (!doorOpen) {
        document.getElementById("door").src = "./images/opendoor.png";
    } else {
        document.getElementById("door").src = "./images/closedoor.png";
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
    if (lightStrip) {
        document.getElementById("lightStrip").innerText = "燈條發亮";
    } else {
        document.getElementById("lightStrip").innerText = "燈條關閉";
    }
    updateData('lightStrip', {
        onoff: Boolean(lightStrip)
    });
    lightStrip = !lightStrip;

}


// function changeRedLed() {
// 	if (!ledOpenred) {
// 		document.getElementById("ledImage").src = "http://120.125.80.113/jpyuImages/image_52ared.gif";
// 	} else {
// 		document.getElementById("ledImage").src = "http://120.125.80.113/jpyuImages/image_52a.gif";
// 	}
// 	updateData('led', {
// 		red: Boolean(ledOpenred)
// 	});

// 	ledOpenred = !ledOpenred;

// }

// function changeGreenLed() {
// 	if (!ledOpengreen) {
// 		document.getElementById("ledImage2").src = "http://120.125.80.113/jpyuImages/image_53agreen.gif";
// 	} else {
// 		document.getElementById("ledImage2").src = "http://120.125.80.113/jpyuImages/image_53a.gif";
// 	}
// 	updateData('led', {
// 		green: Boolean(ledOpengreen)
// 	});

// 	ledOpengreen = !ledOpengreen;

// }
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
            // updateData('light', {
            //     red: Number(r.val()),
            // });
        });
        r.on('mousemove', function () {
            p = (r.val() - 120) * 10 + 5;
            r_color = ((r.val() % 100) % 10) * (255 / 9);
            bg(p);
            // updateData('light', {
            //     red: Number(r.val()),
            // });
        });

        // updateData('light', {
        //     red: Number(r.val()),
        // });
    });

    function bg(n) {
        r.css({
            'background-image': '-webkit-linear-gradient(left ,#f22 0%,#f22 ' + n +
                '%,#fff ' + n +
                '%, #fff 100%)'
        });
        changergb();
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
            // updateData('light', {
            //     green: Number(g.val()),
            // });
        });
        g.on('mousemove', function () {
            p = (g.val() - 130) * 10 + 5;
            g_color = ((g.val() % 100) % 10) * (255 / 9);
            bg(p);
            // updateData('light', {
            //     green: Number(g.val()),
            // });
        });
      
        // updateData('light', {
        //     green: Number(g.val()),
        // });
    });

    function bg(n) {
        g.css({
            'background-image': '-webkit-linear-gradient(left ,rgb(34, 255, 170) 0%,rgb(34, 255, 170) ' +
                n + '%,#fff ' + n + '%, #fff 100%)'
        });
        changergb();
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
            // updateData('light', {
            //     blue: Number(b.val()),
            // });
        });
        b.on('mousemove', function () {
            p = (b.val() - 140) * 10 + 5;
            b_color = ((b.val() % 100) % 10) * (255 / 9);
            bg(p);
            // updateData('light', {
            //     blue: Number(b.val()),
            // });
        });

        // updateData('light', {
        //     blue: Number(b.val()),
        // });
    });

    function bg(n) {
        b.css({
            'background-image': '-webkit-linear-gradient(left ,rgb(34, 86, 255) 0%,rgb(34, 86, 255) ' +
                n + '%,#fff ' + n + '%, #fff 100%)'
        });
        changergb();
    }
});


function changergb() {
    if (r_color == 0 && g_color == 0 && b_color == 0) {
        document.getElementById('page').style.borderTop = "20px solid #32251B";

    } else {
        document.getElementById('page').style.borderTop = "20px solid rgb(" + r_color + "," + g_color +
            "," + b_color + ")";

    }
    var b = $('#blue');
    var g = $('#green');
    var r = $('#red');
    updateData('light', {
        blue: Number(b.val()),
        green: Number(g.val()),
        red: Number(r.val()),
    });

    console.log("r:" + r_color);
    console.log("g:" + g_color);
    console.log("b:" + b.val());
}

