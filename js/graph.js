import { $ } from "./jquery";

const color = ["#50B4C8", "#F0A050", "#50C850"],
    background = "#66CCCC",
    page = $("#graph-page"),
    u = undefined,
    axisType = [{   //x轴
            "name": "graph-bottomList",
            "way": function (x) {
                return ([
                    [waveRound[0][0] + Math.round(x) + 0.5, waveRound[0][1]],
                    [waveRound[0][0] + Math.round(x) + 0.5, waveRound[1][1] + 5]
                ]);
            },
            "tagStyle": function (x) {
                return ("top: 8px; transform: rotate(35deg); left: " + (waveRound[0][0] + x - 10) + "px")
            },
            "signStyle": (waveRound[2][0] + 10) + "px",
            "unit": "s"
        },
        {   //y轴
            "name": "graph-leftList",
            "way": function (x) {
                return ([
                    [waveRound[2][0], waveRound[1][1] - Math.round(x) - 0.5],
                    [waveRound[1][0] - 4, waveRound[1][1] - Math.round(x) - 0.5]
                ]);
            },
            "tagStyle": function (x) {
                return ("right: 0px; top: " + (waveRound[1][1] - x - 9) + "px")
            },
            "signStyle": "75px",
            "unit": (this.type === "voltage") ? "V" : "A"
        }];

//根据像素进行大致的分段
function axisSplit(long) {
    return(Math.floor(long / 50));
}
//延长坐标
function extendPoint(x) {
    if(!x) { return(1); }

    const sign = x / Math.abs(x),
        rank = Math.rank(x),
        number = Math.signFigures(Math.abs(x), 2),      //保留三位有效数字
        int = Math.floor(number / rank),                //整数部分
        mod = Math.signFigures(x * sign / rank - int);  //小数部分

    let ans;
    if (int < 3) {
        if(mod < 0.2) {
            ans = 0.2;
        } else if(mod < 0.5) {
            ans = 0.5;
        } else {
            ans = 1;
        }
    } else if ((int > 2) && (int < 5)) {
        if(mod < 0.5) {
            ans = 0.5;
        } else {
            ans = 1;
        }
    } else {
        ans = 1;
    }
    return (Math.signFigures(rank * (int + ans) * sign));
}
//线段分段
function lineSplit(maxExpand, minExpand, num) {
    const rank = Math.rank(maxExpand),
        max = Math.signFigures(maxExpand / rank),
        min = Math.signFigures(Math.abs(minExpand / rank)),
        ans = [];

    for (let i = 1; i < 2 * num; i++) {
        const segment = Math.signFigures(max / i, 8),
            minNumber = Math.signFigures(min / segment, 8);

        //小数点五位以内被视作整除
        if ((segment === parseFloat(segment.toFixed(5))) &&
            (minNumber === Math.floor(minNumber))) {
            ans.push(i + minNumber);
        }
    }
    return (ans.reduce(function (pre, next) {
        if (Math.abs(pre - num) < Math.abs(next - num)) {
            return (pre);
        } else {
            return (next);
        }
    }));
}
//延长线段
function extendLine(line, long) {
    //坐标轴最小最大值，长度，以及分段数量
    let axisMin, axisMax;
    //线段的初步分割
    const num = axisSplit(long);

    if (line[0] === line[1]) {
        //起点和终点相等
        const number = Math.abs(line[0]),
            rank = Math.rank(number),
            numberFloor = Math.floor(number / rank),
            minExpand = (numberFloor === Math.signFigures(number / rank)) ?
                numberFloor - 1 : numberFloor,
            maxExpand = minExpand + 2;

        if(line[0] > 0) {
            axisMin = Math.signFigures(minExpand * rank);
            axisMax = Math.signFigures(maxExpand * rank);
        } else {
            axisMin = - Math.signFigures(maxExpand * rank);
            axisMax = - Math.signFigures(minExpand * rank);
        }
        return([axisMin, axisMax, lineSplit((axisMax - axisMin), 0, num)]);
    } else if (line[0] * line[1] <= 0) {
        //两点异号，0点包含在其中
        const max = Math.max(Math.abs(line[0]), Math.abs(line[1])),
            min = Math.min(Math.abs(line[0]), Math.abs(line[1])),
            maxExpand = extendPoint(max),       //最大值先被固定
            minExpand = Math.signFigures(
                extendPoint((maxExpand + min) / 2) * 2 - maxExpand
            );

        if (Math.abs(line[0]) < Math.abs(line[1])) {
            axisMin = - minExpand;
            axisMax = maxExpand;
        } else {
            axisMin = - maxExpand;
            axisMax = minExpand;
        }
        return([axisMin, axisMax, lineSplit(axisMax, axisMin, num)]);
    } else {
        //两点同号，0点没有被包含其中，两端悬浮
        const min = Math.min(Math.abs(line[0]), Math.abs(line[1])),
            maxExpand = extendPoint(Math.abs(point[0] - point[1]) / 2) * 2,
            count = lineSplit(maxExpand, 0, num),
            minFloor = Math.floor(min / (maxExpand / count)) * (maxExpand / count);

        if (line[0] < 0) {
            axisMin = - (maxExpand + minFloor);
            axisMax = - minFloor;
        } else {
            axisMin = minFloor;
            axisMax = maxExpand + minFloor;
        }
        return([axisMin, axisMax, count]);
    }
}
//收缩坐标
function reduceList(line, list) {

}
//绘制坐标轴

