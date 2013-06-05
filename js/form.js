/**
 * Author: stanislav
 * Date: 4/05/13
 * Time: 9:31 PM
 */

var Form = (function($, form){
  var initialData = {
    firstName: "Joe",
    lastName: "Bloggs",
    addressLine1: "55 Main Rd",
    addressLine2: "",
    suburb: "Brisbane",
    state: "QLD",
    postcode: "4001",
    dateOfBirth: "1984-01-24"
  }

  /**
   * Public methods
   */
  function init(){
    if(!localStorage.formData){
      localStorage.setItem("formData", JSON.stringify(initialData))
    }
    drawForm()
  }

  /**
   * Private methods
   */
  function drawForm(){
    var jsonFormData = getFromStorage()
    var formModel = ko.mapping.fromJSON(jsonFormData);
    extendFormModel(formModel);
    ko.applyBindings(formModel);
  }

  function getFromStorage(){
    return localStorage.formData || ""
  }

  function extendFormModel(model){
    model.visibleNotice = ko.obser
    model.refreshForm = function(){
      var jsonData = getFromStorage();
      ko.mapping.fromJSON(jsonData, model)
    };

    model.saveToStorage  = function(){
      modelStringified = ko.mapping.toJSON(model)
      localStorage.setItem("formData", modelStringified)
      this.refreshForm()
      blinkNotice();
    };

    model.clearForm = function(){
      this.firstName('')
      this.lastName('')
      this.addressLine1('')
      this.addressLine2('')
      this.suburb('')
      this.state('')
      this.postcode('')
      this.dateOfBirth('')
    };
  }

  blinkNotice = function(){
    $notice = $(".save-notice")

    $notice.show()
    $notice.fadeOut(2000);
  }

  return {
    initForm: init
  }

})(jQuery, Form || {});