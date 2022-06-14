jQuery.noConflict();

(function ($, PLUGIN_ID) {
  "use strict";
  var subtablePlugin = {
    settings: {
      columns: ['', '日付', "担当者名_ルックアップ"],
      fil: ["施設自動採番", "訪問先施設自動採番"],
      svg: '<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="width: 20px; height: 20px; opacity: 1;" xml:space="preserve"> <style type="text/css"> .st0 { fill: #4B4B4B; } </style> <g> <path class="st0" d="M200.587,123.45V6.865L66.503,140.958H183.08C195.681,140.958,200.587,136.051,200.587,123.45z" style="fill: rgb(52, 152, 219);"></path> <path class="st0" d="M429.352,0H226.513v139.052c0,15.343-12.48,27.832-27.814,27.832H59.948V489.3c0,12.514,10.186,22.7,22.7,22.7 h346.704c12.513,0,22.7-10.185,22.7-22.7V22.683C452.052,10.176,441.865,0,429.352,0z" style="fill: rgb(52, 152, 219);"></path> </g> </svg>',
      csvSvg: `<svg version="1.1" id="_x31_0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style=" opacity: 1;" xml:space="preserve">
<g>
	<path class="st0" d="M478.682,144.32v-0.082c-4.641-71.758-58.558-130.398-128.242-142c-7.918-1.359-16-2.078-24.316-2.156
		C325.721,0,325.162,0,324.76,0H111.24C68.041,0,32.92,35.121,32.92,78.32v355.282c0,43.199,35.121,78.398,78.32,78.398h289.52
		c43.203,0,78.32-35.199,78.32-78.398V154.32C479.08,150.961,479.002,147.602,478.682,144.32z M434.682,144.301v0.019
		c0.398,3.282,0.481,6.641,0.481,10v279.282c0,19.039-15.442,34.481-34.402,34.481H111.24c-18.961,0-34.398-15.442-34.398-34.481
		V78.32c0-19.038,15.438-34.402,34.398-34.402h214.883c8.398,0.082,16.48,1.122,24.316,3.043v48.16
		c0,27.118,22,49.118,49.122,49.118h25.523L434.682,144.301z" ></path>
	<path class="st0" d="M218.03,351.355c-4.141-3.316-9.141-4.972-15.008-4.972c-3.641,0-6.805,0.57-9.508,1.714
		c-2.695,1.145-5.133,2.774-7.297,4.883c-1.586,1.586-2.805,3.23-3.656,4.93c-0.852,1.703-1.469,3.562-1.844,5.59
		c-0.382,2.023-0.617,4.238-0.711,6.641c-0.086,2.406-0.125,5.106-0.125,8.098s0.039,5.691,0.125,8.098
		c0.094,2.406,0.329,4.617,0.711,6.641c0.375,2.027,0.992,3.89,1.844,5.59c0.851,1.703,2.07,3.344,3.656,4.93
		c2.164,2.11,4.602,3.738,7.297,4.883c2.703,1.144,5.867,1.714,9.508,1.714c5.867,0,10.867-1.656,15.008-4.973
		c3.762-3.015,6.238-7.457,7.546-13.179c0.129-0.508,0.305-0.965,0.414-1.489h-0.043c0.012-0.058,0.031-0.105,0.043-0.16h-12.406
		c-0.648,2.582-1.805,4.711-3.477,6.383c-1.671,1.672-4.038,2.507-7.086,2.507c-1.703,0-3.211-0.293-4.531-0.882
		c-1.32-0.586-2.422-1.375-3.297-2.375c-0.594-0.644-1.078-1.378-1.454-2.199c-0.382-0.82-0.695-1.878-0.93-3.168
		c-0.234-1.289-0.406-2.918-0.523-4.882c-0.117-1.965-0.18-4.446-0.18-7.438s0.063-5.469,0.18-7.438
		c0.117-1.965,0.289-3.59,0.523-4.883c0.234-1.289,0.547-2.343,0.93-3.167c0.375-0.821,0.86-1.555,1.454-2.2
		c0.875-0.996,1.977-1.789,3.297-2.374c1.32-0.586,2.828-0.883,4.531-0.883c3.047,0,5.398,0.836,7.039,2.508
		c1.641,1.672,2.789,3.801,3.43,6.382h10.543l1.797,0.028c0-0.012-0.004-0.02-0.004-0.028h0.164
		C224.818,359.614,222.162,354.668,218.03,351.355z"></path>
	<path class="st0" d="M272.194,377.886c-0.367-0.367-0.91-0.535-1.317-0.859c-0.672-0.539-1.398-1.011-2.179-1.426
		c-0.485-0.258-0.825-0.672-1.348-0.883c-1.875-0.762-4.25-1.347-7.125-1.762l-7.485-1.144c-1.343-0.176-2.476-0.469-3.382-0.879
		c-0.914-0.41-1.687-0.906-2.336-1.496c-0.641-0.645-1.094-1.348-1.359-2.11c-0.266-0.762-0.398-1.554-0.398-2.378
		c0-2.168,0.773-4.032,2.336-5.586c1.546-1.554,3.969-2.332,7.258-2.332c2.054,0,4.218,0.25,6.508,0.746
		c2.289,0.5,4.406,1.687,6.336,3.566l7.492-7.402l0.144-0.141h-0.003l0.117-0.114c-2.703-2.64-5.664-4.519-8.89-5.633
		c-3.226-1.113-7.008-1.671-11.352-1.671c-3.406,0-6.453,0.468-9.156,1.406c-2.695,0.942-4.984,2.246-6.859,3.918
		c-1.883,1.672-3.321,3.668-4.313,5.984c-1,2.317-1.5,4.883-1.5,7.699c0,5.34,1.5,9.446,4.492,12.321
		c1.406,1.351,3.078,2.449,5.016,3.301c1.938,0.851,4.313,1.48,7.125,1.89l7.485,1.145c1.578,0.234,2.758,0.5,3.515,0.793
		c0.766,0.293,1.469,0.734,2.118,1.32c1.289,1.29,1.93,3.02,1.93,5.191c0,2.524-0.938,4.458-2.813,5.809
		c-1.875,1.348-4.664,2.023-8.359,2.023c-2.875,0-5.602-0.382-8.187-1.144c-2.578-0.762-4.867-2.141-6.86-4.137l-7.922,7.922
		c3.047,3.11,6.438,5.266,10.164,6.465c3.726,1.203,7.961,1.805,12.719,1.805c3.281,0,6.343-0.426,9.195-1.274
		c2.843-0.851,5.305-2.082,7.39-3.699c2.078-1.613,3.711-3.59,4.882-5.938c1.172-2.347,1.758-5.046,1.758-8.098
		c0-2.816-0.383-5.335-1.141-7.566C275.123,381.289,273.897,379.414,272.194,377.886z" ></path>
	<polygon class="st0" points="319.358,346.91 312.459,369.297 306.709,387.519 294.194,346.91 284.686,346.91 281.674,346.859 
		281.69,346.91 281.522,346.91 302.202,409.566 311.35,409.566 327.111,362.019 332.123,347.07 332.069,347.07 332.123,346.91 	" ></polygon>
	<path class="st0" d="M157.474,298.984H354.53V154.742H157.474V298.984z M172.459,210.317V189.07h29.867v21.246H172.459z
		 M172.459,247.16v-21.859h29.867v21.859H172.459z M172.459,283.996v-21.851h29.867v21.851H172.459z M217.31,210.317V189.07h30.91
		v21.246H217.31z M217.31,247.16v-21.859h30.91v21.859H217.31z M217.31,283.996v-21.851h30.91v21.851H217.31z M263.205,210.317
		V189.07h30.91v21.246H263.205z M263.205,247.16v-21.859h30.91v21.859H263.205z M263.205,283.996v-21.851h30.91v21.851H263.205z
		 M309.103,210.317V189.07h30.438v21.246H309.103z M309.103,247.16v-21.859h30.438v21.859H309.103z M309.103,283.996v-21.851h30.438
		v21.851H309.103z"></path>
</g>
</svg>`
    },
    fields: {
      cursor: {},
      typeFields: {},
      url: "",
      data: [],
      number: null,
      body: {},
      myTable: {},
      states: []
    },
    ab: function (response) {
      console.log(response);
      subtablePlugin.fields.data = [];
      response.records.forEach((ele) => {
        let vbnet = ele.活動報告テーブル.value.filter((sub) => {
          return (sub.value[subtablePlugin.settings.fil[1]].value == subtablePlugin.fields.number)
        });
        vbnet.forEach((vpn, index) => {
          let cvp = [];
          let copyUrl = subtablePlugin.fields.url + ele.レコード番号.value;
          console.log(subtablePlugin.settings.columns[1]);
          subtablePlugin.settings.columns.forEach((text, inn) => {
            if (inn == 0) {
              cvp[inn] = `<a href="${copyUrl}" target="blank">${subtablePlugin.settings.svg}</a>`;
            }
            else {
              cvp[inn] = vpn.value[text].value;
            }
          })
          console.log(cvp);
          cvp.forEach((ee, index) => {
            if (index > 0) {
              subtablePlugin.fields.typeFields[subtablePlugin.settings.columns[index]] = vpn.value[subtablePlugin.settings.columns[index]].type;
            }
          })
          subtablePlugin.fields.data.push(cvp);
        });
      })
      return subtablePlugin.fields.data;
    },

    b: function (body) {
      return new kintone.Promise(function (resolve, _reject) {

        kintone.api(kintone.api.url('/k/v1/records/cursor.json', true), 'POST', body).then((resp) => {
          // success

          resolve(resp);
        }, (error) => {
          // error
          console.log(error);
        });
      });
    },
    c: function (cursor) {
      return new kintone.Promise(function (resolve, _reject) {
        kintone.api(kintone.api.url('/k/v1/records/cursor.json', true), 'GET', cursor).then((resp) => {
          console.log(resp);
          resolve(resp);
        }, (error) => {
          resolve(false);
        });
      });
    },
    del: function (cursor) {
      kintone.api(kintone.api.url('/k/v1/records/cursor.json', true), 'DELETE', cursor, (resp) => {
        // success
        console.log(resp);
      }, (error) => {
        // error
        console.log(error);
      });
    },
    sortData: function (sortNo) {
      if (subtablePlugin.fields.states[sortNo] == "desc") {
        subtablePlugin.fields.states[sortNo] = "asc"
        subtablePlugin.fields.data.sort((a, b) => {
          if (!(subtablePlugin.fields.typeFields[subtablePlugin.settings.columns[sortNo]].indexOf("TEXT"))) {
            return a[sortNo] - b[sortNo]
          }
          else {
            if (a[sortNo] > b[sortNo]) {
              return 1
            }
            else {
              return -1;
            }

          }
        });

      }
      else {
        subtablePlugin.fields.states[sortNo] = "desc"
        subtablePlugin.fields.data.sort((a, b) => {
          if (!(subtablePlugin.fields.typeFields[subtablePlugin.settings.columns[sortNo]].indexOf("TEXT"))) {
            return b[sortNo] - a[sortNo]
          }
          else {
            if (a[sortNo] > b[sortNo]) {
              return -1
            }
            else {
              return 1;
            }
          }
        });
      }
      Object.keys(subtablePlugin.fields.states).forEach((key) => {
        console.log(sortNo, key);
        if (key !== String(sortNo)) {
          subtablePlugin.fields.states[key] = "none";
        }
      })
      subtablePlugin.createTable();
    },
    createTable: function () {
      subtablePlugin.fields.myTable.innerHTML = "";

      let usertable = document.createElement("table");
      usertable.id = "usertable";
      //見出しの行を作る。レコード番号、日付、訪問先施設名、担当者名をテーブル１に追加する。
      let x = 0;
      let a = "";
      let head = document.createElement("tr");
      console.log(subtablePlugin.settings.columns);

      subtablePlugin.settings.columns.forEach((cl, index) => {
        let th = document.createElement("th");
        subtablePlugin.fields.states[index] = (subtablePlugin.fields.states[index]) ? subtablePlugin.fields.states[index] : "none";
        if (index === 0) {
        }
        else {
          th.addEventListener("click", function () { subtablePlugin.sortData(index); console.log(subtablePlugin.fields.states); });
          let spam = document.createElement("span");
          spam.textContent = cl;
          th.appendChild(spam);
          if (subtablePlugin.fields.states[index] == "none") {
            th.innerHTML = th.innerHTML + "<ul style='list-style:none;font-size:10px;'> <li style='padding-bottom:0px;padding-top:0px;' >▲</li > <li style='padding-bottom:0px;padding-top:0px;'>▼</li> </ul > "
          }
          else if (subtablePlugin.fields.states[index] == "asc") {
            th.innerHTML = th.innerHTML + "<ul style='list-style:none;font-size:10px;'> <li style='padding-bottom:0px;padding-top:0px;' >▲</li > </ul > "
          }
          else {
            th.innerHTML = th.innerHTML + "<ul style='list-style:none;font-size:10px;'> <li style='padding-bottom:0px;padding-top:0px;' >▼</li > </ul > "
          }
          // th.addEventListener("click",sortData(index-1));
        }
        head.appendChild(th);
      })
      usertable.appendChild(head);

      let cells = subtablePlugin.fields.data;
      x = 0;
      a = "";
      let tbody = document.createElement("tbody");
      //cellsの長さ分ループを繰り返す
      cells.forEach(function (item) {
        let tdata = document.createElement("tr");
        item.forEach((cell, index) => {
          let td = document.createElement("td");
          if (index === 0) {
            td.innerHTML = cell;
          }
          //a(空白)に xの値が0か、(0+1)%4で余りが１の場合<tr>を入れる
          //callsの中身を取り出してテーブルの内容として作っている
          else {
            td.textContent = cell;
          }
          tdata.appendChild(td);
          //4つ区切りで</tr>タグを入れる
        })
        tbody.appendChild(tdata);
      });
      usertable.appendChild(tbody);
      usertable = subtablePlugin.csvTobutton(usertable);
      //table1をareaReportFacilityに入れる
      // $(myTable).append(table1);
      subtablePlugin.fields.myTable.appendChild(usertable);

    },
    csvTobutton: function (usertable) {
      let ul = document.createElement("ul");
      ul.id = "test_ul";
      let li = document.createElement("li");
      li.appendChild(usertable);
      li.classList.add("test");
      ul.appendChild(li);
      let li2 = document.createElement("li");
      li2.classList.add("test");

      let button = document.createElement("a");
      button.id = "csv"
      button.innerHTML = subtablePlugin.settings.csvSvg;
      let csvData = "";
      let col = subtablePlugin.settings.columns.slice(1);
      csvData += col.join(',') + '\n';
      subtablePlugin.fields.data.forEach((e) => {
        let ele = e.slice(1);
        csvData += ele.join(',') + '\n';
      })
      var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
      var blob;
      blob = new Blob([bom, csvData], {
        type: 'text/csv'
      });
      button.setAttribute('download', "Export.csv");
      button.setAttribute('href', window.webkitURL.createObjectURL(blob));
      button.title = "CSVで出力する";
      li2.appendChild(button);
      ul.appendChild(li2);
      return ul;
    }
  }
  kintone.events.on(['app.record.detail.show'], async function (event) {
    subtablePlugin.fields.url = location.hostname;
    subtablePlugin.fields.url = location.protocol + "//" + subtablePlugin.fields.url;

    subtablePlugin.fields.data = [];
    subtablePlugin.fields.number = event.record[subtablePlugin.settings.fil[0]].value;
    subtablePlugin.fields.body = {
      'app': 86,
      'fields': ['レコード番号', '活動報告テーブル'],
      query: `${subtablePlugin.settings.fil[1]}　in ("${subtablePlugin.fields.number}") order by レコード番号 asc`,
      size: 500
    };
    let cho = `/k/${subtablePlugin.fields.body.app}/show#record=`;
    subtablePlugin.fields.url = String(subtablePlugin.fields.url + cho);
    console.log(subtablePlugin.fields.url);

    // 表示させるフィールド要素を取得
    subtablePlugin.fields.myTable = kintone.app.record.getSpaceElement('myTable');
    subtablePlugin.fields.cursor = await subtablePlugin.b(subtablePlugin.fields.body);
    console.log(subtablePlugin.fields.cursor);
    let res;
    do {
      res = await subtablePlugin.c(subtablePlugin.fields.cursor);
      console.log({ res }, { subtablePlugin });
      if (subtablePlugin.fields.data.length && res.records.length) {
        console.log(subtablePlugin.fields.data.records);
        subtablePlugin.fields.data.records = subtablePlugin.fields.data.records.concat(res.records);
      }
      else {
        subtablePlugin.fields.data = res;
      }

    } while (res.next)
    subtablePlugin.del(subtablePlugin.fields.cursor);
    if (subtablePlugin.fields.data.records.length) {
      console.log(subtablePlugin.ab(subtablePlugin.fields.data));
    }
    else {
      subtablePlugin.fields.data = [];
    }
    console.log(subtablePlugin.fields.data);
    //ボタンを押してareaReportFacilityに表示させるときは毎回空白に戻される
    //何回ボタンを押しても表示される表はひとつだけ
    subtablePlugin.createTable();

    console.log(subtablePlugin.fields.typeFields);
    return event;
  });
})(jQuery, kintone.$PLUGIN_ID);
