jQuery.noConflict();

(function ($, PLUGIN_ID) {
  "use strict";
  var subtablePlugin = {
    settings: {
      columns: ['', '日付', "担当者名_ルックアップ"],
      fil: ["施設自動採番", "訪問先施設自動採番"],
      svg: '<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="width: 20px; height: 20px; opacity: 1;" xml:space="preserve"> <style type="text/css"> .st0 { fill: #4B4B4B; } </style> <g> <path class="st0" d="M200.587,123.45V6.865L66.503,140.958H183.08C195.681,140.958,200.587,136.051,200.587,123.45z" style="fill: rgb(52, 152, 219);"></path> <path class="st0" d="M429.352,0H226.513v139.052c0,15.343-12.48,27.832-27.814,27.832H59.948V489.3c0,12.514,10.186,22.7,22.7,22.7 h346.704c12.513,0,22.7-10.185,22.7-22.7V22.683C452.052,10.176,441.865,0,429.352,0z" style="fill: rgb(52, 152, 219);"></path> </g> </svg>'
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
      //table1をareaReportFacilityに入れる
      // $(myTable).append(table1);
      subtablePlugin.fields.myTable.appendChild(usertable);

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
      query: `訪問先施設自動採番　in ("${subtablePlugin.fields.number}") order by レコード番号 asc`,
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
