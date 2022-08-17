jQuery.noConflict();
(function ($, PLUGIN_ID, svgObj) {
  "use strict";
  var subtablePlugin = {
    settings: {
      columns: ['', '日付', "担当者名_ルックアップ"],
      fil: ["施設自動採番", "訪問先施設自動採番"],
      svg: svgObj.svg.record,
      csvSvg: svgObj.svg.csvDownload
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
      this.fields.data = [];
      response.records.forEach((ele) => {
        let vbnet = ele.活動報告テーブル.value.filter((sub) => {
          return (sub.value[this.settings.fil[1]].value == this.fields.number)
        });
        vbnet.forEach((vpn, index) => {
          let cvp = [];
          let copyUrl = this.fields.url + ele.レコード番号.value;
          console.log(this.settings.columns[1]);
          this.settings.columns.forEach((text, inn) => {
            if (inn == 0) {
              cvp[inn] = `<a href="${copyUrl}" target="blank">${this.settings.svg}</a>`;
            }
            else {
              cvp[inn] = vpn.value[text].value;
            }
          })
          console.log(cvp);
          cvp.forEach((ee, index) => {
            if (index > 0) {
              this.fields.typeFields[this.settings.columns[index]] = vpn.value[this.settings.columns[index]].type;
            }
          })
          this.fields.data.push(cvp);
        });
      })
      return this.fields.data;
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
      if (this.fields.states[sortNo] == "desc") {
        this.fields.states[sortNo] = "asc"
        this.fields.data.sort((a, b) => {
          if (!(this.fields.typeFields[this.settings.columns[sortNo]].indexOf("TEXT"))) {
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
        this.fields.states[sortNo] = "desc"
        this.fields.data.sort((a, b) => {
          if (!(this.fields.typeFields[this.settings.columns[sortNo]].indexOf("TEXT"))) {
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
      Object.keys(this.fields.states).forEach((key) => {
        console.log(sortNo, key);
        if (key !== String(sortNo)) {
          this.fields.states[key] = "none";
        }
      })
      this.createTable();
    },
    createTable: function () {
      this.fields.myTable.innerHTML = "";

      let usertable = document.createElement("table");
      usertable.id = "usertable";
      //見出しの行を作る。レコード番号、日付、訪問先施設名、担当者名をテーブル１に追加する。
      let x = 0;
      let a = "";
      let head = document.createElement("tr");
      console.log(this.settings.columns);

      this.settings.columns.forEach((cl, index) => {
        let th = document.createElement("th");
        this.fields.states[index] = (this.fields.states[index]) ? this.fields.states[index] : "none";
        if (index === 0) {
        }
        else {
          let click = function () {
            this.sortData(index); console.log(this.fields.states);
          }
          th.addEventListener("click", click.bind(this));
          let spam = document.createElement("span");
          spam.textContent = cl;
          th.appendChild(spam);
          if (this.fields.states[index] == "none") {
            th.innerHTML = th.innerHTML + "<ul style='list-style:none;font-size:10px;'> <li style='padding-bottom:0px;padding-top:0px;' >▲</li > <li style='padding-bottom:0px;padding-top:0px;'>▼</li> </ul > "
          }
          else if (this.fields.states[index] == "asc") {
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

      let cells = this.fields.data;
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
      usertable = this.csvTobutton(usertable);
      //table1をareaReportFacilityに入れる
      // $(myTable).append(table1);
      this.fields.myTable.appendChild(usertable);

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
      button.innerHTML = this.settings.csvSvg;
      let csvData = "";
      let col = this.settings.columns.slice(1);
      console.log("改造後!");
      col = col.map(c => "\"" + c.replace(/\"/g, "\"\"") + "\"");
      csvData += col.join(',') + '\n';

      this.fields.data.forEach((e) => {
        let ele = e.slice(1);
        ele = ele.map(el => "\"" + el.replace(/\"/g, "\"\"") + "\"");
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
})(jQuery, kintone.$PLUGIN_ID, svgObj);
