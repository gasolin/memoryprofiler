'use strict';
(function(exports) {
  function Hub (option) {
    this._elements = option.elements;
    this.profilerManager = option.profilerManager;
  }

  Hub.prototype = {
    start: function HUB_start () {
      this._elements.startButton.addEventListener('click', this);
      this._elements.stopButton.addEventListener('click', this);
      this._elements.searchBar.addEventListener('keyup', this);
      window.addEventListener('dataReady', this);
    },

    handleEvent: function HUB_handleEvent(evt) {
      switch (evt.type) {
        case 'click':
          switch (evt.target) {
            case this._elements.startButton:
              this.startRecord();
              break;
            case this._elements.stopButton:
              this.stopRecord();
              break;
          }
          break;
        case 'dataReady':
          this.showInfo();
          break;
        case 'keyup':
          switch (evt.target) {
            case this._elements.searchBar:
              this.search();
              break;
          }
          break;
        default:
          break;
      }
    },

    startRecord: function HUB_startRecord(evt) {
      this.profilerManager.startRecord();
      this.showLoading();
    },

    stopRecord: function HUB_stopRecord(evt) {
      this.profilerManager.stopRecord();
      this.profilerManager.getProfileResults();
    },

    showLoading: function HUB_showLoading(evt) {
      this._elements.infoTable.textContent = 'loading.....';
    },

    showInfo: function HUB_showInfo(evt) {
      this._elements.infoTable.textContent = 'done!!!';
    },

    stop: function HUB_stop() {
      this._elements.startButton.removeEventListener('click', this);
      this._elements.stopButton.removeEventListener('click', this);
      window.removeEventListener('dataReady', this);
    },

    search: function HUB_search() {
      console.log(this._elements.searchBar.value.length);
    }
  };
  exports.Hub = Hub;
}(window));