//提示文字格式
//保留5个有效数字
function tipText(number) {
    if(!number) { return("0"); };

    const save = 5,
        sign = number / Math.abs(number),
        unitS = ["m", "μ", "n", "p"],
        unitL = ["k", "M", "G"];

    let sub = -1,
        uint = number * sign;

    while(uint < 1) {
        uint *= 1000;
        sub ++;
        if(uint > 1) {
            return(Math.signFigures(sign * uint, save) + unitS[sub]);
        }
    }
    while(uint > 1000) {
        uint *= 0.001;
        sub ++;
        if(uint < 1000) {
            return(Math.signFigures(sign * uint, save) + unitL[sub]);
        }
    }
    return(Math.signFigures(number, save));
}

//canvas绘图类
function Graphics(canvas) {
    if(!(canvas && canvas.attributes && canvas.nodeName)) {
        throw("输入必须是canvas元素");
    }
    this.elementDOM = canvas;
    this.ctx = canvas.getContext("2d");
    this.length = {
        "width" : parseInt(canvas.getAttribute("width")),
        "height" : parseInt(canvas.getAttribute("Height"))
    }
    this.clear();       //创建时清理画布
}
Graphics.prototype = {
    //备份当前输入属性在原来的属性值
    attributesBackUp(attributes) {
        const temp = {};
        for(let i in attributes) if(attributes.hasOwnProperty(i)) {
            temp[i] = this.ctx[i];
            this.ctx[i] = attributes[i];
        }
        return(temp);
    },
    //将输入属性全部赋值给this
    attributesAssignment(attributes) {
        for(let i in attributes) if(attributes.hasOwnProperty(i)) {
            this.ctx[i] = attributes[i];
        }
    },
    //恢复默认属性
    attributesDefault() {
        //默认属性
        const Default = {
            "fillStyle":"#000000",
            "font":"10px sans-serif",
            "globalAlpha":1,
            "globalCompositeOperation":"source-over",
            "imageSmoothingEnabled":true,
            "lineCap":"butt",
            "lineDashOffset":0,
            "lineJoin":"miter",
            "lineWidth":1,
            "miterLimit":10,
            "shadowBlur":0,
            "shadowColor":"rgba(0, 0, 0, 0)",
            "shadowOffsetX":0,
            "shadowOffsetY":0,
            "strokeStyle":"#000000",
            "textAlign":"start",
            "textBaseline":"alphabetic"
        };
        //默认属性赋值
        for(let i in Default) if (Default.hasOwnProperty(i)) {
            this.ctx[i] = Default[i];
        }
    },
    //绘制直线
    line(way, attributes, save = true) {
        let temp;
        if (save) {
            temp = this.attributesBackUp(attributes);
        }
        this.ctx.beginPath();
        this.ctx.moveTo(way[0][0], way[0][1]);
        for (let i = 1; i < way.length; i++) {
            this.ctx.lineTo(way[i][0], way[i][1]);
        }
        this.ctx.stroke();
        if (save) {
            this.attributesAssignment(temp);
        }
    },
    //实心方块
    fillRect(start, long, attributes) {
        //只输入了属性的情况下，默认覆盖全部区域
        if(typeof start === "object" && long === u && attributes === u) {
            attributes = start;
            start = [0,0];
            long = [this.length.width, this.length.height];
        }
        const temp = this.attributesBackUp(attributes);
        this.ctx.fillRect(start[0], start[1], long[0], long[1]);
        this.attributesAssignment(temp);
    },
    //空心方框
    strokeRect(start, long, attributes) {
        const temp = this.attributesBackUp(attributes);
        this.ctx.strokeRect(start[0], start[1], long[0], long[1]);
        this.attributesAssignment(temp);
    },
    //绘制圆形
    circle(x, y, r, attributes, save = true) {
        let temp;
        if (save) {
            temp = this.attributesBackUp(attributes);
        }
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI*2, true);
        this.ctx.fill();
        if (save) {
            this.attributesAssignment(temp);
        }
    },
    //清理画布
    clear(a, b) {
        //a是左上角坐标，b是x、y轴长度
        if(a === u || b === u) {
            this.ctx.clearRect(0, 0, this.length.width, this.length.height);
        } else {
            this.ctx.clearRect(a[0], a[1], b[0], b[1]);
        }
    },
    //toDataURL
    toDataURL(...args) {
        return(this.elementDOM.toDataURL(...args));
    },
    //绘制文字
    toText(text, position, attributes, save = true) {
        let temp;
        if (save) temp = this.attributesBackUp(attributes);
        this.ctx.fillText(text, position[0], position[1]);
        if (save) this.attributesAssignment(temp);
    },
    //将其他canvas图形会绘制自身
    drawImage(...args) {
        this.ctx.drawImage(...args);
    }
}
//波形绘制窗口类
function Graph(Data, DOM, type) {
    //实例初始化
    this.elementDOM = $(DOM);
    this.type = type;
    this.output = Data;
    this.long = {};
    this.time = Math.signFigures(Math.txt2Value($("#endtime").prop("value"))),
    this.stepTime = Math.signFigures(Math.txt2Value($("#stepsize").prop("value")));

    //计算各种坐标
    const left = 80;            //左侧边栏宽度
    const top = 10;             //顶层间隔宽度
    const bottomHeight = 70;    //底栏高度
    //整个背景画布的宽高
    const Width = this.elementDOM.width(),
        Height = this.elementDOM.height();

    this.long.waveWidth = Width - left - 10;
    this.long.waveHeight = Height - bottomHeight - top;
    this.long.waveRound = [
        [left, top],
        [left, top + this.long.waveHeight],
        [left + this.long.waveWidth, top + this.long.waveHeight],
        [left + this.long.waveWidth, top]
    ];
    //整个输出序列的最大最小值（Y轴最大最小值）
    const valueStart = [
        Math.minOfArray(Data.map((n) => Math.minOfArray(n.data))),
        Math.maxOfArray(Data.map((n) => Math.maxOfArray(n.data)))
    ];
    //绘制背景
    this.drawBackground([0, this.time], valueStart, true);
    //创建曲线画布
    for (let i = 0; i < Data.length; i++) {
        this.elementDOM.append($("<canvas>", {
            "class": "graph-canvas",
            "width": this.long.waveWidth - 2,
            "Height": this.long.waveHeight - 2,
            "id": "graph-" + this.output[i].name,
            "style": "position: absolute; left: 81px; top: 11px; display: block"
        }));
    }
    //绘制曲线
    this.darwCurve([0, this.time], valueStart);
    //当前曲线状态为全部显示
    for(let i = 0; i < this.output.length; i++) {
        this.output[i].status = true;
    }
    //添加动态操作集合DIV
    const actionDiv = this.elementDOM.append($("<div>", {
        "class": "graph-action",
        "style": "position: absolute; left: 80px; top: 10px;" +
        "width: " + this.long.waveWidth + "px; Height: " + this.long.waveHeight + "px;"
    }));
    //创建轴线画布
    actionDiv.append($("<canvas>", {
        "class": "graph-action-canvas",
        "width": this.long.waveWidth,
        "Height": this.long.waveHeight,
        "style": "position: absolute; left: 0px; top: 0px;"
    }));
    //创建曲线说明DIV
    for(let i = 0; i < this.output.length + 1; i++) {
        actionDiv.append($("<div>", {
            "class": "graph-action-tip",
            "style": "position: absolute; display: none;"
        }));
    }
    //最后一层div覆盖整个曲线窗口，防止误操作
    actionDiv.append($("<div>", {
        "class": "graph-action-cover",
        "style": "position: absolute; left: 0px; top: 0px;" +
        "width: " + this.long.waveWidth + "px; Height: " + this.long.waveHeight + "px;"
    }));
    //添加右上角图例
    this.createTable();
}
Graph.prototype = {
    //绘制背景
    drawBackground(time, value, expend = false) {
        //取出数据
        const axis = [],
            waveWidth = this.long.waveWidth,
            waveHeight = this.long.waveHeight,
            waveRound = this.long.waveRound,
            //寻找或者创建背景画布
            background = this.elementDOM.childSelect("canvas.graph-background", 1, {
                "width": this.elementDOM.width() + "px",
                "height": this.elementDOM.height() + "px",
                "style": "position: absolute; left: 0px; top: 0px;"
            });

        //创建画笔
        const drawer = new Graphics(background[0]);
        //面板背景
        drawer.fillRect(waveRound[0], [waveWidth, waveHeight], {
            "fillStyle" : "#fffdf6"
        });
        //边缘阴影
        drawer.line(waveRound.slice(1,4), {
            "shadowOffsetX" : 2,
            "shadowOffsetY" : 2,
            "shadowBlur" : 3,
            "shadowColor" : "rgba(0, 0, 0, 0.7)",
            "strokeStyle" : "#999999"
        });
        drawer.line(waveRound.slice(0,2), {
            "shadowOffsetX" : -2,
            "shadowOffsetY" : 2,
            "shadowBlur" : 3,
            "shadowColor" : "rgba(0, 0, 0, 0.7)",
            "strokeStyle" : "#999999"
        });
        //设置画笔属性
        drawer.attributesAssignment({
            "strokeStyle": "#cccccc",
            "lineWidth": 1
        });

         //左侧边栏和底部边栏
        /*
         for(let k = 0; k < 2; k++) {
             //边栏和底栏的相关属性
             const divType = [
                 {   //x轴
                     "name": "graph-bottomList",
                     "way": function (x) {
                         return ([
                             [waveRound[0][0] + Math.round(x) + 0.5, waveRound[0][1]],
                             [waveRound[0][0] + Math.round(x) + 0.5, waveRound[1][1] + 5]
                         ]);
                     },
                     "tagStyle": function (x) {
                         return ("top: 8px; transform: rotate(35deg); left: " + (waveRound[0][0] + x - 10) + "px")
                     },
                     "signStyle": (waveRound[2][0] + 10) + "px",
                     "unit": "s"
                 },
                 {   //y轴
                     "name": "graph-leftList",
                     "way": function (x) {
                         return ([
                             [waveRound[2][0], waveRound[1][1] - Math.round(x) - 0.5],
                             [waveRound[1][0] - 4, waveRound[1][1] - Math.round(x) - 0.5]
                         ]);
                     },
                     "tagStyle": function (x) {
                         return ("right: 0px; top: " + (waveRound[1][1] - x - 9) + "px")
                     },
                     "signStyle": "75px",
                     "unit": (this.type === "voltage") ? "V" : "A"
                 }
             ];

             const axisx = range[k],
                 rank = maxRank(axisx),
                 listDiv = this.elementDOM.childSelect("div." + divType[k].name, 1),
                 lists = listDiv.childSelect("div.axisSign", axisx.length),
                 eachPixel = [this.long.waveWidth, this.long.waveHeight][k] / (axisx[axisx.length - 1] - axisx[0]);

             for (let i = 0; i < axisx.length; i++) {
                 const axisLast = (axisx[i - 1]) ? (Math.round((axisx[i - 1] - axisx[0]) * eachPixel) - 0.5) : (-30),
                     axisNow = Math.round((axisx[i] - axisx[0]) * eachPixel) - 0.5;

                 drawer.line(divType[k].way(axisNow));

                 if (axisNow - axisLast > 20) {
                     lists.get(i).attr("style", divType[k].tagStyle(axisNow))
                         .text((axisx[i] / rank).toFixed(3));
                 } else {
                     lists.get(i).remove();
                 }
             }
             //添加数量级
             const rankNumber = [Infinity, 9, 6, 3, 0, -3, -6, -9, -12, -Infinity],
                 mathSign = Math.log10(rank),
                 sign = $("<div>", {
                     "class": "number-rank",
                     "style": "left:" + divType[k].signStyle
                 }),
                 exp10 = $("<span>"),
                 unit = $("<span>"),
                 upSign = $("<span>", {
                     "class": "upSign"
                 });
             sign.append(exp10);
             sign.append(upSign);
             sign.append(unit);
             listDiv.append(sign);

             for (let i = 0; i < rankNumber.length - 1; i++) {
                 const units = ["G", "M", "k", "", "m", "μ", "n", "p"];
                 if ((mathSign < rankNumber[i]) && (mathSign > rankNumber[i + 1])) {
                     exp10.text("×10");
                     unit.text(units[i] + divType[k].unit);
                     if (mathSign - rankNumber[i + 1] !== 1) {
                         upSign.text(mathSign - rankNumber[i + 1]);
                         if (i === rankNumber.length - 2) {
                             upSign.text(mathSign - rankNumber[i + 1]);
                         }
                     }
                     break;
                 } else if (mathSign === rankNumber[i]) {
                     unit.text(units[i - 1] + divType[k].unit);
                     break;
                 }
             }
         }
         */

        //绘制轴线
        for(let i = 0; i < 2; i++) {
            const item = [time, value][i],
                pixel = [this.long.waveWidth, this.long.waveHeight][i],
                [axisMin, axisMax, count] = extendLine(item, pixel),
                axisLong = Math.signFigures(axisMax - axisMin),
                splitLong = Math.signFigures(axisLong / count),
                axisList = [axisMin];
            //坐标轴分割值
            while (axisList[axisList.length - 1] < axisMax) {
                axisList.push(Math.signFigures(axisList[axisList.length - 1] + splitLong));
            }
            //不扩展坐标时收缩当前列表
            if(!expend) { reduceList(axisList, item); }
            //保存当前坐标轴列表
            axis[i] = axisList;


        }

        //画笔属性恢复默认
        drawer.attributesDefault();
        //绘制边框
        drawer.strokeRect(waveRound[0], [waveWidth, waveHeight], {
            "strokeStyle" : "#999999",
            "lineWidth" : 2
        });
        //保存当前坐标序列
        //this.numberList = range;
    },
    //绘制曲线
    darwCurve() {
        const [timeStart, timeEnd, valueMin, valueMax] = this.backgroundStartToEnd(),
            pixelSplitX = this.long.waveWidth / Math.signFigures(timeEnd - timeStart),
            pixelSplitY = this.long.waveHeight / Math.signFigures(valueMax - valueMin),
            //精确求解输出时间间隔的长度
            outputTimeSplit = this.time / (this.output[0].data.length - 1);

        for(let i = 0; i < this.output.length; i++) {
            const name = this.output[i].name,
                data = this.output[i].data,
                darwLine = [];

            for(let j = 0; j < data.length; j++) {
                darwLine.push([
                    pixelSplitX * (j * outputTimeSplit - timeStart),
                    this.long.waveHeight - pixelSplitY * (data[j] - valueMin) - 1.25    //每个点的原点是左上角，现在要把点放到中点
                ]);
            }
            const drawer = new Graphics(document.getElementById("graph-" + name));
            drawer.clear();
            drawer.line(darwLine, {
                "strokeStyle" : color[i],
                "lineWidth" : 2.5
            });
        }
    },
    //创建图例
    createTable() {
        //添加table本体
        const table = this.elementDOM.append($("<table>",{
            "class": "graph-table-legend"
        })).append($("<tbody>"));

        //有多少波形就添加多少行
        for(let i = 0; i < this.output.length; i++) {
            //行元素
            const row = table.append($("<tr>", {
                "class": "graph-table-row",
                "id" : "table-legend-" + this.output[i].name
            }));
            //图例颜色框
            row.append($("<td>", {
                "class": "graph-table-swatch-column"
            })).append($("<div>", {
                "class": "table-legend-swatch-outline"
            })).append($("<div>", {
                "class": "table-legend-swatch",
                "style": "border-color:" + color[i] + ";background-color: " + color[i] + ";"
            }));
            //文字说明
            const textTd = row.append($("<td>", {
                "class": "graph-table-legend graph-table-legend-label"
            }));
            const text = this.output[i].name.split("_");
            if (text[1]) {
                textTd.text(text[0] + "(" + text[1] + ")");
            } else {
                textTd.inner(text[0]);
            }
        }
    },
    //绘制x轴线
    drawMove(x, y) {
        //画线
        const drawer = new Graphics(this.elementDOM[0].querySelector(".graph-action-canvas"));
        drawer.clear();
        drawer.line([[x, 0], [x, this.long.waveHeight]],{
            strokeStyle: "#bbbbbb",
            lineWidth: 1
        });

        const [backTimeStart, backTimeEnd, backValueMin, backValueMax] = this.backgroundStartToEnd(),
            stepTime = this.stepTime,
            width = this.long.waveWidth,
            height = this.long.waveHeight,
            error = 5,
            time2Pixel = (backTimeEnd - backTimeStart) / width,
            timeMinSub = Math.round((((x - error < 2) ? 2 : x - error) * time2Pixel + backTimeStart) / stepTime),
            timeMaxSub = Math.round((((x + error > width - 2) ? width - 2 : x + error) * time2Pixel + backTimeStart) / stepTime),

            value2Pixel = (backValueMax - backValueMin) / height,
            valueMax = backValueMax - ((y - error < 2) ? 2 : y - error) * value2Pixel,
            valueMin = backValueMax - ((y + error > height - 2) ? height - 2 : y + error) * value2Pixel;

        let min = Infinity, sub = -1;
        if(typeof y === "number") {
            //鼠标在当前面板，搜索合适的index
            for (let i = 0; i < this.output.length; i++) {
                if (!this.output[i].status) {
                    continue;
                }
                const data = this.output[i].data;
                for (let j = timeMinSub; j <= timeMaxSub; j++) {
                    if (data[j] > valueMin && data[j] < valueMax) {
                        const positionX = (j * stepTime - backTimeStart) / time2Pixel,
                            positionY = (backValueMax - data[j]) / value2Pixel,
                            distance = Math.abs(positionX - x) + Math.abs(positionY - y);

                        if (distance < min) {
                            min = distance;
                            sub = j;
                        }
                    }
                }
            }
        } else if(typeof y === "string" && y.search("index:") !== -1) {
            //鼠标不在当前面板，直接显示index的数值
            sub = Number(y.split(":")[1]);
        }


        const tips = $(".graph-action-tip", this.elementDOM),
            unit = (this.type === "voltage") ? "V" : "A";
        if(sub !== -1) {
            tips.attr("style", "position:absolute; display: block");
            const circleX = (sub * stepTime - backTimeStart) / time2Pixel;

            for(let i = 0; i < this.output.length; i++) {
                if(this.output[i].status) {
                    //曲线显示
                    const circleY = (backValueMax - this.output[i].data[sub]) / value2Pixel;
                    drawer.circle(circleX, circleY, 5, {
                        "fillStyle": color[i]
                    });
                    tips.get(i).text(tipText(this.output[i].data[sub]) + unit)
                        .css({ right: (width - circleX) + "px", bottom: (height - circleY) + "px" });
                } else {
                    //曲线隐藏
                    tips.get(i).attr("style", "display: none");
                }
            }
            tips.get(-1).text(tipText(sub * stepTime) + "s")
                .css({ right: (width - circleX) + "px", bottom: "0px" });

            return("index:" + sub);
        } else {
            tips.attr("style", "display: none");
            return(false);
        }
    },
    //清空动作画布
    clearActionCanvas() {
        const canvas = $(".graph-action-canvas", this.elementDOM)[0],
            drawer = canvas.getContext("2d");
        drawer.clearRect(0, 0, this.long.waveWidth, this.long.waveHeight);

        $(".graph-action-tip", this.elementDOM)
            .attr("style", "display: none");
    },
    //绘制选择框
    drawSelect(event, current) {
        //初次运行，计算临时变量
        if(!current.drawer) {
            current.drawer = new Graphics(current.canvas);
            current.offset = $(current.canvas).offset($("div#graph-page"));
        }

        //面板外框线宽度
        const border = 2,
            drawer = current.drawer,
            size = current.drawer.length,
            offset = [
                event.offsetX - current.offset[0],
                event.offsetY - current.offset[1]
            ];

        //源元素和触发元素不同，定位offset需要重新计算
        if(event.target !== event.currentTarget) {
            let node = event.target;
            //offset是鼠标所在源元素到块级元素的偏移
            while(node.tagName.toLowerCase() !== "div") {
                node = node.parentNode;
            }
            //求当前块级元素到page的偏移值
            while(node !== event.currentTarget) {
                offset[0] += node.offsetLeft;
                offset[1] += node.offsetTop;
                node = node.parentNode;
            }
        }

        //选中范围
        let left = Math.min(current.start[0], offset[0]),
            right = Math.max(current.start[0], offset[0]),
            top = Math.min(current.start[1], offset[1]),
            bottom = Math.max(current.start[1], offset[1]);

        //范围限定
        if(left < border) { left = border; }
        if(top < border) { top = border; }
        if(right > size.width - border) { right = size.width - border; }
        if(bottom > size.height - border) { bottom = size.height - border; }

        const start = [left, top],                  //左上角坐标
            long = [right - left, bottom - top];    //x、y轴长度

        //绘制方框
        drawer.clear();
        drawer.fillRect({"fillStyle": "rgba(187,187,187,0.5)"});
        drawer.clear(start, long);
        drawer.strokeRect(start, long, {"strokeStyle": "#aaaaaa"});

        //保存当前范围
        current.select = [left, top, right, bottom];
    },
    //返回当前背景的XY轴起始和终止坐标
    backgroundStartToEnd() {
        return([
            this.numberList[0][0],                              //当前时间起点
            this.numberList[0][this.numberList[0].length - 1],  //当前时间终点
            this.numberList[1][0],                              //当前值起点
            this.numberList[1][this.numberList[1].length - 1]   //当前值终点
        ]);
    },
    //从像素范围到值范围
    pixelToValue(pixelSmall, pixelLarge) {
        //XY轴起始终点
        const [timeStart, timeEnd, valueMin, valueMax] = this.backgroundStartToEnd();
        //每个像素点对应的实际长度
        const pixelSplitX = Math.signFigures(timeEnd - timeStart) / this.long.waveWidth;
        const pixelSplitY = Math.signFigures(valueMax - valueMin) / this.long.waveHeight;

        //必须要注意的是，输入的是鼠标坐标
        //对于画布而言，Y轴最上面是原点
        //而对于实际数值坐标来说，最下面才是原点，要注意坐标转换
        const realSmall = [
            pixelSmall[0] * pixelSplitX + timeStart,
            (this.long.waveHeight - pixelLarge[1]) * pixelSplitY + valueMin
        ];
        const realLarge = [
            pixelLarge[0] * pixelSplitX + timeStart,
            (this.long.waveHeight - pixelSmall[1]) * pixelSplitY + valueMin
        ];
        //以大数字为基准，保留4位有效数字
        const rank = [
            3 - Math.floor(Math.log10(realLarge[0])),
            3 - Math.floor(Math.log10(realLarge[1]))
        ];
        for(let i = 0; i < 2; i++) {
            if (rank[i] > 0) {
                realSmall[i] = parseFloat(realSmall[i].toFixed(rank[i]));
                realLarge[i] = parseFloat(realLarge[i].toFixed(rank[i]));
            } else if(rank[i] < 0) {
                const temp = Math.pos(10, rank[i]);
                realSmall[i] = Math.round(realSmall[i] / temp) * temp;
                realLarge[i] = Math.round(realLarge[i] / temp) * temp;
            } else {
                realSmall[i] = Math.round(realSmall[i]);
                realLarge[i] = Math.round(realLarge[i]);
            }
        }
        //返回的是左下角以及右上角坐标
        return ([realSmall, realLarge]);
    },
    //根据选择范围重绘曲线
    reDraw(range) {
        const [timeStart, timeEnd, valueMin, valueMax] = this.backgroundStartToEnd(),
            time2pixel = Math.signFigures(timeEnd - timeStart) / this.long.waveWidth,
            value2pixel = Math.signFigures(valueMax - valueMin) / this.long.waveHeight,
            time = [range[0], range[2]].map((n) => Math.signFigures(n * time2pixel + timeStart, 4)),
            value = [range[1], range[3]].map((n) => Math.signFigures(valueMax - n * value2pixel, 4));

        this.drawBackground([time, value]);
        this.darwCurve();
    }
};
//把整个波形页面转换成图像
Graph.toImage = function() {
    if(page.attr("class").search("visionAll") === -1) {
        throw("波形界面尚未打开，无法转换");
    }

    //创建临时画布，网页数据流中不显示
    const tempCanvas = new Graphics($("<canvas>", {
        "style" : "display: none",
        "height" : page.height() + "px",
        "width" : page.width() + "px"
    })[0]);
    //绘制背景
    tempCanvas.fillRect([0,0], [tempCanvas.length.width, tempCanvas.length.height], {
        "fillStyle" : background
    });
    //绘制标题
    $("div#graph-title span").each((n) => {
        const elem = $(n),
            offset = elem.offset(page),
            position = [offset[0], offset[1] + 15.5];

        /*
        对于文字而言，offset求得的是元素左上角到page元素左上角的距离
        然而对于canvas而言，书写文字的时候，是以文字左下角为起点坐标的，所以这里写文字的坐标需要加上文字自身的高度，文字自身是16px
         */

        tempCanvas.toText(elem.text(), position, {
            "font" : "16px Microsoft YaHei"
        });
    });
    //说明文字属性
    tempCanvas.attributesAssignment({
        "font" : "10px Arial"
    });
    //横向文字
    $("div.graph-individual div.graph-leftList div.axisSign, " +
        "div.graph-individual div.number-rank span").each((n) => {
        const elem = $(n),
            offset = elem.offset(page),
            position = [offset[0], offset[1] + 10.5];

        tempCanvas.toText(elem.text(), position, {}, false);
    });
    //绘制波形
    $("div.graph-individual canvas.graph-background, " +
        "div.graph-individual canvas.graph-individual, " +
        "div.graph-individual canvas.graph-canvas").each((n) => {
        const position = $(n).offset(page);
        tempCanvas.drawImage(n, position[0], position[1]);
    });
    //画笔属性恢复默认
    tempCanvas.attributesDefault();
    //绘制图例
    $("div.graph-individual tbody").each((table) => {
        const elem = $(table),
            position = elem.offset(page).map((n) => n + 0.5),
            size = [elem.innerWidth(), elem.innerHeight()];

        tempCanvas.fillRect(position, size, {
            "fillStyle" : "rgba(255, 255, 255, 0.6)"
        });
        tempCanvas.strokeRect(position, size, {
            "strokeStyle" : "#cccccc",
            "lineWidth" : 1
        });

        //每行的内框
        $("div.table-legend-swatch-outline", table).each((n, i) => {
            const elem = $(n),
                position =  elem.offset(page).map((n) => n + 1.5),
                size = [elem.innerWidth() + 1, elem.innerHeight() + 1];

            if(i) {
                position[1] -= 1;
            }

            tempCanvas.strokeRect(position, size, {
                "strokeStyle" : "#cccccc",
                "lineWidth" : 1
            });
        });
        //每行的色块
        $("div.table-legend-swatch", table).each((n, i) => {
            const elem = $(n),
                position =  elem.offset(page).map((n) => n + 1),
                //这里是border的宽度
                size = [n.clientLeft * 2, n.clientTop * 2];

            if(i) {
                position[1] -= 1;
            }

            tempCanvas.fillRect(position, size, {
                "fillStyle" : elem.attr("style").split(";")[0].split(":")[1]
            });
        });
        //每行的说明
        $("td.graph-table-legend.graph-table-legend-label", table).each((n, i) => {
            const elem = $(n),
                position =  elem.offset(page);

            position[0] += 1;
            if(i) {
                position[1] += 12;
            } else {
                position[1] += 13;
            }

            tempCanvas.toText(elem.text(), position, {
                "font" : "10px Arial",
                "fillStyle" : "#696969"
            });
        });
    });
    //横坐标斜着的文字
    tempCanvas.attributesAssignment({
        "font" : "10px Arial"
    });
    const deg = 35 / 180 * Math.PI;     //倾斜角度
    tempCanvas.ctx.rotate(deg);
    $(".graph-bottomList .axisSign").each((n) => {
        const elem = $(n),
            position = elem.offset(page),
            x1 = position[0] / Math.cos(deg),
            y1 = position[0] * Math.tan(deg),
            y2 = position[1] - y1,
            x2 = y2 * Math.sin(deg);
        tempCanvas.toText(elem.text(), [x1 + x2, y2 * Math.cos(deg)], {}, false);
    });
    return(tempCanvas.toDataURL());
}

export { Graph };