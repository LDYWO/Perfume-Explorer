var root = d3.select('#renderer').append('svg');
var windowWidth = $(window).width();
var windowHeight = $(window).height();
root.attr('width', windowWidth).attr('height', (windowHeight+550)/2);

var numeric=[];
var brand = "";
var compare = "";
var selectedPerfumeName="";
var prepoint=[];
var prepoint2=[];

var points = [];

var nWeight = 3;
var WeightVar = [];
var key = [];

var colorVar;

var select_perfume_count = 0;
var pre_seleted_perfume_id =[];
var pre_seleted_perfume_id2 =[];
var perfume_name_list =[];

var season =["SPRING","SUMMER","AUTUMN","WINTER"];
var sillage =["SOFT","MODERATE","HEAVY","ENORMOUS"];
var longevity=["POOR","WEAK","MODERATE","LONG LASTING","VERY LONG LASTING"];
var notes = ["MUSK AMBER","SWEETS","RESINS","SPICES","WOODS","BEVERAGES","CITRUS","NATURAL","GREENS HERBS","FRUITS","FLOWERS","WHITE FLOWERS"];

var seasondbclicked = false, longevitydbclicked = false, sillagedbclicked = false, notesdbclicked = false;

function testfunc(test) {
    d3.select(this).on('input', function () {
        var weigh = test.parentNode.parentNode.getAttribute('class');
        var nWeight = event.target.value;

        if(nWeight== -5) {
            test.nextSibling.childNodes[0].style.flex='0.0 1 0%';
            test.nextSibling.childNodes[1].style.flex='1.0 1 0%';
        }
        else if(nWeight== -4){
            test.nextSibling.childNodes[0].style.flex='0.1 1 0%';
            test.nextSibling.childNodes[1].style.flex='0.9 1 0%';
        }
        else if(nWeight== -3){
            test.nextSibling.childNodes[0].style.flex='0.2 1 0%';
            test.nextSibling.childNodes[1].style.flex='0.8 1 0%';
        }
        else if(nWeight== -2){
            test.nextSibling.childNodes[0].style.flex='0.3 1 0%';
            test.nextSibling.childNodes[1].style.flex='0.7 1 0%';
        }
        else if(nWeight== -1){
            test.nextSibling.childNodes[0].style.flex='0.4 1 0%';
            test.nextSibling.childNodes[1].style.flex='0.6 1 0%';
        }
        else if(nWeight== 0){
            test.nextSibling.childNodes[0].style.flex='0.5 1 0%';
            test.nextSibling.childNodes[1].style.flex='0.5 1 0%';
        }
        else if(nWeight== 1){
            test.nextSibling.childNodes[0].style.flex='0.6 1 0%';
            test.nextSibling.childNodes[1].style.flex='0.4 1 0%';
        }
        else if(nWeight== 2){
            test.nextSibling.childNodes[0].style.flex='0.7 1 0%';
            test.nextSibling.childNodes[1].style.flex='0.3 1 0%';
        }
        else if(nWeight== 3){
            test.nextSibling.childNodes[0].style.flex='0.8 1 0%';
            test.nextSibling.childNodes[1].style.flex='0.2 1 0%';
        }
        else if(nWeight== 4){
            test.nextSibling.childNodes[0].style.flex='0.9 1 0%';
            test.nextSibling.childNodes[1].style.flex='0.1 1 0%';
        }
        else if(nWeight== 5){
            test.nextSibling.childNodes[0].style.flex='1.0 1 0%';
            test.nextSibling.childNodes[1].style.flex='0.0 1 0%';
        }


        Vis.updateWeight(weigh, nWeight);
        $('#'+weigh+'_nWeight').text(nWeight);

    });
};
function selectPerfume(item) {

    var item_id = item.getAttribute('id');
    var perfume_name = item.getAttribute('perfumeName');
    var checked = item.getAttribute('class');

    console.log(item);
    if(checked=='not-checked'){
        select_perfume_count++;
        item.setAttribute('class','checked');
        console.log('item checked');
        console.log(select_perfume_count);
        if(select_perfume_count<=5)
        {
            pre_seleted_perfume_id.push(item_id);
            perfume_name_list.push(perfume_name);
            Vis.appendselectedPerfumeChart();
        }
        else{
            $("#"+pre_seleted_perfume_id[pre_seleted_perfume_id.length-5]).prop('checked',false);
            $("#"+pre_seleted_perfume_id[pre_seleted_perfume_id.length-5]).attr('class','not-checked');

            pre_seleted_perfume_id.push(item_id);
            pre_seleted_perfume_id.splice(0,1);

            console.log(pre_seleted_perfume_id);

            perfume_name_list=[];
            for(var i=0;i<pre_seleted_perfume_id.length;i++){
                perfume_name_list.push($('#'+pre_seleted_perfume_id[i]).attr('perfumeName'));
            }
            console.log(perfume_name_list);

            d3.selectAll("#img0").style("display","none");
            d3.selectAll("#img1").style("display","none");
            d3.selectAll("#img2").style("display","none");
            d3.selectAll("#img3").style("display","none");
            d3.selectAll("#img4").style("display","none");
            Vis.appendselectedPerfumeChart();

            select_perfume_count--;

        }
    }
    else{
        select_perfume_count--;
        item.setAttribute('class','not-checked');

        pre_seleted_perfume_id.splice(pre_seleted_perfume_id.indexOf(item_id),1);
        console.log(pre_seleted_perfume_id);

        perfume_name_list=[];
        for(var i=0;i<pre_seleted_perfume_id.length;i++){
            perfume_name_list.push($('#'+pre_seleted_perfume_id[i]).attr('perfumeName'));
        }
        console.log(perfume_name_list);

        d3.selectAll("#img0").style("display","none");
        d3.selectAll("#img1").style("display","none");
        d3.selectAll("#img2").style("display","none");
        d3.selectAll("#img3").style("display","none");
        d3.selectAll("#img4").style("display","none");

        Vis.appendselectedPerfumeChart();

    }
}
function selectPerfume2(item) {
    var item_id = item.getAttribute('id');
    var perfume_name = item.getAttribute('perfumeName');
    var checked = item.getAttribute('class');

    if(checked=='not-checked'){
        select_perfume_count++;
        item.setAttribute('class','checked');
        console.log('item checked');
        console.log(select_perfume_count);
        if(select_perfume_count<=5)
        {
            pre_seleted_perfume_id.push(item_id);
            perfume_name_list.push(perfume_name);
            Vis.appendselectedPerfumeChart();
        }
        else{
            $("#"+pre_seleted_perfume_id[pre_seleted_perfume_id.length-5]).prop('checked',false);
            $("#"+pre_seleted_perfume_id[pre_seleted_perfume_id.length-5]).attr('class','not-checked');

            pre_seleted_perfume_id.push(item_id);
            pre_seleted_perfume_id.splice(0,1);

            console.log(pre_seleted_perfume_id);

            perfume_name_list=[];
            for(var i=0;i<pre_seleted_perfume_id.length;i++){
                perfume_name_list.push($('#'+pre_seleted_perfume_id[i]).attr('perfumeName'));
            }
            console.log(perfume_name_list);

            d3.selectAll("#img0").style("display","none");
            d3.selectAll("#img1").style("display","none");
            d3.selectAll("#img2").style("display","none");
            d3.selectAll("#img3").style("display","none");
            d3.selectAll("#img4").style("display","none");
            Vis.appendselectedPerfumeChart();

            select_perfume_count--;

        }
    }
    else{
        select_perfume_count--;
        item.setAttribute('class','not-checked');

        pre_seleted_perfume_id.splice(pre_seleted_perfume_id.indexOf(item_id),1);
        console.log(pre_seleted_perfume_id);

        perfume_name_list=[];
        for(var i=0;i<pre_seleted_perfume_id.length;i++){
            perfume_name_list.push($('#'+pre_seleted_perfume_id[i]).attr('perfumeName'));
        }
        console.log(perfume_name_list);

        d3.selectAll("#img0").style("display","none");
        d3.selectAll("#img1").style("display","none");
        d3.selectAll("#img2").style("display","none");
        d3.selectAll("#img3").style("display","none");
        d3.selectAll("#img4").style("display","none");

        Vis.appendselectedPerfumeChart();

    }
}

