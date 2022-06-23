jQuery.noConflict();

(function ($, PLUGIN_ID) {
  'use strict';
  let appInfo = [];
  const config = {
    terms: {
      min: 1
    },
    settings: {
      option: null
    }
  }
  $(document).on("click", ".add", function (e) {
    var html = `<tr class="test"> <td> <div class="kintoneplugin-select-outer"> <div class="kintoneplugin-select"> <select> <option>セレクトA</option> <option>セレクトB</option> <option>セレクトC</option> </select> </div> </div> </td > <td class="kintoneplugin-table-td-operation"> <button type="button" class="add btn1 kintoneplugin-button-add-row-image" title="Add row"></button> <button type="button" class="remove kintoneplugin-button-remove-row-image" title="Delete this row" ></button> </td> </tr >`;
    $(this).parents('.test').after(html);
  })
  $(document).on("click", ".remove", function (e) {
    if ($(".test").length > config.terms.min)
      $(this).parents('.test').remove();
  })
  kintone.api(kintone.api.url('/k/v1/apps.json', true), 'GET', {}, (resp) => {
    // success
    let appObj = {};
    let option = null;
    option = $('<option>').val("-----").text("-----").data("id", null);
    $("#subtable-app").append(option);
    resp.apps.forEach(element => {
      $("#subtable-app").html();
      appObj = {
        id: element.appId,
        name: element.name
      }
      appInfo.push(appObj)
      option = $('<option>').val(element.name).text(element.name).attr("data-id", element.appId);
      console.log(element.appId, { option });
      $("#subtable-app").append(option);
      console.log(option);
    });
  }, (error) => {
    // error
    console.log(error);
  });
  kintone.api(kintone.api.url('/k/v1/app/form/layout.json', true), 'GET', { app: kintone.app.getId() }, (resp) => {
    // success
    let option = null;
    option = $('<option>').val("-----").text("-----").data("id", null);
    $("#spacefield").append(option);
    resp.layout.forEach((element) => {
      if (element.type == "ROW") {
        element.fields.forEach((e) => {
          if (e.type == "SPACER") {
            option = $('<option>').val(e.elementId).text(e.elementId).data("code", e.elementId);
            $("#spacefield").append(option);
          }
        });
      }
    });
  }, (error) => {
    // error
    console.log(error);
  });
  $("#subtable-app").on("change", function (e) {
    let appId = $("#subtable-app option:selected").data("id");
    if (appId !== "-----") {
      kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', { app: appId }, (resp) => {
        // success
        console.log(resp);
        let pro = Object.keys(resp.properties);
        console.log(pro);
        $(".pinp").children().remove();
        $(".pinp").append($('<option>').val("-----").text("-----").data("id", null));
        pro.forEach(function (p) {
          let properties = resp.properties[p];
          $(".pinp").append($('<option>').val(properties.label).text(properties.label).data("code", properties.code));
        });
        // resp.layout.forEach((element) => {
        //   if (element.type == "ROW") {
        //     element.fields.forEach((e) => {
        //       console.log(e.elementId);

        //     });

        //   }
        // });
        config.settings.option = $(".pinp").children();
        console.log(config.settings.option);
      }, (error) => {
        // error
        console.log(error);
      });

    }
  })
})(jQuery, kintone.$PLUGIN_ID);
