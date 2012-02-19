
function show(id) {
    var e = document.getElementById(id);
    e.style.display = '';
}
function hide(id) {
    var e = document.getElementById(id);
    e.style.display = 'none';
}

function setMin(id) {
    var val = document.getElementById(id).value;
    if(val && val!='') itsElectric.options.min = val;
    else delete itsElectric.options.min;
    if(itsElectric.queryPath=='/voltage' || (val && val!='')) itsElectric.options.scaleType = 'maximized';
    else itsElectric.options.scaleType = 'fixed';
}
function setMax(id) {
    var val = document.getElementById(id).value;
    if(val && val!='') itsElectric.options.max = val;
    else delete itsElectric.options.max;
}

function changeView(view) {
    itsElectric.queryPath = "/" + view;
    if(view=="voltage") {
        hide('wattsMinAndMax');
        show('voltsMinAndMax');
        itsElectric.options.allValuesSuffix="V";
        setMin('vmin');
        setMax('vmax');
    }
    else if(view=="power-factor") {
        hide('wattsMinAndMax');
        hide('voltsMinAndMax');
        delete itsElectric.options.allValuesSuffix;
        itsElectric.options.scaleType = 'fixed';
        delete itsElectric.options.min;
        delete itsElectric.options.max;
    }
    else {
        show('wattsMinAndMax');
        hide('voltsMinAndMax');
        if(view=="volt-amperes") itsElectric.options.allValuesSuffix="VA";
        else if(view=="volt-amperes-reactive") itsElectric.options.allValuesSuffix="var";
        else itsElectric.options.allValuesSuffix="W";
        setMin('wmin');
        setMax('wmax');
    }
    itsElectric.requery();
}            

window.onload = function(){
    itsElectric.delta = document.getElementById('delta').checked;
    changeView(document.getElementById('view').value);
    if(!itsElectric.hasVoltage) {
        document.getElementById('view.voltage').disabled = true;
    }
    if(!itsElectric.hasKVA) {
        document.getElementById('view.volt-amperes').disabled = true;
        document.getElementById('view.volt-amperes-reactive').disabled = true;
        document.getElementById('view.combined-power').disabled = true;
        document.getElementById('view.power-factor').disabled = true;
    }
    itsElectric.redraw();
};

function errorCallback() {
	if(itsElectric.getErrors().length > 0) document.getElementById('errorsLink').style.display = '';
	else document.getElementById('errorsLink').style.display = 'none';
	if(document.getElementById('errorsOverlay').style.visibility == 'visible') {
		hideErrors();
		showErrors();
	}
}

function showErrors() {
    var errorsDiv = document.getElementById('errorsDiv');
    while(errorsDiv.firstChild) errorsDiv.removeChild(errorsDiv.firstChild);
    errorsDiv.appendChild(htmlListify(itsElectric.getErrors()));
    document.getElementById('errorsOverlay').style.visibility = 'visible';
}
function clearErrors() {
	itsElectric.clearErrors();
    hideErrors();
    errorCallback();
}
function hideErrors() {
    document.getElementById('errorsOverlay').style.visibility = 'hidden';
}

function htmlListify(xs) {
    var ol = document.createElement("ol");
    for(var i = 0; i < xs.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(xs[i]));
        ol.appendChild(li);
    }
    return ol;
}
