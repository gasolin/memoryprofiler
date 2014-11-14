'use strict';

(function(exports) {
  function ProfilerManager(store) {
    this.init(store);
  }

  ProfilerManager.prototype.init = function PM_init(store) {
    this.store = store;
    this.memoryProfiler = navigator.memprofiler;
  };

  ProfilerManager.prototype.startRecord = function PM_startRecord() {
    this.memoryProfiler.startProfiler();
  };

  ProfilerManager.prototype.stopRecord = function PM_stopRecord() {
    this.memoryProfiler.stopProfiler();
  };

  ProfilerManager.prototype.getProfileResults  = 
    function PM_getProfileResults () {
      this.store.create(
        this.memoryProfiler.getFrameNameTable(window),
        this.memoryProfiler.getStacktraceTable(window),
        this.memoryProfiler.getAllocatedEntries(window)
      );
  };

  ProfilerManager.prototype.stop = function PM_stop() {
    this.store.drop();
  };
  exports.ProfilerManager = ProfilerManager;
}(window));