var Vis = new function () {

    this.redrawdimensions = [];
    this.dimensions = [];
    this.Weightdimensions = [];
    var that = this;
    var parentG = root.append('g')
        .attr('transform', 'translate('+((windowWidth-240-576-20))+','+(windowHeight/2-56)+')');

    var color;

    var dimensionCount = 0;
    var m0;

    this.drawDimension = function (keys,name) {

        var g = root.append('g');
        g.attr('transform', 'translate('+((windowWidth-240-576-20))+','+(windowHeight/2-56)+')').attr('id',name);

        var r = (windowWidth-150)/6 + dimensionCount * 30;

        var length = keys.length;
        var Season_color = ["#248F46","#EEB23C","#9D3F22","#195B7F"];
        var Sillage_color = ["#9458A3","#843E98","#623173","#452253"];
        var Longevity_color = ["#409DC3","#4483ea","#1B6AA0","#195B7F","#144B64"];
        var Note_color =["#E10B7B", "#CA1C82", "#9A1931", "#B85B27", "#BF8837",
            "#8C844F", "#EEB23C", "#2B9555", "#7DBA55", "#EB7823", "#E6362C", "#E86EA3"];
        var rotate = 0;

        d3.select("#"+name)
            .on("mousemove", mousemove)
            .on("mouseup", mouseup);

        function mouse(e) {
            return [e.pageX-(windowWidth-240-576-20), e.pageY-windowHeight/2-56];
        }

        function mousedown() {
            m0 = mouse(d3.event);
            d3.event.preventDefault();
        }

        function mousemove() {
            if (m0) {
                var m1 = mouse(d3.event),
                    dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;

                console.log(dm);
                setState(dm);
            }
        }

        function mouseup() {
            if (m0) {
                var m1 = mouse(d3.event),
                    dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;
                rotate += dm;

                if(rotate>360) rotate -=360;
                else if (rotate < 0) rotate += 360;
                m0 = null;

                g.style("-webkit-transform", null);
                g.attr('transform', 'translate('+((windowWidth-240-576-20))+','+(windowHeight/2-56)+')rotate(' + rotate + ')');
                console.log("dm:"+dm);
                console.log("rotate:"+rotate);
            }
            console.log("rotate:"+rotate);
            that.updateDimensionData(keys,dm);
            that.updateNodes();
        }

        function setState(dm){
            g.attr('transform', 'translate('+((windowWidth-240-576-20))+','+(windowHeight/2-56)+')rotate(' + (rotate + dm) + ')');
        }

        function add_item(id,dm,dm_name,nWeight){
            // pre_set 에 있는 내용을 읽어와서 처리..
            var div = document.createElement('div');
            var txt = document.createElement('text');
            var txt2 = document.createElement('text');
            var txt3 = document.createElement('text');

            div.innerHTML = document.getElementById('pre_set').innerHTML;
            txt.innerText = document.getElementById('weight_id').innerText;
            div.className = id;
            txt.className = id;
            txt.textContent = dm;
            txt2.className = id;
            txt2.textContent = dm_name;
            txt3.textContent = nWeight;
            txt3.id = id+'_nWeight';

            div.style.marginTop="-17px";
            div.style.width="195px";
            div.style.marginLeft="-15px";

            txt.style.fontSize = "10px";
            txt.style.fontWeight = "bold";
            txt.style.color = "rgba(80, 80, 80, 0.56)";
            txt.style.marginTop="20px";

            txt2.style.fontSize = "8px";
            txt2.style.fontWeight = "normal";

            txt3.style.fontSize = "13px";
            txt3.style.fontWeight = "bold";
            txt3.style.fontWeight = "normal";
            txt3.style.borderBottom="2px solid rgb(3,169,244)";
            txt3.style.marginTop="15px";
            txt3.style.marginRight="15px";
            txt3.style.float="right";

            txt2.appendChild(txt3);
            txt.appendChild(txt2);
            txt.appendChild(div);
            document.getElementById('weight-field').appendChild(txt);

        }

        function remove_item(id){
            d3.select("#weight-field ."+id).remove();
        }

        function dblclick () {
            var DA = d3.select(this).attr("id");
            var dm =  d3.select(this).attr("dm");
            var dm_name = d3.select(this).attr("name");

            if(dm_name=="Season"){
                if(!seasondbclicked){
                    if (d3.select(this).style("opacity") == "0.4"){
                        d3.select(this).style("opacity","1.0");
                        WeightVar.push(DA);
                        key.push(keys);
                        that.updateWeight(DA, nWeight);
                        add_item(DA,dm,dm_name,nWeight);
                        seasondbclicked=true;
                    }
                }
                else {
                    if(d3.select(this).style("opacity") == "1"){
                        console.log("delete weight!");
                        d3.select(this).style("opacity","0.4");
                        WeightVar.splice(WeightVar.indexOf(dm),1);
                        key.splice(key.indexOf(keys),1);
                        that.removeWeightingVar(keys,DA);
                        that.updateNodes();
                        remove_item(DA,dm);
                        seasondbclicked=false;
                    }
                }
            }
            else if(dm_name=="Longevity"){
                if(!longevitydbclicked){
                    if (d3.select(this).style("opacity") == "0.4"){
                        d3.select(this).style("opacity","1.0");
                        WeightVar.push(DA);
                        key.push(keys);
                        that.updateWeight(DA, nWeight);
                        add_item(DA,dm,dm_name,nWeight);
                        longevitydbclicked=true;
                    }
                }
                else {
                    if(d3.select(this).style("opacity") == "1"){
                        d3.select(this).style("opacity","0.4");
                        WeightVar.splice(WeightVar.indexOf(dm),1);
                        key.splice(key.indexOf(keys),1);
                        that.removeWeightingVar(keys,DA);
                        that.updateNodes();
                        remove_item(DA,dm);
                        longevitydbclicked=false;
                    }
                }
            }
            else if(dm_name=="Sillage"){
                if(!sillagedbclicked){
                    if (d3.select(this).style("opacity") == "0.4"){
                        d3.select(this).style("opacity","1.0");
                        WeightVar.push(DA);
                        key.push(keys);
                        that.updateWeight(DA, nWeight);
                        add_item(DA,dm,dm_name,nWeight);
                        sillagedbclicked=true;
                    }
                }
                else {
                    if(d3.select(this).style("opacity") == "1"){
                        d3.select(this).style("opacity","0.4");
                        WeightVar.splice(WeightVar.indexOf(dm),1);
                        key.splice(key.indexOf(keys),1);
                        that.removeWeightingVar(keys,DA);
                        that.updateNodes();
                        remove_item(DA,dm);
                        sillagedbclicked=false;
                    }
                }
            }
            else if(dm_name=="Notes"){
                if(!notesdbclicked){
                    if (d3.select(this).style("opacity") == "0.4"){
                        d3.select(this).style("opacity","1.0");
                        WeightVar.push(DA);
                        key.push(keys);
                        that.updateWeight(DA, nWeight);
                        add_item(DA,dm,dm_name,nWeight);
                        notesdbclicked=true;
                    }
                }
                else {
                    if(d3.select(this).style("opacity") == "1"){
                        d3.select(this).style("opacity","0.4");
                        WeightVar.splice(WeightVar.indexOf(dm),1);
                        key.splice(key.indexOf(keys),1);
                        that.removeWeightingVar(keys,DA);
                        that.updateNodes();
                        remove_item(DA,dm);
                        notesdbclicked=false;
                    }
                }
            }

        }

        function cross(a, b) {
            return a[0] * b[1] - a[1] * b[0];
        }

        function dot(a, b) {
            return a[0] * b[0] + a[1] * b[1];
        }

        for(var j=0; j<length;j++){
            var arc = d3.svg.arc()
                .innerRadius(r-30)
                .outerRadius(r)
                .startAngle(2*Math.PI*(1/length)*(j))
                .endAngle(2*Math.PI*(1/length)*(j+1));

            if(name=="Notes") {
                g.append("path")
                    .attr("d", arc)
                    .attr("id", keys[j])
                    .attr("dm",notes[j])
                    .attr("name","Notes")
                    .attr("fill", Note_color[j])
                    .attr('stroke', '#fff')
                    .attr('stroke-width', '3')
                    .style("cursor", "move")
                    .style("opacity","0.4")
                    .on('mouseover', function () {
                        d3.select(this)
                            .transition()
                            .duration(0)
                            .attr('stroke-width', '7')
                    })
                    .on('mouseout', function () {
                        d3.select(this)
                            .transition()
                            .duration(0)
                            .attr('stroke-width', '2')
                    })
                    .on('mousemove', mousemove)
                    .on('mousedown', mousedown)
                    .on("dblclick", dblclick);
            }
            if(name=="Season") {
                g.append("path")
                    .attr("d", arc)
                    .attr("id", keys[j])
                    .attr("dm",season[j])
                    .attr("name","Season")
                    .attr("fill", Season_color[j])
                    .attr('stroke', '#fff')
                    .attr('stroke-width', '3')
                    .style("cursor", "move")
                    .style("opacity","0.4")
                    .on('mouseover', function () {
                        d3.select(this)
                            .transition()
                            .duration(0)
                            .attr('stroke-width', '7')
                    })
                    .on('mouseout', function () {
                        d3.select(this)
                            .transition()
                            .duration(0)
                            .attr('stroke-width', '2')
                    })

                    .on('mousedown', mousedown)
                    .on("dblclick", dblclick);
            }
            if(name=="Sillage") {
                g.append("path")
                    .attr("d", arc)
                    .attr("id", keys[j])
                    .attr("dm",sillage[j])
                    .attr("name","Sillage")
                    .attr("fill", Sillage_color[j])
                    .attr('stroke', '#fff')
                    .attr('stroke-width', '3')
                    .style("cursor", "move")
                    .style("opacity","0.4")
                    .on('mouseover', function () {
                        d3.select(this)
                            .transition()
                            .duration(0)
                            .attr('stroke-width', '7')
                    })
                    .on('mouseout', function () {
                        d3.select(this)
                            .transition()
                            .duration(0)
                            .attr('stroke-width', '2')
                    })

                    .on('mousedown', mousedown)
                    .on("dblclick", dblclick);
            }
            if(name=="Longevity") {
                g.append("path")
                    .attr("d", arc)
                    .attr("id", keys[j])
                    .attr("dm",longevity[j])
                    .attr("name","Longevity")
                    .attr("fill", Longevity_color[j])
                    .attr('stroke', '#fff')
                    .attr('stroke-width', '3')
                    .style("cursor", "move")
                    .style("opacity","0.4")
                    .on('mouseover', function () {
                        d3.select(this)
                            .transition()
                            .duration(0)
                            .attr('stroke-width', '7')
                    })
                    .on('mouseout', function () {
                        d3.select(this)
                            .transition()
                            .duration(0)
                            .attr('stroke-width', '2')
                    })

                    .on('mousedown', mousedown)
                    .on("dblclick", dblclick);
            }

            var text = g.append('text')
                .attr({
                    x:10,
                    dy:22,
                })
                .style("cursor", "move")
                .on('mousedown',mousedown);

            if(name=="Notes"){
                if(dimensionCount==3)
                    text.append("textPath")
                        .style("fill","#ffffff")
                        .style("font-size", "12pt")
                        .style("text-anchor","middle")
                        .style("opacity","1.0")
                        .attr("startOffset","20%")
                        .attr("stroke","#ffffff")
                        .attr("xlink:href","#"+keys[j])
                        .text(notes[j]);
                else if(dimensionCount==2)
                    text.append("textPath")
                        .style("fill","#ffffff")
                        .style("font-size", "11pt")
                        .style("text-anchor","middle")
                        .style("opacity","1.0")
                        .attr("startOffset","19%")
                        .attr("stroke","#ffffff")
                        .attr("xlink:href","#"+keys[j])
                        .text(notes[j]);
                else if(dimensionCount==1)
                    text.append("textPath")
                        .style("fill","#ffffff")
                        .style("font-size", "10pt")
                        .style("text-anchor","middle")
                        .style("opacity","1.0")
                        .attr("startOffset","18.5%")
                        .attr("stroke","#ffffff")
                        .attr("xlink:href","#"+keys[j])
                        .text(notes[j]);
                else if(dimensionCount==0)
                    text.append("textPath")
                        .style("fill","#ffffff")
                        .style("font-size", "9pt")
                        .style("text-anchor","middle")
                        .style("opacity","1.0")
                        .attr("startOffset","18%")
                        .attr("stroke","#ffffff")
                        .attr("xlink:href","#"+keys[j])
                        .text(notes[j]);


            }
            else if(name=="Season")
            {
                text.append("textPath")
                    .style("fill","#ffffff")
                    .style("font-size", "15pt")
                    .style("text-anchor","middle")
                    .style("opacity","1.0")
                    .attr("startOffset","25%")
                    .attr("stroke","#ffffff")
                    .attr("xlink:href","#"+keys[j])
                    .text(season[j]);
            }
            else if(name=="Sillage")
            {
                text.append("textPath")
                    .style("fill","#ffffff")
                    .style("font-size", "15pt")
                    .style("text-anchor","middle")
                    .style("opacity","1.0")
                    .attr("startOffset","25%")
                    .attr("stroke","#ffffff")
                    .attr("xlink:href","#"+keys[j])
                    .text(sillage[j]);
            }
            else if(name=="Longevity")
            {
                text.append("textPath")
                    .style("fill","#ffffff")
                    .style("font-size", "15pt")
                    .style("text-anchor","middle")
                    .style("opacity","1.0")
                    .attr("startOffset","25%")
                    .attr("stroke","#ffffff")
                    .attr("xlink:href","#"+keys[j])
                    .text(longevity[j]);
            }
        }

        var i = 0;
        var dimensionData = _.map(keys, function (key) {
            var x,y;

            x = Math.sin((Math.PI * 2)* i / length+(Math.PI/length)) * r;
            y = -Math.cos((Math.PI * 2)* i/ length+(Math.PI/length)) * r;

            i++;

            return {
                g: g,
                x: x,
                y: y,
                r:r,
                name: key,
                array_name:keys,
                dimension_name:name,
            }

        });

        var dimensionData2 = _.map(keys, function (key) {
            var x,y;

            x = Math.sin((Math.PI * 2)* i / length+(Math.PI/length)) * r;
            y = -Math.cos((Math.PI * 2)* i/ length+(Math.PI/length)) * r;

            i++;

            return {
                g: g,
                x: x,
                y: y,
                r:r,
                name: key,
                array_name:keys,
                dimension_name:name,
            }

        });
        dimensionCount++;
        that.Weightdimensions.push(dimensionData2);
        that.dimensions.push(dimensionData);
    };

    this.updateWeight = function (weigh, nWeight){
        for (var i=0; i<WeightVar.length; i++) {
            if (WeightVar[i] == weigh){
                that.updateWeightingVar(nWeight, key[i],WeightVar[i]);
            }
        };
        that.updateNodes();
    };

    this.updateDimensionData = function (keys, rotate) {
        for (var i=0; i<that.dimensions.length; i++) {
            for (var j=0; j<that.dimensions[i].length; j++) {
                if (that.dimensions[i][j].array_name[0]==keys[0]){
                    that.dimensions[i][j].x = that.dimensions[i][j].x*Math.cos(rotate*Math.PI/180) - that.dimensions[i][j].y*Math.sin(rotate*Math.PI/180);
                    that.dimensions[i][j].y =  that.dimensions[i][j].x*Math.sin(rotate*Math.PI/180) + that.dimensions[i][j].y*Math.cos(rotate*Math.PI/180);
                    that.Weightdimensions[i][j].x = that.Weightdimensions[i][j].x*Math.cos(rotate*Math.PI/180) - that.Weightdimensions[i][j].y*Math.sin(rotate*Math.PI/180);
                    that.Weightdimensions[i][j].y =  that.Weightdimensions[i][j].x*Math.sin(rotate*Math.PI/180) + that.Weightdimensions[i][j].y*Math.cos(rotate*Math.PI/180);
                }
            }
        }
    };

    this.updateWeightingVar = function  (nWeight, keys, DA) {
        var Sigmoid = 1/(1+Math.exp(-nWeight));
        for (var i=0; i<that.dimensions.length; i++) {
            for (var j=0; j<that.dimensions[i].length; j++) {
                if (that.dimensions[i][j].array_name[0]==keys[0] && that.dimensions[i][j].name == DA) {
                    that.dimensions[i][j].x = that.Weightdimensions[i][j].x * 2* Sigmoid;
                    that.dimensions[i][j].y = that.Weightdimensions[i][j].y * 2* Sigmoid;
                }
            }
        }
    };

    this.removeWeightingVar = function  (keys, DA) {
        for (var i=0; i<that.dimensions.length; i++) {
            for (var j=0; j<that.dimensions[i].length; j++) {
                if (that.dimensions[i][j].array_name[0]==keys[0] && that.dimensions[i][j].name == DA) {
                    that.dimensions[i][j].x = that.Weightdimensions[i][j].x ;
                    that.dimensions[i][j].y = that.Weightdimensions[i][j].y ;
                }
            }
        }
    };

    this.appendNodes = function (nodes) {
        parentG.append('circle').attr({
            cx:0,
            cy:0,
            r:220,
            fill:"#fff",
            id:"pointsgroup",
        });
        points = _.map(nodes, function (n) {
            return {
                circle: parentG.append('circle').attr({
                    cx: 0,
                    cy: 0,
                    r: 2,
                    fill: '#000',
                    id:'points',
                }),
                data: n,

            };
        });
        that.updateNodes();
        that.updateNodeColor();
        that.appendNodesInfor();
        that.appendNodesChart();
    };

    this.updateNodes = function () {
        var maxDist = 0;
        _.forEach(points, function (n) {
            var x = 0;
            var y = 0;

            _.forEach(that.dimensions, function (dimension) {
                _.forEach(dimension, function (d) {
                    x += d.x * n.data[d.name];
                    y += d.y * n.data[d.name];
                })
            });

            var dist = Math.sqrt(x * x + y * y);
            if (maxDist < dist) maxDist = dist;
        });

        _.forEach(points, function (p) {
            var x = 0, y = 0;

            _.forEach(that.dimensions, function (dimension) {
                _.forEach(dimension, function (d) {
                    x += d.x * p.data[d.name];
                    y += d.y * p.data[d.name];
                })
            });
            p.circle.transition().duration(1000).attr({
                cx: x / maxDist * ((windowWidth-150)/7-20),
                cy: y / maxDist * ((windowWidth-150)/7-20),
            });
            if(dimensionCount==0)
                p.circle.attr({
                    r:0,
                });
            else {
                p.circle.attr({
                    r:2,
                });
            }
        });

        that.dragRect();

    };

    this.removeDimension = function (keys,name) {

        d3.select('.selection').remove();
        d3.selectAll('#selectList #perfume-list').remove();

        var rmindex = 0;
        _.forEach(that.dimensions, function (dimension) {
            _.forEach(dimension, function (d) {
                _.forEach(keys, function (key) {
                    if(d.name==key){
                        rmindex = that.dimensions.indexOf(dimension);
                    }
                })
            })
        });

        that.dimensions.splice(rmindex,1);

        dimensionCount--;
        for(e in keys){
            root.selectAll("#"+keys[e]).remove();
            root.selectAll("#"+name).remove();
        }

        if(dimensionCount>=1){
            that.redraw();
        }

        that.updateNodes();
    };

    this.redraw = function () {

        var dimension_r = [];


        for(var i=0;i<dimensionCount;i++){
            dimension_r.push(that.dimensions[i][0].r);
        }

        for(var i=0;i<that.dimensions.length;i++){
            that.redrawdimensions.push(that.dimensions[i]);
        }

        function unique(array) {
            var dimension_names = [];
            var result = [];
            var names = [];
            $.each(array, function(index1, element1) {   // 배열의 원소수만큼 반복
                dimension_names.push(element1[0].dimension_name);

                $.each(dimension_names, function(index2, element2) {   // 배열의 원소수만큼 반복

                    if ($.inArray(element2, names) == -1) {  // result 에서 값을 찾는다.  //값이 없을경우(-1)
                        names.push(element2);              // result 배열에 값을 넣는다.
                    }
                });

                $.each(names, function(index3, element3) {   // 배열의 원소수만큼 반복

                    if(element3==element1[0].dimension_name){
                        result.push(element1);
                    }
                });
                dimension_names=[];
            });
            return result;
        }
        that.redrawdimensions = unique(that.redrawdimensions);

        if(dimension_r[1]-dimension_r[0]>=60||dimension_r[2]-dimension_r[1]>=60||dimension_r[0]>=(windowWidth-150)/6){
            dimensionCount=0;
            that.dimensions=[];
            that.Weightdimensions=[];
            _.forEach(that.redrawdimensions, function (dimension) {
                for(e in dimension[0].array_name)
                    root.selectAll("#"+dimension[0].array_name[e]).remove();
                root.selectAll("#"+dimension[0].dimension_name).remove();

                that.drawDimension(dimension[0].array_name,dimension[0].dimension_name);

            });

            for (var i=0; i<WeightVar.length; i++){
                d3.select('#weight-field .'+ WeightVar[i]).remove();
            }
            WeightVar = [];
        }
        that.redrawdimensions=[];
        dimension_r=[];

        that.updateNodes();
    }

    this.updateNodeColor = function (keys) {
        colorVar = keys;

        console.log(colorVar);

        if(keys=="Gender") color = d3.scale.ordinal().range(["#6383ce","#2dad36","#fc821e"]);
        else if(keys=="day/night") color = d3.scale.linear().domain([0, d3.max(points, function(d) {return d.data["day/night"]; })/2, d3.max(points, function(d) {return d.data["day/night"]; })]).range(["#324d7a","#eda46d"]);
        else if(keys=="Rating") color = d3.scale.linear().domain([0, d3.max(points, function(d) {return d.data["Rating"]; })/2, d3.max(points, function(d) {return d.data["Rating"]; })]).interpolate(d3.interpolateHcl).range(["#ffffff","#808080","#000000"]);

        else if(keys!="Gender"||keys!="day/night"||keys!="Brand")color = d3.scale.ordinal().range("#FF689F","#bababa");

        if(keys=="Gender") color.domain(keys);

        if(colorVar!="Gender"&&colorVar!="day/night"&&colorVar!="Rating"&&colorVar!="Brand"){
            for(var i=0;i<points.length;i++){
                if(points[i].data["Designer"]==brand){
                    points[i].circle.style("fill","#FF689F");
                }
                else{
                    points[i].circle.style("fill","#bababa");
                }
            }
            colorVar=[];
            return;
        }
        else if(colorVar!="Gender"&&colorVar!="day/night"&&colorVar!="Rating"&&colorVar=="Brand"){
            for(var i=0;i<points.length;i++){
                points[i].circle.style("fill", "#bababa");
            }
            colorVar=[];
            return;
        }
        else if(colorVar=="Gender"){
            _.forEach(points, function (p) {
                p.circle.style("fill", function (d) {
                    if (!colorVar) {
                        return "black";
                    }

                    return color(p.data[colorVar])

                });
            });
        }
        else if(colorVar=="day/night"){
            //Append multiple color stops by using D3's data/enter step
            _.forEach(points, function (p) {
                p.circle
                    .style("fill", function(d) { return color(p.data[colorVar]); });
            });
        }
        else if(colorVar=="Rating"){
            //Append multiple color stops by using D3's data/enter step
            _.forEach(points, function (p) {
                p.circle
                    .style("fill", function(d) { return color(p.data[colorVar]); });
            });
        }

    };

    this.appendNodesInfor = function () {

        var info = d3.select("#info");

        _.forEach(points, function (p) {

            p.circle.on("mouseover", function (d) {
                d3.select(this)
                    .classed("selected", true)
                    .attr("r", 8);

                if (colorVar.length!=0) {

                    if(colorVar!="Brand"){
                        var brandCategory = info.select("#brand").selectAll("p").data(["Designer"]);
                        brandCategory.remove();
                        var colorCategory = info.select("#colorCategory").selectAll("p").data([colorVar]);
                        colorCategory.exit().remove();
                        colorCategory.enter().append("p");

                        colorCategory.text(function (varName) {
                            return varName + ":  " + p.data[varName]
                        })
                            .style("color", function (varName) {
                                return color(p.data[varName]);
                            });
                    }
                }
                if(colorVar.length==0){
                    var colorCategory = info.select("#colorCategory").selectAll("p").data([colorVar]);
                    colorCategory.remove();

                    if(brand){
                        var brandCategory = info.select("#brand").selectAll("p").data(["Designer"]);
                        brandCategory.exit().remove();
                        brandCategory.enter().append("p");


                        for(var i=0;i<1;i++){

                            if(p.data["Designer"]==brand){
                                brandCategory.text(function (varName) {
                                    return "Brand" + ":  " +p.data[varName]
                                })
                                    .style("color","#FF689F");
                            }
                            else{
                                brandCategory.text(function (varName) {
                                    return "Brand" + ":  " +p.data[varName]
                                })
                                    .style("color","#bababa");
                            }
                        }
                    }
                }

                _.forEach(that.dimensions, function (dimension) {
                    _.forEach(dimension, function (d) {
                        var n = info.select("#numeric").selectAll("p").data(numeric);
                        n.exit().remove();
                        n.enter().append("p");
                        n.text(function (d) {
                            return d + ":  " + p.data[d]
                        });
                    });
                });

                _.forEach(that.dimensions, function (dimension) {
                    _.forEach(dimension, function (d) {
                        var n = info.select("#name").selectAll("p").data(["Name"]);
                        n.exit().remove();
                        n.enter().append("p");
                        n.text(function (d) {
                            return d + ":  " + p.data[d]
                        })
                        n.append("br")
                        n.append("br");
                    });
                });

                var coordinates = d3.mouse(root.node());
                var bbox = root.node().getBoundingClientRect();
                coordinates[0] += bbox.left;
                coordinates[1] += bbox.top;

                info.style({
                    left: (coordinates[0] + 25) + "px",
                    top: (coordinates[1] ) + "px",
                }).classed("hidden", false);
            })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .classed("selected", false)
                        .attr("r", 2);

                    var info = d3.select("#info");
                    info.classed("hidden", true);
                });
        });
    };

    this.appendNodesChart = function () {

        d3.select("#barchart").remove();
        d3.select("#radarChart").remove();

        RadarChart.defaultConfig.color = function() {};
        RadarChart.defaultConfig.radius = 3;
        RadarChart.defaultConfig.w = 200;
        RadarChart.defaultConfig.h = 200;

        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 10,
            right: 25,
            bottom: 15,
            left: 40
        };

        var width = 240 - margin.left - margin.right,
            height = 180 - margin.top - margin.bottom;

        var subview = d3.select("#subview");
        var svg = subview.select("#perfume-vote").append("svg").attr("id","barchart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);
        var data=[];

        if(prepoint.length>=1)
        {

            if (compare == "Season") {
                data = [
                    {
                        className: 'Season', // optional can be used for styling
                        axes: [
                            {axis: season[0], value: prepoint[prepoint.length-1]["spring"]},
                            {axis: season[1], value: prepoint[prepoint.length-1]["summer"]},
                            {axis: season[2], value: prepoint[prepoint.length-1]["autumn"]},
                            {axis: season[3], value: prepoint[prepoint.length-1]["winter"]}
                        ]
                    }
                ];
            }
            else if (compare == "Sillage") {
                data = [
                    {
                        className: 'Sillage', // optional can be used for styling
                        axes: [
                            {axis: sillage[0], value: prepoint[prepoint.length-1]["sillagesoft"]},
                            {axis: sillage[1], value: prepoint[prepoint.length-1]["sillagemoderate"]},
                            {axis: sillage[2], value: prepoint[prepoint.length-1]["sillageheavy"]},
                            {axis: sillage[3], value: prepoint[prepoint.length-1]["sillageenormous"]}
                        ]
                    }
                ];
            }
            else if (compare == "Longevity") {
                data = [
                    {
                        className: 'Longevity', // optional can be used for styling
                        axes: [
                            {axis: longevity[0], value: prepoint[prepoint.length-1]["longevitypoor"]},
                            {axis: longevity[1], value: prepoint[prepoint.length-1]["longevityweak"]},
                            {axis: longevity[2], value: prepoint[prepoint.length-1]["longevitymoderate"]},
                            {axis: longevity[3], value: prepoint[prepoint.length-1]["longevitylonglasting"]},
                            {axis: longevity[4], value: prepoint[prepoint.length-1]["longevityverylonglasting"]}
                        ]
                    }
                ];
            }
            else if (compare == "Notes") {
                data = [
                    {
                        className: ['Notes'], // optional can be used for styling
                        axes: [
                            {axis: notes[0], value: prepoint[prepoint.length-1]["MUSK__AMBER__ANIMALIC_SMELLS"]},
                            {axis: notes[1], value: prepoint[prepoint.length-1]["SWEETS_AND_GOURMAND_SMELLS"]},
                            {axis: notes[2], value: prepoint[prepoint.length-1]["RESINS_AND_BALSAMS"]},
                            {axis: notes[3], value: prepoint[prepoint.length-1]["SPICES"]},
                            {axis: notes[4], value: prepoint[prepoint.length-1]["WOODS_AND_MOSSES"]},
                            {axis: notes[5], value: prepoint[prepoint.length-1]["BEVERAGES"]},
                            {axis: notes[6], value: prepoint[prepoint.length-1]["CITRUS_SMELLS"]},
                            {axis: notes[7], value: prepoint[prepoint.length-1]["NATURAL_AND_SYNTHETIC__POPULAR_AND_WEIRD"]},
                            {axis: notes[8], value: prepoint[prepoint.length-1]["GREENS__HERBS_AND_FOUGERES"]},
                            {axis: notes[9], value: prepoint[prepoint.length-1]["FRUITS__VEGETABLES_AND_NUTS"]},
                            {axis: notes[10], value: prepoint[prepoint.length-1]["FLOWERS"]},
                            {axis: notes[11], value: prepoint[prepoint.length-1]["WHITE_FLOWERS"]}
                        ]
                    }
                ];
            }

            d3.select("#radarChart").remove();

            var chart = RadarChart.chart();
            var cfg = chart.config({
                containerClass: 'radar-chart', // target with css, the default stylesheet targets .radar-chart
                w: 200,
                h: 200,
                factor: 0.8,
                factorLegend: 0.95,
                levels: 3,
                maxValue: 0,
                minValue: 0,
                radians: 2 * Math.PI,
                color: function(i) {
                    c = ["#dd2e36"];
                    return c[i]},//color: d3.scale.category10(), // pass a noop (function() {}) to decide color via css
                axisLine: true,
                axisText: true,
                circles: true,
                radius: 0,
                open: false,  // whether or not the last axis value should connect back to the first axis value
                              // if true, consider modifying the chart opacity (see "Style with CSS" section above)
                axisJoin: function (d, i) {
                    return d.className || i;
                },
                tooltipFormatValue: function (d) {
                    return d;
                },
                tooltipFormatClass: function (d) {
                    return d;
                },
                transitionDuration: 300,
                facet: false,
                levelScale: 0.85,
                labelScale: 5.0,
                facetPaddingScale: 2.1,
                showLevels: true,
                showLevelsLabels: true,
                showAxesLabels: true,
                showAxes: true,
                showLegend: true,
                showVertices: true,
                showPolygons: true,
                polygonAreaOpacity: 0.3,
                polygonStrokeOpacity: 1,
                polygonPointSize: 4,
                legendBoxSize: 50,
                legendPosition: {x: 20, y: 20},
                paddingX: 10,
                paddingY: 30
            });

            var svg = d3.select('.radar-chart').append('svg').attr("id","radarChart");
            svg.attr('width', 200).attr('height', 200);
            svg.append('g').classed('single', 1).datum(data).call(chart);

            var data =[{"name": "love","value": prepoint[prepoint.length-1]["love"]}, {"name": "like","value": prepoint[prepoint.length-1]["like"]},{"name": "dislike","value": prepoint[prepoint.length-1]["dislike"]}];

            //sort bars based on value
            data = data.sort(function (a, b) {
                return d3.ascending(a.value, b.value);
            });

            d3.select("#barchart").remove();

            var svg = subview.select("#perfume-vote").append("svg").attr("id","barchart")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(5,15)");

            subview.select("#barchart").append("text").text("Vote").attr("transform", "translate(10,"+margin.top+")").style("font-weight","bold");

            var x = d3.scale.linear()
                .range([0, width-120])
                .domain([0, d3.max(data, function (d) {
                    return d.value;
                })]);

            var y = d3.scale.ordinal()
                .rangeRoundBands([height-30, 0], 1)
                .domain(data.map(function (d) {
                    return d.name;
                }));

            //make y axis to show bar names
            var yAxis = d3.svg.axis()
                .scale(y)
                //no tick marks
                .tickSize(0)
                .orient("left");

            var gy = svg.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(40,0)")
                .call(yAxis);

            var bars = svg.selectAll(".bar")
                .data(data)
                .enter()
                .append("g");

            //append rects
            bars.append("rect")
                .style("fill","#d3d3d3")
                .attr("class", "bar")
                .attr("y", function (d) {
                    return y(d.name)-10;
                })
                .attr("height", 20)
                .attr("x", 50)
                .attr("width", function (d) {
                    return x(d.value);
                });

            //add a value label to the right of each bar
            bars.append("text")
                .attr("class", "label")
                //y position of the label is halfway down the bar
                .attr("y", function (d) {
                    return y(d.name);
                })
                //x position is 3 pixels to the right of the bar
                .attr("x", function (d) {
                    return x(d.value) + 60;
                })
                .text(function (d) {
                    return d.value.substring(0,4);
                });
        }

        _.forEach(points, function (p) {
            p.circle.on("click", function (d) {
                d3.select("#perfume-content").style("display","block");
                d3.selectAll("#img0").style("display","none");
                d3.selectAll("#img1").style("display","none");
                d3.selectAll("#img2").style("display","none");
                d3.selectAll("#img3").style("display","none");
                d3.selectAll("#img4").style("display","none");

                prepoint2 =[];

                prepoint.push(p.data);
                console.log(prepoint[prepoint.length-1]["spring"]);

                d3.select(this)
                    .classed("selected", true)
                    .attr("r", 8);

                if(compare)
                {
                    if (compare == "Season") {
                        data = [
                            {
                                className: 'Season', // optional can be used for styling
                                axes: [
                                    {axis: season[0], value: p.data["spring"]},
                                    {axis: season[1], value: p.data["summer"]},
                                    {axis: season[2], value: p.data["autumn"]},
                                    {axis: season[3], value: p.data["winter"]}
                                ]
                            }
                        ];
                    }
                    else if (compare == "Sillage") {
                        data = [
                            {
                                className: 'Sillage', // optional can be used for styling
                                axes: [
                                    {axis: sillage[0], value: p.data["sillagesoft"]},
                                    {axis: sillage[1], value: p.data["sillagemoderate"]},
                                    {axis: sillage[2], value: p.data["sillageheavy"]},
                                    {axis: sillage[3], value: p.data["sillageenormous"]}
                                ]
                            }
                        ];
                    }
                    else if (compare == "Longevity") {
                        data = [
                            {
                                className: 'Longevity', // optional can be used for styling
                                axes: [
                                    {axis: longevity[0], value: p.data["longevitypoor"]},
                                    {axis: longevity[1], value: p.data["longevityweak"]},
                                    {axis: longevity[2], value: p.data["longevitymoderate"]},
                                    {axis: longevity[3], value: p.data["longevitylonglasting"]},
                                    {axis: longevity[4], value: p.data["longevityverylonglasting"]}
                                ]
                            }
                        ];
                    }
                    else if (compare == "Notes") {
                        data = [
                            {
                                className: ['Notes'], // optional can be used for styling
                                axes: [
                                    {axis: notes[0], value: p.data["MUSK__AMBER__ANIMALIC_SMELLS"]},
                                    {axis: notes[1], value: p.data["SWEETS_AND_GOURMAND_SMELLS"]},
                                    {axis: notes[2], value: p.data["RESINS_AND_BALSAMS"]},
                                    {axis: notes[3], value: p.data["SPICES"]},
                                    {axis: notes[4], value: p.data["WOODS_AND_MOSSES"]},
                                    {axis: notes[5], value: p.data["BEVERAGES"]},
                                    {axis: notes[6], value: p.data["CITRUS_SMELLS"]},
                                    {axis: notes[7], value: p.data["NATURAL_AND_SYNTHETIC__POPULAR_AND_WEIRD"]},
                                    {axis: notes[8], value: p.data["GREENS__HERBS_AND_FOUGERES"]},
                                    {axis: notes[9], value: p.data["FRUITS__VEGETABLES_AND_NUTS"]},
                                    {axis: notes[10], value: p.data["FLOWERS"]},
                                    {axis: notes[11], value: p.data["WHITE_FLOWERS"]}
                                ]
                            }
                        ];
                    }

                    d3.select("#radarChart").remove();

                    var chart = RadarChart.chart();
                    var cfg = chart.config({
                        containerClass: 'radar-chart', // target with css, the default stylesheet targets .radar-chart
                        w: 200,
                        h: 200,
                        factor: 0.8,
                        factorLegend: 0.95,
                        levels: 3,
                        maxValue: 0,
                        minValue: 0,
                        radians: 2 * Math.PI,
                        color: function(i) {
                            c = ["#dd2e36"];
                            return c[i]},//color: d3.scale.category10(), // pass a noop (function() {}) to decide color via css
                        axisLine: true,
                        axisText: true,
                        circles: true,
                        radius: 0,
                        open: false,  // whether or not the last axis value should connect back to the first axis value
                                      // if true, consider modifying the chart opacity (see "Style with CSS" section above)
                        axisJoin: function (d, i) {
                            return d.className || i;
                        },
                        tooltipFormatValue: function (d) {
                            return d;
                        },
                        tooltipFormatClass: function (d) {
                            return d;
                        },
                        transitionDuration: 300,
                        facet: false,
                        levelScale: 0.85,
                        labelScale: 5.0,
                        facetPaddingScale: 2.1,
                        showLevels: true,
                        showLevelsLabels: true,
                        showAxesLabels: true,
                        showAxes: true,
                        showLegend: true,
                        showVertices: true,
                        showPolygons: true,
                        polygonAreaOpacity: 0.3,
                        polygonStrokeOpacity: 1,
                        polygonPointSize: 4,
                        legendBoxSize: 50,
                        legendPosition: {x: 20, y: 20},
                        paddingX: 10,
                        paddingY: 30
                    });

                    var svg = d3.select('.radar-chart').append('svg').attr("id","radarChart");
                    svg.attr('width', 200).attr('height', 200);
                    svg.append('g').classed('single', 1).datum(data).call(chart);
                }

                var img = subview.select("#img").data(["Img_url"]);
                img.style("display","block");
                img.attr("src",p.data["Img_url"]);

                var selectbox = subview.select(".comparison-select-box");
                selectbox.style("display","block");

                var perfume_name = subview.select("#perfume-name").data(["Name"]);
                perfume_name.exit().remove();
                perfume_name.enter().append("p");
                perfume_name.text("Name").style("font-weight","bold").style("margin-left","10px").style("margin-top","10px")
                perfume_name.append("text").text(": "+p.data["Name"]).style("font-weight","normal");

                var perfume_brand = subview.select("#perfume-brand").data(["Designer"]);
                perfume_brand.exit().remove();
                perfume_brand.enter().append("p");
                perfume_brand.text("Brand").style("font-weight","bold").style("margin-left","10px")
                perfume_brand.append("text").text(": "+p.data["Designer"]).style("font-weight","normal");

                var perfume_gender = subview.select("#perfume-gender").data(["Gender"]);
                perfume_gender.exit().remove();
                perfume_gender.enter().append("p");
                perfume_gender.text("Gender").style("font-weight","bold").style("margin-left","10px")
                perfume_gender.append("text").text(": "+p.data["Gender"]).style("font-weight","normal");


                var data =[{"name": "love","value": p.data["love"]}, {"name": "like","value": p.data["like"]},{"name": "dislike","value": p.data["dislike"]}];

                //sort bars based on value
                data = data.sort(function (a, b) {
                    return d3.ascending(a.value, b.value);
                });

                d3.select("#barchart").remove();

                var svg = subview.select("#perfume-vote").append("svg").attr("id","barchart")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(5,15)");

                subview.select("#barchart").append("text").text("Vote").attr("transform", "translate(10,"+margin.top+")").style("font-weight","bold");

                var x = d3.scale.linear()
                    .range([0, width-120])
                    .domain([0, d3.max(data, function (d) {
                        return d.value;
                    })]);

                var y = d3.scale.ordinal()
                    .rangeRoundBands([height-30, 0], 1)
                    .domain(data.map(function (d) {
                        return d.name;
                    }));

                //make y axis to show bar names
                var yAxis = d3.svg.axis()
                    .scale(y)
                    //no tick marks
                    .tickSize(0)
                    .orient("left");

                var gy = svg.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(40,0)")
                    .call(yAxis);

                var bars = svg.selectAll(".bar")
                    .data(data)
                    .enter()
                    .append("g");

                //append rects
                bars.append("rect")
                    .style("fill","#d3d3d3")
                    .attr("class", "bar")
                    .attr("y", function (d) {
                        return y(d.name)-10;
                    })
                    .attr("height", 20)
                    .attr("x", 50)
                    .attr("width", function (d) {
                        return x(d.value);
                    });

                //add a value label to the right of each bar
                bars.append("text")
                    .attr("class", "label")
                    //y position of the label is halfway down the bar
                    .attr("y", function (d) {
                        return y(d.name);
                    })
                    //x position is 3 pixels to the right of the bar
                    .attr("x", function (d) {
                        return x(d.value) + 60;
                    })
                    .text(function (d) {
                        return d.value.substring(0,4);
                    });


            });
        });


    };

    this.appendselectedPerfumeChart = function () {

        d3.select("#img").style('display','none');
        d3.select("#barchart").remove();
        d3.select("#radarChart").remove();
        d3.select("#perfume-content").style("display","block");

        RadarChart.defaultConfig.color = function() {};
        RadarChart.defaultConfig.radius = 3;
        RadarChart.defaultConfig.w = 200;
        RadarChart.defaultConfig.h = 200;

        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 10,
            right: 25,
            bottom: 15,
            left: 40
        };

        var width = 240 - margin.left - margin.right,
            height = 180 - margin.top - margin.bottom;

        var subview = d3.select("#subview");
        var svg = subview.select("#perfume-vote").append("svg").attr("id","barchart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        var data=[];
        var Data=[];

        if(perfume_name_list.length<=5){
            Data=[
                {
                    className: '', // optional can be used for styling
                    axes: []
                }
            ];
            for(var i=0;i<perfume_name_list.length;i++){

                _.forEach(points, function (p) {
                        if (p.data['Name'] == perfume_name_list[i]){

                            var img = subview.select("#img"+i).data(["Img_url"]);
                            img.style("display","block");
                            img.attr("src",p.data["Img_url"]);

                            prepoint =[];
                            prepoint2.push(p.data);

                            if(prepoint2.length>=1)
                            {

                                if (compare == "Season") {
                                    if(i==0){
                                        Data =[
                                            {
                                                className: p.data["Name"], // optional can be used for styling
                                                axes: [
                                                    {axis: season[0], value: p.data["spring"]},
                                                    {axis: season[1], value: p.data["summer"]},
                                                    {axis: season[2], value: p.data["autumn"]},
                                                    {axis: season[3], value: p.data["winter"]}
                                                ]
                                            }
                                        ];
                                    }
                                    else{
                                        Data.push({
                                            className: p.data["Name"], // optional can be used for styling
                                            axes: [
                                                {axis: season[0], value: p.data["spring"]},
                                                {axis: season[1], value: p.data["summer"]},
                                                {axis: season[2], value: p.data["autumn"]},
                                                {axis: season[3], value: p.data["winter"]}
                                            ]
                                        });
                                    }
                                    console.log(Data)
                                }
                                else if (compare == "Sillage") {
                                    if(i==0){
                                        Data =[
                                            {
                                                className: p.data["Name"], // optional can be used for styling
                                                axes: [
                                                    {axis: sillage[0], value: p.data["sillagesoft"]},
                                                    {axis: sillage[1], value: p.data["sillagemoderate"]},
                                                    {axis: sillage[2], value: p.data["sillageheavy"]},
                                                    {axis: sillage[3], value: p.data["sillageenormous"]}
                                                ]
                                            }
                                        ];
                                    }
                                    else{
                                        Data.push({
                                            className: p.data["Name"], // optional can be used for styling
                                            axes: [
                                                {axis: sillage[0], value: p.data["sillagesoft"]},
                                                {axis: sillage[1], value: p.data["sillagemoderate"]},
                                                {axis: sillage[2], value: p.data["sillageheavy"]},
                                                {axis: sillage[3], value: p.data["sillageenormous"]}
                                            ]
                                        });
                                    }
                                    console.log(Data)
                                }
                                else if (compare == "Longevity") {
                                    if(i==0){
                                        Data =[
                                            {
                                                className: p.data["Name"], // optional can be used for styling
                                                axes: [
                                                    {axis: longevity[0], value: p.data["longevitypoor"]},
                                                    {axis: longevity[1], value: p.data["longevityweak"]},
                                                    {axis: longevity[2], value: p.data["longevitymoderate"]},
                                                    {axis: longevity[3], value: p.data["longevitylonglasting"]},
                                                    {axis: longevity[4], value: p.data["longevityverylonglasting"]}
                                                ]
                                            }
                                        ];
                                    }
                                    else{
                                        Data.push({
                                            className: p.data["Name"], // optional can be used for styling
                                            axes: [
                                                {axis: longevity[0], value: p.data["longevitypoor"]},
                                                {axis: longevity[1], value: p.data["longevityweak"]},
                                                {axis: longevity[2], value: p.data["longevitymoderate"]},
                                                {axis: longevity[3], value: p.data["longevitylonglasting"]},
                                                {axis: longevity[4], value: p.data["longevityverylonglasting"]}
                                            ]
                                        });
                                    }
                                    console.log(Data)

                                }
                                else if (compare == "Notes") {
                                    if(i==0){
                                        Data =[
                                            {
                                                className: p.data["Name"], // optional can be used for styling
                                                axes: [
                                                    {axis: notes[0], value: p.data["MUSK__AMBER__ANIMALIC_SMELLS"]},
                                                    {axis: notes[1], value: p.data["SWEETS_AND_GOURMAND_SMELLS"]},
                                                    {axis: notes[2], value: p.data["RESINS_AND_BALSAMS"]},
                                                    {axis: notes[3], value: p.data["SPICES"]},
                                                    {axis: notes[4], value: p.data["WOODS_AND_MOSSES"]},
                                                    {axis: notes[5], value: p.data["BEVERAGES"]},
                                                    {axis: notes[6], value: p.data["CITRUS_SMELLS"]},
                                                    {axis: notes[7], value: p.data["NATURAL_AND_SYNTHETIC__POPULAR_AND_WEIRD"]},
                                                    {axis: notes[8], value: p.data["GREENS__HERBS_AND_FOUGERES"]},
                                                    {axis: notes[9], value: p.data["FRUITS__VEGETABLES_AND_NUTS"]},
                                                    {axis: notes[10], value: p.data["FLOWERS"]},
                                                    {axis: notes[11], value: p.data["WHITE_FLOWERS"]}
                                                ]
                                            }
                                        ];
                                    }
                                    else{
                                        Data.push({
                                            className: p.data["Name"], // optional can be used for styling
                                            axes: [
                                                {axis: notes[0], value: p.data["MUSK__AMBER__ANIMALIC_SMELLS"]},
                                                {axis: notes[1], value: p.data["SWEETS_AND_GOURMAND_SMELLS"]},
                                                {axis: notes[2], value: p.data["RESINS_AND_BALSAMS"]},
                                                {axis: notes[3], value: p.data["SPICES"]},
                                                {axis: notes[4], value: p.data["WOODS_AND_MOSSES"]},
                                                {axis: notes[5], value: p.data["BEVERAGES"]},
                                                {axis: notes[6], value: p.data["CITRUS_SMELLS"]},
                                                {axis: notes[7], value: p.data["NATURAL_AND_SYNTHETIC__POPULAR_AND_WEIRD"]},
                                                {axis: notes[8], value: p.data["GREENS__HERBS_AND_FOUGERES"]},
                                                {axis: notes[9], value: p.data["FRUITS__VEGETABLES_AND_NUTS"]},
                                                {axis: notes[10], value: p.data["FLOWERS"]},
                                                {axis: notes[11], value: p.data["WHITE_FLOWERS"]}
                                            ]
                                        });
                                    }
                                    console.log(Data)
                                }

                                d3.select("#radarChart").remove();

                                var chart = RadarChart.chart();
                                var cfg = chart.config({
                                    containerClass: 'radar-chart', // target with css, the default stylesheet targets .radar-chart
                                    w: 200,
                                    h: 200,
                                    factor: 0.8,
                                    factorLegend: 0.95,
                                    levels: 3,
                                    maxValue: 0,
                                    minValue: 0,
                                    radians: 2 * Math.PI,
                                    color: function(i) {
                                        c = ["#E10B7B", "#CA1C82", "#9A1931", "#B85B27", "#BF8837",
                                            "#8C844F", "#EEB23C", "#2B9555", "#7DBA55", "#EB7823", "#E6362C", "#E86EA3"];
                                        return c[i]},//color: d3.scale.category10(), // pass a noop (function() {}) to decide color via css
                                    axisLine: true,
                                    axisText: true,
                                    circles: true,
                                    radius: 0,
                                    open: false,  // whether or not the last axis value should connect back to the first axis value
                                                  // if true, consider modifying the chart opacity (see "Style with CSS" section above)
                                    axisJoin: function (d, i) {
                                        return d.className || i;
                                    },
                                    tooltipFormatValue: function (d) {
                                        return d;
                                    },
                                    tooltipFormatClass: function (d) {
                                        return d;
                                    },
                                    transitionDuration: 300,
                                    facet: false,
                                    levelScale: 0.85,
                                    labelScale: 5.0,
                                    facetPaddingScale: 2.1,
                                    showLevels: true,
                                    showLevelsLabels: true,
                                    showAxesLabels: true,
                                    showAxes: true,
                                    showLegend: true,
                                    showVertices: true,
                                    showPolygons: true,
                                    polygonAreaOpacity: 0.3,
                                    polygonStrokeOpacity: 1,
                                    polygonPointSize: 4,
                                    legendBoxSize: 50,
                                    legendPosition: {x: 20, y: 20},
                                    paddingX: 10,
                                    paddingY: 30
                                });

                                var svg = d3.select('.radar-chart').append('svg').attr("id","radarChart");
                                svg.attr('width', 200).attr('height', 200);
                                svg.append('g').classed('single', 1).datum(Data).call(chart);

                                var data =[{"name": "love","value": prepoint2[prepoint2.length-1]["love"]}, {"name": "like","value": prepoint2[prepoint2.length-1]["like"]},{"name": "dislike","value": prepoint2[prepoint2.length-1]["dislike"]}];

                                //sort bars based on value
                                data = data.sort(function (a, b) {
                                    return d3.ascending(a.value, b.value);
                                });

                                d3.select("#barchart").remove();

                                var svg = subview.select("#perfume-vote").append("svg").attr("id","barchart")
                                    .attr("width", width + margin.left + margin.right)
                                    .attr("height", height + margin.top + margin.bottom)
                                    .append("g")
                                    .attr("transform", "translate(5,15)");

                                subview.select("#barchart").append("text").text("Vote").attr("transform", "translate(10,"+margin.top+")").style("font-weight","bold");

                                var x = d3.scale.linear()
                                    .range([0, width-120])
                                    .domain([0, d3.max(data, function (d) {
                                        return d.value;
                                    })]);

                                var y = d3.scale.ordinal()
                                    .rangeRoundBands([height-30, 0], 1)
                                    .domain(data.map(function (d) {
                                        return d.name;
                                    }));

                                //make y axis to show bar names
                                var yAxis = d3.svg.axis()
                                    .scale(y)
                                    //no tick marks
                                    .tickSize(0)
                                    .orient("left");

                                var gy = svg.append("g")
                                    .attr("class", "y axis")
                                    .attr("transform", "translate(40,0)")
                                    .call(yAxis);

                                var bars = svg.selectAll(".bar")
                                    .data(data)
                                    .enter()
                                    .append("g");

                                //append rects
                                bars.append("rect")
                                    .style("fill","#d3d3d3")
                                    .attr("class", "bar")
                                    .attr("y", function (d) {
                                        return y(d.name)-10;
                                    })
                                    .attr("height", 20)
                                    .attr("x", 50)
                                    .attr("width", function (d) {
                                        return x(d.value);
                                    });

                                //add a value label to the right of each bar
                                bars.append("text")
                                    .attr("class", "label")
                                    //y position of the label is halfway down the bar
                                    .attr("y", function (d) {
                                        return y(d.name);
                                    })
                                    //x position is 3 pixels to the right of the bar
                                    .attr("x", function (d) {
                                        return x(d.value) + 60;
                                    })
                                    .text(function (d) {
                                        return d.value.substring(0,4);
                                    });

                                var polygon =  d3.select("#radarChart").selectAll(".area").data(data, cfg.axisJoin);
                                polygon
                                    .on("click", function () {
                                        var pname = this.getAttribute('class').substring(24,this.getAttribute('class').length);
                                        console.log(pname);
                                        _.forEach(points,function (p) {
                                            if(p.data["Name"]==pname){
                                                var perfume_name = subview.select("#perfume-name").data(["Name"]);
                                                perfume_name.exit().remove();
                                                perfume_name.enter().append("p");
                                                perfume_name.text("Name").style("font-weight","bold").style("margin-left","10px").style("margin-top","10px")
                                                perfume_name.append("text").text(": "+p.data["Name"]).style("font-weight","normal");

                                                var perfume_brand = subview.select("#perfume-brand").data(["Designer"]);
                                                perfume_brand.exit().remove();
                                                perfume_brand.enter().append("p");
                                                perfume_brand.text("Brand").style("font-weight","bold").style("margin-left","10px")
                                                perfume_brand.append("text").text(": "+p.data["Designer"]).style("font-weight","normal");

                                                var perfume_gender = subview.select("#perfume-gender").data(["Gender"]);
                                                perfume_gender.exit().remove();
                                                perfume_gender.enter().append("p");
                                                perfume_gender.text("Gender").style("font-weight","bold").style("margin-left","10px")
                                                perfume_gender.append("text").text(": "+p.data["Gender"]).style("font-weight","normal");


                                                var data =[{"name": "love","value": p.data["love"]}, {"name": "like","value": p.data["like"]},{"name": "dislike","value": p.data["dislike"]}];

                                                //sort bars based on value
                                                data = data.sort(function (a, b) {
                                                    return d3.ascending(a.value, b.value);
                                                });

                                                d3.select("#barchart").remove();

                                                var svg = subview.select("#perfume-vote").append("svg").attr("id","barchart")
                                                    .attr("width", width + margin.left + margin.right)
                                                    .attr("height", height + margin.top + margin.bottom)
                                                    .append("g")
                                                    .attr("transform", "translate(5,15)");

                                                subview.select("#barchart").append("text").text("Vote").attr("transform", "translate(10,"+margin.top+")").style("font-weight","bold");

                                                var x = d3.scale.linear()
                                                    .range([0, width-120])
                                                    .domain([0, d3.max(data, function (d) {
                                                        return d.value;
                                                    })]);

                                                var y = d3.scale.ordinal()
                                                    .rangeRoundBands([height-30, 0], 1)
                                                    .domain(data.map(function (d) {
                                                        return d.name;
                                                    }));

                                                //make y axis to show bar names
                                                var yAxis = d3.svg.axis()
                                                    .scale(y)
                                                    //no tick marks
                                                    .tickSize(0)
                                                    .orient("left");

                                                var gy = svg.append("g")
                                                    .attr("class", "y axis")
                                                    .attr("transform", "translate(40,0)")
                                                    .call(yAxis);

                                                var bars = svg.selectAll(".bar")
                                                    .data(data)
                                                    .enter()
                                                    .append("g");

                                                //append rects
                                                bars.append("rect")
                                                    .style("fill","#d3d3d3")
                                                    .attr("class", "bar")
                                                    .attr("y", function (d) {
                                                        return y(d.name)-10;
                                                    })
                                                    .attr("height", 20)
                                                    .attr("x", 50)
                                                    .attr("width", function (d) {
                                                        return x(d.value);
                                                    });

                                                //add a value label to the right of each bar
                                                bars.append("text")
                                                    .attr("class", "label")
                                                    //y position of the label is halfway down the bar
                                                    .attr("y", function (d) {
                                                        return y(d.name);
                                                    })
                                                    //x position is 3 pixels to the right of the bar
                                                    .attr("x", function (d) {
                                                        return x(d.value) + 60;
                                                    })
                                                    .text(function (d) {
                                                        return d.value.substring(0,4);
                                                    });
                                            }
                                        });
                                    })
                                    .on('mouseover', function (){
                                        $(this).css('opacity','0.7')
                                    })
                                    .on('mouseout', function(){
                                        $(this).css('opacity','1.0')
                                    });

                            }

                            if(compare)
                            {
                                    if (compare == "Season") {
                                        if(i==0){
                                            Data =[
                                                    {
                                                        className: p.data["Name"], // optional can be used for styling
                                                        axes: [
                                                            {axis: season[0], value: p.data["spring"]},
                                                            {axis: season[1], value: p.data["summer"]},
                                                            {axis: season[2], value: p.data["autumn"]},
                                                            {axis: season[3], value: p.data["winter"]}
                                                        ]
                                                    }
                                            ];
                                        }
                                        else{
                                            Data.push({
                                                className: p.data["Name"], // optional can be used for styling
                                                axes: [
                                                    {axis: season[0], value: p.data["spring"]},
                                                    {axis: season[1], value: p.data["summer"]},
                                                    {axis: season[2], value: p.data["autumn"]},
                                                    {axis: season[3], value: p.data["winter"]}
                                                ]
                                            });
                                        }
                                        console.log(Data)
                                    }
                                    else if (compare == "Sillage") {
                                        if(i==0){
                                            Data =[
                                                {
                                                    className: p.data["Name"], // optional can be used for styling
                                                    axes: [
                                                        {axis: sillage[0], value: p.data["sillagesoft"]},
                                                        {axis: sillage[1], value: p.data["sillagemoderate"]},
                                                        {axis: sillage[2], value: p.data["sillageheavy"]},
                                                        {axis: sillage[3], value: p.data["sillageenormous"]}
                                                    ]
                                                }
                                            ];
                                        }
                                        else{
                                            Data.push({
                                                className: p.data["Name"], // optional can be used for styling
                                                axes: [
                                                    {axis: sillage[0], value: p.data["sillagesoft"]},
                                                    {axis: sillage[1], value: p.data["sillagemoderate"]},
                                                    {axis: sillage[2], value: p.data["sillageheavy"]},
                                                    {axis: sillage[3], value: p.data["sillageenormous"]}
                                                ]
                                            });
                                        }
                                        console.log(Data)
                                    }
                                    else if (compare == "Longevity") {
                                        if(i==0){
                                            Data =[
                                                {
                                                    className: p.data["Name"], // optional can be used for styling
                                                    axes: [
                                                        {axis: longevity[0], value: p.data["longevitypoor"]},
                                                        {axis: longevity[1], value: p.data["longevityweak"]},
                                                        {axis: longevity[2], value: p.data["longevitymoderate"]},
                                                        {axis: longevity[3], value: p.data["longevitylonglasting"]},
                                                        {axis: longevity[4], value: p.data["longevityverylonglasting"]}
                                                    ]
                                                }
                                            ];
                                        }
                                        else{
                                            Data.push({
                                                className: p.data["Name"], // optional can be used for styling
                                                axes: [
                                                    {axis: longevity[0], value: p.data["longevitypoor"]},
                                                    {axis: longevity[1], value: p.data["longevityweak"]},
                                                    {axis: longevity[2], value: p.data["longevitymoderate"]},
                                                    {axis: longevity[3], value: p.data["longevitylonglasting"]},
                                                    {axis: longevity[4], value: p.data["longevityverylonglasting"]}
                                                ]
                                            });
                                        }
                                        console.log(Data)

                                    }
                                    else if (compare == "Notes") {
                                        if(i==0){
                                            Data =[
                                                {
                                                    className: p.data["Name"], // optional can be used for styling
                                                    axes: [
                                                        {axis: notes[0], value: p.data["MUSK__AMBER__ANIMALIC_SMELLS"]},
                                                        {axis: notes[1], value: p.data["SWEETS_AND_GOURMAND_SMELLS"]},
                                                        {axis: notes[2], value: p.data["RESINS_AND_BALSAMS"]},
                                                        {axis: notes[3], value: p.data["SPICES"]},
                                                        {axis: notes[4], value: p.data["WOODS_AND_MOSSES"]},
                                                        {axis: notes[5], value: p.data["BEVERAGES"]},
                                                        {axis: notes[6], value: p.data["CITRUS_SMELLS"]},
                                                        {axis: notes[7], value: p.data["NATURAL_AND_SYNTHETIC__POPULAR_AND_WEIRD"]},
                                                        {axis: notes[8], value: p.data["GREENS__HERBS_AND_FOUGERES"]},
                                                        {axis: notes[9], value: p.data["FRUITS__VEGETABLES_AND_NUTS"]},
                                                        {axis: notes[10], value: p.data["FLOWERS"]},
                                                        {axis: notes[11], value: p.data["WHITE_FLOWERS"]}
                                                    ]
                                                }
                                            ];
                                        }
                                        else{
                                            Data.push({
                                                className: p.data["Name"], // optional can be used for styling
                                                axes: [
                                                    {axis: notes[0], value: p.data["MUSK__AMBER__ANIMALIC_SMELLS"]},
                                                    {axis: notes[1], value: p.data["SWEETS_AND_GOURMAND_SMELLS"]},
                                                    {axis: notes[2], value: p.data["RESINS_AND_BALSAMS"]},
                                                    {axis: notes[3], value: p.data["SPICES"]},
                                                    {axis: notes[4], value: p.data["WOODS_AND_MOSSES"]},
                                                    {axis: notes[5], value: p.data["BEVERAGES"]},
                                                    {axis: notes[6], value: p.data["CITRUS_SMELLS"]},
                                                    {axis: notes[7], value: p.data["NATURAL_AND_SYNTHETIC__POPULAR_AND_WEIRD"]},
                                                    {axis: notes[8], value: p.data["GREENS__HERBS_AND_FOUGERES"]},
                                                    {axis: notes[9], value: p.data["FRUITS__VEGETABLES_AND_NUTS"]},
                                                    {axis: notes[10], value: p.data["FLOWERS"]},
                                                    {axis: notes[11], value: p.data["WHITE_FLOWERS"]}
                                                ]
                                            });
                                        }
                                        console.log(Data)
                                    }

                                d3.select("#radarChart").remove();
                                var chart = RadarChart.chart();
                                var cfg = chart.config({
                                    containerClass: 'radar-chart', // target with css, the default stylesheet targets .radar-chart
                                    w: 200,
                                    h: 200,
                                    factor: 0.8,
                                    factorLegend: 0.95,
                                    levels: 3,
                                    maxValue: 0,
                                    minValue: 0,
                                    radians: 2 * Math.PI,
                                    /*color: function(i) {
                                        c = ["#E10B7B", "#CA1C82", "#9A1931", "#B85B27", "#BF8837",
                                            "#8C844F", "#EEB23C", "#2B9555", "#7DBA55", "#EB7823", "#E6362C", "#E86EA3"];
                                        return c[i]},*/
                                    color: d3.scale.category10(), // pass a noop (function() {}) to decide color via css
                                    axisLine: true,
                                    axisText: true,
                                    circles: true,
                                    radius: 0,
                                    open: false,  // whether or not the last axis value should connect back to the first axis value
                                                  // if true, consider modifying the chart opacity (see "Style with CSS" section above)
                                    axisJoin: function (d, i) {
                                        return d.className || i;
                                    },
                                    tooltipFormatValue: function (d) {
                                        return d;
                                    },
                                    tooltipFormatClass: function (d) {
                                        return d;
                                    },
                                    transitionDuration: 300,
                                    facet: false,
                                    levelScale: 0.85,
                                    labelScale: 5.0,
                                    facetPaddingScale: 2.1,
                                    showLevels: true,
                                    showLevelsLabels: true,
                                    showAxesLabels: true,
                                    showAxes: true,
                                    showLegend: true,
                                    showVertices: true,
                                    showPolygons: true,
                                    polygonAreaOpacity: 0.3,
                                    polygonStrokeOpacity: 1,
                                    polygonPointSize: 4,
                                    legendBoxSize: 50,
                                    legendPosition: {x: 20, y: 20},
                                    paddingX: 10,
                                    paddingY: 30
                                });

                                var svg = d3.select('.radar-chart').append('svg').attr("id","radarChart");
                                svg.attr('width', 200).attr('height', 200);
                                svg.append('g')
                                    .classed('single', 1)
                                    .datum(Data)
                                    .call(chart)
                                var selectbox = subview.select(".comparison-select-box");
                                selectbox.style("display","block");


                                var perfume_name = subview.select("#perfume-name").data(["Name"]);
                                perfume_name.exit().remove();
                                perfume_name.enter().append("p");
                                perfume_name.text("Name").style("font-weight","bold").style("margin-left","10px").style("margin-top","10px")
                                perfume_name.append("text").text(": "+p.data["Name"]).style("font-weight","normal");

                                var perfume_brand = subview.select("#perfume-brand").data(["Designer"]);
                                perfume_brand.exit().remove();
                                perfume_brand.enter().append("p");
                                perfume_brand.text("Brand").style("font-weight","bold").style("margin-left","10px")
                                perfume_brand.append("text").text(": "+p.data["Designer"]).style("font-weight","normal");

                                var perfume_gender = subview.select("#perfume-gender").data(["Gender"]);
                                perfume_gender.exit().remove();
                                perfume_gender.enter().append("p");
                                perfume_gender.text("Gender").style("font-weight","bold").style("margin-left","10px")
                                perfume_gender.append("text").text(": "+p.data["Gender"]).style("font-weight","normal");


                                var data =[{"name": "love","value": p.data["love"]}, {"name": "like","value": p.data["like"]},{"name": "dislike","value": p.data["dislike"]}];

                                //sort bars based on value
                                data = data.sort(function (a, b) {
                                    return d3.ascending(a.value, b.value);
                                });

                                d3.select("#barchart").remove();

                                var svg = subview.select("#perfume-vote").append("svg").attr("id","barchart")
                                    .attr("width", width + margin.left + margin.right)
                                    .attr("height", height + margin.top + margin.bottom)
                                    .append("g")
                                    .attr("transform", "translate(5,15)");

                                subview.select("#barchart").append("text").text("Vote").attr("transform", "translate(10,"+margin.top+")").style("font-weight","bold");

                                var x = d3.scale.linear()
                                    .range([0, width-120])
                                    .domain([0, d3.max(data, function (d) {
                                        return d.value;
                                    })]);

                                var y = d3.scale.ordinal()
                                    .rangeRoundBands([height-30, 0], 1)
                                    .domain(data.map(function (d) {
                                        return d.name;
                                    }));

                                //make y axis to show bar names
                                var yAxis = d3.svg.axis()
                                    .scale(y)
                                    //no tick marks
                                    .tickSize(0)
                                    .orient("left");

                                var gy = svg.append("g")
                                    .attr("class", "y axis")
                                    .attr("transform", "translate(40,0)")
                                    .call(yAxis);

                                var bars = svg.selectAll(".bar")
                                    .data(data)
                                    .enter()
                                    .append("g");

                                //append rects
                                bars.append("rect")
                                    .style("fill","#d3d3d3")
                                    .attr("class", "bar")
                                    .attr("y", function (d) {
                                        return y(d.name)-10;
                                    })
                                    .attr("height", 20)
                                    .attr("x", 50)
                                    .attr("width", function (d) {
                                        return x(d.value);
                                    });

                                //add a value label to the right of each bar
                                bars.append("text")
                                    .attr("class", "label")
                                    //y position of the label is halfway down the bar
                                    .attr("y", function (d) {
                                        return y(d.name);
                                    })
                                    //x position is 3 pixels to the right of the bar
                                    .attr("x", function (d) {
                                        return x(d.value) + 60;
                                    })
                                    .text(function (d) {
                                        return d.value.substring(0,4);
                                    });

                                var polygon =  d3.select("#radarChart").selectAll(".area").data(data, cfg.axisJoin);
                                polygon
                                    .on("click", function () {
                                        var pname = this.getAttribute('class').substring(24,this.getAttribute('class').length);
                                        console.log(pname);
                                        _.forEach(points,function (p) {
                                            if(p.data["Name"]==pname){
                                                var perfume_name = subview.select("#perfume-name").data(["Name"]);
                                                perfume_name.exit().remove();
                                                perfume_name.enter().append("p");
                                                perfume_name.text("Name").style("font-weight","bold").style("margin-left","10px").style("margin-top","10px")
                                                perfume_name.append("text").text(": "+p.data["Name"]).style("font-weight","normal");

                                                var perfume_brand = subview.select("#perfume-brand").data(["Designer"]);
                                                perfume_brand.exit().remove();
                                                perfume_brand.enter().append("p");
                                                perfume_brand.text("Brand").style("font-weight","bold").style("margin-left","10px")
                                                perfume_brand.append("text").text(": "+p.data["Designer"]).style("font-weight","normal");

                                                var perfume_gender = subview.select("#perfume-gender").data(["Gender"]);
                                                perfume_gender.exit().remove();
                                                perfume_gender.enter().append("p");
                                                perfume_gender.text("Gender").style("font-weight","bold").style("margin-left","10px")
                                                perfume_gender.append("text").text(": "+p.data["Gender"]).style("font-weight","normal");


                                                var data =[{"name": "love","value": p.data["love"]}, {"name": "like","value": p.data["like"]},{"name": "dislike","value": p.data["dislike"]}];

                                                //sort bars based on value
                                                data = data.sort(function (a, b) {
                                                    return d3.ascending(a.value, b.value);
                                                });

                                                d3.select("#barchart").remove();

                                                var svg = subview.select("#perfume-vote").append("svg").attr("id","barchart")
                                                    .attr("width", width + margin.left + margin.right)
                                                    .attr("height", height + margin.top + margin.bottom)
                                                    .append("g")
                                                    .attr("transform", "translate(5,15)");

                                                subview.select("#barchart").append("text").text("Vote").attr("transform", "translate(10,"+margin.top+")").style("font-weight","bold");

                                                var x = d3.scale.linear()
                                                    .range([0, width-120])
                                                    .domain([0, d3.max(data, function (d) {
                                                        return d.value;
                                                    })]);

                                                var y = d3.scale.ordinal()
                                                    .rangeRoundBands([height-30, 0], 1)
                                                    .domain(data.map(function (d) {
                                                        return d.name;
                                                    }));

                                                //make y axis to show bar names
                                                var yAxis = d3.svg.axis()
                                                    .scale(y)
                                                    //no tick marks
                                                    .tickSize(0)
                                                    .orient("left");

                                                var gy = svg.append("g")
                                                    .attr("class", "y axis")
                                                    .attr("transform", "translate(40,0)")
                                                    .call(yAxis);

                                                var bars = svg.selectAll(".bar")
                                                    .data(data)
                                                    .enter()
                                                    .append("g");

                                                //append rects
                                                bars.append("rect")
                                                    .style("fill","#d3d3d3")
                                                    .attr("class", "bar")
                                                    .attr("y", function (d) {
                                                        return y(d.name)-10;
                                                    })
                                                    .attr("height", 20)
                                                    .attr("x", 50)
                                                    .attr("width", function (d) {
                                                        return x(d.value);
                                                    });

                                                //add a value label to the right of each bar
                                                bars.append("text")
                                                    .attr("class", "label")
                                                    //y position of the label is halfway down the bar
                                                    .attr("y", function (d) {
                                                        return y(d.name);
                                                    })
                                                    //x position is 3 pixels to the right of the bar
                                                    .attr("x", function (d) {
                                                        return x(d.value) + 60;
                                                    })
                                                    .text(function (d) {
                                                        return d.value.substring(0,4);
                                                    });
                                            }
                                        });
                                    })
                                    .on('mouseover', function (){
                                        var pname = this.getAttribute('class').substring(24,this.getAttribute('class').length);
                                        $(this).css('opacity','0.7');

                                        polygon.append("text").text(pname);

                                    })
                                    .on('mouseout', function(){
                                        $(this).css('opacity','1.0');
                                    });

                            }

                        }

                });

            }
        }

        else{
            for(var i=perfume_name_list.length-1;i>perfume_name_list.length-6;i--){
                _.forEach(points, function (p) {
                    if (p.data['Name'] == perfume_name_list[i]){
                        console.log(perfume_name_list[i]);
                        if(i==perfume_name_list.length-1){
                            var img = subview.select("#img4").data(["Img_url"]);
                            img.style("display","block");
                            img.attr("src",p.data["Img_url"]);
                        }
                        else if(i==perfume_name_list.length-2){
                            var img = subview.select("#img3").data(["Img_url"]);
                            img.style("display","block");
                            img.attr("src",p.data["Img_url"]);
                        }
                        else if(i==perfume_name_list.length-3){
                            var img = subview.select("#img2").data(["Img_url"]);
                            img.style("display","block");
                            img.attr("src",p.data["Img_url"]);
                        }
                        else if(i==perfume_name_list.length-4){
                            var img = subview.select("#img1").data(["Img_url"]);
                            img.style("display","block");
                            img.attr("src",p.data["Img_url"]);
                        }
                        else if(i==perfume_name_list.length-5){
                            var img = subview.select("#img0").data(["Img_url"]);
                            img.style("display","block");
                            img.attr("src",p.data["Img_url"]);
                        }

                        if(prepoint2.length>=1)
                        {

                            if (compare == "Season") {
                                if(i==0){
                                    Data =[
                                        {
                                            className: p.data["Name"], // optional can be used for styling
                                            axes: [
                                                {axis: season[0], value: p.data["spring"]},
                                                {axis: season[1], value: p.data["summer"]},
                                                {axis: season[2], value: p.data["autumn"]},
                                                {axis: season[3], value: p.data["winter"]}
                                            ]
                                        }
                                    ];
                                }
                                else{
                                    Data.push({
                                        className: p.data["Name"], // optional can be used for styling
                                        axes: [
                                            {axis: season[0], value: p.data["spring"]},
                                            {axis: season[1], value: p.data["summer"]},
                                            {axis: season[2], value: p.data["autumn"]},
                                            {axis: season[3], value: p.data["winter"]}
                                        ]
                                    });
                                }
                                console.log(Data)
                            }
                            else if (compare == "Sillage") {
                                if(i==0){
                                    Data =[
                                        {
                                            className: p.data["Name"], // optional can be used for styling
                                            axes: [
                                                {axis: sillage[0], value: p.data["sillagesoft"]},
                                                {axis: sillage[1], value: p.data["sillagemoderate"]},
                                                {axis: sillage[2], value: p.data["sillageheavy"]},
                                                {axis: sillage[3], value: p.data["sillageenormous"]}
                                            ]
                                        }
                                    ];
                                }
                                else{
                                    Data.push({
                                        className: p.data["Name"], // optional can be used for styling
                                        axes: [
                                            {axis: sillage[0], value: p.data["sillagesoft"]},
                                            {axis: sillage[1], value: p.data["sillagemoderate"]},
                                            {axis: sillage[2], value: p.data["sillageheavy"]},
                                            {axis: sillage[3], value: p.data["sillageenormous"]}
                                        ]
                                    });
                                }
                                console.log(Data)
                            }
                            else if (compare == "Longevity") {
                                if(i==0){
                                    Data =[
                                        {
                                            className: p.data["Name"], // optional can be used for styling
                                            axes: [
                                                {axis: longevity[0], value: p.data["longevitypoor"]},
                                                {axis: longevity[1], value: p.data["longevityweak"]},
                                                {axis: longevity[2], value: p.data["longevitymoderate"]},
                                                {axis: longevity[3], value: p.data["longevitylonglasting"]},
                                                {axis: longevity[4], value: p.data["longevityverylonglasting"]}
                                            ]
                                        }
                                    ];
                                }
                                else{
                                    Data.push({
                                        className: p.data["Name"], // optional can be used for styling
                                        axes: [
                                            {axis: longevity[0], value: p.data["longevitypoor"]},
                                            {axis: longevity[1], value: p.data["longevityweak"]},
                                            {axis: longevity[2], value: p.data["longevitymoderate"]},
                                            {axis: longevity[3], value: p.data["longevitylonglasting"]},
                                            {axis: longevity[4], value: p.data["longevityverylonglasting"]}
                                        ]
                                    });
                                }
                                console.log(Data)

                            }
                            else if (compare == "Notes") {
                                if(i==0){
                                    Data =[
                                        {
                                            className: p.data["Name"], // optional can be used for styling
                                            axes: [
                                                {axis: notes[0], value: p.data["MUSK__AMBER__ANIMALIC_SMELLS"]},
                                                {axis: notes[1], value: p.data["SWEETS_AND_GOURMAND_SMELLS"]},
                                                {axis: notes[2], value: p.data["RESINS_AND_BALSAMS"]},
                                                {axis: notes[3], value: p.data["SPICES"]},
                                                {axis: notes[4], value: p.data["WOODS_AND_MOSSES"]},
                                                {axis: notes[5], value: p.data["BEVERAGES"]},
                                                {axis: notes[6], value: p.data["CITRUS_SMELLS"]},
                                                {axis: notes[7], value: p.data["NATURAL_AND_SYNTHETIC__POPULAR_AND_WEIRD"]},
                                                {axis: notes[8], value: p.data["GREENS__HERBS_AND_FOUGERES"]},
                                                {axis: notes[9], value: p.data["FRUITS__VEGETABLES_AND_NUTS"]},
                                                {axis: notes[10], value: p.data["FLOWERS"]},
                                                {axis: notes[11], value: p.data["WHITE_FLOWERS"]}
                                            ]
                                        }
                                    ];
                                }
                                else{
                                    Data.push({
                                        className: p.data["Name"], // optional can be used for styling
                                        axes: [
                                            {axis: notes[0], value: p.data["MUSK__AMBER__ANIMALIC_SMELLS"]},
                                            {axis: notes[1], value: p.data["SWEETS_AND_GOURMAND_SMELLS"]},
                                            {axis: notes[2], value: p.data["RESINS_AND_BALSAMS"]},
                                            {axis: notes[3], value: p.data["SPICES"]},
                                            {axis: notes[4], value: p.data["WOODS_AND_MOSSES"]},
                                            {axis: notes[5], value: p.data["BEVERAGES"]},
                                            {axis: notes[6], value: p.data["CITRUS_SMELLS"]},
                                            {axis: notes[7], value: p.data["NATURAL_AND_SYNTHETIC__POPULAR_AND_WEIRD"]},
                                            {axis: notes[8], value: p.data["GREENS__HERBS_AND_FOUGERES"]},
                                            {axis: notes[9], value: p.data["FRUITS__VEGETABLES_AND_NUTS"]},
                                            {axis: notes[10], value: p.data["FLOWERS"]},
                                            {axis: notes[11], value: p.data["WHITE_FLOWERS"]}
                                        ]
                                    });
                                }
                                console.log(Data)
                            }

                            d3.select("#radarChart").remove();

                            var chart = RadarChart.chart();
                            var cfg = chart.config({
                                containerClass: 'radar-chart', // target with css, the default stylesheet targets .radar-chart
                                w: 200,
                                h: 200,
                                factor: 0.8,
                                factorLegend: 0.95,
                                levels: 3,
                                maxValue: 0,
                                minValue: 0,
                                radians: 2 * Math.PI,
                                /*color: function(i) {
                                    c = ["#E10B7B", "#CA1C82", "#9A1931", "#B85B27", "#BF8837",
                                        "#8C844F", "#EEB23C", "#2B9555", "#7DBA55", "#EB7823", "#E6362C", "#E86EA3"];
                                    return c[i]},*/
                                color: d3.scale.category10(), // pass a noop (function() {}) to decide color via css
                                axisLine: true,
                                axisText: true,
                                circles: true,
                                radius: 0,
                                open: false,  // whether or not the last axis value should connect back to the first axis value
                                              // if true, consider modifying the chart opacity (see "Style with CSS" section above)
                                axisJoin: function (d, i) {
                                    return d.className || i;
                                },
                                tooltipFormatValue: function (d) {
                                    return d;
                                },
                                tooltipFormatClass: function (d) {
                                    return d;
                                },
                                transitionDuration: 300,
                                facet: false,
                                levelScale: 0.85,
                                labelScale: 5.0,
                                facetPaddingScale: 2.1,
                                showLevels: true,
                                showLevelsLabels: true,
                                showAxesLabels: true,
                                showAxes: true,
                                showLegend: true,
                                showVertices: true,
                                showPolygons: true,
                                polygonAreaOpacity: 0.3,
                                polygonStrokeOpacity: 1,
                                polygonPointSize: 4,
                                legendBoxSize: 50,
                                legendPosition: {x: 20, y: 20},
                                paddingX: 10,
                                paddingY: 30
                            });

                            var svg = d3.select('.radar-chart').append('svg').attr("id","radarChart");
                            svg.attr('width', 200).attr('height', 200);
                            svg.append('g').classed('single', 1).datum(Data).call(chart);

                            var data =[{"name": "love","value": prepoint2[prepoint2.length-1]["love"]}, {"name": "like","value": prepoint2[prepoint2.length-1]["like"]},{"name": "dislike","value": prepoint2[prepoint2.length-1]["dislike"]}];

                            //sort bars based on value
                            data = data.sort(function (a, b) {
                                return d3.ascending(a.value, b.value);
                            });

                            d3.select("#barchart").remove();

                            var svg = subview.select("#perfume-vote").append("svg").attr("id","barchart")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom)
                                .append("g")
                                .attr("transform", "translate(5,15)");

                            subview.select("#barchart").append("text").text("Vote").attr("transform", "translate(10,"+margin.top+")").style("font-weight","bold");

                            var x = d3.scale.linear()
                                .range([0, width-120])
                                .domain([0, d3.max(data, function (d) {
                                    return d.value;
                                })]);

                            var y = d3.scale.ordinal()
                                .rangeRoundBands([height-30, 0], 1)
                                .domain(data.map(function (d) {
                                    return d.name;
                                }));

                            //make y axis to show bar names
                            var yAxis = d3.svg.axis()
                                .scale(y)
                                //no tick marks
                                .tickSize(0)
                                .orient("left");

                            var gy = svg.append("g")
                                .attr("class", "y axis")
                                .attr("transform", "translate(40,0)")
                                .call(yAxis);

                            var bars = svg.selectAll(".bar")
                                .data(data)
                                .enter()
                                .append("g");

                            //append rects
                            bars.append("rect")
                                .style("fill","#d3d3d3")
                                .attr("class", "bar")
                                .attr("y", function (d) {
                                    return y(d.name)-10;
                                })
                                .attr("height", 20)
                                .attr("x", 50)
                                .attr("width", function (d) {
                                    return x(d.value);
                                });

                            //add a value label to the right of each bar
                            bars.append("text")
                                .attr("class", "label")
                                //y position of the label is halfway down the bar
                                .attr("y", function (d) {
                                    return y(d.name);
                                })
                                //x position is 3 pixels to the right of the bar
                                .attr("x", function (d) {
                                    return x(d.value) + 60;
                                })
                                .text(function (d) {
                                    return d.value.substring(0,4);
                                });

                            var polygon =  d3.select("#radarChart").selectAll(".area").data(data, cfg.axisJoin);
                            polygon
                                .on("click", function () {
                                    var pname = this.getAttribute('class').substring(24,this.getAttribute('class').length);
                                    console.log(pname);
                                    _.forEach(points,function (p) {
                                        if(p.data["Name"]==pname){
                                            var perfume_name = subview.select("#perfume-name").data(["Name"]);
                                            perfume_name.exit().remove();
                                            perfume_name.enter().append("p");
                                            perfume_name.text("Name").style("font-weight","bold").style("margin-left","10px").style("margin-top","10px")
                                            perfume_name.append("text").text(": "+p.data["Name"]).style("font-weight","normal");

                                            var perfume_brand = subview.select("#perfume-brand").data(["Designer"]);
                                            perfume_brand.exit().remove();
                                            perfume_brand.enter().append("p");
                                            perfume_brand.text("Brand").style("font-weight","bold").style("margin-left","10px")
                                            perfume_brand.append("text").text(": "+p.data["Designer"]).style("font-weight","normal");

                                            var perfume_gender = subview.select("#perfume-gender").data(["Gender"]);
                                            perfume_gender.exit().remove();
                                            perfume_gender.enter().append("p");
                                            perfume_gender.text("Gender").style("font-weight","bold").style("margin-left","10px")
                                            perfume_gender.append("text").text(": "+p.data["Gender"]).style("font-weight","normal");


                                            var data =[{"name": "love","value": p.data["love"]}, {"name": "like","value": p.data["like"]},{"name": "dislike","value": p.data["dislike"]}];

                                            //sort bars based on value
                                            data = data.sort(function (a, b) {
                                                return d3.ascending(a.value, b.value);
                                            });

                                            d3.select("#barchart").remove();

                                            var svg = subview.select("#perfume-vote").append("svg").attr("id","barchart")
                                                .attr("width", width + margin.left + margin.right)
                                                .attr("height", height + margin.top + margin.bottom)
                                                .append("g")
                                                .attr("transform", "translate(5,15)");

                                            subview.select("#barchart").append("text").text("Vote").attr("transform", "translate(10,"+margin.top+")").style("font-weight","bold");

                                            var x = d3.scale.linear()
                                                .range([0, width-120])
                                                .domain([0, d3.max(data, function (d) {
                                                    return d.value;
                                                })]);

                                            var y = d3.scale.ordinal()
                                                .rangeRoundBands([height-30, 0], 1)
                                                .domain(data.map(function (d) {
                                                    return d.name;
                                                }));

                                            //make y axis to show bar names
                                            var yAxis = d3.svg.axis()
                                                .scale(y)
                                                //no tick marks
                                                .tickSize(0)
                                                .orient("left");

                                            var gy = svg.append("g")
                                                .attr("class", "y axis")
                                                .attr("transform", "translate(40,0)")
                                                .call(yAxis);

                                            var bars = svg.selectAll(".bar")
                                                .data(data)
                                                .enter()
                                                .append("g");

                                            //append rects
                                            bars.append("rect")
                                                .style("fill","#d3d3d3")
                                                .attr("class", "bar")
                                                .attr("y", function (d) {
                                                    return y(d.name)-10;
                                                })
                                                .attr("height", 20)
                                                .attr("x", 50)
                                                .attr("width", function (d) {
                                                    return x(d.value);
                                                });

                                            //add a value label to the right of each bar
                                            bars.append("text")
                                                .attr("class", "label")
                                                //y position of the label is halfway down the bar
                                                .attr("y", function (d) {
                                                    return y(d.name);
                                                })
                                                //x position is 3 pixels to the right of the bar
                                                .attr("x", function (d) {
                                                    return x(d.value) + 60;
                                                })
                                                .text(function (d) {
                                                    return d.value.substring(0,4);
                                                });
                                        }
                                    });
                                })
                                .on('mouseover', function (){
                                    $(this).css('opacity','0.7')
                                })
                                .on('mouseout', function(){
                                    $(this).css('opacity','1.0')
                                });

                        }

                        if(compare)
                        {
                            if (compare == "Season") {
                                if(i==0){
                                    Data =[
                                        {
                                            className: p.data["Name"], // optional can be used for styling
                                            axes: [
                                                {axis: season[0], value: p.data["spring"]},
                                                {axis: season[1], value: p.data["summer"]},
                                                {axis: season[2], value: p.data["autumn"]},
                                                {axis: season[3], value: p.data["winter"]}
                                            ]
                                        }
                                    ];
                                }
                                else{
                                    Data.push({
                                        className: p.data["Name"], // optional can be used for styling
                                        axes: [
                                            {axis: season[0], value: p.data["spring"]},
                                            {axis: season[1], value: p.data["summer"]},
                                            {axis: season[2], value: p.data["autumn"]},
                                            {axis: season[3], value: p.data["winter"]}
                                        ]
                                    });
                                }
                                console.log(Data)
                            }
                            else if (compare == "Sillage") {
                                if(i==0){
                                    Data =[
                                        {
                                            className: p.data["Name"], // optional can be used for styling
                                            axes: [
                                                {axis: sillage[0], value: p.data["sillagesoft"]},
                                                {axis: sillage[1], value: p.data["sillagemoderate"]},
                                                {axis: sillage[2], value: p.data["sillageheavy"]},
                                                {axis: sillage[3], value: p.data["sillageenormous"]}
                                            ]
                                        }
                                    ];
                                }
                                else{
                                    Data.push({
                                        className: p.data["Name"], // optional can be used for styling
                                        axes: [
                                            {axis: sillage[0], value: p.data["sillagesoft"]},
                                            {axis: sillage[1], value: p.data["sillagemoderate"]},
                                            {axis: sillage[2], value: p.data["sillageheavy"]},
                                            {axis: sillage[3], value: p.data["sillageenormous"]}
                                        ]
                                    });
                                }
                                console.log(Data)
                            }
                            else if (compare == "Longevity") {
                                if(i==0){
                                    Data =[
                                        {
                                            className: p.data["Name"], // optional can be used for styling
                                            axes: [
                                                {axis: longevity[0], value: p.data["longevitypoor"]},
                                                {axis: longevity[1], value: p.data["longevityweak"]},
                                                {axis: longevity[2], value: p.data["longevitymoderate"]},
                                                {axis: longevity[3], value: p.data["longevitylonglasting"]},
                                                {axis: longevity[4], value: p.data["longevityverylonglasting"]}
                                            ]
                                        }
                                    ];
                                }
                                else{
                                    Data.push({
                                        className: p.data["Name"], // optional can be used for styling
                                        axes: [
                                            {axis: longevity[0], value: p.data["longevitypoor"]},
                                            {axis: longevity[1], value: p.data["longevityweak"]},
                                            {axis: longevity[2], value: p.data["longevitymoderate"]},
                                            {axis: longevity[3], value: p.data["longevitylonglasting"]},
                                            {axis: longevity[4], value: p.data["longevityverylonglasting"]}
                                        ]
                                    });
                                }
                                console.log(Data)

                            }
                            else if (compare == "Notes") {
                                if(i==0){
                                    Data =[
                                        {
                                            className: p.data["Name"], // optional can be used for styling
                                            axes: [
                                                {axis: notes[0], value: p.data["MUSK__AMBER__ANIMALIC_SMELLS"]},
                                                {axis: notes[1], value: p.data["SWEETS_AND_GOURMAND_SMELLS"]},
                                                {axis: notes[2], value: p.data["RESINS_AND_BALSAMS"]},
                                                {axis: notes[3], value: p.data["SPICES"]},
                                                {axis: notes[4], value: p.data["WOODS_AND_MOSSES"]},
                                                {axis: notes[5], value: p.data["BEVERAGES"]},
                                                {axis: notes[6], value: p.data["CITRUS_SMELLS"]},
                                                {axis: notes[7], value: p.data["NATURAL_AND_SYNTHETIC__POPULAR_AND_WEIRD"]},
                                                {axis: notes[8], value: p.data["GREENS__HERBS_AND_FOUGERES"]},
                                                {axis: notes[9], value: p.data["FRUITS__VEGETABLES_AND_NUTS"]},
                                                {axis: notes[10], value: p.data["FLOWERS"]},
                                                {axis: notes[11], value: p.data["WHITE_FLOWERS"]}
                                            ]
                                        }
                                    ];
                                }
                                else{
                                    Data.push({
                                        className: p.data["Name"], // optional can be used for styling
                                        axes: [
                                            {axis: notes[0], value: p.data["MUSK__AMBER__ANIMALIC_SMELLS"]},
                                            {axis: notes[1], value: p.data["SWEETS_AND_GOURMAND_SMELLS"]},
                                            {axis: notes[2], value: p.data["RESINS_AND_BALSAMS"]},
                                            {axis: notes[3], value: p.data["SPICES"]},
                                            {axis: notes[4], value: p.data["WOODS_AND_MOSSES"]},
                                            {axis: notes[5], value: p.data["BEVERAGES"]},
                                            {axis: notes[6], value: p.data["CITRUS_SMELLS"]},
                                            {axis: notes[7], value: p.data["NATURAL_AND_SYNTHETIC__POPULAR_AND_WEIRD"]},
                                            {axis: notes[8], value: p.data["GREENS__HERBS_AND_FOUGERES"]},
                                            {axis: notes[9], value: p.data["FRUITS__VEGETABLES_AND_NUTS"]},
                                            {axis: notes[10], value: p.data["FLOWERS"]},
                                            {axis: notes[11], value: p.data["WHITE_FLOWERS"]}
                                        ]
                                    });
                                }
                                console.log(Data)
                            }
                            d3.select("#radarChart").remove();

                            var chart = RadarChart.chart();
                            var cfg = chart.config({
                                containerClass: 'radar-chart', // target with css, the default stylesheet targets .radar-chart
                                w: 200,
                                h: 200,
                                factor: 0.8,
                                factorLegend: 0.95,
                                levels: 3,
                                maxValue: 0,
                                minValue: 0,
                                radians: 2 * Math.PI,
                                /*color: function(i) {
                                    c = ["#dd2e36"];
                                    return c[i]},*/
                                color: d3.scale.category10(), // pass a noop (function() {}) to decide color via css
                                axisLine: true,
                                axisText: true,
                                circles: true,
                                radius: 0,
                                open: false,  // whether or not the last axis value should connect back to the first axis value
                                              // if true, consider modifying the chart opacity (see "Style with CSS" section above)
                                axisJoin: function (d, i) {
                                    return d.className || i;
                                },
                                tooltipFormatValue: function (d) {
                                    return d;
                                },
                                tooltipFormatClass: function (d) {
                                    return d;
                                },
                                transitionDuration: 300,
                                facet: false,
                                levelScale: 0.85,
                                labelScale: 5.0,
                                facetPaddingScale: 2.1,
                                showLevels: true,
                                showLevelsLabels: true,
                                showAxesLabels: true,
                                showAxes: true,
                                showLegend: true,
                                showVertices: true,
                                showPolygons: true,
                                polygonAreaOpacity: 0.3,
                                polygonStrokeOpacity: 1,
                                polygonPointSize: 4,
                                legendBoxSize: 50,
                                legendPosition: {x: 20, y: 20},
                                paddingX: 10,
                                paddingY: 30
                            });

                            var svg = d3.select('.radar-chart').append('svg').attr("id","radarChart");
                            svg.attr('width', 200).attr('height', 200);
                            svg.append('g').classed('single', 1).datum(data).call(chart);

                            var polygon =  d3.select("#radarChart").selectAll(".area").data(data, cfg.axisJoin);
                            polygon
                                .on("click", function () {
                                    var pname = this.getAttribute('class').substring(24,this.getAttribute('class').length);
                                    console.log(pname);
                                    _.forEach(points,function (p) {
                                        if(p.data["Name"]==pname){
                                            var perfume_name = subview.select("#perfume-name").data(["Name"]);
                                            perfume_name.exit().remove();
                                            perfume_name.enter().append("p");
                                            perfume_name.text("Name").style("font-weight","bold").style("margin-left","10px").style("margin-top","10px")
                                            perfume_name.append("text").text(": "+p.data["Name"]).style("font-weight","normal");

                                            var perfume_brand = subview.select("#perfume-brand").data(["Designer"]);
                                            perfume_brand.exit().remove();
                                            perfume_brand.enter().append("p");
                                            perfume_brand.text("Brand").style("font-weight","bold").style("margin-left","10px")
                                            perfume_brand.append("text").text(": "+p.data["Designer"]).style("font-weight","normal");

                                            var perfume_gender = subview.select("#perfume-gender").data(["Gender"]);
                                            perfume_gender.exit().remove();
                                            perfume_gender.enter().append("p");
                                            perfume_gender.text("Gender").style("font-weight","bold").style("margin-left","10px")
                                            perfume_gender.append("text").text(": "+p.data["Gender"]).style("font-weight","normal");


                                            var data =[{"name": "love","value": p.data["love"]}, {"name": "like","value": p.data["like"]},{"name": "dislike","value": p.data["dislike"]}];

                                            //sort bars based on value
                                            data = data.sort(function (a, b) {
                                                return d3.ascending(a.value, b.value);
                                            });

                                            d3.select("#barchart").remove();

                                            var svg = subview.select("#perfume-vote").append("svg").attr("id","barchart")
                                                .attr("width", width + margin.left + margin.right)
                                                .attr("height", height + margin.top + margin.bottom)
                                                .append("g")
                                                .attr("transform", "translate(5,15)");

                                            subview.select("#barchart").append("text").text("Vote").attr("transform", "translate(10,"+margin.top+")").style("font-weight","bold");

                                            var x = d3.scale.linear()
                                                .range([0, width-120])
                                                .domain([0, d3.max(data, function (d) {
                                                    return d.value;
                                                })]);

                                            var y = d3.scale.ordinal()
                                                .rangeRoundBands([height-30, 0], 1)
                                                .domain(data.map(function (d) {
                                                    return d.name;
                                                }));

                                            //make y axis to show bar names
                                            var yAxis = d3.svg.axis()
                                                .scale(y)
                                                //no tick marks
                                                .tickSize(0)
                                                .orient("left");

                                            var gy = svg.append("g")
                                                .attr("class", "y axis")
                                                .attr("transform", "translate(40,0)")
                                                .call(yAxis);

                                            var bars = svg.selectAll(".bar")
                                                .data(data)
                                                .enter()
                                                .append("g");

                                            //append rects
                                            bars.append("rect")
                                                .style("fill","#d3d3d3")
                                                .attr("class", "bar")
                                                .attr("y", function (d) {
                                                    return y(d.name)-10;
                                                })
                                                .attr("height", 20)
                                                .attr("x", 50)
                                                .attr("width", function (d) {
                                                    return x(d.value);
                                                });

                                            //add a value label to the right of each bar
                                            bars.append("text")
                                                .attr("class", "label")
                                                //y position of the label is halfway down the bar
                                                .attr("y", function (d) {
                                                    return y(d.name);
                                                })
                                                //x position is 3 pixels to the right of the bar
                                                .attr("x", function (d) {
                                                    return x(d.value) + 60;
                                                })
                                                .text(function (d) {
                                                    return d.value.substring(0,4);
                                                });
                                        }
                                    });
                                })
                                .on('mouseover', function (){
                                    $(this).css('opacity','0.7')
                                })
                                .on('mouseout', function(){
                                    $(this).css('opacity','1.0')
                                });

                        }

                        var selectbox = subview.select(".comparison-select-box");
                        selectbox.style("display","block");

                        var perfume_name = subview.select("#perfume-name").data(["Name"]);
                        perfume_name.exit().remove();
                        perfume_name.enter().append("p");
                        perfume_name.text("Name").style("font-weight","bold").style("margin-left","10px").style("margin-top","10px")
                        perfume_name.append("text").text(": "+p.data["Name"]).style("font-weight","normal");

                        var perfume_brand = subview.select("#perfume-brand").data(["Designer"]);
                        perfume_brand.exit().remove();
                        perfume_brand.enter().append("p");
                        perfume_brand.text("Brand").style("font-weight","bold").style("margin-left","10px")
                        perfume_brand.append("text").text(": "+p.data["Designer"]).style("font-weight","normal");

                        var perfume_gender = subview.select("#perfume-gender").data(["Gender"]);
                        perfume_gender.exit().remove();
                        perfume_gender.enter().append("p");
                        perfume_gender.text("Gender").style("font-weight","bold").style("margin-left","10px")
                        perfume_gender.append("text").text(": "+p.data["Gender"]).style("font-weight","normal");


                        var data =[{"name": "love","value": p.data["love"]}, {"name": "like","value": p.data["like"]},{"name": "dislike","value": p.data["dislike"]}];

                        //sort bars based on value
                        data = data.sort(function (a, b) {
                            return d3.ascending(a.value, b.value);
                        });

                        d3.select("#barchart").remove();

                        var svg = subview.select("#perfume-vote").append("svg").attr("id","barchart")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                            .append("g")
                            .attr("transform", "translate(5,15)");

                        subview.select("#barchart").append("text").text("Vote").attr("transform", "translate(10,"+margin.top+")").style("font-weight","bold");

                        var x = d3.scale.linear()
                            .range([0, width-120])
                            .domain([0, d3.max(data, function (d) {
                                return d.value;
                            })]);

                        var y = d3.scale.ordinal()
                            .rangeRoundBands([height-30, 0], 1)
                            .domain(data.map(function (d) {
                                return d.name;
                            }));

                        //make y axis to show bar names
                        var yAxis = d3.svg.axis()
                            .scale(y)
                            //no tick marks
                            .tickSize(0)
                            .orient("left");

                        var gy = svg.append("g")
                            .attr("class", "y axis")
                            .attr("transform", "translate(40,0)")
                            .call(yAxis);

                        var bars = svg.selectAll(".bar")
                            .data(data)
                            .enter()
                            .append("g");

                        //append rects
                        bars.append("rect")
                            .style("fill","#d3d3d3")
                            .attr("class", "bar")
                            .attr("y", function (d) {
                                return y(d.name)-10;
                            })
                            .attr("height", 20)
                            .attr("x", 50)
                            .attr("width", function (d) {
                                return x(d.value);
                            });

                        //add a value label to the right of each bar
                        bars.append("text")
                            .attr("class", "label")
                            //y position of the label is halfway down the bar
                            .attr("y", function (d) {
                                return y(d.name);
                            })
                            //x position is 3 pixels to the right of the bar
                            .attr("x", function (d) {
                                return x(d.value) + 60;
                            })
                            .text(function (d) {
                                return d.value.substring(0,4);
                            });
                    }
                });
            }
        }

    }

    this.dragRect = function () {

        var selectionRect = {
            element			: null,
            previousElement : null,
            currentY		: 0,
            currentX		: 0,
            originX			: 0,
            originY			: 0,
            id              :"select_rect",
            setElement: function(ele) {
                this.previousElement = this.element;
                this.element = ele;
            },
            getNewAttributes: function() {
                var x = this.currentX<this.originX?this.currentX:this.originX;
                var y = this.currentY<this.originY?this.currentY:this.originY;
                var width = Math.abs(this.currentX - this.originX);
                var height = Math.abs(this.currentY - this.originY);

                if(width>100)
                    width=100;
                if(height>100)
                    height=100;

                return {
                    x       : x,
                    y       : y,
                    width  	: width,
                    height  : height
                };
            },
            getCurrentAttributes: function() {
                // use plus sign to convert string into number
                var x = +this.element.attr("x");
                var y = +this.element.attr("y");
                var width = +this.element.attr("width");
                var height = +this.element.attr("height");

                if(width>100)
                    width=100;
                if(height>100)
                    height=100;

                return {
                    x1  : x,
                    y1	: y,
                    x2  : x + width,
                    y2  : y + height
                };
            },
            getCurrentAttributesAsText: function() {
                var attrs = this.getCurrentAttributes();
                return "x1: " + attrs.x1 + " x2: " + attrs.x2 + " y1: " + attrs.y1 + " y2: " + attrs.y2;
            },
            init: function(newX, newY) {
                var rectElement = parentG.append("rect")
                    .attr({
                        rx      : 4,
                        ry      : 4,
                        x       : 0,
                        y       : 0,
                        width   : 0,
                        height  : 0
                    })
                    .classed("selection", true);
                this.setElement(rectElement);
                this.originX = newX;
                this.originY = newY;
                this.update(newX, newY);
            },
            update: function(newX, newY) {
                this.currentX = newX;
                this.currentY = newY;
                this.element.attr(this.getNewAttributes());
            },
            focus: function() {
                this.element
                    .style("stroke", "#888888")
                    .style("stroke-dasharray","5")
                    .style("stroke-width", "2");
            },
            remove: function() {
                this.element.remove();
                this.element = null;
            },
            removePrevious: function() {
                if(this.previousElement) {
                    this.previousElement.remove();
                }
            }
        };

        var svg = d3.select("#pointsgroup");
        var clickTime = d3.select("#clicktime");
        var attributesText = d3.select("#attributestext");

        var count = 0;

        function add_item(p){
            // pre_set 에 있는 내용을 읽어와서 처리..
            var div = document.createElement('div');
            var ul = document.createElement('ul');
            var li = document.createElement('li');
            var span1 = document.createElement('span');
            var img = document.createElement('img');
            var span3 = document.createElement('span');
            var span4 = document.createElement('span');
            var div2 = document.createElement('div');
            var label = document.createElement('label');
            var input = document.createElement('input');

            document.getElementById('count').textContent = count+1;

            ul.id ="perfume-list";
            ul.setAttribute("data",p.data["Name"]);
            ul.className ="demo-list-control mdl-list";
            ul.style.height = "65px";
            ul.style.padding = "3px";
            ul.style.boxShadow=" 0 1px 5px 0 rgba(0,0,0,.12)";
            if(count==0){
                ul.style.marginTop ="-5px";
            }
            else{
                ul.style.marginTop ="-10px";
            }
            ul.style.marginLeft ="5px";

            li.className ="mdl-list__item";
            li.style.padding = "0px";


            span1.className ="mdl-list__item-primary-content";
            span4.className="mdl-list__item-sub-title";

            img.id = "select-img"+count;
            img.src=p.data["Img_url"];
            img.style.width = "37.5px";
            img.style.height ="50px";
            img.style.marginTop="-20px";
            img.style.marginLeft="10px";

            span3.textContent = p.data["Name"];
            span4.textContent = p.data["Designer"];

            span3.style.marginTop="-20px";
            span3.style.marginLeft="35px";

            input.id = "checkbox"+count;
            input.type ="checkbox";
            input.setAttribute('onclick','selectPerfume(this)');
            input.setAttribute('class','not-checked');
            input.setAttribute('perfumeName',p.data['Name']);

            div2.className ="md-checkbox";
            label.htmlFor = "checkbox"+count;

            div2.style.marginTop="-5px";

            div2.appendChild(input);
            div2.appendChild(label);

            span1.appendChild(img);
            span1.appendChild(span3);
            span3.appendChild(span4);

            li.appendChild(span1);
            li.appendChild(div2);
            ul.appendChild(li);
            div.appendChild(ul);

            document.getElementById('selectList').appendChild(div);

            count++;
        }

        function remove_item(obj){
            // obj.parentNode 를 이용하여 삭제
            document.getElementById('selectList').removeChild(obj.parentNode);
        }

        function dragStart() {
            console.log("dragStart");
            document.getElementById('count').textContent = 0;
            count=0;
            pre_seleted_perfume_id=[];
            perfume_name_list=[];
            select_perfume_count=0;
            d3.selectAll("#img").style("display","none");
            d3.selectAll("#img0").style("display","none");
            d3.selectAll("#img1").style("display","none");
            d3.selectAll("#img2").style("display","none");
            d3.selectAll("#img3").style("display","none");
            d3.selectAll("#img4").style("display","none");
            d3.selectAll('#selectList #perfume-list').remove();
            d3.select("#barchart").remove();
            d3.select("#radarChart").remove();
            d3.select("#perfume-content").style("display","none");
            d3.select(".comparison-select-box").style("display","none");
            var p = d3.mouse(this);
            if(p[0]>-200&&p[1]<200
                &&p[0]<200&&p[1]>-200)
            {
                selectionRect.init(p[0], p[1]);
                selectionRect.removePrevious();
            }
        }

        function dragMove() {
            console.log("dragMove");
            var p = d3.mouse(this);
            if(p[0]>-200&&p[1]<200
                &&p[0]<200&&p[1]>-200)
            {
                selectionRect.update(p[0], p[1]);
            }
            attributesText
                .text(selectionRect.getCurrentAttributesAsText());
        }

        function dragEnd() {
            console.log("dragEnd");
            var finalAttributes = selectionRect.getCurrentAttributes();
            console.dir(finalAttributes);

            _.forEach(points, function (p) {
                if(finalAttributes.x1<p.circle[0][0].getAttribute("cx")&&p.circle[0][0].getAttribute("cx")<finalAttributes.x2
                    &&finalAttributes.y1<p.circle[0][0].getAttribute("cy")&&p.circle[0][0].getAttribute("cy")<finalAttributes.y2)
                {
                    add_item(p);
                }
            });

            if(finalAttributes.x2 - finalAttributes.x1 > 1 && finalAttributes.y2 - finalAttributes.y1 > 1){
                console.log("range selected");
                // range selected
                d3.event.sourceEvent.preventDefault();
                selectionRect.focus();
            }
            else {
                console.log("single point");
                // single point selected
                selectionRect.remove();
                d3.selectAll('#selectList #perfume-list').remove();
                d3.select("#perfume-content").style("display","none");
                document.getElementById('count').textContent = 0;
                count=0;
                if($('ul').hasClass('clicked')){
                    $(this).removeClass('clicked');
                }
                // trigger click event manually
                clicked();
            }
        }

        var dragBehavior = d3.behavior.drag()
            .on("drag", dragMove)
            .on("dragstart", dragStart)
            .on("dragend", dragEnd);

        svg.call(dragBehavior);

        function clicked() {
            var d = new Date();
            clickTime
                .text("Clicked at " + d.toTimeString().substr(0,8) + ":" + d.getMilliseconds());
        }

    }

    this.addBrandItem = function (brandName) {
        var count = 0;
        var name = brandName;

        function add_item(p){
            // pre_set 에 있는 내용을 읽어와서 처리..
            var div = document.createElement('div');
            var ul = document.createElement('ul');
            var li = document.createElement('li');
            var span1 = document.createElement('span');
            var img = document.createElement('img');
            var span3 = document.createElement('span');
            var span4 = document.createElement('span');
            var div2 = document.createElement('div');
            var label = document.createElement('label');
            var input = document.createElement('input');

            document.getElementById('count').textContent = count+1;

            ul.id ="perfume-list";
            ul.setAttribute("data",p.data["Name"]);
            ul.className ="demo-list-control mdl-list";
            ul.style.height = "65px";
            ul.style.padding = "3px";
            ul.style.boxShadow=" 0 1px 5px 0 rgba(0,0,0,.12)";
            if(count==0){
                ul.style.marginTop ="-5px";
            }
            else{
                ul.style.marginTop ="-10px";
            }
            ul.style.marginLeft ="5px";

            li.className ="mdl-list__item";
            li.style.padding = "0px";


            span1.className ="mdl-list__item-primary-content";
            span4.className="mdl-list__item-sub-title";

            img.id = "select-img"+count;
            img.src=p.data["Img_url"];
            img.style.width = "37.5px";
            img.style.height ="50px";
            img.style.marginTop="-20px";
            img.style.marginLeft="10px";

            span3.textContent = p.data["Name"];
            span4.textContent = p.data["Designer"];

            span3.style.marginTop="-20px";
            span3.style.marginLeft="35px";

            input.id = "checkbox"+count;
            input.type ="checkbox";
            input.setAttribute('onclick','selectPerfume2(this)');
            input.setAttribute('class','not-checked');
            input.setAttribute('perfumeName',p.data['Name']);

            div2.className ="md-checkbox";
            label.htmlFor = "checkbox"+count;

            div2.style.marginTop="-5px";

            div2.appendChild(input);
            div2.appendChild(label);

            span1.appendChild(img);
            span1.appendChild(span3);
            span3.appendChild(span4);

            li.appendChild(span1);
            li.appendChild(div2);
            ul.appendChild(li);
            div.appendChild(ul);

            document.getElementById('selectList').appendChild(div);

            count++;
        }


        _.forEach(points, function (p) {
            if(name==p.data["Designer"]){
                add_item(p);
            }
        });
    }

    this.appendNodesColorInfor = function (nodecolor) {
        /* -----------------------------------------------------------------------------
 * Polylinear Color Scale
 * ======================
 * Useful for divergent color scales and showing deviation from some
 * meaningful midpoint or average.
 * --------------------------------------------------------------------------- */
        var min = 0.00,
            mid = 0.50,
            max = 1.00;

        d3.selectAll('defs').remove();
        d3.selectAll('#gradient1-bar').remove();
        d3.selectAll('#gradient2-bar').remove();
        d3.selectAll('#daynightColor g').remove();

        d3.selectAll('#gradient3-bar').remove();
        d3.selectAll('#gradient4-bar').remove();
        d3.selectAll('#ratingColor g').remove();

        drawKey(min, mid, max, 120, 60);

        /*
         * min: number, min datum
         * mid: number, midpoint or average
         * max: number, max datum
         * width: number, width of key
         * height: number, height of key
         */
        function drawKey(min, mid, max, width, height) {
            if(nodecolor=="#daynightColor"){
                // Scales
                var colorRange = ["#324d7a","#eda46d"],
                    color = d3.scale.linear()
                        .domain([min, mid, max])
                        .range(colorRange),
                    x = d3.scale.linear()
                        .domain([min, max])
                        .range([0, width])

                var x = d3.scale.linear()
                    .domain([min, max])
                    .range([0, width])

                var svg = d3.select(nodecolor);

                // SVG defs
                var defs = svg
                    .datum({min: min, mid: mid})
                    .append('svg:defs')

                // Gradient defs
                var gradient1 = defs.append('svg:linearGradient')
                    .attr('id', 'gradient1')
                var gradient2 = defs.append('svg:linearGradient')
                    .attr('id', 'gradient2')

                // Gradient 1 stop 1
                gradient1.append('svg:stop')
                    .datum({min: min})
                    .attr('stop-color', function(d) { return color(d.min) })
                    .attr('offset', '0%')

                // Gradient 1 stop 2
                gradient1.append('svg:stop')
                    .datum({mid: mid})
                    .attr('stop-color', function(d) { return color(d.mid) })
                    .attr('offset', '100%')

                // Gradient 2 stop 1
                gradient2.append('svg:stop')
                    .datum({mid: mid})
                    .attr('stop-color', function(d) { return color(d.mid) })
                    .attr('offset', '0%')

                // Gradient 2 stop 2
                gradient2.append('svg:stop')
                    .datum({max: max})
                    .attr('stop-color', function(d) { return color(d.max) })
                    .attr('offset', '100%')

                // Gradient 1 rect
                svg
                    .datum({min: min, mid: mid })
                    .append('svg:rect')
                    .attr('id', 'gradient1-bar')
                    .attr('fill', 'url(#gradient1)')
                    .attr('width', function(d) { return x(d.mid) })
                    .attr('height', height-40)

                // Gradient 2 rect
                svg
                    .datum({mid: mid, max: max})
                    .append('svg:rect')
                    .attr('id', 'gradient2-bar')
                    .attr('fill', 'url(#gradient2)')
                    .attr('transform', function(d) { return 'translate(' + x(d.mid) + ',0)'})
                    .attr('width', function(d) { return x(d.max) - x(d.mid) })
                    .attr('height', height-40)


                var x = d3.scale.ordinal()
                    .domain(["night", "day"])
                    .rangePoints([0, width]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .tickSize([0,0])
                    .orient("bottom");

                svg.append("g")
                    .attr("class", "x axis")
                    .attr('font-size','8px')
                    .attr('font-weight','bold')
                    .attr('transform', 'translate(0,24)')
                    .call(xAxis);


            }
            else{
                // Scales
                var colorRange = ["#ffffff","#808080","#000000"],
                    color = d3.scale.linear()
                        .domain([min, mid, max])
                        .range(colorRange),
                    x = d3.scale.linear()
                        .domain([min, max])
                        .range([0, width])

                var x = d3.scale.linear()
                    .domain([min, max])
                    .range([0, width])

                var svg = d3.select(nodecolor);

                // SVG defs
                var defs = svg
                    .datum({min: min, mid: mid})
                    .append('svg:defs')

                // Gradient defs
                var gradient1 = defs.append('svg:linearGradient')
                    .attr('id', 'gradient3')
                var gradient2 = defs.append('svg:linearGradient')
                    .attr('id', 'gradient4')

                // Gradient 1 stop 1
                gradient1.append('svg:stop')
                    .datum({min: min})
                    .attr('stop-color', function(d) { return color(d.min) })
                    .attr('offset', '0%')

                // Gradient 1 stop 2
                gradient1.append('svg:stop')
                    .datum({mid: mid})
                    .attr('stop-color', function(d) { return color(d.mid) })
                    .attr('offset', '100%')

                // Gradient 2 stop 1
                gradient2.append('svg:stop')
                    .datum({mid: mid})
                    .attr('stop-color', function(d) { return color(d.mid) })
                    .attr('offset', '0%')

                // Gradient 2 stop 2
                gradient2.append('svg:stop')
                    .datum({max: max})
                    .attr('stop-color', function(d) { return color(d.max) })
                    .attr('offset', '100%')

                // Gradient 1 rect
                svg
                    .datum({min: min, mid: mid })
                    .append('svg:rect')
                    .attr('id', 'gradient3-bar')
                    .attr('fill', 'url(#gradient3)')
                    .attr('width', function(d) { return x(d.mid) })
                    .attr('height', height-40)

                // Gradient 2 rect
                svg
                    .datum({mid: mid, max: max})
                    .append('svg:rect')
                    .attr('id', 'gradient4-bar')
                    .attr('fill', 'url(#gradient4)')
                    .attr('transform', function(d) { return 'translate(' + x(d.mid) + ',0)'})
                    .attr('width', function(d) { return x(d.max) - x(d.mid) })
                    .attr('height', height-40)

                // Append axis
                var x = d3.scale.ordinal()
                    .domain(["low", "high"])
                    .rangePoints([0, width]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .tickSize([0,0])
                    .orient("bottom");

                svg.append("g")
                    .attr("class", "x axis")
                    .attr('font-size','8px')
                    .attr('font-weight','bold')
                    .attr('transform', 'translate(0,24)')
                    .call(xAxis);

            }

        }
    }

    return this;
};

d3.csv('./fragrances_data_scaled.csv', function (d) {
    Vis.appendNodes(d);
});

$("select").on("change", function(){
    $( ".select-box option:selected" ).each(function() {
        brand = $( this ).text();
        if(brand!="Brand")
        {
            d3.selectAll('#selectList #perfume-list').remove();
            document.getElementById('count').textContent = 0;
            count=0;
            if($('ul').hasClass('clicked')){
                $(this).removeClass('clicked');
            }

            Vis.updateNodeColor(brand);
            Vis.addBrandItem(brand);

            $('#brand-name').text(brand);
        }
        else if(brand=="Brand")
            Vis.updateNodeColor(brand);
    });

    $(".comparison-select-box option:selected").each(function () {
        if($('#switch5').is(":checked")){
            Vis.updateNodeColor($("#switch5").attr('dimensions'));
        }
        else if($('#switch6').is(":checked")){
            Vis.updateNodeColor($("#switch6").attr('dimensions'));
        }
        else if($('#switch7').is(":checked")){
            Vis.updateNodeColor($("#switch7").attr('dimensions'));
        }
        if($('.select-box option:selected').text()!="Brand"){
            Vis.updateNodeColor($('.select-box option:selected').text());
            for(var i=0;i<pre_seleted_perfume_id.length;i++){
                console.log(pre_seleted_perfume_id[i]);
                $("#"+pre_seleted_perfume_id[i]).prop('checked',true);
                $("#"+pre_seleted_perfume_id[i]).attr('class','checked');
            }
        }
        compare = $(this).text();

        if(prepoint2.length>=1){
            Vis.appendselectedPerfumeChart(prepoint2[prepoint2.length-1]["Name"]);
        }

        if(prepoint.length>=1){
            Vis.appendNodesChart();
        }

    });

    $(".select-list-box option:selected").each(function () {
        if($('#switch5').is(":checked")){
            Vis.updateNodeColor($("#switch5").attr('dimensions'));
        }
        else if($("#switch6").is(":checked")){
            Vis.updateNodeColor($("#switch6").attr('dimensions'));
        }
        else if($("#switch7").is(":checked")){
            Vis.updateNodeColor($("#switch7").attr('dimensions'));
        }
        else if($('.select-box option:selected').text()!="Brand"){
            Vis.updateNodeColor($('.select-box option:selected').text());
        }
        selectedPerfumeName = $(this).text();
        console.log(selectedPerfumeName);
    });
}).trigger( "change" );

$('input:checkbox').click(function () {
    var id = $(this).attr('id');
    if($(this).is(":checked")){
        if(this.id=="switch5"){
            if(!$("#switch6").is(':checked')&&!$("#switch7").is(':checked')&&!$("#switch8").is(':checked')){
                // Add color
                $(".color-info").show();
                $("#genderColor").show();
                var ds = $(this).attr('dimensions');
                Vis.updateNodeColor(ds);
            }
            else if(($("#switch6").is(':checked'))||($("#switch7").is(':checked'))||($("#switch8").is(':checked'))){
                $("#switch6").prop('checked',false);
                $("#switch7").prop('checked',false);
                $("#switch8").prop('checked',false);
                $("#daynightColor").hide();
                $("#ratingColor").hide();
                $("#brandColor").hide();
                $("#genderColor").show();
                brand = "Brand";
                $('.select-box').val(1);
                $(".select-box").prop('disabled', 'disabled');
                var ds = $("#switch5").attr('dimensions');
                Vis.updateNodeColor(ds);
            }
        }
        else if(this.id=="switch6"){
            if(!$("#switch5").is(':checked')&&!$("#switch7").is(':checked')&&!$("#switch8").is(':checked')){
                // Add color
                $(".color-info").show();
                $("#daynightColor").show();
                var ds = $(this).attr('dimensions');
                Vis.updateNodeColor(ds);
                Vis.appendNodesColorInfor("#daynightColor");
            }
            else if(($("#switch5").is(':checked'))||($("#switch7").is(':checked'))||($("#switch8").is(':checked'))){
                $("#switch5").prop('checked',false);
                $("#switch7").prop('checked',false);
                $("#switch8").prop('checked',false);
                $("#genderColor").hide();
                $("#ratingColor").hide();
                $("#brandColor").hide();
                $("#daynightColor").show();
                brand = "Brand";
                $('#brand-name').text(brand);
                $('.select-box').val(1);
                $(".select-box").prop('disabled', 'disabled');
                var ds = $("#switch6").attr('dimensions');
                Vis.updateNodeColor(ds);
                Vis.appendNodesColorInfor("#daynightColor");
            }
        }
        else if(this.id=="switch7"){
            if(!$("#switch5").is(':checked')&&!$("#switch6").is(':checked')&&!$("#switch8").is(':checked')){
                // Add color
                $(".color-info").show();
                $("#ratingColor").show();
                var ds = $(this).attr('dimensions');
                console.log(ds);
                Vis.updateNodeColor(ds);
                Vis.appendNodesColorInfor("#ratingColor");
            }
            else if(($("#switch5").is(':checked'))||($("#switch6").is(':checked'))||($("#switch8").is(':checked'))){
                $("#switch5").prop('checked',false);
                $("#switch6").prop('checked',false);
                $("#switch8").prop('checked',false);
                $("#genderColor").hide();
                $("#daynightColor").hide();
                $("#brandColor").hide();
                $("#ratingColor").show();
                brand = "Brand";
                $('#brand-name').text(brand);
                $('.select-box').val(1);
                $(".select-box").prop('disabled', 'disabled');
                var ds = $("#switch7").attr('dimensions');
                Vis.updateNodeColor(ds);
                Vis.appendNodesColorInfor("#ratingColor");
            }
        }
        else if(this.id=="switch8"){
            if(!$("#switch5").is(':checked')&&!$("#switch6").is(':checked')&&!$("#switch7").is(':checked')){
                $(".color-info").show();
                Vis.updateNodeColor();
                $("#brandColor").show();
                $(".select-box").prop('disabled', false);
            }
            else if(($("#switch5").is(':checked'))||($("#switch6").is(':checked'))||($("#switch7").is(':checked'))){
                $("#switch5").prop('checked',false);
                $("#switch6").prop('checked',false);
                $("#switch7").prop('checked',false);
                $("#genderColor").hide();
                $("#daynightColor").hide();
                $("#ratingColor").hide();
                $("#brandColor").show();
                Vis.updateNodeColor();
                $(".select-box").prop('disabled', false);
            }
        }
        else{
            var ds = _.split($(this).attr('dimensions'), ',');
            var name = $(this).attr('dsname');
            d3.selectAll(".selection").remove();
            Vis.drawDimension(ds,name);
            Vis.updateNodes();
            _.forEach(ds,function(d){
                numeric.push(d);
            });
        }
    }
    else{
        if(this.id=="switch5"||this.id=="switch6"||this.id=="switch7"||this.id=="switch8"){
            Vis.updateNodeColor();
            $(".color-info").hide();
            $("#genderColor").hide();
            $("#daynightColor").hide();
            $("#ratingColor").hide();
            $("#brandColor").hide();
            brand = "Brand";
            $('#brand-name').text(brand);
            $('.select-box').val(1);
            $(".select-box").prop('disabled', 'disabled');
            Vis.updateNodeColor(brand);
        }
        else {

            var ds = _.split($(this).attr('dimensions'), ',');
            var dsname = $(this).attr('dsname');
            var index=[];
            Vis.removeDimension(ds,dsname);
            _.forEach(ds,function(d){
                _.forEach(numeric,function (n) {
                    if(d==n){
                        index.push(numeric.indexOf(n));
                        for (var i=0; i<ds.length; i++){
                            d3.select("#weight-field ."+ds[i]).remove();
                        }
                    }
                });
            });

            index = index.reverse();
            _.forEach(index,function(i){
                numeric.splice(i,1);
            });
        }
    }

    if($('#switch5').is(':checked')||$("#switch6").is(':checked')||$("#switch7").is(':checked')){
        $('.select-box').prop('disabled', 'disabled');
        d3.selectAll("#img").style("display","none");
        d3.selectAll("#img0").style("display","none");
        d3.selectAll("#img1").style("display","none");
        d3.selectAll("#img2").style("display","none");
        d3.selectAll("#img3").style("display","none");
        d3.selectAll("#img4").style("display","none");
        d3.selectAll('#selectList #perfume-list').remove();
        d3.select("#barchart").remove();
        d3.select("#radarChart").remove();
        d3.select("#perfume-content").style("display","none");
        d3.select(".comparison-select-box").style("display","none");
    }
    else if(!$('#switch5').is(':checked')&&!$("#switch6").is(':checked')&&!$("#switch7").is(':checked')&&!$("#switch8").is(':checked')){
        $('.select-box').prop('disabled', false);
    }
    if(($('#switch1').is(':checked')||$("#switch2").is(':checked')||$("#switch3").is(':checked')||$('#switch4').is(':checked'))&&!$('#switch5').is(':checked')&&!$("#switch6").is(':checked')&&!$("#switch7").is(':checked')&&!$("#switch8").is(':checked')){
        $('.select-box').prop('disabled', 'disabled');
        d3.selectAll("#img").style("display","none");
        d3.selectAll("#img0").style("display","none");
        d3.selectAll("#img1").style("display","none");
        d3.selectAll("#img2").style("display","none");
        d3.selectAll("#img3").style("display","none");
        d3.selectAll("#img4").style("display","none");
        d3.selectAll('#selectList #perfume-list').remove();
        d3.select("#barchart").remove();
        d3.select("#radarChart").remove();
        d3.select("#perfume-content").style("display","none");
        d3.select(".comparison-select-box").style("display","none");
    }
});
