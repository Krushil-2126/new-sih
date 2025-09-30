// Settings page script
// Minimal implementations to persist API keys and avoid console errors.
(function(){
  function qs(id){ return document.getElementById(id); }
  function notify(msg){ console.log(msg); }
  function saveToLS(key, value){ try{ localStorage.setItem(key, value); }catch(e){} }

  // Tabs
  window.openTab = function(tabId){
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(t => t.classList.remove('active'));
    const btns = document.querySelectorAll('.settings-tabs .tab-btn');
    btns.forEach(b => b.classList.remove('active'));
    const el = qs(tabId);
    if (el){ el.classList.add('active'); }
    // set active class on button with matching onclick arg
    btns.forEach(b => { if (b.getAttribute('onclick')?.includes(`'${tabId}'`)) b.classList.add('active'); });
  }

  // API Integration
  window.toggleApiKey = function(inputId){
    const el = qs(inputId); if (!el) return;
    el.type = el.type === 'password' ? 'text' : 'password';
  }

  window.saveApiSettings = function(){
    const emoncmsKey = qs('emoncmsKey')?.value || '';
    const weatherKey  = qs('weatherKey')?.value || '';
    const mode = qs('simulationMode')?.value || 'auto';
    saveToLS('emoncmsKey', emoncmsKey);
    saveToLS('settings.weatherKey', weatherKey); // also keep legacy key for compatibility
    saveToLS('weatherKey', weatherKey);
    saveToLS('simulationMode', mode);
    alert('API settings saved.');
  }

  window.testEmoncmsConnection = function(){
    // Placeholder: simulate success
    setTimeout(()=> alert('EMONCMS connection OK (simulated).'), 300);
  }

  window.syncNow = function(){
    // Placeholder
    setTimeout(()=> alert('Data sync completed (simulated).'), 400);
  }

  // General
  window.saveGeneralSettings = function(){
    const systemName = qs('systemName')?.value || '';
    const systemLocation = qs('systemLocation')?.value || '';
    saveToLS('systemName', systemName);
    saveToLS('systemLocation', systemLocation);
    alert('General settings saved.');
  }

  // Display
  window.saveDisplaySettings = function(){
    const theme = qs('theme')?.value || 'light';
    const chartStyle = qs('chartStyle')?.value || 'smooth';
    const refresh = qs('dataRefresh')?.value || '10000';
    const autoLogout = qs('autoLogout')?.value || '30';
    saveToLS('theme', theme);
    saveToLS('chartStyle', chartStyle);
    saveToLS('dataRefresh', refresh);
    saveToLS('autoLogout', autoLogout);
    alert('Display settings saved.');
  }

  // Alerts
  window.saveAlertThresholds = function(){
    const payload = {
      batteryLow: qs('batteryLow')?.value,
      batteryHigh: qs('batteryHigh')?.value,
      gridImportLimit: qs('gridImportLimit')?.value,
      efficiencyThreshold: qs('efficiencyThreshold')?.value,
    };
    saveToLS('alertThresholds', JSON.stringify(payload));
    alert('Alert thresholds saved.');
  }

  // Notifications
  window.saveNotificationSettings = function(){
    const payload = {
      email: qs('emailNotifications')?.checked,
      push: qs('pushNotifications')?.checked,
      sms: qs('smsNotifications')?.checked,
      emailTo: qs('notificationEmail')?.value,
      smsNumber: qs('smsNumber')?.value,
    };
    saveToLS('notificationSettings', JSON.stringify(payload));
    alert('Notification settings saved.');
  }

  // Billing
  window.saveTariffSettings = function(){
    const payload = {
      importTariff: qs('importTariff')?.value,
      exportTariff: qs('exportTariff')?.value,
    };
    saveToLS('tariffs', JSON.stringify(payload));
    alert('Tariff settings saved.');
  }

  window.saveBillingSettings = function(){
    const payload = {
      billingCycle: qs('billingCycle')?.value,
      billingDate: qs('billingDate')?.value,
      utilityProvider: qs('utilityProvider')?.value,
    };
    saveToLS('billing', JSON.stringify(payload));
    alert('Billing settings saved.');
  }

  // System
  window.checkForUpdates = function(){ alert('Checking for updates... (simulated)'); }
  window.systemDiagnostics = function(){ alert('Diagnostics completed. No issues found. (simulated)'); }
  window.restartSystem = function(){ alert('System restarting... (simulated)'); }

  // Data Management
  window.exportAllData = function(){ alert('Data exported. (simulated)'); }
  window.clearOldData = function(){ alert('Old data cleared. (simulated)'); }
  window.backupSystem = function(){ alert('Backup completed. (simulated)'); }

  document.addEventListener('DOMContentLoaded', ()=>{
    // Initialize defaults
    const savedWx = localStorage.getItem('weatherKey') || localStorage.getItem('settings.weatherKey') || '';
    if (qs('weatherKey')) qs('weatherKey').value = savedWx;
  });
})();
